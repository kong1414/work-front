import Vue from 'vue'
import App from './App.vue'
import router from './router'
import md5 from 'js-md5'
import './plugins/element.js'
import '@/assets/styles/index.scss'
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$md5 = md5

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
