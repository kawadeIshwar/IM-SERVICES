import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  LayoutDashboard, ClipboardList, Calendar, CheckCircle, AlertTriangle, Clock,
  Search, RefreshCw, LogOut, Eye, Trash2, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceRequestDetailView from '../components/ServiceRequestDetailView';

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
      received: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      confirmed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">IM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="flex gap-1 p-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'requests', label: 'Service Requests', icon: ClipboardList },
              { id: 'bookings', label: 'Bookings', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
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

            <div className="bg-white rounded-xl p-6 shadow-md border">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Requests by Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.byStatus.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getStatusColor(stat._id)}`}>
                      {stat._id.replace('_', ' ').toUpperCase()}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Status</option>
                  <option value="received">Received</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={fetchDashboardData} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw className="w-5 h-5" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Request ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredRequests.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{request.requestId}</td>
                        <td className="px-6 py-4 text-sm">{request.clientName}</td>
                        <td className="px-6 py-4 text-sm">{request.serviceType}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.currentStatus)}`}>
                            {request.currentStatus.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{new Date(request.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => setSelectedRequest(request)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteRequest(request._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
            <div className="bg-white rounded-xl p-6 shadow-md border">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button onClick={fetchDashboardData} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw className="w-5 h-5" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900">{booking.name}</h4>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                      <p className="text-sm text-gray-600">{booking.phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Service:</span> {booking.serviceType}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                    {booking.location && <p><span className="font-semibold">Location:</span> {booking.location}</p>}
                  </div>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              ))}
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
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="font-semibold">{selectedBooking.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{new Date(selectedBooking.preferredDate).toLocaleDateString()}</p>
                </div>
                {selectedBooking.location && (
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{selectedBooking.location}</p>
                  </div>
                )}
              </div>
              {selectedBooking.message && (
                <div>
                  <p className="text-sm text-gray-600">Message</p>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedBooking.message}</p>
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
