import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Probabilidad Bernoulli
function probabilidadBernoulli(p, k) {

  if (k === 1) return p

  return 1 - p

}

const GraficaBernoulli = ({ p }) => {

  // Validaciones
  if (p < 0 || p > 1) {
    return <p>La probabilidad debe estar entre 0 y 1</p>
  }

  const labels = []

  const datos = []

  // k solo puede valer 0 o 1
  for (let k = 0; k <= 1; k++) {

    labels.push(`k=${k}`)

    const prob = probabilidadBernoulli(
      p,
      k
    )

    datos.push(prob)

  }

  const data = {
    labels,
    datasets: [
      {
        label: `Bernoulli (p=${p})`,
        data: datos,
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  }

  const opciones = {

    responsive: true,

    plugins: {

      legend: {
        position: 'top'
      },

      title: {
        display: true,
        text: 'Distribución Bernoulli'
      }

    },

    scales: {

      x: {

        title: {
          display: true,
          text: 'Resultado (k)'
        }

      },

      y: {

        beginAtZero: true,

        title: {
          display: true,
          text: 'Probabilidad P(X=k)'
        }

      }

    }

  }

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Bar data={data} options={opciones} />
    </div>
  )
}

export default GraficaBernoulli