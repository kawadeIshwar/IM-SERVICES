import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Loader } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StatusUpdateModal = ({ request, onClose, onUpdate }) => {
  const [status, setStatus] = useState(request.currentStatus);
  const [notes, setNotes] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem('token');

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Generate previews
    const newPreviews = files.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null;
    });
    setPreviews(newPreviews);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL for removed preview
    if (previews[index]) {
      URL.revokeObjectURL(previews[index]);
    }
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('status', status);
      formData.append('notes', notes);
      
      // Append all selected files
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });

      await axios.put(
        `${API_URL}/service-requests/${request._id}/status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Clean up previews
      previews.forEach(preview => {
        if (preview) URL.revokeObjectURL(preview);
      });

      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Update Request Status
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Info */}
          <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Request ID</p>
            <p className="font-semibold text-gray-900 dark:text-white">{request.requestId}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Client</p>
            <p className="font-semibold text-gray-900 dark:text-white">{request.clientName}</p>
          </div>

          {/* Status Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              New Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-neutral-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
              required
            >
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              placeholder="Add any notes or comments..."
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-neutral-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Attach Images (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-xl p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    {preview ? (
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                      {selectedFiles[index]?.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Status'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default StatusUpdateModal;
