import Vue from 'vue'
import App from './App.vue'
import store from './store'

import PortalVue from 'portal-vue'

Vue.use(PortalVue)

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start({
    onUnhandledRequest: 'bypass'
  })
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
