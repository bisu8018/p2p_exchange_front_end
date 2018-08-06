import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import plugins from "@/config/plugins";
import configRouter from "@/config/router";
import {sync} from "vuex-router-sync";
import vuexStore from '@/vuex/config/store'
Vue.config.productionTip = false

plugins(Vue);

const store = new Vuex.Store(vuexStore)
const router = configRouter
sync(store, router)

/*const event = function event(Vue: any) {
    Vue.prototype.$eventBus = Vue.$eventBus = new Vue();
};*/

//Vue.use(event);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
