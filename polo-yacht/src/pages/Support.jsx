export default function Support() {
  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      <div 
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 pt-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#00122e] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-wider uppercase text-white">Customer Support</h1>
          <p className="text-white max-w-2xl mx-auto text-xl">무엇을 도와드릴까요? 편하게 문의해주시면 친절하게 안내해 드리겠습니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Inquiry Form */}
          <div>
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-8 border-l-4 border-gold-500 pl-4">1:1 온라인 문의</h2>
            <form className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 md:p-10 shadow-lg border-2 border-slate-100 space-y-6">
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">성함 / 연락처</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" className="w-full border border-slate-300 p-3 focus:outline-none focus:border-gold-500 hover:border-navy-900 transition-colors bg-slate-50" placeholder="홍길동" required />
                  <input type="tel" className="w-full border border-slate-300 p-3 focus:outline-none focus:border-gold-500 hover:border-navy-900 transition-colors bg-slate-50" placeholder="010-0000-0000" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">문의 유형</label>
                <select className="w-full border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:border-gold-500 hover:border-navy-900 transition-colors">
                  <option value="reservation">예약 및 취소 관련 문의</option>
                  <option value="event">단체/기업 행사 대관 문의</option>
                  <option value="pet">펫로얄 동반 탑승 규정 문의</option>
                  <option value="other">기타 안내사항 문의</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">문의 내용</label>
                <textarea rows={7} className="w-full border border-slate-300 p-4 focus:outline-none focus:border-gold-500 hover:border-navy-900 transition-colors bg-slate-50 resize-none text-rivanavy-900 font-medium/80" placeholder="상세한 문의 내용을 남겨주시면 담당 부서 검토 후 빠르고 정확하게 안내해 드리겠습니다."></textarea>
              </div>
              
              <div className="flex items-start pt-2">
                <input type="checkbox" id="support-privacy" className="mt-1 h-5 w-5 text-rivanavy-900 font-bold focus:ring-gold-500 border-gray-300 rounded cursor-pointer" required />
                <label htmlFor="support-privacy" className="ml-3 block text-sm font-medium text-slate-600 cursor-pointer text-justify">
                  개인정보 수집 및 이용에 동의합니다. (수집된 정보는 1:1 상담 안내 목적 이외에 절대 사용되지 않습니다.)
                </label>
              </div>
              
              <button type="submit" className="w-full bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium font-bold py-5 hover:bg-gold-500 hover:text-navy-950 transition-colors tracking-widest mt-6 shadow-md shadow-slate-200/50 border border-navy-900 hover:border-gold-500">
                문의 바로 접수하기
              </button>
            </form>
          </div>

          {/* Contact / Bank Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-8 border-l-4 border-gold-500 pl-4">고객 센터 안내</h2>
              <div className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium p-10 md:p-12 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-shadow border border-navy-800">
                <div className="absolute right-0 bottom-0 opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                  <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16.052V18.1569C21.0028 18.5135 20.9238 18.8655 20.7686 19.1894C20.6133 19.5133 20.3855 19.8018 20.1006 20.0354C19.8157 20.269 19.48 20.4426 19.1158 20.5451C18.7516 20.6477 18.3666 20.677 17.994 20.631C13.8828 20.0762 10.0384 18.3468 6.91 15.652C4.0152 13.1957 1.94218 9.94056 1.00001 6.22097C0.954378 5.85044 0.983754 5.46782 1.08587 5.10599C1.18799 4.74416 1.35999 4.411 1.59128 4.12788C1.82257 3.84476 2.10817 3.61803 2.43003 3.46244C2.75189 3.30685 3.1029 3.22579 3.46 3.22497H5.56C6.18568 3.22055 6.79255 3.43577 7.27092 3.83296C7.74929 4.23015 8.06733 4.78284 8.16999 5.40498C8.28822 6.16246 8.47167 6.90807 8.71701 7.63397C8.81446 7.92055 8.83151 8.22502 8.76616 8.51978C8.70081 8.81454 8.55507 9.09038 8.35 9.32297L7.08 10.758C8.42398 13.4143 10.5857 15.576 13.242 16.92L14.677 15.65C14.9096 15.4449 15.1854 15.2992 15.4802 15.2338C15.775 15.1685 16.0794 15.1855 16.366 15.283C17.0919 15.5283 17.8375 15.7118 18.595 15.83C19.2238 15.9348 19.7821 16.2588 20.1802 16.745C20.5784 17.2312 20.7891 17.8465 20.78 18.477V16.052H21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="relative z-10">
                  <p className="text-xl font-bold text-gold-400 mb-2">통합 서비스 문의</p>
                  <p className="text-4xl md:text-5xl font-light mb-8 font-mono tracking-tighter">053-955-0337</p>
                  
                  <p className="text-xl font-bold text-gold-400 mb-2">프리미엄 예약 직통망</p>
                  <p className="text-4xl md:text-5xl font-light mb-8 font-mono tracking-tighter">010-4578-0337</p>
                  
                  <div className="border-t border-slate-200/50 pt-6 mt-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-bold text-rivanavy-900 font-medium uppercase inline-block w-20">운영시간</span> 평일 10:00 - 18:00 (주말 휴무)<br/>
                      <span className="font-bold text-rivanavy-900 font-medium uppercase inline-block w-20 mt-2">이메일</span> <a href="mailto:dgsf007@naver.com" className="hover:text-gold-400 border-b border-transparent hover:border-gold-400 transition-colors">dgsf007@naver.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-8 border-l-4 border-gold-500 pl-4">이용 대금 결제 계좌</h2>
              <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 md:p-10 shadow-lg border-2 border-slate-100 flex flex-col items-center text-center group hover:border-gold-500 transition-colors">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-200 group-hover:bg-gold-50 group-hover:border-gold-200 transition-colors shadow-inner">
                  <span className="text-2xl text-rivanavy-900 font-bold font-serif font-bold">₩</span>
                </div>
                <h3 className="text-xl font-bold text-rivanavy-900 font-medium mb-2 tracking-wider">예금주: 폴로요트</h3>
                <p className="text-3xl text-rivanavy-900 font-bold font-bold mb-4">대구은행 <span className="text-rivanavy-900 font-medium font-mono tracking-tighter ml-1">504-10-800000-0</span></p>
                <div className="w-12 h-1 bg-slate-200 my-4"></div>
                <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
                  인터넷 예약 완료 후 24시간 내에 입금해주시면 요트 사용 확정이 처리됩니다. 동일한 입금자명으로 이체 부탁드립니다.
                </p>
                <button className="mt-8 px-8 py-3 bg-slate-100 border border-slate-300 text-slate-600 font-bold text-sm tracking-widest hover:bg-white border border-slate-100 shadow-sm rounded-xl hover:text-rivanavy-900 font-medium hover:border-navy-900 transition-colors shadow-md shadow-slate-200/50">
                  계좌번호 복사하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
