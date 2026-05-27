import '../App.css'
import '../styles/discretas.css'
import { useState } from 'react'

import GraficaBernoulli from './GraficaBernoulli.jsx'
import GraficaBinomial from './GraficaBinomial.jsx'
import GraficaGeometrica from './GraficaGeometrica.jsx'
import GraficaHipergeometrica from './GraficaHipergeometrica.jsx'

import Estadisticos from './Estadisticos.jsx'

import {
    LuChartScatter,
    LuChartColumnStacked,
    LuRepeat,
    LuLayers  
} from "react-icons/lu";

const Discretas = () => {

    const [distribucion, setDistribucion] = useState('binomial')

    const [parametros, setParametros] = useState({
        n: 10,
        p: 0.5,
        maxK: 20,
        N: 50,
        K: 10
    })

    const [muestra, setMuestra] = useState(100)

    const [generado, setGenerado] = useState(false)

    const [datosGenerados, setDatosGenerados] = useState([])

    const generarMuestraBernoulli = (p, tam) => {

        const datos = []

        for (let i = 0; i < tam; i++) {

            if (Math.random() < p) {

                datos.push(1)

            }

            else {

                datos.push(0)

            }

        }

        return datos

    }

    const generarMuestraBinomial = (n, p, tam) => {

        const datos = []

        for (let i = 0; i < tam; i++) {

            let exitos = 0

            for (let j = 0; j < n; j++) {

                if (Math.random() < p) exitos++

            }

            datos.push(exitos)

        }

        return datos

    }

    const generarMuestraGeometrica = (p, tam) => {

        const datos = []

        for (let i = 0; i < tam; i++) {

            let intentos = 1

            while (Math.random() >= p) intentos++

            datos.push(intentos)

        }

        return datos

    }

    const generarMuestraHipergeometrica = (N, K, n, tam) => {

        const datos = []

        for (let i = 0; i < tam; i++) {

            let exitos = 0

            let poblacion = N

            let exitosPoblacion = K

            for (let j = 0; j < n; j++) {

                if (Math.random() < exitosPoblacion / poblacion) {

                    exitos++

                    exitosPoblacion--

                }

                poblacion--

            }

            datos.push(exitos)

        }

        return datos

    }

    return (
        <>
            <main>

                <div className="main_discretas">

                    <h1>datara</h1>

                    <h2>
                        Distribuciones <span className='blue'>discretas</span>
                    </h2>

                    <div className="discretas__texto">

                        <p>
                            Una distribución de probabilidad discreta describe la probabilidad de que una variable aleatoria tome valores exactos y contables (usualmente números enteros). Cada resultado posible tiene una probabilidad asignada entre 0 y 1, y la suma de todas las probabilidades siempre es exactamente 1.
                        </p>

                    </div>

                </div>

            </main>

            {/* Botones selector */}

            <div className='botones__discretas'>

                <button
                    className={distribucion === 'bernoulli' ? 'activo' : ''}
                    onClick={() => {

                        setDistribucion('bernoulli')

                        setGenerado(false)

                    }}
                >
                    <LuChartScatter />
                    <p>Bernoulli</p>
                </button>

                <button
                    className={distribucion === 'binomial' ? 'activo' : ''}
                    onClick={() => {

                        setDistribucion('binomial')

                        setGenerado(false)

                    }}
                >
                    <LuChartColumnStacked />
                    <p>Binomial</p>
                </button>

                <button
                    className={distribucion === 'geometrica' ? 'activo' : ''}
                    onClick={() => {

                        setDistribucion('geometrica')

                        setGenerado(false)

                    }}
                >
                    <LuRepeat />
                    <p>Geométrica</p>
                </button>

                <button
                    className={distribucion === 'hipergeometrica' ? 'activo' : ''}
                    onClick={() => {

                        setDistribucion('hipergeometrica')

                        setGenerado(false)

                    }}
                >
                    <LuLayers />
                    <p>Hipergeométrica</p>
                </button>

            </div>

            {/* Inputs según distribución */}

            <div className='entradas__discretas'>

                {distribucion === 'bernoulli' && (
                    <>

                        <label>
                            p (probabilidad):

                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.1}
                                value={parametros.p || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 0 && valor <= 1) {

                                        setParametros({
                                            ...parametros,
                                            p: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                    </>
                )}

                {distribucion === 'binomial' && (
                    <>

                        <label>
                            n (intentos):

                            <input
                                type="number"
                                min={2}
                                step={1}
                                value={parametros.n || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 2) {

                                        setParametros({
                                            ...parametros,
                                            n: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                        <label>
                            p (probabilidad):

                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.1}
                                value={parametros.p || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 0 && valor <= 1) {

                                        setParametros({
                                            ...parametros,
                                            p: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                    </>
                )}

                {distribucion === 'geometrica' && (
                    <>

                        <label>
                            p (probabilidad):

                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.1}
                                value={parametros.p || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 0 && valor <= 1) {

                                        setParametros({
                                            ...parametros,
                                            p: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                        <label>

                            Máximo de intentos (n):

                            <input
                                type="number"
                                min="1"
                                step="1"
                                value={parametros.maxK || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 1) {

                                        setParametros({
                                            ...parametros,
                                            maxK: valor
                                        })

                                    }

                                }}
                            />

                        </label>

                    </>
                )}

                {distribucion === 'hipergeometrica' && (
                    <>

                        <label>
                            N (población):

                            <input
                                type="number"
                                min={1}
                                step={1}
                                value={parametros.N || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 1) {

                                        setParametros({
                                            ...parametros,
                                            N: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                        <label>
                            K (éxitos en población):

                            <input
                                type="number"
                                min={0}
                                step={1}
                                value={parametros.K || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 0 && valor <= parametros.N) {

                                        setParametros({
                                            ...parametros,
                                            K: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                        <label>
                            n (muestra):

                            <input
                                type="number"
                                min={1}
                                step={1}
                                value={parametros.n || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 1 && valor <= parametros.N) {

                                        setParametros({
                                            ...parametros,
                                            n: valor
                                        })

                                    }

                                }}
                            />
                        </label>

                    </>
                )}

            </div>

            {/* Tamaño de muestra */}

            <div>

                <label>

                    Tamaño de muestra:

                    <input
                        type="number"
                        min={1}
                        step={1}
                        value={muestra}
                        onChange={(e) => {

                            const valor = Number(e.target.value)

                            if (valor >= 1) {

                                setMuestra(valor)

                            }

                        }}
                    />

                </label>

            </div>

            {/* Botón generar */}

            <button
                onClick={() => {

                    setGenerado(true)

                    if (distribucion === 'bernoulli') {

                        setDatosGenerados(
                            generarMuestraBernoulli(
                                parametros.p,
                                muestra
                            )
                        )

                    }

                    else if (distribucion === 'binomial') {

                        setDatosGenerados(
                            generarMuestraBinomial(
                                parametros.n,
                                parametros.p,
                                muestra
                            )
                        )

                    }

                    else if (distribucion === 'geometrica') {

                        setDatosGenerados(
                            generarMuestraGeometrica(
                                parametros.p,
                                muestra
                            )
                        )

                    }

                    else if (distribucion === 'hipergeometrica') {

                        setDatosGenerados(
                            generarMuestraHipergeometrica(
                                parametros.N,
                                parametros.K,
                                parametros.n,
                                muestra
                            )
                        )

                    }

                }}
            >
                Generar
            </button>

            {/* Gráfica */}

            {generado && distribucion === 'bernoulli' && (
                <GraficaBernoulli
                    p={parametros.p}
                />
            )}

            {generado && distribucion === 'binomial' && (
                <GraficaBinomial
                    n={parametros.n}
                    p={parametros.p}
                />
            )}

            {generado && distribucion === 'geometrica' && (
                <GraficaGeometrica
                    p={parametros.p}
                    maxK={parametros.maxK}
                />
            )}

            {generado && distribucion === 'hipergeometrica' && (
                <GraficaHipergeometrica
                    N={parametros.N}
                    K={parametros.K}
                    n={parametros.n}
                />
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

export default Discretas