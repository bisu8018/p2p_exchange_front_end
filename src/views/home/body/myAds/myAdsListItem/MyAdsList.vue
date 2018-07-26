<template>
    <div>
        <!-- Mobile 일때-->
        <div v-if="isMobile">
            <!-- name-->
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>{{$str('adsNo')}}</v-flex>
                <v-flex xs9 text-xs-right color-blue>{{adslist.no}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>{{$str('adsType')}}</v-flex>
                <v-flex xs9 text-xs-right>
                    <span class="mr-4 color-green bold" v-if="adslist.adsType === 'sell'">
                  {{$str("sell")}}
                  </span>
                    <span class="mr-4 color-orange-price bold" v-if="adslist.adsType === 'buy'">
                        {{$str("buy")}}
                      </span>
                    {{adslist.token}}
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Amount</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.amount}} {{adslist.currency}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Limits</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.limits}} {{adslist.currency}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Price</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.price}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Time</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.time}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Control</v-flex>
                <v-flex xs9 text-xs-right color-blue>
                    <span class="text-white-hover c-pointer ">{{$str('edit')}}</span>
                    <span class="ml-3 text-white-hover c-pointer">{{$str('enable')}}</span>
                    <span class="ml-3 text-white-hover c-pointer">{{$str('delete')}}</span>
                    <!--<span class="mr-3 text-white-hover c-pointer">{{$str('share')}}</span>-->
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </div>

        <!-- Web 일때-->
        <div v-else>
            <v-layout pt-4 pb-4>
                <v-flex md1 text-md-left color-blue>{{adslist.no}}</v-flex>
                <v-flex md2 text-md-left>
                    <span class="mr-4 color-green bold" v-if="adslist.adsType === 'sell'">
                        {{$str("sell")}}
                    </span>
                    <span class="mr-4 color-orange-price bold" v-if="adslist.adsType === 'buy'">
                        {{$str("buy")}}
                    </span>
                    {{adslist.token}}
                </v-flex>
                <v-flex md1 text-md-left>{{adslist.amount}}</v-flex>
                <v-flex md2 text-md-left>{{adslist.limits}}</v-flex>
                <v-flex md1 text-md-left>{{adslist.price}}</v-flex>
                <v-flex md2 text-md-left>{{adslist.time}}</v-flex>
                <v-flex md3 text-md-right color-blue>
                    <span class="text-white-hover c-pointer ">{{$str('edit')}}</span>
                    <span class="ml-3 text-white-hover c-pointer">{{$str('enable')}}</span>
                    <span class="ml-3 text-white-hover c-pointer">{{$str('delete')}}</span>
                    <!--<button>Share</button>-->
                </v-flex>

            </v-layout>
        </div>
    </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";

    export default {
        name: "MyAdsList",
        props: {
            adslist: {},
        },
        methods: {},
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        }
    }
</script>

<style scoped>

</style>