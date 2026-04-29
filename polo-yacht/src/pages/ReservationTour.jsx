import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, MapPin } from 'lucide-react';

export default function ReservationTour() {
  const navigate = useNavigate();
  
  // Basic Form Data State
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '010-',
    location: '', // 탑승장소
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

  // Dynamic List State for Tour Locations
  const [tourLocations, setTourLocations] = useState(['']); // Start with one empty location

  // Load PortOne script for payment
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
    
    // Phone number format logic
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

  // Handlers for dynamic list
  const handleLocationChange = (index, value) => {
    const updatedLocations = [...tourLocations];
    updatedLocations[index] = value;
    setTourLocations(updatedLocations);
  };

  const addLocation = () => {
    setTourLocations([...tourLocations, '']);
  };

  const removeLocation = (index) => {
    if (tourLocations.length > 1) {
      const updatedLocations = tourLocations.filter((_, i) => i !== index);
      setTourLocations(updatedLocations);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.dob || formData.phone.length < 12 || !formData.location || !formData.date || !formData.time) {
      alert("예약자 정보와 일정 항목을 빠짐없이 입력해주세요.");
      return;
    }
    
    // Check if at least one tour location is entered
    const validLocations = tourLocations.filter(loc => loc.trim() !== '');
    if (validLocations.length === 0) {
      alert("최소 한 곳 이상의 관광 장소를 입력해주세요.");
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
        code: `TOUR-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        phone: formData.phone,
        service: "커스텀 관광 예약",
        date: formData.date,
        time: formData.time,
        pax: `성인${formData.adults}, 소인${formData.children}`,
        status: formData.paymentMethod === 'card' ? "예약확정" : "입금대기",
        locations: validLocations // Save custom locations
      };

      const existingReservations = JSON.parse(localStorage.getItem('polo_reservations') || '[]');
      localStorage.setItem('polo_reservations', JSON.stringify([newRes, ...existingReservations]));

      alert(`[${formData.name}] 님의 관광 코스 예약이 정상적으로 결제/접수되었습니다!\n선택하신 장소: ${validLocations.join(', ')}`);
      navigate('/admin'); // Or redirect to home
    };

    if (formData.paymentMethod === 'card') {
      alert("안전한 결제창으로 이동합니다.");
      if (window.IMP) {
        window.IMP.init('imp00000000'); // 테스트용 식별코드
        window.IMP.request_pay({
          pg: "html5_inicis", 
          pay_method: "card",
          merchant_uid: `mid_${new Date().getTime()}`,
          name: "여수 커스텀 관광 예약",
          amount: 150000, // 임의 관광 예약금
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
          src="/tour_banner.png" 
          alt="Tour Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        {/* Lighter overlay for brighter background */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Title */}
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Custom Tour</h1>
          <p className="text-white font-medium tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">고객 맞춤형 럭셔리 관광 예약</p>
        </div>

        {/* Main Form Box */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-12 border border-slate-100 flex flex-col gap-10">
          
          {/* 1. 기본 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="기본 정보" subtitle="원활한 연락을 위해 예약자 본인의 정보를 정확히 기입해주세요." />
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

          {/* 2. 일정 및 인원 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="일정 및 인원" subtitle="탑승하실 장소와 스케줄, 인원을 선택해주세요." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="w-full md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">탑승 장소</label>
                <select name="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all appearance-none cursor-pointer" required>
                  <option value="" disabled>탑승하실 마리나를 선택해주세요</option>
                  <option value="후포 펜타마린">후포 펜타마린</option>
                  <option value="이순신 마리나">이순신 마리나</option>
                  <option value="여수 엑스포 마리나">여수 엑스포 마리나</option>
                  <option value="수영만 요트경기장">수영만 요트경기장</option>
                </select>
              </div>
            </div>
            
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

          {/* 3. 관광 장소 (Dynamic List) */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="관광 코스 구성" subtitle="방문하고 싶은 장소나 코스를 직접 추가해 주세요." />
            
            <div className="space-y-4">
              {tourLocations.map((loc, index) => (
                <div key={index} className="flex items-center gap-3 animate-fade-in-up">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-gold-500" />
                    </div>
                    <input 
                      type="text" 
                      value={loc} 
                      onChange={(e) => handleLocationChange(index, e.target.value)} 
                      placeholder={`방문 장소 ${index + 1} (예: 오동도, 향일암, 해상케이블카 등)`} 
                      className="w-full bg-slate-50 border border-slate-200 rounded p-3 pl-10 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" 
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => removeLocation(index)}
                    disabled={tourLocations.length === 1}
                    className={`flex items-center justify-center w-11 h-11 rounded border ${tourLocations.length === 1 ? 'border-slate-200 text-slate-300 bg-slate-100 cursor-not-allowed' : 'border-red-200 text-red-500 hover:bg-red-50 transition-colors'}`}
                    title="장소 삭제"
                  >
                    <Minus size={20} />
                  </button>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={addLocation}
                className="mt-2 flex items-center gap-2 text-sm font-bold text-rivanavy-900 hover:text-gold-500 transition-colors bg-slate-100 px-4 py-2.5 rounded border border-slate-200 hover:border-gold-300 w-full justify-center"
              >
                <Plus size={18} /> 방문 장소 추가
              </button>
            </div>
          </section>

          {/* 4. 결제 방식 & 환불 계좌 */}
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

          {/* 5. 약관 동의 */}
          <section className="mb-4">
            <SectionTitle title="서비스 이용 동의" subtitle="필수 항목에 체크해 주셔야 예약이 확정됩니다." />
            <div className="space-y-4 py-2 border-slate-100">
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

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full mt-6 bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-5 rounded-lg transition-colors shadow-lg shadow-[#d4af37]/30 tracking-widest text-xl"
          >
            관광 예약 및 결제하기
          </button>

        </form>
      </div>
    </div>
  );
}
