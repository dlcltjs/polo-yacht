import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Membership from './pages/Membership';
import Reservation from './pages/Reservation';
import Media from './pages/Media';
import Support from './pages/Support';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ReservationYacht from './pages/ReservationYacht';
import ReservationTour from './pages/ReservationTour';
import ReservationPet from './pages/ReservationPet';
import ReservationNakhwa from './pages/ReservationNakhwa';
import ReservationStay from './pages/ReservationStay';
import Notice from './pages/Notice';
import QA from './pages/QA';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Video from './pages/Video';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Website with Header & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="membership" element={<Membership />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="reservation/yacht" element={<ReservationYacht />} />
          <Route path="reservation/tour" element={<ReservationTour />} />
          <Route path="reservation/pet" element={<ReservationPet />} />
          <Route path="reservation/nakhwa" element={<ReservationNakhwa />} />
          <Route path="reservation/stay" element={<ReservationStay />} />
          <Route path="community/notice" element={<Notice />} />
          <Route path="community/qa" element={<QA />} />
          <Route path="community/contact" element={<Contact />} />
          <Route path="/gallery/photo" element={<Gallery />} />
          <Route path="/gallery/video" element={<Video />} />
          <Route path="media" element={<Media />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Admin Section (Isolated Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
