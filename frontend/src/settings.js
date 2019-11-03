const settings = {
  mode: 'dev',
  lang: 'zh',
  pageList: [
    {
      name: 'testChart',
      path: 'TestChart',
      component: 'TestChart/page.vue',
      id: 'test-hart'
    },
    {
      name: 'Account',
      path: 'account',
      component: 'Account/account.vue',
      id: 'account'
    }
  ],
  server: {
    api: {
      host: 'http://localhost:3000',
      path: 'api',
      username: '',
      password: '',
    },
    graphQL: {
      host: 'http://localhost:3000',
    }
  },
  apps: [
    'TestChart', 'Account'
  ],
}

export default {
  settings: settings,
  settinger: (Vue) => {
    Vue.prototype.$settings = new Vue({
      data () {
        return {...settings}
      }
    })
  }
}
