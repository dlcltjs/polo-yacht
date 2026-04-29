import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const dummyGallery = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=100&w=1200&auto=format&fit=crop',
    category: '요트시설',
    title: '럭셔리 카타마란 외관'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1498084963786-0683aeb06fb0?q=100&w=1200&auto=format&fit=crop',
    category: '석양',
    title: '황금빛 선셋 투어'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=100&w=1200&auto=format&fit=crop',
    category: '펫투어',
    title: '반려견과 함께하는 항해'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=100&w=1200&auto=format&fit=crop',
    category: '이벤트',
    title: '선상 위 샴페인 파티'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=100&w=1200&auto=format&fit=crop',
    category: '요트시설',
    title: '프리미엄 요트 인테리어'
  }
];

const categories = ['전체', '요트시설', '펫투어', '이벤트', '석양'];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('전체');
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedGallery = localStorage.getItem('polo_gallery');
    if (!storedGallery) {
      localStorage.setItem('polo_gallery', JSON.stringify(dummyGallery));
      setPhotos(dummyGallery);
    } else {
      setPhotos(JSON.parse(storedGallery));
    }
  }, []);

  const filteredPhotos = activeCategory === '전체' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // 스크롤 복원
    document.body.style.overflow = 'auto';
  };

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  };

  // 키보드 이벤트 (좌우 화살표, ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') showNext(e);
      if (e.key === 'ArrowLeft') showPrev(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="min-h-screen bg-white pt-[110px] md:pt-[150px] pb-24 font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-script text-rivanavy-900 mb-3">Polo Gallery</h1>
          <p className="text-slate-500 font-medium tracking-widest text-sm md:text-base uppercase">폴로요트와 함께한 아름다운 순간들</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-rivanavy-900 text-white border-rivanavy-900 shadow-md' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-rivanavy-900 hover:text-rivanavy-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="relative group break-inside-avoid overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img 
                  src={photo.url} 
                  alt={photo.title || 'Gallery Image'} 
                  className="w-full h-auto object-cover antialiased [image-rendering:-webkit-optimize-contrast] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-1">{photo.category}</span>
                  <h3 className="text-white font-medium text-lg flex justify-between items-center">
                    {photo.title}
                    <Maximize2 size={18} className="text-white/70" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-slate-400 text-lg">해당 카테고리에 등록된 사진이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && filteredPhotos.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm transition-opacity"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
          >
            <X size={36} />
          </button>

          {/* Prev Button */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110] p-2"
            onClick={showPrev}
          >
            <ChevronLeft size={48} />
          </button>

          {/* Current Image */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center">
            <img 
              src={filteredPhotos[currentIndex].url} 
              alt={filteredPhotos[currentIndex].title}
              className="max-w-full max-h-[80vh] object-contain antialiased [image-rendering:-webkit-optimize-contrast] shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫히지 않음
            />
            {/* Info bar below image */}
            <div className="absolute -bottom-12 left-0 w-full text-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white text-lg font-medium">{filteredPhotos[currentIndex].title}</h3>
              <p className="text-[#d4af37] text-sm mt-1">{filteredPhotos[currentIndex].category}</p>
            </div>
          </div>

          {/* Next Button */}
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-[110] p-2"
            onClick={showNext}
          >
            <ChevronRight size={48} />
          </button>
          
          {/* Counter */}
          <div className="absolute top-6 left-6 text-white/50 font-mono text-sm tracking-widest z-[110]">
            {currentIndex + 1} / {filteredPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
}
