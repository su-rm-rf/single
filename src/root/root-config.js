import { registerApplication, start } from 'single-spa'

import './main'

registerApplication(
  'shop',
  () => import('../shop/main.js'),
  (location) => location.pathname.startsWith('/shop'),
  { some: '2C' }
)

registerApplication({
  name: 'admin',
  app: () => import('../admin/main.js'),
  activeWhen: '/admin',
  customProps: {
    some: '2B' 
  }
})

registerApplication(
  'goods',
  () => import('../goods/main.js'),
  (location) => location.pathname.startsWith('/goods'),
  { some: 'goods' }
)

start()