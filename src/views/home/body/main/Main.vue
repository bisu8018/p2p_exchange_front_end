<template>
    <div>

        <!--메인 카로셀-->
        <main-carousel></main-carousel>


        <!--모바일 메인-->
        <div v-if="isMobile" class="pageView mt-5">
            <h2 class="bold sizeUp">OTC Demo</h2>
            <h5 class="medium mt-3">{{ $str('The world\'s leading P2P trading platform')}}</h5>
        </div>


        <!--검색 컴포넌트-->
        <search></search>


        <!--컨텐츠-->
        <v-layout wrap class="pageView">
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">verified_user</i>
                <h1 class="bold mb-3">{{$str('landingSubject_1')}}</h1>
                <h4>{{$str('landingContents_1')}}</h4>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons arrows-style">compare_arrows</i>
                <h1 class="bold mb-3">{{$str('landingSubject_2')}}</h1>
                <h4>{{$str('landingContents_2')}}</h4>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">live_help</i>
                <h1 class="bold mb-3">{{$str('landingSubject_3')}}</h1>
                <h4>{{$str('landingContents_3')}}</h4>
            </v-flex>
        </v-layout>


    </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import Search from "./item/Search.vue";
    import MainCarousel from "./item/MainCarousel.vue";

    export default Vue.extend({
        name: 'abMain',
        components: {Search,MainCarousel},
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
    })
</script>

<style scoped>
</style>