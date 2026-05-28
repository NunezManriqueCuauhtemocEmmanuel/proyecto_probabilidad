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

function factorial(n) {
  if (n === 0 || n === 1) return 1
  return n * factorial(n - 1)
}

function combinatoria(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k))
}

function probabilidadBinomial(n, p, k) {
  return combinatoria(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

const GraficaBinomial = ({ n, p }) => {

  const labels = []
  const datos = []

  for (let k = 0; k <= n; k++) {
    labels.push(`k=${k}`)
    datos.push(probabilidadBinomial(n, p, k))
  }

  const data = {
    labels,
    datasets: [
      {
        label: `Binomial (n=${n}, p=${p})`,
        data: datos,
        backgroundColor: '#0F172A',
        borderColor: '#0F172A',
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
      text: 'Distribución Binomial'
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
        text: 'Probabilidad P(X = k)'
      }
    }
  }
};

  return (
    <div className='grafica'>
      <Bar data={data} options={opciones} />
    </div>
  )
}

export default GraficaBinomial