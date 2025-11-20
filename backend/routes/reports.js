const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const { auth, isAdmin } = require('../middleware/auth');
const { Parser } = require('json2csv');
const path = require('path');
const fs = require('fs');

// @route   POST /api/reports/generate/:id
// @desc    Generate PDF report for service request (Admin only)
// @access  Private (Admin)
router.post('/generate/:id', [auth, isAdmin], async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('client', 'name email company phone address')
      .populate('assignedTo', 'name email');

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    if (request.currentStatus !== 'completed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot generate report for incomplete service request' 
      });
    }

    const { findings, workPerformed, recommendations } = req.body;

    // Update request with report data
    request.findings = findings || request.findings || [];
    request.workPerformed = workPerformed || request.workPerformed || [];
    request.recommendations = recommendations || request.recommendations || [];
    request.reportGenerated = true;
    request.reportGeneratedAt = new Date();

    await request.save();

    // In production, you would use puppeteer to generate actual PDF
    // For now, we'll just mark it as generated
    
    res.json({
      success: true,
      message: 'Report generated successfully',
      data: {
        requestId: request.requestId,
        reportGeneratedAt: request.reportGeneratedAt
      }
    });
  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/reports/preview/:id
// @desc    Get report data for preview
// @access  Private (Client can view their own, Admin can view all)
router.get('/preview/:id', auth, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('client', 'name email company phone address')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.changedBy', 'name');

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Check authorization
    if (req.user.role === 'client') {
      if (request.client._id.toString() !== req.userId.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied' 
        });
      }
      
      if (!request.reportGenerated) {
        return res.status(403).json({ 
          success: false, 
          message: 'Report not yet generated' 
        });
      }
    }

    res.json({
      success: true,
      data: {
        requestInfo: {
          requestId: request.requestId,
          serviceType: request.serviceType,
          machineModel: request.machineModel,
          machineSerialNumber: request.machineSerialNumber,
          priority: request.priority,
          createdAt: request.createdAt,
          completedAt: request.completedAt,
          totalDuration: request.totalDuration
        },
        client: request.client,
        statusHistory: request.statusHistory,
        findings: request.findings,
        workPerformed: request.workPerformed,
        recommendations: request.recommendations,
        attachments: request.attachments,
        reportGeneratedAt: request.reportGeneratedAt
      }
    });
  } catch (error) {
    console.error('Preview report error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/reports/export/csv
// @desc    Export service requests to CSV (Admin only)
// @access  Private (Admin)
router.get('/export/csv', [auth, isAdmin], async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    const query = { isDeleted: false };
    if (status) query.currentStatus = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const requests = await ServiceRequest.find(query)
      .populate('client', 'name email company')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });

    const data = requests.map(req => ({
      RequestID: req.requestId,
      ClientName: req.clientName,
      ClientEmail: req.clientEmail,
      Company: req.clientCompany,
      ServiceType: req.serviceType,
      MachineModel: req.machineModel,
      Status: req.currentStatus,
      Priority: req.priority,
      AssignedTo: req.assignedToName || 'Unassigned',
      CreatedAt: req.createdAt,
      CompletedAt: req.completedAt || 'N/A',
      Duration: req.totalDuration ? `${req.totalDuration.toFixed(2)} hours` : 'N/A',
      IsOverdue: req.isOverdue ? 'Yes' : 'No'
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(`service-requests-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/reports/client/:clientId
// @desc    Get all reports for a client (Client can view their own, Admin can view all)
// @access  Private
router.get('/client/:clientId', auth, async (req, res) => {
  try {
    // Check authorization
    if (req.user.role === 'client' && req.params.clientId !== req.userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    const requests = await ServiceRequest.find({
      client: req.params.clientId,
      reportGenerated: true,
      isDeleted: false
    })
    .select('requestId serviceType completedAt reportGeneratedAt totalDuration')
    .sort({ reportGeneratedAt: -1 });

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Get client reports error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;
