# Service Request Process Tracking - Setup Guide

This guide will help you set up the new 5-step process tracking system for service requests.

## Overview

The new system provides:
- **5-Step Process Tracking**: Initial Request Review → Assessment & Planning → Implementation → Quality Check → Final Review & Closure
- **Mark as Done**: Each step can be marked as completed with automatic timestamp recording
- **Comments & Feedback**: Add comments to each step for better communication
- **PDF Report Generation**: Generate comprehensive PDF reports with timestamps for all completed steps
- **Progress Visualization**: Real-time progress tracking with visual indicators

## Installation Steps

### 1. Install Backend Dependencies

Navigate to the backend directory and install the required package:

```bash
cd backend
npm install pdfkit@^0.13.0
```

### 2. Verify Backend Files

Ensure these files are in place:

- `backend/models/ServiceRequest.js` - Updated with processSteps schema
- `backend/routes/processTracking.js` - New route for process management
- `backend/server.js` - Updated to include process tracking routes

### 3. Restart Backend Server

```bash
# In backend directory
npm run dev
```

Or if using production:

```bash
npm start
```

### 4. Frontend Setup

No additional dependencies needed for the frontend. The component uses existing libraries.

Verify these files:
- `frontend/src/components/ServiceRequestDetailView.jsx` - New component
- `frontend/src/pages/AdminDashboard.jsx` - Updated to use new component

### 5. Restart Frontend Server

```bash
# In frontend directory
npm run dev
```

## Features Guide

### For Admin Users

#### Accessing Process Tracking

1. Login to the Admin Dashboard
2. Navigate to "Service Requests" tab
3. Click the "eye" icon on any service request
4. The new Process Tracking view will open

#### Using the Interface

**Timeline Navigation:**
- Left sidebar shows all 5 steps
- Completed steps are marked with green checkmarks
- Current/active step is highlighted in blue
- Click any step to view its details

**Step Management:**
1. **Marking Steps Complete:**
   - Review the step details
   - Click "Mark as Done" button
   - System automatically records:
     - Completion timestamp
     - Admin who completed it
     - Moves to next step automatically

2. **Adding Comments:**
   - Type your comment in the text area
   - Click "Post" to add
   - Comments are timestamped and attributed to the admin
   - Useful for documenting actions, findings, or notes

3. **Navigation:**
   - Use "Previous Step" and "Next Step" buttons
   - Or click directly on step numbers in the timeline

#### Generating PDF Reports

**When all 5 steps are completed:**
1. A "Generate PDF" button appears in the header
2. Click to generate a comprehensive report
3. PDF includes:
   - Client information
   - Service details
   - Complete timeline with timestamps
   - All comments from each step
   - Completion status and duration

The PDF is automatically downloaded with filename: `service-report-[RequestID].pdf`

## API Endpoints

### Complete a Step
```
PUT /api/process-tracking/:id/steps/:stepNumber/complete
Authorization: Bearer [token]
```

### Uncomplete a Step (if needed)
```
PUT /api/process-tracking/:id/steps/:stepNumber/uncomplete
Authorization: Bearer [token]
```

### Add Comment to Step
```
POST /api/process-tracking/:id/steps/:stepNumber/comments
Authorization: Bearer [token]
Body: { "content": "Your comment here" }
```

### Generate PDF Report
```
GET /api/process-tracking/:id/generate-pdf
Authorization: Bearer [token]
Returns: PDF file download
```

## Data Structure

### Process Steps Schema

Each service request now has a `processSteps` object with 5 steps:

```javascript
processSteps: {
  step1: {
    name: "Initial Request Review",
    completed: false,
    completedAt: Date,
    completedBy: ObjectId,
    completedByName: String,
    comments: [{
      content: String,
      createdBy: ObjectId,
      createdByName: String,
      createdAt: Date
    }]
  },
  step2: { ... }, // Assessment & Planning
  step3: { ... }, // Implementation
  step4: { ... }, // Quality Check
  step5: { ... }  // Final Review & Closure
}
```

## Customization

### Changing Step Names

Edit the step names in two places:

1. **Backend Model** (`backend/models/ServiceRequest.js`):
```javascript
step1: {
  name: { type: String, default: 'Your Custom Name' },
  // ...
}
```

2. **Backend Routes** (`backend/routes/processTracking.js`):
```javascript
const stepNames = {
  step1: 'Your Custom Name',
  // ...
};
```

3. **Frontend Component** (`frontend/src/components/ServiceRequestDetailView.jsx`):
```javascript
const steps = [
  { number: 1, name: 'Your Custom Name', key: 'step1' },
  // ...
];
```

### Adding More Steps

To add more than 5 steps:

1. Update the model schema with `step6`, `step7`, etc.
2. Update the routes to handle additional steps
3. Update the frontend steps array
4. Adjust UI grid/layout as needed

## Troubleshooting

### PDF Generation Fails

**Issue:** PDF doesn't generate or download fails

**Solutions:**
1. Check if `pdfkit` is installed: `npm list pdfkit` in backend
2. Verify all steps are completed before generating
3. Check browser console for download errors
4. Ensure backend has write permissions (if saving PDFs)

### Steps Not Saving

**Issue:** Clicking "Mark as Done" doesn't work

**Solutions:**
1. Verify admin authentication token is valid
2. Check browser console for API errors
3. Ensure backend server is running
4. Check MongoDB connection

### Comments Not Appearing

**Issue:** Comments are posted but don't show up

**Solutions:**
1. Refresh the request detail view
2. Check if comment content is not empty
3. Verify MongoDB schema includes comments array
4. Check browser console for errors

### Process Steps Not Initialized

**Issue:** New or old requests don't show process steps

**Solutions:**
The system automatically initializes steps when:
- Marking a step as done
- Adding a comment

For existing requests without process steps, they will be initialized on first interaction.

## Best Practices

1. **Sequential Completion**: Complete steps in order for better workflow
2. **Document Everything**: Use comments to record important decisions or findings
3. **Regular Updates**: Mark steps complete as soon as they're done
4. **PDF Archive**: Generate PDF after completion for records
5. **Client Communication**: Use comments to prepare client-facing summaries

## Migration Notes

### For Existing Service Requests

- Existing requests will work with the new system
- `processSteps` are initialized on first use
- Old status tracking (`currentStatus`) is still maintained for backward compatibility
- No data migration required

### Backward Compatibility

The system maintains the original 4-status tracking:
- `received`
- `pending`
- `in_progress`
- `completed`

These are automatically updated based on process steps:
- Step 1 completed → `received`
- Steps 2-4 in progress → `in_progress`
- Step 5 completed → `completed`

## Support

For issues or questions:
1. Check browser console for errors
2. Check backend server logs
3. Verify all dependencies are installed
4. Ensure MongoDB is properly connected

## Future Enhancements

Potential features for future versions:
- Email notifications on step completion
- Automatic reminders for pending steps
- Step-specific file attachments
- Client portal to view progress
- SLA tracking per step
- Custom workflow templates
- Step delegation to team members

---

**Version:** 1.0.0  
**Last Updated:** November 2024  
**Compatibility:** Works with existing IM Services system
