import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import axios from 'axios'

export default function Home(props) {
  let [ state, setState ] = useState({
    msg: ''
  })
  useEffect(() => {
    axios.get('/server').then(res => {
      setState(res.data)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  const navigate = useNavigate()
  const search = () => {
    navigate('/flight/list')
  }
  return (
    <div className="main">
      <div style={{ height:'50px' }}>response from { state.msg }</div>
      <button onClick={ search }>搜索</button>
    </div>
  )
}