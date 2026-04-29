import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, CreditCard } from 'lucide-react';

export default function ReservationPet() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '010-',
    petType: '소형',
    provideCarrier: false,
    requests: '',
    date: '',
    time: '',
    departure: '',
    waypoint: '',
    destination: '',
    agreePrivacy: false,
    agreeKakao: false,
    refundName: '',
    refundBank: '',
    refundAccount: '',
    paymentMethod: 'bank'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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
    
    if (!formData.name || formData.phone.length < 12 || !formData.date || !formData.time || !formData.departure || !formData.destination) {
      alert("필수 기본 정보 및 예약 일정, 경로를 빠짐없이 입력해주세요.");
      return;
    }
    if (!formData.agreePrivacy || !formData.agreeKakao) {
      alert("필수 약관 동의를 체크하셔야 예약 진행이 가능합니다.");
      return;
    }
    if (!formData.refundName || !formData.refundBank || !formData.refundAccount) {
      alert("환불 계좌 정보를 정확히 입력해주세요.");
      return;
    }

    const completeReservation = () => {
      const newRes = {
        id: Date.now(),
        code: `PET-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        phone: formData.phone,
        service: `펫 동반 관광 (${formData.petType})`,
        date: formData.date,
        time: formData.time,
        pax: `반려동물 동반`,
        status: formData.paymentMethod === 'card' ? "예약확정" : "입금대기"
      };

      const existingReservations = JSON.parse(localStorage.getItem('polo_reservations') || '[]');
      localStorage.setItem('polo_reservations', JSON.stringify([newRes, ...existingReservations]));

      alert(`[${formData.name}] 님의 반려동물 동반 예약이 접수/결제되었습니다!`);
      navigate('/admin');
    };

    if (formData.paymentMethod === 'card') {
      alert("안전한 결제창으로 이동합니다.");
      if (window.IMP) {
        window.IMP.init('imp00000000');
        window.IMP.request_pay({
          pg: "html5_inicis", 
          pay_method: "card",
          merchant_uid: `mid_${new Date().getTime()}`,
          name: "여수 펫 동반 관광 예약",
          amount: 80000,
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
          alt="Pet Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        {/* Lighter overlay for brighter background */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Pet Friendly</h1>
          <p className="text-white font-medium tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">반려동물 동반 럭셔리 승선 예약</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-12 border border-slate-100 flex flex-col gap-10">
          
          {/* 1. 기본 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="기본 정보" subtitle="예약자 본인의 정보를 정확히 기입해주세요." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">예약자 성함</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">휴대폰 번호</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={13} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
            </div>
          </section>

          {/* 2. 반려동물 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="반려동물 정보" subtitle="안전한 승선을 위해 동반하는 펫의 정보를 상세히 적어주세요." />
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">펫 종류 (크기)</label>
                <div className="flex gap-6">
                  {['소형', '중형', '대형'].map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="petType" value={size} checked={formData.petType === size} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                      <span className="text-sm text-slate-700">{size}견/묘</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-md w-fit">
                  <input type="checkbox" name="provideCarrier" checked={formData.provideCarrier} onChange={handleChange} className="accent-gold-500 w-5 h-5 rounded" />
                  <span className="text-sm font-bold text-slate-700">폴로요트 전용 펫가방 제공 요청 (+비용 무료)</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">전달사항 (선택)</label>
                <textarea name="requests" value={formData.requests} onChange={handleChange} rows="3" placeholder="배변 패드 필요, 입질 주의 등 특이사항을 자유롭게 적어주세요." className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </section>

          {/* 3. 일정 및 경로 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="일정 및 경로" subtitle="원하시는 예약 일시와 목적지를 설정하세요." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
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
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-500" />
                <input type="text" name="departure" value={formData.departure} onChange={handleChange} placeholder="출발지 주소 (예: 후포 펜타마린)" className="flex-1 bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none" required />
              </div>
              <div className="flex items-center gap-3 pl-8 border-l-2 border-dashed border-slate-200 ml-2.5 py-1">
                <input type="text" name="waypoint" value={formData.waypoint} onChange={handleChange} placeholder="경유지 주소 (선택)" className="flex-1 bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none" />
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-red-500" />
                <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="도착지 주소" className="flex-1 bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none" required />
              </div>
            </div>
          </section>

          {/* 4. 결제 관리 & 환불 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="결제 관리 및 환불" subtitle="결제를 진행할 무통장 입금 계좌를 등록해주세요." />
            
            {/* Payment Method Selection */}
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

            {/* Refund Info */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="text-sm font-bold text-rivanavy-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 block"></span> 환불 지급 계좌 (필수)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <input type="text" value="전액(100%) 환불" disabled className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs text-slate-400 cursor-not-allowed text-center font-bold" />
                </div>
                <div className="md:col-span-1">
                  <input type="text" name="refundName" value={formData.refundName} onChange={handleChange} placeholder="예금주명" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
                <div className="md:col-span-1">
                  <input type="text" name="refundBank" value={formData.refundBank} onChange={handleChange} placeholder="은행명" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
                <div className="md:col-span-1">
                  <input type="number" name="refundAccount" value={formData.refundAccount} onChange={handleChange} placeholder="계좌번호" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">* 기상 악화 등 출항 불가 시 등록된 계좌로 당일 자동 환불 처리됩니다.</p>
            </div>
          </section>

          {/* 5. 이용 동의 */}
          <section className="mb-4">
            <SectionTitle title="서비스 이용 동의" subtitle="필수 항목에 체크해 주셔야 펫 동반 예약이 확정됩니다." />
            <div className="space-y-4 py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="w-5 h-5 accent-gold-500 cursor-pointer rounded border-gray-300" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">[필수] 제3자 개인정보 제공 및 승선명부 작성에 동의합니다.</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="agreeKakao" checked={formData.agreeKakao} onChange={handleChange} className="w-5 h-5 accent-gold-500 cursor-pointer rounded border-gray-300" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">[필수] 예약 안내 알림톡 수신 및 카카오톡 채널 가입에 동의합니다.</span>
              </label>
            </div>
          </section>

          <button type="submit" className="w-full mt-6 bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-5 rounded-lg transition-colors shadow-lg shadow-[#d4af37]/30 tracking-widest text-xl">
            펫 예약 완료하기
          </button>

        </form>
      </div>
    </div>
  );
}
