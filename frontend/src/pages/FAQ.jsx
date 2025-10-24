import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What types of injection moulding machines do you service?',
          answer: 'We service all major brands and types of injection moulding machines including horizontal, vertical, hydraulic, electric, and hybrid machines. Our technicians are experienced with brands like Haitian, Engel, Arburg, Sumitomo, and many others.'
        },
        {
          question: 'What areas do you cover for on-site service?',
          answer: 'We are based in Shikrapur, Pune, and provide on-site services across Maharashtra including Pune, Mumbai, Nashik, Aurangabad, and neighboring regions. For emergency breakdowns, we can arrange services in other states as well.'
        },
        {
          question: 'Do you offer 24/7 emergency support?',
          answer: 'Yes, we provide 24/7 emergency breakdown support. You can call us anytime at +91 9730992561, +91 7875601427, or +91 8551035501 for immediate assistance.'
        }
      ]
    },
    {
      category: 'Services',
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
                <HelpCircle size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full mr-4"></span>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`
                  const isOpen = openIndex === index

                  return (
                    <div
                      key={questionIndex}
                      className="bg-dark-900 border border-gray-800 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="text-lg font-semibold text-white pr-8">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={24}
                          className={`text-primary-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
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
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our team is here to help. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300"
              >
                Contact Us
              </a>
              <a
                href="tel:+919730992561"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
