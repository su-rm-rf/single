import React, { useRef, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import http from '../util/http'

import SeatList from '../components/SeatList'

export default function FlightList(props) {

  let [ state, setState ] = useState({
    isSignin: !!localStorage.token,
    flights: [],
    selectedSeat: '',
    inOrUp: '',
    seats: []
  })

  const [ searchParams ] = useSearchParams()
  const model = {
    depature: searchParams.get('depature'),
    destination: searchParams.get('destination'),
    leaveDate: searchParams.get('leaveDate'),
  }

  const toggleSeats = (code) => {
    http.get(`/flight/seats?code=${ code }`).then(res => {
      setState(Object.assign({}, state, {
        selectedSeat: code,
        seats: res.data,
        inOrUp: 'in',
      }))
    })
  }

  const getFlightList = () => {
    const params = Object.keys(model).map(item => item + '=' + model[item]).join('&')
    http.get(`/flight/list?${ params }`).then(res => {
      setState(Object.assign({}, state, {
        flights: res.data
      }))
    })
  }

  useEffect(() => {
    getFlightList()
  }, [])

  const handleSignin = async (userModel) => {
    let canSubmit = true
    Object.values(userModel).map(item => !item && (canSubmit = false))
    if (!canSubmit) {
      alert('不能为空')
    } else {
      await http.post(`/user/signin`, userModel).then(res => {
        const isSignin = !!res.data.token
        if (isSignin) {
          setState(Object.assign({}, state, {
            isSignin: isSignin,
            inOrUp: 'in',
          }))
          localStorage.token = res.data.token
          localStorage.user = JSON.stringify(res.data.user)
        } else {
          alert('用户名或密码错误')
        }
      })
    }
  }

  const handleSignup = async (userModel) => {
    let canSubmit = true
    Object.values(userModel).map(item => !item && (canSubmit = false))
    if (!canSubmit) {
      alert('不能为空')
      setState(Object.assign({}, state, {
        inOrUp: 'in'
      }))
    } else {
      await http.post(`/user/signup`, userModel).then(res => {
        const isSignin = !!res.data.token
        if (isSignin) {
          setState(Object.assign({}, state, {
            isSignin: isSignin,
            inOrUp: 'in',
          }))
          localStorage.token = res.data.token
          localStorage.user = JSON.stringify(res.data.user)
        } else {
          alert('注册失败！')
        }
      })
    }
  }
  
  const toggleInOrUp = (val) => {
    setState(Object.assign({}, state, {
      inOrUp: val
    }))
  }

  return (
    <div className="flightlist">
      <header>
        <h3>航班列表</h3>
        { model.leaveDate }
      </header>
      {
        !state.flights.length && 
        <div>暂无搜索结果</div>
      }
      {
        state.flights.map((flight, idx) => {
          return (
            <div className="flight-list" key={ idx }>
              <div className="flight">
                <div className="col">
                  <label>{ flight.airlineName }</label>
                  <span>{ flight.code }</span>
                </div>
                <div className="col">
                  <label>{ flight.depatureName }</label>
                  <span>{ flight.leaveTime }</span>
                </div>
                <div className="col">
                  <label>{ flight.depatureName }</label>
                  <span>{ flight.arriveTime }</span>
                </div>
                <div className="col">
                  <input type="button" value="订票" onClick={ () => toggleSeats(flight.code) } />
                </div>
              </div>
                {
                  state.selectedSeat === flight.code && 
                  <SeatList 
                    seats={ state.seats } 
                    inOrUp={ state.inOrUp } 
                    handleSignin={ handleSignin } 
                    handleSignup={ handleSignup } 
                    toggleInOrUp={ toggleInOrUp }
                  />
                }
            </div>
          )
        })
      }
    </div>
  )
}