import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';

const dummyVideos = [
  {
    id: 1,
    url: 'https://www.youtube.com/watch?v=bTqVqk7FSmY',
    category: '공식홍보',
    title: '폴로요트와 함께하는 럭셔리 선셋 투어'
  },
  {
    id: 2,
    url: 'https://www.youtube.com/watch?v=O1m_1wG2Kjc',
    category: '체험후기',
    title: '고객님들의 생생한 요트 체험 브이로그'
  },
  {
    id: 3,
    url: 'https://www.youtube.com/watch?v=7uIfBWvqBeI',
    category: '이벤트',
    title: '바다 위에서 펼쳐지는 프라이빗 샴페인 파티'
  },
  {
    id: 4,
    url: 'https://www.youtube.com/watch?v=AWKzr6n0ea0',
    category: '공식홍보',
    title: '프리미엄 카타마란 요트 내외부 전경'
  },
  {
    id: 5,
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    category: '체험후기',
    title: '에메랄드빛 바다, 잊지 못할 힐링 모먼트'
  },
  {
    id: 6,
    url: 'https://www.youtube.com/watch?v=fEErySYqItI',
    category: '이벤트',
    title: 'VIP 맞춤형 선상 프로포즈 대관'
  }
];

const categories = ['전체', '공식홍보', '체험후기', '이벤트'];

// 유튜브 URL에서 Video ID 추출하는 헬퍼 함수
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('전체');
  
  // 모달 상태
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    try {
      const storedVideos = localStorage.getItem('polo_videos');
      if (!storedVideos) {
        localStorage.setItem('polo_videos', JSON.stringify(dummyVideos));
        setVideos(dummyVideos);
      } else {
        const parsedVideos = JSON.parse(storedVideos);
        // 더미 데이터를 6개로 업데이트 했으므로, 기존 3개짜리 초기 데이터를 덮어쓰기 위해 강제 업데이트 로직 추가
        if (parsedVideos.length <= 3 && parsedVideos.some(v => v.title.includes('폴로요트'))) {
          localStorage.setItem('polo_videos', JSON.stringify(dummyVideos));
          setVideos(dummyVideos);
        } else {
          setVideos(parsedVideos);
        }
      }
    } catch (error) {
      console.error("Failed to parse polo_videos from local storage", error);
      localStorage.setItem('polo_videos', JSON.stringify(dummyVideos));
      setVideos(dummyVideos);
    }
  }, []);

  const filteredVideos = activeCategory === '전체' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const openVideo = (video) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Background Banner */}
      <div className="relative w-full h-[350px] md:h-[400px] mt-[100px] md:mt-[110px] overflow-hidden flex flex-col items-center justify-center">
        <img 
          src="/catamaran_bg.png" 
          alt="Video Banner" 
          className="absolute inset-0 w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast] z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Page Title inside Banner */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Polo Theater</h1>
          <p className="text-white font-medium tracking-widest text-sm md:text-base uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">영상으로 만나는 폴로요트의 생생한 감동</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        
        {/* Category Filters (Gallery.jsx 스타일과 100% 동일하게) */}
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

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {filteredVideos.map((video) => {
              const videoId = getYouTubeVideoId(video.url);
              // 고화질 썸네일 (maxresdefault), 없으면 hqdefault
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/catamaran_bg.png';
              
              return (
                <div 
                  key={video.id} 
                  className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] max-w-[420px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col shrink-0"
                  onClick={() => openVideo(video)}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img 
                      src={thumbnailUrl}
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                        <Play fill="currentColor" size={32} className="ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Info Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-2 block">{video.category}</span>
                    <h3 className="font-bold text-slate-800 text-lg leading-snug line-clamp-2 group-hover:text-rivanavy-900 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-lg">해당 카테고리에 등록된 영상이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Video Modal (Lightbox) */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-fade-in-up"
          onClick={closeVideo}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={closeVideo}
          >
            <X size={36} />
          </button>

          {/* Iframe Container */}
          <div 
            className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
          >
            {getYouTubeVideoId(activeVideo.url) ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(activeVideo.url)}?autoplay=1&rel=0`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                유효하지 않은 유튜브 URL입니다.
              </div>
            )}
          </div>
          
          {/* Video Title in Modal */}
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full text-center pointer-events-none px-4">
            <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">{activeVideo.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
