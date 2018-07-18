<template>
    <post-ad></post-ad>
</template>

<script lang="ts">
    import Vue from 'vue';
    import postAd from "../PostAd.vue"

    export default Vue.extend({
        name: 'block',
        components: {
            postAd
        },
        methods: {

        }
    });
</script>

<style>
</style>