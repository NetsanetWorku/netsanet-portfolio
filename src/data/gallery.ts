export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  uploaded?: boolean;
}

export const galleryImages: GalleryImage[] = [
  {
    src: '/images/photo_2026-01-13_17-27-43.jpg',
    alt: 'Professional portrait in gray hoodie',
    caption: 'Professional moment'
  },
  {
    src: '/images/netsa.jpg',
    alt: 'Professional portrait in yellow shirt',
    caption: 'Casual professional look'
  },
  {
    src: '/images/profile-1.jpg',
    alt: 'Professional portrait with thoughtful pose',
    caption: 'Thoughtful professional'
  },
  {
    src: '/images/profile-2.jpg',
    alt: 'Professional portrait in yellow striped shirt',
    caption: 'Bright and professional'
  },
  {
    src: '/images/profile-3.jpg',
    alt: 'Professional portrait on phone call',
    caption: 'In action'
  },
  {
    src: '/images/developer-photo.jpg',
    alt: 'Developer portrait with creative background',
    caption: 'Web Developer'
  }
];
