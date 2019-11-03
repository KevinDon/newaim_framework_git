import settings from '@/settings'
import Vue from 'vue/'

class VueLauncher extends Vue{

  path = '@'
  pageList = []
  apps = {}

  constructor (vm, props) {
    super()
    let self = this
    let Stores = {}

    self.pageList = settings.settings.apps
    console.debug(`vue 控制器获得page列表`, this.pageList)
    self.pageList.forEach((_v, _i) => {
      let _vp = new VuePage(_v)
      self.apps[_v] = _vp
      console.debug(`vue 控制实例化page ${_v}`, _vp)
    })
  }

}

class VuePage {

  name = null
  path = null
  storePath = null
  componentPath = null

  constructor (_name, _path = null, _storePath = null, _component = null) {
    this.name = _name

    if (_path != null) {
      this.path = _path
    } else {
      this.path = '/' + _name
    }

    if (_storePath != null) {
      this.storePath = _storePath
    } else {
      this.storePath = `@/apps/${_name}/store.js`
    }

    if (_component != null) {
      this.componentPath = _component
    } else {
      this.componentPath = `@/apps/${_name}/page.vue`
    }
  }

  getRouter (_name = null, _path = null, _component = null) {
    let _subRouterPath = path.join(`${this.path}`, 'router.js')
    let _subRouter = () => import(`${_subRouterPath}`)


    try {
      return {
        name: `${_name || this.name}`,
        path: `${_path || this.path}`,
        components: {default: () => import(`@/apps/${_name}/${_component}`)}
      }
    } catch (e) {
      throw e
    }
  }

}

export default VueLauncher
