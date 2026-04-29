import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Home, Tent, Building, Castle, Map } from 'lucide-react';

export default function ReservationStay() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    phone: '010-',
    adults: '2',
    children: '0',
    checkIn: '',
    checkOut: '',
    stayType: '호텔',
    agreePrivacy: false,
    agreeKakao: false,
    refundName: '',
    refundBank: '',
    refundAccount: '',
    paymentMethod: 'bank'
  });

  const [totalPrice] = useState(100000); // 테스트 결제 금액 10만원 고정

  // PortOne script load
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
    
    if (name === 'phone') {
        let finalValue = value;
        if (!value.startsWith('010-')) {
            if (value.startsWith('010')) finalValue = '010-' + value.slice(3);
            else finalValue = '010-';
        }
        setFormData(prev => ({ ...prev, [name]: finalValue }));
        return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStayTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, stayType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.birthdate || formData.phone.length < 12 || !formData.checkIn || !formData.checkOut) {
      alert("필수 기본 정보 및 예약 일정을 빠짐없이 입력해주세요.");
      return;
    }
    
    if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      alert("체크아웃 날짜는 체크인 날짜 이후여야 합니다.");
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
        code: `STAY-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        phone: formData.phone,
        service: `숙박 예약 (${formData.stayType})`,
        date: `${formData.checkIn} ~ ${formData.checkOut}`,
        time: "15:00 입실",
        pax: `성인 ${formData.adults}, 소인 ${formData.children}`,
        status: formData.paymentMethod === 'card' ? "예약확정" : "입금대기",
        amount: totalPrice
      };

      const existingReservations = JSON.parse(localStorage.getItem('polo_reservations') || '[]');
      localStorage.setItem('polo_reservations', JSON.stringify([newRes, ...existingReservations]));

      alert(`[${formData.name}] 님의 숙박 예약이 정상적으로 접수/결제되었습니다!\n결제 금액: ${totalPrice.toLocaleString()}원`);
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
          name: `폴로요트 숙박 예약 (${formData.stayType})`,
          amount: totalPrice,
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

  const stayOptions = [
    { id: '호텔', icon: Building, label: '호텔' },
    { id: '리조트', icon: Castle, label: '리조트' },
    { id: '펜션', icon: Home, label: '펜션' },
    { id: '모텔', icon: Map, label: '모텔' },
    { id: '캠핑', icon: Tent, label: '캠핑' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] md:pt-[150px] pb-24 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        <img 
          src="/private_stay.jpeg" 
          alt="Stay Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Private Stay</h1>
          <p className="text-white font-medium tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">최고의 휴식을 위한 숙박 예약</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-12 border border-slate-100 flex flex-col gap-10">
          
          {/* 1. 예약자 기본정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="예약자 기본정보" subtitle="안전하고 신속한 안내를 위해 본인 정보를 정확히 기입해주세요." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">예약자 성명</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">생년월일</label>
                <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all text-slate-700" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">휴대폰 번호</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={13} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" required />
              </div>
            </div>
          </section>

          {/* 2. 숙박 및 인원 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="숙박 및 인원" subtitle="원하시는 숙박 형태와 투숙 일정을 선택해 주세요." />
            
            {/* 숙박분류 (Card UI) */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-3">숙박 분류</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stayOptions.map((opt) => {
                  const isSelected = formData.stayType === opt.id;
                  const Icon = opt.icon;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => handleStayTypeSelect(opt.id)}
                      className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${isSelected ? 'border-gold-500 bg-gold-50 text-gold-600 shadow-md' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      <Icon size={28} className={isSelected ? 'text-gold-500' : 'text-slate-400'} strokeWidth={isSelected ? 2 : 1.5} />
                      <span className={`font-bold text-sm ${isSelected ? 'text-gold-700' : 'text-slate-600'}`}>{opt.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">체크인 (Check-in)</label>
                  <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none cursor-pointer text-slate-700" required />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">체크아웃 (Check-out)</label>
                  <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none cursor-pointer text-slate-700" required />
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">총 성인 인원</label>
                  <select name="adults" value={formData.adults} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none appearance-none cursor-pointer text-slate-700">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => <option key={`a-${num}`} value={num}>{num}명</option>)}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">총 소인 인원</label>
                  <select name="children" value={formData.children} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none appearance-none cursor-pointer text-slate-700">
                    {[0,1,2,3,4,5].map(num => <option key={`c-${num}`} value={num}>{num}명</option>)}
                  </select>
                </div>
              </div>
            </div>
            
            {/* 총 결제 금액 표기 (테스트용) */}
            <div className="mt-8 bg-slate-800 text-white p-6 rounded-lg shadow-inner flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-lg font-bold text-slate-300">총 결제 예정 금액 (1박 기준)</span>
                <div className="text-3xl font-bold text-gold-400">
                    {totalPrice.toLocaleString()} <span className="text-xl text-white font-normal">원</span>
                </div>
            </div>

          </section>

          {/* 3. 결제 방식 & 환불 계좌 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="결제 관리 및 환불" subtitle="결제 방식을 선택하시고 취소 시 환불받을 계좌를 입력해주세요." />
            
            <div className="mb-6 flex gap-8 p-4 bg-slate-50 rounded border border-slate-200 w-fit">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} className="accent-gold-500 w-4 h-4 cursor-pointer" />
                <span className="font-bold text-sm text-slate-700">무통장입금</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="accent-gold-500 w-4 h-4 cursor-pointer" />
                <span className="font-bold text-sm text-slate-700 flex items-center gap-1"><CreditCard size={16}/> 신용/체크카드 (온라인 결제)</span>
              </label>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h4 className="text-sm font-bold text-rivanavy-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 block"></span> 환불 지급 계좌 (필수)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <input type="text" value={`${totalPrice.toLocaleString()}원`} disabled className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs text-slate-500 font-bold cursor-not-allowed text-center" title="환불 예정 금액" />
                </div>
                <div className="md:col-span-1">
                  <input type="text" name="refundName" value={formData.refundName} onChange={handleChange} placeholder="예금주명" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
                <div className="md:col-span-1">
                  <input type="text" name="refundBank" value={formData.refundBank} onChange={handleChange} placeholder="은행명" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
                <div className="md:col-span-1">
                  <input type="number" name="refundAccount" value={formData.refundAccount} onChange={handleChange} placeholder="계좌번호 ('-' 제외)" className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs focus:border-gold-500 outline-none" required />
                </div>
              </div>
            </div>
          </section>

          {/* 4. 이용 동의 */}
          <section className="mb-4">
            <SectionTitle title="서비스 이용 동의" subtitle="필수 항목에 체크해 주셔야 예약이 확정됩니다." />
            <div className="space-y-4 py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} className="w-5 h-5 accent-gold-500 cursor-pointer rounded border-gray-300" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">[필수] 제3자 개인정보 제공 및 투숙객 명부 작성에 동의합니다.</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="agreeKakao" checked={formData.agreeKakao} onChange={handleChange} className="w-5 h-5 accent-gold-500 cursor-pointer rounded border-gray-300" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">[필수] 예약 안내 알림톡 수신 및 카카오톡 채널 가입에 동의합니다.</span>
              </label>
            </div>
          </section>

          <button type="submit" className="w-full mt-6 bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-5 rounded-lg transition-colors shadow-lg shadow-[#d4af37]/30 tracking-widest text-xl">
            숙박 예약 및 결제하기
          </button>

        </form>
      </div>
    </div>
  );
}
