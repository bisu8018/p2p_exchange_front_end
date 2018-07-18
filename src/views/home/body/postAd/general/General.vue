<template>
    <post-ad message="general"></post-ad>
</template>

<script lang="ts">
    import Vue from 'vue';
    import postAd from "../PostAd.vue"

    export default Vue.extend({
        name: 'general',
        components: {
            postAd
        },
        methods: {

        }
    });
</script>

<style>
</style>