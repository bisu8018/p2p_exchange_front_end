<template>
    <v-layout row wrap>
        <v-flex md8 xs12 pr-0 pl-0>
            <div class="order-filter no-drag p-relative f-right text-xs-left d-inline-table"
                 v-bind:class="{'w-full' : isMobile}">
                <div class="color-darkgray  p-relative  ma-2 d-inline-block"
                     v-if="showPlaceholder">
                    {{$str("orderFilterPlaceholder")}}
                </div>
                <i class="material-icons p-absolute filter-img color-darkgray c-pointer" @click.stop="onModal">filter_list</i>

                <!--  chips  -->
                <my-order-chips :chipData="chipData" @delete="chipDelete"></my-order-chips>

                <!--  filter  -->
                <my-order-content :chipData="chipData" :onModal="isModal" @closeModal="closeModal" @update="onUpdate"></my-order-content>
            </div>
        </v-flex>

        <!--   only desktop   -->
        <v-flex md4 pl-4 pr-0 v-if="!isMobile">
            <div class="btn-white align-center " @click="showDownloadDialog">
                <i class="material-icons md-24 export-icon">save_alt</i>
                {{$str("Export")}}
            </div>
        </v-flex>

        <!--  download modal  -->
        <my-order-download-dialog></my-order-download-dialog>

    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from '../../../../../../vuex/MainRepository';
    import {transCryptocurrencyName} from "@/common/common";
    import MyOrderDownloadDialog from '../dialog/MyOrderDownloadDialog'
    import MyOrderContent from './MyOrderContent.vue'
    import MyOrderChips from './MyOrderChips.vue'

    export default Vue.extend({
        name: "myOrder-filter",
        components: {
            MyOrderDownloadDialog, MyOrderContent, MyOrderChips
        },
        data: () => ({
            isModal: false,
            chipData: {
                start_date: "",
                end_date: "",
                orderStatus: "",
                orderNo: "",
                cryptocurrencyType: "",
                cryptocurrency: "",
                tokenNo: '',
                orderType: "",
                tradeType: "",
                currency: '',
            },
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

            //showDateChip 처리!!
            showPlaceholder() {
                return (!this.showDateChip && this.orderStatus === '' && this.orderNo === '' &&
                    this.cryptocurrency === '' && this.cryptocurrencyType === '' &&
                    this.orderType === '' && this.tradeType === '' && this.currency === '')
            }
        },
        methods: {
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
                if(data.cryptocurrencyType){
                    if(data.cryptocurrencyType === 'custom'){
                        _cryptocurrencyType = 'custom';
                    }else{
                        _cryptocurrencyType = transCryptocurrencyName(data.cryptocurrency);
                    }
                }

                this.chipData.searchStartTime = data.start_date;
                this.chipData.searchEndTime = data.end_date;
                this.chipData.status = data.orderStatus;
                this.chipData.orderNo = data.orderNo;
                this.chipData.cryptocurrencyType = data.cryptocurrencyType;
                this.chipData.cryptocurrency = _cryptocurrencyType;
                this.chipData.tokenNo = data.tokenNo;
                this.chipData.orderType = data.orderType;
                this.chipData.tradeType = data.tradeType;
                this.chipData.currency = data.currency;

                MainRepository.MyOrder.updatePage(this.chipData);
            },
            showDownloadDialog() {
                this.$eventBus.$emit('showMyOrderDownloadDialog');
            },
            myOrderDownload() {
                MainRepository.MyOrder.getMyOrderDownload();
            },
            // 칩 x버튼 눌렀을 시 삭제
            chipDelete(data) {
                switch (data) {
                    case 'date':
                        this.chipData.start_date = '';
                        this.chipData.end_date = '';
                        break;
                    case 'orderStatus':
                        this.chipData.orderStatus = '';
                        break;
                    case 'orderNo':
                        this.chipData.orderNo = '';
                        break;
                    case 'cryptocurrencyType':
                        this.chipData.cryptocurrencyType = '';
                        this.chipData.cryptocurrency = '';
                        break;
                    case 'orderType':
                        this.chipData.orderType = '';
                        break;
                    case 'tradeType':
                        this.chipData.tradeType = '';
                        break;
                    case 'currency':
                        this.chipData.currency = '';
                        break;
                }
                MainRepository.MyOrder.updatePage(this.chipData);
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

    /* 웹에서 */
    @media only screen and (min-width: 960px) {
        .export-icon {
            width: 18px;
            margin-right: 16px;
        }

        .align-center {
            display: flex;
            align-content: center;
            justify-content: center;
            cursor: pointer;
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
