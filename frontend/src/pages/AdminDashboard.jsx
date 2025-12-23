import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  LayoutDashboard, ClipboardList, Calendar, CheckCircle, AlertTriangle, Clock,
  Search, RefreshCw, LogOut, Eye, Trash2, X, BarChart3, Settings
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ServiceRequestDetailView from '../components/ServiceRequestDetailView';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ChangePassword from '../components/ChangePassword';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalRequests: 0, completedRequests: 0, overdueCount: 0, avgCompletionTime: 0, byStatus: [] });
  const [serviceRequests, setServiceRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      // Fetch stats and service requests
      const [statsRes, requestsRes] = await Promise.all([
        axios.get(`${API_URL}/service-requests/stats`, { headers }),
        axios.get(`${API_URL}/service-requests`, { headers })
      ]);
      
      setStats(statsRes.data.data);
      setServiceRequests(requestsRes.data.data);
      
      // Try to fetch bookings, but don't fail if it errors
      try {
        const bookingsRes = await axios.get(`${API_URL}/bookings`, { headers });
        setBookings(bookingsRes.data.bookings || []);
      } catch (bookingError) {
        console.warn('Failed to load bookings:', bookingError);
        setBookings([]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/service-requests/${requestId}/status`,
        { status: newStatus, notes: `Status updated to ${newStatus}` },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
      setSelectedRequest(null);
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const deleteRequest = async (requestId) => {
    if (!confirm('Delete this request?')) return;
    try {
      await axios.delete(`${API_URL}/service-requests/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDashboardData();
      setSelectedRequest(null);
    } catch (error) {
      alert('Failed to delete request');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-neutral-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const filteredRequests = serviceRequests.filter(req => {
    const matchesStatus = !filterStatus || req.currentStatus === filterStatus;
    const matchesSearch = !searchTerm || 
      req.requestId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = !filterStatus || booking.status === filterStatus;
    const matchesSearch = !searchTerm || booking.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">IM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user.name}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border dark:border-neutral-700 mb-6">
          <div className="flex gap-1 p-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'requests', label: 'Service Requests', icon: ClipboardList },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            <Link
              to="/admin/calendar"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 whitespace-nowrap"
            >
              <Calendar className="w-5 h-5" />
              Calendar View
            </Link>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={ClipboardList} title="Total Requests" value={stats.totalRequests} color="bg-gradient-to-br from-blue-500 to-blue-600" />
              <StatCard icon={CheckCircle} title="Completed" value={stats.completedRequests} color="bg-gradient-to-br from-green-500 to-green-600" />
              <StatCard icon={AlertTriangle} title="Overdue" value={stats.overdueCount} color="bg-gradient-to-br from-red-500 to-red-600" />
              <StatCard icon={Clock} title="Avg. Completion" value={`${stats.avgCompletionTime}h`} color="bg-gradient-to-br from-purple-500 to-purple-600" />
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border dark:border-neutral-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Requests by Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.byStatus.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getStatusColor(stat._id)}`}>
                      {stat._id.replace('_', ' ').toUpperCase()}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border dark:border-neutral-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-neutral-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 dark:border-neutral-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Status</option>
                  <option value="received">Received</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button 
                  onClick={fetchDashboardData} 
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border dark:border-neutral-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-neutral-900 border-b dark:border-neutral-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Request ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-neutral-700">
                    {filteredRequests.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{request.requestId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{request.clientName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{request.serviceType}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.currentStatus)}`}>
                            {request.currentStatus.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{new Date(request.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => setSelectedRequest(request)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteRequest(request._id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border dark:border-neutral-700">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-neutral-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
                <button 
                  onClick={fetchDashboardData} 
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border dark:border-neutral-700 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{booking.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{booking.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{booking.phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-900 dark:text-gray-300">
                    <p><span className="font-semibold">Service:</span> {booking.serviceType}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                    {booking.location && <p><span className="font-semibold">Location:</span> {booking.location}</p>}
                  </div>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard serviceRequests={serviceRequests} stats={stats} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border dark:border-neutral-700">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your admin account settings and security</p>
              </div>
              <ChangePassword isModal={false} />
            </div>
          </div>
        )}
      </div>

      {/* Request Details Modal - New Process Tracking View */}
      {selectedRequest && (
        <ServiceRequestDetailView
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={fetchDashboardData}
        />
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg">
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedBooking.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{new Date(selectedBooking.preferredDate).toLocaleDateString()}</p>
                </div>
                {selectedBooking.location && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedBooking.location}</p>
                  </div>
                )}
              </div>
              {selectedBooking.message && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Message</p>
                  <p className="mt-1 p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg text-gray-900 dark:text-gray-300">{selectedBooking.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
