<template>
    <div>
        <v-parallax style="height: 600px;">
            <v-carousel delimiter-icon="remove" lazy style="height: 600px;">
                <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
                    <!-- <v-layout column align-center justify-center class="white--text">
                    <h1 class="text-white mb-2 text-xs-center">Welcome to AllB OTC</h1>
                    <h2 class="text-white mb-2 text-xs-center mt-2">위아위아~~위어어앙아어어 어~</h2>
                  </v-layout> -->

                </v-carousel-item>
            </v-carousel>
        </v-parallax>
        <v-layout wrap class="pageView">
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">verified_user</i>
                <h3>Safe and Reliable</h3>
                <p>It's a digital assets trusteeship platform, merchants must pay security deposits in order to minimize
                    transaction risks</p>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">monetization_on</i>
                <h3>Zero Transaction Fee</h3>
                <p>Free charge for selling and buying</p>
            </v-flex>
            <v-flex md4 xs12 mt-5 mb-6 text-md-left text-xs-left>
                <i class="material-icons md-36 color-blue">live_help</i>
                <h3>24-hours Customer Support</h3>
                <p>7/24 professional customer service, solve your trading problem anytime</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {doesHttpOnlyCookieExist} from "@/common/common";
    import MainRepository from "../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'abMain',
        data() {
            return {
                items: [{
                    src: 'https://file.rci8.top/vue/static/banner/banner33.png'
                },
                    {
                        src: 'https://file.rci8.top/vue/static/banner/banner39.jpg'
                    },
                    {
                        src: 'https://file.rci8.top/vue/static/banner/banner37.png'
                    },
                ]
            }
        },
        methods: {
            goLogin() {
                this.$router.push("/login");
            },
            goSignup() {
                this.$router.push("/signup");
            },

        }
    })
</script>

<style scoped>
    /* 웹에서 최대 width 주기*/

    @media only screen and (min-width: 960px) {
        .pageView {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    /* mobile 에서 gutter 주기*/

    @media only screen and (max-width: 959px) {
        .pageView {
            padding-left: 12px;
            padding-right: 12px;
        }
    }

    /* 패럴랙스에 이미지 삽입
    :src="require('@/assets/img/main.jpg')" */

    h1 {
        font-size: 48px;
        line-height: 1.2em;
    }

    h2 {
        font-size: 26px;
    }

    h3 {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 8px;
        margin-top: 8px;
    }

    p {
        font-size: 16px;
    }
</style>