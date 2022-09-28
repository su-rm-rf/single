import React from 'react'
import { useRoutes } from 'react-router-dom'

import Home from '../views/Home'
import Checkout from '../views/Checkout'
import FlightList from '../views/FlightList'
import Order from '../views/Order'

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
        {
          path: '/flight/checkout', element: <Checkout />
        },
        {
          path: '/flight/order', element: <Order />
        },
      ]
    }
  ]
  
  const router = useRoutes(routes)
  return router
}