<template>
    <v-layout wrap row mb-5 mt-5>
        <v-flex xs12 md6 offset-md3 mb-3 class="">
            <div class="sprite-img ic-404 d-inline-block"></div>
        </v-flex>
        <v-flex xs12 mb-3>{{$str('pageNotFound')}}</v-flex>
        <v-flex xs12>
            <button class="btn-blue btn-blue-hover btn-style" @click="goTradeCenter">{{$str('pageNotFoundBtn')}}</button>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'pageNotFound',
        methods: {
            goTradeCenter() {
                this.$router.push("/tradeCenter");
            },
        }
    })
</script>

<style scoped>
    .btn-style {
        width: 216px !important;
    }
</style>