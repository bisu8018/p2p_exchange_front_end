<template>
    <div class="card-modal card-modal-mobile pr-3 pl-3 mt-4a my-order-content-class" v-if="onModal">

        <!--  start date  -->
        <div class="text-xs-left text-black mb-2">{{$str("start")}} {{$str("date")}}</div>
        <div class="mb-4">
            <date-picker :classname='startdateclass' v-on:date="onStartDate" :clear="clear" :propsDate="chipValues.searchStartTime"
                         v-on:switch="clear = 'on'"></date-picker>
        </div>

        <!--  end date  -->
        <div class="text-xs-left text-black mb-2">{{$str("end")}} {{$str("date")}}</div>
        <div class="mb-4">
            <date-picker :classname="enddateclass" v-on:date="onEndDate" :clear="clear" :propsDate="chipValues.searchEndTime"
                         v-on:switch="clear = 'on'"></date-picker>
        </div>

        <!--  주문 상태  -->
        <div class="text-xs-left text-black mb-2">{{$str("orderStatus")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'status'" :filterValue="chipValues.status"
                                 v-on:status="setData"></my-order-select-box>
        </div>

        <!--  주문 번호  -->
        <div class="text-xs-left text-black mb-2">{{$str("orderNo")}}</div>
        <div class="mb-4">
            <input type="text" class="input" :placeholder='$str("orderNoPlaceholder")' @keyup="onCheckNum()"
                   v-model="chipValues.orderNo">
        </div>

        <!--  암호화폐 타입  -->
        <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrencyType")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'cryptocurrencyType'" :filterValue="chipValues.cryptocurrencyType"
                                 v-on:cryptocurrencyType="setData"></my-order-select-box>
        </div>

        <!--  암호화폐 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrency")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :class="{'input-disabled2' : true}"
                                 v-if="!chipValues.cryptocurrencyType"></my-order-select-box>
            <div v-else>
                <my-order-select-box :selectBoxType="'generalToken'" v-if="chipValues.cryptocurrencyType === 'general'"
                                     @generalToken="setData"
                                     :filterValue="chipValues.tokenNo"></my-order-select-box>
                <div v-else>
                    <my-order-select-box :selectBoxType="'customToken'"
                                         @customToken="setData" :filterValue="chipValues.tokenNo"></my-order-select-box>
                </div>
            </div>
        </div>

        <!--  주문 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("orderType")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'orderType'" :filterValue="chipValues.orderType"
                                 v-on:orderType="setData"></my-order-select-box>
        </div>

        <!--  거래 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("buySell")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'tradeType'" :filterValue="chipValues.tradeType"
                                 v-on:tradeType="setData"></my-order-select-box>
        </div>

        <!--  화폐 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
        <div class="mb-4 p-relative">
            <my-order-select-box :selectBoxType="'currency'" :filterValue="chipValues.currency"
                                 v-on:currency="setData"></my-order-select-box>
        </div>

        <!--   cancel, search 버튼  -->
        <div>
            <button class="btn-rounded-white text-white-hover h6" @click="onClear()">
                {{$str("clear")}}
            </button>
            <button class="btn-rounded-blue btn-blue-hoverhover h6 f-right" @click="onSearch()">
                {{$str("search")}}
            </button>
            <button class="btn-rounded-white text-white-hover h6 mr-3 f-right" @click="onCancel()">
                {{$str("cancel")}}
            </button>
        </div>
    </div>
</template>


<script>
    import MyOrderSelectBox from './MyOrderSelectBox.vue'
    import DatePicker from '@/components/DatePicker.vue';
    import {abUtils} from "@/common/utils";
    import Vue from 'vue';
    import MainRepository from "../../../../../../vuex/MainRepository";
    import MyOrderChipsModel from "../../../../../../vuex/model/MyOrderChips";

    export default Vue.extend({
        name: "my-order-content",
        components: {
            MyOrderSelectBox, DatePicker
        },
        props: {
            'chipData': {},
            'onModal': {}
        },
        data: () => ({
            clear: 'on',
            startdateclass: 'startdateclass',
            enddateclass: 'enddateclass',
            chipValues: new MyOrderChipsModel(''),
            orderNo: ''
        }),
        computed: {},
        created() {
            this.$nextTick(() => {
                this.init();
            });
        },
        mounted() {
            this.$eventBus.$emit('clickEvent', (event) => {
                this.hideOnClickOutside(event);
            });
        },
        beforeDestroy() {
            this.$eventBus.$off('clickEvent', (event) => {
            });
        },
        methods: {
            init() {
                this.chipValues.update(this.chipData);
            },
            onStartDate(value) {
                this.setData(['searchStartTime', value]);
                return this.chipValues.searchStartTime;
            },
            onEndDate(value) {
                this.setData(['searchEndTime', value]);
                return this.chipValues.searchEndTime;
            },
            onCheckNum() {
                // 자연수 체크
                if (!abUtils.isNaturalNumber(this.chipValues.orderNo)) {
                    this.chipValues.orderNo = "";
                } else {
                    this.setData('orderNo', this.chipValues.orderNo);
                }
            },
            setData(emitData) {
                let _data = {};
                let index = emitData[0];
                let data = emitData[1];
                switch (index) {
                    case 'customToken':
                        _data = {
                            cryptocurrency: 'custom',
                            tokenNo: data
                        };
                        break;
                    case 'generalToken' :
                        let _tokenName = MainRepository.GeneralToken.controller().findGeneralToken(data, 'no').tokenName;
                        _data = {
                            cryptocurrency: _tokenName,
                            tokenNo: data
                        };
                        break;
                    case 'cryptocurrencyType' :
                        _data = {
                            cryptocurrencyType: data,
                            cryptocurrency: '',
                            tokenNo: ''
                        };
                        break;
                    default :
                        _data[index] = data;
                        break;

                }

                this.chipValues.update(_data);
            },
            onClear() {
                this.clear = null;
                this.chipValues.clear();
            },
            onSearch() {
                this.$emit('update', this.chipValues);
                this.onCancel();
            },
            onCancel() {
                this.$emit('closeModal');
            },
            //영역 밖 클릭시 스크롤 업
            hideOnClickOutside(event) {
                if (!event.target.closest('.my-order-content-class')) {
                    this.onCancel();
                }
            },
        },
    })
</script>


<style scoped>
    .card-modal:after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 95%;
        margin-left: -8px;
        width: 0;
        height: 0;
        border-bottom: 8px solid #ffffff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
    }

    .card-modal:before {
        content: '';
        position: absolute;
        border-style: solid;
        bottom: 100.2%;
        left: 95%;
        margin-left: -8px;
        width: 0;
        height: 0;
        border-width: 10px;
        border-bottom: 8px solid #ffffff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-color: transparent transparent #d8d8d8 transparent;
    }

    @media only screen and (max-width: 959px) {
        .card-modal {
            z-index: 2;
            position: absolute;
            background-color: #ffffff;
            box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
            padding: 16px 8px 24px 8px;
            min-height: 200px;
            width: 100%;
            left: 0;
        }
    }

    /* 웹에서 */
    @media only screen and (min-width: 960px) {
        .card-modal {
            z-index: 2;
            position: absolute;
            background-color: #ffffff;
            box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
            padding: 16px 8px 24px 8px;
            min-height: 200px;
            width: 100%;
            right: 0;
        }
    }

</style>