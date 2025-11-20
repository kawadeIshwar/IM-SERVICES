import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  Send,
  Download,
  AlertCircle,
  Loader
} from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const WORKFLOW_STEPS = [
  {
    id: 1,
    name: 'Initial Request Review',
    description: 'Review the client\'s request details and understand requirements.',
    icon: FileText
  },
  {
    id: 2,
    name: 'Assessment & Planning',
    description: 'Assess the request and plan necessary actions for service delivery.',
    icon: Clock
  },
  {
    id: 3,
    name: 'Implementation',
    description: 'Execute the planned actions and provide the requested service.',
    icon: CheckCircle
  },
  {
    id: 4,
    name: 'Quality Check',
    description: 'Perform quality checks to ensure everything meets required standards.',
    icon: AlertCircle
  },
  {
    id: 5,
    name: 'Final Review & Closure',
    description: 'Conduct final review, get client confirmation, and close the request.',
    icon: CheckCircle
  }
];

const ServiceRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [request, setRequest] = useState(null);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingStep, setUpdatingStep] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_URL}/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const bookingData = response.data.booking;
        setRequest(bookingData);
        
        // Initialize workflow steps if not present
        const steps = bookingData.workflowSteps || WORKFLOW_STEPS.map(step => ({
          stepId: step.id,
          name: step.name,
          status: 'pending',
          comments: [],
          completedAt: null
        }));
        
        setWorkflowSteps(steps);
      }
    } catch (err) {
      console.error('Error fetching request:', err);
      setError(err.response?.data?.message || 'Failed to load request details');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDone = async (stepId) => {
    try {
      setUpdatingStep(true);
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${API_URL}/bookings/${id}/workflow/${stepId}`,
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Update local state
        setWorkflowSteps(prev => prev.map(step => 
          step.stepId === stepId 
            ? { ...step, status: 'completed', completedAt: new Date().toISOString() }
            : step
        ));

        // If this is the last step, show PDF generation option
        if (stepId === 5) {
          const allCompleted = workflowSteps.every((step, idx) => 
            idx === stepId - 1 || step.status === 'completed'
          );
          
          if (allCompleted) {
            setTimeout(() => {
              if (window.confirm('All steps completed! Would you like to generate a PDF report?')) {
                handleGeneratePDF();
              }
            }, 500);
          }
        }
      }
    } catch (err) {
      console.error('Error updating step:', err);
      alert(err.response?.data?.message || 'Failed to update step');
    } finally {
      setUpdatingStep(false);
    }
  };

  const handleAddComment = async (stepId) => {
    if (!comment.trim()) return;

    try {
      setSubmittingComment(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_URL}/bookings/${id}/workflow/${stepId}/comment`,
        { comment: comment.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Update local state
        setWorkflowSteps(prev => prev.map(step => 
          step.stepId === stepId 
            ? { 
                ...step, 
                comments: [
                  ...(step.comments || []),
                  {
                    text: comment.trim(),
                    timestamp: new Date().toISOString(),
                    author: 'Admin'
                  }
                ]
              }
            : step
        ));
        setComment('');
        setActiveStep(null);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      setGeneratingPDF(true);
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header
      doc.setFillColor(37, 99, 235); // Blue
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('IM SERVICES', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setFont(undefined, 'normal');
      doc.text('Service Request Completion Report', pageWidth / 2, 32, { align: 'center' });
      
      // Reset text color for body
      doc.setTextColor(0, 0, 0);
      
      let yPos = 55;
      
      // Request Details
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Request Information', 20, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text(`Request ID: ${request._id}`, 20, yPos);
      yPos += 7;
      doc.text(`Client Name: ${request.name}`, 20, yPos);
      yPos += 7;
      doc.text(`Email: ${request.email}`, 20, yPos);
      yPos += 7;
      doc.text(`Phone: ${request.phone || 'N/A'}`, 20, yPos);
      yPos += 7;
      doc.text(`Service Type: ${request.serviceType}`, 20, yPos);
      yPos += 7;
      doc.text(`Location: ${request.location || 'N/A'}`, 20, yPos);
      yPos += 7;
      doc.text(`Request Date: ${new Date(request.createdAt).toLocaleString()}`, 20, yPos);
      yPos += 15;
      
      // Workflow Steps
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Workflow Progress', 20, yPos);
      yPos += 10;
      
      // Workflow table
      const tableData = workflowSteps.map((step, index) => {
        const stepInfo = WORKFLOW_STEPS[index];
        return [
          `Step ${step.stepId}`,
          stepInfo.name,
          step.status === 'completed' ? 'Completed' : 'Pending',
          step.completedAt 
            ? new Date(step.completedAt).toLocaleString()
            : 'Not completed',
          (step.comments || []).length
        ];
      });
      
      doc.autoTable({
        startY: yPos,
        head: [['Step', 'Name', 'Status', 'Completed At', 'Comments']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255 },
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 60 },
          2: { cellWidth: 30 },
          3: { cellWidth: 50 },
          4: { cellWidth: 25 }
        }
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
      
      // Comments Section
      if (workflowSteps.some(step => step.comments && step.comments.length > 0)) {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Step Comments & Feedback', 20, yPos);
        yPos += 10;
        
        workflowSteps.forEach((step, index) => {
          if (step.comments && step.comments.length > 0) {
            const stepInfo = WORKFLOW_STEPS[index];
            
            if (yPos > 270) {
              doc.addPage();
              yPos = 20;
            }
            
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(`${stepInfo.name}:`, 20, yPos);
            yPos += 7;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            
            step.comments.forEach((commentObj) => {
              if (yPos > 280) {
                doc.addPage();
                yPos = 20;
              }
              
              const commentText = `• ${commentObj.text} (${new Date(commentObj.timestamp).toLocaleString()})`;
              const splitComment = doc.splitTextToSize(commentText, 170);
              doc.text(splitComment, 25, yPos);
              yPos += 5 * splitComment.length + 2;
            });
            
            yPos += 5;
          }
        });
      }
      
      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Generated on ${new Date().toLocaleString()} | Page ${i} of ${totalPages}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
      
      // Save PDF
      doc.save(`Service_Request_${request._id}_Report.pdf`);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF report');
    } finally {
      setGeneratingPDF(false);
    }
  };

  const getStepStatus = (stepId) => {
    const step = workflowSteps.find(s => s.stepId === stepId);
    return step?.status || 'pending';
  };

  const canMarkAsDone = (stepId) => {
    // First step can always be marked as done
    if (stepId === 1) return true;
    
    // Other steps can only be marked as done if previous step is completed
    const previousStep = workflowSteps.find(s => s.stepId === stepId - 1);
    return previousStep?.status === 'completed';
  };

  const allStepsCompleted = () => {
    return workflowSteps.every(step => step.status === 'completed');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{error || 'Request not found'}</p>
          <Link
            to="/admin/dashboard"
            className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Service Request Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage workflow and track progress
              </p>
            </div>
            
            {allStepsCompleted() && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleGeneratePDF}
                disabled={generatingPDF}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {generatingPDF ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download PDF Report
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Client Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{request.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-900 dark:text-white break-all">{request.email}</p>
                  </div>
                </div>
                
                {request.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{request.phone}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Service Type</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{request.serviceType}</p>
                  </div>
                </div>
                
                {request.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{request.location}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Request Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {request.message && (
                  <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Additional Details</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{request.message}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Workflow Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Workflow Progress
              </h2>
              
              <div className="space-y-6">
                {WORKFLOW_STEPS.map((stepTemplate, index) => {
                  const stepData = workflowSteps[index] || { status: 'pending', comments: [] };
                  const isCompleted = stepData.status === 'completed';
                  const canComplete = canMarkAsDone(stepTemplate.id);
                  const isActive = activeStep === stepTemplate.id;
                  const StepIcon = stepTemplate.icon;
                  
                  return (
                    <motion.div
                      key={stepTemplate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`border-2 rounded-xl p-6 transition-all ${
                        isCompleted
                          ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20'
                          : canComplete
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`p-3 rounded-xl ${
                            isCompleted
                              ? 'bg-green-500 dark:bg-green-600'
                              : canComplete
                              ? 'bg-blue-500 dark:bg-blue-600'
                              : 'bg-gray-300 dark:bg-neutral-600'
                          }`}>
                            <StepIcon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Step {stepTemplate.id}: {stepTemplate.name}
                              </h3>
                              {isCompleted && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                  Completed
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {stepTemplate.description}
                            </p>
                            
                            {stepData.completedAt && (
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>Completed: {new Date(stepData.completedAt).toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {!isCompleted && canComplete && (
                          <button
                            onClick={() => handleMarkAsDone(stepTemplate.id)}
                            disabled={updatingStep}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                          >
                            {updatingStep ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                            Mark as Done
                          </button>
                        )}
                      </div>

                      {/* Comments Section */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <button
                          onClick={() => setActiveStep(isActive ? null : stepTemplate.id)}
                          className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-3"
                        >
                          <MessageSquare className="w-4 h-4" />
                          {stepData.comments?.length || 0} Comment(s)
                        </button>

                        {/* Display Comments */}
                        {stepData.comments && stepData.comments.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {stepData.comments.map((commentObj, idx) => (
                              <div key={idx} className="bg-white dark:bg-neutral-700 rounded-lg p-3 text-sm">
                                <p className="text-gray-900 dark:text-white mb-1">{commentObj.text}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(commentObj.timestamp).toLocaleString()} • {commentObj.author}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3"
                            >
                              <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add your comment or feedback..."
                                rows="3"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-700 border-2 border-gray-200 dark:border-neutral-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setActiveStep(null);
                                    setComment('');
                                  }}
                                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleAddComment(stepTemplate.id)}
                                  disabled={!comment.trim() || submittingComment}
                                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                  {submittingComment ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Send className="w-4 h-4" />
                                  )}
                                  Post Comment
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestDetails;
