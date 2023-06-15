import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/Header/Header'
import Accueil from './pages/Accueil'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import Connexion from './pages/Connexion'
import Administration from './pages/Administration'
import Crud from './components/Admin/Crud'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Accueil />} />
        <Route path="menu" element={<Menu />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Connexion />} />
        <Route path="administration" element={<Administration />} />
        <Route path="edition" element={<Crud />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
