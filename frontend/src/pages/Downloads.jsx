import { motion } from 'framer-motion'
import { Download, FileText, CheckSquare, BookOpen, FileSpreadsheet } from 'lucide-react'

const Downloads = () => {
  const downloads = [
    {
      icon: <CheckSquare size={40} />,
      title: 'Machine Health Checklist',
      description: 'Comprehensive checklist for daily, weekly, and monthly machine inspections.',
      fileSize: '245 KB',
      fileType: 'PDF',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <FileText size={40} />,
      title: 'Preventive Maintenance Guide',
      description: 'Complete guide for scheduling and performing preventive maintenance.',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Troubleshooting Manual',
      description: 'Common issues and solutions for injection moulding machines.',
      fileSize: '890 KB',
      fileType: 'PDF',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FileSpreadsheet size={40} />,
      title: 'Service Request Form',
      description: 'Downloadable form for requesting maintenance or repair services.',
      fileSize: '156 KB',
      fileType: 'PDF',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <FileText size={40} />,
      title: 'Performance Testing Report Template',
      description: 'Template for documenting 7-factor performance test results.',
      fileSize: '320 KB',
      fileType: 'PDF',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Safety Guidelines',
      description: 'Essential safety procedures for machine operation and maintenance.',
      fileSize: '540 KB',
      fileType: 'PDF',
      color: 'from-red-500 to-pink-500'
    }
  ]

  const handleDownload = (title) => {
    // In production, this would trigger actual file download
    alert(`Downloading: ${title}\n\nNote: This is a demo. In production, the actual file would be downloaded.`)
  }

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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <Download size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              Downloads & <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Free resources, checklists, and guides for machine maintenance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloads.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-900 border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{item.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {item.fileType} • {item.fileSize}
                  </span>
                </div>

                <button
                  onClick={() => handleDownload(item.title)}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Need Custom Resources?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We can provide customized checklists, maintenance schedules, and documentation for your specific machines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-dark-800 border border-gray-800 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Documentation</h3>
              <p className="text-gray-400">
                Machine-specific maintenance manuals and procedures tailored to your equipment.
              </p>
            </div>

            <div className="bg-dark-800 border border-gray-800 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Maintenance Schedules</h3>
              <p className="text-gray-400">
                Personalized preventive maintenance schedules based on your production needs.
              </p>
            </div>

            <div className="bg-dark-800 border border-gray-800 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Training Materials</h3>
              <p className="text-gray-400">
                Operator training guides and best practices for your team.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Request Custom Resources
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact us to get customized documentation and resources for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300"
              >
                Contact Us
              </a>
              <a
                href="/booking"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                Book a Service
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Downloads
