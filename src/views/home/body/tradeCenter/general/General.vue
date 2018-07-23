<template>
    <trade-center message="general"></trade-center>
</template>

<script lang="ts">
    import Vue from 'vue';
    import tradeCenter from "../TradeCenter.vue"

    export default Vue.extend({
        name: 'general',
        components: {
            tradeCenter
        },
        methods: {

        }
    });
</script>
<style>
</style>