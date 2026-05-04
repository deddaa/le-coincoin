import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.service";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [connected, setConnected] = useState(null);
  const navigate = useNavigate();

  const handlelogout= async ()=> {
    try {
      await api.post("/auth/logout");
      setConnected(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    api.get("/auth/me")
    .then(res => setConnected(res.data.user))
    .catch(() => setConnected(null))
  })



  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          Le <span className="text-blue-600">CoinCoin</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
          >
            Accueil
          </Link>

          {connected ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
              >
                Mon profil
              </Link>
              <button
                onClick={handlelogout}
                className="text-sm font-medium cursor-pointer hover:underline hover:text-blue-600 transition-all"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-500 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          <Link
            to="/"
            className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
          >
            Accueil
          </Link>

          {connected ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
              >
                Mon profil
              </Link>
              <button
                onClick={handlelogout}
                className="text-sm font-medium cursor-pointer hover:underline hover:text-blue-600 transition-all"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium hover:underline hover:text-blue-600 transition-all"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
