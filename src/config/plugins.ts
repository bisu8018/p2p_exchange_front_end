import Vuetify from 'vuetify'
import '../../node_modules/vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {wbString} from "@/config/localization";
//  import VeeValidate from 'vee-validate'

export default (Vue: any) => {
  Vue.use(Vuex);
  Vue.use(VueRouter);

  // Design Plugin
  Vue.use(Vuetify, {
    theme: {
      primary: '#42b6f6',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c',

      //COMMON COLOR
      green: '#00ce7d',
      wbGreen: '#00ce7d',
      sky: '#42b6f6',
      deepSky: '#0098ed',
      WbRed: '#ff585c',
      WbYellow: '#ffaf26',
      kakaoYellow: '#ffea00',
      darkNavy: '#163354',
      deepNavy: '#122b47',
      navy: '#192b41',
      transparent: 'transparent',
      lightGray: '#f3f8ff',
      wbPurple: '#9190ef',
    }
  })

  // Localization
  Vue.prototype.$str = function (key: string) {
    return wbString(key);
  }
}
