import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, Heart } from 'lucide-react';

export default function ReservationNakhwa() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    phone: '010-',
    date: '',
    time: '',
    wishContent: '',
    
    // Checkboxes array for wishPaper
    wishPaper: ['none'], 
    
    // Radios
    wishCard: 'none',
    wishLantern: 'none',
    seatReservation: 'none',
    
    // Agreements and Refund
    agreePrivacy: false,
    agreeKakao: false,
    refundName: '',
    refundBank: '',
    refundAccount: '',
    paymentMethod: 'bank'
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const prices = {
    wishPaper: {
      none: 0,
      normal: 10000,
      gold: 30000,
      petNormal: 10000,
      petGold: 30000
    },
    wishCard: {
      none: 0,
      normal: 5000
    },
    wishLantern: {
      none: 0,
      normal: 10000
    },
    seatReservation: {
      none: 0,
      normal: 50000,
      vip: 100000
    }
  };

  useEffect(() => {
    let newTotal = 0;
    
    // Calculate wishPaper (multiple)
    formData.wishPaper.forEach(item => {
      newTotal += prices.wishPaper[item] || 0;
    });

    // Calculate radios
    newTotal += prices.wishCard[formData.wishCard] || 0;
    newTotal += prices.wishLantern[formData.wishLantern] || 0;
    newTotal += prices.seatReservation[formData.seatReservation] || 0;

    setTotalPrice(newTotal);
  }, [formData.wishPaper, formData.wishCard, formData.wishLantern, formData.seatReservation]);

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

    if (name === 'wishPaper') {
        setFormData(prev => {
            let newPapers = [...prev.wishPaper];
            
            if (value === 'none' && checked) {
                newPapers = ['none']; // if none is checked, uncheck everything else
            } else if (checked) {
                newPapers = newPapers.filter(p => p !== 'none'); // remove none if others are checked
                newPapers.push(value);
            } else {
                newPapers = newPapers.filter(p => p !== value);
                if (newPapers.length === 0) newPapers = ['none']; // default back to none
            }
            
            return { ...prev, wishPaper: newPapers };
        });
        return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.birthdate || formData.phone.length < 12 || !formData.date || !formData.time) {
      alert("필수 기본 정보 및 예약 일정을 빠짐없이 입력해주세요.");
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
        code: `NAKHWA-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        phone: formData.phone,
        service: `낙화 이벤트`,
        date: formData.date,
        time: formData.time,
        pax: `일반`,
        status: formData.paymentMethod === 'card' ? "예약확정" : "입금대기",
        amount: totalPrice
      };

      const existingReservations = JSON.parse(localStorage.getItem('polo_reservations') || '[]');
      localStorage.setItem('polo_reservations', JSON.stringify([newRes, ...existingReservations]));

      alert(`[${formData.name}] 님의 낙화 예약이 접수/결제되었습니다!\n결제 금액: ${totalPrice.toLocaleString()}원`);
      navigate('/admin');
    };

    if (formData.paymentMethod === 'card') {
        if (totalPrice === 0) {
            completeReservation();
            return;
        }

      alert("안전한 결제창으로 이동합니다.");
      if (window.IMP) {
        window.IMP.init('imp00000000');
        window.IMP.request_pay({
          pg: "html5_inicis", 
          pay_method: "card",
          merchant_uid: `mid_${new Date().getTime()}`,
          name: "낙화 이벤트 예약",
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

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] md:pt-[150px] pb-24 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1533596903259-3d1f04dbd1ea?q=100&w=2940&auto=format&fit=crop" 
          alt="Nakhwa Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Nakhwa Event</h1>
          <p className="text-white font-medium tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">낙화 이벤트 특별 예약</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-12 border border-slate-100 flex flex-col gap-10">
          
          {/* 1. 기본 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="기본 정보" subtitle="예약자 본인의 정보를 정확히 기입해주세요." />
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

          {/* 2. 예약 및 소원 작성 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="예약 및 소원 작성" subtitle="입장하실 일정과 정성껏 담을 소원을 적어주세요." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="w-full">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Calendar size={16}/> 입장 예약일</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none cursor-pointer text-slate-700" required />
              </div>
              <div className="w-full">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Clock size={16}/> 입장 시간</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 outline-none cursor-pointer text-slate-700" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Heart size={16} className="text-red-500"/> 소원 내용 작성</label>
              <textarea name="wishContent" value={formData.wishContent} onChange={handleChange} rows="4" placeholder="당신의 간절한 소원을 마음껏 적어주세요." className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none"></textarea>
            </div>
          </section>

          {/* 3. 유료 옵션 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="유료 옵션 선택" subtitle="원하시는 부가 서비스를 선택해 주세요. 선택 시 결제 금액에 자동 합산됩니다." />
            
            <div className="space-y-8">
              {/* 소원지 (체크박스 다중선택) */}
              <div>
                <h4 className="text-sm font-bold text-rivanavy-900 mb-3 bg-slate-100 p-2 rounded">소원지 (중복선택 가능)</h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="wishPaper" value="none" checked={formData.wishPaper.includes('none')} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">이용안함 (0원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="wishPaper" value="normal" checked={formData.wishPaper.includes('normal')} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">소원지 (10,000원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="wishPaper" value="gold" checked={formData.wishPaper.includes('gold')} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">황금소원지 (30,000원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="wishPaper" value="petNormal" checked={formData.wishPaper.includes('petNormal')} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">(펫)소원지 (10,000원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="wishPaper" value="petGold" checked={formData.wishPaper.includes('petGold')} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">(펫)황금소원지 (30,000원)</span>
                  </label>
                </div>
              </div>

              {/* 소원카드 (라디오 단일선택) */}
              <div>
                <h4 className="text-sm font-bold text-rivanavy-900 mb-3 bg-slate-100 p-2 rounded">소원카드</h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="wishCard" value="none" checked={formData.wishCard === 'none'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">이용안함 (0원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="wishCard" value="normal" checked={formData.wishCard === 'normal'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">소원카드 (5,000원)</span>
                  </label>
                </div>
              </div>

              {/* 소원등 (라디오 단일선택) */}
              <div>
                <h4 className="text-sm font-bold text-rivanavy-900 mb-3 bg-slate-100 p-2 rounded">소원등</h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="wishLantern" value="none" checked={formData.wishLantern === 'none'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">이용안함 (0원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="wishLantern" value="normal" checked={formData.wishLantern === 'normal'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">소원등 (10,000원)</span>
                  </label>
                </div>
              </div>

              {/* 좌석예약 (라디오 단일선택) */}
              <div>
                <h4 className="text-sm font-bold text-rivanavy-900 mb-3 bg-slate-100 p-2 rounded">좌석 예약</h4>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="seatReservation" value="none" checked={formData.seatReservation === 'none'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">이용안함 (0원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="seatReservation" value="normal" checked={formData.seatReservation === 'normal'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">일반석 (50,000원)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="seatReservation" value="vip" checked={formData.seatReservation === 'vip'} onChange={handleChange} className="accent-gold-500 w-4 h-4" />
                    <span className="text-sm text-slate-700">VIP석 (100,000원)</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* 총 결제 금액 계산기 */}
            <div className="mt-8 bg-slate-800 text-white p-6 rounded-lg shadow-inner flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-lg font-bold text-slate-300">총 결제 예정 금액</span>
                <div className="text-3xl font-bold text-gold-400">
                    {totalPrice.toLocaleString()} <span className="text-xl text-white font-normal">원</span>
                </div>
            </div>

          </section>

          {/* 4. 결제 관리 & 환불 정보 */}
          <section className="border-b border-slate-100 pb-10">
            <SectionTitle title="결제 관리 및 환불" subtitle="결제 방식을 선택하시고 환불용 계좌를 입력해주세요." />
            
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
                  <input type="text" value="취소 시 환불 정책 따름" disabled className="w-full bg-white border border-slate-200 rounded p-2.5 text-xs text-slate-400 cursor-not-allowed text-center font-bold" />
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
            </div>
          </section>

          {/* 5. 이용 동의 */}
          <section className="mb-4">
            <SectionTitle title="서비스 이용 동의" subtitle="필수 항목에 체크해 주셔야 예약이 확정됩니다." />
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
            낙화 예약 및 결제하기
          </button>

        </form>
      </div>
    </div>
  );
}
