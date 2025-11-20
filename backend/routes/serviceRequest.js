const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ServiceRequest = require('../models/ServiceRequest');
const { auth, isAdmin, isClientOrAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/service-requests
// @desc    Create new service request (Client)
// @access  Private (Client/Admin)
router.post('/', auth, [
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('problemDescription').notEmpty().withMessage('Problem description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const {
      serviceType,
      machineModel,
      machineSerialNumber,
      problemDescription,
      priority
    } = req.body;

    const serviceRequest = new ServiceRequest({
      client: req.userId,
      clientName: req.user.name,
      clientEmail: req.user.email,
      clientCompany: req.user.company,
      serviceType,
      machineModel,
      machineSerialNumber,
      problemDescription,
      priority: priority || 'medium',
      currentStatus: 'received',
      statusHistory: [{
        status: 'received',
        changedBy: req.userId,
        changedByName: req.user.name,
        changedAt: new Date(),
        notes: 'Service request submitted'
      }]
    });

    await serviceRequest.save();

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: serviceRequest
    });
  } catch (error) {
    console.error('Create service request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/service-requests/stats
// @desc    Get statistics for dashboard
// @access  Private (Admin)
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const stats = await ServiceRequest.aggregate([
      { $match: { isDeleted: false } },
      { $group: {
        _id: '$currentStatus',
        count: { $sum: 1 }
      }}
    ]);

    const overdueCount = await ServiceRequest.countDocuments({ 
      isOverdue: true, 
      currentStatus: { $ne: 'completed' },
      isDeleted: false 
    });

    const totalRequests = await ServiceRequest.countDocuments({ isDeleted: false });
    const completedRequests = await ServiceRequest.countDocuments({ 
      currentStatus: 'completed',
      isDeleted: false 
    });

    // Calculate average completion time
    const completedWithDuration = await ServiceRequest.find({
      currentStatus: 'completed',
      totalDuration: { $exists: true },
      isDeleted: false
    }).select('totalDuration');

    const avgCompletionTime = completedWithDuration.length > 0
      ? completedWithDuration.reduce((sum, req) => sum + req.totalDuration, 0) / completedWithDuration.length
      : 0;

    res.json({
      success: true,
      data: {
        byStatus: stats,
        overdueCount,
        totalRequests,
        completedRequests,
        avgCompletionTime: avgCompletionTime.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/service-requests
// @desc    Get all service requests (Admin gets all, Client gets their own)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { 
      status, 
      priority, 
      isOverdue, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isDeleted: false };

    // If client, show only their requests
    if (req.user.role === 'client') {
      query.client = req.userId;
    }

    // Apply filters
    if (status) query.currentStatus = status;
    if (priority) query.priority = priority;
    if (isOverdue === 'true') query.isOverdue = true;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const requests = await ServiceRequest.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('client', 'name email company')
      .populate('assignedTo', 'name email')
      .exec();

    const count = await ServiceRequest.countDocuments(query);

    res.json({
      success: true,
      data: requests,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get service requests error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/service-requests/:id
// @desc    Get single service request
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('client', 'name email company phone address')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.changedBy', 'name email')
      .populate('notes.createdBy', 'name email');

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Check authorization
    if (req.user.role === 'client' && request.client._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    // Update SLA status
    request.updateSLAStatus();
    await request.save();

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Get service request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/service-requests/:id/status
// @desc    Update service request status (Admin only)
// @access  Private (Admin)
router.put('/:id/status', [auth, isAdmin], [
  body('status').isIn(['received', 'pending', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('notes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { status, notes } = req.body;
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    await request.updateStatus(status, req.user, notes);

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: request
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/service-requests/bulk/status
// @desc    Bulk update status (Admin only)
// @access  Private (Admin)
router.put('/bulk/status', [auth, isAdmin], [
  body('requestIds').isArray().withMessage('Request IDs must be an array'),
  body('status').isIn(['received', 'pending', 'in_progress', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { requestIds, status, notes } = req.body;
    
    const updatePromises = requestIds.map(async (id) => {
      const request = await ServiceRequest.findById(id);
      if (request) {
        await request.updateStatus(status, req.user, notes);
      }
    });

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: `${requestIds.length} requests updated successfully`
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/service-requests/:id/notes
// @desc    Add note to service request
// @access  Private
router.post('/:id/notes', auth, [
  body('content').notEmpty().withMessage('Note content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { content } = req.body;
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Check authorization
    if (req.user.role === 'client' && request.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    request.notes.push({
      content,
      createdBy: req.userId,
      createdByName: req.user.name,
      createdAt: new Date()
    });

    await request.save();

    res.json({
      success: true,
      message: 'Note added successfully',
      data: request
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/service-requests/:id/attachments
// @desc    Upload attachment to service request
// @access  Private
router.post('/:id/attachments', auth, upload.array('files', 5), async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Check authorization
    if (req.user.role === 'client' && request.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    const attachments = req.files.map(file => ({
      fileName: file.filename,
      originalName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
      uploadedBy: req.userId,
      uploadedByName: req.user.name,
      category: req.body.category || 'other'
    }));

    request.attachments.push(...attachments);
    await request.save();

    res.json({
      success: true,
      message: 'Attachments uploaded successfully',
      data: attachments
    });
  } catch (error) {
    console.error('Upload attachment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/service-requests/:id/assign
// @desc    Assign service request to technician (Admin only)
// @access  Private (Admin)
router.put('/:id/assign', [auth, isAdmin], [
  body('assignedTo').notEmpty().withMessage('Assigned user ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { assignedTo } = req.body;
    const User = require('../models/User');
    const assignedUser = await User.findById(assignedTo);

    if (!assignedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'Assigned user not found' 
      });
    }

    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { 
        assignedTo: assignedTo,
        assignedToName: assignedUser.name
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Service request assigned successfully',
      data: request
    });
  } catch (error) {
    console.error('Assign request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/service-requests/:id/archive
// @desc    Archive service request (Admin only)
// @access  Private (Admin)
router.put('/:id/archive', [auth, isAdmin], async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { 
        isArchived: true,
        archivedAt: new Date(),
        archivedBy: req.userId
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    res.json({
      success: true,
      message: 'Service request archived successfully',
      data: request
    });
  } catch (error) {
    console.error('Archive request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   DELETE /api/service-requests/:id
// @desc    Soft delete service request (Admin only)
// @access  Private (Admin)
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { 
        isDeleted: true,
        deletedAt: new Date()
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    res.json({
      success: true,
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;
