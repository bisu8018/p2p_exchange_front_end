<template>
    <v-layout mt-5 mb-5 ml-3 mr-3 column>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div>
                {{$str('orderText')}} :
                <!--{{order_number}} 주문번호-->
            </div>
            <div>
                <!--{{ad_type}} buy/sell -->
                <!--{{volume}} 토큰량 -->
                <!--{{token}} 토큰종류-->
                From
                <!--{{email}} 이메일-->
            </div>
            <div>
                <div>
                    {{$str('price')}} :
                    <!--{{price}} 가격 -->
                    <!--{{currency}} 화폐단위-->
                    /
                    <!--{{token}} 토큰종류-->
                </div>
                <div>
                    {{$str('amount')}} :
                    <!--{{price}} 가격 -->
                    <!--{{currency}} 화폐단위-->
                </div>
            </div>

        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap>
            <!--알리페이 결제-->
            <div class="payment-alipay">
                <div>
                    <p><img src="@/assets/img/method_alipay.png">{{$str("alipayText")}} : </p>
                </div>
                <div>
                    <!--알리페이 정보-->
                </div>
            </div>

            <!--위챗페이 결제-->
            <div class="payment-wechat">
                <div>
                    <p><img src="@/assets/img/method_wechatpay.png">{{$str("wechatPayText")}} : </p>
                </div>
                <div>
                    <!--위챗페이정보-->
                </div>
            </div>

            <!--은행 계좌 결제-->
            <div class="payment-bankAccount">
                <div>
                    <p><img src="@/assets/img/method_bankaccount.png">{{$str("bankAccountText")}} : </p>
                </div>
                <div>
                    <!--은행계좌 정보-->
                </div>
            </div>
            <div>

                <!--<span v-if="status 값 따라 분기 처리">-->

                <span>
                {{$str("paymentExplain1")}}
                    <!--{{price}} 가격 -->
                    <!--{{currency}} 화폐단위-->
                {{$str("paymentExplain2")}}
                    <!--{{email}} 이메일-->
                {{$str("paymentExplain3")}}
                    <!--{{paymentWindow}} 지불기간-->
                {{$str("paymentExplain4")}}
                </span>
                <span>
                {{$str("referenceText")}}
                    <!--{{거래번호}}-->
                </span>
            </div>
            <div>
                <input type="button" class="paid-btn" :value="$str('paidText')">
                <div>
                    {{$str('paymentText')}}
                </div>
            </div>
            <div>
                <input type="button" :value="$str('cancel')" @click="onPaid">
            </div>
            <div>

                <!--채팅창-->

            </div>
            <div>
                <p>
                    {{$str('sellChecklist1')}}
                </p>
                <p>
                    {{$str('sellChecklist2')}}
                </p>
                <p>
                    {{$str('sellChecklist3')}}
                </p>
            </div>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'buy',
        components: {},
        data: () => ({}),
        methods: {
            onPaid() {
                // post작업
            }
        }
    });
</script>

<style scoped>
    .flex-divide {
        border-bottom: solid 1px #d1d1d1;
    }
</style>