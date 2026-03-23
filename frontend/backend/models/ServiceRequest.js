const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changedByName: String,
  changedAt: {
    type: Date,
    default: Date.now
  },
  notes: String,
  duration: Number // Time spent in previous status (in milliseconds)
});

const attachmentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileType: String,
  fileSize: Number,
  filePath: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadedByName: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['invoice', 'photo', 'document', 'report', 'other'],
    default: 'other'
  }
});

const serviceRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    unique: true
    // Note: Not marking as required because it's auto-generated in pre-save hook
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientName: String,
  clientEmail: String,
  clientCompany: String,
  
  // Service Details
  serviceType: {
    type: String,
    required: [true, 'Service type is required']
  },
  machineModel: String,
  machineSerialNumber: String,
  problemDescription: {
    type: String,
    required: [true, 'Problem description is required']
  },
  
  // Status Tracking (4 Steps) - Legacy
  currentStatus: {
    type: String,
    enum: ['received', 'pending', 'in_progress', 'completed'],
    default: 'received'
  },
  
  // New 5-Step Process Tracking
  processSteps: {
    step1: {
      name: { type: String, default: 'Initial Request Review' },
      completed: { type: Boolean, default: false },
      completedAt: Date,
      completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      completedByName: String,
      comments: [{
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdByName: String,
        createdAt: { type: Date, default: Date.now }
      }]
    },
    step2: {
      name: { type: String, default: 'Assessment & Planning' },
      completed: { type: Boolean, default: false },
      completedAt: Date,
      completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      completedByName: String,
      comments: [{
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdByName: String,
        createdAt: { type: Date, default: Date.now }
      }]
    },
    step3: {
      name: { type: String, default: 'Implementation' },
      completed: { type: Boolean, default: false },
      completedAt: Date,
      completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      completedByName: String,
      comments: [{
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdByName: String,
        createdAt: { type: Date, default: Date.now }
      }]
    },
    step4: {
      name: { type: String, default: 'Quality Check' },
      completed: { type: Boolean, default: false },
      completedAt: Date,
      completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      completedByName: String,
      comments: [{
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdByName: String,
        createdAt: { type: Date, default: Date.now }
      }]
    },
    step5: {
      name: { type: String, default: 'Final Review & Closure' },
      completed: { type: Boolean, default: false },
      completedAt: Date,
      completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      completedByName: String,
      comments: [{
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdByName: String,
        createdAt: { type: Date, default: Date.now }
      }]
    }
  },
  
  // Status History - Audit Log
  statusHistory: [statusHistorySchema],
  
  // Timestamps for each status
  receivedAt: {
    type: Date,
    default: Date.now
  },
  pendingAt: Date,
  inProgressAt: Date,
  completedAt: Date,
  
  // SLA Tracking
  slaTarget: {
    type: Number,
    default: 72 // Default 72 hours
  },
  isOverdue: {
    type: Boolean,
    default: false
  },
  totalDuration: Number, // Total time from received to completed (in hours)
  
  // Assignment
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedToName: String,
  
  // Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Attachments
  attachments: [attachmentSchema],
  
  // Notes/Comments
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdByName: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Report Generation
  reportGenerated: {
    type: Boolean,
    default: false
  },
  reportGeneratedAt: Date,
  reportPdfPath: String,
  
  // Findings and Work
  findings: [String],
  workPerformed: [String],
  recommendations: [String],
  
  // Soft Delete
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  
  // Archive
  isArchived: {
    type: Boolean,
    default: false
  },
  archivedAt: Date,
  archivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
serviceRequestSchema.index({ client: 1, currentStatus: 1 });
serviceRequestSchema.index({ requestId: 1 });
serviceRequestSchema.index({ createdAt: -1 });
serviceRequestSchema.index({ isDeleted: 1, isArchived: 1 });

// Auto-generate request ID before saving
serviceRequestSchema.pre('save', async function(next) {
  if (!this.requestId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Count documents created this month
    const count = await mongoose.model('ServiceRequest').countDocuments({
      createdAt: {
        $gte: new Date(year, date.getMonth(), 1),
        $lt: new Date(year, date.getMonth() + 1, 1)
      }
    });
    
    this.requestId = `SR-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Method to calculate SLA status
serviceRequestSchema.methods.updateSLAStatus = function() {
  if (this.currentStatus === 'completed') return;
  
  const now = new Date();
  const hoursSinceReceived = (now - this.receivedAt) / (1000 * 60 * 60);
  
  if (hoursSinceReceived > this.slaTarget) {
    this.isOverdue = true;
  }
};

// Method to update status with history
serviceRequestSchema.methods.updateStatus = async function(newStatus, changedBy, notes = '') {
  // Calculate duration in previous status
  const lastHistory = this.statusHistory[this.statusHistory.length - 1];
  const duration = lastHistory ? Date.now() - new Date(lastHistory.changedAt).getTime() : Date.now() - this.receivedAt.getTime();
  
  // Add to history
  this.statusHistory.push({
    status: newStatus,
    changedBy: changedBy._id,
    changedByName: changedBy.name,
    changedAt: new Date(),
    notes: notes,
    duration: duration
  });
  
  // Update current status
  this.currentStatus = newStatus;
  
  // Update timestamp for new status
  const statusTimestampMap = {
    'received': 'receivedAt',
    'pending': 'pendingAt',
    'in_progress': 'inProgressAt',
    'completed': 'completedAt'
  };
  
  if (statusTimestampMap[newStatus]) {
    this[statusTimestampMap[newStatus]] = new Date();
  }
  
  // If completed, calculate total duration
  if (newStatus === 'completed') {
    this.totalDuration = (this.completedAt - this.receivedAt) / (1000 * 60 * 60); // in hours
  }
  
  await this.save();
};

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
