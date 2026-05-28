import React from 'react'
import '../styles/estadisticas.css'

// CÁLCULOS EMPÍRICOS (de los datos generados)
function mediaEmpirica(datos) {
    return datos.reduce((a, b) => a + b, 0) / datos.length
}

function varianzaEmpirica(datos) {
    const media = mediaEmpirica(datos)
    return datos.reduce((a, b) => a + Math.pow(b - media, 2), 0) / datos.length
}

function desviacionEmpirica(datos) {
    return Math.sqrt(varianzaEmpirica(datos))
}

// CÁLCULOS TEÓRICOS (fórmulas matemáticas)
function calcularTeorico(distribucion, parametros) {

    if (distribucion === 'bernoulli') {
        const { p } = parametros
        const media = p
        const varianza = p * (1 - p)
        return { media, varianza, desviacion: Math.sqrt(varianza) }
    }

    if (distribucion === 'binomial') {
        const { n, p } = parametros
        const media = n * p
        const varianza = n * p * (1 - p)
        return { media, varianza, desviacion: Math.sqrt(varianza) }
    }

    if (distribucion === 'geometrica') {
        const { p } = parametros
        const media = 1 / p
        const varianza = (1 - p) / Math.pow(p, 2)
        return { media, varianza, desviacion: Math.sqrt(varianza) }
    }

    if (distribucion === 'hipergeometrica') {
        const { N, K, n } = parametros
        const media = n * (K / N)
        const varianza = n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1))
        return { media, varianza, desviacion: Math.sqrt(varianza) }
    }

    if (distribucion === 'poisson') {
        const { lambda } = parametros
        return { media: lambda, varianza: lambda, desviacion: Math.sqrt(lambda) }
    }

    if (distribucion === 'normal') {
        const { mu, sigma } = parametros
        return { media: mu, varianza: Math.pow(sigma, 2), desviacion: sigma }
    }

    if (distribucion === 'uniforme') {
        const { a, b } = parametros
        const media = (a + b) / 2
        const varianza = Math.pow(b - a, 2) / 12
        return { media, varianza, desviacion: Math.sqrt(varianza) }
    }

    if (distribucion === 'exponencial') {
        const { lambda } = parametros
        const media = 1 / lambda
        const varianza = 1 / Math.pow(lambda, 2)
        return { media, varianza, desviacion: Math.sqrt(varianza) }
    }
}

const Estadisticos = ({ distribucion, parametros, datos, muestra }) => {

    if (!datos || datos.length === 0) return null

    const empirico = {
        media: mediaEmpirica(datos),
        varianza: varianzaEmpirica(datos),
        desviacion: desviacionEmpirica(datos)
    }

    const teorico = calcularTeorico(distribucion, parametros)

    const redondear = (n) => Math.round(n * 10000) / 10000

    return (
        <div className='tabla__resultados'>
            <h3>Resultados (muestra: {muestra})</h3>
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
                        <td>Media</td>
                        <td>{redondear(teorico.media)}</td>
                        <td>{redondear(empirico.media)}</td>
                        <td>{redondear(Math.abs(teorico.media - empirico.media))}</td>
                    </tr>
                    <tr>
                        <td>Varianza</td>
                        <td>{redondear(teorico.varianza)}</td>
                        <td>{redondear(empirico.varianza)}</td>
                        <td>{redondear(Math.abs(teorico.varianza - empirico.varianza))}</td>
                    </tr>
                    <tr>
                        <td>Desv. Estándar</td>
                        <td>{redondear(teorico.desviacion)}</td>
                        <td>{redondear(empirico.desviacion)}</td>
                        <td>{redondear(Math.abs(teorico.desviacion - empirico.desviacion))}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Estadisticos