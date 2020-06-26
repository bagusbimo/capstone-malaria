import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui'
import firebase from 'firebase'
import moment from 'vue-moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
import Vue2Filters from 'vue2-filters'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.config.productionTip = false
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI)
Vue.use(moment)
Vue.use(Vue2Filters)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

firebase.initializeApp({
  apiKey: "AIzaSyBI2CSuYc5B_HpGSL8oRN3su6cdh4T0VW8",
  authDomain: "malaria-98cdf.firebaseapp.com",
  databaseURL: "https://malaria-98cdf.firebaseio.com",
  projectId: "malaria-98cdf",
  storageBucket: "malaria-98cdf.appspot.com",
  messagingSenderId: "81306666341"
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
