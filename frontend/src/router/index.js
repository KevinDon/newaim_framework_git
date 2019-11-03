import Vue from 'vue'
import Router from 'vue-router'

const files = require.context('../../src/apps/', true, /routers.js$/)
const routes = {}

files.keys().forEach(key => {
  console.debug('Local route file is ', key)
  routes[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/layout/admin'),
      children: Object.values(routes)
    },
  ],
})
// todo 后期加入动态路由
router.beforeEach((to, from, next) => {


  next()
})

export default router
