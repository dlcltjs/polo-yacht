import { Play } from 'lucide-react';

export default function Media() {
  const galleryPhotos = [
    { title: "프리미엄 요트 전경", type: "photo" },
    { title: "선상 선셋 라운지", type: "photo" },
    { title: "바라기낙화 투어", type: "photo" },
    { title: "펫로얄 반려동물 동반", type: "photo" },
    { title: "VIP 실내 인테리어", type: "photo" },
    { title: "야간 시티뷰 코스", type: "photo" }
  ];

  const videos = [
    { title: "폴로요트 공식 프로모션 필름", duration: "1:45" },
    { title: "선상 낙화놀이 하이라이트", duration: "3:12" }
  ];

  return (
    <div className="w-full bg-slate-50 pb-24">
      <div 
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 pt-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#00122e] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-wider uppercase text-white">Media Center</h1>
          <p className="text-white max-w-2xl mx-auto text-xl">폴로요트의 아름다운 순간들과 최신 소식</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Video Gallery Section */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-8 border-b-2 border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium">Brand Videos</h2>
            <button className="text-rivanavy-900 font-bold font-bold hover:text-rivanavy-900 font-medium transition-colors text-sm uppercase tracking-wider">더보기 +</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="w-full h-64 md:h-80 bg-white shadow-sm border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center shadow-lg border border-slate-700">
                  <div className="absolute inset-0 bg-white border border-slate-100 shadow-sm rounded-xl/40 group-hover:bg-white border border-slate-100 shadow-sm rounded-xl/10 transition-colors z-10 duration-500"></div>
                  <div className="w-16 h-16 rounded-full bg-gold-500/90 text-navy-950 flex items-center justify-center z-20 transform group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-gold-500/30">
                    <Play size={28} className="translate-x-0.5" />
                  </div>
                  <span className="absolute bottom-4 right-4 bg-navy-950/80 text-rivanavy-900 font-medium px-3 py-1 text-xs font-mono z-20 font-medium">
                    {video.duration}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 text-rivanavy-900 font-medium font-bold tracking-widest uppercase">
                    Video Thumbnail Play
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-rivanavy-900 font-medium group-hover:text-rivanavy-900 font-bold transition-colors">{video.title}</h3>
                  <p className="text-slate-500 text-sm mt-2">폴로요트 공식 채널 • 조회수 1.2만회</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-8 border-b-2 border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium">Photo Gallery</h2>
            <button className="text-rivanavy-900 font-bold font-bold hover:text-rivanavy-900 font-medium transition-colors text-sm uppercase tracking-wider">전체 사진 +</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden bg-slate-200 aspect-[4/3] border border-slate-200 shadow-md shadow-slate-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-white border border-slate-100 shadow-sm rounded-xl/0 group-hover:bg-white border border-slate-100 shadow-sm rounded-xl/80 transition-colors duration-500 z-10"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 translate-y-8 group-hover:translate-y-0">
                  <h3 className="text-rivanavy-900 font-medium font-bold text-xl px-4 text-center">{photo.title}</h3>
                  <span className="w-12 h-1 bg-gold-500 mt-4 shadow-md shadow-slate-200/50"></span>
                </div>
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-medium group-hover:scale-110 transition-transform duration-700 bg-slate-100 text-lg shadow-inner">
                  Photo <br/> [{photo.title}]
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events Board */}
        <section>
          <div className="flex items-end justify-between mb-8 border-b-2 border-slate-200 pb-4">
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium">Notice & Events</h2>
            <button className="text-rivanavy-900 font-bold font-bold hover:text-rivanavy-900 font-medium transition-colors text-sm uppercase tracking-wider">게시판 이동 +</button>
          </div>
          
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl border-t-4 border-navy-900 shadow-md shadow-slate-200/50">
            <div className="flex flex-col sm:flex-row border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer p-5 md:p-6 items-start sm:items-center group">
              <span className="bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 mb-3 sm:mb-0 sm:mr-6 whitespace-nowrap uppercase tracking-wider">EVENT</span>
              <p className="flex-grow font-bold text-rivanavy-900 font-medium/90 text-lg group-hover:text-rivanavy-900 font-bold transition-colors">2026 폴로요트 VIP 감사 초청 파티 (진행중)</p>
              <span className="text-slate-500 text-sm mt-3 sm:mt-0 whitespace-nowrap sm:ml-6 font-mono font-medium">2026. 03. 21</span>
            </div>
            <div className="flex flex-col sm:flex-row border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer p-5 md:p-6 items-start sm:items-center group">
              <span className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium text-xs font-bold px-3 py-1 mb-3 sm:mb-0 sm:mr-6 whitespace-nowrap uppercase tracking-wider">공지</span>
              <p className="flex-grow font-medium text-rivanavy-900 font-medium/80 group-hover:text-rivanavy-900 font-bold transition-colors text-lg">여름 크루즈 성수기 우선 예약 시스템 오픈 안내</p>
              <span className="text-slate-500 text-sm mt-3 sm:mt-0 whitespace-nowrap sm:ml-6 font-mono font-medium">2026. 03. 15</span>
            </div>
            <div className="flex flex-col sm:flex-row hover:bg-slate-50 transition-colors cursor-pointer p-5 md:p-6 items-start sm:items-center group">
              <span className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium text-xs font-bold px-3 py-1 mb-3 sm:mb-0 sm:mr-6 whitespace-nowrap uppercase tracking-wider">공지</span>
              <p className="flex-grow font-medium text-rivanavy-900 font-medium/80 group-hover:text-rivanavy-900 font-bold transition-colors text-lg">바라기낙화 투어 동계/하계 계절별 항로 및 출항 시간 변경</p>
              <span className="text-slate-500 text-sm mt-3 sm:mt-0 whitespace-nowrap sm:ml-6 font-mono font-medium">2026. 03. 02</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
