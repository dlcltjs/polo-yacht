import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    tier: 'Business'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new member record
    const newMember = {
      id: Date.now().toString().slice(-6), // Generate simplified ID
      name: formData.name,
      company: "개인가입", // Default company
      phone: formData.phone,
      email: formData.email,
      tier: formData.tier,
      date: new Date().toISOString().split('T')[0],
      status: "검토중"
    };

    // Save to localStorage
    const existingMembers = JSON.parse(localStorage.getItem('polo_members') || '[]');
    localStorage.setItem('polo_members', JSON.stringify([newMember, ...existingMembers]));

    alert('폴로요트의 회원이 되신 것을 환영합니다!');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-rivanavy-900 pt-[100px] md:pt-[130px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=100&w=2500" 
          alt="SignUp Background" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-[#00122e]/60 mix-blend-multiply"></div>
      </div>

      {/* Glassmorphism Sign Up Box */}
      <div className="relative z-10 w-full max-w-[450px] mx-4 p-8 md:p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center my-10">
        
        {/* Logo and Subtitle */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-[0.2em] text-white mb-2 text-center drop-shadow-md">GUMGA</h1>
        <p className="text-xs font-light text-slate-200 mb-8 tracking-widest text-center opacity-90">
          품격 있는 항해를 위한 회원 정보 입력
        </p>

        {/* Sign Up Form */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름 (실명)" 
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm"
              required 
            />
          </div>
          <div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일 아이디" 
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm"
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호" 
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm"
              required 
            />
          </div>
          <div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="연락처 ('-' 없이 입력)" 
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm"
              required 
            />
          </div>
          <div>
            <select 
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm appearance-none"
              required
            >
              <option value="" disabled>희망 멤버십 등급 선택</option>
              <option value="Business">Business (비지니스)</option>
              <option value="Premier">Premier (프리미어)</option>
              <option value="VIP">VIP (브이아이피)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#d4af37] text-white py-4 rounded-md font-bold tracking-widest hover:bg-[#b08e2d] transition-colors text-sm shadow-lg mt-4"
          >
            가입하기
          </button>
        </form>

        <div className="mt-8 text-xs text-slate-300 tracking-wider">
          이미 회원이신가요? <Link to="/login" className="text-[#d4af37] ml-1 font-bold hover:underline">로그인</Link>
        </div>
      </div>
    </div>
  );
}
