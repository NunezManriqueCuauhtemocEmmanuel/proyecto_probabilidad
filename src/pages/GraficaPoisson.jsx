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

// Factorial
function factorial(n) {

  if (n === 0 || n === 1) return 1

  return n * factorial(n - 1)
}

// Probabilidad Poisson
function probabilidadPoisson(lambda, k) {

  return (
    Math.pow(lambda, k) *
    Math.exp(-lambda)
  ) / factorial(k)

}

const GraficaPoisson = ({ lambda }) => {

  // Validaciones
  if (lambda <= 0) {
    return <p>Lambda debe ser mayor que 0</p>
  }

  const labels = []

  const datos = []

  // Rango de k
  const maxK = Math.ceil(lambda * 3)

  for (let k = 0; k <= maxK; k++) {

    labels.push(`k=${k}`)

    const prob = probabilidadPoisson(
      lambda,
      k
    )

    datos.push(prob)

  }

  const data = {
    labels,
    datasets: [
      {
        label: `Poisson (λ=${lambda})`,
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
        text: 'Distribución Poisson'
      }

    },

    scales: {

      x: {

        title: {
          display: true,
          text: 'Número de eventos (k)'
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
    <div className='grafica'>
      <Bar data={data} options={opciones} />
    </div>
  )
}

export default GraficaPoisson