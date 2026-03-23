import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, AlertCircle } from 'lucide-react';

/**
 * Simple PDF Viewer using iframe
 * This is a fallback/alternative if react-pdf has issues
 */
const SimplePDFViewer = ({ pdfUrl, fileName, onClose }) => {
  const [loadError, setLoadError] = useState(false);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName || 'report.pdf';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{fileName || 'PDF Document'}</h3>
        
        <div className="flex items-center gap-2">
          {/* Download */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
            Download
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* PDF Content using iframe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 bg-gray-800 relative"
      >
        {loadError ? (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Failed to Load PDF</h3>
            <p className="text-gray-400 mb-6">The PDF could not be displayed in the browser.</p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF Instead
            </button>
          </div>
        ) : (
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1&view=FitH`}
            type="application/pdf"
            className="w-full h-full border-0"
            title={fileName}
            onError={() => setLoadError(true)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SimplePDFViewer;
