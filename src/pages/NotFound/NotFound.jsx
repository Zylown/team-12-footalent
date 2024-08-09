import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/iniciar-sesion");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="text-9xl font-extrabold text-gray-800 animate-bounce select-none">
          404
        </div>
        <div className="text-2xl md:text-3xl font-light mt-4 mb-8 select-none">
          Oops! Página no encontrada
        </div>
        <button
          onClick={handleGoHome}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Vuelve al inicio
        </button>
      </div>
    </div>
  );
}
