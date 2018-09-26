import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
const Home = () => import('./views/Home') // 父组件
const IndexPage = () => import('./views/Index') // 首页
const UserManage = () => import('./views/systmagpager/UserManage') // 用户管理
const RoleManage = () => import('./views/systmagpager/RoleManage') // 角色管理
const AclManage = () => import('./views/systmagpager/AclManage') // 角色管理

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/index',
          menuName: '首页',
          component: IndexPage
        },
        {
          path: '/home/usermanage',
          menuName: '用户管理',
          component: UserManage
        },
        {
          path: '/home/rolemanage',
          menuName: '角色管理',
          component: RoleManage
        },
        {
          path: '/home/aclmanage',
          menuName: '权限管理',
          component: AclManage
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
