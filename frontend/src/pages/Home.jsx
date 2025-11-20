import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useCallback } from 'react'
import { 
  Wrench, 
  Activity, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Settings,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  
  // Hero Images for slider (7 images)
  const heroImages = [
    '/images/image 93.png',
    '/images/image 94.png',
    '/images/image 95.png',
    '/images/image 96.png',
    '/images/image 99.png',
    '/images/image 98.png',
    '/images/image 97.png'
  ]

  // Auto-slide every 5 seconds for dynamic feel
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const handleSlideChange = useCallback((index) => {
    if (index === currentSlide) return
    const newDirection = index > currentSlide ? 1 : -1
    setDirection(newDirection)
    setCurrentSlide(index)
  }, [currentSlide])

  const services = [
    {
      icon: <Activity size={40} />,
      title: 'Performance Testing',
      description: '7-Factor comprehensive testing including injection pressure, speed, clamping force, and more.',
      color: 'from-blue-500 to-cyan-500',
      image: 'images/hydraulic system 2.jpg',
      serviceId: 'machine-performance-testing'
    },
    {
      icon: <Shield size={40} />,
      title: 'Machine Health Checkup',
      description: 'Complete diagnostic analysis of pump, motor, screw barrel, heaters, and safety systems.',
      color: 'from-purple-500 to-pink-500',
      image: 'images/checks-motor-vibration.png',
      serviceId: 'machine-health-checkup'
    },
    {
      icon: <Settings size={40} />,
      title: 'Retrofitting & Reconditioning',
      description: 'PLC upgrades, servo fitting, hydraulic modifications, and complete machine overhaul.',
      color: 'from-orange-500 to-red-500',
      image: 'images/retrofitting and reconditioning.jpg',
      serviceId: 'retrofitting-and-reconditioning'
    },
    {
      icon: <Wrench size={40} />,
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance, predictive fault detection, and emergency breakdown support.',
      color: 'from-green-500 to-emerald-500',
      image: 'images/technical-Maintenance.jpg',
      serviceId: 'preventive-and-predictive-maintenance'
    },
    {
      icon: <Zap size={40} />,
      title: 'Power Optimization',
      description: 'Power factor correction and energy-saving solutions to reduce operational costs.',
      color: 'from-yellow-500 to-orange-500',
      image: 'images/power.jpg',
      serviceId: 'power-optimization'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Cooling Systems',
      description: 'Chiller, cooling tower, MTC, HRC, and ELC maintenance for optimal temperature control.',
      color: 'from-indigo-500 to-blue-500',
      image: 'images/chiller maintenance.jpg',
      serviceId: 'cooling-and-chiller-systems'
    }
  ]

  const stats = [
    { number: '500+', label: 'Machines Serviced', icon: <Settings size={32} /> },
    { number: '15+', label: 'Years Experience', icon: <Award size={32} /> },
    { number: '24/7', label: 'Support Available', icon: <Clock size={32} /> },
    { number: '98%', label: 'Client Satisfaction', icon: <CheckCircle size={32} /> }
  ]

  const features = [
    'Expert Technicians with 15+ Years Experience',
    'On-Site Service Across Maharashtra',
    '24/7 Emergency Breakdown Support',
    'Genuine Parts & Quality Assurance',
    'Competitive Pricing & Fast Turnaround',
    'Comprehensive Service Reports'
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-neutral-950">
      <SEO 
        title="IM Services - Expert Injection Moulding Machine Services in Pune | 24/7 Support"
        description="Professional injection moulding machine maintenance, repair, and performance testing services in Pune, Maharashtra. 15+ years experience, 500+ machines serviced. 24/7 emergency breakdown support."
        keywords="injection moulding machine services pune, IMM maintenance, machine performance testing, preventive maintenance, retrofitting services, hydraulic repair, emergency breakdown service, injection molding maharashtra"
        canonical="https://imservices.netlify.app/"
      />
      <StructuredData type="organization" />
      
      {/* Hero Section - Full Width with Image Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Full-Width Background Carousel */}
        <div className="absolute inset-0 w-full h-full z-0">
              {/* Carousel Container with Overflow */}
              <div className="relative h-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Premium Crossfade Carousel with Ken Burns Effect */}
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentSlide}
                    initial={{ 
                      opacity: 0,
                      scale: 1.1,
                      filter: "blur(4px)"
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0,
                      scale: 0.95,
                      filter: "blur(4px)"
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.5 },
                      filter: { duration: 0.3 }
                    }}
                    className="absolute inset-0 will-change-transform"
                  >
                    {/* Image Container with Ken Burns Zoom & Pan Effect */}
                    <motion.div
                      className="relative w-full h-full"
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: 1.08,
                        x: [0, -15, 0],
                        y: [0, -8, 0]
                      }}
                      transition={{ 
                        duration: 10,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <img
                        src={heroImages[currentSlide]}
                        alt={`Injection Molding Machine ${currentSlide + 1}`}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </motion.div>
                    
                    {/* Blue Overlay - Primary (Further Reduced Opacity) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-blue-800/25 to-cyan-900/30 z-10"></div>
                    
                    {/* Enhanced Gradient Overlays (Further Reduced Opacity) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-950/20 via-transparent to-blue-950/20 z-10"></div>
                    
                    {/* Animated Accent Gradient (Further Reduced Opacity) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.05, 0.10, 0.05] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-tr from-primary-600/15 via-cyan-500/8 to-indigo-600/15 z-10"
                    />
                  </motion.div>
                </AnimatePresence>
                
                
                {/* Navigation Arrows - Optional Enhancement */}
                <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-6 pointer-events-none">
                  <motion.button
                    onClick={() => handleSlideChange((currentSlide - 1 + heroImages.length) % heroImages.length)}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 shadow-xl opacity-0 hover:opacity-100 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Previous slide"
                  >
                    <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleSlideChange((currentSlide + 1) % heroImages.length)}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 shadow-xl opacity-0 hover:opacity-100 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Next slide"
                  >
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
        </div>

        {/* Responsive Content Overlay */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left flex items-center justify-center md:justify-start min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8 max-w-4xl mt-20"
          >
            {/* Main Heading - Reduced Sizing */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl"
            >
              Expert Injection Molding
              <br />Machine Services
            </motion.h1>

            {/* Description - Reduced Sizing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto md:mx-0 drop-shadow-lg font-medium"
            >
              Complete technical support for machine health, performance optimization, and maintenance. Reduce downtime and improve productivity with our expert services.
            </motion.p>

            {/* CTA Buttons - Reduced Sizing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start pt-6"
            >
              <Link
                to="/booking"
                className="group relative overflow-hidden bg-white text-primary-700 px-6 py-3 rounded-lg font-bold text-base hover:shadow-2xl hover:shadow-white/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
              >
                <span className="relative z-10">Book Service Now</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                to="/services"
                className="group bg-transparent backdrop-blur-sm border-2 border-white/80 text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-white hover:text-primary-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px]"
              >
                <span>View Services</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Stats - Balanced Sizing */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-10"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">500+</span>
                <span className="text-sm text-gray-200 font-medium uppercase tracking-wider mt-1">Machines Serviced</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">15+</span>
                <span className="text-sm text-gray-200 font-medium uppercase tracking-wider mt-1">Years Experience</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">24/7</span>
                <span className="text-sm text-gray-200 font-medium uppercase tracking-wider mt-1">Support Available</span>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-24 bg-slate-50 dark:bg-neutral-900 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={servicesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 px-4 py-2 rounded-full mb-6"
            >
              <Settings size={16} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">Professional Services</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-4">
              Our Expert Services
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for all your injection moulding machine needs with cutting-edge technology and expert care
            </p>
          </motion.div>

          {/* Services Grid - Image + Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-white dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-100"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    {/* Learn More Link */}
                    <Link
                      to={`/services#${service.serviceId}`}
                      className={`inline-flex items-center space-x-2 text-transparent bg-gradient-to-r ${service.color} bg-clip-text font-bold group-hover:space-x-3 transition-all`}
                    >
                      <span>Learn More</span>
                      <ArrowRight size={18} className={`text-primary-600 group-hover:translate-x-1 transition-transform`} />
                    </Link>
                  </div>

                  {/* Decorative corner accent */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>

                {/* Bottom shadow accent */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl -z-10 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary-600 to-cyan-500 p-8 rounded-2xl shadow-2xl">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Need a Custom Solution?</h3>
                <p className="text-white/90 text-sm">We provide tailored services to meet your specific requirements</p>
              </div>
              <Link
                to="/services"
                className="flex-shrink-0 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                View All Services
              </Link>
            </div>
          </motion.div> */}

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-slate-200 dark:border-neutral-800">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">6+</div>
              <div className="text-sm text-slate-600 dark:text-gray-300 font-medium">Service Types</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-slate-200 dark:border-neutral-800">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">24/7</div>
              <div className="text-sm text-slate-600 dark:text-gray-300 font-medium">Availability</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-slate-200 dark:border-neutral-800">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">Expert</div>
              <div className="text-sm text-slate-600 dark:text-gray-300 font-medium">Technicians</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-slate-200 dark:border-neutral-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">Fast</div>
              <div className="text-sm text-slate-600 dark:text-gray-300 font-medium">Response</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400 dark:from-neutral-900 dark:via-neutral-800 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white dark:text-gray-100 mb-6">
                Why Choose IM Services?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-200 mb-8 font-medium">
                We deliver excellence through expertise, reliability, and commitment to your machine's performance.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle size={24} className="text-white dark:text-primary-300 flex-shrink-0 mt-1" />
                    <span className="text-gray-800 dark:text-gray-100 text-lg font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-block mt-8 bg-slate-800 dark:bg-neutral-900 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-300 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 dark:hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Learn More About Us
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="images/image7.jpg"
                  alt="Industrial machinery"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary-500 to-cyan-400 rounded-xl p-8 shadow-2xl max-w-xs">
                <div className="text-white">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-sm">Years of Excellence in Machine Maintenance</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-cyan-500 rounded-2xl p-12 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                Ready to Optimize Your Machines?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get expert maintenance and performance testing. Book your service today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/booking"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Book a Service Now
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-all duration-300 border-2 border-white shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
