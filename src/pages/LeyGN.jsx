import '../App.css'
import '../styles/discretas.css'
import { useState, useMemo } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

import { Line } from 'react-chartjs-2'

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
    Title,
    Tooltip,
    Legend,
    Filler
)


const generadores = {
    bernoulli: ({ p }, tam) =>
        Array.from({ length: tam }, () => (Math.random() < p ? 1 : 0)),

    binomial: ({ n, p }, tam) =>
        Array.from({ length: tam }, () => {
            let exitos = 0
            for (let j = 0; j < n; j++) if (Math.random() < p) exitos++
            return exitos
        }),

    geometrica: ({ p }, tam) =>
        Array.from({ length: tam }, () => {
            let intentos = 1
            while (Math.random() >= p) intentos++
            return intentos
        }),

    hipergeometrica: ({ N, K, n }, tam) =>
        Array.from({ length: tam }, () => {
            let exitos = 0, poblacion = N, exitosPob = K
            for (let j = 0; j < n; j++) {
                if (Math.random() < exitosPob / poblacion) { exitos++; exitosPob-- }
                poblacion--
            }
            return exitos
        }),

    poisson: ({ lambda }, tam) =>
        Array.from({ length: tam }, () => {
            const L = Math.exp(-lambda)
            let p = 1, k = 0
            do { k++; p *= Math.random() } while (p > L)
            return k - 1
        }),

    normal: ({ mu, sigma }, tam) => {
        const datos = []
        for (let i = 0; i < tam; i += 2) {
            const u1 = Math.random(), u2 = Math.random()
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
            const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
            datos.push(mu + sigma * z0)
            if (i + 1 < tam) datos.push(mu + sigma * z1)
        }
        return datos.slice(0, tam)
    },

    uniforme: ({ a, b }, tam) =>
        Array.from({ length: tam }, () => a + Math.random() * (b - a)),

    exponencial: ({ lambda }, tam) =>
        Array.from({ length: tam }, () => -Math.log(1 - Math.random()) / lambda),
}


const esperanzaTeorica = {
    bernoulli:       ({ p })          => p,
    binomial:        ({ n, p })       => n * p,
    geometrica:      ({ p })          => 1 / p,
    hipergeometrica: ({ N, K, n })    => n * (K / N),
    poisson:         ({ lambda })     => lambda,
    normal:          ({ mu })         => mu,
    uniforme:        ({ a, b })       => (a + b) / 2,
    exponencial:     ({ lambda })     => 1 / lambda,
}


const DISTRIBUCIONES = [
    { id: 'bernoulli',       label: 'Bernoulli',       icon: LuChartScatter,       tipo: 'discreta' },
    { id: 'binomial',        label: 'Binomial',        icon: LuChartColumnStacked, tipo: 'discreta' },
    { id: 'geometrica',      label: 'Geométrica',      icon: LuRepeat,             tipo: 'discreta' },
    { id: 'hipergeometrica', label: 'Hipergeométrica', icon: LuLayers,             tipo: 'discreta' },
    { id: 'poisson',         label: 'Poisson',         icon: LuActivity,           tipo: 'discreta' },
    { id: 'normal',          label: 'Normal',          icon: LuWaves,              tipo: 'continua' },
    { id: 'uniforme',        label: 'Uniforme',        icon: LuMinus,              tipo: 'continua' },
    { id: 'exponencial',     label: 'Exponencial',     icon: LuTrendingDown,       tipo: 'continua' },
]


const InputsDistribucion = ({ distribucion, parametros, setParametros }) => {
    const set = (key, valor) => setParametros(prev => ({ ...prev, [key]: valor }))

    const inputN = (label, colorClass, key, min = 1) => (
        <label>
            <p>{label.split(' ')[0]} <span className={colorClass}>({label.split('(')[1]?.replace(')', '') ?? ''})</span></p>
            <input type="number" min={min} step={1}
                value={parametros[key] ?? ''}
                onChange={e => { const v = Number(e.target.value); if (v >= min) set(key, v) }}
            />
        </label>
    )

    const inputP = () => (
        <label>
            <p>p <span className="yellow">(probabilidad)</span></p>
            <input type="number" min={0} max={1} step={0.1}
                value={parametros.p ?? ''}
                onChange={e => { const v = Number(e.target.value); if (v >= 0 && v <= 1) set('p', v) }}
            />
        </label>
    )

    const inputFloat = (label, colorClass, key, min = 0.01, step = 0.1) => (
        <label>
            <p>{label.split(' ')[0]} <span className={colorClass}>({label.split('(')[1]?.replace(')', '') ?? ''})</span></p>
            <input type="number" min={min} step={step}
                value={parametros[key] ?? ''}
                onChange={e => { const v = Number(e.target.value); if (v > min - 0.001) set(key, v) }}
            />
        </label>
    )

    return (
        <div className="contenedor__valores">
            {distribucion === 'bernoulli' && <>{inputP()}</>}
            {distribucion === 'binomial' && <>{inputN('n (intentos)', 'blue', 'n', 2)}{inputP()}</>}
            {distribucion === 'geometrica' && <>{inputP()}</>}
            {distribucion === 'hipergeometrica' && (
                <>
                    {inputN('N (población)', 'blue', 'N', 1)}
                    <label>
                        <p>K <span className="yellow">(éxitos en la población)</span></p>
                        <input type="number" min={0} step={1}
                            value={parametros.K ?? ''}
                            onChange={e => { const v = Number(e.target.value); if (v >= 0 && v <= parametros.N) set('K', v) }}
                        />
                    </label>
                    <label>
                        <p>n <span className="blue">(muestra)</span></p>
                        <input type="number" min={1} step={1}
                            value={parametros.n ?? ''}
                            onChange={e => { const v = Number(e.target.value); if (v >= 1 && v <= parametros.N) set('n', v) }}
                        />
                    </label>
                </>
            )}
            {distribucion === 'poisson' && <>{inputN('λ (media de eventos)', 'yellow', 'lambda', 1)}</>}
            {distribucion === 'normal' && (
                <>
                    <label>
                        <p>μ <span className="blue">(media)</span></p>
                        <input type="number" step={0.5} value={parametros.mu ?? 0}
                            onChange={e => set('mu', Number(e.target.value))} />
                    </label>
                    {inputFloat('σ (desviación estándar)', 'yellow', 'sigma', 0.01, 0.1)}
                </>
            )}
            {distribucion === 'uniforme' && (
                <>
                    <label>
                        <p>a <span className="blue">(mínimo)</span></p>
                        <input type="number" step={0.5} value={parametros.a ?? 0}
                            onChange={e => { const v = Number(e.target.value); if (v < parametros.b) set('a', v) }} />
                    </label>
                    <label>
                        <p>b <span className="yellow">(máximo)</span></p>
                        <input type="number" step={0.5} value={parametros.b ?? 1}
                            onChange={e => { const v = Number(e.target.value); if (v > parametros.a) set('b', v) }} />
                    </label>
                </>
            )}
            {distribucion === 'exponencial' && <>{inputFloat('λ (tasa)', 'yellow', 'lambda', 0.01, 0.1)}</>}
        </div>
    )
}

const GraficaMedia = ({ datos, esperanza }) => {
    const { labels, mediaAcum } = useMemo(() => {
        const labels = []
        const mediaAcum = []
        let suma = 0
        datos.forEach((x, i) => {
            suma += x
            const n = i + 1
            if (n === 1 || n % Math.max(1, Math.floor(datos.length / 200)) === 0 || n === datos.length) {
                labels.push(n)
                mediaAcum.push(suma / n)
            }
        })
        return { labels, mediaAcum }
    }, [datos])

    const data = {
        labels,
        datasets: [
            {
                label: 'Media empírica x̄ₙ',
                data: mediaAcum,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59,130,246,0.08)',
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0.2,
                fill: false,
            },
            {
                label: `E[X] = ${Math.round(esperanza * 10000) / 10000}`,
                data: labels.map(() => esperanza),
                borderColor: '#EAB308',
                borderWidth: 1.5,
                borderDash: [6, 4],
                pointRadius: 0,
                fill: false,
            }
        ]
    }

    const opciones = {
        responsive: true,
        animation: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Media empírica → E[X]' }
        },
        scales: {
            x: { title: { display: true, text: 'n (número de observaciones)' } },
            y: { title: { display: true, text: 'x̄ₙ' } }
        }
    }

    return (
        <div className='grafica'>
            <Line data={data} options={opciones} />
        </div>
    )
}

// Solo tiene sentido en discretas; para continuas mostramos un histograma acumulado

const GraficaFrecuencia = ({ datos, distribucion, parametros }) => {
    const esDiscreta = ['bernoulli', 'binomial', 'geometrica', 'hipergeometrica', 'poisson'].includes(distribucion)

    const { labels, freqAcum, probTeorica } = useMemo(() => {
        if (!esDiscreta) return { labels: [], freqAcum: [], probTeorica: [] }

        // Valor más frecuente para trazar la frecuencia relativa de ese k
        const conteo = {}
        datos.forEach(x => { conteo[x] = (conteo[x] || 0) + 1 })
        const kModa = Number(Object.entries(conteo).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0)

        // Calcular probabilidad teórica de k = kModa
        let pTeorica = 0
        const { n = 10, p = 0.5, N = 50, K = 10, lambda = 4 } = parametros

        if (distribucion === 'bernoulli') pTeorica = kModa === 1 ? p : 1 - p
        if (distribucion === 'binomial') {
            const comb = (a, b) => { let r = 1; for (let i = 0; i < b; i++) r = r * (a - i) / (i + 1); return r }
            pTeorica = comb(n, kModa) * Math.pow(p, kModa) * Math.pow(1 - p, n - kModa)
        }
        if (distribucion === 'geometrica') pTeorica = Math.pow(1 - p, kModa - 1) * p
        if (distribucion === 'hipergeometrica') {
            const comb = (a, b) => { if (b > a || b < 0) return 0; let r = 1; for (let i = 0; i < b; i++) r = r * (a - i) / (i + 1); return r }
            pTeorica = comb(K, kModa) * comb(N - K, n - kModa) / comb(N, n)
        }
        if (distribucion === 'poisson') {
            const fact = k => k <= 1 ? 1 : k * fact(k - 1)
            pTeorica = (Math.pow(lambda, kModa) * Math.exp(-lambda)) / fact(kModa)
        }

        const labels = []
        const freqAcum = []
        let conteoK = 0
        datos.forEach((x, i) => {
            if (x === kModa) conteoK++
            const n2 = i + 1
            if (n2 === 1 || n2 % Math.max(1, Math.floor(datos.length / 200)) === 0 || n2 === datos.length) {
                labels.push(n2)
                freqAcum.push(conteoK / n2)
            }
        })

        return { labels, freqAcum, probTeorica: labels.map(() => pTeorica), kModa }
    }, [datos, distribucion, parametros])

    // Para continuas: mostrar la distribución acumulada empírica vs teórica CDF
    const { labelsC, ecdf, cdfTeorica } = useMemo(() => {
        if (esDiscreta) return {}

        const sorted = [...datos].sort((a, b) => a - b)
        const n = sorted.length
        const step = Math.max(1, Math.floor(n / 150))

        const labelsC = []
        const ecdf = []
        const cdfTeorica = []

        for (let i = step - 1; i < n; i += step) {
            const x = sorted[i]
            labelsC.push(x.toFixed(3))
            ecdf.push((i + 1) / n)

            let cdf = 0
            if (distribucion === 'normal') {
                const { mu = 0, sigma = 1 } = parametros
                const z = (x - mu) / sigma
                // Approx. de la CDF normal estándar
                cdf = 0.5 * (1 + erf(z / Math.sqrt(2)))
            }
            if (distribucion === 'uniforme') {
                const { a = 0, b = 1 } = parametros
                cdf = x < a ? 0 : x > b ? 1 : (x - a) / (b - a)
            }
            if (distribucion === 'exponencial') {
                const { lambda = 1 } = parametros
                cdf = x < 0 ? 0 : 1 - Math.exp(-lambda * x)
            }
            cdfTeorica.push(cdf)
        }

        return { labelsC, ecdf, cdfTeorica }
    }, [datos, distribucion, parametros])

    if (esDiscreta) {
        const data = {
            labels,
            datasets: [
                {
                    label: `Frec. relativa P(X=${labels.kModa ?? '?'})`,
                    data: freqAcum,
                    borderColor: '#22C55E',
                    backgroundColor: 'rgba(34,197,94,0.08)',
                    borderWidth: 1.5,
                    pointRadius: 0,
                    tension: 0.2,
                    fill: false,
                },
                {
                    label: `P(X=${labels.kModa ?? '?'}) teórica`,
                    data: probTeorica,
                    borderColor: '#F97316',
                    borderWidth: 1.5,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    fill: false,
                }
            ]
        }

        const opciones = {
            responsive: true,
            animation: false,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Frecuencia relativa → P(X=k)' }
            },
            scales: {
                x: { title: { display: true, text: 'n (número de observaciones)' } },
                y: { min: 0, max: 1, title: { display: true, text: 'Frecuencia relativa' } }
            }
        }

        return (
            <div className='grafica'>
                <Line data={data} options={opciones} />
            </div>
        )
    }

    // Continuas: ECDF vs CDF teórica
    const data = {
        labels: labelsC,
        datasets: [
            {
                label: 'F̂(x) empírica',
                data: ecdf,
                borderColor: '#22C55E',
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0,
                fill: false,
            },
            {
                label: 'F(x) teórica',
                data: cdfTeorica,
                borderColor: '#F97316',
                borderWidth: 1.5,
                borderDash: [6, 4],
                pointRadius: 0,
                fill: false,
            }
        ]
    }

    const opciones = {
        responsive: true,
        animation: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'F̂(x) empírica → F(x) teórica (CDF)' }
        },
        scales: {
            x: {
                ticks: { maxTicksLimit: 10, callback: (_, i) => Number(labelsC[i]).toFixed(2) },
                title: { display: true, text: 'x' }
            },
            y: { min: 0, max: 1, title: { display: true, text: 'Probabilidad acumulada' } }
        }
    }

    return (
        <div className='grafica'>
            <Line data={data} options={opciones} />
        </div>
    )
}

// Aproximación de la función error (erf) para la CDF normal
function erf(x) {
    const a1 =  0.254829592, a2 = -0.284496736, a3 =  1.421413741
    const a4 = -1.453152027, a5 =  1.061405429, p  =  0.3275911
    const sign = x < 0 ? -1 : 1
    x = Math.abs(x)
    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
    return sign * y
}


const PARAMS_DEFAULT = {
    n: 10, p: 0.5, maxK: 20,
    N: 50, K: 10, lambda: 4,
    mu: 0, sigma: 1, a: 0, b: 1
}

const LeyGrandesNumeros = () => {
    const [distribucion, setDistribucion] = useState('binomial')
    const [parametros, setParametros] = useState(PARAMS_DEFAULT)
    const [muestra, setMuestra] = useState(500)
    const [generado, setGenerado] = useState(false)
    const [datosGenerados, setDatosGenerados] = useState([])
    const [seed, setSeed] = useState(0) // para regenerar

    const generar = () => {
        const gen = generadores[distribucion]
        if (!gen) return
        setDatosGenerados(gen(parametros, muestra))
        setGenerado(true)
        setSeed(s => s + 1)
    }

    const esperanza = generado
        ? esperanzaTeorica[distribucion]?.(parametros) ?? 0
        : null

    return (
        <>
            <main>
                <div className="main_discretas">
                    <h1>datara</h1>
                    <h2>
                        Ley de los <span className='blue'>grandes números</span>
                    </h2>
                    <div className="discretas__texto">
                        <p>
                            La ley de los grandes números establece que, a medida que el tamaño de la muestra crece, la media empírica x̄ₙ converge a la esperanza teórica E[X]. Para distribuciones discretas también se visualiza cómo la frecuencia relativa de un evento converge a su probabilidad teórica; para continuas, cómo la distribución acumulada empírica F̂(x) se aproxima a la CDF teórica F(x).
                        </p>
                    </div>
                </div>
            </main>

            {/* Selector de distribución */}
            <div className='botones__discretas'>
                {DISTRIBUCIONES.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={distribucion === id ? 'activo' : ''}
                        onClick={() => { setDistribucion(id); setGenerado(false) }}
                    >
                        <Icon />
                        <p>{label}</p>
                    </button>
                ))}
            </div>

            {/* Inputs */}
            <div className='entradas__discretas'>
                <InputsDistribucion
                    distribucion={distribucion}
                    parametros={parametros}
                    setParametros={setParametros}
                />
            </div>

            {/* Tamaño de muestra */}
            <div className='contenedor__muestreo'>
                <label>
                    <p>Número de observaciones</p>
                    <div className="contenedor__slider">
                        <p>10</p>
                        <input
                            type="range" min={10} max={5000} step={10}
                            className='slider' value={muestra}
                            onChange={e => setMuestra(Number(e.target.value))}
                        />
                        <p>5000</p>
                    </div>
                    <span>{muestra}</span>
                </label>
            </div>

            {/* Botones */}
            <div className="contenedor__generar" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className='generar__boton' onClick={generar}>
                    <LuSparkles className='icon__generar' />
                    <p>Simular</p>
                </button>
                {generado && (
                    <button className='generar__boton' onClick={generar} style={{ opacity: 0.8 }}>
                        <LuRefreshCw className='icon__generar' />
                        <p>Regenerar</p>
                    </button>
                )}
            </div>

            {/* Gráficas */}
            {generado && (
                <>
                    <GraficaMedia
                        key={`media-${seed}`}
                        datos={datosGenerados}
                        esperanza={esperanza}
                    />
                    <GraficaFrecuencia
                        key={`freq-${seed}`}
                        datos={datosGenerados}
                        distribucion={distribucion}
                        parametros={parametros}
                    />

                    {/* Tabla resumen */}
                    <div className='tabla__resultados'>
                        <h3>Convergencia (n = {muestra})</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Teórico</th>
                                    <th>Empírico</th>
                                    <th>Diferencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Esperanza E[X]</td>
                                    <td>{Math.round(esperanza * 10000) / 10000}</td>
                                    <td>{Math.round((datosGenerados.reduce((a, b) => a + b, 0) / datosGenerados.length) * 10000) / 10000}</td>
                                    <td>{Math.round(Math.abs(esperanza - datosGenerados.reduce((a, b) => a + b, 0) / datosGenerados.length) * 10000) / 10000}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    )
}

export default LeyGrandesNumeros