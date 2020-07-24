// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from "vuetify";
import VueBus from 'vue-bus';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(router)
Vue.use(Vuetify)
Vue.use(VueBus)
Vue.prototype.$axios = axios;
Vue.prototype.bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify:new Vuetify(),
  template: '<App/>',
  VueBus,
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  render: h=>h(App),//加载原则
})
