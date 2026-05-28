import '../App.css'
import '../styles/discretas.css'
import { useState } from 'react'

import GraficaBernoulli from './GraficaBernoulli.jsx'
import GraficaBinomial from './GraficaBinomial.jsx'
import GraficaGeometrica from './GraficaGeometrica.jsx'
import GraficaHipergeometrica from './GraficaHipergeometrica.jsx'
import GraficaPoisson from './GraficaPoisson.jsx'

import Estadisticos from './Estadisticos.jsx'

import {
    LuChartScatter,
    LuChartColumnStacked,
    LuRepeat,
    LuLayers,
    LuSparkles,
    LuActivity
} from "react-icons/lu";

const Discretas = () => {

    const [distribucion, setDistribucion] = useState('binomial')

    const [parametros, setParametros] = useState({
        n: 10,
        p: 0.5,
        maxK: 20,
        N: 50,
        K: 10,
        lambda: 4
    })

    const [muestra, setMuestra] = useState(100)
    const [generado, setGenerado] = useState(false)
    const [datosGenerados, setDatosGenerados] = useState([])

    const generarMuestraBernoulli = (p, tam) => {

        const datos = []

        for (let i = 0; i < tam; i++) {
            datos.push(Math.random() < p ? 1 : 0)
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

    const generarMuestraPoisson = (lambda, tam) => {

        const datos = []

        for (let i = 0; i < tam; i++) {

            let L = Math.exp(-lambda)
            let p = 1
            let k = 0

            do {
                k++
                p *= Math.random()
            } while (p > L)

            datos.push(k - 1)
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

                <button
                    className={distribucion === 'poisson' ? 'activo' : ''}
                    onClick={() => {
                        setDistribucion('poisson')
                        setGenerado(false)
                    }}
                >
                    <LuActivity />
                    <p>Poisson</p>
                </button>

            </div>

            {/* Inputs según distribución */}

            <div className='entradas__discretas'>

                {distribucion === 'bernoulli' && (
                    <div className="contenedor__valores">

                        <label>

                            <p>p <span className="yellow">(probabilidad)</span></p>

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

                    </div>
                )}

                {distribucion === 'binomial' && (
                    <div className="contenedor__valores">

                        <label>

                            <p>n <span className="blue">(intentos)</span></p>

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

                            <p>p <span className="yellow">(probabilidad)</span></p>

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

                    </div>
                )}

                {distribucion === 'geometrica' && (
                    <div className="contenedor__valores">

                        <label>

                            <p>n <span className="blue">(intentos)</span></p>

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

                        <label>

                            <p>p <span className="yellow">(probabilidad)</span></p>

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

                    </div>
                )}

                {distribucion === 'hipergeometrica' && (
                    <div className="contenedor__valores">

                        <label>

                            <p>N <span className="blue">(población)</span></p>

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

                            <p>K <span className="yellow">(éxitos en la población)</span></p>

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

                            <p>n <span className="blue">(muestra)</span></p>

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

                    </div>
                )}

                {distribucion === 'poisson' && (
                    <div className="contenedor__valores">

                        <label>

                            <p>λ <span className="yellow">(media de eventos)</span></p>

                            <input
                                type="number"
                                min={1}
                                step={1}
                                value={parametros.lambda || ''}
                                onChange={(e) => {

                                    const valor = Number(e.target.value)

                                    if (valor >= 1) {
                                        setParametros({
                                            ...parametros,
                                            lambda: valor
                                        })
                                    }
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
                            onChange={(e) => {

                                const valor = Number(e.target.value)

                                if (valor >= 1) {
                                    setMuestra(valor)
                                }
                            }}
                        />

                        <p>1000</p>

                    </div>

                    <span>{muestra}</span>

                </label>

            </div>

            {/* Botón generar */}

            <div className="contenedor__generar">

                <button
                    className='generar__boton'
                    onClick={() => {

                        setGenerado(true)

                        if (distribucion === 'bernoulli') {

                            setDatosGenerados(
                                generarMuestraBernoulli(
                                    parametros.p,
                                    muestra
                                )
                            )

                        } else if (distribucion === 'binomial') {

                            setDatosGenerados(
                                generarMuestraBinomial(
                                    parametros.n,
                                    parametros.p,
                                    muestra
                                )
                            )

                        } else if (distribucion === 'geometrica') {

                            setDatosGenerados(
                                generarMuestraGeometrica(
                                    parametros.p,
                                    muestra
                                )
                            )

                        } else if (distribucion === 'hipergeometrica') {

                            setDatosGenerados(
                                generarMuestraHipergeometrica(
                                    parametros.N,
                                    parametros.K,
                                    parametros.n,
                                    muestra
                                )
                            )

                        } else if (distribucion === 'poisson') {

                            setDatosGenerados(
                                generarMuestraPoisson(
                                    parametros.lambda,
                                    muestra
                                )
                            )
                        }
                    }}
                >
                    <LuSparkles className='icon__generar' />
                    <p>Generar</p>
                </button>

            </div>

            {/* Gráficas */}

            {generado && distribucion === 'bernoulli' && (
                <GraficaBernoulli p={parametros.p} />
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

            {generado && distribucion === 'poisson' && (
                <GraficaPoisson lambda={parametros.lambda} />
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