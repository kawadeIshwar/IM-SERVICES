import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, CheckCircle, TrendingUp, Zap, Shield, Clock, Star } from 'lucide-react'
import SEO from '../components/SEO'

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

  const growthData = [
    { year: '2008', valuation: 15, clients: 10, machines: 25, label: '₹15L', milestone: 'Founded' },
    { year: '2012', valuation: 45, clients: 50, machines: 120, label: '₹45L', milestone: 'Expansion' },
    { year: '2016', valuation: 120, clients: 120, machines: 280, label: '₹1.2Cr', milestone: 'Innovation' },
    { year: '2020', valuation: 280, clients: 200, machines: 500, label: '₹2.8Cr', milestone: 'Growth' },
    { year: '2024', valuation: 450, clients: 350, machines: 800, label: '₹4.5Cr', milestone: 'Leadership' }
  ]

  const teamMembers = [
    {
      name: 'Rajesh Patil',
      role: 'Founder & Chief Engineer',
      expertise: 'Hydraulic Systems & Machine Diagnostics',
      image: 'images/profile image.jpg',
      gradient: 'from-primary-500 to-cyan-500'
    },
    {
      name: 'Vikram Sharma',
      role: 'Lead Electrical Engineer',
      expertise: 'Control Systems & Automation',
      image: 'images/profile image.jpg',
      gradient: 'from-cyan-500 to-indigo-500'
    },
    {
      name: 'Amit Deshmukh',
      role: 'Senior Service Technician',
      expertise: 'Preventive Maintenance & Retrofitting',
      image: 'images/profile image.jpg',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Rohan Kulkarni',
      role: 'Technical Support Manager',
      expertise: 'Customer Relations & Quality Assurance',
      image: 'images/profile image.jpg',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      <SEO 
        title="About Us - IM Services | 15+ Years of Excellence in Machine Maintenance"
        description="Learn about IM Services - Maharashtra's leading injection moulding machine maintenance provider. 15+ years experience, 500+ machines serviced, expert technicians, 24/7 support."
        keywords="about IM services, injection moulding experts, machine maintenance company, experienced technicians, pune machine service company"
        canonical="https://imservices.netlify.app/about"
      />
      
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
      <section className="py-20 bg-gradient-to-br from-primary-500 to-cyan-500 relative overflow-hidden">
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

      {/* Meet Our Team - Professional Square Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/5 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-cyan-100 text-primary-700 px-5 py-2 rounded-full mb-6"
            >
              <Users size={18} />
              <span className="text-sm font-bold">Expert Team</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-4">
              Meet Our <span className="bg-gradient-to-r from-primary-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">Specialists</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Dedicated professionals with decades of combined experience in injection moulding machine maintenance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-transparent h-full flex flex-col">
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
                  
                  {/* Square Image Container - Fixed Height */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0 bg-slate-100">
                    {/* Image */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Colored Gradient Accent */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                    {/* Top Badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <div className={`bg-gradient-to-br ${member.gradient} text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm`}>
                        Expert
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Fixed Height */}
                  <div className="p-6 relative flex flex-col flex-grow">
                    {/* Decorative Top Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                    
                    {/* Name */}
                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-2 line-clamp-1">
                      {member.name}
                    </h3>
                    
                    {/* Role with Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${member.gradient}`}></div>
                      <p className="text-sm font-bold text-slate-700 uppercase tracking-wide line-clamp-1">
                        {member.role}
                      </p>
                    </div>
                    
                    {/* Expertise */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 flex-grow">
                      {member.expertise}
                    </p>
                  </div>
                </div>

                {/* Card Shadow Accent */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${member.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl -z-20 transition-opacity duration-500`}></div>
              </motion.div>
            ))}
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
              Growth trajectory showcasing our success story
            </p>
          </motion.div>

          {/* Professional Histogram Design */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-slate-200 p-8 md:p-12 shadow-2xl">
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-primary-500 to-cyan-500"></div>
                <span className="text-sm font-semibold text-slate-700">Annual Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-500 to-green-500"></div>
                <span className="text-sm font-semibold text-slate-700">Client Base</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-amber-500"></div>
                <span className="text-sm font-semibold text-slate-700">Machines Serviced</span>
              </div>
            </div>

            {/* Histogram */}
            <div className="relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-16 flex flex-col justify-between text-xs font-semibold text-slate-500 -ml-8">
                <span>₹5Cr</span>
                <span>₹4Cr</span>
                <span>₹3Cr</span>
                <span>₹2Cr</span>
                <span>₹1Cr</span>
                <span>₹0</span>
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between mb-16">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border-t border-slate-200"></div>
                ))}
              </div>

              {/* Bars Container */}
              <div className="relative flex items-end justify-around gap-4 h-96 pt-4">
                {growthData.map((data, index) => {
                  const maxVal = 450
                  const heightPercent = (data.valuation / maxVal) * 100

                  return (
                    <motion.div
                      key={data.year}
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: `${heightPercent}%`, opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className="flex-1 group relative"
                    >
                      {/* Bar Stack */}
                      <div className="relative h-full flex flex-col justify-end gap-1">
                        {/* Revenue Bar */}
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                          viewport={{ once: true }}
                          className="relative bg-gradient-to-t from-primary-600 via-primary-500 to-cyan-400 rounded-t-xl shadow-lg group-hover:shadow-2xl transition-all origin-bottom"
                          style={{ height: '100%' }}
                        >
                          {/* Value Label on hover */}
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-xl">
                            <div className="text-center">
                              <div className="text-primary-300">{data.label}</div>
                              <div className="text-xs text-slate-300 mt-0.5">{data.milestone}</div>
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                          </div>

                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                        </motion.div>

                        {/* Stats on hover */}
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border-2 border-primary-200 rounded-xl p-3 shadow-xl z-10 min-w-[140px]">
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between gap-3">
                              <span className="text-slate-600 font-medium">Clients:</span>
                              <span className="text-emerald-600 font-bold">{data.clients}+</span>
                            </div>
                            <div className="flex justify-between gap-3">
                              <span className="text-slate-600 font-medium">Machines:</span>
                              <span className="text-orange-600 font-bold">{data.machines}+</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Year Label */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                        <div className="font-bold text-slate-900 text-base mb-1">{data.year}</div>
                        <div className="text-xs text-slate-500 font-medium">{data.milestone}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Bottom spacing for labels */}
            <div className="h-20"></div>

            {/* Growth Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t-2 border-slate-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-cyan-50 rounded-2xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    3000%
                  </div>
                  <div className="text-sm font-semibold text-slate-600">Revenue Growth</div>
                  <div className="text-xs text-slate-500 mt-1">Since 2008</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                    35x
                  </div>
                  <div className="text-sm font-semibold text-slate-600">Client Expansion</div>
                  <div className="text-xs text-slate-500 mt-1">10 to 350+ clients</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                    32x
                  </div>
                  <div className="text-sm font-semibold text-slate-600">Service Volume</div>
                  <div className="text-xs text-slate-500 mt-1">25 to 800+ machines</div>
                </div>
              </div>
            </motion.div>
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
