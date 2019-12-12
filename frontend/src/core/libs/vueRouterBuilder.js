
/**
 * Vue Route 单个路由根实例
 * @description
 */
class VueRouteInstance {
  name = null;
  path = null;
  icon = null;
  title = null;
  layout = null;
  children = [];

  constructor (route) {
      for (let attribute in route) {
          this[attribute] = route[attribute];
      }
  }

  update (route) {
      for (let attribute in route) {
          this[attribute] = route[attribute];
      }
  }
}

class VueRouterBuilder {
  app = null;
  routeList = [];
  routers = [];

  constructor (app = '', routeList) {
      this.routeList = routeList;
      this.app = app;
  }

  getRouters (routeList = null) {
      let me = this;
      let routes = !routeList ? this.routeList : routeList;

      let appRoute = this.buildRoute({
          name: this.app,
          path: `/${this.app}`,
          icon: '',
          component : { 'template': '<div><router-view name="appPage"></router-view></div>' }
      });

      routes.forEach(route => {
          let routeInstance = me.buildRoute(route);

          appRoute.children.push(me.buildRoute(routeInstance));
      });

      console.debug(appRoute);

      return appRoute;
  }

  buildRoute (route) {
      let newRoutePath = route.path[0] === '.' ? route.path.replace(/^\./, `/${this.app}`) : route.path;
      let newRoute = {
          app: this.app,
          icon: route.icon,
          path: newRoutePath
      };

      console.debug(route.icon);

      if (!route.hasOwnProperty('component')){
          newRoute.components= { 'appPage': () => import(`@/apps/${this.app}/${route.vue}`) };
          console.debug(`Route Component path is @/apps/${this.app}/${route.vue}`);
      }

      let routeInstance = new VueRouteInstance(route);

      routeInstance.update(newRoute);

      return routeInstance;
  }
}

export default VueRouterBuilder;
