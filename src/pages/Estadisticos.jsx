import React from 'react'

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
        <div>
            <h3>Resultados — {distribucion} (muestra: {muestra})</h3>
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
                        <td>Mediaa</td>
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