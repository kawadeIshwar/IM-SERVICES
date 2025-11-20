import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Download, Loader, RotateCw, Maximize2 
} from 'lucide-react';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, fileName, onClose, authToken }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Configure headers for authenticated requests
  const options = authToken ? {
    httpHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  } : {};

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName || 'report.pdf';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50">
      {/* Header/Toolbar */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">{fileName || 'PDF Document'}</h3>
          {numPages && (
            <span className="text-sm text-gray-400">
              Page {pageNumber} of {numPages}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm px-3">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-2" />

          {/* Rotate */}
          <button
            onClick={rotate}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Rotate"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Download PDF"
          >
            <Download className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-700 mx-2" />

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

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-800 flex items-center justify-center p-4">
        {loading && (
          <div className="flex flex-col items-center gap-4 text-white">
            <Loader className="w-12 h-12 animate-spin" />
            <p>Loading PDF...</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white shadow-2xl"
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </motion.div>
      </div>

      {/* Navigation Footer */}
      {numPages && (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-center gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= numPages) {
                  setPageNumber(page);
                }
              }}
              className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-center focus:outline-none focus:border-blue-500"
            />
            <span className="text-gray-400">/ {numPages}</span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
