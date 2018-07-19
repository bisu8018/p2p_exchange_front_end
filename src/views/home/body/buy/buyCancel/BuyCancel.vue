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
            <div>
                <!--订单已取消，无法查看支付信息-->
            <div>
                <input type="button" :value="$str('cancel')" @click="onPaid">
            </div>
            <div>

                <!--채팅창-->

            </div>
            <div>
                <p>
                    {{$str('transferChecklist1')}}
                </p>
                <p>
                    {{$str('transferChecklist2')}}
                </p>
                <p>
                    {{$str('transferChecklist3')}}
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