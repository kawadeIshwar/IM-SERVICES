import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const AnalyticsDashboard = ({ serviceRequests, stats }) => {
  const [timeframe, setTimeframe] = useState('month'); // week, month, year
  const [chartData, setChartData] = useState({
    statusDistribution: [],
    serviceTypes: [],
    monthlyTrends: [],
    completionTimes: []
  });

  useEffect(() => {
    processAnalytics();
  }, [serviceRequests, timeframe]);

  const processAnalytics = () => {
    if (!serviceRequests || serviceRequests.length === 0) return;

    // Status Distribution
    const statusCounts = serviceRequests.reduce((acc, req) => {
      acc[req.currentStatus] = (acc[req.currentStatus] || 0) + 1;
      return acc;
    }, {});

    const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
      name: status.replace('_', ' ').toUpperCase(),
      value: count,
      color: getStatusColor(status)
    }));

    // Service Types Distribution
    const serviceTypeCounts = serviceRequests.reduce((acc, req) => {
      acc[req.serviceType] = (acc[req.serviceType] || 0) + 1;
      return acc;
    }, {});

    const serviceTypes = Object.entries(serviceTypeCounts)
      .map(([type, count]) => ({
        name: type.length > 20 ? type.substring(0, 20) + '...' : type,
        count,
        fullName: type
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Monthly Trends (last 6 months)
    const monthlyData = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      monthlyData[monthKey] = { received: 0, completed: 0 };
    }

    serviceRequests.forEach(req => {
      const createdDate = new Date(req.createdAt);
      const monthKey = createdDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].received++;
        if (req.currentStatus === 'completed') {
          monthlyData[monthKey].completed++;
        }
      }
    });

    const monthlyTrends = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data
    }));

    // Completion Times (for completed requests)
    const completedRequests = serviceRequests.filter(req => 
      req.currentStatus === 'completed' && req.totalDuration
    );

    const completionTimes = [
      { range: '< 24h', count: 0 },
      { range: '24-48h', count: 0 },
      { range: '48-72h', count: 0 },
      { range: '> 72h', count: 0 }
    ];

    completedRequests.forEach(req => {
      const hours = req.totalDuration;
      if (hours < 24) completionTimes[0].count++;
      else if (hours < 48) completionTimes[1].count++;
      else if (hours < 72) completionTimes[2].count++;
      else completionTimes[3].count++;
    });

    setChartData({
      statusDistribution,
      serviceTypes,
      monthlyTrends,
      completionTimes
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      received: '#3b82f6',
      pending: '#eab308',
      in_progress: '#8b5cf6',
      completed: '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const MetricCard = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-neutral-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const completionRate = stats.totalRequests > 0 
    ? ((stats.completedRequests / stats.totalRequests) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Requests"
          value={stats.totalRequests || 0}
          icon={Clock}
          color="bg-blue-600"
        />
        <MetricCard
          title="Completed"
          value={stats.completedRequests || 0}
          icon={CheckCircle}
          color="bg-green-600"
        />
        <MetricCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={TrendingUp}
          color="bg-purple-600"
        />
        <MetricCard
          title="Overdue"
          value={stats.overdueCount || 0}
          icon={AlertTriangle}
          color="bg-red-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Status Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-neutral-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Status Distribution
          </h3>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => {
                    if (percent > 0.05) {
                      return `${name.split(' ').slice(0, 2).join(' ')} ${(percent * 100).toFixed(0)}%`;
                    }
                    return '';
                  }}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {chartData.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Service Types Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-neutral-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Top Service Types
          </h3>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.serviceTypes} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#9ca3af', fontSize: 11 }} 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Trends Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-neutral-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Monthly Trends
          </h3>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Line 
                  type="monotone" 
                  dataKey="received" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  name="Received"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Completion Time Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-neutral-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Completion Time Distribution
          </h3>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.completionTimes} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
