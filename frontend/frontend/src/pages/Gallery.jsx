import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Image as ImageIcon, Video, ZoomIn, ExternalLink, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showAllImages, setShowAllImages] = useState(false)

  // Navigation functions
  const goToPreviousImage = () => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setSelectedImage(images[previousIndex])
  }

  const goToNextImage = () => {
    if (!selectedImage) return
    const currentIndex = images.findIndex(img => img.id === selectedImage.id)
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    setSelectedImage(images[nextIndex])
  }

  const images = [
    {
      id: 3,
      url: 'images/image 52.jpeg',
      title: 'Industrial Equipment Repair',
      description: 'Expert machine repair and diagnostics',
      size: 'medium'
    },
    {
      id: 4,
      url: 'images/image 53.jpeg',
      title: 'System Component Analysis',
      description: 'Thorough component inspection and testing',
      size: 'large'
    },
    {
      id: 5,
      url: 'images/image 54.jpeg',
      title: 'Technical Maintenance Service',
      description: 'Comprehensive on-site maintenance work',
      size: 'medium'
    },
    {
      id: 6,
      url: 'images/image 55.jpeg',
      title: 'Machine Performance Testing',
      description: 'Advanced performance calibration and testing',
      size: 'medium'
    },
    {
      id: 7,
      url: 'images/image 51.jpeg',
      title: 'Equipment Modernization',
      description: 'State-of-the-art machine upgrades',
      size: 'large'
    },
    {
      id: 8,
      url: 'images/retrofitting and reconditioning.jpg',
      title: 'Machine Retrofitting',
      description: 'Complete machine modernization',
      size: 'medium'
    },
    {
      id: 9,
      url: 'images/image1.jpg',
      title: 'Machine Service Work',
      description: 'Professional maintenance in progress',
      size: 'medium'
    },
    {
      id: 10,
      url: 'images/image2.jpg',
      title: 'Component Inspection',
      description: 'Detailed component analysis',
      size: 'medium'
    },
    {
      id: 11,
      url: 'images/image4.jpg',
      title: 'Machine Operations',
      description: 'Operational efficiency monitoring',
      size: 'large'
    },
    {
      id: 12,
      url: 'images/image6.jpg',
      title: 'System Integration',
      description: 'Advanced system integration work',
      size: 'medium'
    },
    {
      id: 13,
      url: 'images/image7.jpg',
      title: 'Industrial Equipment',
      description: 'State-of-the-art manufacturing equipment',
      size: 'medium'
    },
    {
      id: 14,
      url: 'images/image8.jpg',
      title: 'Precision Work',
      description: 'Detailed precision maintenance',
      size: 'medium'
    },
    {
      id: 15,
      url: 'images/image 57.jpeg',
      title: 'Advanced Machine Components',
      description: 'High-precision component assembly and calibration',
      size: 'large'
    },
    {
      id: 16,
      url: 'images/image 58.jpeg',
      title: 'Technical Service Operations',
      description: 'Professional on-site technical maintenance work',
      size: 'medium'
    },
    {
      id: 17,
      url: 'images/image 59.jpeg',
      title: 'Equipment Inspection',
      description: 'Thorough equipment quality control and inspection',
      size: 'medium'
    },
    {
      id: 18,
      url: 'images/image 60.jpeg',
      title: 'Machine Maintenance',
      description: 'Comprehensive machine maintenance and servicing',
      size: 'large'
    },
    {
      id: 19,
      url: 'images/image 61.jpeg',
      title: 'Component Testing',
      description: 'Advanced component performance testing',
      size: 'medium'
    },
    {
      id: 21,
      url: 'images/image 63.jpeg',
      title: 'Precision Engineering',
      description: 'High-precision engineering and calibration work',
      size: 'large'
    },
    {
      id: 22,
      url: 'images/image 64.jpeg',
      title: 'Equipment Service',
      description: 'Professional equipment servicing and repair',
      size: 'medium'
    },
    {
      id: 23,
      url: 'images/image 65.jpeg',
      title: 'Machine Calibration',
      description: 'Precision machine calibration and tuning',
      size: 'medium'
    },
    {
      id: 24,
      url: 'images/image 66.jpeg',
      title: 'Quality Control',
      description: 'Stringent quality control and testing procedures',
      size: 'large'
    },
    {
      id: 25,
      url: 'images/image 67.jpeg',
      title: 'Technical Analysis',
      description: 'Detailed technical analysis and optimization',
      size: 'medium'
    },
    {
      id: 26,
      url: 'images/image 68.jpeg',
      title: 'System Maintenance',
      description: 'Complete system maintenance and upgrade',
      size: 'medium'
    },
    {
      id: 27,
      url: 'images/image 69.jpeg',
      title: 'Performance Testing',
      description: 'Advanced performance testing and validation',
      size: 'large'
    },
    {
      id: 28,
      url: 'images/image 70.jpeg',
      title: 'Machine Component Assembly',
      description: 'Precision component assembly and integration work',
      size: 'medium'
    },
    {
      id: 29,
      url: 'images/image 71.jpeg',
      title: 'Technical Service Operations',
      description: 'Professional technical maintenance and service',
      size: 'large'
    },
    {
      id: 30,
      url: 'images/image 72.jpeg',
      title: 'Equipment Calibration',
      description: 'Advanced equipment calibration and tuning',
      size: 'medium'
    },
    {
      id: 31,
      url: 'images/image 73.jpeg',
      title: 'System Integration',
      description: 'Complete system integration and testing',
      size: 'large'
    },
    {
      id: 32,
      url: 'images/image 74.jpeg',
      title: 'Quality Assurance',
      description: 'Comprehensive quality control and inspection',
      size: 'medium'
    },
    {
      id: 33,
      url: 'images/image 75.jpeg',
      title: 'Machine Maintenance',
      description: 'Professional machine maintenance and servicing',
      size: 'large'
    },
    {
      id: 34,
      url: 'images/image 76.jpeg',
      title: 'Component Testing',
      description: 'Advanced component performance testing',
      size: 'medium'
    },
    {
      id: 35,
      url: 'images/image 77.jpeg',
      title: 'System Diagnostics',
      description: 'Complete system diagnostic analysis',
      size: 'large'
    },
    {
      id: 36,
      url: 'images/image 78.jpeg',
      title: 'Equipment Service',
      description: 'Professional equipment servicing and repair',
      size: 'medium'
    },
    {
      id: 37,
      url: 'images/image 79.jpeg',
      title: 'Precision Engineering',
      description: 'High-precision engineering and calibration',
      size: 'large'
    },
    {
      id: 38,
      url: 'images/image 81.jpeg',
      title: 'Machine Optimization',
      description: 'Advanced machine optimization and tuning',
      size: 'medium'
    },
    {
      id: 39,
      url: 'images/image 82.jpeg',
      title: 'Technical Analysis',
      description: 'Detailed technical analysis and optimization',
      size: 'large'
    },
    {
      id: 40,
      url: 'images/image 83.jpeg',
      title: 'Quality Control',
      description: 'Stringent quality control and testing procedures',
      size: 'medium'
    },
    {
      id: 41,
      url: 'images/image 84.jpeg',
      title: 'System Maintenance',
      description: 'Complete system maintenance and upgrade',
      size: 'large'
    },
    {
      id: 42,
      url: 'images/image 85.jpeg',
      title: 'Performance Testing',
      description: 'Advanced performance testing and validation',
      size: 'medium'
    },
    {
      id: 43,
      url: 'images/image 86.jpeg',
      title: 'Equipment Inspection',
      description: 'Thorough equipment quality control and inspection',
      size: 'large'
    },
    {
      id: 44,
      url: 'images/image 87.jpeg',
      title: 'System Maintenance Operations',
      description: 'Professional system maintenance and technical service work',
      size: 'medium'
    },
    {
      id: 45,
      url: 'images/image 88.jpeg',
      title: 'Advanced Equipment Service',
      description: 'High-level equipment service and maintenance procedures',
      size: 'large'
    },
    {
      id: 46,
      url: 'images/image 89.jpeg',
      title: 'Precision Technical Work',
      description: 'Detailed precision technical service and calibration work',
      size: 'medium'
    }
  ]

  // Show only 10 images on small screens unless showAllImages is true
  const displayedImages = typeof window !== 'undefined' && window.innerWidth < 768 && !showAllImages 
    ? images.slice(0, 10) 
    : images

  const videos = [
    {
      id: 1,
      title: 'Machine Service Operation',
      description: 'Complete injection moulding machine service procedure',
      duration: '0:45',
      videoUrl: 'vidoes/vdo 1.mp4',
      type: 'local'
    },
    {
      id: 2,
      title: 'Precision Maintenance Work',
      description: 'Detailed technical maintenance and calibration',
      duration: '1:02',
      videoUrl: 'vidoes/vdo 2.mp4',
      type: 'local'
    },
    {
      id: 3,
      title: 'Equipment Repair Process',
      description: 'Professional machine repair and diagnostics',
      duration: '2:15',
      videoUrl: 'vidoes/vdo 3.mp4',
      type: 'local'
    },
    {
      id: 4,
      title: 'System Component Testing',
      description: 'Thorough component inspection and analysis',
      duration: '0:38',
      videoUrl: 'vidoes/vdo 4.mp4',
      type: 'local'
    },
    {
      id: 5,
      title: 'Advanced Technical Service',
      description: 'Comprehensive on-site technical maintenance',
      duration: '3:32',
      videoUrl: 'vidoes/vdo 5.mp4',
      type: 'local'
    },
    {
      id: 6,
      title: 'Performance Calibration',
      description: 'Machine performance testing and calibration',
      duration: '1:45',
      videoUrl: 'vidoes/vdo 6.mp4',
      type: 'local'
    },
    {
      id: 7,
      title: 'Equipment Modernization',
      description: 'State-of-the-art machine upgrade process',
      duration: '1:41',
      videoUrl: 'vidoes/vdo 7.mp4',
      type: 'local'
    },
    {
      id: 8,
      title: 'Industrial Service Work',
      description: 'Large-scale industrial equipment service',
      duration: '1:19',
      videoUrl: 'vidoes/vdo 8.mp4',
      type: 'local'
    },
    {
      id: 9,
      title: 'Component Replacement',
      description: 'Professional component replacement and testing',
      duration: '2:31',
      videoUrl: 'vidoes/vdo 9.mp4',
      type: 'local'
    },
    {
      id: 10,
      title: 'System Optimization',
      description: 'Complete system optimization and tuning',
      duration: '1:08',
      videoUrl: 'vidoes/vdo 10.mp4',
      type: 'local'
    },
    {
      id: 11,
      title: 'Quality Assurance Testing',
      description: 'Final quality checks and performance validation',
      duration: '6:33',
      videoUrl: 'vidoes/vdo 11.mp4',
      type: 'local'
    },
    {
      id: 12,
      title: 'Machine Calibration Process',
      description: 'Precision calibration and tuning of injection moulding machines',
      duration: '0:44',
      videoUrl: 'vidoes/vdo 12.mp4',
      type: 'local'
    },
    {
      id: 13,
      title: 'Component Replacement Service',
      description: 'Professional component replacement and testing procedures',
      duration: '1:17',
      videoUrl: 'vidoes/vdo 13.mp4',
      type: 'local'
    },
    {
      id: 14,
      title: 'System Diagnostic Testing',
      description: 'Complete system diagnostics and performance analysis',
      duration: '2:10',
      videoUrl: 'vidoes/vdo 14.mp4',
      type: 'local'
    },
    {
      id: 15,
      title: 'Equipment Maintenance Work',
      description: 'Comprehensive equipment maintenance and servicing',
      duration: '2:03',
      videoUrl: 'vidoes/vdo 15.mp4',
      type: 'local'
    },
    {
      id: 16,
      title: 'Advanced Technical Service',
      description: 'High-level technical service and machine optimization',
      duration: '3:12',
      videoUrl: 'vidoes/vdo 16.mp4',
      type: 'local'
    },
    {
      id: 17,
      title: 'Quality Control Procedures',
      description: 'Detailed quality control and testing protocols',
      duration: '1:05',
      videoUrl: 'vidoes/vdo 17.mp4',
      type: 'local'
    },
    {
      id: 18,
      title: 'Machine Performance Testing',
      description: 'Comprehensive performance testing and validation',
      duration: '1:02',
      videoUrl: 'vidoes/vdo 18.mp4',
      type: 'local'
    },
    {
      id: 19,
      title: 'System Optimization Service',
      description: 'Complete system optimization and tuning procedures',
      duration: '0:53',
      videoUrl: 'vidoes/vdo 19.mp4',
      type: 'local'
    },
    {
      id: 20,
      title: 'Equipment Repair Operations',
      description: 'Professional equipment repair and maintenance work',
      duration: '1:28',
      videoUrl: 'vidoes/vdo 20.mp4',
      type: 'local'
    },
    {
      id: 21,
      title: 'Advanced Machine Service',
      description: 'High-level machine service and technical maintenance',
      duration: '1:38',
      videoUrl: 'vidoes/vdo 21.mp4',
      type: 'local'
    },
    {
      id: 22,
      title: 'System Component Testing',
      description: 'Thorough component testing and validation procedures',
      duration: '0:49',
      videoUrl: 'vidoes/vdo 22.mp4',
      type: 'local'
    },
    {
      id: 23,
      title: 'Equipment Maintenance Work',
      description: 'Comprehensive equipment maintenance and servicing',
      duration: '1:27',
      videoUrl: 'vidoes/vdo 23.mp4',
      type: 'local'
    },
    {
      id: 24,
      title: 'Machine Diagnostic Analysis',
      description: 'Complete machine diagnostic and analysis procedures',
      duration: '3:56',
      videoUrl: 'vidoes/vdo 24.mp4',
      type: 'local'
    },
    {
      id: 25,
      title: 'Precision Calibration Service',
      description: 'Advanced precision calibration and tuning work',
      duration: '1:57',
      videoUrl: 'vidoes/vdo 25.mp4',
      type: 'local'
    },
    {
      id: 26,
      title: 'System Optimization Process',
      description: 'Complete system optimization and performance tuning',
      duration: '1:50',
      videoUrl: 'vidoes/vdo 26.mp4',
      type: 'local'
    },
    {
      id: 27,
      title: 'Quality Control Testing',
      description: 'Comprehensive quality control and testing procedures',
      duration: '1:59',
      videoUrl: 'vidoes/vdo 27.mp4',
      type: 'local'
    },
    {
      id: 28,
      title: 'Equipment Performance Analysis',
      description: 'Advanced equipment performance analysis and tuning',
      duration: '1:50',
      videoUrl: 'vidoes/vdo 28.mp4',
      type: 'local'
    },
    {
      id: 29,
      title: 'Technical Service Operations',
      description: 'Professional technical service and maintenance work',
      duration: '0:30',
      videoUrl: 'vidoes/vdo 29.mp4',
      type: 'local'
    },
    {
      id: 30,
      title: 'Machine Maintenance Procedures',
      description: 'Complete machine maintenance and service procedures',
      duration: '3:59',
      videoUrl: 'vidoes/vdo 30.mp4',
      type: 'local'
    },
    {
      id: 31,
      title: 'Advanced System Integration',
      description: 'High-level system integration and testing work',
      duration: '5:59',
      videoUrl: 'vidoes/vdo 31.mp4',
      type: 'local'
    },
    {
      id: 32,
      title: 'Equipment Repair Service',
      description: 'Professional equipment repair and maintenance service',
      duration: '1:20',
      videoUrl: 'vidoes/vdo 32.mp4',
      type: 'local'
    },
    {
      id: 33,
      title: 'Machine Performance Analysis',
      description: 'Comprehensive machine performance analysis and optimization',
      duration: '2:48',
      videoUrl: 'vidoes/vdo 33.mp4',
      type: 'local'
    },
    {
      id: 34,
      title: 'System Diagnostic Operations',
      description: 'Advanced system diagnostic and troubleshooting procedures',
      duration: '4:32',
      videoUrl: 'vidoes/vdo 34.mp4',
      type: 'local'
    },
    {
      id: 35,
      title: 'Technical Service Excellence',
      description: 'Professional technical service and maintenance operations',
      duration: '3:45',
      videoUrl: 'vidoes/vdo 35.mp4',
      type: 'local'
    },
    {
      id: 36,
      title: 'Equipment Calibration Work',
      description: 'Precision equipment calibration and tuning procedures',
      duration: '2:41',
      videoUrl: 'vidoes/vdo 36.mp4',
      type: 'local'
    },
    {
      id: 37,
      title: 'Machine Maintenance Service',
      description: 'Comprehensive machine maintenance and technical service',
      duration: '2:53',
      videoUrl: 'vidoes/vdo 37.mp4',
      type: 'local'
    },
    {
      id: 38,
      title: 'Component Testing Procedures',
      description: 'Thorough component testing and validation processes',
      duration: '1:12',
      videoUrl: 'vidoes/vdo 38.mp4',
      type: 'local'
    },
    {
      id: 39,
      title: 'System Quality Control',
      description: 'Advanced quality control and system validation',
      duration: '1:48',
      videoUrl: 'vidoes/vdo 39.mp4',
      type: 'local'
    },
    {
      id: 40,
      title: 'Equipment Optimization',
      description: 'Professional equipment optimization and performance tuning',
      duration: '4:28',
      videoUrl: 'vidoes/vdo 40.mp4',
      type: 'local'
    },
    {
      id: 41,
      title: 'Technical Analysis Work',
      description: 'Detailed technical analysis and system optimization',
      duration: '1:35',
      videoUrl: 'vidoes/vdo 41.mp4',
      type: 'local'
    },
    {
      id: 42,
      title: 'Machine Service Operations',
      description: 'Complete machine service and maintenance procedures',
      duration: '1:29',
      videoUrl: 'vidoes/vdo 42.mp4',
      type: 'local'
    },
    {
      id: 43,
      title: 'System Performance Testing',
      description: 'Advanced system performance testing and validation',
      duration: '2:10',
      videoUrl: 'vidoes/vdo 43.mp4',
      type: 'local'
    },
    {
      id: 44,
      title: 'Equipment Diagnostic Service',
      description: 'Professional equipment diagnostic and troubleshooting',
      duration: '1:38',
      videoUrl: 'vidoes/vdo 44.mp4',
      type: 'local'
    },
    {
      id: 45,
      title: 'Machine Calibration Process',
      description: 'Precision machine calibration and technical service',
      duration: '2:33',
      videoUrl: 'vidoes/vdo 45.mp4',
      type: 'local'
    },
    {
      id: 46,
      title: 'System Maintenance Work',
      description: 'Comprehensive system maintenance and service operations',
      duration: '1:19',
      videoUrl: 'vidoes/vdo 46.mp4',
      type: 'local'
    },
    {
      id: 47,
      title: 'Equipment Service Procedures',
      description: 'Professional equipment service and maintenance work',
      duration: '1:24',
      videoUrl: 'vidoes/vdo 47.mp4',
      type: 'local'
    },
    {
      id: 48,
      title: 'Technical Quality Control',
      description: 'Advanced technical quality control and testing',
      duration: '1:30',
      videoUrl: 'vidoes/vdo 48.mp4',
      type: 'local'
    },
    {
      id: 49,
      title: 'Machine Performance Service',
      description: 'Complete machine performance testing and optimization',
      duration: '4:41',
      videoUrl: 'vidoes/vdo 49.mp4',
      type: 'local'
    },
    {
      id: 50,
      title: 'System Analysis Operations',
      description: 'Professional system analysis and technical service',
      duration: '3:16',
      videoUrl: 'vidoes/vdo 50.mp4',
      type: 'local'
    },
    {
      id: 51,
      title: 'Equipment Testing Work',
      description: 'Thorough equipment testing and validation procedures',
      duration: '1:02',
      videoUrl: 'vidoes/vdo 51.mp4',
      type: 'local'
    },
    {
      id: 52,
      title: 'Machine Service Excellence',
      description: 'High-quality machine service and maintenance operations',
      duration: '4:32',
      videoUrl: 'vidoes/vdo 52.mp4',
      type: 'local'
    },
    {
      id: 53,
      title: 'System Optimization Service',
      description: 'Advanced system optimization and performance tuning',
      duration: '4:28',
      videoUrl: 'vidoes/vdo 53.mp4',
      type: 'local'
    },
    {
      id: 54,
      title: 'Equipment Maintenance Work',
      description: 'Professional equipment maintenance and technical service',
      duration: '1:48',
      videoUrl: 'vidoes/vdo 54.mp4',
      type: 'local'
    },
    {
      id: 55,
      title: 'Machine Calibration Service',
      description: 'Precision machine calibration and tuning procedures',
      duration: '1:45',
      videoUrl: 'vidoes/vdo 55.mp4',
      type: 'local'
    },
    {
      id: 56,
      title: 'System Quality Assurance',
      description: 'Comprehensive quality assurance and testing procedures',
      duration: '1:37',
      videoUrl: 'vidoes/vdo 56.mp4',
      type: 'local'
    },
    {
      id: 57,
      title: 'Equipment Performance Testing',
      description: 'Advanced equipment performance testing and validation',
      duration: '4:38',
      videoUrl: 'vidoes/vdo 57.mp4',
      type: 'local'
    },
    {
      id: 58,
      title: 'Technical Service Operations',
      description: 'Professional technical service and maintenance work',
      duration: '4:41',
      videoUrl: 'vidoes/vdo 58.mp4',
      type: 'local'
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-neutral-950">
      <SEO 
        title="Gallery - Our Work | IM Services Photo & Video Gallery"
        description="View our injection moulding machine service work through photos and videos. See our performance testing, maintenance, and repair services in action."
        keywords="IMM service gallery, machine maintenance photos, injection moulding videos, service work gallery, machine repair showcase"
        canonical="https://imservices.netlify.app/gallery"
      />
      
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
              <ImageIcon size={18} />
              <span className="text-sm font-bold">Visual Showcase</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our work through stunning visuals and informative videos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-900 dark:to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-6 py-2 rounded-full mb-4">
              <ImageIcon size={20} />
              <span className="font-bold">Photo Gallery</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
              Our Work in Pictures
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse through our collection of machines, services, and on-site excellence
            </p>
          </motion.div>

          {/* Masonry Grid - Different Image Sizes */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {displayedImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer mb-6"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative bg-white dark:bg-neutral-900 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-500 rounded-2xl overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        image.size === 'large' ? 'h-80 sm:h-96' : 'h-60 sm:h-72'
                      }`}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <ZoomIn size={20} className="text-primary-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button - Only on small screens */}
          {typeof window !== 'undefined' && window.innerWidth < 768 && images.length > 10 && !showAllImages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setShowAllImages(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-primary-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>See More Images</span>
                <ChevronDown size={20} className="animate-bounce" />
              </button>
              <p className="text-slate-600 dark:text-gray-300 mt-3">
                Showing {displayedImages.length} of {images.length} images
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 bg-white dark:bg-neutral-950 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-2 rounded-full mb-4">
              <Video size={20} />
              <span className="font-bold">Video Gallery</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
              Watch Our Services in Action
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how we deliver excellence through our detailed video demonstrations
            </p>
          </motion.div>

          {/* Masonry Video Grid - Different Video Sizes */}
          <div className="columns-1 sm:columns-2 lg:columns-2 gap-8 space-y-8">
            {videos.map((video) => {
              const videoRef = React.useRef(null)
              
              const handleMouseEnter = () => {
                if (videoRef.current && video.type === 'local') {
                  videoRef.current.play()
                }
              }
              
              const handleMouseLeave = () => {
                if (videoRef.current && video.type === 'local') {
                  videoRef.current.pause()
                  videoRef.current.currentTime = 0
                }
              }

              return (
                <div
                  key={video.id}
                  className="break-inside-avoid group cursor-pointer mb-8"
                  onClick={() => setSelectedVideo(video)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 dark:border-neutral-800 hover:border-cyan-300 dark:hover:border-cyan-500">
                    {/* Video Preview */}
                    <div className="relative overflow-hidden bg-slate-900">
                      {video.type === 'local' ? (
                        <>
                          {/* Video Element */}
                          <video
                            ref={videoRef}
                            src={video.videoUrl}
                            className="w-full object-cover transition-transform duration-700 group-hover:scale-110 h-60 sm:h-72 lg:h-80"
                            muted
                            loop
                            playsInline
                          />
                          
                          {/* Play Overlay (visible when not playing) */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl">
                                <Play size={40} className="text-white ml-2" fill="white" />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Static Thumbnail for YouTube */}
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-60 sm:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                              <Play size={40} className="text-white ml-2" fill="white" />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Duration Badge */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold">
                        {video.duration}
                      </div>

                      {/* Hover Text */}
                      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-slate-900 dark:text-white px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to view fullscreen
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6 sm:p-8">
                      {/* Video info removed */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            >
              <X size={24} />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPreviousImage()
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
            >
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNextImage()
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group"
            >
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 text-base">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {selectedVideo.type === 'local' ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  muted
                  className="w-full h-auto"
                  style={{ maxHeight: '70vh' }}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  width="100%"
                  height="600"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              )}
            </div>
            <div className="mt-6 text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-white font-bold text-3xl mb-2">{selectedVideo.title}</h3>
              <p className="text-white/80 text-lg">{selectedVideo.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Gallery
