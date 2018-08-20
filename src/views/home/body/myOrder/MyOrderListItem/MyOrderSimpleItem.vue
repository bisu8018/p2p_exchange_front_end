<template>
    <v-layout class="my-order-simple_wrapper" row @click="goTradePage">
        <!--avatar-->
        <avatar :email='data.email'></avatar>
        <!-- merchant 정보-->
        <div class="ml-3">
            <h5 class="color-darkgray">
                <!--{{buy}}  {{USDT}}  {{Totalprice}} :  {{200}} {{CNY}}-->
                {{ data.tradeType }} | {{ data.cryptocurrency }} | Total Price: {{ data.price }}
                <!--Buy BTC Total Price: 200 CNY-->
            </h5>
            <h5>
                Please pay - 00:14:32
            </h5>
        </div>
        <span class="badge">1</span>
    </v-layout>
</template>

<script>
    import Avatar from '@/components/Avatar.vue';

    export default {
        name: "my-order-simple-item",
        components: {Avatar},
        props: {
            data: {}
        },
        methods: {
            goMyOrder() {
                this.$router.push("/myOrder");
            },
            goTradePage(){
                let tradePage;
                switch (this.data.tradeType) {
                    case 'buy':
                        tradePage = "/buy?"+this.data.orderNo;
                        this.$router.push(tradePage);
                        break;

                    case 'sell':
                        tradePage = "/sell?"+this.data.orderNo;
                        this.$router.push(tradePage);
                        break;
                }
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

    @media (max-width: 768px) {
        .my-order-simple_wrapper {
            padding: 24px 0;
            position: relative;
        }

        .my-order-simple_wrapper .badge {
            right: 0;
        }
    }
</style>