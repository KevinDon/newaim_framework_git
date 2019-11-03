class VueRouteInstance {
  name = null
  path = null
  icon = null
  title = null
  layout = null
  children = []

  constructor (route) {
    for (let attribute in route) {
      this[attribute] = route[attribute]
    }
  }

  update (route) {
    for (let attribute in route) {
      this[attribute] = route[attribute]
    }
  }
}

class VueRouterBuilder {
  app = null
  routeList = []
  routers = []

  constructor (app = '', routeList) {
    this.routeList = routeList
    this.app = app
  }

  getRouters (routeList = null) {
    let self = this
    let routes = !!!routeList ? this.routeList : routeList

    let appRoute = this.buildRoute({
      name: this.app,
      path: `/${this.app}`,
      icon:'el-icon-user',
      component : {'template': '<div><router-view name="appPage"></router-view></div>'}
    })

    routes.forEach(route => {
      let routeInstance = self.buildRoute(route)
      appRoute.children.push(self.buildRoute(routeInstance))
    })

    // appRoute.beforeEnter = (to, from, next) => {
    //   let routeExist = appRoute.children.filter(item => to.path === `/${this.app}`)
    //   if (routeExist.length < 1 || to.path !== `/${this.app}`) {
    //     next(`/${this.app}`)
    //   }
    // }
    return appRoute
  }

  buildRoute (route) {
    let newRoutePath = route.path[0] === '.' ? route.path.replace(/^\./, `/${this.app}`) : route.path
    let newRoute = {
      app: this.app,
      icon: route.icon,
      path: newRoutePath,
    }

    if(!route.hasOwnProperty('component')){
      newRoute.components= {'appPage': () => import(`@/apps/${this.app}/${route.vue}`),}
      console.debug(`Route Component path is @/apps/${this.app}/${route.vue}`);
    }

    // if (route.path === '') {
    //   newRoute.path = `${this.app}`
    // }

    let routeInstance = new VueRouteInstance(route)
    routeInstance.update(newRoute)

    // delete (routeInstance.component)

    return routeInstance
  }
}

export default VueRouterBuilder
