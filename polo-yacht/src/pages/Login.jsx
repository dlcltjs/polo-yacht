import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-rivanavy-900 pt-[100px] md:pt-[130px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=100&w=2500" 
          alt="Login Background" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-[#00122e]/60 mix-blend-multiply"></div>
      </div>

      {/* Glassmorphism Login Box */}
      <div className="relative z-10 w-full max-w-[400px] mx-4 p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center my-10">
        
        {/* Logo and Subtitle */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-[0.2em] text-white mb-2 text-center drop-shadow-md">GUMGA</h1>
        <p className="text-xs font-light text-slate-200 mb-8 tracking-widest text-center opacity-90">
          당신만의 특별한 항해를 시작하세요
        </p>

        {/* Login Form */}
        <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input 
              type="email" 
              placeholder="이메일 아이디" 
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm"
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="비밀번호" 
              className="w-full bg-white border border-slate-200 rounded-md p-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm shadow-sm"
              required 
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-200 py-2 px-1">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="accent-[#d4af37]" />
              <span>로그인 상태 유지</span>
            </label>
            <a href="#" className="hover:text-white transition-colors">비밀번호 찾기</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#d4af37] text-white py-3.5 rounded-md font-bold tracking-widest hover:bg-[#b08e2d] transition-colors text-sm shadow-lg mt-2"
          >
            로그인
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center justify-between my-8 opacity-80">
          <span className="w-1/4 h-[1px] bg-white/20"></span>
          <span className="text-[10px] text-white/70 tracking-widest uppercase">또는 SNS 계정으로 로그인</span>
          <span className="w-1/4 h-[1px] bg-white/20"></span>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center gap-4 w-full">
          {/* Kakao Container */}
          <button title="카카오톡으로 로그인" className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center hover:scale-105 transition-transform shadow-md">
             <span className="font-black text-[#3C1E1E] text-lg">K</span>
          </button>
          
          {/* Naver Container */}
          <button title="네이버로 로그인" className="w-12 h-12 rounded-full bg-[#03C75A] flex items-center justify-center hover:scale-105 transition-transform shadow-md">
             <span className="font-black text-white text-lg font-sans">N</span>
          </button>

          {/* Google Container */}
          <button title="구글로 로그인" className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-md border border-gray-100">
             <span className="font-black text-blue-500 text-lg">G</span>
          </button>
        </div>

        <div className="mt-8 text-xs text-slate-300 tracking-wider">
          아직 회원이 아니신가요? <Link to="/signup" className="text-[#d4af37] ml-1 font-bold hover:underline">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
