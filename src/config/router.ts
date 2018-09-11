import Vue from 'vue'
import Router from 'vue-router'
import AbMain from '../views/home/body/Main.vue'
import PageNotFound from '../views/home/body/PageNotFound.vue'
import Home from '../views/home/Home.vue'
import Login from '../views/home/body/login/Login.vue'
import Signup from '../views/home/body/signup/SignUp.vue'
import FindPassword from '../views/home/body/login/findPassword/FindPassword.vue'
import GeneralTrade from '../views/home/body/tradeCenter/general/General.vue'
import BlockTrade from '../views/home/body/tradeCenter/block/Block.vue'
import CustomTokenTrade from '../views/home/body/tradeCenter/customToken/CustomTokenTrade.vue'
import GeneralAd from '../views/home/body/postAd/general/General.vue'
import BlockAd from '../views/home/body/postAd/block/Block.vue'
import Buy from '../views/home/body/trade/buy/Buy.vue'
import Sell from '../views/home/body/trade/sell/Sell.vue'
import MyOrder from '../views/home/body/myOrder/MyOrder.vue'
import MyOrderSimpleMobile from '../views/home/body/myOrder/MyOrderSimpleMobile.vue'
import MyAds from '../views/home/body/myAds/MyAds.vue'
import Wallet from '../views/home/body/wallet/Wallet.vue'
import WalletDetail from '../views/home/body/wallet/WalletDetail.vue'
import SMSVerification from '../views/home/body/wallet/walletList/SMSVerification/SMSVerification.vue'
import SuccessWithdraw from '../views/home/body/wallet/walletList/SMSVerification/SuccessWithdraw.vue'
import MyPage from '../views/home/body/myPage/MyPage.vue'
import Merchant from '../views/home/body/merchant/Merchant.vue'
import UserPage from '../views/home/body/tradeCenter/userPage/UserPage.vue'
import ChangePassword from '../views/home/body/myPage/additionalVue/ChangePassword.vue'
import ChangePhone from '../views/home/body/myPage/additionalVue/ChangePhone.vue'
import TurnOff from '../views/home/body/myPage/additionalVue/TurnOff.vue'
import LinkAccount from '../views/home/body/myPage/additionalVue/LinkAccount.vue'
import RestTradePassword from '../views/home/body/myPage/additionalVue/ResetTradePassword.vue'
import MyToken from '../views/home/body/service/MyToken.vue'
import Message from '../components/Message.vue'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
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
            component: FindPassword
        },
        {
            path: '/generalTrade',
            name: 'generalTrade',
            component: GeneralTrade
        },
        {
            path: '/blockTrade',
            name: 'blockTrade',
            component: BlockTrade
        },
        {
            path: '/customTokenTrade',
            name: 'customTokenTrade',
            component: CustomTokenTrade
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
            path: '/myOrderSimpleMobile',
            name: 'myOrderSimpleMobile',
            component: MyOrderSimpleMobile,
        },
        {
            path: '/myAds',
            name: 'myAds',
            component: MyAds,
        },
        {
            path: '/wallet',
            name: 'wallet',
            component: Wallet,
        },
        {
            path: '/walletdetail',
            name: 'walletdetail',
            component: WalletDetail,
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
        {
            path: '/userpage',
            name: 'userpage',
            component: UserPage,
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: ChangePassword,
        },
        {
            path: '/changePhone',
            name: 'changePhone',
            component: ChangePhone,
        },
        {
            path: '/turnOff',
            name: 'turnOff',
            component: TurnOff,
        },
        {
            path: '/linkAccount',
            name: 'linkAccount',
            component: LinkAccount,
        },
        {
            path: '/resetTradePassword',
            name: 'resetTradePassword',
            component: RestTradePassword,
        },
        {
            path: '/smsVerification',
            name: 'smsVerification',
            component: SMSVerification,
        },
        {
            path: '/successWithdraw',
            name: 'successWithdraw',
            component: SuccessWithdraw,
        },
        {
            path: '/message',
            name: 'message',
            component: Message,
        },
        {
            path: '/myToken',
            name: 'myToken',
            component: MyToken,
        },
        {
            path: '*',
            name: 'pageNotFound',
            component: PageNotFound,
        },

    ],
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
