import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import List from './List.jsx'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <nav className="app-navigation" aria-label="Navegação principal">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/list">List</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/list" element={<List />} />
          <Route path="*" element={<p>Página não encontrada.</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>,
)
