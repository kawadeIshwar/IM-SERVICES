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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-cyan-200 to-primary-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920')] bg-cover bg-center opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >

          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-6 mt-20  "
          >
           Expert 
            <span className="text-gradient"> Injection Moulding </span>
            Machine Solutions 
          </motion.h4>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium"
          >
            Complete technical solutions to reduce downtime, improve reliability, and boost productivity
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/booking"
              className="group bg-gradient-to-r from-primary-600 to-cyan-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <span>Book a Service</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="bg-white border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-md"
            >
              View Services
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-primary-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-primary-600 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

    
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gradient-to-br from-white to-light-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              Our Expert Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Comprehensive solutions for all your injection moulding machine needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-blue-100 border border-light-200 rounded-xl p-6 hover:border-primary-800 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to="/services"
                  className="text-primary-600 font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              to="/services"
              className="inline-block bg-gradient-to-r from-primary-600 to-cyan-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View All Services
            </Link>
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
