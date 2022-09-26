import React from 'react'
import { useNavigate } from 'react-router'

import moment from 'moment'

export default function Home(props) {
  const cities = [
    {
      name: '北京', value: 'bj', 
    },
    {
      name: '上海', value: 'sh', 
    },
    {
      name: '深圳', value: 'sz', 
    },
    {
      name: '成都', value: 'cd', 
    }
  ]

  const getDepature = (ev) => {
    model.depature = ev.target.value
  }
  
  const getDestination = (ev) => {
    model.destination = ev.target.value
  }
  
  const getDate = (ev) => {
    model.date = ev.target.value
  }

  const model = {
    depature: cities[0].value,
    destination: cities[1].value,
    date: moment().format('YYYY-MM-DD')
  }

  const navigate = useNavigate()
  const search = () => {
    if (model.depature === model.destination) {
      alert('出发地和目的地不能相同')
    } else {
      const params = Object.keys(model).map(key => key + '=' + model[key]).join('&')
      navigate(`/flight/list?${ params }`)
    }
  }

  return (
    <div className="home">
      <h3>机票预定</h3>
      <p>
        <label>出发地</label>
        <select onChange={ getDepature } defaultValue={ model.depature }>
          {
            cities.map((item, index) => {
              return <option value={ item.value } key={ index }>{ item.name }</option>
            })
          }
        </select>
      </p>
      <p>
        <label>目的地</label>
        <select onChange={ getDestination } defaultValue={ model.destination }>
          {
            cities.map((item, index) => {
              return <option value={ item.value } key={ index }>{ item.name }</option>
            })
          }
        </select>
      </p>
      <p>
        <label>日 期</label>
        <input type="date" defaultValue={ model.date } min={ model.date } onChange={ getDate } />
      </p>
      <p className="search">
        <input type="button" value="搜 索" onClick={ search } />
      </p>
    </div>
  )
}