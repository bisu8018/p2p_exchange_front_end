<template>
    <v-container style="max-width: 1178px" pr-0 pl-0 >
        <v-layout row wrap>
            <div id="test" class="md3" style=" height: 20px; background: red"></div>
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
        created() {
        },
        methods: {

        }
    });
</script>

<style>
</style>