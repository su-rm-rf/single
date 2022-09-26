import React, { useState, useEffect } from 'react'

import axios from 'axios'

export default function FlightList(props) {

  let [ state, setState ] = useState({
    msg: ''
  })

  useEffect(() => {
    axios.defaults.baseURL = '/backend'
    axios.get('/flight/list').then(res => {
      setState(res.data)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return (
    <div className="flightlist">
      {state.msg}
    </div>
  )
}