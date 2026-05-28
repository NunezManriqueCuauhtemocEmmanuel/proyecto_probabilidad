import '../App.css';

import {
    LuChartScatter,
    LuCalculator,
    LuGitCompareArrows,
    LuInfinity
} from "react-icons/lu";

const Inicio = () => {

    return (
        <>
            <main>
                <div className="main_titulo">
                    <h1>datara</h1>
                    <h2>Simula y comprende las <span className='blue'>distribuciones</span> de <span className='yellow'>probabilidad</span></h2>
                    <h3>Genera datos aleatorios, ajusta parámetros en tiempo real y compara tus resultados simulados contra el modelo teórico ... <span className="blue">todo en un solo lugar</span>.</h3>
                </div>
            </main>

            <section className="acciones">
                <div className="contenedor__acciones">
                    <div className="accion">
                        <h3>8</h3>
                        <h4>distribuciones</h4>
                    </div>
                    <div className="accion">
                        <h3 className='blue'>5</h3>
                        <h4>discretas</h4>
                    </div>
                    <div className="accion">
                        <h3 className='yellow'>3</h3>
                        <h4>continuas</h4>
                    </div>
                    <div className="accion">
                        <h3><LuInfinity /></h3>
                        <h4>simulaciones</h4>
                    </div>
                </div>
            </section>

            <section className="contenedor__contenido">
                <div className="contenedor__instrucciones">
                    <h3>
                        En este proyecto permite simular,
                        analizar y visualizar diferentes
                        distribuciones de probabilidad
                        mediante la generación de datos aleatorios.
                    </h3>
                    <h4>¿Qué puedes hacer aqui?</h4>
                    <p>
                        El propósito es relacionar los conceptos
                        sobre distribuciones con una implementación
                        computacional.
                    </p>
                    <div className="contenedor__herramientas">
                        <div className="herramienta">
                            <div className="contenedor_herramienta">
                                <LuChartScatter />
                            </div>
                            <h5>Observar sus cambios gráficos</h5>
                        </div>
                        <div className="herramienta">
                            <div className="contenedor_herramienta">
                                <LuCalculator />
                            </div>
                            <h5>Generar datos simulados</h5>
                        </div>
                        <div className="herramienta">
                            <div className="contenedor_herramienta">
                                <LuGitCompareArrows />
                            </div>
                            <h5>Comparar los resultados</h5>
                        </div>
                    </div>
                </div>
            </section>
            <section className='contenedor__distri'>
                <h3>Dentro de esta aplicación podemos ver las siguientes distribuciones</h3>
                <div className="titulodist">
                    <h3>Discretas</h3>
                    <div className="contenedor_distdis">
                        <div className="distribucion">Bernoulli</div>
                        <div className="distribucion">Binomial</div>
                        <div className="distribucion">Geométrica</div>
                        <div className="distribucion">Hipergeométrica</div>
                        <div className="distribucion">Poisson</div>
                    </div>
                </div>
                <div className="titulodist">
                    <h3>Continuas</h3>
                    <div className="contenedor_distdis">
                        <div className="distribucion">Normal</div>
                        <div className="distribucion">Uniforme</div>
                        <div className="distribucion">Exponencial</div>
                    </div>
                </div>
            </section>

            <section className="extra">
                <h3>Funciones adicionales</h3>
                <div className="contenedor__extra">
                    <div className="parte_extra">
                        <h3>Ley de Grandes números</h3>
                    </div>
                    <div className="parte_extra">
                        <h3>Teorema de Límite Central</h3>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Inicio