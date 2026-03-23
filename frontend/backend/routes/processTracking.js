const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const ServiceRequest = require('../models/ServiceRequest');
const { auth, isAdmin } = require('../middleware/auth');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @route   PUT /api/process-tracking/:id/steps/:stepNumber/complete
// @desc    Mark a step as completed
// @access  Private (Admin)
router.put('/:id/steps/:stepNumber/complete', [auth, isAdmin], async (req, res) => {
  try {
    const { id, stepNumber } = req.params;
    const stepKey = `step${stepNumber}`;

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Initialize processSteps if it doesn't exist
    if (!request.processSteps) {
      request.processSteps = {};
    }

    // Initialize the specific step if it doesn't exist
    if (!request.processSteps[stepKey]) {
      const stepNames = {
        step1: 'Initial Request Review',
        step2: 'Assessment & Planning',
        step3: 'Implementation',
        step4: 'Quality Check',
        step5: 'Final Review & Closure'
      };
      request.processSteps[stepKey] = {
        name: stepNames[stepKey],
        completed: false,
        comments: []
      };
    }

    // Mark step as completed
    request.processSteps[stepKey].completed = true;
    request.processSteps[stepKey].completedAt = new Date();
    request.processSteps[stepKey].completedBy = req.userId;
    request.processSteps[stepKey].completedByName = req.user.name;

    // Update legacy status based on steps
    if (stepNumber === '1') request.currentStatus = 'received';
    else if (stepNumber === '2' || stepNumber === '3') request.currentStatus = 'in_progress';
    else if (stepNumber === '4') request.currentStatus = 'in_progress';
    else if (stepNumber === '5') request.currentStatus = 'completed';

    await request.save();

    res.json({
      success: true,
      message: `Step ${stepNumber} marked as completed`,
      data: request
    });
  } catch (error) {
    console.error('Complete step error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   PUT /api/process-tracking/:id/steps/:stepNumber/uncomplete
// @desc    Unmark a step as completed
// @access  Private (Admin)
router.put('/:id/steps/:stepNumber/uncomplete', [auth, isAdmin], async (req, res) => {
  try {
    const { id, stepNumber } = req.params;
    const stepKey = `step${stepNumber}`;

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    if (!request.processSteps || !request.processSteps[stepKey]) {
      return res.status(400).json({ 
        success: false, 
        message: 'Step not found' 
      });
    }

    // Unmark step
    request.processSteps[stepKey].completed = false;
    request.processSteps[stepKey].completedAt = null;
    request.processSteps[stepKey].completedBy = null;
    request.processSteps[stepKey].completedByName = null;

    await request.save();

    res.json({
      success: true,
      message: `Step ${stepNumber} unmarked`,
      data: request
    });
  } catch (error) {
    console.error('Uncomplete step error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   POST /api/process-tracking/:id/steps/:stepNumber/comments
// @desc    Add comment to a step
// @access  Private (Admin)
router.post('/:id/steps/:stepNumber/comments', [auth, isAdmin], [
  body('content').notEmpty().withMessage('Comment content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { id, stepNumber } = req.params;
    const { content } = req.body;
    const stepKey = `step${stepNumber}`;

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Initialize processSteps if it doesn't exist
    if (!request.processSteps) {
      request.processSteps = {};
    }

    // Initialize the specific step if it doesn't exist
    if (!request.processSteps[stepKey]) {
      const stepNames = {
        step1: 'Initial Request Review',
        step2: 'Assessment & Planning',
        step3: 'Implementation',
        step4: 'Quality Check',
        step5: 'Final Review & Closure'
      };
      request.processSteps[stepKey] = {
        name: stepNames[stepKey],
        completed: false,
        comments: []
      };
    }

    // Add comment
    const comment = {
      content,
      createdBy: req.userId,
      createdByName: req.user.name,
      createdAt: new Date()
    };

    request.processSteps[stepKey].comments.push(comment);
    await request.save();

    res.json({
      success: true,
      message: 'Comment added successfully',
      data: request
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      error: error.message 
    });
  }
});

// @route   GET /api/process-tracking/:id/generate-pdf
// @desc    Generate PDF report for completed process
// @access  Private (Admin and Client - client can view their own)
router.get('/:id/generate-pdf', auth, async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('client', 'name email company phone')
      .populate('assignedTo', 'name email');

    if (!request) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service request not found' 
      });
    }

    // Authorization check: Client can only view their own reports, Admin can view all
    if (req.user.role === 'client' && request.client._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own reports.'
      });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });
    
    // Set response headers for inline viewing
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=service-report-${request.requestId}.pdf`);
    res.setHeader('Cache-Control', 'no-cache');
    
    // Pipe PDF to response
    doc.pipe(res);

    // Add content
    // Header
    doc.fontSize(20).fillColor('#1e40af').text('Service Request Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).fillColor('#000').text(`Request ID: ${request.requestId}`, { align: 'center' });
    doc.fontSize(10).fillColor('#666').text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Client Information
    doc.fontSize(14).fillColor('#1e40af').text('Client Information');
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#000');
    doc.text(`Name: ${request.clientName || 'N/A'}`);
    doc.text(`Email: ${request.clientEmail || 'N/A'}`);
    if (request.clientCompany) doc.text(`Company: ${request.clientCompany}`);
    doc.moveDown();

    // Service Details
    doc.fontSize(14).fillColor('#1e40af').text('Service Details');
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#000');
    doc.text(`Service Type: ${request.serviceType}`);
    if (request.machineModel) doc.text(`Machine Model: ${request.machineModel}`);
    if (request.machineSerialNumber) doc.text(`Serial Number: ${request.machineSerialNumber}`);
    doc.text(`Problem Description: ${request.problemDescription}`);
    doc.text(`Priority: ${request.priority.toUpperCase()}`);
    doc.moveDown();

    // Process Steps
    doc.fontSize(14).fillColor('#1e40af').text('Process Timeline');
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    if (request.processSteps) {
      const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
      steps.forEach((stepKey, index) => {
        const step = request.processSteps[stepKey];
        if (step) {
          doc.fontSize(12).fillColor('#000').text(`${index + 1}. ${step.name}`);
          doc.fontSize(9).fillColor('#666');
          
          if (step.completed) {
            doc.fillColor('#059669').text(`✓ Completed`, { indent: 20 });
            if (step.completedAt) {
              doc.fillColor('#666').text(`Completed on: ${new Date(step.completedAt).toLocaleString()}`, { indent: 20 });
            }
            if (step.completedByName) {
              doc.text(`Completed by: ${step.completedByName}`, { indent: 20 });
            }
          } else {
            doc.fillColor('#dc2626').text(`✗ Not Completed`, { indent: 20 });
          }

          // Comments
          if (step.comments && step.comments.length > 0) {
            doc.fillColor('#000').text('Comments:', { indent: 20 });
            step.comments.forEach((comment) => {
              doc.fillColor('#666').text(`- ${comment.content}`, { indent: 30 });
              doc.fontSize(8).text(`  By ${comment.createdByName} on ${new Date(comment.createdAt).toLocaleString()}`, { indent: 30 });
              doc.fontSize(9);
            });
          }
          
          doc.moveDown(0.5);
        }
      });
    }

    doc.moveDown();

    // Status Summary
    doc.fontSize(14).fillColor('#1e40af').text('Status Summary');
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#000');
    doc.text(`Current Status: ${request.currentStatus.toUpperCase().replace('_', ' ')}`);
    doc.text(`Created: ${new Date(request.createdAt).toLocaleString()}`);
    if (request.completedAt) {
      doc.text(`Completed: ${new Date(request.completedAt).toLocaleString()}`);
    }
    if (request.totalDuration) {
      doc.text(`Total Duration: ${request.totalDuration.toFixed(2)} hours`);
    }
    doc.moveDown();

    // Footer
    doc.fontSize(8).fillColor('#999').text(
      'This is an automated report generated by IM Services System',
      50,
      doc.page.height - 50,
      { align: 'center' }
    );

    // Finalize PDF
    doc.end();

    // Update report generation status
    request.reportGenerated = true;
    request.reportGeneratedAt = new Date();
    await request.save();

  } catch (error) {
    console.error('Generate PDF error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate PDF',
      error: error.message 
    });
  }
});

module.exports = router;
