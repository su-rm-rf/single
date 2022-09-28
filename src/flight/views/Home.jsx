import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

import http from '../util/http'
import moment from 'moment'

export default function Home(props) {
  let [ state, setState ] = useState({
    cities: [],
    depature: '',
    destination: '',
    leaveDate: moment().format('YYYY-MM-DD'),
  })

  const getDepature = (ev) => {
    setState(Object.assign({}, state, {
      depature: ev.target.value
    }))
  }
  
  const getDestination = (ev) => {
    setState(Object.assign({}, state, {
      destination: ev.target.value
    }))
  }
  
  const getDate = (ev) => {
    setState(Object.assign({}, state, {
      leaveDate: ev.target.value
    }))
  }

  useEffect(() => {
    http.get('/city/list').then(res => {
      setState(Object.assign({}, state, {
        cities: res.data,
        depature: res.data[0].code,
        destination: res.data[1].code,
      }))
    })
  }, [])

  const navigate = useNavigate()
  const search = () => {
    if (state.depature === state.destination) {
      alert('出发地和目的地不能相同')
    } else {
      const model = {
        depature: state.depature,
        destination: state.destination,
        leaveDate: state.leaveDate
      }
      const params = Object.keys(model).map(key => key + '=' + model[key]).join('&')
      navigate(`/flight/list?${ params }`)
    }
  }

  return (
    <div className="home">
      <header>
        <h3>机票预定</h3>
      </header>
      <div>
        <p>
          <label>出发地</label>
          <select onChange={ getDepature } value={ state.depature }>
            {
              state.cities.map((item, index) => {
                return <option value={ item.code } key={ index }>{ item.name }</option>
              })
            }
          </select>
        </p>
        <p>
          <label>目的地</label>
          <select onChange={ getDestination } value={ state.destination }>
            {
              state.cities.map((item, index) => {
                return <option value={ item.code } key={ index }>{ item.name }</option>
              })
            }
          </select>
        </p>
        <p>
          <label>日 期</label>
          <input type="date" defaultValue={ state.leaveDate } min={ state.leaveDate } onChange={ getDate } />
        </p>
        <p className="submit">
          <input type="button" value="搜 索" onClick={ search } />
        </p>
      </div>
    </div>
  )
}