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
import DoctorDetail from "./pages/DoctorDetail";
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
          <Route path="/doctor" element={<DoctorDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
