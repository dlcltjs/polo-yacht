import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { Download, Users, Calendar, BarChart3, ChevronRight, LogOut, Home } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('members');
  const [localMembers, setLocalMembers] = useState([]);
  const [localReservations, setLocalReservations] = useState([]);
  const [localNotices, setLocalNotices] = useState([]);
  const [localQA, setLocalQA] = useState([]);
  const [localContact, setLocalContact] = useState([]);
  const [localGallery, setLocalGallery] = useState([]);
  const [localVideo, setLocalVideo] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openQADropdown, setOpenQADropdown] = useState(null); // Q&A 열림 상태 (아코디언용)
  const [openContactDropdown, setOpenContactDropdown] = useState(null); // 상담문의 열림 상태
  const [answerForm, setAnswerForm] = useState({}); // 각 ID별 답변 입력값
  const [noticeForm, setNoticeForm] = useState({ category: '공지', title: '', content: '' });
  const [galleryForm, setGalleryForm] = useState({ category: '요트시설', title: '', url: '' });
  const [videoForm, setVideoForm] = useState({ category: '공식홍보', title: '', url: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const handleDocClick = () => setOpenDropdown(null);
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);

  useEffect(() => {
    try {
      const mems = JSON.parse(localStorage.getItem('polo_members') || '[]');
      setLocalMembers(mems);

      const res = JSON.parse(localStorage.getItem('polo_reservations') || '[]');
      setLocalReservations(res);

      const nts = JSON.parse(localStorage.getItem('polo_notices') || '[]');
      setLocalNotices(nts);

      const qas = JSON.parse(localStorage.getItem('polo_qa') || '[]');
      setLocalQA(qas);

      const conts = JSON.parse(localStorage.getItem('polo_contact') || '[]');
      setLocalContact(conts);

      const gals = JSON.parse(localStorage.getItem('polo_gallery') || '[]');
      setLocalGallery(gals);

      const vids = JSON.parse(localStorage.getItem('polo_videos') || '[]');
      setLocalVideo(vids);
    } catch (e) {
      console.error("Local storage parsing error in Admin.jsx", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleAddNotice = () => {
    if (!noticeForm.title.trim() || !noticeForm.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    const newNotice = {
      id: Date.now(),
      category: noticeForm.category,
      title: noticeForm.title,
      content: noticeForm.content,
      date: formattedDate
    };

    const updatedNotices = [newNotice, ...localNotices];
    setLocalNotices(updatedNotices);
    localStorage.setItem('polo_notices', JSON.stringify(updatedNotices));
    setNoticeForm({ category: '공지', title: '', content: '' });
    alert("공지사항이 성공적으로 등록되었습니다.");
  };

  const handleDeleteNotice = (id) => {
    if (window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      const updatedNotices = localNotices.filter(notice => notice.id !== id);
      setLocalNotices(updatedNotices);
      localStorage.setItem('polo_notices', JSON.stringify(updatedNotices));
    }
  };

  const handleSaveAnswer = (id) => {
    const answerText = answerForm[id];
    if (!answerText || !answerText.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    const updatedQA = localQA.map(qa => {
      if (qa.id === id) {
        return { ...qa, adminAnswer: answerText, status: '답변 완료' };
      }
      return qa;
    });

    setLocalQA(updatedQA);
    localStorage.setItem('polo_qa', JSON.stringify(updatedQA));
    alert("답변이 성공적으로 등록되었습니다.");
  };

  const handleToggleQA = (id, currentAnswer) => {
    setOpenQADropdown(openQADropdown === id ? null : id);
    if (openQADropdown !== id && !answerForm[id]) {
      setAnswerForm({ ...answerForm, [id]: currentAnswer || '' });
    }
  };

  const handleToggleContactStatus = (id, currentStatus) => {
    const newStatus = currentStatus === '대기 중' ? '확인 완료' : '대기 중';
    const updatedContacts = localContact.map(contact => {
      if (contact.id === id) {
        return { ...contact, status: newStatus };
      }
      return contact;
    });
    setLocalContact(updatedContacts);
    localStorage.setItem('polo_contact', JSON.stringify(updatedContacts));
  };

  const handleDeleteContact = (id) => {
    if (window.confirm("정말로 이 상담 문의 내역을 삭제하시겠습니까?")) {
      const updatedContacts = localContact.filter(contact => contact.id !== id);
      setLocalContact(updatedContacts);
      localStorage.setItem('polo_contact', JSON.stringify(updatedContacts));
    }
  };

  const handleAddGallery = () => {
    if (!galleryForm.title.trim() || !galleryForm.url.trim()) {
      alert("사진 제목과 이미지 URL을 모두 입력해주세요.");
      return;
    }
    
    // URL 형식 간단 검증
    if (!galleryForm.url.startsWith('http')) {
      alert("올바른 이미지 URL(http:// 또는 https:// 로 시작)을 입력해주세요.");
      return;
    }
    
    const newPhoto = {
      id: Date.now(),
      category: galleryForm.category,
      title: galleryForm.title,
      url: galleryForm.url
    };

    const updatedGallery = [newPhoto, ...localGallery];
    setLocalGallery(updatedGallery);
    localStorage.setItem('polo_gallery', JSON.stringify(updatedGallery));
    setGalleryForm({ category: '요트시설', title: '', url: '' });
    alert("사진이 성공적으로 갤러리에 등록되었습니다.");
  };

  const handleDeleteGallery = (id) => {
    if (window.confirm("정말로 이 사진을 갤러리에서 삭제하시겠습니까?")) {
      const updatedGallery = localGallery.filter(photo => photo.id !== id);
      setLocalGallery(updatedGallery);
      localStorage.setItem('polo_gallery', JSON.stringify(updatedGallery));
    }
  };

  const handleAddVideo = () => {
    if (!videoForm.title.trim() || !videoForm.url.trim()) {
      alert("영상 제목과 유튜브 URL을 모두 입력해주세요.");
      return;
    }
    
    // 유튜브 URL 형태 간단 검증
    if (!videoForm.url.includes('youtu')) {
      alert("올바른 유튜브 URL을 입력해주세요.");
      return;
    }
    
    const newVideo = {
      id: Date.now(),
      category: videoForm.category,
      title: videoForm.title,
      url: videoForm.url
    };

    const updatedVideo = [newVideo, ...localVideo];
    setLocalVideo(updatedVideo);
    localStorage.setItem('polo_videos', JSON.stringify(updatedVideo));
    setVideoForm({ category: '공식홍보', title: '', url: '' });
    alert("영상이 성공적으로 갤러리에 등록되었습니다.");
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm("정말로 이 영상을 삭제하시겠습니까?")) {
      const updatedVideo = localVideo.filter(video => video.id !== id);
      setLocalVideo(updatedVideo);
      localStorage.setItem('polo_videos', JSON.stringify(updatedVideo));
    }
  };

  // 더미 데이터 상태
  const [staticMembers, setStaticMembers] = useState([
    { id: 1, name: "이재용", company: "A그룹", phone: "010-1111-2222", email: "lee@example.com", tier: "VIP", date: "2026-03-21", status: "검토중" },
    { id: 2, name: "최태원", company: "B주식회사", phone: "010-3333-4444", email: "choi@abc.com", tier: "Premier", date: "2026-03-20", status: "승인완료" },
    { id: 3, name: "정의선", company: "C모터스", phone: "010-5555-6666", email: "jung@motors.com", tier: "Business", date: "2026-03-18", status: "가입완료" },
    { id: 4, name: "구광모", company: "D전자", phone: "010-7777-8888", email: "koo@elec.com", tier: "VIP", date: "2026-03-15", status: "승인완료" },
    { id: 5, name: "신동빈", company: "E쇼핑", phone: "010-9999-0000", email: "shin@retail.com", tier: "Business", date: "2026-03-10", status: "거절" }
  ]);

  const allApplications = [...localMembers, ...staticMembers];

  const updateStatus = (id, newStatus) => {
    const memIndex = localMembers.findIndex(m => m.id === id);
    if (memIndex !== -1) {
      const newLocal = [...localMembers];
      newLocal[memIndex].status = newStatus;
      setLocalMembers(newLocal);
      localStorage.setItem('polo_members', JSON.stringify(newLocal));
    } else {
      const statIndex = staticMembers.findIndex(m => m.id === id);
      if (statIndex !== -1) {
        const newStatic = [...staticMembers];
        newStatic[statIndex].status = newStatus;
        setStaticMembers(newStatic);
      }
    }
    setOpenDropdown(null);
  };

  const [staticReservations, setStaticReservations] = useState([
    { id: 101, code: "BKG-48291", name: "김사랑", phone: "010-1234-5678", service: "폴로요트", date: "2026-04-10", time: "14:00", pax: "성인2", status: "예약확정" },
    { id: 102, code: "BKG-23910", name: "박효신", phone: "010-2345-6789", service: "펫로얄", date: "2026-04-12", time: "10:00", pax: "성인2, 소인1", status: "입금대기" },
    { id: 103, code: "BKG-99212", name: "아이유", phone: "010-3456-7890", service: "바라기낙화", date: "2026-04-15", time: "20:00", pax: "성인4", status: "예약확정" },
    { id: 104, code: "BKG-10101", name: "송강호", phone: "010-9988-7766", service: "폴로요트", date: "2026-04-20", time: "18:00", pax: "성인8", status: "예약확정" }
  ]);

  const allReservations = [...localReservations, ...staticReservations];

  const downloadExcel = () => {
    // Worksheet 생성 (JSON 데이터로)
    const ws = XLSX.utils.json_to_sheet(allApplications);
    // 컬럼 너비 조정
    ws['!cols'] = [
      { wch: 8 }, { wch: 12 }, { wch: 15 }, { wch: 15 }, 
      { wch: 22 }, { wch: 12 }, { wch: 15 }, { wch: 10 }
    ];
    // Workbook 생성
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "멤버십_신청내역");
    // 파일 다운로드 브라우저 트리거
    XLSX.writeFile(wb, "PoloYacht_Membership_List.xlsx");
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen pb-24 font-sans">
      {/* Admin Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm relative">
        <div className="font-bold text-xl text-rivanavy-900 tracking-wider">Polo Yacht <span className="text-slate-400 font-normal">| Admin Workspace</span></div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleGoHome} 
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-rivanavy-900 transition-colors rounded-lg hover:bg-slate-50 font-bold"
          >
            <Home size={16} />
            <span>홈페이지로 돌아가기</span>
          </button>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-5 py-2 text-sm bg-rivanavy-900 text-white hover:bg-slate-800 transition-colors rounded-lg shadow-sm font-bold"
          >
            <LogOut size={16} />
            <span>로그아웃</span>
          </button>
        </div>
      </nav>

      <div className="p-4 md:p-8">
      {/* Admin Header */}
      <div className="bg-navy-950 text-rivanavy-900 font-medium py-12 px-4 shadow-md shadow-slate-200/50 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wider text-gold-400 mb-2">SYSTEM DASHBOARD</h1>
            <p className="text-slate-500">폴로요트 관리자 통합 시스템</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white border border-slate-100 shadow-sm rounded-xl px-6 py-3 rounded-full border border-slate-200 font-mono text-sm shadow-inner">
            <span className="text-slate-500">Admin Account: </span><span className="text-rivanavy-900 font-bold font-bold">master_admin</span>
            <span className="mx-4 text-slate-600">|</span>
            <span className="text-slate-600">2026-03-21</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 shadow-md shadow-slate-200/50 border-l-4 border-blue-500 flex items-center justify-between hover:shadow-md shadow-slate-200/50 transition-shadow">
            <div>
              <p className="text-slate-500 text-sm font-bold mb-1">신규 멤버십 신청</p>
              <h3 className="text-3xl font-bold text-rivanavy-900 font-medium">{12 + localMembers.length}<span className="text-sm font-normal text-slate-500 ml-1">건</span></h3>
            </div>
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
              <Users size={28} />
            </div>
          </div>
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 shadow-md shadow-slate-200/50 border-l-4 border-green-500 flex items-center justify-between hover:shadow-md shadow-slate-200/50 transition-shadow">
            <div>
              <p className="text-slate-500 text-sm font-bold mb-1">금월 예약 확정 건수</p>
              <h3 className="text-3xl font-bold text-rivanavy-900 font-medium">{48 + localReservations.length}<span className="text-sm font-normal text-slate-500 ml-1">건</span></h3>
            </div>
            <div className="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
              <Calendar size={28} />
            </div>
          </div>
          <div className="bg-white shadow-sm border border-slate-100 rounded-xl p-6 shadow-md shadow-slate-200/50 border-l-4 border-amber-500 flex items-center justify-between hover:shadow-md shadow-slate-200/50 transition-shadow">
            <div>
              <p className="text-slate-500 text-sm font-bold mb-1">예상 누적 매출</p>
              <h3 className="text-3xl font-bold text-rivanavy-900 font-medium justify-end items-end flex"><span className="text-xl font-normal text-slate-500 mr-2 pb-1">₩</span>52M</h3>
            </div>
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
              <BarChart3 size={28} />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white shadow-sm border border-slate-100 rounded-xl shadow-lg border border-slate-200">
          
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'members' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('members')}
            >
              온라인 멤버십 신청 대기열
            </button>
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'reservations' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('reservations')}
            >
              실시간 예약 현황
            </button>
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'notices' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('notices')}
            >
              공지사항 관리
            </button>
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'qa' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('qa')}
            >
              Q&A 관리
            </button>
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'contact' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('contact')}
            >
              상담문의 관리
            </button>
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'gallery' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('gallery')}
            >
              사진 관리
            </button>
            <button 
              className={`px-8 py-5 font-bold tracking-wide transition-colors ${activeTab === 'video' ? 'bg-white shadow-sm border border-slate-100 rounded-xl text-rivanavy-900 font-medium border-t-4 border-t-gold-500 border-x border-x-slate-200 shadow-[0_4px_0_0_white] relative z-10 -mb-[1px]' : 'text-slate-500 hover:text-rivanavy-900 font-medium hover:bg-slate-100'}`}
              onClick={() => setActiveTab('video')}
            >
              영상 관리
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'members' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">회원가입 승인 관리</h2>
                  <button 
                    onClick={downloadExcel}
                    className="flex items-center space-x-2 bg-green-600 text-rivanavy-900 font-medium px-5 py-2.5 rounded shadow-md shadow-slate-200/50 hover:bg-green-700 transition-colors tracking-wide text-sm font-bold"
                  >
                    <Download size={18} />
                    <span>목록 엑셀 다운로드 (.xlsx)</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded border border-slate-200 shadow-md shadow-slate-200/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4 font-bold">ID</th>
                        <th className="p-4 font-bold">이름 (소속)</th>
                        <th className="p-4 font-bold">연락처 / 이메일</th>
                        <th className="p-4 font-bold">희망 등급</th>
                        <th className="p-4 font-bold">신청일자</th>
                        <th className="p-4 font-bold">상태</th>
                        <th className="p-4 font-bold text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {allApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-slate-500 font-mono font-bold">#{app.id}</td>
                          <td className="p-4 font-bold text-rivanavy-900 font-medium">{app.name} <span className="text-slate-500 font-normal ml-1">({app.company})</span></td>
                          <td className="p-4 text-slate-600">
                            {app.phone}<br/><span className="text-slate-500 text-xs">{app.email}</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-sm ${app.tier === 'VIP' ? 'bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium shadow-md shadow-slate-200/50' : app.tier === 'Premier' ? 'bg-gold-500 text-navy-950 shadow-md shadow-slate-200/50' : 'bg-slate-200 text-rivanavy-900 font-medium/80 border border-slate-300'}`}>
                              {app.tier}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500 font-mono">{app.date}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center text-xs font-bold ${app.status === '승인완료' || app.status === '가입완료' ? 'text-green-600' : app.status === '거절' ? 'text-red-500' : 'text-amber-500'}`}>
                              <span className={`w-2 h-2 rounded-full mr-2 ${app.status === '승인완료' || app.status === '가입완료' ? 'bg-green-500' : app.status === '거절' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-4 text-center relative">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === app.id ? null : app.id); }}
                              className="text-slate-500 hover:text-rivanavy-900 font-medium bg-slate-100 hover:bg-slate-200 rounded p-1.5 transition-colors inline-flex border border-slate-200"
                            >
                              <ChevronRight size={18} className={`transition-transform ${openDropdown === app.id ? 'rotate-90' : ''}`} />
                            </button>
                            
                            {openDropdown === app.id && (
                              <div className="absolute right-8 top-10 mt-1 w-28 bg-white rounded-md shadow-xl border border-slate-200 z-50 py-1 overflow-hidden text-left" onClick={(e) => e.stopPropagation()}>
                                <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-green-600 hover:bg-slate-50 transition-colors" onClick={() => updateStatus(app.id, '승인완료')}>승인완료</button>
                                <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-amber-500 hover:bg-slate-50 transition-colors" onClick={() => updateStatus(app.id, '검토중')}>검토중</button>
                                <button className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-slate-50 transition-colors" onClick={() => updateStatus(app.id, '거절')}>거절</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">실시간 요트 예약 리스트</h2>
                  <div className="flex space-x-2">
                    <input type="date" className="border border-slate-300 px-3 py-2 text-sm text-slate-600 focus:outline-none focus:border-gold-500 bg-slate-50" />
                    <button className="bg-white border border-slate-100 shadow-sm rounded-xl text-rivanavy-900 font-medium px-5 py-2 text-sm font-bold hover:bg-gold-500 hover:text-navy-950 transition-colors tracking-wide">조회 🔍</button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded border border-slate-200 shadow-md shadow-slate-200/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4 font-bold border-b">예약번호 (BKG)</th>
                        <th className="p-4 font-bold border-b">예약자명 / 연락처</th>
                        <th className="p-4 font-bold border-b">투어 서비스 구분</th>
                        <th className="p-4 font-bold border-b">예약 일자 및 시간</th>
                        <th className="p-4 font-bold border-b">총 인원</th>
                        <th className="p-4 font-bold border-b">진행상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {allReservations.map((res) => (
                        <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-rivanavy-900 font-medium">{res.code}</td>
                          <td className="p-4 font-bold text-rivanavy-900 font-medium/90">{res.name} <span className="text-slate-500 font-normal ml-2">{res.phone}</span></td>
                          <td className="p-4 font-medium text-rivanavy-900 font-medium flex items-center">
                            <span className="w-2 h-2 rounded-full bg-gold-500 mr-2"></span>{res.service}
                          </td>
                          <td className="p-4 font-mono text-slate-600">{res.date} <span className="text-slate-600 mx-2">|</span> <span className="font-bold text-rivanavy-900 font-medium">{res.time}</span></td>
                          <td className="p-4 text-slate-600 font-medium">{res.pax}</td>
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1.5 text-xs font-bold rounded ${res.status === '예약확정' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                              {res.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'notices' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">공지사항 관리</h2>
                </div>

                <div className="mb-10 bg-slate-50 p-6 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-4">새 공지사항 작성</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <select 
                        value={noticeForm.category}
                        onChange={(e) => setNoticeForm({...noticeForm, category: e.target.value})}
                        className="border border-slate-300 rounded p-2 text-sm focus:border-gold-500 outline-none"
                      >
                        <option value="공지">공지</option>
                        <option value="안내">안내</option>
                        <option value="이벤트">이벤트</option>
                      </select>
                      <input 
                        type="text" 
                        placeholder="제목을 입력하세요" 
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})}
                        className="flex-grow border border-slate-300 rounded p-2 text-sm focus:border-gold-500 outline-none"
                      />
                    </div>
                    <textarea 
                      placeholder="내용을 입력하세요" 
                      rows={5}
                      value={noticeForm.content}
                      onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})}
                      className="w-full border border-slate-300 rounded p-2 text-sm focus:border-gold-500 outline-none resize-y"
                    ></textarea>
                    <button 
                      onClick={handleAddNotice}
                      className="bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-3 rounded transition-colors self-end px-8 shadow-md shadow-[#d4af37]/30"
                    >
                      공지사항 등록
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-700 mb-4">등록된 공지사항 목록</h3>
                <div className="overflow-x-auto rounded border border-slate-200 shadow-md shadow-slate-200/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4 font-bold border-b w-20">분류</th>
                        <th className="p-4 font-bold border-b">제목</th>
                        <th className="p-4 font-bold border-b w-32">등록일</th>
                        <th className="p-4 font-bold border-b w-20 text-center">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {localNotices.length > 0 ? localNotices.map((notice) => (
                        <tr key={notice.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                              notice.category === '공지' ? 'bg-red-50 text-red-600 border border-red-100' :
                              notice.category === '안내' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                              'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              {notice.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-rivanavy-900 font-medium">{notice.title}</td>
                          <td className="p-4 font-mono text-slate-600">{notice.date}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="text-red-500 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors"
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-slate-400">등록된 공지사항이 없습니다.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'qa' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">1:1 고객 Q&A 관리</h2>
                </div>

                <div className="overflow-x-auto rounded border border-slate-200 shadow-md shadow-slate-200/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4 font-bold border-b w-24 text-center">상태</th>
                        <th className="p-4 font-bold border-b">제목</th>
                        <th className="p-4 font-bold border-b w-32">작성자</th>
                        <th className="p-4 font-bold border-b w-32">등록일</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {localQA.length > 0 ? localQA.map((qa) => (
                        <React.Fragment key={qa.id}>
                          <tr 
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => handleToggleQA(qa.id, qa.adminAnswer)}
                          >
                            <td className="p-4 text-center">
                              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-sm w-20 text-center ${
                                qa.status === '답변 완료' ? 'bg-slate-800 text-white' : 'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}>
                                {qa.status}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-rivanavy-900 font-medium flex items-center gap-2">
                              {qa.isSecret && <span className="text-red-500 font-bold text-xs border border-red-200 bg-red-50 px-1 rounded">비밀글</span>}
                              {qa.title}
                            </td>
                            <td className="p-4 text-slate-700 font-medium">{qa.author}</td>
                            <td className="p-4 font-mono text-slate-600">{qa.date}</td>
                          </tr>
                          
                          {/* Accordion Detail Area */}
                          {openQADropdown === qa.id && (
                            <tr className="bg-slate-50">
                              <td colSpan="4" className="p-0 border-b-2 border-[#d4af37]">
                                <div className="p-6 md:p-8 animate-fade-in-up">
                                  {/* User Question Area */}
                                  <div className="mb-6 bg-white p-5 rounded border border-slate-200 shadow-sm">
                                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center">Q</div>
                                      고객 문의 내용
                                      {qa.isSecret && <span className="text-xs font-normal text-slate-400 ml-2">(PW: {qa.password})</span>}
                                    </h4>
                                    <div className="text-slate-600 leading-relaxed whitespace-pre-wrap ml-8 text-sm">
                                      {qa.content}
                                    </div>
                                  </div>
                                  
                                  {/* Admin Answer Area */}
                                  <div className="bg-white p-5 rounded border border-[#d4af37] shadow-sm">
                                    <h4 className="font-bold text-[#d4af37] mb-3 flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-[#d4af37] text-white text-xs flex items-center justify-center">A</div>
                                      관리자 답변 작성
                                    </h4>
                                    <textarea 
                                      rows={5}
                                      value={answerForm[qa.id] || ''}
                                      onChange={(e) => setAnswerForm({ ...answerForm, [qa.id]: e.target.value })}
                                      placeholder="고객에게 전달할 답변을 입력하세요."
                                      className="w-full border border-slate-300 rounded p-3 text-sm focus:border-[#d4af37] outline-none resize-y mb-3 bg-slate-50"
                                    ></textarea>
                                    <div className="flex justify-end">
                                      <button 
                                        onClick={() => handleSaveAnswer(qa.id)}
                                        className="bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-2 px-6 rounded transition-colors shadow-md"
                                      >
                                        답변 등록 / 수정
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )) : (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-slate-400">등록된 Q&A가 없습니다.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">B2B 및 VIP 상담문의 관리</h2>
                </div>

                <div className="overflow-x-auto rounded border border-slate-200 shadow-md shadow-slate-200/50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-200">
                        <th className="p-4 font-bold border-b w-24 text-center">상태</th>
                        <th className="p-4 font-bold border-b">문의 유형</th>
                        <th className="p-4 font-bold border-b">회사/담당자</th>
                        <th className="p-4 font-bold border-b w-32">등록일</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {localContact.length > 0 ? localContact.map((contact) => (
                        <React.Fragment key={contact.id}>
                          <tr 
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => setOpenContactDropdown(openContactDropdown === contact.id ? null : contact.id)}
                          >
                            <td className="p-4 text-center">
                              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-sm w-20 text-center ${
                                contact.status === '확인 완료' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-100'
                              }`}>
                                {contact.status}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-rivanavy-900 font-medium">{contact.type}</td>
                            <td className="p-4 text-slate-700">
                              <span className="font-bold">{contact.name}</span>
                              {contact.company && <span className="text-slate-500 text-xs ml-2">({contact.company})</span>}
                            </td>
                            <td className="p-4 font-mono text-slate-600">{contact.date}</td>
                          </tr>
                          
                          {/* Accordion Detail Area */}
                          {openContactDropdown === contact.id && (
                            <tr className="bg-slate-50">
                              <td colSpan="4" className="p-0 border-b-2 border-slate-200">
                                <div className="p-6 md:p-8 animate-fade-in-up">
                                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-b border-slate-100 pb-6">
                                      <div>
                                        <span className="block text-slate-400 font-bold mb-1">연락처</span>
                                        <span className="text-slate-700 font-bold">{contact.phone}</span>
                                      </div>
                                      <div>
                                        <span className="block text-slate-400 font-bold mb-1">이메일</span>
                                        <span className="text-slate-700 font-bold">{contact.email}</span>
                                      </div>
                                      <div className="md:col-span-2">
                                        <span className="block text-slate-400 font-bold mb-1">예상 일정 및 인원</span>
                                        <span className="text-slate-700">{contact.schedulePax || '미기재'}</span>
                                      </div>
                                    </div>

                                    <div>
                                      <span className="block text-slate-400 font-bold mb-2">상세 문의 내용</span>
                                      <div className="bg-slate-50 p-4 rounded text-slate-600 leading-relaxed whitespace-pre-wrap text-sm border border-slate-100">
                                        {contact.content}
                                      </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                      <button 
                                        onClick={() => handleDeleteContact(contact.id)}
                                        className="px-5 py-2 text-sm font-bold text-red-500 bg-red-50 border border-red-100 rounded hover:bg-red-100 transition-colors"
                                      >
                                        삭제
                                      </button>
                                      <button 
                                        onClick={() => handleToggleContactStatus(contact.id, contact.status)}
                                        className={`px-5 py-2 text-sm font-bold rounded text-white transition-colors shadow-sm ${
                                          contact.status === '대기 중' 
                                            ? 'bg-green-600 hover:bg-green-700' 
                                            : 'bg-slate-400 hover:bg-slate-500'
                                        }`}
                                      >
                                        {contact.status === '대기 중' ? '확인 완료 처리' : '대기 중으로 변경'}
                                      </button>
                                    </div>

                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )) : (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-slate-400">접수된 상담문의가 없습니다.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">갤러리 사진 관리</h2>
                </div>

                <div className="mb-10 bg-slate-50 p-6 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-4 text-sm">새 사진 등록 (URL 입력 방식)</h3>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <select 
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                      className="w-full md:w-auto border border-slate-300 rounded p-3 text-sm focus:border-gold-500 outline-none shrink-0"
                    >
                      <option value="요트시설">요트시설</option>
                      <option value="펫투어">펫투어</option>
                      <option value="이벤트">이벤트</option>
                      <option value="석양">석양</option>
                    </select>
                    <div className="w-full flex-grow flex flex-col gap-3">
                      <input 
                        type="text" 
                        placeholder="사진 제목 (예: 프리미엄 요트 내부 전경)" 
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                        className="w-full border border-slate-300 rounded p-3 text-sm focus:border-gold-500 outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="이미지 URL 주소 (https://... 형식의 링크 입력)" 
                        value={galleryForm.url}
                        onChange={(e) => setGalleryForm({...galleryForm, url: e.target.value})}
                        className="w-full border border-slate-300 rounded p-3 text-sm focus:border-gold-500 outline-none font-mono"
                      />
                    </div>
                    <button 
                      onClick={handleAddGallery}
                      className="w-full md:w-auto bg-[#d4af37] hover:bg-[#b8962d] text-white font-bold py-3 px-8 rounded transition-colors shadow-md shrink-0 h-[106px]"
                    >
                      사진 등록
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">
                    * 로컬 스토리지 용량 초과 에러를 방지하기 위해, 원본 파일 첨부 대신 고화질 이미지가 저장된 **웹 주소(URL)**를 입력해주세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {localGallery.length > 0 ? localGallery.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden bg-slate-100 relative">
                        <img 
                          src={photo.url} 
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                          {photo.category}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h4 className="font-bold text-slate-800 text-sm mb-4 line-clamp-2 flex-grow">{photo.title}</h4>
                        <button 
                          onClick={() => handleDeleteGallery(photo.id)}
                          className="w-full py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-16 text-center text-slate-400 border border-dashed border-slate-300 rounded-xl">
                      등록된 갤러리 사진이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-rivanavy-900 font-medium mb-4 md:mb-0">유튜브 영상 관리</h2>
                </div>

                <div className="mb-10 bg-slate-50 p-6 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-4 text-sm">새 영상 등록 (유튜브 링크)</h3>
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <select 
                      value={videoForm.category}
                      onChange={(e) => setVideoForm({...videoForm, category: e.target.value})}
                      className="w-full md:w-auto border border-slate-300 rounded p-3 text-sm focus:border-red-500 outline-none shrink-0"
                    >
                      <option value="공식홍보">공식홍보</option>
                      <option value="체험후기">체험후기</option>
                      <option value="이벤트">이벤트</option>
                    </select>
                    <div className="w-full flex-grow flex flex-col gap-3">
                      <input 
                        type="text" 
                        placeholder="영상 제목 (예: 폴로요트 소개 영상)" 
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                        className="w-full border border-slate-300 rounded p-3 text-sm focus:border-red-500 outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="유튜브 URL 주소 (예: https://www.youtube.com/watch?v=...)" 
                        value={videoForm.url}
                        onChange={(e) => setVideoForm({...videoForm, url: e.target.value})}
                        className="w-full border border-slate-300 rounded p-3 text-sm focus:border-red-500 outline-none font-mono"
                      />
                    </div>
                    <button 
                      onClick={handleAddVideo}
                      className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-colors shadow-md shrink-0 h-[106px]"
                    >
                      영상 등록
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {localVideo.length > 0 ? localVideo.map((video) => {
                    const getYouTubeVideoId = (url) => {
                      if (!url) return null;
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                      const match = url.match(regExp);
                      return (match && match[2].length === 11) ? match[2] : null;
                    };
                    const videoId = getYouTubeVideoId(video.url);
                    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/catamaran_bg.png';
                    
                    return (
                      <div key={video.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-slate-900 relative">
                          <img 
                            src={thumbnailUrl} 
                            alt={video.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-12 h-12 rounded-full bg-red-600/80 text-white flex items-center justify-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                          </div>
                          <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                            {video.category}
                          </span>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h4 className="font-bold text-slate-800 text-sm mb-4 line-clamp-2 flex-grow">{video.title}</h4>
                          <button 
                            onClick={() => handleDeleteVideo(video.id)}
                            className="w-full py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="col-span-full py-16 text-center text-slate-400 border border-dashed border-slate-300 rounded-xl">
                      등록된 유튜브 영상이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
