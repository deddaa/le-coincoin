import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { setAccessToken } from "../../services/api.service";
import axios from "axios";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [connected, setConnected] = useState(null);
  const [search , setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/annonces?search=${search}`);
    setSearch("");
  }

  const handlelogout = async () => {
    try {
      await api.post("/auth/logout");
      setAccessToken(null);
      setConnected(null);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  const init = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/refresh",
        null,
        { withCredentials: true },
      );
      setAccessToken(data.accessToken);
      if (data.accessToken) {
        setConnected(true);
      }
    } catch (err) {
      console.error("ERREUR :", err.response?.status, err.response?.data);
      setConnected(null);
    }
  };

  init();
}, []);
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
          Le <span className="text-purple-600">CoinCoin</span>
        </Link>
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une annonce..."
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            <span>rechercher</span>
          </button>
        </form>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
          >
            Accueil
          </Link>

          {connected ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
              >
                Mon profil
              </Link>
              <button
                onClick={handlelogout}
                className="text-sm font-medium cursor-pointer hover:underline hover:text-purple-600 transition-all"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
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
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition-colors"
            >
              <span>rechercher</span>
            </button>
          </form>

          <Link
            to="/"
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
          >
            Accueil
          </Link>

          {connected ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
              >
                Mon profil
              </Link>
              <button
                onClick={handlelogout}
                className="text-sm font-medium cursor-pointer hover:underline hover:text-purple-600 transition-all"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm font-medium hover:underline hover:text-purple-600 transition-all"
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
