import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function probabilidadGeometrica(p,k){
  return Math.pow(1-p,k-1)*p;
}

const GraficaGeometrica=({p,maxK})=>{

  const labels=[];
  const datos=[];

  for(let k=1;k<=maxK;k++){
    labels.push(`k=${k}`);
    datos.push(probabilidadGeometrica(p,k));
  }

  const data={
    labels,
    datasets:[
      {
        label:`Geométrica (p=${p})`,
        data:datos,
        backgroundColor:'#3B82F6',
        borderColor:'#3B82F6',
        borderWidth:1
      }
    ]
  };

  const opciones={
    responsive:true,
    plugins:{
      legend:{
        position:'top'
      },
      title:{
        display:true,
        text:'Distribución Geométrica'
      }
    },
    scales:{
      x:{
        title:{
          display:true,
          text:'Número de intentos (k)'
        }
      },
      y:{
        beginAtZero:true,
        title:{
          display:true,
          text:'Probabilidad P(X=k)'
        }
      }
    }
  };

  return(
    <div className='grafica'>
      <Bar data={data} options={opciones}/>
    </div>
  );
};

export default GraficaGeometrica;