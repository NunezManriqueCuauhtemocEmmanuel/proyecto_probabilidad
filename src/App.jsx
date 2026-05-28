import './App.css'

import Navbar from './components/navbar'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Inicio from "./pages/inicio.jsx";
import Discretas from "./pages/discretas.jsx";
import Continuas from "./pages/continuas.jsx";
import LeyGN from "./pages/LeyGN.jsx"

function App() {

  return (

    <BrowserRouter basename="/proyecto_probabilidad">

      <Navbar />

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/discretas" element={<Discretas />} />

        <Route path="/continuas" element={<Continuas />} />

        <Route path="/LeyGN" element={<LeyGN />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App