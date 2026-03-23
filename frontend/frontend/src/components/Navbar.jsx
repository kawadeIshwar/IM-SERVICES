import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, Sun, Moon, LogOut, User } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomePage = location.pathname === '/'

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'FAQ', path: '/faq' },
    ]

    if (isAdmin()) {
      return [
        ...commonLinks,
        { name: 'Dashboard', path: '/admin/dashboard' },
      ]
    }

    return [
      ...commonLinks,
      { name: 'Contact', path: '/contact' },
    ]
  }

  const navLinks = getNavLinks()

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ease-in-out border-b ${
      isHomePage && !scrolled
        ? 'bg-transparent border-transparent'
        : scrolled 
        ? 'bg-white dark:bg-neutral-900 shadow-lg border-light-200 dark:border-neutral-700' 
        : 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-light-200/50 dark:border-neutral-700/50'
    }`}>
      <div className="max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/im-logo.png" 
              alt="IM Services Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className={`font-heading font-bold text-xl leading-tight transition-colors duration-700 ease-in-out ${
                isHomePage && !scrolled 
                  ? 'text-white' 
                  : 'text-gray-900 dark:text-white'
              }`}>IM SERVICES</h1>
              <p className={`text-xs font-medium transition-colors duration-700 ease-in-out ${
                isHomePage && !scrolled 
                  ? 'text-cyan-300' 
                  : 'text-primary-600 dark:text-primary-400'
              }`}>Machine Excellence</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-700 ease-in-out ${
                  location.pathname === link.path
                    ? isHomePage && !scrolled
                      ? 'text-cyan-300 font-semibold'
                      : 'text-primary-600 dark:text-primary-400 font-semibold'
                    : isHomePage && !scrolled
                      ? 'text-white/90 hover:text-cyan-300'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            
{!isAdmin() && (
              <Link
                to="/booking"
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                  isHomePage && !scrolled
                    ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                <Phone size={18} />
                <span>Book Service</span>
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg transition-all duration-700 ease-in-out hover:scale-110 ${
                isHomePage && !scrolled
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isAuthenticated() ? (
              <>
                {!isAdmin() ? (
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 text-sm font-semibold transition-colors duration-300 ${
                      isHomePage && !scrolled
                        ? 'text-white hover:text-cyan-300'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <User size={18} />
                    <span>{user?.name || 'Profile'}</span>
                  </Link>
                ) : (
                  <div
                    className={`flex items-center space-x-2 text-sm font-semibold ${
                      isHomePage && !scrolled
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <User size={18} />
                    <span>{user?.name || 'Admin'}</span>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 ${
                    isHomePage && !scrolled
                      ? 'bg-red-500/20 text-white hover:bg-red-500/30 border border-white/30'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isHomePage && !scrolled
                      ? 'text-white hover:text-cyan-300'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  Login
                </Link>
                
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary-600 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}

            
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-700 ease-in-out ${
                isHomePage && !scrolled
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-700 ease-in-out ${
                isHomePage && !scrolled
                  ? 'text-white'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-light-50 dark:bg-neutral-900 border-t border-light-200 dark:border-neutral-700">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated() ? (
              <>
                {!isAdmin() ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <User size={18} />
                    <span>{user?.name || 'Profile'}</span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-2 text-base font-medium text-gray-700 dark:text-gray-300">
                    <User size={18} />
                    <span>{user?.name || 'Admin'}</span>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block bg-gradient-to-r from-primary-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}

            {!isAdmin() && (
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="block bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all"
              >
                Book Service
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
