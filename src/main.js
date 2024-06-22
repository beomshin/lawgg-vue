import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/dropdown'
import '@/plugins/modal'
import '@/plugins/vueSelect'
import '@/plugins/cookies'

import './assets/css/fonts.css'
import './assets/css/style.css'
import './assets/css/layout.css'
import './assets/css/common.css'
import './assets/css/content.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
