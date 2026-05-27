import '../App.css'
import { useState } from 'react'
import GraficaBinomial from './GraficaBinomial.jsx'
import GraficaGeometrica from './GraficaGeometrica.jsx'
import GraficaHipergeometrica from './GraficaHipergeometrica.jsx'
import Estadisticos from './Estadisticos.jsx'

const Discretas = () => {

    const [distribucion, setDistribucion] = useState('binomial')
    const [parametros, setParametros] = useState({ n: 10, p: 0.5 })
    const [muestra, setMuestra] = useState(100)
    const [generado, setGenerado] = useState(false)
    const [datosGenerados, setDatosGenerados] = useState([])

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
                <div className="main_titulo">
                    <h1>Discretas</h1>
                </div>

                {/* Botones selector */}
                <div>
                    <button onClick={() => { setDistribucion('binomial'); setGenerado(false) }}>Binomial</button>
                    <button onClick={() => { setDistribucion('geometrica'); setGenerado(false) }}>Geométrica</button>
                    <button onClick={() => { setDistribucion('hipergeometrica'); setGenerado(false) }}>Hipergeométrica</button>
                </div>

                {/* Inputs según distribución */}
                <div>
                    {distribucion === 'binomial' && (
                        <>
                            <label>n (intentos):
                                <input type="number" value={parametros.n || ''}
                                onChange={(e) => setParametros({...parametros, n: Number(e.target.value)})} />
                            </label>
                            <label>p (probabilidad):
                                <input type="number" min={0} max={1} step={0.1} value={parametros.p || ''}
                                onChange={(e) => setParametros({...parametros, p: Number(e.target.value)})} />
                            </label>
                        </>
                    )}

                    {distribucion === 'geometrica' && (
                        <>
                            <label>p (probabilidad):
                                <input type="number" value={parametros.p || ''}
                                onChange={(e) => setParametros({...parametros, p: Number(e.target.value)})} />
                            </label>
                            <label> Máximo de intentos (n): <input type="number" min="1" step="1" value={parametros.maxK || ''} onChange={(e) => { const valor = Number(e.target.value);

                                if (valor >= 1) {setParametros({...parametros,maxK: valor});}}}/> </label>
                        </>
                    )}

                    {distribucion === 'hipergeometrica' && (
                        <>
                            <label>N (población):
                                <input type="number" value={parametros.N || ''}
                                onChange={(e) => setParametros({...parametros, N: Number(e.target.value)})} />
                            </label>
                            <label>K (éxitos en población):
                                <input type="number" value={parametros.K || ''}
                                onChange={(e) => setParametros({...parametros, K: Number(e.target.value)})} />
                            </label>
                            <label>n (muestra):
                                <input type="number" value={parametros.n || ''}
                                onChange={(e) => setParametros({...parametros, n: Number(e.target.value)})} />
                            </label>
                        </>
                    )}
                </div>

                {/* Tamaño de muestra */}
                <div>
                    <label>Tamaño de muestra:
                        <input type="number" value={muestra}
                        onChange={(e) => setMuestra(Number(e.target.value))} />
                    </label>
                </div>

                {/* Botón generar */}
                <button onClick={() => {
                    setGenerado(true)
                    if (distribucion === 'binomial')
                        setDatosGenerados(generarMuestraBinomial(parametros.n, parametros.p, muestra))
                    else if (distribucion === 'geometrica')
                        setDatosGenerados(generarMuestraGeometrica(parametros.p, muestra))
                    else if (distribucion === 'hipergeometrica')
                        setDatosGenerados(generarMuestraHipergeometrica(parametros.N, parametros.K, parametros.n, muestra))
                }}>
                    Generar
                </button>

                {/* Gráfica */}
                {generado && distribucion === 'binomial' && (
                    <GraficaBinomial n={parametros.n} p={parametros.p} />
                )}
                {generado && distribucion === 'geometrica' && (
                    <GraficaGeometrica p={parametros.p} maxK={parametros.maxK}/>
                )}
                {generado && distribucion === 'hipergeometrica' && (
                    <GraficaHipergeometrica N={parametros.N} K={parametros.K} n={parametros.n} />
                )}

            {generado && (
    <Estadisticos
        distribucion={distribucion}
        parametros={parametros}
        datos={datosGenerados}
        muestra={muestra}
    />
)}
            </main>
        </>
    )
}

export default Discretas