import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const initialNotices = [
  {
    id: 1,
    category: '공지',
    title: '폴로요트 2026년 하계 시즌 예약 오픈 안내',
    date: '2026.04.28',
    content: '안녕하세요. 폴로요트입니다.\n\n2026년 하계 시즌(7월~8월) 사전 예약이 5월 1일부터 시작됩니다.\n성수기 기간에는 빠른 예약 마감이 예상되오니, 홈페이지를 통해 미리 일정을 확인하시고 예약해 주시기 바랍니다.\n\n항상 저희 폴로요트를 사랑해 주셔서 감사합니다.',
  },
  {
    id: 2,
    category: '안내',
    title: '기상 악화 시 출항 기준 및 환불 규정 안내',
    date: '2026.04.15',
    content: '안녕하세요. 폴로요트입니다.\n\n고객님들의 안전한 항해를 위해 기상 악화(풍랑주의보, 태풍 등) 시 출항이 제한될 수 있습니다.\n기상 특보로 인한 출항 불가 시, 전액 100% 환불 처리 또는 일정 변경을 도와드리고 있습니다.\n\n자세한 환불 규정은 고객센터 또는 예약 상세 페이지를 참고해 주세요.',
  },
  {
    id: 3,
    category: '이벤트',
    title: '프리미엄 펫 투어 론칭 기념 샴페인 제공 이벤트',
    date: '2026.04.01',
    content: '새롭게 론칭한 "프리미엄 펫 투어"를 기념하여 특별한 이벤트를 진행합니다.\n\n4월 한 달간 펫 투어를 예약하시는 모든 고객님께 웰컴 샴페인(무알콜 옵션 선택 가능) 1병을 무료로 제공해 드립니다.\n사랑하는 반려견과 함께 요트 위에서 잊지 못할 추억을 만들어 보세요!',
  }
];

export default function Notice() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const storedNotices = localStorage.getItem('polo_notices');
    if (!storedNotices) {
      localStorage.setItem('polo_notices', JSON.stringify(initialNotices));
      setNotices(initialNotices);
    } else {
      setNotices(JSON.parse(storedNotices));
    }
  }, []);

  const handleToggle = (index) => {
    // 단일 열림 로직: 같은 인덱스면 닫고, 아니면 연다
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    notice.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] md:pt-[150px] pb-24 font-sans relative">
      {/* Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        <img 
          src="/catamaran_bg.png" 
          alt="Notice Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Page Title */}
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Notice</h1>
          <p className="text-white font-medium tracking-widest text-sm md:text-base uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">폴로요트의 새로운 소식을 전해드립니다</p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-10 border border-slate-100">
          
          {/* Search Bar */}
          <div className="flex justify-end mb-8">
            <div className="relative w-full md:w-1/3">
              <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-5 pr-12 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>

          {/* Accordion List */}
          <div className="border-t-2 border-rivanavy-900">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={notice.id} className="border-b border-slate-200">
                    {/* List Item Header (Clickable) */}
                    <button 
                      onClick={() => handleToggle(index)}
                      className="w-full flex items-center justify-between py-5 px-2 md:px-4 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4 w-full pr-4">
                        <span className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full ${
                          notice.category === '공지' ? 'bg-red-50 text-red-600 border border-red-100' :
                          notice.category === '안내' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          'bg-gold-50 text-gold-600 border border-gold-100'
                        }`}>
                          {notice.category}
                        </span>
                        <h3 className={`text-base md:text-lg font-medium truncate flex-grow ${isOpen ? 'text-gold-600 font-bold' : 'text-slate-800'}`}>
                          {notice.title}
                        </h3>
                        <span className="shrink-0 text-sm text-slate-400 hidden md:block">
                          {notice.date}
                        </span>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-gold-500' : ''}`} 
                      />
                    </button>
                    
                    {/* Mobile Date (Visible only on small screens) */}
                    <div className="md:hidden px-4 pb-3 text-xs text-slate-400 text-right">
                      {notice.date}
                    </div>

                    {/* Accordion Content (Body) */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 md:p-8 bg-slate-50 text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap border-t border-slate-100">
                        {notice.content}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-16 text-center text-slate-400">
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
