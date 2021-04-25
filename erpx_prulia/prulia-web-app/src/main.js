import Vue from 'vue'
import '@babel/polyfill'
import { VueMaskDirective } from 'v-mask'
import VueLocalStorage from 'vue-localstorage'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import TextTruncate from '@/components/common/TextTruncate'
import GlobalMixins from './mixins/global'
import filters from './filters'

Vue.config.productionTip = false
Vue.component('TextTruncate', TextTruncate)
Vue.directive('mask', VueMaskDirective)
Vue.mixin(GlobalMixins)
Vue.use(VueLocalStorage)

new Vue({
  router,
  store,
  vuetify,
  filters,
  render: h => h(App)
}).$mount('#app')
