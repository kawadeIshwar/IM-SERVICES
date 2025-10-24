import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, CheckCircle, TrendingUp, Zap, Shield, Clock, Star } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service and technical expertise.',
      color: 'from-primary-500 to-cyan-500'
    },
    {
      icon: <Users size={40} />,
      title: 'Customer Focus',
      description: 'Your machine performance and satisfaction are our top priorities.',
      color: 'from-cyan-500 to-indigo-500'
    },
    {
      icon: <CheckCircle size={40} />,
      title: 'Reliability',
      description: '24/7 support and consistent service delivery you can count on.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Innovation',
      description: 'Staying ahead with latest technologies and maintenance techniques.',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const milestones = [
    { year: '2008', event: 'Company Founded in Pune', icon: <Star size={24} /> },
    { year: '2012', event: 'Expanded to 50+ Client Base', icon: <Users size={24} /> },
    { year: '2016', event: 'Introduced 7-Factor Performance Testing', icon: <Zap size={24} /> },
    { year: '2020', event: 'Reached 500+ Machines Serviced', icon: <Award size={24} /> },
    { year: '2024', event: 'Leading IM Machine Service Provider in Maharashtra', icon: <TrendingUp size={24} /> }
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section - Modern Design */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
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
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-5 py-2 rounded-full mb-6"
            >
              <Award size={18} />
              <span className="text-sm font-bold">15+ Years of Excellence</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-6">
              About <span className="bg-gradient-to-r from-primary-600 via-cyan-500 to-primary-600 bg-clip-text text-transparent">IM Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for injection moulding machine maintenance and optimization across Maharashtra
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview - Unique Layout */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgb(59 130 246) 1px, transparent 1px), linear-gradient(to bottom, rgb(59 130 246) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-cyan-100 text-primary-700 px-4 py-2 rounded-full mb-6">
                <Shield size={16} />
                <span className="text-sm font-bold">Trusted by 200+ Companies</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">IM Services</strong> is a leading provider of comprehensive technical solutions for injection moulding machines, based in Shikrapur, Pune, Maharashtra. With over <strong className="text-primary-600">15 years of industry experience</strong>, we specialize in machine health checkups, hydraulic and electrical servicing, performance testing, retrofitting, and preventive maintenance.
                </p>
                <p>
                  Our mission is to help industries <strong className="text-slate-900">reduce downtime, improve machine reliability</strong>, and boost productivity through expert support and on-site service. We understand that every minute of machine downtime costs your business, which is why we offer rapid response times and <strong className="text-slate-900">24/7 emergency support</strong>.
                </p>
                <p>
                  Our team of highly skilled technicians brings deep technical knowledge and hands-on experience with all major brands of injection moulding machines. We use advanced diagnostic tools and follow industry best practices to ensure your machines operate at peak performance.
                </p>
              </div>

              {/* Quick Stats Bar */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm text-slate-600 font-medium">Machines</div>
                </div>
                <div className="text-center border-x border-slate-200">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">98%</div>
                  <div className="text-sm text-slate-600 font-medium">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">15+</div>
                  <div className="text-sm text-slate-600 font-medium">Years</div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-[600px]">
                <img
                  src="https://plus.unsplash.com/premium_photo-1682597000831-5b3496f9246d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                  alt="Injection Moulding Machine Service"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Stats Badge on Image */}
                {/* <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">24/7</div>
                    <div className="text-xs text-slate-600 font-medium">Support</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-600">100%</div>
                    <div className="text-xs text-slate-600 font-medium">Quality</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">2 Hrs</div>
                    <div className="text-xs text-slate-600 font-medium">Response</div>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Modern Cards */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Target size={36} className="text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To provide world-class maintenance and optimization services that maximize machine uptime, enhance productivity, and deliver exceptional value to our clients through technical excellence and unwavering commitment to quality.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Eye size={36} className="text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To be the most trusted and preferred partner for injection moulding machine maintenance across India, recognized for our technical expertise, innovation, and customer-centric approach that drives industrial excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Modern Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-100 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border-2 border-slate-200 rounded-2xl p-8 text-center hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <div className="text-white">{value.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Modern Horizontal */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Milestones that shaped our success
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-center gap-6">
                  {/* Year Badge */}
                  <div className="w-24 flex-shrink-0">
                    <div className="bg-gradient-to-br from-primary-500 to-cyan-500 text-white font-bold text-xl px-4 py-2 rounded-xl text-center shadow-lg">
                      {milestone.year}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white border-2 border-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-primary-400 transition-all shadow-md">
                    <div className="text-primary-600">{milestone.icon}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white border-2 border-slate-200 rounded-2xl p-6 group-hover:border-primary-300 group-hover:shadow-xl transition-all">
                    <p className="text-lg font-semibold text-slate-900">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas - Modern Design */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
              Service Coverage
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Based in Shikrapur, Pune, we provide on-site services across Maharashtra and neighboring states. Our mobile service units ensure rapid response times and minimal disruption to your operations.
            </p>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-primary-200 rounded-3xl p-10 max-w-3xl mx-auto shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {/* Location */}
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-primary-600 uppercase tracking-wide">Location</div>
                  <p className="text-slate-900 font-semibold">Shikrapur, Pune<br />Maharashtra</p>
                </div>

                {/* GSTIN */}
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-cyan-600 uppercase tracking-wide">GSTIN</div>
                  <p className="text-slate-900 font-semibold">27AZFPG7021B1ZW</p>
                </div>

                {/* Service Area */}
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-indigo-600 uppercase tracking-wide">Service Area</div>
                  <p className="text-slate-900 font-semibold">Pune, Mumbai, Nashik<br />& Across Maharashtra</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
