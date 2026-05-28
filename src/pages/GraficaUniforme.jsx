import React from 'react'
import '../styles/grafica.css'

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

const GraficaUniforme = ({ a, b }) => {

  if (a >= b) return <p>a debe ser menor que b</p>

  const altura = 1 / (b - a)
  const margen = (b - a) * 0.2

  // Puntos clave para dibujar el rectángulo exacto
  const xPuntos = [
    a - margen, a - 0.0001, a, b, b + 0.0001, b + margen
  ]

  const yPuntos = [0, 0, altura, altura, 0, 0]

  const labels = xPuntos.map(x => x.toFixed(3))
  const datos = yPuntos

  const data = {
    labels,
    datasets: [
      {
        label: `Uniforme (a=${a}, b=${b})`,
        data: datos,
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        borderWidth: 2,
        pointRadius: 3,
        fill: true,
        tension: 0
      }
    ]
  }

  const opciones = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Distribución Uniforme — f(x)' }
    },
    scales: {
      x: {
        ticks: { maxTicksLimit: 8 },
        title: { display: true, text: 'x' }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Densidad f(x)' }
      }
    }
  }

  return (
    <div className='grafica'>
      <Line data={data} options={opciones} />
    </div>
  )
}

export default GraficaUniforme