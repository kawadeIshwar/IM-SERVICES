# Create Test Service Requests - Quick Guide

## 🎯 Purpose

Since the client service request form was removed, you can use these scripts to create test service requests in the database so admins can test the tracking and management features.

---

## 📋 Prerequisites

1. **Backend server running** (or at least MongoDB accessible)
2. **At least one client user** in the database
3. **Node.js** installed

---

## 🚀 Option 1: Create ONE Test Request (Recommended)

### Quick Command:

```bash
cd backend
node scripts/createSingleTestRequest.js
```

### What It Creates:

- **1 test service request** with realistic data
- Request ID: Auto-generated (e.g., SR-202411-0001)
- Service Type: Breakdown Repair
- Priority: High
- Status: Received
- Assigned to: First client user found

---

## 🚀 Option 2: Create MULTIPLE Test Requests

### Quick Command:

```bash
cd backend
node scripts/createTestServiceRequest.js
```

### What It Creates:

Creates **5 different service requests** with varied data:

1. **Breakdown Repair** (High Priority)
   - Heating system malfunction
   - Urgent repair needed

2. **Preventive Maintenance** (Medium Priority)
   - Scheduled maintenance
   - Complete inspection

3. **Spare Parts Request** (Medium Priority)
   - Hydraulic seals and sensors
   - Parts replacement

4. **Technical Support** (Low Priority)
   - Cycle time optimization
   - Efficiency consultation

5. **Installation** (High Priority)
   - New machine setup
   - Complete installation

---

## 📝 Step-by-Step Instructions

### Step 1: Create a Client User First

If you don't have a client user:

1. Go to: `http://localhost:5173/signup`
2. Fill out the signup form
3. Use role: **Client** (not admin)
4. Submit the form

### Step 2: Run the Script

Open terminal/command prompt:

```bash
# Navigate to backend
cd c:\Users\kawad\OneDrive\Desktop\IM_SERVICES\backend

# Run ONE test request
node scripts/createSingleTestRequest.js

# OR run MULTIPLE test requests
node scripts/createTestServiceRequest.js
```

### Step 3: Verify in Admin Dashboard

1. Login as admin: `http://localhost:5173/login`
2. Go to Admin Dashboard
3. Click "Service Requests" tab
4. You should see the test request(s)!

---

## 🔍 What You'll See

### Script Output Example:

```
╔════════════════════════════════════════════════════════╗
║   Create Single Test Service Request                  ║
╚════════════════════════════════════════════════════════╝

Connecting to MongoDB...
✅ Connected to MongoDB

✅ Found client: John Doe (john@example.com)

═══════════════════════════════════════════════════════
🎉 Test Service Request Created Successfully!
═══════════════════════════════════════════════════════

📋 Request Details:
   Request ID: SR-202411-0001
   Client: John Doe
   Service Type: breakdown_repair
   Priority: HIGH
   Status: received
   Created: 11/20/2024, 6:40:00 PM

💡 How to Track This Request:
   1. Login to Admin Dashboard
   2. Click "Service Requests" tab
   3. Find request: SR-202411-0001
   4. Click the eye icon (👁️)
   5. Test the 5-step process!

✅ Done!
```

---

## 🎨 In Admin Dashboard

After running the script, you'll see:

```
┌────────────────────────────────────────────────────────┐
│  Request ID      │ Client    │ Service         │ Status │
├────────────────────────────────────────────────────────┤
│  SR-202411-0001  │ John Doe  │ Breakdown Repair│ 🔵 Received │
│  [View 👁️] [Delete 🗑️]                                 │
└────────────────────────────────────────────────────────┘
```

Click the eye icon (👁️) to open the full tracking view!

---

## 🛠️ Testing the Tracking Features

### Once Request is Created:

1. **Open Tracking View**
   - Click eye icon on the request
   - See 5-step timeline

2. **Test Step Completion**
   - Click "Mark as Done" on Step 1
   - See timestamp recorded
   - Auto-advances to Step 2

3. **Test Comments**
   - Type in comment box
   - Click "Post"
   - Comment saved with your name and time

4. **Complete All Steps**
   - Mark all 5 steps as done
   - See progress bar reach 100%
   - "Generate PDF" button appears

5. **Generate PDF Report**
   - Click "Generate PDF"
   - Download comprehensive report
   - Includes all steps and timestamps

---

## 🔄 Create More Requests Anytime

You can run the scripts multiple times:

```bash
# Create another single request
node scripts/createSingleTestRequest.js

# Create 5 more varied requests
node scripts/createTestServiceRequest.js
```

Each time you run it, **new requests** are created!

---

## ⚙️ Customizing Test Data

Want to create your own test data? Edit the script:

```javascript
// In createSingleTestRequest.js
const serviceRequest = new ServiceRequest({
  serviceType: 'installation',        // Change this
  machineModel: 'Your Machine',       // Change this
  problemDescription: 'Your issue',   // Change this
  priority: 'urgent',                 // Change this
  // ... etc
});
```

---

## 🗑️ Cleaning Up Test Data

To remove test requests later:

### Option 1: Via Admin Dashboard
- Click delete icon (🗑️) on each request

### Option 2: Via MongoDB
```bash
mongo imservices
db.servicerequests.deleteMany({ machineSerialNumber: /TEST/ })
```

---

## 📊 Available Service Types

Use these values in custom scripts:

- `preventive_maintenance`
- `breakdown_repair`
- `installation`
- `spare_parts`
- `technical_support`
- `consultation`
- `other`

---

## 📈 Priority Levels

- `low` - Not urgent
- `medium` - Normal priority (default)
- `high` - Urgent
- `urgent` - Critical

---

## ❓ Troubleshooting

### Error: "No client user found"

**Solution:**
1. Create a client account via signup
2. Make sure role is "client" not "admin"

### Error: "Cannot connect to MongoDB"

**Solution:**
1. Check if MongoDB is running
2. Verify `MONGODB_URI` in `.env` file
3. Try: `mongodb://localhost:27017/imservices`

### Error: "Module not found"

**Solution:**
```bash
cd backend
npm install
```

### Requests not showing in dashboard

**Solution:**
1. Refresh the dashboard page
2. Check "All Status" filter
3. Verify backend is running
4. Check browser console for errors

---

## 🎯 Quick Reference

| Command | What It Does |
|---------|-------------|
| `node scripts/createSingleTestRequest.js` | Creates 1 test request |
| `node scripts/createTestServiceRequest.js` | Creates 5 varied test requests |

| Location | What You See |
|----------|--------------|
| Admin Dashboard → Service Requests | List of all requests |
| Click eye icon (👁️) | Full tracking view with 5 steps |
| Profile page (client view) | Client's own requests |

---

## 📚 Related Files

- **Scripts**: `backend/scripts/createTestServiceRequest.js`
- **Script**: `backend/scripts/createSingleTestRequest.js`
- **Model**: `backend/models/ServiceRequest.js`
- **API Routes**: `backend/routes/serviceRequest.js`
- **Tracking Routes**: `backend/routes/processTracking.js`
- **Frontend Component**: `frontend/src/components/ServiceRequestDetailView.jsx`
- **Admin Dashboard**: `frontend/src/pages/AdminDashboard.jsx`

---

## ✅ Success Checklist

- [ ] Backend server is running
- [ ] MongoDB is connected
- [ ] Client user exists in database
- [ ] Script runs without errors
- [ ] Request ID is displayed
- [ ] Can see request in admin dashboard
- [ ] Can open tracking view
- [ ] Can mark steps complete
- [ ] Can add comments
- [ ] Can generate PDF when done

---

**That's it! You now have test service requests to work with!** 🎉
