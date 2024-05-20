import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPages/AdminPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/PatientPages/Profile";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import BookingDoctor from "./pages/PatientPages/BookingDoctor";
import BookingConfirm from "./pages/PatientPages/BookingConfirm";
import BookingSuccess from "./pages/PatientPages/BookingSuccess";

// import DoctorSchedule from "./pages/DoctorPages/DoctorSchedule";
import Doctors from "./pages/Doctors";
import Categories from "./pages/Categories";
import Appointment from "./pages/PatientPages/Appointment";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import DoctorDetail from "./pages/DoctorDetail";
import DoctorPage from "./pages/DoctorPages/DoctorPage";
import { ScrollToTop } from "./pages/ScrollToTop";
function App() {
  return (
    <div>
      <Router>
        <ScrollToTop></ScrollToTop>
        <ToastContainer></ToastContainer>
        <Header></Header>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:doctorId" element={<DoctorDetail />} />

          <Route path="/admin/:adminpage" exact element={<AdminPage />} />
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/booking/:doctorId" element={<BookingDoctor />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
          <Route path="/booking/success" element={<BookingSuccess />} />

          {/* <Route path="/doctor/schedule" element={<DoctorSchedule />} /> */}
          <Route path="/doctor/:doctorpage" element={<DoctorPage />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
