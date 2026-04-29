import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const sections = [
  {
    id: 1,
    topic: "PRESTIGE YACHTING",
    title: "끝없는 수평선,\n그 이상의 자유",
    desc: "바다 위의 새로운 시그니처, 폴로요트에서 당신만의 항해를 시작하십시오.",
    img: "https://images.unsplash.com/photo-1581271164789-7c97932822d3?q=100&w=2500&auto=format&fit=crop",
    bgColor: "bg-rivanavy-900",
    textColor: "text-white",
    align: "left",
    bgPos: "bg-left",
    btnText: "요트예약",
    btnLink: "/reservation/yacht",
  },
  {
    id: 2,
    topic: "OCEAN TOUR",
    title: "자연이 빚어낸 예술,\n펜타마린의 비경",
    desc: "눈부신 태양과 푸른 파도가 어우러진 해안선을 따라 잊지 못할 풍경을 선사합니다.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=100&w=2500&auto=format&fit=crop",
    bgColor: "bg-slate-100",
    textColor: "text-rivanavy-900",
    align: "right",
    bgPos: "bg-[position:80%_center]",
    btnText: "관광예약",
    btnLink: "/reservation/tour",
  },
  {
    id: 3,
    topic: "WITH YOUR PET",
    title: "반려견과 함께하는 완벽한 휴식,\n펫로얄",
    desc: "소중한 가족인 반려견과 함께 요트 위에서 누리는 프리미엄 라이프스타일.",
    img: "/pet_yacht.png",
    bgColor: "bg-rivanavy-900",
    textColor: "text-white",
    align: "left",
    bgPos: "bg-center",
    btnText: "펫예약",
    btnLink: "/reservation/pet",
  },
  {
    id: 4,
    topic: "NIGHT FIREWORKS",
    title: "밤바다를 수놓는 황홀한 불꽃,\n바라기낙화",
    desc: "어둠이 내린 바다 위, 오직 당신만을 위해 준비된 찬란하고 로맨틱한 순간.",
    img: "/night_fireworks2.png",
    bgColor: "bg-slate-100",
    textColor: "text-rivanavy-900",
    align: "right",
    bgPos: "bg-center",
    btnText: "낙화예약",
    btnLink: "/reservation/fireworks",
  },
  {
    id: 5,
    topic: "PRIVATE STAY",
    title: "파도 소리가 자장가가 되는\n프라이빗 스테이",
    desc: "요트의 낭만과 최고급 호텔의 안락함을 동시에 경험하는 특별한 하룻밤.",
    img: "/private_stay.jpeg",
    bgColor: "bg-rivanavy-900",
    textColor: "text-white",
    align: "left",
    bgPos: "bg-center",
    btnText: "숙박예약",
    btnLink: "/reservation/stay",
  }
];

export default function Home() {
  const observerRefs = useRef([]);

  useEffect(() => {
    // 페이드인 애니메이션을 위한 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.25 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="w-full relative bg-rivanavy-900 font-sans overflow-x-hidden">
      {/* 1. Unified Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Full Viewport Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=100&w=2500&auto=format&fit=crop" 
            alt="Main Hero" 
            className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
          />
        </div>
        {/* Lighter Overlay for readability */}
        <div className="absolute inset-0 bg-rivanavy-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-rivanavy-900 via-transparent to-transparent"></div>
        
        {/* Animated Rings */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] border-[0.5px] border-white/30 rounded-full border-dashed animate-spin-slow pointer-events-none hidden md:block"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[1200px] h-[1200px] border-[0.5px] border-white/20 rounded-full border-dashed animate-reverse-spin pointer-events-none hidden md:block"></div>
        
        {/* Text Content Container with Padding */}
        <div className="relative z-10 text-center px-4 w-full mt-32 md:mt-40 flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-white/60"></span>
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase font-wide text-white drop-shadow-md">WHERE Soul STAYS</p>
            <span className="w-12 h-[1px] bg-white/60"></span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-wide leading-[1.1] text-white tracking-tighter opacity-90 drop-shadow-lg">
            SAIL THE<br/>FUTURE
          </h1>
        </div>
      </section>

      {sections.map((sec, idx) => (
        <section 
          key={sec.id} 
          className={`relative flex flex-col md:flex-row w-full h-screen ${sec.align === 'right' ? 'md:flex-row-reverse' : ''}`}
        >
          {/* 전체 화면 배경 이미지 (투명도 효과를 위해 전체에 깔림) */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={sec.img}
              alt={sec.title}
              className={`absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2000ms] ease-out antialiased [image-rendering:-webkit-optimize-contrast] ${sec.bgPos ? sec.bgPos.replace('bg-', 'object-') : 'object-center'}`}
            />
          </div>

          {/* 텍스트 영역 (투명도 및 글래스모피즘 효과 적용) */}
          <div className={`relative z-10 w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-16 lg:p-24 overflow-hidden backdrop-blur-md ${sec.bgColor === 'bg-rivanavy-900' ? 'bg-[#00122e]/80' : 'bg-slate-100/85'}`}>
            <div 
              ref={(el) => (observerRefs.current[idx] = el)}
              className="max-w-xl opacity-0 translate-y-12 transition-all duration-[1200ms] ease-out flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className={`w-8 md:w-12 h-[1px] ${sec.bgColor === 'bg-rivanavy-900' ? 'bg-white/60' : 'bg-[#00122e]/40'}`}></span>
                <p className={`text-[10px] md:text-xs uppercase tracking-[0.4em] font-light ${sec.textColor} opacity-80`}>
                  {sec.topic}
                </p>
              </div>
              
              <h2 className={`text-3xl md:text-5xl lg:text-[40px] xl:text-[48px] font-bold mb-6 md:mb-8 leading-[1.4] break-keep whitespace-pre-line ${sec.textColor}`}>
                {sec.title}
              </h2>
              
              <p className={`text-sm md:text-base lg:text-lg opacity-90 font-light leading-relaxed break-keep ${sec.textColor}`}>
                {sec.desc}
              </p>
              
              {sec.btnText && (
                <div className="mt-8 md:mt-10">
                  <Link 
                    to={sec.btnLink} 
                    className={`inline-flex items-center justify-center px-10 py-3.5 border ${sec.bgColor === 'bg-rivanavy-900' ? 'border-white text-white hover:bg-white hover:text-[#00122e]' : 'border-[#00122e] text-[#00122e] hover:bg-[#00122e] hover:text-white'} text-sm font-extrabold tracking-widest transition-all duration-300`}
                  >
                    {sec.btnText}
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* 이미지만 온전히 보이는 투명한 반쪽 영역 */}
          <div className="relative z-10 w-full md:w-1/2 h-1/2 md:h-full pointer-events-none"></div>
        </section>
      ))}
    </div>
  );
}
