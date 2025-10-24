import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, CheckCircle, TrendingUp } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service and technical expertise.'
    },
    {
      icon: <Users size={40} />,
      title: 'Customer Focus',
      description: 'Your machine performance and satisfaction are our top priorities.'
    },
    {
      icon: <CheckCircle size={40} />,
      title: 'Reliability',
      description: '24/7 support and consistent service delivery you can count on.'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Innovation',
      description: 'Staying ahead with latest technologies and maintenance techniques.'
    }
  ]

  const milestones = [
    { year: '2008', event: 'Company Founded in Pune' },
    { year: '2012', event: 'Expanded to 50+ Client Base' },
    { year: '2016', event: 'Introduced 7-Factor Performance Testing' },
    { year: '2020', event: 'Reached 500+ Machines Serviced' },
    { year: '2024', event: 'Leading IM Machine Service Provider in Maharashtra' }
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
              About <span className="text-gradient">IM Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner for injection moulding machine maintenance and optimization in Pune
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-6">
                Who We Are
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                IM Services is a leading provider of comprehensive technical solutions for injection moulding machines, based in Shikrapur, Pune, Maharashtra. With over 15 years of industry experience, we specialize in machine health checkups, hydraulic and electrical servicing, performance testing, retrofitting, and preventive maintenance.
              </p>
              <p className="text-gray-300 text-lg mb-4">
                Our mission is to help industries reduce downtime, improve machine reliability, and boost productivity through expert support and on-site service. We understand that every minute of machine downtime costs your business, which is why we offer rapid response times and 24/7 emergency support.
              </p>
              <p className="text-gray-300 text-lg">
                Our team of highly skilled technicians brings deep technical knowledge and hands-on experience with all major brands of injection moulding machines. We use advanced diagnostic tools and follow industry best practices to ensure your machines operate at peak performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm">Machines Serviced</div>
              </div>
              <div className="bg-gradient-to-br from-accent-600 to-accent-700 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm">Client Satisfaction</div>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm">Support Available</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-dark-800 border border-primary-500/30 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg">
                To provide world-class maintenance and optimization services that maximize machine uptime, enhance productivity, and deliver exceptional value to our clients through technical excellence and unwavering commitment to quality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-800 border border-accent-500/30 rounded-xl p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg">
                To be the most trusted and preferred partner for injection moulding machine maintenance across India, recognized for our technical expertise, innovation, and customer-centric approach that drives industrial excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-dark-800">
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
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-900 border border-gray-800 rounded-xl p-6 text-center hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Milestones that shaped our success
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-accent-500 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-dark-800 border border-gray-800 rounded-xl p-6 inline-block">
                      <div className="text-primary-400 font-bold text-2xl mb-2">{milestone.year}</div>
                      <div className="text-white text-lg">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-900 relative z-10"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Service Coverage
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Based in Shikrapur, Pune, we provide on-site services across Maharashtra and neighboring states. Our mobile service units ensure rapid response times and minimal disruption to your operations.
            </p>
            <div className="bg-dark-900 border border-gray-800 rounded-xl p-8 max-w-2xl mx-auto">
              <div className="text-gray-300 text-lg">
                <p className="mb-2"><strong className="text-primary-400">Location:</strong> Shikrapur, Pune, Maharashtra</p>
                <p className="mb-2"><strong className="text-primary-400">GSTIN:</strong> 27AZFPG7021B1ZW</p>
                <p><strong className="text-primary-400">Service Area:</strong> Pune, Mumbai, Nashik, Aurangabad, and across Maharashtra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
