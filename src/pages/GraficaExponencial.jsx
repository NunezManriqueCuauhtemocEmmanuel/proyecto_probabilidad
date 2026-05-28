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

function densidadExponencial(x, lambda) {
  if (x < 0) return 0
  return lambda * Math.exp(-lambda * x)
}

const GraficaExponencial = ({ lambda }) => {

  if (lambda <= 0) return <p>λ debe ser mayor que 0</p>

  // Mostrar hasta donde la densidad cae cerca de 0
  const fin = 5 / lambda
  const pasos = 200
  const incremento = fin / pasos

  const labels = []
  const datos = []

  for (let i = 0; i <= pasos; i++) {
    const x = i * incremento
    labels.push(x.toFixed(3))
    datos.push(densidadExponencial(x, lambda))
  }

  const data = {
    labels,
    datasets: [
      {
        label: `Exponencial (λ=${lambda})`,
        data: datos,
        borderColor: '#F97316',
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.3
      }
    ]
  }

  const opciones = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Distribución Exponencial — f(x)' }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          callback: (_, i) => Number(labels[i]).toFixed(2)
        },
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

export default GraficaExponencial