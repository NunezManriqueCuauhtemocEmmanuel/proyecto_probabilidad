import '../App.css'
import '../styles/discretas.css'
import { useState, useMemo } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

import { Bar, Line } from 'react-chartjs-2'

import {
    LuChartScatter,
    LuChartColumnStacked,
    LuRepeat,
    LuLayers,
    LuActivity,
    LuWaves,
    LuMinus,
    LuTrendingDown,
    LuSparkles,
    LuRefreshCw
} from 'react-icons/lu'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

// ─── Generadores ─────────────────────────────────────────────────────────────

const generadores = {
    bernoulli:       ({ p }, tam)          => Array.from({ length: tam }, () => Math.random() < p ? 1 : 0),
    binomial:        ({ n, p }, tam)       => Array.from({ length: tam }, () => { let e = 0; for (let j = 0; j < n; j++) if (Math.random() < p) e++; return e }),
    geometrica:      ({ p }, tam)          => Array.from({ length: tam }, () => { let i = 1; while (Math.random() >= p) i++; return i }),
    hipergeometrica: ({ N, K, n }, tam)    => Array.from({ length: tam }, () => { let e = 0, pob = N, ep = K; for (let j = 0; j < n; j++) { if (Math.random() < ep / pob) { e++; ep-- } pob-- } return e }),
    poisson:         ({ lambda }, tam)     => Array.from({ length: tam }, () => { const L = Math.exp(-lambda); let p = 1, k = 0; do { k++; p *= Math.random() } while (p > L); return k - 1 }),
    normal:          ({ mu, sigma }, tam)  => { const d = []; for (let i = 0; i < tam; i += 2) { const u1 = Math.random(), u2 = Math.random(); const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2); d.push(mu + sigma * z0); if (i + 1 < tam) d.push(mu + sigma * z1) } return d.slice(0, tam) },
    uniforme:        ({ a, b }, tam)       => Array.from({ length: tam }, () => a + Math.random() * (b - a)),
    exponencial:     ({ lambda }, tam)     => Array.from({ length: tam }, () => -Math.log(1 - Math.random()) / lambda),
}

const esperanza = {
    bernoulli:       ({ p })       => p,
    binomial:        ({ n, p })    => n * p,
    geometrica:      ({ p })       => 1 / p,
    hipergeometrica: ({ N, K, n }) => n * (K / N),
    poisson:         ({ lambda })  => lambda,
    normal:          ({ mu })      => mu,
    uniforme:        ({ a, b })    => (a + b) / 2,
    exponencial:     ({ lambda })  => 1 / lambda,
}

const varianza = {
    bernoulli:       ({ p })       => p * (1 - p),
    binomial:        ({ n, p })    => n * p * (1 - p),
    geometrica:      ({ p })       => (1 - p) / (p * p),
    hipergeometrica: ({ N, K, n }) => n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1)),
    poisson:         ({ lambda })  => lambda,
    normal:          ({ sigma })   => sigma * sigma,
    uniforme:        ({ a, b })    => (b - a) ** 2 / 12,
    exponencial:     ({ lambda })  => 1 / (lambda * lambda),
}

// ─── Distribuciones disponibles ───────────────────────────────────────────────

const DISTRIBUCIONES = [
    { id: 'bernoulli',       label: 'Bernoulli',       icon: LuChartScatter },
    { id: 'binomial',        label: 'Binomial',        icon: LuChartColumnStacked },
    { id: 'geometrica',      label: 'Geométrica',      icon: LuRepeat },
    { id: 'hipergeometrica', label: 'Hipergeométrica', icon: LuLayers },
    { id: 'poisson',         label: 'Poisson',         icon: LuActivity },
    { id: 'normal',          label: 'Normal',          icon: LuWaves },
    { id: 'uniforme',        label: 'Uniforme',        icon: LuMinus },
    { id: 'exponencial',     label: 'Exponencial',     icon: LuTrendingDown },
]

// ─── Inputs ───────────────────────────────────────────────────────────────────

const InputsDistribucion = ({ distribucion, parametros, setParametros }) => {
    const set = (key, val) => setParametros(p => ({ ...p, [key]: val }))

    const numInput = (label, colorClass, key, min, step = 1) => (
        <label key={key}>
            <p>{label.split(' ')[0]} <span className={colorClass}>({label.split('(')[1]?.replace(')', '')})</span></p>
            <input type="number" min={min} step={step} value={parametros[key] ?? ''}
                onChange={e => { const v = Number(e.target.value); if (v >= min) set(key, v) }} />
        </label>
    )

    const pInput = () => (
        <label key="p">
            <p>p <span className="yellow">(probabilidad)</span></p>
            <input type="number" min={0.01} max={0.99} step={0.1} value={parametros.p ?? ''}
                onChange={e => { const v = Number(e.target.value); if (v > 0 && v < 1) set('p', v) }} />
        </label>
    )

    return (
        <div className="contenedor__valores">
            {distribucion === 'bernoulli' && pInput()}
            {distribucion === 'binomial' && <>{numInput('n (intentos)', 'blue', 'n', 2)}{pInput()}</>}
            {distribucion === 'geometrica' && pInput()}
            {distribucion === 'hipergeometrica' && (
                <>
                    {numInput('N (población)', 'blue', 'N', 2)}
                    <label key="K">
                        <p>K <span className="yellow">(éxitos en la población)</span></p>
                        <input type="number" min={0} step={1} value={parametros.K ?? ''}
                            onChange={e => { const v = Number(e.target.value); if (v >= 0 && v <= parametros.N) set('K', v) }} />
                    </label>
                    <label key="n">
                        <p>n <span className="blue">(muestra)</span></p>
                        <input type="number" min={1} step={1} value={parametros.n ?? ''}
                            onChange={e => { const v = Number(e.target.value); if (v >= 1 && v <= parametros.N) set('n', v) }} />
                    </label>
                </>
            )}
            {distribucion === 'poisson' && numInput('λ (media)', 'yellow', 'lambda', 0.5, 0.5)}
            {distribucion === 'normal' && (
                <>
                    <label key="mu">
                        <p>μ <span className="blue">(media)</span></p>
                        <input type="number" step={0.5} value={parametros.mu ?? 0}
                            onChange={e => set('mu', Number(e.target.value))} />
                    </label>
                    {numInput('σ (desviación)', 'yellow', 'sigma', 0.1, 0.1)}
                </>
            )}
            {distribucion === 'uniforme' && (
                <>
                    <label key="a">
                        <p>a <span className="blue">(mínimo)</span></p>
                        <input type="number" step={0.5} value={parametros.a ?? 0}
                            onChange={e => { const v = Number(e.target.value); if (v < parametros.b) set('a', v) }} />
                    </label>
                    <label key="b">
                        <p>b <span className="yellow">(máximo)</span></p>
                        <input type="number" step={0.5} value={parametros.b ?? 1}
                            onChange={e => { const v = Number(e.target.value); if (v > parametros.a) set('b', v) }} />
                    </label>
                </>
            )}
            {distribucion === 'exponencial' && numInput('λ (tasa)', 'yellow', 'lambda', 0.1, 0.1)}
        </div>
    )
}

// ─── Utilidades estadísticas ──────────────────────────────────────────────────

function erf(x) {
    const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911
    const sign = x < 0 ? -1 : 1; x = Math.abs(x)
    const t = 1 / (1 + p * x)
    return sign * (1 - (((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x))
}

function densidadNormal(x, mu, sigma) {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2)
}

// ─── Histograma + campana normal ─────────────────────────────────────────────

const GraficaHistograma = ({ medias, mu, sigma, n }) => {
    const { bins, labels, normalCurve } = useMemo(() => {
        if (!medias.length) return { bins: [], labels: [], normalCurve: [] }

        const min = Math.min(...medias)
        const max = Math.max(...medias)
        const nBins = Math.max(15, Math.min(50, Math.floor(Math.sqrt(medias.length))))
        const ancho = (max - min) / nBins || 1

        const conteos = Array(nBins).fill(0)
        medias.forEach(x => {
            const idx = Math.min(Math.floor((x - min) / ancho), nBins - 1)
            conteos[idx]++
        })

        // Convertir a densidad
        const total = medias.length
        const densidades = conteos.map(c => c / (total * ancho))
        const labels = Array.from({ length: nBins }, (_, i) => (min + (i + 0.5) * ancho).toFixed(3))

        // Curva normal teórica en los mismos puntos
        const normalCurve = labels.map(x => densidadNormal(Number(x), mu, sigma))

        return { bins: densidades, labels, normalCurve }
    }, [medias, mu, sigma])

    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: `Distribución de x̄ (${medias.length} muestras, n=${n})`,
                data: bins,
                backgroundColor: 'rgba(59,130,246,0.4)',
                borderColor: '#3B82F6',
                borderWidth: 1,
            },
            {
                type: 'line',
                label: `N(μ=${mu.toFixed(3)}, σ=${sigma.toFixed(3)})`,
                data: normalCurve,
                borderColor: '#EAB308',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: false,
            }
        ]
    }

    const opciones = {
        responsive: true,
        animation: false,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: `Distribución de la media muestral x̄ (n=${n})`
            }
        },
        scales: {
            x: {
                ticks: { maxTicksLimit: 10, callback: (_, i) => Number(labels[i]).toFixed(2) },
                title: { display: true, text: 'x̄' }
            },
            y: { title: { display: true, text: 'Densidad' } }
        }
    }

    return (
        <div className='grafica'>
            <Bar data={data} options={opciones} />
        </div>
    )
}

// ─── Gráfica: evolución de la normalidad con n ────────────────────────────────
// Muestra 4 histogramas (n=1, n=5, n=30, n=actual) para ver la convergencia

const GraficaEvolucion = ({ generador, parametros, muestras, muTeorico, varTeorico }) => {
    const ns = [1, 5, 30]

    const calcularMedias = (nTam) => {
        return Array.from({ length: muestras }, () => {
            const datos = generador(parametros, nTam)
            return datos.reduce((a, b) => a + b, 0) / nTam
        })
    }

    const colores = ['#F97316', '#22C55E', '#A855F7', '#EAB308']

    const datasets = ns.map((nTam, idx) => {
        const mediasN = calcularMedias(nTam)
        const mu = muTeorico
        const sigma = Math.sqrt(varTeorico / nTam)

        const min = mu - 4 * sigma
        const max = mu + 4 * sigma
        const nBins = 30
        const ancho = (max - min) / nBins

        const conteos = Array(nBins).fill(0)
        mediasN.forEach(x => {
            const i = Math.min(Math.floor((x - min) / ancho), nBins - 1)
            if (i >= 0) conteos[i]++
        })

        const total = mediasN.length
        return {
            label: `n = ${nTam}`,
            data: conteos.map((c, i) => ({
                x: min + (i + 0.5) * ancho,
                y: c / (total * ancho)
            })),
            borderColor: colores[idx],
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: false,
            showLine: true,
            type: 'line'
        }
    })

    // Curva normal límite (n → ∞)
    const sigma0 = Math.sqrt(varTeorico / 30)
    const xMin = muTeorico - 4 * sigma0
    const xMax = muTeorico + 4 * sigma0
    const curvaX = Array.from({ length: 100 }, (_, i) => xMin + (i / 99) * (xMax - xMin))
    datasets.push({
        label: 'N límite (TLC)',
        data: curvaX.map(x => ({ x, y: densidadNormal(x, muTeorico, sigma0) })),
        borderColor: '#EAB308',
        borderWidth: 2,
        borderDash: [6, 4],
        pointRadius: 0,
        tension: 0.4,
        fill: false,
        showLine: true,
        type: 'line'
    })

    const data = { datasets }

    const opciones = {
        responsive: true,
        animation: false,
        parsing: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Convergencia a la normal según n' }
        },
        scales: {
            x: { type: 'linear', title: { display: true, text: 'x̄' } },
            y: { title: { display: true, text: 'Densidad' } }
        }
    }

    return (
        <div className='grafica'>
            <Line data={data} options={opciones} />
        </div>
    )
}

// ─── Q-Q Plot (normalidad) ────────────────────────────────────────────────────

const GraficaQQ = ({ medias, mu, sigma }) => {
    const { puntos, limMin, limMax } = useMemo(() => {
        const sorted = [...medias].sort((a, b) => a - b)
        const n = sorted.length
        const puntos = sorted.map((x, i) => {
            const p = (i + 0.5) / n
            // Cuantil teórico normal (aproximación)
            const z = probitApprox(p)
            const teorico = mu + sigma * z
            return { x: teorico, y: x }
        })
        const vals = puntos.flatMap(p => [p.x, p.y])
        const lim = [Math.min(...vals), Math.max(...vals)]
        return { puntos, limMin: lim[0], limMax: lim[1] }
    }, [medias, mu, sigma])

    const data = {
        datasets: [
            {
                label: 'Cuantiles observados vs teóricos',
                data: puntos,
                backgroundColor: 'rgba(59,130,246,0.5)',
                pointRadius: 2,
                type: 'scatter'
            },
            {
                label: 'Línea de normalidad perfecta',
                data: [{ x: limMin, y: limMin }, { x: limMax, y: limMax }],
                borderColor: '#EAB308',
                borderWidth: 2,
                pointRadius: 0,
                type: 'line',
                fill: false
            }
        ]
    }

    const opciones = {
        responsive: true,
        animation: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Q-Q Plot — ¿qué tan normal es x̄?' }
        },
        scales: {
            x: { type: 'linear', title: { display: true, text: 'Cuantiles teóricos N(μ,σ/√n)' } },
            y: { title: { display: true, text: 'Cuantiles observados de x̄' } }
        }
    }

    return (
        <div className='grafica'>
            <Line data={data} options={opciones} />
        </div>
    )
}

// Aproximación de la función cuantil (probit) — Beasley-Springer-Moro
function probitApprox(p) {
    if (p <= 0) return -Infinity
    if (p >= 1) return Infinity
    const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637]
    const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833]
    const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209,
               0.0276438810333863, 0.0038405729373609, 0.0003951896511349,
               0.0000321767881768, 0.0000002888167364, 0.0000003960315187]
    let r, x
    const y = p - 0.5
    if (Math.abs(y) < 0.42) {
        r = y * y
        x = y * (((a[3]*r+a[2])*r+a[1])*r+a[0]) / ((((b[3]*r+b[2])*r+b[1])*r+b[0])*r+1)
    } else {
        r = p < 0.5 ? p : 1 - p
        r = Math.log(-Math.log(r))
        x = c[0]+r*(c[1]+r*(c[2]+r*(c[3]+r*(c[4]+r*(c[5]+r*(c[6]+r*(c[7]+r*c[8])))))))
        if (p < 0.5) x = -x
    }
    return x
}

// ─── Componente principal ─────────────────────────────────────────────────────

const PARAMS_DEFAULT = {
    n: 10, p: 0.5, N: 50, K: 10,
    lambda: 3, mu: 0, sigma: 1, a: 0, b: 1
}

const TeoremaLimiteCentral = () => {
    const [distribucion, setDistribucion] = useState('exponencial')
    const [parametros, setParametros] = useState(PARAMS_DEFAULT)
    const [tamMuestra, setTamMuestra] = useState(30)   // n: tamaño de cada muestra
    const [numMuestras, setNumMuestras] = useState(500) // M: número de muestras
    const [generado, setGenerado] = useState(false)
    const [medias, setMedias] = useState([])
    const [seed, setSeed] = useState(0)

    const simular = () => {
        const gen = generadores[distribucion]
        if (!gen) return
        const mediasCalc = Array.from({ length: numMuestras }, () => {
            const datos = gen(parametros, tamMuestra)
            return datos.reduce((a, b) => a + b, 0) / tamMuestra
        })
        setMedias(mediasCalc)
        setGenerado(true)
        setSeed(s => s + 1)
    }

    const muTeo   = esperanza[distribucion]?.(parametros) ?? 0
    const varTeo  = varianza[distribucion]?.(parametros) ?? 1
    const sigmaXbar = Math.sqrt(varTeo / tamMuestra)

    const mediaEmp   = generado ? medias.reduce((a, b) => a + b, 0) / medias.length : null
    const sigmaEmp   = generado ? Math.sqrt(medias.reduce((a, b) => a + (b - mediaEmp) ** 2, 0) / medias.length) : null

    const r = n => Math.round(n * 10000) / 10000

    return (
        <>
            <main>
                <div className="main_discretas">
                    <h1>datara</h1>
                    <h2>
                        Teorema del <span className='blue'>límite central</span>
                    </h2>
                    <div className="discretas__texto">
                        <p>
                            El teorema del límite central establece que, independientemente de la distribución original de X, la media muestral x̄ de n observaciones converge en distribución a una normal N(μ, σ²/n) cuando n → ∞. Elige cualquier distribución —incluso las más asimétricas— y observa cómo la distribución de x̄ se vuelve cada vez más gaussiana al aumentar n.
                        </p>
                    </div>
                </div>
            </main>

            {/* Selector de distribución */}
            <div className='botones__discretas'>
                {DISTRIBUCIONES.map(({ id, label, icon: Icon }) => (
                    <button key={id}
                        className={distribucion === id ? 'activo' : ''}
                        onClick={() => { setDistribucion(id); setGenerado(false) }}
                    >
                        <Icon /><p>{label}</p>
                    </button>
                ))}
            </div>

            {/* Inputs distribución */}
            <div className='entradas__discretas'>
                <InputsDistribucion
                    distribucion={distribucion}
                    parametros={parametros}
                    setParametros={setParametros}
                />
            </div>

            {/* Sliders */}
            <div className='contenedor__muestreo'>
                <label>
                    <p>Tamaño de cada muestra <span className="blue">(n)</span></p>
                    <div className="contenedor__slider">
                        <p>1</p>
                        <input type="range" min={1} max={200} step={1} className='slider'
                            value={tamMuestra}
                            onChange={e => { setTamMuestra(Number(e.target.value)); setGenerado(false) }} />
                        <p>200</p>
                    </div>
                    <p>{tamMuestra}</p>
                </label>

                <label>
                    <p>Número de muestras <span className="yellow">(M)</span></p>
                    <div className="contenedor__slider">
                        <p>50</p>
                        <input type="range" min={50} max={2000} step={50} className='slider'
                            value={numMuestras}
                            onChange={e => { setNumMuestras(Number(e.target.value)); setGenerado(false) }} />
                        <p>2000</p>
                    </div>
                    <p>{numMuestras}</p>
                </label>
            </div>

            {/* Botones */}
            <div className="contenedor__generar" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className='generar__boton' onClick={simular}>
                    <LuSparkles className='icon__generar' /><p>Simular</p>
                </button>
                {generado && (
                    <button className='generar__boton' onClick={simular} style={{ opacity: 0.8 }}>
                        <LuRefreshCw className='icon__generar' /><p>Regenerar</p>
                    </button>
                )}
            </div>

            {/* Gráficas */}
            {generado && (
                <>
                    {/* Histograma principal */}
                    <GraficaHistograma
                        key={`hist-${seed}`}
                        medias={medias}
                        mu={muTeo}
                        sigma={sigmaXbar}
                        n={tamMuestra}
                    />

                    {/* Evolución con n */}
                    <GraficaEvolucion
                        key={`evol-${seed}`}
                        generador={generadores[distribucion]}
                        parametros={parametros}
                        muestras={Math.min(numMuestras, 300)}
                        muTeorico={muTeo}
                        varTeorico={varTeo}
                    />

                    {/* Q-Q Plot */}
                    <GraficaQQ
                        key={`qq-${seed}`}
                        medias={medias}
                        mu={muTeo}
                        sigma={sigmaXbar}
                    />

                    {/* Tabla */}
                    <div className='tabla__resultados'>
                        <h3>Convergencia — n={tamMuestra}, M={numMuestras}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Estadístico</th>
                                    <th>Teórico</th>
                                    <th>Empírico</th>
                                    <th>Diferencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>E[x̄] = μ</td>
                                    <td>{r(muTeo)}</td>
                                    <td>{r(mediaEmp)}</td>
                                    <td>{r(Math.abs(muTeo - mediaEmp))}</td>
                                </tr>
                                <tr>
                                    <td>σ[x̄] = σ/√n</td>
                                    <td>{r(sigmaXbar)}</td>
                                    <td>{r(sigmaEmp)}</td>
                                    <td>{r(Math.abs(sigmaXbar - sigmaEmp))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    )
}

export default TeoremaLimiteCentral