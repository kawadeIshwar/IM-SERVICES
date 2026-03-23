import { useState, useEffect, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, MapPin, X, Eye, RefreshCw, LayoutDashboard, ClipboardList, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css'; // Custom styles

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const bookingsData = response.data.bookings || [];
      
      // Convert bookings to calendar events
      const calendarEvents = bookingsData.map(booking => {
        const startDate = booking.preferredDate 
          ? new Date(booking.preferredDate) 
          : new Date(booking.createdAt);
        
        // Set time if available
        if (booking.preferredTime) {
          const [hours, minutes] = booking.preferredTime.split(':');
          startDate.setHours(parseInt(hours), parseInt(minutes));
        }

        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 2); // 2 hour default duration

        return {
          id: booking._id,
          title: `${booking.serviceType} - ${booking.name}`,
          start: startDate,
          end: endDate,
          resource: booking,
          status: booking.status || 'pending'
        };
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3b82f6'; // blue
    
    switch(event.status) {
      case 'confirmed':
        backgroundColor = '#10b981'; // green
        break;
      case 'completed':
        backgroundColor = '#6b7280'; // gray
        break;
      case 'cancelled':
        backgroundColor = '#ef4444'; // red
        break;
      case 'pending':
      default:
        backgroundColor = '#3b82f6'; // blue
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
  };

  const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Booking Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                <p className="font-semibold text-gray-900 dark:text-white">{event.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{event.email}</p>
                {event.phone && <p className="text-sm text-gray-600 dark:text-gray-300">{event.phone}</p>}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Service Type</p>
                <p className="font-semibold text-gray-900 dark:text-white">{event.serviceType}</p>
              </div>
            </div>

            {event.preferredDate && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Preferred Date & Time</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(event.preferredDate).toLocaleDateString()} {event.preferredTime && `at ${event.preferredTime}`}
                  </p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{event.location}</p>
                </div>
              </div>
            )}

            {event.message && (
              <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Additional Details</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{event.message}</p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                event.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                event.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' :
                event.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Pending'}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border dark:border-neutral-700 mb-6"
        >
          <div className="flex gap-1 p-2 overflow-x-auto">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 whitespace-nowrap"
            >
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 whitespace-nowrap"
            >
              <ClipboardList className="w-5 h-5" />
              Service Requests
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 whitespace-nowrap"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </Link>
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md whitespace-nowrap">
              <CalendarIcon className="w-5 h-5" />
              Calendar View
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Calendar View
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Visual scheduling and booking management
              </p>
            </div>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
        >
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
              </div>
            </div>
          ) : (
            <div style={{ height: '700px' }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
                view={view}
                onView={setView}
                views={['month', 'week', 'day', 'agenda']}
                popup
              />
            </div>
          )}
        </motion.div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
};

export default CalendarView;
