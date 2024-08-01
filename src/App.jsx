import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Patients from "./pages/Pacientes/Patients";
import Navbar from "./components/Navbar";
import History from "./pages/Pacientes/History";
import Profile from "./pages/Profile/Profile";
import ClininalInfo from "./pages/ClinicalInfo/ClininalInfo";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Users from "./pages/Users/Users";

function App() {
  const token = localStorage.getItem("token") ? true : false;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/agenda"
          element={token ? <CalendarPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/inicio"
          element={token ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/pacientes"
          element={token ? <Patients /> : <Navigate to="/" replace />}
        />
        <Route
          path="/pacientes/historia-clinica"
          element={token ? <History /> : <Navigate to="/" replace />}
        />
        <Route
          path="/usuarios"
          element={token ? <Users /> : <Navigate to="/" replace />}
        />
        <Route
          path="usuarios/añadir"
          element={token ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/perfil"
          element={token ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route path="/info-clinica" element={<ClininalInfo />} />
        <Route path="/test" element={<CalendarPage />} />
        <Route path="/test/:id" element={<CalendarPage />} />
        <Route path="*" element={<p>404 page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;

