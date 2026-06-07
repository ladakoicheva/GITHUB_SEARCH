import './Chart.css'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Setting from './Setting/Setting';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement
);



const options = {
  responsive: true,


  plugins: {
    legend: {
      display: false,
      position: 'top',
    },

  },
};

const optionsForBar = {
  responsive: true,


  plugins: {
    legend: {
      display: false,
      position: 'top',
    },

  },
  scales: {
    x: {
   
      ticks: {
        display: false,
        color: '#f5eeee'
      },
      grid: {
        display: false
      }
    },
    y: {
      maxBarThickness: 50,
      ticks: {
        color: '#fdfdfd'
      },
      grid: {
        display: false
      }

    }

  }
}

const getRandomColor = () => {
  const red = random();
  const green = random();
  const blue = random();
  return { backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.6)`, borderColor: `rgb(${red}, ${green}, ${blue})` }
}

const random = () => {
  return Math.floor(Math.random() * 255)
}

const getColors = (repos) => {
  const colors = repos.reduce((acum, el) => {
    const colors = getRandomColor();
    acum.backgroundColor.push(colors.backgroundColor)
    acum.borderColor.push(colors.borderColor)
    return acum
  }, { backgroundColor: [], borderColor: [] })
  return colors
}

export default function Charts({ repos }) {

  const [userRepos, setUserRepos] = useState(repos);
  const [isOpenSetting, setIsOpenSetting] = useState(false)
  const [colorData, setColorData] = useState(getColors(repos));
  const [chartType, setChartType] = useState('Bar')


  const changeChart = (e) => {
    setChartType(e.target.value);
  }




  const switchConfig = repos.map((el) => {
    return { id: el.id, isActive: true };
  })
  const [config, setConfig] = useState(switchConfig);


  const toggle = (index) => {
    const configData = [...config];
    configData[index].isActive = !configData[index].isActive;

    setConfig(configData)


  }



  const deleteRepo = (elem, i) => {

    toggle(i)
    const colorCopy = { ...colorData }
    const reposCopy = [...userRepos];


    const index = reposCopy.indexOf(elem);

    console.log(index)
    if (index === -1) return;

    reposCopy.splice(index, 1);
    colorCopy.backgroundColor.splice(index, 1);
    colorCopy.borderColor.splice(index, 1);

    setUserRepos(reposCopy);
    setColorData(colorCopy);
  }





  const addRepo = (el, index) => {
    toggle(index)
    const colorCopy = { ...colorData }
    const colors = getRandomColor();

    colorCopy.backgroundColor.push(colors.backgroundColor)
    colorCopy.borderColor.push(colors.borderColor)

    setUserRepos([...userRepos, el])
    setColorData(colorCopy);

  }



  const data = useMemo(() => {

    const info = userRepos.reduce((acum, el) => {
      acum.data.push(el.size);
      acum.labels.push(el.name);
      return acum;
    }, { data: [], labels: [] })

    const data = {
      labels: info.labels,
      datasets: [

        {
         
          label: 'Size ',
          data: info.data,
          backgroundColor: colorData.backgroundColor,
          borderColor: colorData.borderColor,
          borderWidth: 1,
        },
      ],
    };





    return data


  }, [userRepos]);




  return (

    < >
      {userRepos.length !== 0 ?

        <div>
          <select onChange={changeChart} value={chartType} name="" id="">
            <option value="Doughnut">Doughnut</option>
            <option value="Bar">Bar</option>
          </select>
          <button className='searchBtn' onClick={() => setIsOpenSetting(!isOpenSetting)}>change setting</button >

        </div> : null}
      <section className='info'>

        {repos &&
          userRepos.length !== 0 ? <div className='chart'>
          {chartType == 'Doughnut' ? <Doughnut data={data} options={options} /> : <Bar options={optionsForBar} data={data} ></Bar>}
        </div> : null
        }

        {isOpenSetting &&
          <ul >
            <Setting repos={repos} add={addRepo} deleteRepo={deleteRepo} toggle={toggle} config={config}></Setting>
          </ul>


        }
      </section>



    </>
  )
}





