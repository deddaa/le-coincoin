import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Navbar from "./components/NavBar/Navbar.jsx"
import Annonce from './pages/Annonces.jsx'
import Footer from './components/layout/Footer.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/annonces/:id" element={<Annonce />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer companyName="Le CoinCoin" date={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}

export default App
