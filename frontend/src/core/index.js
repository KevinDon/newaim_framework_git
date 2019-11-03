import VueLauncher from './libs/vueLauncher'

export default {
  install (Vue, options) {
    Vue.prototype.$launcher = new VueLauncher(Vue, options)
  }
}
