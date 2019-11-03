// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Settings from './settings'
import Lodash from 'lodash'
import VueLodash from 'vue-lodash'

import Vue from 'vue'
import App from './App'
import VueApollo from 'vue-apollo'

import Router from './router'
import Mock from './mockapi'
import Axios from '@/core/utils/axiosRequest'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Store from './Store/index'
import Launcher from '@/core'
import Logger from '@/core/plugins/Logger'
import GraphqlApolloClient from '@/core/utils/GraphqlApolloClient'


Vue.use(ElementUI)
Vue.use(VueLodash)
Vue.use(Launcher)
Vue.use(Logger)
Vue.use(Settings.settinger)
Vue.use(VueApollo)
Vue.use(Mock)

Vue.config.productionTip = false
Vue.prototype.$http = Axios

const apolloProvider = new VueApollo({
  defaultClient: GraphqlApolloClient,
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:Store,
  router:Router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
