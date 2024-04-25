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
import DoctorDetail from "./pages/BookingDoctor";
import Booking from "./pages/Booking";
import Footer from "./Layouts/Footer";
import DoctorSchedule from "./pages/DoctorSchedule";
import Doctors from "./pages/Doctors";
import BookingDoctor from "./pages/BookingDoctor";
import Categories from "./pages/Categories";
function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/dashboard/:adminpage" exact element={<AdminPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/doctor/booking" element={<BookingDoctor />} />
          <Route path="/doctor/booking/confirm" element={<Booking />} />
          <Route path="/doctor/schedule" element={<DoctorSchedule />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
