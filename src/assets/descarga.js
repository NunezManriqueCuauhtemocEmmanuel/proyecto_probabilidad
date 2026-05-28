import { useRef } from 'react'

/**
 * useDescargarGrafica
 *
 * Hook reutilizable para exportar cualquier gráfica de Chart.js como PNG.
 *
 * Uso en un componente de gráfica:
 *
 *   const { chartRef, descargar } = useDescargarGrafica('binomial_n10_p05')
 *
 *   <div className='grafica'>
 *     <Bar ref={chartRef} data={data} options={opciones} />
 *     <button className='boton__descarga' onClick={descargar}>
 *       <LuDownload /> PNG
 *     </button>
 *   </div>
 *
 * El parámetro `nombre` es el nombre del archivo sin extensión.
 */
export function useDescargarGrafica(nombre = 'grafica') {

    const chartRef = useRef(null)

    const descargar = () => {

        // chartRef.current es la instancia del componente React de Chart.js
        // Su canvas está en chartRef.current.canvas
        const chart = chartRef.current

        if (!chart) return

        // Obtener el canvas nativo
        const canvas = chart.canvas ?? chart.ctx?.canvas

        if (!canvas) return

        const url = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = url
        a.download = `datara_${nombre}.png`
        a.click()
    }

    return { chartRef, descargar }
}