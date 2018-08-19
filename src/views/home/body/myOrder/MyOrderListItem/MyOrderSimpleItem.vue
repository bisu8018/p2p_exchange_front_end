<template>
    <v-layout class="my-order-simple_wrapper" row>
        <!--avatar-->
        <avatar></avatar>
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
</style>