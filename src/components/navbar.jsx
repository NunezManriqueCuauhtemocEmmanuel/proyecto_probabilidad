import React, { useState } from 'react'
import '../styles/navbar.css'

import {
    LuMenu,
    LuHouse,
    LuChartColumnBig,
    LuChartSpline,
    LuTrendingUp,
    LuSigma
} from "react-icons/lu";

import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [mostrarMenu, setMostrarMenu] = useState(false)

    const toggleMenu = () => {
        setMostrarMenu(!mostrarMenu)
    }

    return (

        <nav>

            <div className="contenedor__nav">

                {/* IZQUIERDA */}

                <div className={`seccion__navegador ${mostrarMenu ? 'activo' : 'oculto'}`}>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "contenedor__icono activo"
                                : "contenedor__icono"
                        }
                    >
                        <LuHouse className='icon' />
                        <span className="tooltip">Inicio</span>
                    </NavLink>

                </div>

                <div
                    className={`toogle_menu ${mostrarMenu ? 'activo_btn' : ''}`}
                    onClick={toggleMenu}
                >
                    <LuMenu />
                </div>

                <div className={`seccion__navegador ${mostrarMenu ? 'activo' : 'oculto'}`}>

                    <NavLink
                        to="/discretas"
                        className={({ isActive }) =>
                            isActive
                                ? "contenedor__icono activo"
                                : "contenedor__icono"
                        }
                    >
                        <LuChartColumnBig className='icon' />
                        <span className="tooltip">Discretas</span>
                    </NavLink>

                    <NavLink
                        to="/continuas"
                        className={({ isActive }) =>
                            isActive
                                ? "contenedor__icono activo"
                                : "contenedor__icono"
                        }
                    >
                        <LuChartSpline className='icon' />
                        <span className="tooltip">Continuas</span>
                    </NavLink>

                    <NavLink
                        to="/leygn"
                        className={({ isActive }) =>
                            isActive
                                ? "contenedor__icono activo"
                                : "contenedor__icono"
                        }
                    >
                        <LuTrendingUp className='icon' />
                        <span className="tooltip">
                            Ley de Grandes Números
                        </span>
                    </NavLink>

                    <NavLink
                        to="/Teoremalc"
                        className={({ isActive }) =>
                            isActive
                                ? "contenedor__icono activo"
                                : "contenedor__icono"
                        }
                    >
                        <LuSigma className='icon' />
                        <span className="tooltip">
                            Teorema del Límite Central
                        </span>
                    </NavLink>

                </div>

            </div>

        </nav>

    )
}

export default Navbar