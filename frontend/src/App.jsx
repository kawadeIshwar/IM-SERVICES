import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyContact from './components/StickyContact';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import AdminDashboard from './pages/AdminDashboard';
import CalendarView from './pages/CalendarView';
import ProtectedRoute from './components/ProtectedRoute';
import ClientRoute from './components/ClientRoute';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <DarkModeProvider>
        <AuthProvider>
          <Router>
          <div className="min-h-screen bg-white dark:bg-neutral-950">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route 
                path="/profile" 
                element={
                  <ClientRoute>
                    <Profile />
                  </ClientRoute>
                } 
              />
              <Route 
                path="/edit-profile" 
                element={
                  <ClientRoute>
                    <EditProfile />
                  </ClientRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/calendar" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <CalendarView />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
            <StickyContact />
          </div>
          </Router>
        </AuthProvider>
      </DarkModeProvider>
    </HelmetProvider>
  )
}

export default App
