<template>
    <trade-center message="block"></trade-center>
</template>

<script lang="ts">
    import Vue from 'vue';
    import tradeCenter from "../TradeCenter.vue"

    export default Vue.extend({
        name: 'block',
        components: {
            tradeCenter
        },
        methods: {

        }
    });
</script>

<style>
</style>