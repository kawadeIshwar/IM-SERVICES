import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  CheckCircle
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: <Activity size={48} />,
      title: 'Machine Performance Testing',
      subtitle: '7-Factor Comprehensive Analysis',
      description: 'Complete performance evaluation to ensure your machines operate at optimal efficiency.',
      color: 'from-blue-500 to-cyan-500',
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
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions for all your injection moulding machine needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <div className="text-white">{service.icon}</div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-primary-400 font-semibold text-lg mb-4">{service.subtitle}</p>
                  <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                  <Link
                    to="/booking"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
                  >
                    <span>Book This Service</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-dark-900 border border-gray-800 rounded-xl p-8">
                    <h4 className="text-xl font-bold text-white mb-6">What's Included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle size={20} className="text-primary-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A systematic approach to ensure quality and efficiency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-dark-800 border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="text-6xl font-bold text-primary-500/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Need Expert Service?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our team is ready to help optimize your machine performance. Book a service today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300"
              >
                Book a Service
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
