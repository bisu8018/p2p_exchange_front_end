<template>
    <v-parallax style="height: 600px;" v-if="!isMobile">
        <v-carousel delimiter-icon="remove" lazy style="height: 600px;">
            <v-carousel-item>
                <div class="landing-img-first">
                    <img src="../../../../../assets/img/landing_logo.png" style="width: 145px" >
                    <div class="landing-subject"> {{ $str('landingSubj_1') }}</div>
                    <div class="landing-content"> {{ $str('landingContent_1') }}</div>
                </div>
            </v-carousel-item>
            <v-carousel-item>
                <div class="landing-img-second">
                    <div class="landing-subject mt-6a"> {{ $str('landingSubj_2') }}</div>
                    <div class="landing-content"> {{ $str('landingContent_2') }}</div>
                </div>
            </v-carousel-item>
            <v-carousel-item>
                <div class="landing-img-third">
                    <div class="landing-subject mt-6a"> {{ $str('landingSubj_3') }}</div>
                    <div class="landing-content"> {{ $str('landingContent_3') }}</div>
                </div>
            </v-carousel-item>
        </v-carousel>
    </v-parallax>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";


    export default Vue.extend({
        name: 'main-carousel',
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
    })
</script>

<style>

</style>