import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const services = [
    {
      icon: <Activity size={40} />,
      title: 'Performance Testing',
      description: '7-Factor comprehensive testing including injection pressure, speed, clamping force, and more.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield size={40} />,
      title: 'Machine Health Checkup',
      description: 'Complete diagnostic analysis of pump, motor, screw barrel, heaters, and safety systems.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Settings size={40} />,
      title: 'Retrofitting & Reconditioning',
      description: 'PLC upgrades, servo fitting, hydraulic modifications, and complete machine overhaul.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Wrench size={40} />,
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance, predictive fault detection, and emergency breakdown support.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap size={40} />,
      title: 'Power Optimization',
      description: 'Power factor correction and energy-saving solutions to reduce operational costs.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Cooling Systems',
      description: 'Chiller, cooling tower, MTC, HRC, and ELC maintenance for optimal temperature control.',
      color: 'from-indigo-500 to-blue-500'
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
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section - Diagonal Modern Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Diagonal Background Split with Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
          
          {/* Blue Diagonal Section with Image */}
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-full md:transform origin-top-right md:skew-x-12 md:translate-x-1/4 overflow-hidden">
            {/* Image inside diagonal section */}
            <div className="absolute inset-0 md:transform md:-skew-x-12 md:-translate-x-1/4">
              <img
                src="https://images.unsplash.com/photo-1627807452369-a2cd0b5ca56f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                alt="Injection Moulding Machine"
                className="w-full h-full object-cover"
              />
              {/* Responsive overlay - white on mobile, blue on desktop */}
              <div className="absolute inset-0 bg-white/90 md:bg-white/40"></div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-indigo-400/20 rounded-full animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        </div> */}

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          <div className="max-w-3xl">
            
            {/* Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              

              {/* Main Heading */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-[1.1] tracking-tight mb-6 mt-12 md:mt-16"
              >
                <span className="text-slate-900 drop-shadow-sm">Expert</span>{' '}
                <span className="text-gradient bg-clip-text">injection moulding</span>{' '}
                <span className="text-slate-900 drop-shadow-sm">machine services</span>
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl"
              >
                Complete technical support for machine health, performance <br className="hidden md:block" /> optimization, and maintenance. Reduce downtime and improve <br className="hidden md:block" />productivity with our expert services.
              </motion.p>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">500+ Machines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">98% Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">15+ Years</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/booking"
                  className="group bg-gradient-to-r from-primary-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Book Service Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="group bg-white border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-primary-600 hover:text-primary-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View Services</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-24 bg-slate-50 overflow-hidden">
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
              className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 px-4 py-2 rounded-full mb-6"
            >
              <Settings size={16} className="text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Professional Services</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-4">
              Our Expert Services
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for all your injection moulding machine needs with cutting-edge technology and expert care
            </p>
          </motion.div>

          {/* Services Grid */}
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
                <div className="relative h-full bg-white border border-blue-900 rounded-2xl p-8 hover:border-primary-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <div className="text-white">{service.icon}</div>
                    </div>
                    {/* Decorative ring */}
                    <div className={`absolute -inset-2 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <Link
                    to="/services"
                    className="inline-flex items-center space-x-2 text-primary-600 font-semibold group-hover:space-x-3 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* Top corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Bottom shadow accent */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl -z-10 transition-opacity duration-300`}></div>
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
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-200">
              <div className="text-3xl font-bold text-primary-600 mb-1">6+</div>
              <div className="text-sm text-slate-600 font-medium">Service Types</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-200">
              <div className="text-3xl font-bold text-cyan-600 mb-1">24/7</div>
              <div className="text-sm text-slate-600 font-medium">Availability</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-200">
              <div className="text-3xl font-bold text-indigo-600 mb-1">Expert</div>
              <div className="text-sm text-slate-600 font-medium">Technicians</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md border border-slate-200">
              <div className="text-3xl font-bold text-green-600 mb-1">Fast</div>
              <div className="text-sm text-slate-600 font-medium">Response</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Why Choose IM Services?
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-medium">
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
                    <CheckCircle size={24} className="text-primary-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800 text-lg font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-block mt-8 bg-slate-800 border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg"
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
                  src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800"
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
      <section className="py-20 bg-white">
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
