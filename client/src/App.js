import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPages/AdminPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/admin/:adminpage" exact element={<AdminPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
