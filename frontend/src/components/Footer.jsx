import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">IM</span>
              </div>
              <h3 className="text-white font-heading font-bold text-xl">IM SERVICES</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Expert Injection Moulding Machine Maintenance & Performance Optimization Services in Pune.
            </p>
            <div className="inline-block px-3 py-1 bg-slate-800 border border-slate-700 rounded-md">
              <p className="text-slate-400 text-xs font-medium">
                GSTIN: <span className="text-slate-300">27AZFPG7021B1ZW</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4 text-lg border-l-4 border-primary-500 pl-3">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-slate-300 hover:text-primary-400 text-sm transition-colors font-medium flex items-center group">
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 group-hover:bg-primary-400 transition-colors"></span>
                About Us
              </Link></li>
              <li><Link to="/services" className="text-slate-300 hover:text-primary-400 text-sm transition-colors font-medium flex items-center group">
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 group-hover:bg-primary-400 transition-colors"></span>
                Our Services
              </Link></li>
              <li><Link to="/gallery" className="text-slate-300 hover:text-primary-400 text-sm transition-colors font-medium flex items-center group">
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 group-hover:bg-primary-400 transition-colors"></span>
                Gallery
              </Link></li>
              <li><Link to="/faq" className="text-slate-300 hover:text-primary-400 text-sm transition-colors font-medium flex items-center group">
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-2 group-hover:bg-primary-400 transition-colors"></span>
                FAQ
              </Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4 text-lg border-l-4 border-cyan-500 pl-3">Services</h4>
            <ul className="space-y-2.5">
              <li className="text-slate-300 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                Performance Testing
              </li>
              <li className="text-slate-300 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                Machine Health Checkup
              </li>
              <li className="text-slate-300 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                Retrofitting
              </li>
              <li className="text-slate-300 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                Preventive Maintenance
              </li>
              <li className="text-slate-300 text-sm font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                Power Optimization
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4 text-lg border-l-4 border-primary-500 pl-3">Contact Us</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start space-x-3 text-slate-300 text-sm">
                <MapPin size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>Shikrapur, Pune, Maharashtra</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-300 text-sm">
                <Phone size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col space-y-1">
                  <span>+91 9730992561</span>
                  <span>+91 7875601427</span>
                  <span>+91 8551035501</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-slate-300 text-sm">
                <Mail size={18} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="break-all">imservices4444@gmail.com</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-cyan-500 text-slate-400 hover:text-white transition-all duration-300 rounded-lg flex items-center justify-center hover:scale-110 transform shadow-md">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-cyan-500 text-slate-400 hover:text-white transition-all duration-300 rounded-lg flex items-center justify-center hover:scale-110 transform shadow-md">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-cyan-500 text-slate-400 hover:text-white transition-all duration-300 rounded-lg flex items-center justify-center hover:scale-110 transform shadow-md">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-cyan-500 text-slate-400 hover:text-white transition-all duration-300 rounded-lg flex items-center justify-center hover:scale-110 transform shadow-md">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-10 pt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">IM Services</span>. All rights reserved. Designed for Industrial Excellence
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
