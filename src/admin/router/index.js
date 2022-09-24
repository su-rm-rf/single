import { createRouter, createWebHistory } from 'vue-router'

import OrderList from '../views/OrderList'

const routes = [
  {
    path: '/admin/order/list', component: OrderList,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router