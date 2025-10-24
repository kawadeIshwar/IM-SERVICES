import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-light-50 to-primary-50 border-t border-light-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">IM</span>
              </div>
              <h3 className="text-gray-900 font-heading font-bold text-lg">IM SERVICES</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Expert Injection Moulding Machine Maintenance & Performance Optimization Services in Pune.
            </p>
            <p className="text-gray-500 text-xs font-medium">
              GSTIN: 27AZFPG7021B1ZW
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary-600 text-sm transition-colors font-medium">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-primary-600 text-sm transition-colors font-medium">Our Services</Link></li>
              <li><Link to="/gallery" className="text-gray-600 hover:text-primary-600 text-sm transition-colors font-medium">Gallery</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary-600 text-sm transition-colors font-medium">FAQ</Link></li>
              <li><Link to="/downloads" className="text-gray-600 hover:text-primary-600 text-sm transition-colors font-medium">Downloads</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm font-medium">Performance Testing</li>
              <li className="text-gray-600 text-sm font-medium">Machine Health Checkup</li>
              <li className="text-gray-600 text-sm font-medium">Retrofitting</li>
              <li className="text-gray-600 text-sm font-medium">Preventive Maintenance</li>
              <li className="text-gray-600 text-sm font-medium">Power Optimization</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-600 text-sm">
                <MapPin size={18} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <span>Shikrapur, Pune, Maharashtra</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <Phone size={18} className="text-primary-600 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>+91 9730992561</span>
                  <span>+91 7875601427</span>
                  <span>+91 8551035501</span>
                </div>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 text-sm">
                <Mail size={18} className="text-primary-600 flex-shrink-0" />
                <span>imservices4444@gmail.com</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors hover:scale-110 transform">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors hover:scale-110 transform">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors hover:scale-110 transform">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors hover:scale-110 transform">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm font-medium">
            © {new Date().getFullYear()} IM Services. All rights reserved. | Designed for Industrial Excellence
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
