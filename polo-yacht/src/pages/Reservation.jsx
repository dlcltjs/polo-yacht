import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2 } from 'lucide-react';

export default function Reservation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    adults: 2,
    children: 0,
    service: 'polo',
    name: '',
    phone: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-24">
      <div 
        className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 pt-24"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#00122e] opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-wider uppercase text-white">Reservation</h1>
          <p className="text-white max-w-2xl mx-auto text-xl">폴로요트와 함께할 특별한 시간을 예약하세요</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 z-0"></div>
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gold-500 z-0 transition-all duration-500 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`}></div>
            
            <div className={`relative z-10 flex flex-col items-center flex-1`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors ${step >= 1 ? 'bg-white border border-slate-100 shadow-sm rounded-xl text-gold-400 border-2 border-gold-500' : 'bg-white shadow-sm border border-slate-100 rounded-xl text-slate-500 border-2 border-slate-200'}`}>1</div>
              <span className={`text-sm font-medium ${step >= 1 ? 'text-rivanavy-900 font-medium' : 'text-slate-500'}`}>일정 선택</span>
            </div>
            <div className={`relative z-10 flex flex-col items-center flex-1`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors ${step >= 2 ? 'bg-white border border-slate-100 shadow-sm rounded-xl text-gold-400 border-2 border-gold-500' : 'bg-white shadow-sm border border-slate-100 rounded-xl text-slate-500 border-2 border-slate-200'}`}>2</div>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-rivanavy-900 font-medium' : 'text-slate-500'}`}>정보 입력</span>
            </div>
            <div className={`relative z-10 flex flex-col items-center flex-1`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-colors ${step >= 3 ? 'bg-white border border-slate-100 shadow-sm rounded-xl text-gold-400 border-2 border-gold-500' : 'bg-white shadow-sm border border-slate-100 rounded-xl text-slate-500 border-2 border-slate-200'}`}>3</div>
              <span className={`text-sm font-medium ${step >= 3 ? 'text-rivanavy-900 font-medium' : 'text-slate-500'}`}>예약 완료</span>
            </div>
          </div>
        </div>

        {/* Step 1: Selection */}
        {step === 1 && (
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 md:p-12 shadow-lg border border-slate-100 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-rivanavy-900 font-medium mb-8 border-l-4 border-gold-500 pl-4">일정 및 인원 선택</h2>
            <form onSubmit={handleNext} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-sm font-bold text-rivanavy-900 font-medium/80 mb-3">
                    <CalendarIcon size={18} className="mr-2 text-rivanavy-900 font-bold"/> 날짜 선택
                  </label>
                  <input type="date" className="w-full border border-slate-300 p-4 focus:outline-none focus:border-gold-500 bg-slate-50" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="flex items-center text-sm font-bold text-rivanavy-900 font-medium/80 mb-3">
                    <Clock size={18} className="mr-2 text-rivanavy-900 font-bold"/> 시간 선택
                  </label>
                  <select className="w-full border border-slate-300 p-4 bg-slate-50 focus:outline-none focus:border-gold-500" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                    <option value="">시간을 선택해주세요</option>
                    <option value="10:00">10:00 (오전 투어)</option>
                    <option value="14:00">14:00 (오후 투어)</option>
                    <option value="18:00">18:00 (선셋 투어)</option>
                    <option value="20:00">20:00 (야경/낙화 투어)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="flex items-center text-sm font-bold text-rivanavy-900 font-medium/80 mb-3">
                    <Users size={18} className="mr-2 text-rivanavy-900 font-bold"/> 탑승 인원
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <span className="block text-xs text-slate-500 mb-1">성인</span>
                      <input type="number" min="1" max="20" className="w-full border border-slate-300 p-4 bg-slate-50 focus:outline-none focus:border-gold-500" value={formData.adults} onChange={e => setFormData({...formData, adults: e.target.value})} />
                    </div>
                    <div className="flex-1">
                      <span className="block text-xs text-slate-500 mb-1">소인 (13세 미만)</span>
                      <input type="number" min="0" max="20" className="w-full border border-slate-300 p-4 bg-slate-50 focus:outline-none focus:border-gold-500" value={formData.children} onChange={e => setFormData({...formData, children: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-3">이용 서비스</label>
                  <select className="w-full border border-slate-300 p-4 bg-slate-50 focus:outline-none focus:border-gold-500" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                    <option value="polo">폴로요트 (프리미엄 럭셔리 투어)</option>
                    <option value="pet">펫로얄 (반려동물 동반 투어)</option>
                    <option value="baragi">바라기낙화 (야간 감성 투어)</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button type="submit" className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium px-10 py-4 font-bold tracking-wide hover:bg-gold-500 hover:text-navy-950 transition-colors shadow-md shadow-slate-200/50">
                  다음 단계
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Info */}
        {step === 2 && (
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-8 md:p-12 shadow-lg border border-slate-100 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-rivanavy-900 font-medium mb-8 border-l-4 border-gold-500 pl-4">예약자 정보 입력</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-3">예약자명</label>
                  <input type="text" className="w-full border border-slate-300 p-4 bg-slate-50 focus:outline-none focus:border-gold-500" placeholder="홍길동" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-rivanavy-900 font-medium/80 mb-3">연락처</label>
                  <input type="tel" className="w-full border border-slate-300 p-4 bg-slate-50 focus:outline-none focus:border-gold-500" placeholder="010-0000-0000" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="bg-slate-50 p-6 border border-slate-200 mt-8">
                <h3 className="font-bold text-rivanavy-900 font-medium mb-4 pb-2 border-b border-slate-200">선택한 예약 정보 확인</h3>
                <ul className="space-y-3 text-rivanavy-900 font-medium/80 font-medium my-4">
                  <li><span className="text-slate-500 w-24 inline-block">이용 서비스</span> {formData.service === 'polo' ? '폴로요트' : formData.service === 'pet' ? '펫로얄' : '바라기낙화'}</li>
                  <li><span className="text-slate-500 w-24 inline-block">예약 일자</span> {formData.date}</li>
                  <li><span className="text-slate-500 w-24 inline-block">이용 시간</span> {formData.time}</li>
                  <li><span className="text-slate-500 w-24 inline-block">탑승 인원</span> 성인 {formData.adults}명, 소인 {formData.children}명</li>
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="border border-slate-300 text-slate-600 px-8 py-4 font-bold hover:bg-slate-50 transition-colors">
                  이전으로
                </button>
                <button type="submit" className="bg-gold-500 text-navy-950 px-10 py-4 font-bold tracking-wide hover:bg-white border border-slate-100 shadow-sm rounded-xl hover:text-rivanavy-900 font-medium transition-colors shadow-lg">
                  예약 확정하기
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-12 text-center shadow-lg border border-slate-100 animate-fade-in-up">
            <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-rivanavy-900 font-bold" />
            </div>
            <h2 className="text-3xl font-bold text-rivanavy-900 font-medium mb-4">예약 신청 완료</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
              고객님의 소중한 예약 접수가 완료되었습니다.<br/>
              조속히 담당 매니저가 확인 전화를 드릴 예정입니다.
            </p>
            
            <div className="bg-slate-50 p-6 max-w-sm mx-auto mb-10 text-left border border-slate-200 text-sm">
              <div className="flex justify-between mb-3"><span className="text-slate-500">예약번호</span><span className="font-mono font-bold text-rivanavy-900 font-medium">BKG-{Math.floor(Math.random() * 90000) + 10000}</span></div>
              <div className="flex justify-between mb-3"><span className="text-slate-500">예약자명</span><span className="font-bold text-rivanavy-900 font-medium">{formData.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">예약일정</span><span className="font-bold text-rivanavy-900 font-medium">{formData.date} {formData.time}</span></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => { setStep(1); setFormData({...formData, date: '', time: '', name: '', phone: ''}); }} className="border-2 border-slate-300 text-slate-600 px-8 py-3 font-bold hover:bg-slate-50 transition-colors">
                추가 예약하기
              </button>
              <button onClick={() => window.location.href = '/'} className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium px-8 py-3 font-bold hover:bg-gold-500 hover:text-navy-950 transition-colors shadow-md shadow-slate-200/50">
                메인으로 이동
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
