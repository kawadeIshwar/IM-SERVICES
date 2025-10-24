import { Phone, MessageCircle } from 'lucide-react'

const StickyContact = () => {
  const phoneNumber = '+919730992561'
  const whatsappNumber = '919730992561'

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hello! I would like to inquire about your services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        aria-label="Call us"
      >
        <Phone size={24} className="group-hover:scale-110 transition-transform" />
      </a>
    </div>
  )
}

export default StickyContact
