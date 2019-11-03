// 日志工具
const Logger = (Vue, options) => {
  Vue.prototype.$logger = new Vue({
    data () {
      return {...options}
    },
    methods: {
      log (msg = '', level = 'info', opts) {
        console[level](`[${level}] ${msg}\n`, opts)
      },
      debug(msg='',opts){
        this.log(msg,'debug',opts)
      }
    }
  })
}

export default Logger
