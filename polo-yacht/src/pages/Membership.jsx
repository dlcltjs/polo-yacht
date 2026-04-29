export default function Membership() {
  const tiers = [
    {
      name: "Business",
      price: "1,000,000",
      description: "비즈니스 모임과 소규모 파티를 위한 스탠다드 멤버십",
      features: [
        "연 3회 요트 우선 예약권",
        "비즈니스 라운지 이용 (월 1회)",
        "웰컴 드링크 제공",
        "제휴 리조트 10% 할인"
      ],
      color: "bg-slate-700",
      accent: "text-rivanavy-900 font-medium/80"
    },
    {
      name: "Premier",
      price: "3,000,000",
      description: "프라이빗 항해에 최적화된 고급 멤버십",
      features: [
        "연 8회 요트 우선 예약권",
        "프리미엄 라운지 상시 이용",
        "와인 패키지 1세트 무료",
        "동반 3인 선상 케이터링 코스",
        "제휴 리조트 30% 할인"
      ],
      color: "bg-gold-500",
      accent: "text-rivanavy-900 font-bold",
      popular: true
    },
    {
      name: "VIP",
      price: "10,000,000",
      description: "최고의 대우, 무제한 혜택을 누리는 VVIP 전용 멤버십",
      features: [
        "요트 상시 우선 예약권",
        "VIP 전용 라운지 동반 상시 이용",
        "시그니처 디너 파티 연 2회 기획",
        "제휴 리조트/호텔 무상 바우처 지급",
        "전용 리무진 픽업/샌딩 서비스"
      ],
      color: "bg-white border border-slate-100 shadow-sm rounded-xl",
      accent: "text-rivanavy-900 font-medium"
    }
  ];

  return (
    <div className="w-full bg-slate-50 pb-24">
      <div 
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 pt-24"
        style={{
          backgroundImage: "url('https://loremflickr.com/1920/400/champagne,sunset?lock=10')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#00122e] opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-6 tracking-wider uppercase text-white">Membership</h1>
          <p className="text-white max-w-2xl mx-auto text-xl">오직 당신만을 위한 항해, 폴로요트 클럽의 주인공이 되십시오.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-4 inline-block pb-2 border-b-2 border-gold-500">
            등급별 멤버십 안내
          </h2>
          <p className="text-slate-600 mt-4 text-lg">고객님의 라이프스타일에 맞춘 다양한 멤버십 제도를 운영합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative bg-white shadow-sm border border-slate-100 rounded-xl border flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 ${tier.popular ? 'border-gold-500 shadow-2xl scale-100 md:scale-105 z-10' : 'border-slate-200 shadow-lg'}`}>
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-navy-950 font-bold px-6 py-1.5 text-sm tracking-widest uppercase shadow-md shadow-slate-200/50 whitespace-nowrap">
                  BEST CHOICE
                </div>
              )}
              
              <div className={`${tier.color} text-rivanavy-900 font-medium p-8 text-center`}>
                <h3 className="text-2xl font-bold tracking-wider mb-2 uppercase">{tier.name}</h3>
                <p className="text-rivanavy-900 font-medium/80 text-sm min-h-[40px] leading-relaxed flex items-center justify-center">{tier.description}</p>
                <div className="mt-6 border-t border-slate-300 pt-6">
                  <span className="text-3xl font-extrabold tracking-tight">₩ {tier.price}</span>
                  <span className="text-rivanavy-900 font-medium/70 text-sm ml-1">/ 년</span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className={`w-5 h-5 ${tier.accent} mr-3 flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-rivanavy-900 font-medium/80 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#application-form" className={`block w-full py-4 text-center font-bold tracking-wider transition-all duration-300 border-2 ${tier.popular ? 'bg-gold-500 border-gold-500 text-navy-950 hover:bg-transparent hover:text-rivanavy-900 font-bold' : 'bg-transparent border-navy-900 text-rivanavy-900 font-medium hover:bg-white border border-slate-100 shadow-sm rounded-xl hover:text-rivanavy-900 font-medium'}`}>
                  가입 상담 신청
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Member Application Form */}
        <div id="application-form" className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 md:p-12 shadow-xl border-t-8 border-navy-900 max-w-4xl mx-auto scroll-mt-32">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-4">프리미엄 멤버십 가입 신청</h2>
            <p className="text-slate-500 text-lg">아래 양식을 작성해 주시면, 전담 매니저가 친절하게 안내해 드립니다.</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">이름 (소속/직함)</label>
                <input type="text" className="w-full border border-slate-300 p-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors bg-slate-50" placeholder="홍길동 (주식회사 OOO 대표)" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">연락처</label>
                <input type="tel" className="w-full border border-slate-300 p-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors bg-slate-50" placeholder="010-0000-0000" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">이메일</label>
                <input type="email" className="w-full border border-slate-300 p-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors bg-slate-50" placeholder="example@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">희망 멤버십 등급</label>
                <select className="w-full border border-slate-300 p-3 bg-slate-50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors">
                  <option value="business">Business (1,000,000원/년)</option>
                  <option value="premier">Premier (3,000,000원/년)</option>
                  <option value="vip">VIP (10,000,000원/년)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-2">기타 문의사항 및 양식</label>
              <textarea rows={4} className="w-full border border-slate-300 p-3 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors bg-slate-50" placeholder="원하시는 서비스나 요청사항을 자유롭게 작성해 주세요."></textarea>
            </div>
            
            <div className="flex items-center pt-2">
              <input type="checkbox" id="privacy" className="h-5 w-5 text-rivanavy-900 font-bold focus:ring-gold-500 border-gray-300 rounded cursor-pointer" required />
              <label htmlFor="privacy" className="ml-3 block text-sm font-medium text-rivanavy-900 font-medium/80 cursor-pointer">
                개인정보 수집 및 이용에 동의합니다. <span className="text-red-500">*</span>
              </label>
            </div>
            
            <div className="pt-8 border-t border-slate-200">
              <button type="submit" className="w-full bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium font-bold py-5 hover:bg-gold-500 hover:text-navy-950 transition-colors shadow-lg hover:shadow-gold-500/30 tracking-wider text-lg">
                가입 문의 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
