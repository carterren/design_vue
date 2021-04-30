import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index'),
    }]
  }
]
export default new Router({
   mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/system/statistics',
    name: '',
    meta: {title: '功能模块', icon: 'tree'},
    children: [
      {
        path: 'statistics',
        name: '数据看板',
        component: _import('statistics/statistics'),
        meta: {title: '数据看板', icon: 'example'},
        menu: 'statistics'
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户', icon: 'table'},
    children: [
      {
        path: 'userlist',
        name: '用户列表',
        component: _import('user/user'),
        meta: {title: '用户列表', icon: 'user'},
        menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
    ]
  },
  {
    path: '/cargo',
    component: Layout,
    redirect: '/cargo/cargo',
    name: '货物管理',
    meta: {title: '货物管理', icon: 'noselect'},
    children: [
      {
        path: 'cargo',
        name: '货物',
        component: _import('cargo/cargo'),
        meta: {title: '货物列表', icon: 'example'},
        menu: 'cargo'
      }, {
        path: 'cargoType',
        name: '货物类型',
        component: _import('cargo/cargoType'),
        meta: {title: '货物类型', icon: 'example'},
        menu: 'cargoType'
      },
    ]
  },
  {
    path: '/plan',
    component: Layout,
    redirect: '/plan/plan',
    name: '',
    meta: {title: '计划管理', icon: 'noselect'},
    children: [
      {
        path: 'plan',
        name: '计划管理',
        component: _import('plan/plan'),
        meta: {title: '计划管理', icon: 'example'},
        menu: 'plan'
      }
    ]
  },
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/warehouse/warehouse',
    name: '',
    meta: {title: '仓库管理', icon: 'noselect'},
    children: [
      {
        path: 'warehouse',
        name: '仓库管理',
        component: _import('warehouse/warehouse'),
        meta: {title: '仓库管理', icon: 'example'},
        menu: 'warehouse'
      }
    ]
  },
  {
    path: '/vehicle',
    component: Layout,
    redirect: '/vehicle/vehicle',
    name: '',
    meta: {title: '车辆管理', icon: 'noselect'},
    children: [
      {
        path: 'vehicle',
        name: '车辆管理',
        component: _import('vehicle/vehicle'),
        meta: {title: '车辆管理', icon: 'example'},
        menu: 'vehicle'
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]
