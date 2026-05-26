import '../App.css';

import {
    LuChartScatter,
    LuCalculator,
    LuGitCompareArrows
} from "react-icons/lu";

const Inicio = () => {

    return (
        <>
            <main>
                <div className="main_titulo">
                <h1>Datara</h1>
                </div>
            </main>

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
        </>
    )
}

export default Inicio