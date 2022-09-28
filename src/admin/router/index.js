import { createRouter, createWebHistory } from 'vue-router'

import Default from '../views/Default'
import OrderList from '../views/OrderList'
import AirlineList from '../views/AirlineList'
import FlightAdd from '../views/FlightAdd'
import SeatList from '../views/SeatList'

import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'

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
    path: '/admin/flight/add', component: FlightAdd,
  },
  {
    path: '/admin/flight/seats', component: SeatList,
  },
  {
    path: '/admin/user/signin', component: SignIn
  },
  {
    path: '/admin/user/signup', component: SignUp
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const isSignin = !!localStorage.token, 
    signinURL = '/admin/user/signin',
    signupURL = '/admin/user/signup'

  if (!isSignin && to.path !== signinURL && to.path !== signupURL) {
    return signinURL
  }
})

export default router