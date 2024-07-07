import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PageLayout from "./Layouts/PageLayout";

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

import BookingDoctor from "./pages/PatientPages/BookingDoctor";
import BookingConfirm from "./pages/PatientPages/BookingConfirm";
import BookingSuccess from "./pages/PatientPages/BookingSuccess";

import { ScrollToTop } from "./pages/ScrollToTop";
import SearchPost from "./pages/SearchPost";
import SimilarPost from "./pages/SimilarPost";
import ResetPassword from "./pages/ResetPassword";
import PatientPage from "./pages/PatientPages/PatientPage";
import PageNotFound from "./pages/404";
function App() {
  return (
    <div>
      <Router>
        <ScrollToTop></ScrollToTop>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
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

            <Route path="/patient/:patientpage" element={<PatientPage />} />
            <Route path="/doctor/:doctorpage" element={<DoctorPage />} />
            <Route path="/admin/:adminpage" element={<AdminPage />} />
            
            <Route path="/booking/:doctorId" element={<BookingDoctor />} />
            <Route path="/booking/confirm" element={<BookingConfirm />} />
            <Route path="/booking/success" element={<BookingSuccess />} />
            <Route path="/search" element={<SearchPost />} />
          </Route>

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
