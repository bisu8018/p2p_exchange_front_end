import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/home/body/login/Login.vue'
import Signup from '../views/home/body/signup/SignUp.vue'
import AbMain from '../views/home/body/Main.vue'
import FindPassword from '../views/home/body/login/findPassword/FindPassword.vue'
import TradeCenter from '../views/home/body/tradeCenter/TradeCenter.vue'
import PostAd from '../views/home/body/postAd/PostAd.vue'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/home/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/abMain',
      name: 'abMain',
      component: AbMain
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: FindPassword
    },
    {
      path: '/tradeCenter',
      name: 'tradeCenter',
      component: TradeCenter
    },
    {
      path: '/postAd',
      name: 'postAd',
      component: PostAd
    }
  ],
  mode:'history'
})
