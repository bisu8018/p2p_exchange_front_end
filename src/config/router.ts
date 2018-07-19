import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/home/body/login/Login.vue'
import Signup from '../views/home/body/signup/SignUp.vue'
import AbMain from '../views/home/body/Main.vue'
//import FindPassword from '../views/home/body/login/findPassword/FindPassword.vue'
import TradeCenter from '../views/home/body/tradeCenter/TradeCenter.vue'
import GeneralAd from '../views/home/body/postAd/general/General.vue'
import BlockAd from '../views/home/body/postAd/block/Block.vue'
import Buy from '../views/home/body/buy/Buy.vue'

import PostAd from '../views/home/body/postAd/PostAd.vue'
import MyOrder from '../views/home/body/myOrder/MyOrder.vue'
import MyAds from '../views/home/body/myAds/MyAds.vue'
import Balances from '../views/home/body/balances/Balances.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
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
      //component: FindPassword
    },
    {
      path: '/tradeCenter',
      name: 'tradeCenter',
      component: TradeCenter
    },
    {
      path: '/blockAd',
      name: 'blockAd',
      component: BlockAd
    },
    {
      path: '/generalAd',
      name: 'generalAd',
      component: GeneralAd
    },
    {
      path : '/buy',
      name: 'buy',
      component: Buy
    },
      {
          path: '/myOrder',
          name: 'myOrder',
          component: MyOrder,
      },
      {
          path: '/myAds',
          name: 'myAds',
          component: MyAds,
      },
      {
          path: '/balances',
          name: 'balances',
          component: Balances,
      },
  ],
  mode:'history'
})
