import Vue from 'vue'
import Router from 'vue-router'
import AbMain from '../views/home/body/Main.vue'
import Home from '../views/home/Home.vue'
import Login from '../views/home/body/login/Login.vue'
import Signup from '../views/home/body/signup/SignUp.vue'
//import FindPassword from '../views/home/body/login/findPassword/FindPassword.vue'
import TradeCenter from '../views/home/body/tradeCenter/general/General.vue'
import BlockTrade from '../views/home/body/tradeCenter/block/Block.vue'
import GeneralAd from '../views/home/body/postAd/general/General.vue'
import BlockAd from '../views/home/body/postAd/block/Block.vue'
import Buy from '../views/home/body/trade/buy/Buy.vue'
import Sell from '../views/home/body/trade/sell/Sell.vue'
import MyOrder from '../views/home/body/myOrder/MyOrder.vue'
import MyAds from '../views/home/body/myAds/MyAds.vue'
import Balances from '../views/home/body/balances/Balances.vue'
import MyPage from '../views/home/body/myPage/MyPage.vue'
import Merchant from '../views/home/body/merchant/Merchant.vue'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'abMain',
            component: AbMain
        },
        {
            path: '/abMain',
            name: 'abMain',
            component: AbMain
        },
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
            path: '/blockTrade',
            name: 'blockTrade',
            component: BlockTrade
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
            path: '/buy',
            name: 'buy',
            component: Buy
        },
        {
            path: '/sell',
            name: 'sell',
            component: Sell
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
        {
            path: '/myPage',
            name: 'myPage',
            component: MyPage,
        },
        {
            path: '/merchant',
            name: 'merchant',
            component: Merchant,
        },

    ],
    mode: 'history'
})
