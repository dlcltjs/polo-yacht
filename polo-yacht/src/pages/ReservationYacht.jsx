import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReservationYacht() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '010-',
    adults: '2',
    children: '0',
    date: '',
    time: '',
    agreePrivacy: false,
    agreeKakao: false,
    paymentMethod: 'bank',
    refundAmount: '',
    refundName: '',
    refundBank: '',
    refundAccount: ''
  });

  // 포트원 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 강제 010- 포맷 제한 (초기 삭제 방지)
    let finalValue = value;
    if (name === 'phone' && !value.startsWith('010-')) {
        if (value.startsWith('010')) finalValue = '010-' + value.slice(3);
        else finalValue = '010-';
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : finalValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.dob || formData.phone.length < 12 || !formData.date || !formData.time) {
      alert("예약자 정보와 날짜 항목을 빠짐없이 입력해주세요.");
      return;
    }
    if (!formData.agreePrivacy || !formData.agreeKakao) {
      alert("필수 약관 동의를 체크하셔야 예약 진행이 가능합니다.");
      return;
    }
    if (!formData.refundName || !formData.refundBank || !formData.refundAccount) {
      alert("신속한 환불 처리를 위해 환불 계좌 정보는 필수입니다.");
      return;
    }

    const completeReservation = () => {
      const newRes = {
        id: Date.now(),
        code: `BKG-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        phone: formData.phone,
        service: "폴로요트 자동승선",
        date: formData.date,
        time: formData.time,
        pax: `성인${formData.adults}, 소인${formData.children}`,
        status: formData.paymentMethod === 'card' ? "예약확정" : "입금대기"
      };

      const existingReservations = JSON.parse(localStorage.getItem('polo_reservations') || '[]');
      localStorage.setItem('polo_reservations', JSON.stringify([newRes, ...existingReservations]));

      alert(`[${formData.name}] 님의 폴로요트 예약이 정상적으로 결제/접수되었습니다!`);
      navigate('/');
    };

    if (formData.paymentMethod === 'card') {
      alert("안전한 결제창으로 이동합니다.");
      if (window.IMP) {
        window.IMP.init('imp00000000'); // 포트원 가맹점 식별코드 (테스트용)
        window.IMP.request_pay({
          pg: "html5_inicis", // 테스트용 PG
          pay_method: "card",
          merchant_uid: `mid_${new Date().getTime()}`,
          name: "여수 폴로요트 승선 예약",
          amount: 50000, 
          buyer_email: "test@domain.com",
          buyer_name: formData.name,
          buyer_tel: formData.phone,
        }, (rsp) => {
          if (rsp.success) {
            completeReservation();
          } else {
            alert(`결제에 실패하였습니다: ${rsp.error_msg}`);
          }
        });
      } else {
        alert("결제 모듈을 불러오는데 실패했습니다.");
      }
    } else {
      completeReservation();
    }
  };

  const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-6 border-l-4 border-gold-500 pl-3">
      <h3 className="text-xl font-bold tracking-wider text-rivanavy-900">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] md:pt-[150px] pb-24 font-sans relative">
      {/* Background Image Accent */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        <img 
          src="/catamaran_bg.png" 
          alt="Yacht Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        {/* Lighter overlay for brighter background */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Title */}
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Reservation</h1>
          <p className="text-white font-medium tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">폴로요트 실시간 승선 예약</p>
        </div>

        {/* Main Form Box */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-12 border border-slate-100 flex flex-col gap-10">
          
          {/* 1. 예약자 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="예약자 정보" subtitle="탑승 수속을 위해 정확한 정보를 기입해주세요." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">예약자 성함</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">생년월일</label>
                <input type="text" name="dob" value={formData.dob} onChange={handleChange} placeholder="YYMMDD 형식 (예: 900101)" maxLength={6} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">휴대폰 번호</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={13} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
            </div>
          </section>

          {/* 2. 인원 및 날짜 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="인원 및 스케줄" subtitle="원하시는 탑승 날짜와 권장 승선 인원을 선택하세요." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">총 성인 인원</label>
                  <select name="adults" value={formData.adults} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all appearance-none cursor-pointer">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => <option key={`a-${num}`} value={num}>{num}명</option>)}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">총 소인 인원</label>
                  <select name="children" value={formData.children} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all appearance-none cursor-pointer">
                    {[0,1,2,3,4,5].map(num => <option key={`c-${num}`} value={num}>{num}명</option>)}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">예약 희망일</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none cursor-pointer text-slate-700" required />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">예약 시간</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none cursor-pointer text-slate-700" required />
                </div>
              </div>
            </div>
          </section>

          {/* 3. 결제 방식 & 환불 계좌 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="결제 및 환불 정보" subtitle="천재지변 및 우천 시 자동 환불 처리를 위해 사용됩니다." />
            
            <div className="mb-6 flex gap-8 p-4 bg-slate-50 rounded border border-slate-200 w-fit">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} className="accent-gold-500 w-4 h-4 cursor-pointer" />
                <span className="font-bold text-sm text-slate-700">무통장입금</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="accent-gold-500 w-4 h-4 cursor-pointer" />
                <span className="font-bold text-sm text-slate-700">신용/체크카드 (온라인 결제)</span>
              </label>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="text-sm font-bold text-rivanavy-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 block"></span>
                환불 지급 계좌 (필수)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <input type="text" name="refundAmount" value={formData.refundAmount} onChange={handleChange} placeholder="환불 예상액 (자동산정)" disabled className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs text-slate-400 cursor-not-allowed" />
                </div>
                <div className="md:col-span-1">
                  <input type="text" name="refundName" value={formData.refundName} onChange={handleChange} placeholder="예금주명" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
                <div className="md:col-span-1">
                  <input type="text" name="refundBank" value={formData.refundBank} onChange={handleChange} placeholder="은행명 (예: 신한)" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
                <div className="md:col-span-1">
                  <input type="number" name="refundAccount" value={formData.refundAccount} onChange={handleChange} placeholder="계좌번호 ('-' 제외)" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">* 기상 악화 등 출항 불가 시, 해당 계좌로 당일 100% 환불 처리됩니다.</p>
            </div>
          </section>

          {/* 4. 약관 동의 */}
          <section className="mb-4">
            <SectionTitle title="서비스 이용 동의" subtitle="필수 항목에 체크해 주셔야 승선 및 예약이 확정됩니다." />
            <div className="space-y-4 py-2 border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="w-5 h-5 accent-gold-500 cursor-pointer rounded border-gray-300" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">[필수] 제3자 개인정보 제공 및 승선명부 작성에 동의합니다.</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="agreeKakao" checked={formData.agreeKakao} onChange={handleChange} className="w-5 h-5 accent-gold-500 cursor-pointer rounded border-gray-300" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">[필수] 예약 안내 알림톡 수신 및 카카오톡 채널 규정에 동의합니다.</span>
              </label>
            </div>
          </section>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-6 bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-[#d4af37]/30 tracking-widest text-lg"
          >
            예약 및 결제하기
          </button>

        </form>
      </div>
    </div>
  );
}
