<template>
  <div >
    <div v-if="isMobile" class="tap">
      <v-layout>
        <div class="tap-button" @click="goWallet">
          <div class="sprite-img2 ic-tab-wallet-gray"
               v-bind:class="{ 'ic-tab-wallet-blue': (isActive === 'Wallet') }"></div>
            {{$str("Wallet")}}
        </div>
        <div class="tap-button" @click="goOTC">
          <div class="sprite-img2 ic-tab-otc-gray"
               v-bind:class="{ 'ic-tab-otc-blue': (isActive === 'OTC') }"></div>
            {{$str("OTC")}}
        </div>
        <div class="tap-button" @click="goExchange">
          <div class="sprite-img2 ic-tab-exchange-gray"
               v-bind:class="{ 'ic-tab-exchange-blue': (isActive === 'Exchange') }"></div>
            {{$str("Exchange")}}
        </div>
        <div class="tap-button" @click="goService">
          <div class="sprite-img2 ic-tab-service-gray"
               v-bind:class="{ 'ic-tab-service-blue': (isActive === 'Service') }"></div>
          {{$str("Service")}}
        </div>
        <div class="tap-button" @click="goChat">
          <div class="sprite-img2 ic-tab-chat-gray"
               v-bind:class="{ 'ic-tab-chat-blue': (isActive === 'Chat') }"></div>
            {{$str("Chat")}}
        </div>
      </v-layout>
    </div>
    <div v-else>
      456
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../vuex/MainRepository";
    export default {
        name: "Tab",
        data: () => ({
            show : false,
            isActive : 'OTC',
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            isLogin() {
                return MainRepository.MyInfo.isLogin();
            },
        },
        methods: {
            goWallet(){
                this.isActive = 'Wallet'
                MainRepository.router().goWallet();
            },
            goOTC() {
                this.isActive = 'OTC'
                MainRepository.router().goMain();
            },
            goExchange(){
                this.isActive = 'Exchange'
                //MainRepository.router().goWallet();
            },
            goService(){
                this.isActive = 'Service'
                //MainRepository.router().goWallet();
            },
            goChat(){
                this.isActive = 'Chat'
                //MainRepository.router().goWallet();
            },
        },

    }
</script>

<style scoped>
  .tap{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    height: 64px;
    text-align: center;
    background-color: #ffffff;
    color: #9294a6;
  }
  .tap-button{
    width: 20%;
    height: 64px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
  }
</style>