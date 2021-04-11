import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/pages/Login";
import Statistics from "@/pages/Statistics";
import Home from "@/components/Home";
import WorkerType from "@/pages/WorkerType";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/Statistics',
        name: 'statistics',
        component: Statistics,
      },
      {
        path: '/Cargo',
        name: 'Cargo',
        component: resolve => require(['../pages/Cargo'],resolve),
      },
      {
        path: '/CargoType',
        name: 'CargoType',
        component: resolve => require(['../pages/CargoType'],resolve),
      },
      {
        path: '/Vehicle',
        name: 'Vehicle',
        component: resolve => require(['../pages/Vehicle'],resolve),
      },
      {
        path: '/Warehouse',
        name: 'Warehouse',
        component: resolve => require(['../pages/Warehouse'],resolve),

      },
      {
        path: '/Plan',
        component: resolve => require(['../pages/Plan.vue'], resolve)
      },
      {
        path: '/Worker',
        component: resolve => require(['../pages/Worker.vue'], resolve),
      },
      {
        path: '/WorkerType',
        name: WorkerType,
        component: resolve => require(['../pages/WorkerType.vue'], resolve)
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
