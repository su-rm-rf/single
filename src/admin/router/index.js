import { createRouter, createWebHistory } from 'vue-router'

import Default from '../views/Default'
import OrderList from '../views/OrderList'
import AirlineList from '../views/AirlineList'
import AirlineAdd from '../views/AirlineAdd'

const routes = [
  {
    path: '/admin', component: Default,
  },
  {
    path: '/admin/order/list', component: OrderList,
  },
  {
    path: '/admin/airline/list', component: AirlineList,
  },
  {
    path: '/admin/airline/add', component: AirlineAdd,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router