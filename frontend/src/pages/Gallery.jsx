import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Play, Image as ImageIcon, Video, ZoomIn, ExternalLink } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'High-Tech Injection Moulding Machine',
      description: 'State-of-the-art injection moulding equipment',
      size: 'large'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
      title: 'Machine Maintenance Service',
      description: 'Professional on-site maintenance',
      size: 'medium'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      title: 'Industrial Manufacturing Equipment',
      description: 'Advanced manufacturing technology',
      size: 'medium'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      title: 'Hydraulic System Repair',
      description: 'Expert hydraulic system services',
      size: 'large'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'Performance Testing',
      description: 'Comprehensive machine testing',
      size: 'medium'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c7?w=800',
      title: 'On-Site Technical Support',
      description: '24/7 emergency service',
      size: 'medium'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'Precision Machine Components',
      description: 'Quality parts and replacements',
      size: 'large'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      title: 'Quality Assurance Check',
      description: 'Rigorous testing standards',
      size: 'medium'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
      title: 'Modern Factory Operations',
      description: 'Efficient production floor',
      size: 'medium'
    }
  ]

  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'Machine Performance Testing',
      description: 'Complete 7-factor analysis demonstration',
      duration: '5:32',
      videoUrl: '/videos/performance-testing.mp4', // Replace with your video path
      type: 'local' // or 'youtube'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      title: 'Preventive Maintenance Process',
      description: 'Our systematic maintenance approach',
      duration: '8:45',
      videoUrl: '/videos/maintenance-process.mp4',
      type: 'local'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
      title: 'Retrofitting & Upgrades',
      description: 'Modernizing old equipment',
      duration: '6:18',
      videoUrl: '/videos/retrofitting.mp4',
      type: 'local'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      title: 'Emergency Repair Services',
      description: 'Quick response and solutions',
      duration: '4:22',
      videoUrl: '/videos/emergency-services.mp4',
      type: 'local'
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section - Modern Design */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
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

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore our work through stunning visuals and informative videos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
              Our Work in Pictures
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse through our collection of machines, services, and on-site excellence
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  image.size === 'large' ? 'md:col-span-2 md:row-span-1' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-primary-300 rounded-2xl overflow-hidden">
                  <div className={`relative ${image.size === 'large' ? 'h-96' : 'h-80'} overflow-hidden`}>
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
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
      <section className="py-20 bg-white relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
              Watch Our Services in Action
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-cyan-300">
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
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to view fullscreen
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-slate-600 text-base leading-relaxed">
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
