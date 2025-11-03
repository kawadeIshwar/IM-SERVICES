import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { 
  Calendar, Clock, User, Mail, Phone, MapPin, FileText, Send, CheckCircle,
  Settings, Wrench, Shield, Zap, AlertCircle, Droplet, Activity, MoreHorizontal,
  ArrowRight, Sparkles, Award, TrendingUp, Check
} from 'lucide-react'
import SEO from '../components/SEO'

const Booking = () => {
  const location = useLocation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    machineType: '',
    machineBrand: '',
    serviceType: '',
    otherServiceDetails: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})

  // Auto-select service type from URL parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const serviceParam = searchParams.get('service')
    
    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        serviceType: serviceParam
      }))
      
      // Scroll to service type section after a short delay
      setTimeout(() => {
        const serviceSection = document.querySelector('[name="serviceType"]')
        if (serviceSection) {
          serviceSection.closest('.space-y-6')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)
    }
  }, [location.search])

  const services = [
    {
      id: 'performance',
      title: 'Machine Performance Testing',
      description: '7-Factor comprehensive analysis',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'health',
      title: 'Machine Health Checkup',
      description: 'Complete diagnostic evaluation',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 'retrofit',
      title: 'Retrofitting & Reconditioning',
      description: 'Upgrade and modernization',
      icon: Settings,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      id: 'preventive',
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance programs',
      icon: Wrench,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 'breakdown',
      title: 'Breakdown Maintenance',
      description: '24/7 emergency repair services',
      icon: AlertCircle,
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50'
    },
    {
      id: 'cooling',
      title: 'Cooling System Service',
      description: 'Temperature control solutions',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50'
    },
    {
      id: 'power',
      title: 'Power Optimization',
      description: 'Energy efficiency solutions',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      id: 'other',
      title: 'Other Services',
      description: 'Custom solutions for your needs',
      icon: TrendingUp,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50'
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service type'
    if (formData.serviceType === 'other' && !formData.otherServiceDetails.trim()) {
      newErrors.otherServiceDetails = 'Please specify the service details'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      setError('Please fill in all required fields correctly')
      return
    }

    setLoading(true)

    try {
      // Get service title for display
      const selectedService = services.find(s => s.id === formData.serviceType)
      
      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_BOOKING,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company || 'Not provided',
          location: formData.location,
          machine_type: formData.machineType || 'Not specified',
          machine_brand: formData.machineBrand || 'Not specified',
          service_type: selectedService?.title || formData.serviceType,
          other_service_details: formData.otherServiceDetails || 'N/A',
          preferred_date: formData.preferredDate || 'Not specified',
          preferred_time: formData.preferredTime || 'Not specified',
          message: formData.message || 'No additional message',
          to_name: 'IM Services',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      
      setSuccess(true)
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          location: '',
          machineType: '',
          machineBrand: '',
          serviceType: '',
          otherServiceDetails: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        })
        setSuccess(false)
        setErrors({})
      }, 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setError('Failed to submit booking. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Book Service - Schedule Your Machine Maintenance | IM Services"
        description="Book professional injection moulding machine services online. Quick and easy booking for performance testing, maintenance, repairs, and emergency breakdown support in Pune."
        keywords="book machine service, schedule maintenance, IMM service booking, emergency repair booking, machine service appointment pune"
        canonical="https://imservices.netlify.app/booking"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-6 py-2 mb-6 shadow-sm"
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm">Professional Machine Services</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Schedule Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expert Service</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Book professional machine maintenance with our easy booking form
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!success ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Book Your Service
                  </h2>
                  <p className="text-gray-600">
                    Fill in the form below and we'll get back to you shortly
                  </p>
                </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4"
                    >
                      <p className="text-red-700 font-medium">{error}</p>
                    </motion.div>
                  )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Type Selection with Radio Buttons */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-4">
                      Select Service Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <label
                          key={service.id}
                          className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.serviceType === service.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="serviceType"
                            value={service.id}
                            checked={formData.serviceType === service.id}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <service.icon className={`w-5 h-5 ${
                                formData.serviceType === service.id ? 'text-blue-600' : 'text-gray-400'
                              }`} />
                              <span className={`font-bold text-sm ${
                                formData.serviceType === service.id ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {service.title}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">{service.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.serviceType && (
                      <p className="mt-2 text-sm text-red-600">{errors.serviceType}</p>
                    )}
                  </div>

                  {/* Conditional Other Service Details */}
                  {formData.serviceType === 'other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-gray-700 font-semibold mb-2">
                        Specify Other Service <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="otherServiceDetails"
                        value={formData.otherServiceDetails}
                        onChange={handleChange}
                        rows="3"
                        className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none ${
                          errors.otherServiceDetails ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="Please describe the service you need..."
                      ></textarea>
                      {errors.otherServiceDetails && (
                        <p className="mt-2 text-sm text-red-600">{errors.otherServiceDetails}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-gray-50 border-2 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all ${
                            errors.name ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-gray-50 border-2 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full bg-gray-50 border-2 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                        placeholder="Your Company (Optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`w-full bg-gray-50 border-2 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all ${
                          errors.location ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="City, State"
                      />
                    </div>
                    {errors.location && (
                      <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Machine Type
                        </label>
                        <input
                          type="text"
                          name="machineType"
                          value={formData.machineType}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                          placeholder="e.g., CNC, Lathe"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Machine Brand
                        </label>
                        <input
                          type="text"
                          name="machineBrand"
                          value={formData.machineBrand}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                          placeholder="e.g., Siemens, Fanuc"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="time"
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Additional Information
                      </label>
                      <div className="relative">
                        <FileText size={18} className="absolute left-4 top-4 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
                          placeholder="Tell us about your machine issues or specific requirements..."
                        ></textarea>
                      </div>
                    </div>

                  <div className="flex justify-center pt-6">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      className="w-full sm:w-auto group flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send size={20} className="group-hover:rotate-12 transition-transform" />
                            <span>Submit Booking</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
            </motion.div>
          ) : (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/50"
                  >
                    <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 text-lg mb-10">
                    Thank you for choosing IM Services. We've received your booking request and will contact you shortly to confirm the details.
                  </p>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-blue-100">
                    <h3 className="text-gray-900 font-bold text-xl mb-6 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Booking Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                        <span className="text-gray-600 font-medium">Service:</span>
                        <span className="text-gray-900 font-bold">{formData.serviceType}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <span className="text-gray-900 font-bold">{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="text-gray-900 font-bold">{formData.email}</span>
                      </div>
                      {formData.preferredDate && (
                        <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                          <span className="text-gray-600 font-medium">Preferred Date:</span>
                          <span className="text-gray-900 font-bold">
                            {new Date(formData.preferredDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-gray-600 text-sm bg-blue-50 rounded-lg p-4 border border-blue-100">
                      ✉️ We'll send a confirmation email to <span className="text-blue-600 font-bold">{formData.email}</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.a
                        href="tel:+919730992561"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 font-semibold transition-all shadow-lg"
                      >
                        <Phone size={20} />
                        <span>Call Us Now</span>
                      </motion.a>
                      
                      <motion.button
                        onClick={() => setSuccess(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-xl shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-600/50 font-bold transition-all"
                      >
                        <ArrowRight size={20} />
                        <span>Book Another Service</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-gray-600 text-lg">
              Our team is ready to help you 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-transparent hover:border-blue-200 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-600 mb-4">Call us anytime</p>
              <a href="tel:+919730992561" className="block text-blue-600 font-bold text-lg hover:text-blue-700 mb-1 transition-colors">+91 97309 92561</a>
              <a href="tel:+917875601427" className="block text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors">+91 78756 01427</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-transparent hover:border-purple-200 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Quick response time</p>
              <a href="mailto:imservices4444@gmail.com" className="text-purple-600 font-bold text-lg hover:text-purple-700 transition-colors">imservices4444@gmail.com</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-transparent hover:border-orange-200 transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/50">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Our location</p>
              <p className="text-orange-600 font-bold text-lg">Shikrapur, Pune</p>
              <p className="text-gray-700 font-medium">Maharashtra, India</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking
