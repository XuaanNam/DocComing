import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import Doctors from "./pages/Doctors";
import Categories from "./pages/Categories";
import DoctorDetail from "./pages/DoctorDetail";

import AdminPage from "./pages/AdminPages/AdminPage";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import EditBlogAdmin from "./pages/AdminPages/EditBlog";

import DoctorPage from "./pages/DoctorPages/DoctorPage";
import EditBlogDoctor from "./pages/DoctorPages/EditBlog";

import Profile from "./pages/PatientPages/Profile";
import BookingDoctor from "./pages/PatientPages/BookingDoctor";
import BookingConfirm from "./pages/PatientPages/BookingConfirm";
import BookingSuccess from "./pages/PatientPages/BookingSuccess";
import Appointment from "./pages/PatientPages/Appointment";

import { ScrollToTop } from "./pages/ScrollToTop";
import SearchPost from "./pages/SearchPost";
import SimilarPost from "./pages/SimilarPost";
import ResetPassword from "./pages/ResetPassword";
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
          <Route path="/reset/:token" element={<ResetPassword />} />
          
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:doctorId" element={<DoctorDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:cgr" element={<SimilarPost />} />
          <Route path="/categories/:cgr/:similar" element={<SimilarPost />} />
          <Route path="/admin/update-post/:postId" element={<EditBlogAdmin />} />
          <Route path="/doctor/update-post/:postId" element={<EditBlogDoctor />} />
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/patient/appointment" element={<Appointment />} />

          <Route path="/admin/:adminpage" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/booking/:doctorId" element={<BookingDoctor />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
          <Route path="/booking/success" element={<BookingSuccess />} />
          <Route path="/search" element={<SearchPost />} />
          

          {/* <Route path="/doctor/schedule" element={<DoctorSchedule />} /> */}
          <Route path="/doctor/:doctorpage" element={<DoctorPage />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
