import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Patients from "./pages/Pacientes/Patients";
import History from "./pages/Pacientes/History";
import Profile from "./pages/Profile/Profile";
import ClininalInfo from "./pages/ClinicalInfo/ClininalInfo";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Users from "./pages/Users/Users";
import ResetPassword from "./sections/Login/ResetPassword";
import { useDecode } from "./hooks/useDecode";
import LandingPage from "./pages/Landing/LandingPage";
import Reasons from "./pages/Reasons/Reasons";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Support from "./pages/Support/Support";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  // const token = localStorage.getItem("token") ? true : false;
  const token = localStorage.getItem("token");
  const decoded = useDecode(token);

  // Verificar si el usuario tiene alguno de los siguientes roles
  const allRoles =
    decoded &&
    (decoded.role === "admin" ||
      decoded.role === "secretary" ||
      decoded.role === "dentist");

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route
          path="/agenda"
          element={allRoles ? <CalendarPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/inicio"
          element={allRoles ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/perfil/cambiar-contraseña"
          element={allRoles ? <ChangePassword /> : <Navigate to="/" replace />}
        />
        <Route
          path="/pacientes"
          element={allRoles ? <Patients /> : <Navigate to="/" replace />}
        />
        <Route
          path="/pacientes/historia-clinica/:id"
          element={allRoles ? <History /> : <Navigate to="/" replace />}
        />
        <Route
          path="/perfil/motivos"
          element={allRoles ? <Reasons /> : <Navigate to="/" replace />}
        />
        <Route
          path="/perfil/soporte"
          element={allRoles ? <Support /> : <Navigate to="/" replace />}
        />
        <Route
          path="/usuarios"
          element={
            decoded?.role === "admin" ? (
              <Users />
            ) : (
              <Navigate to="/inicio" replace />
            )
          }
        />
        <Route
          path="usuarios/añadir"
          element={
            decoded?.role === "admin" ? (
              <Register />
            ) : (
              <Navigate to="/inicio" replace />
            )
          }
        />
        <Route
          path="/perfil"
          element={allRoles ? <Profile /> : <Navigate to="/" replace />}
        />
        <Route path="/recuperar-contraseña" element={<ResetPassword />} />
        <Route
          path="/info-clinica"
          element={
            decoded?.role === "admin" ? (
              <ClininalInfo />
            ) : (
              <Navigate to="/inicio" replace />
            )
          }
        />
        <Route path="/test" element={<CalendarPage />} />
        <Route path="/test/:id" element={<CalendarPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
