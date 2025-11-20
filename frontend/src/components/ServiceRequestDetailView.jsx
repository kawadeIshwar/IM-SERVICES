import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  X, Check, MessageSquare, Download, ChevronRight, Clock, 
  User, Calendar, FileText, CheckCircle2, Circle, Loader
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ServiceRequestDetailView = ({ request, onClose, onUpdate }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [requestData, setRequestData] = useState(request);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const token = localStorage.getItem('token');

  const steps = [
    { number: 1, name: 'Initial Request Review', key: 'step1' },
    { number: 2, name: 'Assessment & Planning', key: 'step2' },
    { number: 3, name: 'Implementation', key: 'step3' },
    { number: 4, name: 'Quality Check', key: 'step4' },
    { number: 5, name: 'Final Review & Closure', key: 'step5' }
  ];

  // Find the current active step (first incomplete step or last completed one)
  useEffect(() => {
    if (requestData.processSteps) {
      const firstIncomplete = steps.find(step => 
        !requestData.processSteps[step.key]?.completed
      );
      setActiveStep(firstIncomplete ? firstIncomplete.number : 5);
    }
  }, [requestData]);

  const handleMarkAsDone = async (stepNumber) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/process-tracking/${requestData._id}/steps/${stepNumber}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequestData(response.data.data);
      if (onUpdate) onUpdate();
      
      // Move to next step
      if (stepNumber < 5) {
        setActiveStep(stepNumber + 1);
      }
    } catch (error) {
      alert('Failed to mark step as done');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (stepNumber) => {
    if (!commentText.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/process-tracking/${requestData._id}/steps/${stepNumber}/comments`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequestData(response.data.data);
      setCommentText('');
      if (onUpdate) onUpdate();
    } catch (error) {
      alert('Failed to add comment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    setGeneratingPdf(true);
    try {
      const response = await axios.get(
        `${API_URL}/process-tracking/${requestData._id}/generate-pdf`,
        { 
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `service-report-${requestData.requestId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to generate PDF');
      console.error(error);
    } finally {
      setGeneratingPdf(false);
    }
  };

  const getStepStatus = (stepKey) => {
    if (!requestData.processSteps || !requestData.processSteps[stepKey]) {
      return { completed: false };
    }
    return requestData.processSteps[stepKey];
  };

  const allStepsCompleted = steps.every(step => getStepStatus(step.key).completed);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{requestData.requestId}</h2>
              <p className="text-blue-100">{requestData.serviceType}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {requestData.clientName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(requestData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {allStepsCompleted && (
                <button
                  onClick={handleGeneratePDF}
                  disabled={generatingPdf}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {generatingPdf ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  <span className="font-medium">Generate PDF</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left: Progress Timeline */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-4 sticky top-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Process Timeline</h3>
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const stepStatus = getStepStatus(step.key);
                    const isActive = activeStep === step.number;
                    const isCompleted = stepStatus.completed;

                    return (
                      <motion.div
                        key={step.number}
                        initial={false}
                        animate={{ 
                          backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                          scale: isActive ? 1.02 : 1
                        }}
                        className="relative"
                      >
                        <button
                          onClick={() => setActiveStep(step.number)}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            isActive ? 'shadow-md' : 'hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isActive
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-bold">{step.number}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-sm ${
                                isActive ? 'text-blue-700' : 'text-gray-700'
                              }`}>
                                {step.name}
                              </p>
                              {stepStatus.completedAt && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(stepStatus.completedAt).toLocaleString()}
                                </p>
                              )}
                            </div>
                            {isActive && (
                              <ChevronRight className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                        </button>
                        {index < steps.length - 1 && (
                          <div className={`absolute left-7 top-12 w-0.5 h-4 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Step Details */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {steps.map((step) => {
                  if (step.number !== activeStep) return null;
                  
                  const stepStatus = getStepStatus(step.key);
                  const isCompleted = stepStatus.completed;

                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Step Header */}
                      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{step.name}</h3>
                            <p className="text-gray-600 mt-1">Step {step.number} of 5</p>
                          </div>
                          {isCompleted ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                              <CheckCircle2 className="w-5 h-5" />
                              <span className="font-semibold">Completed</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleMarkAsDone(step.number)}
                              disabled={loading}
                              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-semibold"
                            >
                              {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                              ) : (
                                <Check className="w-5 h-5" />
                              )}
                              Mark as Done
                            </button>
                          )}
                        </div>

                        {isCompleted && stepStatus.completedByName && (
                          <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <span className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Completed by: <span className="font-medium">{stepStatus.completedByName}</span>
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(stepStatus.completedAt).toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Request Details for Step 1 */}
                        {step.number === 1 && (
                          <div className="mt-4 space-y-3">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">Problem Description</h4>
                              <p className="text-gray-700">{requestData.problemDescription}</p>
                            </div>
                            {requestData.machineModel && (
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-600">Machine Model</p>
                                  <p className="font-medium">{requestData.machineModel}</p>
                                </div>
                                {requestData.machineSerialNumber && (
                                  <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Serial Number</p>
                                    <p className="font-medium">{requestData.machineSerialNumber}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Comments Section */}
                      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Comments & Feedback
                        </h4>

                        {/* Existing Comments */}
                        <div className="space-y-3 mb-4">
                          {stepStatus.comments && stepStatus.comments.length > 0 ? (
                            stepStatus.comments.map((comment, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <span className="font-semibold text-gray-900">{comment.createdByName}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">No comments yet</p>
                          )}
                        </div>

                        {/* Add Comment */}
                        <div className="flex gap-3">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment or feedback..."
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                            rows="3"
                          />
                          <button
                            onClick={() => handleAddComment(step.number)}
                            disabled={loading || !commentText.trim()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-semibold h-fit"
                          >
                            Post
                          </button>
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between items-center pt-4">
                        <button
                          onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
                          disabled={activeStep === 1}
                          className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 font-medium"
                        >
                          ← Previous Step
                        </button>
                        <button
                          onClick={() => activeStep < 5 && setActiveStep(activeStep + 1)}
                          disabled={activeStep === 5}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                        >
                          Next Step →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{steps.filter(s => getStepStatus(s.key).completed).length}</span> of {steps.length} steps completed
            </div>
            <div className="flex items-center gap-2">
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(steps.filter(s => getStepStatus(s.key).completed).length / steps.length) * 100}%` 
                  }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {Math.round((steps.filter(s => getStepStatus(s.key).completed).length / steps.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceRequestDetailView;
