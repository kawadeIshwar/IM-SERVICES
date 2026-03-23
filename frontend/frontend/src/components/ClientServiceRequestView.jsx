import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, CheckCircle2, Circle, Clock, User, Calendar, 
  FileText, MessageSquare, Package, AlertCircle, Download
} from 'lucide-react';

const ClientServiceRequestView = ({ request, onClose }) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { number: 1, name: 'Initial Request Review', key: 'step1' },
    { number: 2, name: 'Assessment & Planning', key: 'step2' },
    { number: 3, name: 'Implementation', key: 'step3' },
    { number: 4, name: 'Quality Check', key: 'step4' },
    { number: 5, name: 'Final Review & Closure', key: 'step5' }
  ];

  const getStepStatus = (stepKey) => {
    if (!request.processSteps || !request.processSteps[stepKey]) {
      return { completed: false, comments: [] };
    }
    return request.processSteps[stepKey];
  };

  const completedSteps = steps.filter(step => getStepStatus(step.key).completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-100 text-blue-800 border-blue-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-300',
      completed: 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

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
              <h2 className="text-2xl font-bold mb-2">{request.requestId}</h2>
              <p className="text-blue-100">{request.serviceType}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Submitted: {new Date(request.createdAt).toLocaleDateString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.currentStatus)}`}>
                  {request.currentStatus.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Request Details */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Request Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Priority Level</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(request.priority)}`}>
                    {request.priority.toUpperCase()}
                  </span>
                </div>

                {request.machineModel && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Machine Model</p>
                    <p className="font-semibold text-gray-900">{request.machineModel}</p>
                  </div>
                )}

                {request.machineSerialNumber && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Serial Number</p>
                    <p className="font-semibold text-gray-900">{request.machineSerialNumber}</p>
                  </div>
                )}

                {request.location && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-semibold text-gray-900">{request.location}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Problem Description</p>
                <p className="text-gray-900">{request.problemDescription}</p>
              </div>

              {request.additionalNotes && (
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 mb-2">Additional Notes</p>
                  <p className="text-blue-900">{request.additionalNotes}</p>
                </div>
              )}
            </div>

            {/* Progress Timeline */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Progress Timeline
                </h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {completedSteps} of {steps.length} steps completed
                  </p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const stepStatus = getStepStatus(step.key);
                  const isCompleted = stepStatus.completed;

                  return (
                    <div
                      key={step.number}
                      className={`relative border-2 rounded-xl p-4 transition-all ${
                        isCompleted 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${
                              isCompleted ? 'text-green-900' : 'text-gray-700'
                            }`}>
                              {step.number}. {step.name}
                            </h4>
                            {isCompleted && (
                              <span className="text-xs text-green-700 font-medium">
                                ✓ Completed
                              </span>
                            )}
                          </div>

                          {stepStatus.completedAt && (
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(stepStatus.completedAt).toLocaleString()}
                              </span>
                              {stepStatus.completedByName && (
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  By: {stepStatus.completedByName}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Comments */}
                          {stepStatus.comments && stepStatus.comments.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                Admin Comments:
                              </p>
                              {stepStatus.comments.map((comment, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200">
                                  <p className="text-gray-700 text-sm mb-1">{comment.content}</p>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <span>{comment.createdByName}</span>
                                    <span>•</span>
                                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {!isCompleted && index === completedSteps && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="font-medium">Currently in progress...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Information */}
            {request.totalDuration && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Service Completion Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-600">Total Duration</p>
                    <p className="text-2xl font-bold text-blue-900">{request.totalDuration.toFixed(1)} hours</p>
                  </div>
                  {request.completedAt && (
                    <div>
                      <p className="text-sm text-blue-600">Completed On</p>
                      <p className="text-lg font-semibold text-blue-900">
                        {new Date(request.completedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Need help?</span> Contact support for any questions about your service request.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ClientServiceRequestView;
