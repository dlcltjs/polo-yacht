import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-rivanavy-900 shadow-sm border border-slate-100">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-rivanavy-900 mb-2">관리자 로그인</h2>
        <p className="text-center text-slate-500 text-sm mb-8">시스템 접근을 위해 관리자 정보를 입력해 주세요.</p>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">아이디</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-rivanavy-900 focus:ring-1 focus:ring-rivanavy-900 transition-shadow bg-slate-50 focus:bg-white"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-rivanavy-900 focus:ring-1 focus:ring-rivanavy-900 transition-shadow bg-slate-50 focus:bg-white"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-rivanavy-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors duration-300 tracking-wide mt-2 shadow-md shadow-slate-300"
          >
            로그인
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-rivanavy-900 transition-colors flex items-center justify-center gap-2">
            <span>&larr;</span> 홈페이지로 돌아가기
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} POLO YACHT. All rights reserved.
      </div>
    </div>
  );
}
