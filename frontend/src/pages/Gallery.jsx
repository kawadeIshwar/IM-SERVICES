import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Machines', value: 'machines' },
    { name: 'Maintenance', value: 'maintenance' },
    { name: 'Repairs', value: 'repairs' },
    { name: 'Testing', value: 'testing' }
  ]

  const [activeCategory, setActiveCategory] = useState('all')

  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'Injection Moulding Machine',
      category: 'machines'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
      title: 'Machine Maintenance Work',
      category: 'maintenance'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      title: 'Industrial Equipment',
      category: 'machines'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      title: 'Hydraulic System Repair',
      category: 'repairs'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'Performance Testing',
      category: 'testing'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8c7?w=800',
      title: 'On-Site Service',
      category: 'maintenance'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
      title: 'Machine Components',
      category: 'repairs'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      title: 'Quality Check',
      category: 'testing'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
      title: 'Factory Floor',
      category: 'machines'
    }
  ]

  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory)

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
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing our work, machines, and on-site service excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category.value
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-glow'
                    : 'bg-dark-900 text-gray-400 hover:text-white border border-gray-800 hover:border-primary-500/50'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-w-16 aspect-h-12 bg-dark-800">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-primary-400 text-sm capitalize">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-primary-400 transition-colors"
          >
            <X size={32} />
          </button>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.title}</h3>
              <p className="text-primary-400 capitalize">{selectedImage.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Gallery
