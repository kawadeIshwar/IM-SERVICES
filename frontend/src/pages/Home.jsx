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
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  // Hero Image
  const heroImage = '/images/MG-PET.jpg'

  const services = [
    {
      icon: <Activity size={40} />,
      title: 'Performance Testing',
      description: '7-Factor comprehensive testing including injection pressure, speed, clamping force, and more.',
      color: 'from-blue-500 to-cyan-500',
      image: 'images/hydraulic system 2.jpg'
    },
    {
      icon: <Shield size={40} />,
      title: 'Machine Health Checkup',
      description: 'Complete diagnostic analysis of pump, motor, screw barrel, heaters, and safety systems.',
      color: 'from-purple-500 to-pink-500',
      image: 'images/checks-motor-vibration.png'
    },
    {
      icon: <Settings size={40} />,
      title: 'Retrofitting & Reconditioning',
      description: 'PLC upgrades, servo fitting, hydraulic modifications, and complete machine overhaul.',
      color: 'from-orange-500 to-red-500',
      image: 'images/retrofitting and reconditioning.jpg'
    },
    {
      icon: <Wrench size={40} />,
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance, predictive fault detection, and emergency breakdown support.',
      color: 'from-green-500 to-emerald-500',
      image: 'images/technical-Maintenance.jpg'
    },
    {
      icon: <Zap size={40} />,
      title: 'Power Optimization',
      description: 'Power factor correction and energy-saving solutions to reduce operational costs.',
      color: 'from-yellow-500 to-orange-500',
      image: 'images/power.jpg'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Cooling Systems',
      description: 'Chiller, cooling tower, MTC, HRC, and ELC maintenance for optimal temperature control.',
      color: 'from-indigo-500 to-blue-500',
      image: 'images/chiller maintenance.jpg'
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
      <SEO 
        title="IM Services - Expert Injection Moulding Machine Services in Pune | 24/7 Support"
        description="Professional injection moulding machine maintenance, repair, and performance testing services in Pune, Maharashtra. 15+ years experience, 500+ machines serviced. 24/7 emergency breakdown support."
        keywords="injection moulding machine services pune, IMM maintenance, machine performance testing, preventive maintenance, retrofitting services, hydraulic repair, emergency breakdown service, injection molding maharashtra"
        canonical="https://imservices.netlify.app/"
      />
      <StructuredData type="organization" />
      
      {/* Hero Section - Modern Split Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Circular Gradient Blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl"></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-32 right-1/4 w-20 h-20 border-4 border-primary-200/30 rounded-xl rotate-12"></div>
          <div className="absolute bottom-40 left-1/3 w-16 h-16 border-4 border-cyan-200/30 rounded-full"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold leading-tight mb-6 mt-5"
              >
                <span className="text-slate-900">Expert</span>{' '}
                <span className="bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                  Injection Molding
                </span>{' '}
                <span className="text-slate-900">Machine Services</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-slate-600 leading-relaxed mb-8"
              >
                Complete technical support for machine health, performance optimization, and maintenance. Reduce downtime and improve productivity with our expert services.
              </motion.p>

             

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/booking"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span className="relative z-10">Book Service Now</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  to="/services"
                  className="group bg-white border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-primary-600 hover:text-primary-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View Services</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Featured Image with Creative Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={heroInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Decorative Background Cards */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-cyan-50 to-indigo-100 rounded-[3rem] transform rotate-6 scale-105 opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100 via-blue-50 to-primary-100 rounded-[3rem] transform -rotate-3 scale-95 opacity-40"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-white rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden p-6">
                {/* Corner Decorative Accents */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-tr-full"></div>
                
                {/* Image with hover effect */}
                <motion.div
                  whileHover={{ rotate: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden shadow-xl"
                >
                  <img
                    src={heroImage}
                    alt="Injection Molding Machine"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none"></div>
                </motion.div>
                
               
              </div>
              
              {/* Floating Accent Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
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
                <div className="relative h-full bg-white border-2 border-slate-200 rounded-3xl overflow-hidden hover:border-primary-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
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
                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    {/* Learn More Link */}
                    <Link
                      to="/services"
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
