import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Download,
  Eye,
  Edit,
  LogOut,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import ClientServiceRequestView from '../components/ClientServiceRequestView';
import SimplePDFViewer from '../components/SimplePDFViewer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [selectedPdfName, setSelectedPdfName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'reports', or 'requests'

  useEffect(() => {
    // Check if user is admin and redirect to dashboard
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.role === 'admin') {
      navigate('/admin/dashboard');
      return;
    }
    
    fetchUserData();
    fetchReports();
    fetchServiceRequests();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      setError('Failed to load user data');
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (token && storedUser) {
        const response = await axios.get(`${API_URL}/reports/client/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          console.log('Reports data:', response.data.data);
          setReports(response.data.data);
        }
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        const response = await axios.get(`${API_URL}/service-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setServiceRequests(response.data.data || []);
        }
      }
    } catch (err) {
      console.error('Failed to load service requests:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleViewPDF = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch the PDF with authentication
      const response = await fetch(`${API_URL}/process-tracking/${requestId}/generate-pdf`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }
      
      // Convert to blob and create object URL
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      setSelectedPdfUrl(blobUrl);
      setSelectedPdfName(`service-report-${requestId}.pdf`);
    } catch (error) {
      console.error('Error viewing PDF:', error);
      alert('Failed to load PDF. Please try again or contact support.');
    }
  };

  const handleDownloadPDF = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/process-tracking/${requestId}/generate-pdf`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `service-report-${requestId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg">{error}</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your account and view your service reports</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex gap-4 border-b border-gray-200 dark:border-neutral-700">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-4 px-6 font-semibold transition-colors relative ${
                activeTab === 'info'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Account Information
              {activeTab === 'info' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-4 px-6 font-semibold transition-colors relative ${
                activeTab === 'requests'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              My Service Requests ({serviceRequests.length})
              {activeTab === 'requests' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`pb-4 px-6 font-semibold transition-colors relative ${
                activeTab === 'reports'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Completed Reports ({reports.length})
              {activeTab === 'reports' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'info' ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-3xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{user?.email}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    user?.role === 'admin'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span>Member Since</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    to="/edit-profile"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user?.name || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user?.email || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Phone Number</label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user?.phone || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Account Type</label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="font-medium capitalize">{user?.role || 'Client'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Company Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Company Name</label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user?.company || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Address</label>
                    <div className="flex items-start gap-2 text-gray-900 dark:text-gray-100">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="font-medium">{user?.address || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-700">{reports.length}</p>
                  <p className="text-sm text-gray-600 font-medium">Total Reports</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-700">{reports.length}</p>
                  <p className="text-sm text-gray-600 font-medium">Completed Services</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-purple-700">
                    {user?.createdAt ? Math.floor((Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24 * 30)) : 0}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Months Active</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'requests' ? (
          <motion.div
            key="requests"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                My Service Requests
              </h3>
              <Link
                to="/booking"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                New Request
              </Link>
            </div>

            {serviceRequests.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Service Requests Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't submitted any service requests.</p>
                <Link
                  to="/booking"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Submit Your First Request
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {serviceRequests.map((request, index) => {
                  const getStatusColor = (status) => {
                    const colors = {
                      received: 'bg-blue-100 text-blue-800 border-blue-200',
                      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                      in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
                      completed: 'bg-green-100 text-green-800 border-green-200'
                    };
                    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
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
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-2 border-gray-200 dark:border-neutral-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{request.requestId}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.currentStatus)}`}>
                              {request.currentStatus.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                              {request.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{request.serviceType}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: {new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                        {request.machineModel && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Settings className="w-4 h-4" />
                            <span>{request.machineModel}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{request.problemDescription}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          {request.processSteps && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Progress: {Object.values(request.processSteps).filter(s => s.completed).length} / 5 steps completed
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="reports"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Service Reports
              </h3>
              <Link
                to="/booking"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Request New Service
              </Link>
            </div>

            {reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Reports Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any service reports yet.</p>
                <Link
                  to="/booking"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Request Your First Service
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-2 border-gray-200 dark:border-neutral-700 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-lg font-bold text-gray-900">{report.requestId}</h4>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                            Completed
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span className="font-medium">{report.serviceType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Completed: {report.completedAt 
                                ? new Date(report.completedAt).toLocaleDateString()
                                : report.createdAt 
                                ? new Date(report.createdAt).toLocaleDateString()
                                : 'N/A'
                              }
                            </span>
                          </div>
                          {report.totalDuration && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>Duration: {report.totalDuration.toFixed(1)} hours</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>
                              Report Generated: {report.reportGeneratedAt 
                                ? new Date(report.reportGeneratedAt).toLocaleDateString()
                                : report.createdAt
                                ? new Date(report.createdAt).toLocaleDateString()
                                : 'N/A'
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleViewPDF(report._id)}
                          className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors group-hover:scale-110"
                          title="View Report"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(report._id)}
                          className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors group-hover:scale-110"
                          title="Download Report"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Service Request Detail Modal */}
      {selectedRequest && (
        <ClientServiceRequestView
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {/* PDF Viewer Modal */}
      {selectedPdfUrl && (
        <SimplePDFViewer
          pdfUrl={selectedPdfUrl}
          fileName={selectedPdfName}
          onClose={() => {
            // Revoke the blob URL to free up memory
            if (selectedPdfUrl.startsWith('blob:')) {
              window.URL.revokeObjectURL(selectedPdfUrl);
            }
            setSelectedPdfUrl(null);
            setSelectedPdfName('');
          }}
        />
      )}
    </div>
  );
};

export default Profile;
