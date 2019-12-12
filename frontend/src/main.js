// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// load plugins
import Launcher from './core/plugin/launcher';
import Settings from './core/plugin/settinger';
import Lodash from 'lodash';

import Logger from './core/plugin/logger';
import VueLodash from 'vue-lodash';
import Vue from 'vue';
import App from './core/App.vue';
import Router from './core/router';
import Axios from '@/core/utils/axiosRequest';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Store from './core/store.js';

Vue.use(Logger);
Vue.use(ElementUI);
Vue.use(VueLodash);
Vue.use(Launcher);
Vue.use(Settings);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
window.$lodash = Lodash;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: Store,
    router: Router,
    components: { App },
    template: '<App/>'
});
