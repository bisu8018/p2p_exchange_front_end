<template>
    <v-layout class="my-order-simple_wrapper" row>
        <!--avatar-->
        <avatar></avatar>
        <!-- merchant 정보-->
        <div>
           <span class="mr-2 ml-3 color-darkgray text-md-left">
               <!--{{buy}}  {{USDT}}  {{Totalprice}} :  {{200}} {{CNY}}-->
               Buy BTC Total Price: 200 CNY
           </span>
           <div class="ml-3 text-md-left">
               Please pay - 00:14:32
           </div>
        </div>
        <span class="badge">1</span>
    </v-layout>
</template>

<script>
    import Avatar from '@/components/Avatar.vue';

    export default {
        name: "my-order-simple-item",
        components: {Avatar},
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
    }

    .my-order-simple_wrapper:hover {
        background-color: rgba(49,110,228, .1);
    }
</style>