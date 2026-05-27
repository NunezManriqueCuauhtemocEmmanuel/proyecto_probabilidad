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

// Combinatoria C(n,k)
function combinatoria(n, k) {

  if (k < 0 || k > n) return 0

  return factorial(n) / (factorial(k) * factorial(n - k))
}

// Probabilidad hipergeométrica
function probabilidadHipergeometrica(N, K, n, k) {

  return (
    combinatoria(K, k) *
    combinatoria(N - K, n - k)
  ) / combinatoria(N, n)

}

const GraficaHipergeometrica = ({ N, K, n }) => {

  // Validaciones
  if (N <= 0 || K < 0 || n <= 0) {
    return <p>Parámetros inválidos</p>
  }

  if (K > N) {
    return <p>K no puede ser mayor que N</p>
  }

  if (n > N) {
    return <p>n no puede ser mayor que N</p>
  }

  const labels = []

  const datos = []

  // k va desde 0 hasta min(n,K)
  const maxK = Math.min(n, K)

  for (let k = 0; k <= maxK; k++) {

    labels.push(`k=${k}`)

    const prob = probabilidadHipergeometrica(
      N,
      K,
      n,
      k
    )

    datos.push(prob)

  }

  const data = {
    labels,
    datasets: [
      {
        label: `Hipergeométrica (N=${N}, K=${K}, n=${n})`,
        data: datos,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Distribución Hipergeométrica'
      }

    },

    scales: {

      x: {

        title: {
          display: true,
          text: 'Número de éxitos (k)'
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

export default GraficaHipergeometrica