<template>
    <div>
        <!-- Mobile 일때-->
        <div v-if="isMobile">
            <!-- name-->
            <v-layout mt-4 mb-4>
                <v-flex xs3 text-xs-left color-darkgray>{{$str('adsNo')}}</v-flex>
                <v-flex xs9 text-xs-right color-blue>{{adslist.adNo}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>{{$str('adsType')}}</v-flex>
                <v-flex xs9 text-xs-right>
                    <span class="mr-4 color-green bold" v-if="adslist.tradeType === 'Buy'">
                  {{$str("sell")}}
                  </span>
                    <span class="mr-4 color-orange-price bold" v-if="adslist.tradeType === 'Sell'">
                        {{$str("buy")}}
                      </span>
                    {{adslist.cryptocurrency}}
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Amount</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.volumeAvailable}} {{adslist.currency}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Limits</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.minLimit}} ~ {{adslist.maxLimit}} {{adslist.currency}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Price</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.fixedPrice}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Time</v-flex>
                <v-flex xs9 text-xs-right>{{transTime(adslist.registerDatetime)}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Control</v-flex>
                <v-flex xs9 text-xs-right color-blue>
                    <span class="text-white-hover c-pointer ">{{$str('edit')}}</span>
                    <span class="ml-3 text-white-hover c-pointer" @click="showEnableDialog = true">{{$str('enable')}}</span>
                    <span class="ml-3 text-white-hover c-pointer" @click="showDeleteDialog = true">{{$str('delete')}}</span>
                    <!--<span class="mr-3 text-white-hover c-pointer">{{$str('share')}}</span>-->
                </v-flex>
            </v-layout>
        </div>

        <!-- Web 일때-->
        <div v-else>
            <v-layout pt-4 pb-4>
                <v-flex md2 text-md-left color-blue>{{adslist.adNo}}</v-flex>
                <v-flex md1 text-md-left>
                    <v-layout justify-space-between>
                        <h5 class="color-green bold" v-if="adslist.tradeType === 'Buy'">
                            {{$str("sell")}}
                        </h5>
                        <h5 class="color-orange-price bold" v-if="adslist.tradeType === 'Sell'">
                            {{$str("buy")}}
                        </h5>
                    {{adslist.cryptocurrency}}
                    </v-layout>
                </v-flex>
                <v-flex md1 text-md-left>{{adslist.volumeAvailable}}</v-flex>
                <v-flex md2 text-md-left>{{adslist.minLimit}} ~ {{adslist.maxLimit}} {{adslist.cryptocurrency}}</v-flex>
                <v-flex md1 text-md-left>{{adslist.fixedPrice}} {{adslist.currency}}</v-flex>
                <v-flex md3 text-md-left>{{transTime(adslist.registerDatetime)}}</v-flex>
                <v-flex md2 text-md-right color-blue>
                    <span class="text-white-hover c-pointer ">{{$str('edit')}}</span>
                    <span class="ml-3 text-white-hover c-pointer" @click="showEnableDialog = true">{{$str('enable')}}</span>
                    <span class="ml-3 text-white-hover c-pointer" @click="showDeleteDialog = true">{{$str('delete')}}</span>
                    <!--<button>Share</button>-->
                </v-flex>
            </v-layout>
        </div>
        <v-dialog v-model="showEnableDialog">
            <div class="cs-flex mb-4">
                <!--header-->
                <div class=" h4 bold text-xs-left">
                    {{$str("enable")}} {{adslist.cryptocurrency}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="showEnableDialog = false">close</i>
            </div>
            <div class="mb-2 text-xs-left">
                {{$str("enable")}}
            </div>
            <div class="p-relative mb-4">
                <input name="amount" v-model="amount" type="text" class="input"
                       autocomplete="off" :placeholder="$str('Enter the number you want to trade')">
                <button class="crypto-text">{{adslist.cryptocurrency}}</button>
            </div>
            <div class="text-xs-right">
                <button class="btn-rounded-white text-white-hover" @click="showEnableDialog = false" >
                    <h6>{{$str("cancel")}}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" >
                    <h6>{{$str("confirm")}}</h6>
                </button>
            </div>
        </v-dialog>
        <v-dialog v-model="showDeleteDialog">
            <div class="cs-flex mb-4">
                <!--header-->
                <div class=" h4 bold text-xs-left">
                    {{$str("Notice")}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="showDeleteDialog = false">close</i>
            </div>
            <div class="mb-2 text-xs-left">
                <v-layout align-center>
                    <div class="sprite-img ic-warning"></div>
                    <h5 class="ml-2">{{$str("Are you sure to delete this ad?")}}</h5>
                </v-layout>
            </div>
            <div class="text-xs-right">
                <button class="btn-rounded-white text-white-hover" @click="showDeleteDialog = false" >
                    <h6>{{$str("cancel")}}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" >
                    <h6>{{$str("confirm")}}</h6>
                </button>
            </div>
        </v-dialog>

    </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from '@/common/utils';

    export default {
        name: "MyAdsList",
        props: {
            adslist: {},
        },
        data: () => ({
            amount : '',
            showEnableDialog : false,
            showDeleteDialog : false,
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },


        },
        methods: {
            transTime(time){
                return abUtils.toTimeFormat(time);
            },
        },

    }
</script>

<style scoped>
.cs-flex{
    display : flex;
}
.crypto-text {
    font-size: 12px;
    position: absolute;
    right: 11px;
    top: 10px;
    cursor: pointer;
}

</style>