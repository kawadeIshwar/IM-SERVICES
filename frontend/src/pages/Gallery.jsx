import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Play, Image as ImageIcon, Video, ZoomIn, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const images = [
    {
      id: 1,
      url: 'images/MG-PET.jpg',
      title: 'Injection Moulding Machine',
      description: 'High-performance injection moulding equipment',
      size: 'large'
    },
    {
      id: 2,
      url: 'images/7-factor.jpg',
      title: '7-Factor Performance Testing',
      description: 'Comprehensive machine performance analysis',
      size: 'medium'
    },
    {
      id: 3,
      url: 'images/hydraulic system 2.jpg',
      title: 'Hydraulic System',
      description: 'Advanced hydraulic components and systems',
      size: 'medium'
    },
    {
      id: 4,
      url: 'images/motor-testing.jpg',
      title: 'Motor Testing & Diagnostics',
      description: 'Professional motor health assessment',
      size: 'large'
    },
    {
      id: 5,
      url: 'images/PLC retrofitting.jpeg',
      title: 'PLC Retrofitting',
      description: 'Modern PLC system upgrades',
      size: 'medium'
    },
    {
      id: 6,
      url: 'images/technical-Maintenance.jpg',
      title: 'Technical Maintenance',
      description: 'Expert on-site maintenance services',
      size: 'medium'
    },
    {
      id: 7,
      url: 'images/Chillers-Work.jpg',
      title: 'Chiller Systems',
      description: 'Industrial cooling system maintenance',
      size: 'large'
    },
    {
      id: 8,
      url: 'images/APFC Panel.jpg',
      title: 'Power Factor Correction',
      description: 'APFC panel installation and service',
      size: 'medium'
    },
    {
      id: 9,
      url: 'images/emergency_breakdown_support.png',
      title: 'Emergency Breakdown Support',
      description: '24/7 rapid response service',
      size: 'medium'
    },
    {
      id: 10,
      url: 'images/checks-motor-vibration.png',
      title: 'Motor Vibration Analysis',
      description: 'Precision vibration testing and diagnostics',
      size: 'medium'
    },
    {
      id: 11,
      url: 'images/injection pressure testing.jpg',
      title: 'Injection Pressure Testing',
      description: 'Accurate pressure measurement and calibration',
      size: 'large'
    },
    {
      id: 12,
      url: 'images/retrofitting and reconditioning.jpg',
      title: 'Machine Retrofitting',
      description: 'Complete machine modernization',
      size: 'medium'
    },
    {
      id: 13,
      url: 'images/image1.jpg',
      title: 'Machine Service Work',
      description: 'Professional maintenance in progress',
      size: 'medium'
    },
    {
      id: 14,
      url: 'images/image2.jpg',
      title: 'Component Inspection',
      description: 'Detailed component analysis',
      size: 'medium'
    },
    {
      id: 15,
      url: 'images/image4.jpg',
      title: 'Machine Operations',
      description: 'Operational efficiency monitoring',
      size: 'large'
    },
    {
      id: 16,
      url: 'images/image6.jpg',
      title: 'System Integration',
      description: 'Advanced system integration work',
      size: 'medium'
    },
    {
      id: 17,
      url: 'images/image7.jpg',
      title: 'Industrial Equipment',
      description: 'State-of-the-art manufacturing equipment',
      size: 'medium'
    },
    {
      id: 18,
      url: 'images/image8.jpg',
      title: 'Precision Work',
      description: 'Detailed precision maintenance',
      size: 'medium'
    }
  ]

  const videos = [
    {
      id: 1,
      thumbnail: 'images/MG-PET.jpg',
      title: 'Service Demonstration Video 1',
      description: 'Our expert service techniques in action',
      duration: '0:16',
      videoUrl: 'images/image3.mp4',
      type: 'local'
    },
    {
      id: 2,
      thumbnail: 'images/technical-Maintenance.jpg',
      title: 'Service Demonstration Video 2',
      description: 'Professional maintenance procedures',
      duration: '0:34',
      videoUrl: 'images/image5.mp4',
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

          {/* Uniform Grid - 3 Images Per Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative bg-white dark:bg-neutral-900 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-500 rounded-2xl overflow-hidden">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <ZoomIn size={20} className="text-primary-600" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

          {/* Video Grid - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video, index) => {
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
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 dark:border-neutral-800 hover:border-cyan-300 dark:hover:border-cyan-500">
                    {/* Video Preview */}
                    <div className="relative h-96 overflow-hidden bg-slate-900">
                      {video.type === 'local' ? (
                        <>
                          {/* Video Element */}
                          <video
                            ref={videoRef}
                            src={video.videoUrl}
                            poster={video.thumbnail}
                            className="w-full h-full object-cover"
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
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
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
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-white font-bold text-3xl mb-2">{selectedImage.title}</h3>
              <p className="text-white/80 text-lg">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

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
