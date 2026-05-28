import '../App.css'
import '../styles/discretas.css'
import { useState } from 'react'

import GraficaNormal from './GraficaNormal.jsx'
import GraficaUniforme from './GraficaUniforme.jsx'
import GraficaExponencial from './GraficaExponencial.jsx'

import Estadisticos from './Estadisticos.jsx'

import {
    LuWaves,
    LuMinus,
    LuTrendingDown,
    LuSparkles
} from 'react-icons/lu'

const Continuas = () => {

    const [distribucion, setDistribucion] = useState('normal')

    const [parametros, setParametros] = useState({
        mu: 0,
        sigma: 1,
        a: 0,
        b: 1,
        lambda: 1
    })

    const [muestra, setMuestra] = useState(100)
    const [generado, setGenerado] = useState(false)
    const [datosGenerados, setDatosGenerados] = useState([])

    // Box-Muller transform para muestras normales
    const generarMuestraNormal = (mu, sigma, tam) => {
        const datos = []
        for (let i = 0; i < tam; i += 2) {
            const u1 = Math.random()
            const u2 = Math.random()
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
            const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
            datos.push(mu + sigma * z0)
            if (i + 1 < tam) datos.push(mu + sigma * z1)
        }
        return datos.slice(0, tam)
    }

    const generarMuestraUniforme = (a, b, tam) => {
        const datos = []
        for (let i = 0; i < tam; i++) {
            datos.push(a + Math.random() * (b - a))
        }
        return datos
    }

    const generarMuestraExponencial = (lambda, tam) => {
        const datos = []
        for (let i = 0; i < tam; i++) {
            // Inverse transform sampling
            datos.push(-Math.log(1 - Math.random()) / lambda)
        }
        return datos
    }

    return (
        <>
            <main>
                <div className="main_discretas">

                    <h1>datara</h1>

                    <h2>
                        Distribuciones <span className='blue'>continuas</span>
                    </h2>

                    <div className="discretas__texto">
                        <p>
                            Una distribución de probabilidad continua describe la probabilidad de que una variable aleatoria tome cualquier valor dentro de un intervalo real. A diferencia de las discretas, la probabilidad en un punto exacto es cero; lo que se calcula es la densidad de probabilidad f(x), cuya integral en un intervalo da la probabilidad de que X caiga en ese rango.
                        </p>
                    </div>

                </div>
            </main>

            {/* Botones selector */}
            <div className='botones__discretas'>

                <button
                    className={distribucion === 'normal' ? 'activo' : ''}
                    onClick={() => { setDistribucion('normal'); setGenerado(false) }}
                >
                    <LuWaves />
                    <p>Normal</p>
                </button>

                <button
                    className={distribucion === 'uniforme' ? 'activo' : ''}
                    onClick={() => { setDistribucion('uniforme'); setGenerado(false) }}
                >
                    <LuMinus />
                    <p>Uniforme</p>
                </button>

                <button
                    className={distribucion === 'exponencial' ? 'activo' : ''}
                    onClick={() => { setDistribucion('exponencial'); setGenerado(false) }}
                >
                    <LuTrendingDown />
                    <p>Exponencial</p>
                </button>

            </div>

            {/* Inputs según distribución */}
            <div className='entradas__discretas'>

                {distribucion === 'normal' && (
                    <div className="contenedor__valores">

                        <label>
                            <p>μ <span className="blue">(media)</span></p>
                            <input
                                type="number"
                                step={0.5}
                                value={parametros.mu}
                                onChange={(e) =>
                                    setParametros({ ...parametros, mu: Number(e.target.value) })
                                }
                            />
                        </label>

                        <label>
                            <p>σ <span className="yellow">(desviación estándar)</span></p>
                            <input
                                type="number"
                                min={0.01}
                                step={0.1}
                                value={parametros.sigma}
                                onChange={(e) => {
                                    const valor = Number(e.target.value)
                                    if (valor > 0) setParametros({ ...parametros, sigma: valor })
                                }}
                            />
                        </label>

                    </div>
                )}

                {distribucion === 'uniforme' && (
                    <div className="contenedor__valores">

                        <label>
                            <p>a <span className="blue">(mínimo)</span></p>
                            <input
                                type="number"
                                step={0.5}
                                value={parametros.a}
                                onChange={(e) => {
                                    const valor = Number(e.target.value)
                                    if (valor < parametros.b) setParametros({ ...parametros, a: valor })
                                }}
                            />
                        </label>

                        <label>
                            <p>b <span className="yellow">(máximo)</span></p>
                            <input
                                type="number"
                                step={0.5}
                                value={parametros.b}
                                onChange={(e) => {
                                    const valor = Number(e.target.value)
                                    if (valor > parametros.a) setParametros({ ...parametros, b: valor })
                                }}
                            />
                        </label>

                    </div>
                )}

                {distribucion === 'exponencial' && (
                    <div className="contenedor__valores">

                        <label>
                            <p>λ <span className="yellow">(tasa)</span></p>
                            <input
                                type="number"
                                min={0.01}
                                step={0.1}
                                value={parametros.lambda}
                                onChange={(e) => {
                                    const valor = Number(e.target.value)
                                    if (valor > 0) setParametros({ ...parametros, lambda: valor })
                                }}
                            />
                        </label>

                    </div>
                )}

            </div>

            {/* Tamaño de muestra */}
            <div className='contenedor__muestreo'>
                <label>
                    <p>Tamaño de la muestra</p>
                    <div className="contenedor__slider">
                        <p>1</p>
                        <input
                            type="range"
                            min={1}
                            max={1000}
                            step={1}
                            className='slider'
                            value={muestra}
                            onChange={(e) => setMuestra(Number(e.target.value))}
                        />
                        <p>1000</p>
                    </div>
                    <p>{muestra}</p>
                </label>
            </div>

            {/* Botón generar */}
            <div className="contenedor__generar">
                <button
                    className='generar__boton'
                    onClick={() => {
                        setGenerado(true)

                        if (distribucion === 'normal') {
                            setDatosGenerados(generarMuestraNormal(parametros.mu, parametros.sigma, muestra))
                        } else if (distribucion === 'uniforme') {
                            setDatosGenerados(generarMuestraUniforme(parametros.a, parametros.b, muestra))
                        } else if (distribucion === 'exponencial') {
                            setDatosGenerados(generarMuestraExponencial(parametros.lambda, muestra))
                        }
                    }}
                >
                    <LuSparkles className='icon__generar' />
                    <p>Generar</p>
                </button>
            </div>

            {/* Gráficas */}
            {generado && distribucion === 'normal' && (
                <GraficaNormal mu={parametros.mu} sigma={parametros.sigma} />
            )}

            {generado && distribucion === 'uniforme' && (
                <GraficaUniforme a={parametros.a} b={parametros.b} />
            )}

            {generado && distribucion === 'exponencial' && (
                <GraficaExponencial lambda={parametros.lambda} />
            )}

            {generado && (
                <Estadisticos
                    distribucion={distribucion}
                    parametros={parametros}
                    datos={datosGenerados}
                    muestra={muestra}
                />
            )}
        </>
    )
}

export default Continuas