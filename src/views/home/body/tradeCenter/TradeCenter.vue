<template>
    <v-flex>
        <SelectBar></SelectBar>
        <SearchBar></SearchBar>
        <ListView></ListView>
        <ListFilter></ListFilter>
    </v-flex>
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