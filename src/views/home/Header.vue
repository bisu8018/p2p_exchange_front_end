<template>
    <div>
        <v-toolbar flat dark color="BGNav"  app fixed style="min-height:64px" wrap >
            <!-- 웹일때 -->
            <v-layout  v-if="$vuetify.breakpoint.mdAndUp" >
                <v-spacer></v-spacer>
                <v-container  style=" min-height:64px; max-width: 1100px;" pr-0 pl-0 pb-0 pt-1 wrap >
                    <v-layout row wrap>
                        <v-flex md6 text-xs-left  >
                            <v-btn flat style="font-weight: 400">
                                <img @click="goMain()" src="@/assets/img/logo_color.png" style="width: 38px; height: 33px;">
                            </v-btn>
                            <v-btn flat style="font-weight: 400" @click="goTradeCenter()">OTC</v-btn>
                            <v-btn  flat style="font-weight: 400">{{$str("exchange")}}</v-btn>
                            <v-btn  flat style="font-weight: 400">{{$str("postAd")}}</v-btn>
                        </v-flex>

                        <v-flex md6 text-xs-right >
                            <v-btn  flat style="font-weight: 400">{{$str("assets")}}</v-btn>
                            <v-btn  flat style="font-weight: 400">{{$str("order")}}</v-btn>
                            <v-btn  flat style="font-weight: 400" @click="goLogin()">{{$str("loginText")}}</v-btn>
                            <v-btn  flat style="font-weight: 400" @click="goSignup()">{{$str("signupText")}}</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-spacer></v-spacer>
            </v-layout>

            <!-- 모바일 일때-->
            <v-layout v-else >

                <v-btn flat>
                    <img @click="goMain()" src="@/assets/img/logo_color.png" style="width: 30px; height: 24px;">
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

            </v-layout>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" temporary right app>
            <v-list class="pa-1">
                <v-list-tile>
                    <v-list-tile-content>
                        <v-list-tile-title class="title" @click="goMain()">ALLB</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.name" @click="item.name=='login' ? goLogin() : (item.name=='signup' ? goSignup() : (item.name=='tradeCenter' ? goTradeCenter() : goPostAd()))">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'abHeader',
        data: () => ({
            title : 'header',
            drawer: null,
            items: [
                { title: 'Log In' ,name: 'login'},
                { title: 'Sign Up', name: 'signup'},
                { title: 'Trade Center', name: 'tradeCenter'},
                { title: 'Post AD', name: 'postAd'}
            ]
        }),
        methods: {
            goSignup(){
                this.$router.push("/signup");
            },
            goLogin() {
                this.$router.push("/login");
            },
            goMain() {
                this.$router.push("/abMain");
            },
            goTradeCenter() {
                this.$router.push("/tradeCenter");
            },
            goPostAd() {
                this.$router.push("/postAd");
            }
        }
    });
</script>

<style>

</style>