import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, User, Building2, MessageSquare, Calendar } from 'lucide-react'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

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
      await axios.post('/api/contact', formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+91 9730992561', '+91 7875601427', '+91 8551035501'],
      color: 'from-blue-500 to-cyan-500',
      link: 'tel:+919730992561'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: ['imservices4444@gmail.com'],
      color: 'from-cyan-500 to-indigo-500',
      link: 'mailto:imservices4444@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Shikrapur, Pune', 'Maharashtra, India'],
      color: 'from-indigo-500 to-purple-500',
      link: 'https://maps.google.com/?q=Shikrapur,Pune'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 7:00 PM', '24/7 Emergency Support'],
      color: 'from-purple-500 to-pink-500',
      link: null
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      <SEO 
        title="Contact Us - Get in Touch with IM Services | 24/7 Support"
        description="Contact IM Services for injection moulding machine maintenance and repair. Call +91-9730992561 or email us. We provide 24/7 emergency support in Pune, Maharashtra."
        keywords="contact IMM services, injection moulding machine support, emergency repair contact, machine service pune contact, 24/7 support"
        canonical="https://imservices.netlify.app/contact"
      />
      
      {/* Hero Section - Modern Design */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-cyan-100 text-primary-700 px-5 py-2 rounded-full mb-6"
            >
              <MessageSquare size={18} />
              <span className="text-sm font-bold">Get In Touch</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-6">
              Contact <span className="bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Reach out to us for any inquiries, support, or consultations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-primary-300 h-full"
                >
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="text-white" size={32} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{info.title}</h3>
                  
                  {/* Details */}
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 font-medium leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>

                  {/* Decorative gradient bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${info.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>
                </motion.div>
              )

              return info.link ? (
                <a key={index} href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="block">
                  {CardContent}
                </a>
              ) : (
                <div key={index}>{CardContent}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-slate-200"
            >
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-cyan-100 text-primary-700 px-4 py-2 rounded-full mb-4">
                  <Send size={18} />
                  <span className="text-sm font-bold">Quick Contact</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3">
                  Send Us a Message
                </h2>
                <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>

              {success && (
                <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start space-x-3">
                  <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-green-500 font-semibold">Message Sent Successfully!</p>
                    <p className="text-gray-400 text-sm mt-1">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-slate-900 font-bold mb-3">
                    <User size={18} className="text-primary-600" />
                    <span>Full Name <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center space-x-2 text-slate-900 font-bold mb-3">
                      <Mail size={18} className="text-primary-600" />
                      <span>Email Address <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-slate-900 font-bold mb-3">
                      <Phone size={18} className="text-primary-600" />
                      <span>Phone Number <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-slate-900 font-bold mb-3">
                    <MessageSquare size={18} className="text-primary-600" />
                    <span>Subject <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-slate-900 font-bold mb-3">
                    <MessageCircle size={18} className="text-primary-600" />
                    <span>Your Message <span className="text-red-500">*</span></span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:border-primary-500 focus:bg-white focus:outline-none transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-primary-600 via-cyan-500 to-indigo-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Section */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200">
                <div className="p-6 bg-gradient-to-r from-primary-500 to-cyan-500">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-white" size={24} />
                    <h2 className="text-2xl font-heading font-bold text-white">
                      Our Location
                    </h2>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.18174830705!2d73.69815195!3d18.52461605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IM Services Location"
                ></iframe>
              </div>

              {/* Company Details */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Building2 className="text-primary-600" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">Company Details</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <Building2 size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Company Name</p>
                      <p className="text-slate-900 font-bold">IM Services</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <Calendar size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">GSTIN</p>
                      <p className="text-slate-900 font-bold">27AZFPG7021B1ZW</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                    <MapPin size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Address</p>
                      <p className="text-slate-900 font-bold">Shikrapur, Pune, Maharashtra, India</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919730992561?text=Hello! I would like to inquire about your services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
