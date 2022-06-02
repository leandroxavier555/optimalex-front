import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Costumers from '../views/Costumers.vue'
import ContactInProgress from '../views/ContactInProgress.vue'
import Results from '../views/Results.vue'
//import { guard } from '@/services/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/costumers',
    name: 'Potencial Custumers',
    component: Costumers,
    meta: {
      requiresAuth: true,
    },
    /*beforeEnter: (to, from, next) => {
      guard(to, from, next)
    }, */
   
  },
  {
    path: '/contact',
    name: 'Contact in Progress',
    component: ContactInProgress,
    meta: {
      requiresAuth: true,
    },
    /*beforeEnter: (to, from, next) => {
      guard(to, from, next)
    }, */

   
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    meta: {
      requiresAuth: true,
    },
     /*beforeEnter: (to, from, next) => {
      guard(to, from, next)
    }, */
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === from.name) {
    return next()
  }
  if(to.name === 'Login'){
    if (localStorage.getItem('user-token') !== null){
      next({
        path: '/',
      })
    }
  }
  next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user-token') == null) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})




export default router
