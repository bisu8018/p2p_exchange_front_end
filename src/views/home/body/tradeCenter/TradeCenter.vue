<template>
    <v-container >
        <v-layout row wrap>
            <v-flex xs12 md8><SelectBar></SelectBar> </v-flex>
            <v-flex xs12 md4><ListFilter></ListFilter></v-flex>
        </v-layout>
        <ListView></ListView>

    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AXIOS from 'axios';
    import ListView from '@/components/ListView.vue';
    import SelectBar from '@/components/SelectBar.vue';
    import SearchBar from '@/components/SearchBar.vue';
    import ListFilter from '@/components/ListFilter.vue';

    export default Vue.extend({
        name: 'TradeCenter',
        components: {SelectBar, SearchBar, ListView, ListFilter},
        data: () => ({

        }),
        methods: {

        }
    });
</script>

<style>
</style>