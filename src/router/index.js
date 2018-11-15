import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import Users from '@/views/Users.vue'
import Categories from '@/views/goods/Categories.vue'
import '@/styles/index.scss'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {name: 'welcome'},
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'categories',
          name: 'categories',
          component: Categories
        }
      ]
    }

  ]
})
