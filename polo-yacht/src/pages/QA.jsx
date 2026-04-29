import { useState, useEffect } from 'react';
import { Search, ChevronDown, Lock, Edit3, X } from 'lucide-react';

const initialQA = [
  {
    id: 1,
    title: '예약 취소 및 환불 절차 문의',
    author: '김지훈',
    date: '2026.04.28',
    content: '안녕하세요. 다음 주 요트 예약을 취소하고 싶은데 환불 절차가 어떻게 되는지 궁금합니다.\n위약금이 발생하는 기준일도 함께 알려주세요.',
    password: '1234',
    isSecret: true,
    status: '답변 대기',
    adminAnswer: ''
  },
  {
    id: 2,
    title: '강아지 동반 탑승 관련 문의 (대형견)',
    author: '이서윤',
    date: '2026.04.27',
    content: '프리미엄 펫 투어를 예약하려고 합니다.\n저희 집 강아지가 25kg 대형견인데, 요트 탑승에 제한이 없을까요?',
    password: '1234',
    isSecret: false,
    status: '답변 완료',
    adminAnswer: '안녕하세요, 이서윤 고객님. 폴로요트입니다.\n\n대형견도 문제없이 탑승 가능합니다! 요트 내 공간이 충분하며, 대형견을 위한 전용 구명조끼도 구비되어 있습니다.\n다만 예약 시 요청사항에 견종과 몸무게를 미리 기재해 주시면 더 원활한 준비가 가능합니다.\n\n감사합니다.'
  }
];

export default function QA() {
  const [qaList, setQaList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  
  // 비밀번호 프롬프트 모달 상태
  const [promptData, setPromptData] = useState({ isOpen: false, id: null, password: '' });
  // 인증 통과된 ID 목록 (새로고침 시 초기화)
  const [authenticatedIds, setAuthenticatedIds] = useState([]);
  
  // 글쓰기 모달 상태
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [writeForm, setWriteForm] = useState({
    title: '', author: '', password: '', content: '', isSecret: true
  });

  useEffect(() => {
    const storedQA = localStorage.getItem('polo_qa');
    if (!storedQA) {
      localStorage.setItem('polo_qa', JSON.stringify(initialQA));
      setQaList(initialQA);
    } else {
      setQaList(JSON.parse(storedQA));
    }
  }, []);

  const handleToggle = (qa) => {
    // 비밀글인데 인증되지 않았다면 모달 띄우기
    if (qa.isSecret && !authenticatedIds.includes(qa.id)) {
      setPromptData({ isOpen: true, id: qa.id, password: '' });
      return;
    }
    
    // 이미 인증되었거나 공개글이면 아코디언 열기
    setOpenIndex(openIndex === qa.id ? null : qa.id);
  };

  const handlePasswordSubmit = () => {
    const qa = qaList.find(q => q.id === promptData.id);
    if (qa && qa.password === promptData.password) {
      // 인증 성공
      setAuthenticatedIds([...authenticatedIds, qa.id]);
      setPromptData({ isOpen: false, id: null, password: '' });
      setOpenIndex(qa.id);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleWriteSubmit = () => {
    if (!writeForm.title.trim() || !writeForm.content.trim() || !writeForm.author.trim() || !writeForm.password.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    const newQA = {
      id: Date.now(),
      title: writeForm.title,
      author: writeForm.author,
      content: writeForm.content,
      password: writeForm.password,
      isSecret: writeForm.isSecret,
      date: formattedDate,
      status: '답변 대기',
      adminAnswer: ''
    };

    const updatedList = [newQA, ...qaList];
    setQaList(updatedList);
    localStorage.setItem('polo_qa', JSON.stringify(updatedList));
    
    setWriteModalOpen(false);
    setWriteForm({ title: '', author: '', password: '', content: '', isSecret: true });
    alert("질문이 성공적으로 등록되었습니다.");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-[110px] md:pt-[150px] pb-24 font-sans relative">
      {/* Background Banner */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden">
        <img 
          src="/catamaran_bg.png" 
          alt="QA Banner" 
          className="w-full h-full object-cover object-center antialiased [image-rendering:-webkit-optimize-contrast]"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Page Title */}
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl md:text-5xl font-script text-white mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">Q&A</h1>
          <p className="text-white font-medium tracking-widest text-sm md:text-base uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">무엇이든 물어보세요. 폴로요트가 답변해 드립니다.</p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 p-6 md:p-10 border border-slate-100">
          
          {/* Header Action */}
          <div className="flex justify-end mb-6 border-b border-slate-200 pb-4">
            <button 
              onClick={() => setWriteModalOpen(true)}
              className="flex items-center gap-2 bg-[#d4af37] text-white px-5 py-2.5 rounded-md font-bold shadow-md hover:bg-[#b8962d] transition-colors"
            >
              <Edit3 size={18} />
              질문 작성하기
            </button>
          </div>

          {/* QA List */}
          <div className="border-t-2 border-rivanavy-900 mt-2">
            {qaList.length > 0 ? (
              qaList.map((qa) => {
                const isOpen = openIndex === qa.id;
                return (
                  <div key={qa.id} className="border-b border-slate-200">
                    <button 
                      onClick={() => handleToggle(qa)}
                      className="w-full flex items-center justify-between py-5 px-2 md:px-4 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 md:gap-6 w-full pr-4">
                        <span className={`shrink-0 text-xs font-bold px-3 py-1 rounded-sm w-20 text-center ${
                          qa.status === '답변 완료' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          {qa.status}
                        </span>
                        <h3 className={`text-base md:text-lg font-medium truncate flex-grow flex items-center gap-2 ${isOpen ? 'text-[#d4af37] font-bold' : 'text-slate-800'}`}>
                          {qa.isSecret && <Lock size={16} className="text-slate-400 shrink-0" />}
                          {qa.title}
                        </h3>
                        <div className="shrink-0 text-sm text-slate-500 hidden md:flex items-center gap-4">
                          <span className="w-20 text-right truncate">{qa.author}</span>
                          <span className="w-24 text-right text-slate-400">{qa.date}</span>
                        </div>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#d4af37]' : ''}`} 
                      />
                    </button>
                    
                    {/* Mobile Author & Date */}
                    <div className="md:hidden px-4 pb-3 flex justify-between text-xs text-slate-400">
                      <span>{qa.author}</span>
                      <span>{qa.date}</span>
                    </div>

                    {/* Accordion Content */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100">
                        {/* Question */}
                        <div className="flex gap-4 mb-6">
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center shrink-0">Q</div>
                          <div className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap pt-1">
                            {qa.content}
                          </div>
                        </div>
                        
                        {/* Answer */}
                        {qa.status === '답변 완료' && (
                          <div className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-[#d4af37] text-white font-bold flex items-center justify-center shrink-0">A</div>
                            <div className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap pt-1">
                              {qa.adminAnswer}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-16 text-center text-slate-400">
                <p>등록된 질문이 없습니다.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Password Prompt Modal */}
      {promptData.isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full animate-fade-in-up">
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Lock size={20} className="text-[#d4af37]"/>
              비밀글 확인
            </h3>
            <p className="text-sm text-slate-500 mb-6">작성 시 입력한 비밀번호를 입력해 주세요.</p>
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={promptData.password}
              onChange={(e) => setPromptData({...promptData, password: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              className="w-full border border-slate-300 rounded p-3 mb-6 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setPromptData({ isOpen: false, id: null, password: '' })}
                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded font-bold hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handlePasswordSubmit}
                className="flex-1 py-3 bg-slate-800 text-white rounded font-bold hover:bg-black transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write Q&A Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 animate-fade-in-up flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">질문 작성하기</h3>
              <button onClick={() => setWriteModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-600 mb-1">작성자 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={writeForm.author}
                    onChange={(e) => setWriteForm({...writeForm, author: e.target.value})}
                    className="w-full border border-slate-300 rounded p-2.5 text-sm focus:border-[#d4af37] outline-none"
                    placeholder="성함 입력"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-600 mb-1">비밀번호 <span className="text-red-500">*</span></label>
                  <input 
                    type="password" 
                    value={writeForm.password}
                    onChange={(e) => setWriteForm({...writeForm, password: e.target.value})}
                    className="w-full border border-slate-300 rounded p-2.5 text-sm focus:border-[#d4af37] outline-none"
                    placeholder="숫자/문자 입력"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">제목 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={writeForm.title}
                  onChange={(e) => setWriteForm({...writeForm, title: e.target.value})}
                  className="w-full border border-slate-300 rounded p-2.5 text-sm focus:border-[#d4af37] outline-none"
                  placeholder="제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">내용 <span className="text-red-500">*</span></label>
                <textarea 
                  rows={8}
                  value={writeForm.content}
                  onChange={(e) => setWriteForm({...writeForm, content: e.target.value})}
                  className="w-full border border-slate-300 rounded p-2.5 text-sm focus:border-[#d4af37] outline-none resize-none"
                  placeholder="문의하실 내용을 상세히 적어주세요."
                ></textarea>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="isSecret"
                  checked={writeForm.isSecret}
                  onChange={(e) => setWriteForm({...writeForm, isSecret: e.target.checked})}
                  className="w-4 h-4 text-[#d4af37] border-slate-300 rounded focus:ring-[#d4af37]"
                />
                <label htmlFor="isSecret" className="text-sm font-bold text-slate-600 cursor-pointer flex items-center gap-1">
                  <Lock size={14} className="text-slate-400"/> 비밀글로 설정 (작성자와 관리자만 볼 수 있습니다)
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setWriteModalOpen(false)}
                className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded font-bold hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={handleWriteSubmit}
                className="px-8 py-2.5 bg-[#d4af37] text-white rounded font-bold hover:bg-[#b8962d] transition-colors shadow-md"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
