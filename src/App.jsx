import './App.css'

import Navbar from './components/navbar'
import Footer from './components/footer.jsx'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Inicio from "./pages/inicio.jsx";
import Discretas from "./pages/discretas.jsx";
import Continuas from "./pages/continuas.jsx";
import LeyGN from "./pages/LeyGN.jsx"
import TeoremaLC from "./pages/TeoremaLC.jsx"

function App() {

  return (

    <BrowserRouter basename="/proyecto_probabilidad">

      <Navbar />

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/discretas" element={<Discretas />} />

        <Route path="/continuas" element={<Continuas />} />

        <Route path="/LeyGN" element={<LeyGN />} />

        <Route path="/TeoremaLC" element={<TeoremaLC />} />

      </Routes>

      <Footer />

    </BrowserRouter>

  )
}

export default App