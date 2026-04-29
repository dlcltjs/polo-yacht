export default function About() {
  return (
    <div className="w-full bg-slate-50 pb-20">
      {/* Page Header */}
      <div 
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 pt-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#00122e] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-wider uppercase text-white">Brand Story</h1>
          <p className="text-white max-w-2xl mx-auto text-xl">바다 위의 새로운 시그니처, 폴로요트를 소개합니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-32 mt-8">
        {/* Greetings */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-10 inline-block pb-2 relative after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-gold-500 after:bottom-0 after:left-1/4">
            대표 인사말
          </h2>
          <div className="bg-white p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-2xl relative">
            <span className="text-6xl text-slate-200 absolute top-4 left-6 font-serif">"</span>
            <p className="text-lg text-rivanavy-900 leading-relaxed mb-6 relative z-10">
              안녕하십니까, 폴로요트 대표이사 <strong className="text-rivanavy-900 font-bold">이태현</strong>입니다.
            </p>
            <p className="text-lg text-rivanavy-900 font-medium/80 leading-relaxed mb-6 relative z-10">
              폴로요트는 단순한 해양 레저를 넘어, '프라이빗하고 럭셔리한 휴양'이라는 철학 아래 탄생했습니다.<br className="hidden md:block" />
              저희는 최고의 퀄리티를 자랑하는 요트와 맞춤형 서비스를 통해 고객 여러분께 잊지 못할 바다 위의 로맨스와 감동을 선사하고자 합니다.
            </p>
            <p className="text-lg text-rivanavy-900 font-medium/80 leading-relaxed relative z-10">
              늘 안전을 최우선으로 생각하며, 고객의 성원에 퀄리티로 보답하기 위해 언제나 최선의 노력을 다하겠습니다.<br />
              감사합니다.
            </p>
            <span className="text-6xl text-slate-200 absolute bottom-0 right-6 font-serif rotate-180">"</span>
          </div>
        </section>

        {/* Business Areas & CI */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <div className="bg-white p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-y border-r border-slate-100 rounded-2xl border-l-4 border-l-rivanavy-900 h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-rivanavy-900 mb-8">사업 분야</h2>
            <ul className="space-y-6 text-slate-700 text-lg">
              <li className="flex items-start">
                <div className="bg-gold-500/10 p-2 rounded-full mr-4">
                  <span className="text-rivanavy-900 font-bold block w-4 h-4 rounded-full bg-gold-500"></span>
                </div>
                <span>프리미엄 요트 임대 및 투어 서비스 기획</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gold-500/10 p-2 rounded-full mr-4">
                  <span className="text-rivanavy-900 font-bold block w-4 h-4 rounded-full bg-gold-500"></span>
                </div>
                <span>기업 행사, 워크샵 및 프라이빗 선상 파티 운영</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gold-500/10 p-2 rounded-full mr-4">
                  <span className="text-rivanavy-900 font-bold block w-4 h-4 rounded-full bg-gold-500"></span>
                </div>
                <span>반려동물 동반 특화 해양 펫 투어 플랫폼 구축</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gold-500/10 p-2 rounded-full mr-4">
                  <span className="text-rivanavy-900 font-bold block w-4 h-4 rounded-full bg-gold-500"></span>
                </div>
                <span>전문 강사진을 통한 맞춤형 해양 레저 교육</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-slate-100 shadow-lg rounded-2xl p-10 lg:p-12 shadow-md shadow-slate-200/50 text-rivanavy-900 font-medium flex flex-col justify-center items-center h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl font-bold text-gold-400 mb-6 relative z-10">협력 파트너스</h2>
            <p className="text-slate-600 text-center mb-10 text-lg relative z-10">
              폴로요트는 국내외 유수의 기관 및 브랜드들과 협력하여<br/>최상의 선상 라이프스타일을 제안합니다.
            </p>
            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 text-center border border-slate-200 hover:border-gold-500 transition-colors cursor-default font-medium">대한요트협회</div>
              <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 text-center border border-slate-200 hover:border-gold-500 transition-colors cursor-default font-medium">국제마리나네트워크</div>
              <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 text-center border border-slate-200 hover:border-gold-500 transition-colors cursor-default font-medium">프리미엄 펫케어</div>
              <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 text-center border border-slate-200 hover:border-gold-500 transition-colors cursor-default font-medium">글로벌 요트 제휴사</div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 md:p-12 shadow-md shadow-slate-200/50 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-4 inline-block pb-2 border-b-2 border-gold-500">본사 / 사업소 위치</h2>
            <p className="text-slate-500 mt-2 text-lg">폴로요트를 찾아오시는 길을 안내해 드립니다.</p>
          </div>
          
          <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden rounded-lg shadow-inner bg-slate-200">
            {/* 구글맵 플레이스홀더 */}
            <div className="absolute inset-0 bg-slate-300 flex flex-col items-center justify-center border-4 border border-dashed border-slate-400">
              <span className="text-slate-500 font-bold text-2xl mb-2">Google Map Area</span>
              <span className="text-slate-500">실제 운영 시 구글맵 Iframe 또는 API가 삽입되는 영역입니다.</span>
            </div>
            
            <div className="z-10 bg-white/95 shadow-sm rounded-xl p-8 shadow-2xl backdrop-blur-sm relative left-0 md:left-8 lg:left-12 max-w-sm ml-4 mr-auto animate-fade-in-up border-t-4 border-gold-500">
              <h3 className="font-bold text-rivanavy-900 font-medium text-xl mb-4">폴로요트 본사</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-rivanavy-900 font-bold uppercase mb-1">Address</p>
                  <p className="text-rivanavy-900 font-medium/80 font-medium leading-relaxed">대구광역시 수성구 들안로 299-1<br/>(2층 폴로요트)</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-rivanavy-900 font-bold uppercase mb-1">Contact</p>
                  <p className="text-rivanavy-900 font-medium/80">053-955-0337<br/>010-4578-0337</p>
                </div>
              </div>
              
              <button className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium font-medium px-4 py-3 text-sm hover:bg-gold-500 hover:text-navy-950 transition-colors w-full tracking-wide">
                카카오맵으로 길찾기
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
