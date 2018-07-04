import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import plugins from "@/config/plugins";
import configRouter from "@/config/router";
import {sync} from "vuex-router-sync";
import vuexStore from '@/vuex/config/store'
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false

plugins(Vue);

const store = new Vuex.Store(vuexStore)
const router = configRouter
sync(store, router)

const event = function event(Vue: any) {
    Vue.prototype.$eventBus = Vue.$eventBus = new Vue();
};

Vue.use(event);
Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
