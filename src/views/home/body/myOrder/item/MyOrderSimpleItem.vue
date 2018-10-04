<template>
    <v-layout class="my-order-simple_wrapper" row @click="goTradePage">
        <!--avatar-->
        <avatar useMemberInfo :member="data.counterParty"/>
        <!-- merchant 정보-->
        <div class="ml-3">
            <h5 class="color-darkgray">
                <!--{{buy}}  {{USDT}}  {{Totalprice}} :  {{200}} {{CNY}}-->
                {{ $str(data.orderTradeType) }} | {{ getTokenName }} | {{ $str('TotalPrice') }}: {{ toMoneyFormat(data.amount) }} {{ data.currency }}
                <!--Buy BTC Total Price: 200 CNY-->
            </h5>
            <h5>
                {{ $str('Please pay') }} - {{ limitTime }}
            </h5>
        </div>
        <span v-if="data.unreadMessageCount !== 0" class="badge">{{ data.unreadMessageCount }}</span>
    </v-layout>
</template>

<script>
    import Avatar from '@/components/Avatar.vue';
    import {getLimitTime,transCryptocurrencyName, findCustomTokenName} from "../../../../../common/common";
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from '@/common/utils';

    export default {
        name: "my-order-simple-item",
        components: {Avatar},
        props: {
            data: {}
        },
        data() {
          return {
              limitTime: '',
              timerInterval: {},
          }
        },
        computed: {
            getTokenName() {
                if(this.data.cryptocurrency !== 'custom'){         //general token 이름 찾기
                    return this.data.cryptocurrency;
                }else{                                        //custom token 이름 찾기
                    let data = MainRepository.CustomToken.controller().getCustomTokenList();
                    return findCustomTokenName(data, this.data.tokenNo);
                }
            },
        },
        created() {
            //this.$eventBus.$emit('showAlert', 2157);
            this.limitTime = this.getLimitTime();
            this.timerInterval = setInterval(() => {
                this.limitTime = this.getLimitTime();
                // 만료되었을 경우
                if (this.limitTime === '00:00') {
                }
            }, 1000)
        },
        methods: {
            getLimitTime() {
              return getLimitTime(this.data.registerDatetime, this.data.paymentWindow);
            },
            goMyOrder() {
                this.$router.push("/myOrder");
            },
            goTradePage(){
                this.$emit('click');
                switch (this.data.orderTradeType) {
                    case 'buy':
                        MainRepository.router().goBuyOrSell(true, this.data.orderNo);
                        break;

                    case 'sell':
                        MainRepository.router().goBuyOrSell(false, this.data.orderNo);
                        break;
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(this.$fixed(value, this.data.currency)));
            },
        }
    }
</script>

<style scoped>
    .my-order-simple_wrapper {
        cursor: pointer;
        padding: 16px 12px;
        text-align: left;
        font-size: 14px;
        -moz-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .my-order-simple_wrapper:hover {
        background-color: rgba(49,110,228, .1);
    }

    .my-order-simple_wrapper h5 {
        line-height: 1.3;
    }

    .my-order-simple_wrapper .badge {
        position: absolute;
        right: 12px;
    }

    @media (max-width: 959px) {
        .my-order-simple_wrapper {
            padding: 24px 0;
            position: relative;
        }

        .my-order-simple_wrapper .badge {
            right: 0;
        }

        .my-order-simple_wrapper:hover {
            background-color: unset;
        }
    }
</style>