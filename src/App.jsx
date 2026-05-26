import './App.css'

import Navbar from './components/navbar'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Inicio from "./pages/inicio.jsx";
import Discretas from "./pages/discretas.jsx";

function App() {

  return (

    <BrowserRouter basename="/proyecto_probabilidad">

      <Navbar />

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/discretas" element={<Discretas />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App