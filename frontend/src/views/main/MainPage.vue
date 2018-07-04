<template>
  <div class="mainPage-wrapper">  
      <div class="header-container" >
        <div class="header-nav">
            <router-link to="/mainPage">
                <img class="logo_img" src="../../assets/logo_sbj.png" >
            </router-link>
            <img class="menu_img" src="../../assets/menu_icon.png" > 
        </div>
      </div>     
        <div class="mainPage-wrapper">
            <router-view></router-view>  
        </div>
         <div class="footer-wrapper">
            <div class="footer-nav">
                <div class="navigation">            
                    <div class="navi_content" @click="wallet()">WALLET</div>
                    <div class="navi_content" @click="OTC()">OTC</div>
                    <div class="navi_content" @click="notice()">NOTICE</div>
                    <div class="navi_content" @click="account()">ACCOUNT</div>
                    <div class="navi_content" @click="help()">HELP</div>
                </div>
            <div class="footer-nav-border"></div>
            </div>
            <div class="footer-container">
                <div class="footer-container2">
                    <div>
                        <img class="logo-footer" src="../../assets/logo_footer.png">
                    </div>
                    <div>
                        <p class="font-thin">
                            <strong>AllB Lab Inc.</strong> 
                            | CEO Jiny | 
Company Registration Number 123-45-78910 <br> 
                            15, Pangyo-ro 228beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea
                        </p>
                    </div>
                    <div>
                        <p class="font-thin footer-copyright">Copyright © 2017 Coinone Inc. All rights reserved.</p>
                    </div>
                </div>
            </div> 
    </div>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import Wallet from './wallet/Wallet.vue'
import Send from './wallet/sub/send/Send.vue'
import Receive from './wallet/sub/receive/Receive.vue'
import OTC from './OTC/OTC.vue'
import Notice from './notification/Notice.vue'
import Account from './account/Account.vue'
import Help from './help/Help.vue'
import Transaction from './account/sub/Transaction.vue'
import Contacts from './account/sub/Contacts.vue'
import Settings from './account/sub/Settings.vue'
import FAQ from './help/sub/FAQ.vue'
import QNA from './help/sub/QNA.vue'
import Feedback from './help/sub/Feedback.vue'
import QR from '../../common/components/QR'

// QR코드 관련 소스
import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader'

  
Vue.use(VueQrcodeReader)
//************************* */


const router = new VueRouter({
  routes : [
    {path : '/QR', component: QR},
    {path : '/wallet', component: Wallet},    
    {path : '/wallet/send', component: Send},    
    {path : '/wallet/receive', component: Receive},
    {path : '/OTC', component: OTC},
    {path : '/notice', component: Notice},
    {path : '/account', component: Account,
        children: [
            {path : '/account/transaction', component: Transaction},
            {path : '/account/contacts', component: Contacts},
            {path : '/account/settings', component: Settings}
        ]
    },
    {path : '/help', component: Help,
        children: [
            {path : '/help/FAQ', component: FAQ},
            {path : '/help/QNA', component: QNA},
            {path : '/help/Feedback', component: Feedback}
        ]
    }
  ]
})

export default {
  name: 'mainPage',
  router,
  created() {
      this.$router.push('/QR');  
  },
  methods: {
      wallet () {
          this.$router.push('/wallet');  
      },
      OTC () {
          this.$router.push('/OTC');  
      },
      notice () {
          this.$router.push('/notice');  
      },
      account () {
          this.$router.push('/account');  
      },
      help () {
          this.$router.push('/help');  
      }
  }  
}
</script>

<style scoped>
    .logo_img{
        margin-top: 11px;
        float: left;
        margin-left: 12px;
    }
    .header-container{
       height: 45px;
    }
    .header-nav{
        height: 45px;
        position: fixed;
        width: 100%;
        background: #083b65;
        z-index: 1;
    }

    .navigation{
        height: 100%;
        display: flex;        
    } 
    .navi_content{
        background: #ededed;
        text-decoration: none;
        width: 20%;
        font-size: 12px;
        padding-top: 17px;
        color: #5f5f5f;
        cursor : pointer;
    }
    .navi_content:hover {
        font-weight : bold;
    }

    .mainPage-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background : white;
    }

    .footer-nav {
        width: 100%;
        height: 54px;
    }

    .mainPage-wrapper {
        width: 100%;
    }
   
    .menu_img{
        float: right;
        margin-top: 8px;
        margin-right: 17px;
        cursor: pointer;
    }
    .footer-container{
        width: 100%;
        background: #eeeeee; 
        position: relative;
        min-height: 200px;
    }
    .footer-wrapper{
        position: relative;
        width: 100%;        
    }
    .font-thin {
        font-size: 13px;
        font-weight: 300;
        color: #858585;
    }
    .logo-footer{
        margin-bottom: 11px; 
        margin-top: 10px;
    }
    .footer-container2{
        padding: 11px;
    }
    .font-company{
        margin-bottom: 34px;        
    }
    .footer-nav-border{
        border-bottom: 1px solid #bcbcbc;
        width: 100%;            
        z-index: 1;
    }
    .footer-copyright {
        margin-top: 40px;
        bottom: 0;
    }
</style>
