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

function densidadNormal(x, mu, sigma) {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
  )
}

const GraficaNormal = ({ mu, sigma }) => {

  if (sigma <= 0) return <p>σ debe ser mayor que 0</p>

  const rango = 4 * sigma
  const inicio = mu - rango
  const fin = mu + rango
  const pasos = 200
  const incremento = (fin - inicio) / pasos

  const labels = []
  const datos = []

  for (let i = 0; i <= pasos; i++) {
    const x = inicio + i * incremento
    labels.push(x.toFixed(2))
    datos.push(densidadNormal(x, mu, sigma))
  }

  const data = {
    labels,
    datasets: [
      {
        label: `Normal (μ=${mu}, σ=${sigma})`,
        data: datos,
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        tension: 0.4
      }
    ]
  }

  const opciones = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Distribución Normal — f(x)' }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          callback: (_, i) => Number(labels[i]).toFixed(1)
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

export default GraficaNormal