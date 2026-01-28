import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { 
  Activity, 
  Shield, 
  Settings, 
  Wrench, 
  Zap, 
  Thermometer,
  Gauge,
  Cpu,
  Droplet,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react'
import SEO from '../components/SEO'

const Services = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [location])
  const services = [
    {
      icon: <Activity size={48} />,
      title: 'Machine Performance Testing',
      subtitle: '7-Factor Comprehensive Analysis',
      description: 'Complete performance evaluation to ensure your machines operate at optimal efficiency.',
      color: 'from-blue-500 to-cyan-500',
      image: 'images/image 70.jpeg',
      serviceId: 'machine-performance-testing',
      features: [
        'Injection Pressure Testing',
        'Injection Speed Analysis',
        'Clamping Force Measurement',
        'Power Factor Assessment',
        'Parallelism Verification',
        'Repeatability Testing',
        'Barrel Temperature Profiling'
      ]
    },
    {
      icon: <Shield size={48} />,
      title: 'Machine Health Checkup',
      subtitle: 'Complete Diagnostic Analysis',
      description: 'Thorough inspection of all critical components to identify potential issues before they become problems.',
      color: 'from-purple-500 to-pink-500',
      image: 'images/image 831.jpeg',
      serviceId: 'machine-health-checkup',
      features: [
        'Pump & Motor Condition Assessment',
        'Tie Bar & Pin Bush Inspection',
        'Screw Barrel Evaluation',
        'Heater Performance Check',
        'Safety Systems Verification',
        'Oil Condition Analysis',
        'Heat Exchanger Inspection',
        'Nozzle Centering Check',
        'Lubrication System Review'
      ]
    },
    {
      icon: <Settings size={48} />,
      title: 'Retrofitting & Reconditioning',
      subtitle: 'Upgrade & Modernization',
      description: 'Transform your aging machines with modern technology and restore them to peak performance.',
      color: 'from-orange-500 to-red-500',
      image: 'images/image 811.jpeg',
      serviceId: 'retrofitting-and-reconditioning',
      features: [
        'PLC Repair & Replacement',
        'Servo Motor Fitting',
        'Hydraulic System Modification',
        'Power & Control Wiring Upgrade',
        'Machine Painting & Finishing',
        'Sliding Work & Mechanical Repairs',
        'Control Panel Modernization'
      ]
    },
    {
      icon: <Wrench size={48} />,
      title: 'Preventive & Predictive Maintenance',
      subtitle: 'Proactive Care Programs',
      description: 'Scheduled maintenance programs designed to prevent breakdowns and extend machine life.',
      color: 'from-green-500 to-emerald-500',
      image: 'images/image 791.jpeg',
      serviceId: 'preventive-and-predictive-maintenance',
      features: [
        'Scheduled Preventive Maintenance',
        'Predictive Fault Detection',
        'Emergency Breakdown Support',
        'Regular Oil Changes & Lubrication',
        'Filter Replacements',
        'Seal & Gasket Inspections',
        'Comprehensive Service Reports',
        'Maintenance History Tracking'
      ]
    },
    {
      icon: <Droplet size={48} />,
      title: 'Cooling & Chiller Systems',
      subtitle: 'Temperature Control Solutions',
      description: 'Expert maintenance of cooling systems to ensure optimal temperature regulation.',
      color: 'from-cyan-500 to-blue-500',
      image: 'images/image 521.jpeg',
      serviceId: 'cooling-and-chiller-systems',
      features: [
        'Chiller Maintenance & Repair',
        'Cooling Tower Service',
        'MTC (Mould Temperature Controller)',
        'HRC (Heat Recovery Chiller)',
        'ELC (Evaporative Liquid Cooler)',
        'Coolant System Cleaning',
        'Temperature Sensor Calibration'
      ]
    },
    {
      icon: <Zap size={48} />,
      title: 'Power Optimization',
      subtitle: 'Energy Efficiency Solutions',
      description: 'Reduce energy costs and improve power efficiency with our optimization services.',
      color: 'from-yellow-500 to-orange-500',
      image: 'images/image 77.jpeg',
      serviceId: 'power-optimization',
      features: [
        'Power Factor Correction',
        'Energy Consumption Analysis',
        'Power Saving Solutions',
        'Electrical Load Balancing',
        'Capacitor Bank Installation',
        'Energy Audit Services',
        'Cost Reduction Strategies'
      ]
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'Contact us to discuss your machine issues and service requirements.'
    },
    {
      number: '02',
      title: 'On-Site Assessment',
      description: 'Our technicians visit your facility for detailed machine inspection.'
    },
    {
      number: '03',
      title: 'Service Proposal',
      description: 'Receive a comprehensive report with recommendations and quotation.'
    },
    {
      number: '04',
      title: 'Service Execution',
      description: 'Expert technicians perform the required maintenance or repairs.'
    },
    {
      number: '05',
      title: 'Quality Testing',
      description: 'Thorough testing to ensure optimal machine performance.'
    },
    {
      number: '06',
      title: 'Documentation',
      description: 'Complete service report with recommendations for future maintenance.'
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-neutral-900">
      <SEO 
        title="Our Services - Injection Moulding Machine Maintenance & Repair | IM Services"
        description="Comprehensive injection moulding machine services including performance testing, health checkups, preventive maintenance, retrofitting, and 24/7 emergency repair services in Shikrapur, Maharashtra."
        keywords="IMM services, machine performance testing, preventive maintenance, machine health checkup, retrofitting, hydraulic repair, cooling system service, breakdown maintenance, power optimization"
        canonical="https://imservices.netlify.app/services"
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-black">
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
              <Settings size={18} />
              <span className="text-sm font-bold">Professional Services</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for all your injection moulding machine needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Professional Design */}
      <section className="py-12 bg-white dark:bg-black relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:bg-none opacity-60"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14">
            {services.map((service, index) => (
              <motion.div
                key={index}
                id={service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative scroll-mt-24"
              >
                {/* Main Card - Horizontal Split Layout */}
                <div className={`relative bg-white dark:bg-gradient-to-br dark:from-neutral-900/90 dark:to-neutral-800/90 dark:backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-primary-900/20 transition-all duration-500 border-2 border-slate-200 dark:border-neutral-800/50 hover:border-primary-300 dark:hover:border-primary-500/80 dark:hover:shadow-primary-500/30 ${index % 2 === 0 ? 'lg:grid lg:grid-cols-2' : 'lg:grid lg:grid-cols-2'} dark:ring-1 dark:ring-white/10`}>
                  
                  {/* Image Section */}
                  <div className={`relative h-56 lg:h-auto overflow-hidden ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Back Arrow - Only show when user is redirected to this specific service */}
                    {location.hash === `#${service.serviceId}` && (
                      <Link 
                        to="/#our-expert-services"
                        className="absolute top-4 left-4 z-50 bg-gradient-to-r from-primary-500 to-cyan-500 text-white p-3 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group border-2 border-white/20"
                        aria-label="Back to services overview"
                      >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                      </Link>
                    )}
                    
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform "
                    />
                    {/* Gradient Overlay */}
                    {/* <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-30 group-hover:opacity-20 transition-opacity duration-300`}></div> */}
                    
                    {/* Icon Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <div className="text-white">{service.icon}</div>
                      </div>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute bottom-3 left-3">
                      <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl">
                        <span className={`text-xl font-bold bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}>0{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-5 lg:p-6 flex flex-col ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} relative`}>
                    {/* Accent Gradient Line */}
                    <div className={`hidden dark:block absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${service.color} opacity-60`}></div>
                    {/* Title & Subtitle */}
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`h-1 w-12 bg-gradient-to-r ${service.color} rounded-full`}></div>
                        <p className={`text-transparent bg-gradient-to-r ${service.color} bg-clip-text font-bold text-xs uppercase tracking-wider`}>{service.subtitle}</p>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-heading font-bold text-slate-900 dark:bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-gray-300 dark:bg-clip-text dark:text-transparent mb-2">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="mb-4 flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Key Features</h4>
                        <span className={`text-xs font-semibold text-white bg-gradient-to-r ${service.color} px-3 py-1 rounded-full`}>
                          {service.features.length} Services
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <div className={`w-5 h-5 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <CheckCircle size={12} className="text-white" />
                            </div>
                            <span className="text-xs text-slate-700 dark:text-gray-300 font-medium leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/booking?service=${service.serviceId}`}
                      className={`group/btn relative overflow-hidden inline-flex items-center justify-center space-x-2 bg-gradient-to-r ${service.color} text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 mt-auto`}
                    >
                      <span className="relative z-10">Book This Service</span>
                      <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                  </div>
                </div>

                {/* Decorative shadow */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${service.color} rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl -z-10 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process - Modern Timeline */}
      <section className="py-20 bg-white dark:bg-neutral-900 relative overflow-hidden">
        {/* Subtle top glow */}
        <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              A systematic approach to ensure quality and efficiency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:bg-gradient-to-br dark:from-neutral-900/80 dark:to-neutral-800/80 dark:backdrop-blur-sm border-2 border-primary-200 dark:border-primary-900/50 rounded-2xl p-8 hover:shadow-2xl hover:border-primary-400 dark:hover:border-primary-500/70 dark:shadow-lg dark:shadow-black/20 dark:hover:shadow-primary-900/30 transition-all duration-300 dark:ring-1 dark:ring-white/5"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:bg-gradient-to-r dark:from-cyan-200 dark:via-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent mb-3 pr-8">{step.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-cyan-500 to-indigo-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full mb-6">
              <Zap size={18} />
              <span className="text-sm font-bold">Get Started Today</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Ready to Optimize Your<br />Machine Performance?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our expert team is ready to help you achieve peak efficiency. Schedule your service today and experience the difference!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="group bg-white text-primary-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center space-x-2"
              >
                <span>Book a Service</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 inline-flex items-center justify-center space-x-2"
              >
                <span>Contact Us</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80 font-medium">Machines Serviced</div>
              </div>
              <div className="text-center border-x-2 border-white/30">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
                <div className="text-white/80 font-medium">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80 font-medium">Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
