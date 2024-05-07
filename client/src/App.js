import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPages/AdminPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import BookingDoctor from "./pages/BookingDoctor";
import BookingConfirm from "./pages/BookingConfirm";
import DoctorSchedule from "./pages/DoctorSchedule";
import Doctors from "./pages/Doctors";
import Categories from "./pages/Categories";
import Appointment from "./pages/Appointment";
function App() {
  return (
    <div>
      <Router>
        <ToastContainer></ToastContainer>
        <Header></Header>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/admin/:adminpage" exact element={<AdminPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor/booking" element={<BookingDoctor />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
          <Route path="/doctor/schedule" element={<DoctorSchedule />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
