import Vue from 'vue'
import App from './App.vue'
import router from './router'
import myPlugins from './plugins/myPlugins'
import store from './store/index'
import vuetify from './plugins/vuetify';
import 'es6-promise/auto'


Vue.config.productionTip = false
Vue.use(myPlugins)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

