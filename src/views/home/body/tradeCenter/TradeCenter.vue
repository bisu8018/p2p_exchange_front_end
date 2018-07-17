<template>
    <div class="contentsWrapper" style="max-width: 1200px" >
        <v-layout mt-4 wrap>
            <v-flex xs12 md8><SelectBar></SelectBar> </v-flex>
            <v-flex xs12 md4><ListFilter></ListFilter></v-flex>
        </v-layout>
        <trade-center-view></trade-center-view>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';
    import TradeCenterView from './TradeCenterView.vue';
    import SelectBar from '@/components/SelectBar.vue';
    import SearchBar from '@/components/SearchBar.vue';
    import ListFilter from '@/components/ListFilter.vue';

    export default Vue.extend({
        name: 'TradeCenter',
        components: {SelectBar, SearchBar, TradeCenterView, ListFilter},
        data: () => ({

        }),
        created() {
        },
        methods: {

        }
    });
</script>

<style>
    .contentsWrapper{
        margin-left: auto;
        margin-right: auto;
    }
</style>