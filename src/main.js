// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 5.1 添加全局导航守卫（路由拦截）
router.beforeEach((to, from, next) => {
  // a 如果用户登录了，想要跳转到非登录页，我们就让它继续，不拦它
  // 登录（/login） 也不拦它
  // b 如果用户没有登录，想要跳转到非登录页， 我们要拦它，不让它跳转到首页，让它回到登录页
  // 登录（/login） 不拦它，让它继续
  let mytoken = localStorage.getItem('mytoken')
  if (mytoken) {
    next()
  } else {
    if (to.name !== 'login') {
      // 未登录用户访问非登录页面，需要拦截下来，让它去到登录页
      next('/login')
    } else {
      // 未登录用户访问登录页面就直接让它访问
      next()
    }
  }
})
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
