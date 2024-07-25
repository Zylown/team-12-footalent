import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Diary from "./pages/Daily/Diary";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Patients from "./pages/Pacientes/Patients";
import Navbar from "./components/Navbar";
import History from "./pages/Pacientes/History";
import Profile from "./pages/Profile/Profile";
import ShiftManager from "./pages/ShiftManager/ShiftManager";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agenda" element={<ShiftManager />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/pacientes" element={<Patients />} />
        <Route path="/pacientes/historia-clinica" element={<History />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<p>404 page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;

