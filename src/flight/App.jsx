import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import DefRoutes from './router'

export default function App(props) {
  // const { name, singleSpa, mountParcel, some } = props
  
  return (
    <div className="main">
      <Router>
        <DefRoutes />
      </Router>
    </div>
  )
}