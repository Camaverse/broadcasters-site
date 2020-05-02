import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import List from '@/views/List'
import Watch from './views/Watch.vue'

import searchRoutes from './config/searchRoutes'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login/:token', name: 'Login', component: Login },
  { path: '/tagged/:tag', name: 'Tags', component: List },
  { path: `/:tag(${searchRoutes.join('|')})`, name: 'Genders', component: List },
  { path: `/:tag(faves)`, name: 'Faves', component: List },
  { path: `/:tag(recent)`, name: 'Recent', component: List },
  { path: '/watch/:slug', name: 'Watch', component: Watch },
  { path: '*', name: 'Not Found', component: NotFound }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
