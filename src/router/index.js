import Vue from 'vue'
import Router from 'vue-router'
import mainscreen from "../components/mainscreen";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      components: {
        mainscreen:mainscreen
      }
    },
  ]
})
