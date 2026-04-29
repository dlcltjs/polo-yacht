import { Link } from 'react-router-dom';
import { Search, Calendar, Sailboat, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

// 마인드맵 구조를 동일하게 반영한 메뉴 데이터
const menuData = [
  {
    title: '회사소개',
    path: '/company/greeting',
    subItems: [
      { name: '인사말', path: '/company/greeting' },
      { name: '브랜드', path: '/company/brand' },
      { name: '사업분야', path: '/company/business' },
      { name: '오시는길', path: '/company/location' },
      { name: '파트너스', path: '/company/sponsors' },
    ]
  },
  {
    title: 'MEMBERSHIP',
    path: '/membership/business',
    subItems: [
      { name: '비지니스', path: '/membership/business' },
      { name: '프리미엄', path: '/membership/premium' },
      { name: 'VIP', path: '/membership/vip' },
      { name: '일반', path: '/membership/apply' },
    ]
  },
  {
    title: '예약',
    path: '/reservation/yacht',
    subItems: [
      { name: '요트예약', path: '/reservation/yacht' },
      { name: '관광예약', path: '/reservation/tour' },
      { name: '펫예약', path: '/reservation/pet' },
      { name: '낙화예약', path: '/reservation/nakhwa' },
      { name: '숙박예약', path: '/reservation/stay' },
    ]
  },
  {
    title: '커뮤니티',
    path: '/community/notice',
    subItems: [
      { name: '공지사항', path: '/community/notice' },
      { name: 'Q&A', path: '/community/qa' },
      { name: '상담문의', path: '/community/contact' },
    ]
  },
  {
    title: '갤러리',
    path: '/gallery/photo',
    subItems: [
      { name: '사진', path: '/gallery/photo' },
      { name: '영상', path: '/gallery/video' },
    ]
  },
  {
    title: '이벤트',
    path: '/event/apply',
    subItems: [
      { name: '참가신청서', path: '/event/apply' },
      { name: '사진챌린지', path: '/event/photo-challenge' },
      { name: '영상챌린지', path: '/event/video-challenge' },
      { name: '닉네임챌린지', path: '/event/nickname-challenge' },
    ]
  }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // 모바일 아코디언 메뉴 열림 상태
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  return (
    <>
      <header className="fixed w-full top-0 z-[100] bg-white shadow-md flex h-[100px] md:h-[130px] transition-all duration-300">
        {/* 1. 좌측 세로 포인트 블록 */}
        <div className="w-[80px] md:w-[130px] bg-[#00122e] flex flex-col justify-center items-center h-full flex-shrink-0">
          <Sailboat className="text-white w-8 h-8 md:w-12 md:h-12 mb-2" strokeWidth={1.5} />
          <span className="text-white font-bold tracking-[0.2em] text-[10px] md:text-sm">P.Y</span>
        </div>

        {/* 2. 우측 영역 (1열 & 2열) */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          
          {/* 1열 (우측 상단 영역) */}
          <div className="hidden md:flex justify-between items-center h-[50px] border-b border-gray-200 px-6 lg:px-10">
            {/* 왼쪽: 검색창 */}
            <div className="flex items-center gap-2 text-gray-400 w-1/3">
              <Search size={18} className="text-green-500" />
              <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="outline-none text-xs bg-transparent w-full text-black placeholder-gray-400" 
              />
            </div>
            
            {/* 중앙: 메인 로고 */}
            <div className="w-1/3 flex justify-center">
              <Link to="/" className="text-xl lg:text-2xl font-bold text-black tracking-[0.2em] font-serif flex items-center gap-2">
                GUMGA
              </Link>
            </div>

            {/* 오른쪽: 링크 메뉴 */}
            <div className="w-1/3 flex justify-end gap-6 text-[12px] text-gray-500 font-medium tracking-tight">
              <Link to="/login" className="hover:text-black transition-colors">로그인</Link>
              <Link to="/signup" className="hover:text-black transition-colors">회원가입</Link>
              <Link to="/support" className="hover:text-black transition-colors">고객센터</Link>
            </div>
          </div>

          {/* 2열 (우측 하단 영역) */}
          <div className="flex-1 flex items-stretch">
            {/* 중앙 메인 메뉴 (개별 드롭다운) */}
            <ul className="flex-1 hidden md:flex flex-row items-center justify-center gap-6 lg:gap-12 px-4 h-full list-none m-0 p-0">
              {menuData.map((menu, idx) => (
                <li key={idx} className="relative group h-full flex items-center justify-center">
                  <span 
                    className="text-[#00122e] font-extrabold group-hover:text-[#d4af37] transition-colors text-sm lg:text-[15px] tracking-wide flex items-center h-full px-2 cursor-pointer"
                  >
                    {menu.title}
                  </span>
                  
                  {/* 개별 하위 메뉴 박스 */}
                  <ul className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 list-none m-0 p-0">
                    <div className="bg-white shadow-lg rounded-none overflow-hidden min-w-[160px] flex flex-col p-4 border border-gray-100 space-y-1">
                      {menu.subItems.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link 
                            to={sub.path} 
                            className="block text-[#00122e] hover:text-[#d4af37] hover:bg-slate-50 transition-colors px-4 py-2.5 text-sm font-bold text-center whitespace-nowrap rounded-none"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
              ))}
            </ul>

            {/* 모바일 뷰 용 중앙 정렬 영역 */}
            <div className="md:hidden flex-1 flex items-center justify-between px-4">
               <Link to="/" className="text-xl font-bold text-black tracking-widest font-serif">
                GUMGA
               </Link>
               <button onClick={() => setIsOpen(!isOpen)} className="text-black p-2">
                 {isOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>

          </div>
        </div>
      </header>

      {/* 모바일 확장 메뉴 (드롭다운 아코디언) */}
      {isOpen && (
        <div className="fixed top-[100px] left-0 w-full h-[calc(100vh-100px)] overflow-y-auto bg-white border-b border-gray-200 shadow-lg z-[90] md:hidden">
           <div className="flex flex-col pb-10">
             {menuData.map((menu, idx) => (
               <div key={idx} className="border-b border-gray-100">
                 <button 
                   onClick={() => setOpenMobileMenu(openMobileMenu === idx ? null : idx)}
                   className="w-full p-4 flex items-center justify-between font-extrabold text-[#00122e] text-base"
                 >
                   {menu.title}
                   <ChevronDown 
                     size={20} 
                     className={`transition-transform duration-300 ${openMobileMenu === idx ? 'rotate-180' : ''}`}
                   />
                 </button>
                 {/* Mobile sub items */}
                 <div className={`bg-slate-50 overflow-hidden transition-all duration-300 ${openMobileMenu === idx ? 'max-h-[500px]' : 'max-h-0'}`}>
                   {menu.subItems.map((sub, subIdx) => (
                     <Link 
                       key={subIdx} 
                       to={sub.path} 
                       onClick={() => setIsOpen(false)}
                       className="block p-4 pl-8 text-sm text-[#00122e] hover:text-[#d4af37] font-bold border-b border-gray-200/50 last:border-0"
                     >
                       {sub.name}
                     </Link>
                   ))}
                 </div>
               </div>
             ))}
             <Link to="/reservation/yacht" onClick={() => setIsOpen(false)} className="mx-4 mt-8 p-4 bg-[#d4af37] text-white text-center font-bold rounded-lg flex items-center justify-center gap-2">
               <Calendar size={20} /> 실시간 예약
             </Link>
           </div>
        </div>
      )}
    </>
  );
}
