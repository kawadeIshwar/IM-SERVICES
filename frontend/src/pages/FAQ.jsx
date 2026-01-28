import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle, Phone, Mail, Settings, DollarSign, Wrench, CheckCircle } from 'lucide-react'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categoryIcons = {
    'General': HelpCircle,
    'Services': Settings,
    'Pricing & Payment': DollarSign,
    'Technical': Wrench
  }

  const faqs = [
    {
      category: 'General',
      icon: HelpCircle,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        {
          question: 'What types of injection moulding machines do you service?',
          answer: 'We service all major brands and types of injection moulding machines including horizontal, vertical, hydraulic, electric, and hybrid machines. Our technicians are experienced with brands like Haitian, Engel, Arburg, Sumitomo, and many others.'
        },
        {
          question: 'What areas do you cover for on-site service?',
          answer: 'We are based at IM Services, Vishal Vishwa Rd, Shikrapur, Maharashtra 412208 and provide on-site services across Maharashtra including Pune, Mumbai, Nashik, Aurangabad, and neighboring regions. For emergency breakdowns, we can arrange services in other states as well.'
        },
        {
          question: 'Do you offer 24/7 emergency support?',
          answer: 'Yes, we provide 24/7 emergency breakdown support. You can call us anytime at +91 9730992561, +91 7875601427, or +91 8551035501 for immediate assistance.'
        }
      ]
    },
    {
      category: 'Services',
      icon: Settings,
      color: 'from-cyan-500 to-indigo-500',
      questions: [
        {
          question: 'What is included in the 7-Factor Performance Testing?',
          answer: 'Our comprehensive 7-Factor Performance Testing includes: Injection Pressure, Injection Speed, Clamping Force, Power Factor, Parallelism, Repeatability, and Barrel Temperature profiling. This gives you a complete picture of your machine\'s performance.'
        },
        {
          question: 'How often should I schedule preventive maintenance?',
          answer: 'We recommend preventive maintenance every 3-6 months depending on your machine usage, operating conditions, and production volume. Regular maintenance helps prevent costly breakdowns and extends machine life.'
        },
        {
          question: 'Can you retrofit older machines with modern technology?',
          answer: 'Absolutely! We specialize in retrofitting and reconditioning older machines with modern PLCs, servo motors, updated hydraulic systems, and control panels. This can significantly improve efficiency and extend machine life at a fraction of the cost of a new machine.'
        },
        {
          question: 'What is predictive maintenance?',
          answer: 'Predictive maintenance uses data analysis and monitoring to predict when equipment failure might occur. This allows us to perform maintenance before breakdowns happen, minimizing downtime and reducing repair costs.'
        }
      ]
    },
    {
      category: 'Pricing & Payment',
      icon: DollarSign,
      color: 'from-indigo-500 to-purple-500',
      questions: [
        {
          question: 'How do you charge for services?',
          answer: 'Our pricing depends on the type of service, machine complexity, and location. We provide detailed quotations after initial assessment. For emergency breakdowns, we have transparent pricing with no hidden charges.'
        },
        {
          question: 'Do you provide service reports?',
          answer: 'Yes, we provide comprehensive service reports for all maintenance and repair work. These include detailed findings, work performed, parts replaced, test results, and recommendations for future maintenance.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers, cheques, and digital payments. For regular clients, we can arrange monthly billing for preventive maintenance contracts.'
        }
      ]
    },
    {
      category: 'Technical',
      icon: Wrench,
      color: 'from-purple-500 to-pink-500',
      questions: [
        {
          question: 'How long does a typical machine health checkup take?',
          answer: 'A comprehensive machine health checkup typically takes 4-6 hours depending on the machine size and complexity. We conduct thorough inspections of all critical components and provide a detailed report.'
        },
        {
          question: 'Do you use genuine spare parts?',
          answer: 'Yes, we prioritize using genuine OEM parts whenever possible. However, we also work with high-quality aftermarket parts when requested by clients, always ensuring they meet quality standards.'
        },
        {
          question: 'Can you help with power consumption reduction?',
          answer: 'Yes! Our power optimization services include power factor correction, energy consumption analysis, and implementation of energy-saving solutions. Many clients see 15-30% reduction in power costs after our optimization.'
        },
        {
          question: 'What causes frequent machine breakdowns?',
          answer: 'Common causes include lack of preventive maintenance, poor lubrication, contaminated hydraulic oil, worn seals, electrical issues, and improper operation. Our health checkup service can identify these issues before they cause breakdowns.'
        }
      ]
    }
  ]

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === index ? null : index)
  }

  // Filter FAQs based on category
  const filteredFAQs = faqs.filter(category => {
    if (selectedCategory !== 'All' && category.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-neutral-950">
      <SEO 
        title="FAQ - Frequently Asked Questions | IM Services"
        description="Get answers to common questions about injection moulding machine maintenance, repair services, pricing, and technical support. 24/7 help available."
        keywords="IMM service FAQ, machine maintenance questions, injection moulding help, service pricing, technical support FAQ"
        canonical="https://imservices.netlify.app/faq"
      />
      <StructuredData type="faq" />
      
      {/* Hero Section - Modern Design */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-black">
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
              <HelpCircle size={18} />
              <span className="text-sm font-bold">Help Center</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter Cards */}
      <section className="py-16 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCategory('All')}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-br from-primary-500 to-cyan-500 border-primary-500 text-white shadow-xl scale-105'
                  : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg text-slate-700 dark:text-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{faqs.reduce((acc, cat) => acc + cat.questions.length, 0)}</div>
                <div className="text-sm font-semibold">All Questions</div>
              </div>
            </motion.button>

            {faqs.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    selectedCategory === category.category
                      ? `bg-gradient-to-br ${category.color} border-transparent text-white shadow-xl scale-105`
                      : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-lg text-slate-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className={`mx-auto mb-3 ${selectedCategory === category.category ? 'text-white' : 'text-primary-600'}`} size={32} />
                  <div className="text-sm font-bold mb-1">{category.category}</div>
                  <div className="text-xs opacity-80">{category.questions.length} Questions</div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-900 dark:to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
                    <category.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white">
                      {category.category}
                    </h2>
                    <p className="text-slate-600 dark:text-gray-300">{category.questions.length} questions answered</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const index = `${categoryIndex}-${questionIndex}`
                    const isOpen = openIndex === index

                    return (
                      <motion.div
                        key={questionIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: questionIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`bg-white dark:bg-neutral-900 border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                          isOpen ? 'border-primary-500' : 'border-slate-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-500'
                        }`}
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          className="w-full flex items-start justify-between p-6 md:p-8 text-left group"
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isOpen ? 'bg-primary-500' : 'bg-primary-100'
                            } transition-colors`}>
                              <HelpCircle size={20} className={isOpen ? 'text-white' : 'text-primary-600'} />
                            </div>
                            <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white pr-8 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {faq.question}
                            </span>
                          </div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isOpen ? 'bg-primary-500' : 'bg-slate-100'
                          } transition-all`}>
                            <ChevronDown
                              size={20}
                              className={`${isOpen ? 'text-white rotate-180' : 'text-slate-600'} transition-transform duration-300`}
                            />
                          </div>
                        </button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 ml-14">
                            <div className={`h-1 w-16 bg-gradient-to-r ${category.color} rounded-full mb-4`}></div>
                            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Still Have Questions - CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-cyan-500 to-indigo-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full mb-6">
              <MessageCircle size={18} />
              <span className="text-sm font-bold">Need More Help?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our expert team is ready to provide personalized assistance and answer all your queries
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Mail size={20} />
                <span>Contact Us</span>
              </a>
              <a
                href="tel:+919730992561"
                className="group inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </a>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Phone className="mx-auto mb-3 text-white" size={32} />
                <div className="text-white font-bold mb-1">Call Us</div>
                <div className="text-white/80 text-sm">24/7 Support Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Mail className="mx-auto mb-3 text-white" size={32} />
                <div className="text-white font-bold mb-1">Email Us</div>
                <div className="text-white/80 text-sm">Quick Response Guaranteed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <MessageCircle className="mx-auto mb-3 text-white" size={32} />
                <div className="text-white font-bold mb-1">Live Chat</div>
                <div className="text-white/80 text-sm">Instant Support Online</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
