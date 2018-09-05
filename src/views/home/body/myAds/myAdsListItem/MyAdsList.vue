<template>
    <div>
        <!-- Mobile 일때-->
        <div v-if="isMobile">
            <!-- name-->
            <v-layout mt-4 mb-4>
                <v-flex xs3 text-xs-left color-darkgray>{{$str('adsNo')}}</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.adNo}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>{{$str('Type')}}</v-flex>
                <v-flex xs9 text-xs-right>
                    <span class="mr-4 color-green bold" v-if="adslist.tradeType === 'buy'">
                  {{$str("sell")}}
                  </span>
                    <span class="mr-4 color-orange-price bold" v-if="adslist.tradeType === 'sell'">
                        {{$str("buy")}}
                      </span>
                    {{adslist.cryptocurrency}}
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Amount</v-flex>
                <v-flex xs9 text-xs-right>{{ $fixed(adslist.volumeAvailable, adslist.cryptocurrency) }}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Limits</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.minLimit}} ~ {{adslist.maxLimit}} {{adslist.currency}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Price</v-flex>
                <v-flex xs9 text-xs-right>{{adslist.fixedPrice}} {{adslist.currency}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Time</v-flex>
                <v-flex xs9 text-xs-right>{{transTime(adslist.registerDatetime)}}</v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 text-xs-left color-darkgray mb-4>Control</v-flex>
                <v-flex xs9 text-xs-right c-pointer color-darkgray>
                    <span :class="{ 'color-blue text-white-hover ' : canModify }"
                          @click="onEdit">{{$str('edit')}}</span>
                    <span v-if="adslist.status === 'enable'"
                          :class="{ 'color-blue text-white-hover ' : !canModify }"
                          class="ml-3" @click="showDisable">{{$str('disable')}}</span>
                    <span v-else :class="{ 'color-blue text-white-hover ': canModify }"
                          class="ml-3" @click="showEnable">{{$str('enable')}}</span>
                    <span :class="{ 'color-blue text-white-hover ': canModify }"
                          class="ml-3" @click="showDelete">{{$str('delete')}}</span>
                </v-flex>
            </v-layout>
        </div>

        <!-- Web 일때-->
        <div v-else>
            <v-layout pt-4 pb-4>
                <v-flex md2 >
                    <v-layout justify-space-between>
                        <span>{{adslist.adNo}}</span>
                        <h5 class="color-green bold" v-if="adslist.tradeType === 'buy'">
                            {{$str("sell")}}
                        </h5>
                        <h5 class="color-orange-price bold" v-if="adslist.tradeType === 'sell'">
                            {{$str("buy")}}
                        </h5>
                    </v-layout>
                </v-flex>
                <v-flex md2 text-md-left>
                    <span>{{adslist.cryptocurrency}}</span>
                    <span class="ml-2">{{ $fixed(adslist.volumeAvailable, adslist.cryptocurrency) }}</span>
                </v-flex>
                <v-flex md2 text-md-left>{{adslist.minLimit}} ~ {{adslist.maxLimit}} {{adslist.currency}}</v-flex>
                <v-flex md2 text-md-left>{{adslist.fixedPrice}} {{adslist.currency}}</v-flex>
                <v-flex md2 text-md-left>
                    <span class="ml-3">{{transTime(adslist.registerDatetime)}}</span>
                </v-flex>
                <v-flex md2 text-md-right c-pointer color-darkgray>
                    <span :class="{ 'color-blue text-white-hover ' : canModify }"
                          @click="onEdit">{{$str('edit')}}</span>
                    <span v-if="adslist.status === 'enable'"
                          :class="{ 'color-blue text-white-hover ' : !canModify }"
                          class="ml-3" @click="showDisable">{{$str('disable')}}</span>
                    <span v-else :class="{ 'color-blue text-white-hover ': canModify }"
                          class="ml-3" @click="showEnable">{{$str('enable')}}</span>
                    <span :class="{ 'color-blue text-white-hover ': canModify }"
                          class="ml-3" @click="showDelete">{{$str('delete')}}</span>
                    <!--<button>Share</button>-->
                </v-flex>
            </v-layout>
        </div>
        <my-ads-enable-dialog
                v-if="showEnableDialog"
                :show = showEnableDialog
                :cryptocurrency = adslist.cryptocurrency
                :adNo = adslist.adNo
                v-on:close="closeEnable"
        />
        <my-ads-delete-dialog
                v-if="showDeleteDialog"
                :show = showDeleteDialog
                :adNo = adslist.adNo
                v-on:close="closeDelete"
        />
    </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from '@/common/utils';
    import Vue from 'vue';
    import MyAdsDeleteDialog from './dialog/MyAdsDeleteDialog';
    import MyAdsEnableDialog from './dialog/MyAdsEnableDialog';
    import AdService from "../../../../../service/ad/AdService";

    export default {
        name: "MyAdsList",

        components: {MyAdsEnableDialog,MyAdsDeleteDialog},
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
            canModify(){
                return (this.adslist.status === 'disable')&&(this.adslist.processingOrderCount === 0)
            }
        },
        methods: {
            transTime(time){
                return abUtils.toTimeFormat(time);
            },
            //AD Edit 시, 해당 post AD 페이지 이동
            onEdit() {
                if(this.canModify) {
                    let type = this.adslist.type === 'piece' ? false : true;
                    MainRepository.router().editPostAd(type, this.adslist.adNo);
                }else if(this.adslist.status !== 'disable'){
                    Vue.prototype.$eventBus.$emit('showAlert', 4102);
                }
                else{
                    Vue.prototype.$eventBus.$emit('showAlert', 4101);
                }
            },
            showEnable(){
                if(this.canModify) {
                    this.showEnableDialog = true
                }else if(this.adslist.status !== 'disable'){
                    Vue.prototype.$eventBus.$emit('showAlert', 4102);
                }
                else{
                    Vue.prototype.$eventBus.$emit('showAlert', 4101);
                }
            },
            closeEnable(){
                this.showEnableDialog = false
                MainRepository.MyAds.load();
            },
            showDisable(){
                //disable은 진행중 order 있어도, 언제든 가능.
                AdService.disableAD({
                    email : MainRepository.MyInfo.getUserInfo().email,
                    adNo : this.adslist.adNo
                },function (result) {
                    Vue.prototype.$eventBus.$emit('showAlert', 2104);
                    MainRepository.MyAds.load();
                })
            },
            showDelete(){
                if(this.canModify) {
                    this.showDeleteDialog = true
                }
                else if(this.adslist.status !== 'disable'){
                    Vue.prototype.$eventBus.$emit('showAlert', 4102);
                }
                else{
                    Vue.prototype.$eventBus.$emit('showAlert', 4101);
                }
            },
            closeDelete(){
                this.showDeleteDialog = false
                MainRepository.MyAds.load();
            },

        },

    }
</script>

<style scoped>

</style>