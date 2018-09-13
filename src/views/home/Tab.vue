<template>
    <div class="tap">
      <v-layout>
          <!--Wallet-->
        <div class="tap-button" @click="goWallet">
          <div class="sprite-img2 ic-tab-wallet-gray"
               v-bind:class="{ 'ic-tab-wallet-blue': (getDomain === 'Wallet') }"></div>
            <h6 v-bind:class="{ 'color-blue': (getDomain === 'Wallet') }">
            {{$str("Wallet")}}</h6>
        </div>
          <!--OTC-->
        <div class="tap-button" @click="goOTC">
          <div class="sprite-img2 ic-tab-otc-gray"
               v-bind:class="{ 'ic-tab-otc-blue': (getDomain === 'OTC') }"></div>
            <h6 v-bind:class="{ 'color-blue': (getDomain === 'OTC') }"
            >{{$str("OTC")}}</h6>
        </div>
          <!--Exchange-->
        <div class="tap-button" @click="goExchange">
          <div class="sprite-img2 ic-tab-exchange-gray"
               v-bind:class="{ 'ic-tab-exchange-blue': (getDomain === 'Exchange') }"></div>
            <h6 v-bind:class="{ 'color-blue': (getDomain === 'Exchange') }"
            >{{$str("Exchange")}}</h6>
        </div>
          <!--Service-->
        <div class="tap-button" @click="goService">
          <div class="sprite-img2 ic-tab-service-gray"
               v-bind:class="{ 'ic-tab-service-blue': (getDomain === 'Service') }"></div>
            <h6 v-bind:class="{ 'color-blue': (getDomain === 'Service') }"
            >{{$str("Service")}}</h6>
        </div>
          <!--Chat-->
        <div class="tap-button" @click="goChat">
          <div class="sprite-img2 ic-tab-chat-gray"
               v-bind:class="{ 'ic-tab-chat-blue': onChat}"></div>
            <h6 v-bind:class="{ 'color-blue': onChat}"
            >{{$str("Chat")}}</h6>
        </div>
      </v-layout>
    </div>
</template>

<script>
    import MainRepository from "../../vuex/MainRepository";
    export default {
        name: "Tab",
        data: () => ({
            show : false,
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            isLogin() {
                return MainRepository.MyInfo.isLogin();
            },
            getDomain(){
                return MainRepository.State.getDomain();
            },
            onChat() {
                return MainRepository.Chat.controller().getChatStatus();
            }
        },
        methods: {
            goWallet(){
                MainRepository.router().goWallet();
            },
            goOTC() {
                MainRepository.router().goMain();
            },
            goExchange(){
                MainRepository.State.setDomain('Exchange')
                //MainRepository.router().goWallet();
            },
            goService(){
                MainRepository.router().goWallet();
            },
            goChat(){
                if(!this.onChat){
                    MainRepository.Chat.isOpened();
                }else{
                    MainRepository.Chat.isClosed();
                }
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