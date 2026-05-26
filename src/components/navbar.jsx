import React, { useState } from 'react'
import '../styles/navbar.css'
import { LuMenu, LuHouse, LuChartColumnBig, LuChartSpline, LuTrendingUp, LuSigma } from "react-icons/lu";

const Navbar = () => {

    const [mostrarMenu, setMostrarMenu] = useState(false)

    const toggleMenu = () => {
        setMostrarMenu(!mostrarMenu)
    }

    return (
        <nav>
            <div className="contenedor__nav">

                <div className={`seccion__navegador ${mostrarMenu ? 'activo' : 'oculto'}`}>
                    <div className="contenedor__icono">
                        <LuHouse className='icon' />
                        <span className="tooltip">Inicio</span>
                    </div>
                </div>

                <div className={`toogle_menu ${mostrarMenu ? 'activo_btn' : ''}`} onClick={toggleMenu}>
                    <LuMenu />
                </div>

                <div className={`seccion__navegador ${mostrarMenu ? 'activo' : 'oculto'}`}>
                    <div className="contenedor__icono">
                        <LuChartColumnBig className='icon' />
                        <span className="tooltip">Discretas</span>
                    </div>
                    <div className="contenedor__icono">
                        <LuChartSpline className='icon' />
                        <span className="tooltip">Continuas</span>
                    </div>
                    <div className="contenedor__icono">
                        <LuTrendingUp className='icon' />
                        <span className="tooltip">Ley de Grandes Números</span>
                    </div>
                    <div className="contenedor__icono">
                        <LuSigma className='icon' />
                        <span className="tooltip">Ley de Grandes Números</span>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar