import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Calendar, Clock, User, Mail, Phone, MapPin, FileText, Send, CheckCircle } from 'lucide-react'

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    machineType: '',
    machineBrand: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const serviceTypes = [
    'Machine Performance Testing',
    'Machine Health Checkup',
    'Retrofitting & Reconditioning',
    'Preventive Maintenance',
    'Breakdown Maintenance',
    'Cooling System Service',
    'Power Optimization',
    'Other'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await axios.post('/api/bookings', formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        location: '',
        machineType: '',
        machineBrand: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to submit booking. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              Book a <span className="text-gradient">Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Schedule your machine maintenance or request an on-site visit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-dark-900 border border-gray-800 rounded-xl p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone size={20} className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Call Us</p>
                      <p className="text-white">+91 9730992561</p>
                      <p className="text-white">+91 7875601427</p>
                      <p className="text-white">+91 8551035501</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail size={20} className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white">imservices4444@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <p className="text-white">Shikrapur, Pune, Maharashtra</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-primary-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Working Hours</p>
                      <p className="text-white">Mon - Sat: 9:00 AM - 7:00 PM</p>
                      <p className="text-white">24/7 Emergency Support</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  <p className="text-gray-400 text-sm">
                    For urgent breakdown support, please call us directly for immediate assistance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-dark-900 border border-gray-800 rounded-xl p-8">
                {success && (
                  <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start space-x-3">
                    <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-green-500 font-semibold">Booking Request Submitted!</p>
                      <p className="text-gray-400 text-sm mt-1">We'll contact you shortly to confirm your appointment.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-500">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Full Name <span className="text-accent-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Phone Number <span className="text-accent-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Email Address <span className="text-accent-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Location <span className="text-accent-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  {/* Machine Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Machine Type
                      </label>
                      <input
                        type="text"
                        name="machineType"
                        value={formData.machineType}
                        onChange={handleChange}
                        className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="e.g., Horizontal, Vertical"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Machine Brand
                      </label>
                      <input
                        type="text"
                        name="machineBrand"
                        value={formData.machineBrand}
                        onChange={handleChange}
                        className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="e.g., Haitian, Engel"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Service Type <span className="text-accent-500">*</span>
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  {/* Scheduling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                          type="time"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Additional Information
                    </label>
                    <div className="relative">
                      <FileText size={20} className="absolute left-3 top-3 text-gray-500" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your machine issues or specific requirements..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-accent-600 to-accent-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking
