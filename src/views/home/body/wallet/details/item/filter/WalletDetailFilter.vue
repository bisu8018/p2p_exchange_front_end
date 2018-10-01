<template>
    <v-layout row wrap>
        <v-flex xs12 pr-0 pl-0>
            <div class="order-filter no-drag p-relative f-right text-xs-left d-inline-table"
                 v-bind:class="{'w-full' : isMobile}">


                <!--필터 input box-->
                <div class="p-relative  ma-2 d-inline-block"
                     v-if="placeholderFlag">
                    <span class="h5 color-darkgray  ">
                        {{$str("walletDetailsFilterPlaceholder")}}
                    </span>
                </div>
                <i class="material-icons p-absolute filter-img color-darkgray c-pointer" @click.stop="onModal">filter_list</i>


                <!--  chips  -->
                <filter-chips :chipData="chipData" @delete="onPost" class="pr-4a"></filter-chips>


                <!--  filter  -->
                <wallet-detail-content v-if="isModal" :chipData="chipData" @closeModal="closeModal"
                                       @update="onUpdate"></wallet-detail-content>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../../../vuex/MainRepository';
    import {transCryptocurrencyName} from "@/common/common";
    import FilterChips from '../../../../../../../components/filter/FilterChips.vue'
    import FilterChipsModel from "../../../../../../../vuex/model/filterChips";
    import WalletDetailContent from "./WalletDetailContent.vue"

    export default Vue.extend({
        name: "wallet-detail-filter",
        components: {
            WalletDetailContent, FilterChips
        },
        data() {
            return {
                isModal: false,
                placeholderFlag: true,
                chipData: new FilterChipsModel(''),
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        created() {
            let urlParam = this.getUrlParam();
            //tokenlist에서 넘어올때
            if (urlParam !== '') {
                let _tokenNo = Number(urlParam[0]) || '';
                let _cryptocurrencyType = urlParam[1] || '';

                let data = {
                    tokenNo :  _tokenNo,
                    cryptocurrencyType :  _cryptocurrencyType
                };

                if(_cryptocurrencyType === 'custom' ){
                    data.cryptocurrency = 'custom';
                }else if(_cryptocurrencyType === 'general' ){
                    let _cryptocurrency = MainRepository.GeneralToken.controller().findGeneralToken(_tokenNo,'no');
                    data.cryptocurrency =  _cryptocurrency.tokenName;
                }

                this.chipData.update(data);
                this.showPlaceholder();
            }
        },
        methods: {
            getUrlParam() {
                let currentURL = window.location.href;
                console.log(currentURL)
                let params = currentURL.split('?');

                if(params.length[1]){
                    params = params[1].split('&');      //params[0] = tokenNo,   params[1] = cryptocurrencyType
                    return params;
                }else{
                    return '';
                }
            },
            // placeholder
            showPlaceholder() {
                for (let key in this.chipData) {
                    if (this.chipData[key] !== '') {
                        return this.placeholderFlag = false;
                    } else {
                        this.placeholderFlag = true;
                    }
                }
            },
            onModal() {
                if (this.isModal) {
                    this.isModal = false;
                } else {
                    this.isModal = true;
                }
            },
            closeModal() {
                this.isModal = false;
            },
            onUpdate(data) {
                let _cryptocurrencyType = '';
                if (data.cryptocurrencyType) {
                    if (data.cryptocurrencyType === 'custom') {
                        _cryptocurrencyType = 'custom';
                    } else {
                        _cryptocurrencyType = transCryptocurrencyName(data.cryptocurrency);
                    }
                }
                this.onPost(data)
            },
            onPost(data) {
                this.chipData.update(data);
                this.showPlaceholder();

                //Axios 태우기
                MainRepository.Wallet.updateHistoryPage({
                    searchStartTime: this.chipData.searchStartTime,
                    searchEndTime: this.chipData.searchEndTime,
                    type: this.chipData.walletType,
                    cryptocurrencyType: this.chipData.cryptocurrencyType,
                    tokenNo: this.chipData.tokenNo,
                });
            },
        },

    });
</script>

<style scoped>
    @media only screen and (max-width: 959px) {
        .order-filter {
            height: 40px;
            border: solid 1px #8d8d8d;
            min-width: unset;
        }
    }

    .order-filter {
        height: 40px;
        border: solid 1px #8d8d8d;
        border-radius: 2px;
        width: 100%;
    }

    .filter-img {
        right: 7px;
        top: 7px;
    }

</style>
