import settings from '@/settings'

class VueLauncher {

  path = '@'
  pageList = []
  pages = {}

  constructor (vm, props) {
    let self = this
    let Stores = {}

    self.pageList = settings.settings.pages
    console.debug(`vue 控制器获得page列表`, this.pageList)
    self.pageList.forEach((_v, _i) => {
      let _vp = new VuePage(_v)
      self.pages[_v] = _vp
      console.debug(`vue 控制实例化page ${_v}`, _vp)
      // Stores[_v] = () => import()
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
      this.storePath = `@/pages/${_name}/store.js`
    }

    if (_component != null) {
      this.componentPath = _component
    } else {
      this.componentPath = `@/pages/${_name}/page.vue`
    }
  }

  getRouter (_name = null, _path = null, _component = null) {
    let _subRouter = () => import(path.join(`${this.path}`, 'router.js'));
    console.log(`引入子路由`, _subRouter);
    console.log(`子路由属性:`, this);
    try {
      return {
        name: `${_name || this.name}`,
        path: `${_path || this.path}`,
        components: {default: () => import(`@/pages/${_name}/${_component}`)}
      }
    } catch (e) {
        throw e
    }
  }

}

export default VueLauncher
