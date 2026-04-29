import { useState, useEffect } from 'react';
import { Building2, User, Phone, Mail, FileText, CalendarDays, CheckCircle2 } from 'lucide-react';

const dummyContact = [
  {
    id: 1,
    company: 'A그룹',
    name: '김지훈 차장',
    phone: '010-1234-5678',
    email: 'jh.kim@agroup.com',
    type: '기업 워크숍 및 단체 대관',
    schedulePax: '2026년 5월 중순 / 약 50명',
    content: '안녕하세요, 임원진 및 우수 사원 포상 휴가 목적의 워크숍 대관을 문의드립니다.\n요트 2대 분할 탑승 및 선상 케이터링(디너)이 가능한지 여부와 예상 견적서를 회신 부탁드립니다.',
    status: '대기 중',
    date: '2026.04.28'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    type: '기업 워크숍 및 단체 대관',
    schedulePax: '',
    content: '',
    agree: false
  });

  // 초기 더미 데이터 세팅 (한 번만 실행)
  useEffect(() => {
    const storedContacts = localStorage.getItem('polo_contact');
    if (!storedContacts) {
      localStorage.setItem('polo_contact', JSON.stringify(dummyContact));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 필수 항목 검증
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.content.trim()) {
      alert("담당자 성명, 연락처, 이메일, 문의 내용은 필수 입력 항목입니다.");
      return;
    }

    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    // 데이터 저장 로직
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    const newContact = {
      id: Date.now(),
      company: formData.company,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      type: formData.type,
      schedulePax: formData.schedulePax,
      content: formData.content,
      status: '대기 중',
      date: formattedDate
    };

    const storedContacts = JSON.parse(localStorage.getItem('polo_contact') || '[]');
    const updatedContacts = [newContact, ...storedContacts];
    localStorage.setItem('polo_contact', JSON.stringify(updatedContacts));

    // 성공 처리
    alert("성공적으로 접수되었습니다. 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.");
    
    // 폼 초기화
    setFormData({
      company: '',
      name: '',
      phone: '',
      email: '',
      type: '기업 워크숍 및 단체 대관',
      schedulePax: '',
      content: '',
      agree: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] md:pt-[150px] pb-24 font-sans relative">
      {/* Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        <img 
          src="/catamaran_bg.png" 
          alt="Contact Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Title */}
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Business & VIP</h1>
          <p className="text-white font-medium tracking-widest text-sm md:text-base uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">기업 단체 및 맞춤형 럭셔리 투어 상담</p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-12 border border-slate-100">
          
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-rivanavy-900 mb-2">프라이빗 상담 문의</h2>
            <p className="text-slate-500 text-sm">남겨주신 정보는 담당자 외에는 열람할 수 없으며, 신속하고 정확한 답변을 위해 최선을 다하겠습니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
                <span className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">1</span>
                기본 정보 입력
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                    <Building2 size={16} className="text-slate-400"/> 회사/단체명 <span className="text-slate-400 font-normal text-xs">(선택)</span>
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all"
                    placeholder="예) 폴로요트 주식회사"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                    <User size={16} className="text-slate-400"/> 담당자 성명 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all"
                    placeholder="성함을 입력해주세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-slate-400"/> 연락처 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400"/> 이메일 <span className="text-red-500">*</span> <span className="text-slate-400 font-normal text-xs">(견적서 발송용)</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Details */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
                <span className="w-8 h-8 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">2</span>
                문의 상세 내용
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">문의 유형 <span className="text-red-500">*</span></label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all bg-white"
                  >
                    <option value="기업 워크숍 및 단체 대관">기업 워크숍 및 단체 대관</option>
                    <option value="VIP 맞춤 투어">VIP 맞춤 투어</option>
                    <option value="촬영 및 장소 협찬">촬영 및 장소 협찬</option>
                    <option value="기타 제휴">기타 제휴</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                    <CalendarDays size={16} className="text-slate-400"/> 예상 일정 및 인원 <span className="text-slate-400 font-normal text-xs">(선택)</span>
                  </label>
                  <input 
                    type="text" 
                    name="schedulePax"
                    value={formData.schedulePax}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all"
                    placeholder="예) 10월 셋째 주 주말 / 30명 내외"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-slate-400"/> 문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={6}
                    className="w-full border border-slate-300 rounded-lg p-4 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all resize-y"
                    placeholder="원하시는 요트 투어의 목적, 특별한 요구사항(케이터링, 픽업 서비스 등)을 상세히 남겨주시면 더욱 정확한 상담이 가능합니다."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="flex items-center gap-3 bg-white p-4 border border-slate-200 rounded-lg">
              <input 
                type="checkbox" 
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-5 h-5 text-[#d4af37] border-slate-300 rounded focus:ring-[#d4af37]"
              />
              <label htmlFor="agree" className="text-sm text-slate-600 cursor-pointer">
                <span className="font-bold text-slate-800">[필수]</span> 개인정보 수집 및 이용에 동의합니다. (수집된 정보는 상담 목적 외에 사용되지 않습니다)
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8962d] text-white font-bold text-lg py-5 rounded-xl shadow-lg shadow-[#d4af37]/30 hover:shadow-[#d4af37]/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={24} />
              상담 문의 접수하기
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
