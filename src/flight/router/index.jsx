import React from 'react'
import { useRoutes } from 'react-router-dom'

import Home from '../views/Home'
import FlightList from '../views/FlightList'

export default function DefRoutes() {
  const routes = [
    {
      path: '/',
      children: [
        {
          path: '/flight', element: <Home />
        },
        {
          path: '/flight/list', element: <FlightList />
        },
      ]
    }
  ]
  
  const router = useRoutes(routes)
  return router
}