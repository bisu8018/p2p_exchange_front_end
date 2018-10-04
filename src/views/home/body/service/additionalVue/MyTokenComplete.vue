<template>
    <v-flex xs12 md6 offset-md3 container-wrapper mt-5>
        <div class="sprite-img2 ic-success-md  mb-3 d-inline-block"></div>
        <h3 class="font-weight-bold ">{{ status === 'registered' ? $str('myTokenOrderSubj') :
            $str('myTokenCompleteSubj') }}</h3>
        <div class="divider-css" :class="{'divider-css-mobile' : isMobile}"></div>
        <h5 class="color-darkgray pa-1" :class="{'content-css' : !isMobile}">{{ status === 'registered' ?
            $str('myTokenOrderContent') : $str('myTokenCompleteContent') }}</h5>
        <div class="divider-css" :class="{'divider-css-mobile' : isMobile}"></div>
        <button class="btn-blue-wallet btn-blue-hover mt-2 mb-2" @click="goWallet()">
            {{ $str("Wallet") }}
        </button>
    </v-flex>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'myTokenComplete',
        data: () => ({}),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            status() {
                return MainRepository.MyToken.controller().getMyToken().status
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                if (!MainRepository.MyInfo.isLogin()) {
                    MainRepository.router().goLogin();
                    return false;
                } else {
                    let tokenInfo = MainRepository.MyToken.controller().getMyToken();
                    if (tokenInfo.isNull()) {
                        MainRepository.router().goMyToken();
                    }
                    MainRepository.State.setDomain('Service');
                }
            },
            goWallet() {
                MainRepository.router().goWallet();
            }
        }
    });

</script>

<style scoped>
    .container-wrapper {
        border-radius: 3px;
        background-color: #ffffff;
        border: solid 1px #8d8d8d;
        padding-top: 24px;
        padding-bottom: 24px;
    }

    .divider-css {
        border-bottom: 1px solid #d1d1d1;
        margin: 24px -12px;
    }

    .divider-css-mobile {
        margin: 24px -4px;
    }

    .btn-blue-wallet {
        height: 40px;
        padding-left: 24px;
        padding-right: 24px;
        background: #214ea1;
        color: white;
        border-radius: 3px;
    }

    .content-css {
        width: 360px;
        margin: auto;
        color: #9294A6;
    }

</style>