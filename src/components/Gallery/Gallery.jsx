import { useState } from 'react';
import styles from './Gallery.module.scss';

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e, image) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(image);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const newImage = {
            src: event.target.result,
            alt: file.name,
            caption: 'Uploaded by visitor',
            uploaded: true
          };
          
          setUploadedImages(prev => [...prev, newImage]);
        };
        
        reader.readAsDataURL(file);
      }
    });
    
    // Reset input
    e.target.value = '';
  };

  const allImages = [...images, ...uploadedImages];

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.title}>Photo Gallery</h2>
        <p className={styles.subtitle}>A glimpse into my professional journey</p>

        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <label htmlFor="photo-upload" className={styles.uploadButton}>
            <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Your Photo
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className={styles.uploadInput}
            aria-label="Upload photos to gallery"
          />
          <p className={styles.uploadHint}>Share your photos with us! (Images are stored locally in your browser)</p>
        </div>
        
        <div className={styles.grid}>
          {allImages.map((image, index) => (
            <div 
              key={index} 
              className={`${styles.imageCard} ${image.uploaded ? styles.uploadedCard : ''}`}
              onClick={() => openModal(image)}
              onKeyDown={(e) => handleKeyDown(e, image)}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.alt} in full size`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <span className={styles.viewText}>View</span>
                {image.uploaded && (
                  <span className={styles.uploadedBadge}>Visitor Upload</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div 
          className={styles.modal} 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image modal"
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className={styles.modalImage}
            />
            {selectedImage.caption && (
              <p className={styles.caption}>{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
