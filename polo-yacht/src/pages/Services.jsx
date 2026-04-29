import { Anchor, Search, Compass } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: "polo",
      title: "폴로요트 (Polo Yacht)",
      subtitle: "최고급 럭셔리 요트 투어의 정수",
      description: "폴로요트는 최고 수준의 시설과 서비스를 자랑하는 프리미엄 요트입니다. 선상 파티, 프로포즈, 비즈니스 모임 등 특별한 날을 더욱 빛나게 만들어 드립니다. 전문 스키퍼와 크루가 안전하고 프라이빗한 항해를 약속합니다.",
      features: ["VIP 라운지", "바비큐 그릴", "프리미엄 오디오 시스템", "스노클링 장비"],
      icon: <Anchor size={48} className="text-rivanavy-900 font-bold mb-6" />
    },
    {
      id: "pet",
      title: "펫로얄 (Pet Royal)",
      subtitle: "사랑하는 반려동물과 함께하는 특별한 항해",
      description: "반려동물(강아지, 고양이 등)과 함께 바다를 누빌 수 있는 국내 최초의 펫 프렌들리 요트 투어입니다. 안전 펜스와 미끄럼 방지 패드, 전용 구명조끼가 구비되어 있어 보호자와 반려동물 모두 안심하고 즐길 수 있습니다.",
      features: ["펫 전용 구명조끼", "안전 펜스", "미끄럼 방지 데크", "펫 간식 및 식수대"],
      icon: <Compass size={48} className="text-rivanavy-900 font-medium mb-6" />
    },
    {
      id: "baragi",
      title: "바라기낙화 (Baragi Nakhwa)",
      subtitle: "이색적이고 아름다운 바다 위 감성 체험",
      description: "밤바다를 수놓는 낙화놀이 감상 코스입니다. 선상에서 즐기는 불꽃의 향연은 잊지 못할 로맨틱한 추억을 선사합니다. 와인 한 잔과 함께 아름다운 야경을 감상하며 하루의 피로를 날려보세요.",
      features: ["선상 낙화놀이 관람", "와인 세트 제공", "전문 포토그래퍼 동승", "야간 특화 항로"],
      icon: <Search size={48} className="text-rivanavy-900 font-bold mb-6" />
    }
  ];

  return (
    <div className="w-full bg-slate-50 pb-24">
      <div 
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 pt-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#00122e] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-wider uppercase text-white">Services</h1>
          <p className="text-white max-w-2xl mx-auto text-xl">폴로요트에서만 경험할 수 있는 특별한 서비스들</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 h-[400px] bg-slate-200 relative group overflow-hidden border border-slate-100 shadow-xl">
                <div className="absolute inset-0 bg-white border border-slate-100 shadow-sm rounded-xl/10 group-hover:bg-white border border-slate-100 shadow-sm rounded-xl/0 transition-colors duration-500 z-10"></div>
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 transform group-hover:scale-105 transition-transform duration-700">
                  {service.icon}
                  <span className="text-xl font-medium tracking-wide">[{service.title} 이미지 영역]</span>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 lg:px-8">
                <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-4">{service.title}</h2>
                <h3 className="text-xl text-rivanavy-900 font-bold font-medium mb-6 relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold-500">{service.subtitle}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 text-lg">{service.description}</p>
                
                <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 shadow-md shadow-slate-200/50 border border-slate-100">
                  <h4 className="font-bold text-rivanavy-900 font-medium mb-4 tracking-wide uppercase text-sm">주요 서비스 및 시설</h4>
                  <ul className="grid grid-cols-2 gap-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-rivanavy-900 font-medium/80 text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-10">
                  <button className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium px-8 py-4 font-bold tracking-wide hover:bg-gold-500 hover:text-navy-950 transition-colors shadow-md shadow-slate-200/50 w-full sm:w-auto">
                    상세 예약 안내
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
