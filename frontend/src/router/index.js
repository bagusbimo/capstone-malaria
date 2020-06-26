import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Pasien from '../components/Pasien.vue'
import Medis from '../components/Medis.vue'
import Dokter from '../components/Dokter.vue'
import Kasus from '../components/Kasus.vue'
import Report from '../components/Report.vue'
import Navbar from '../components/Navbar.vue'
import Landing from '../components/Landing.vue'
import LandingPasien from '../components/LandingPasien.vue'
import LandingDokter from '../components/LandingDokter.vue'
import LandingMedis from '../components/LandingMedis.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/pasien',
    name: 'landingpasien',
    component: LandingPasien
  },
  {
    path: '/dokter',
    name: 'landingdokter',
    component: LandingDokter
  },
  {
    path: '/medis',
    name: 'landingmedis',
    component: LandingMedis
  },
   {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/navbar',
    name: 'navbar',
    component: Navbar
  },
  {
    path: '/pasiendata',
    name: 'pasien',
    component: Pasien,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('userType') === 'Pasien')
        next()
      else
        next({name:'landing'})
    }
  },
  {
    path: '/dokterdata',
    name: 'dokter',
    component: Dokter,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('userType') === 'Dokter')
        next()
      else
        next({name:'landing'})
    }
  },
  {
    path: '/medisinput',
    name: 'medis',
    component: Medis,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('userType') === 'Tenaga Medis')
        next()
      else
        next({name:'landing'})
    }
  },
  {
    path: '/kasus',
    name: 'kasus',
    component: Kasus,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('userType') === 'Dokter')
        next()
      else
        next({name:'landing'})
    },
    props: (route) => ({
      id: route.query.id
    })
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('userType') === 'Pasien')
        next()
      else
        next({name:'landing'})
    },
    props: (route) => ({
      id: route.query.id
    })
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!window.localStorage.getItem('userType') && to.name != 'landing') {
    next( { name: 'landing' } )
  }
  else
    next()
})

export default router
