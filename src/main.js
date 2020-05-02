import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import i18n from './i18n'

import 'vue-awesome/icons'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AppInit from './mixins/appInit.mixin'

import createSockets from './sockets'

import App from './App.vue'
import router from './router'
import store from './stores'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookSquare, faTwitterSquare, faTumblrSquare, faInstagram, faSnapchatSquare, faYoutubeSquare, faReddit } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCarousel from 'vue-carousel'

library.add(faFacebookSquare, faTwitterSquare, faTumblrSquare, faInstagram, faSnapchatSquare, faYoutubeSquare, faReddit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueCarousel)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

const socketServices = ['CHAT_SERVICE', 'ROOM_SEARCH_SERVICE', 'COINS_SERVICE', 'TRANSACTIONS_SERVICE']
createSockets(socketServices)

export default new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  computed: {
    ...mapState({
      cookiePolicyAccepted: state => state.app.cookiePolicyAccepted
    })
  },
  created () {
    this.checkCookie()
    this.hideSplash()
    if (this.cookiePolicyAccepted) {
      this.storageDataInit()
    }
  },
  methods: {
    ...mapMutations('app', { hideSplash: 'HIDE_SPLASH', checkCookie: 'CHECK_COOKIE_ACCEPTED' })
  },
  mixins: [AppInit]
}).$mount('#app')
