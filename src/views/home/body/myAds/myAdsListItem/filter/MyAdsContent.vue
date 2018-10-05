<template>
    <div class="card-modal card-modal-mobile pr-3 pl-3 mt-3 my-order-content-class">

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

        <!--  광고 번호  -->
        <div class="text-xs-left text-black mb-2">{{$str("adsNo")}}</div>
        <div class="mb-4">
            <input type="text" class="input" :placeholder='$str("adsNoPlaceholder")' @keyup="onCheckNum()"
                   v-model="chipValues.adsNo">
        </div>

        <!--  암호화폐 타입  -->
        <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrencyType")}}</div>
        <div class="mb-4 p-relative">
            <filter-select-box :selectBoxType="'cryptocurrencyType'" :filterValue="chipValues.cryptocurrencyType"
                                 v-on:cryptocurrencyType="setData"></filter-select-box>
        </div>

        <!--  암호화폐 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("cryptoCurrency")}}</div>
        <div class="mb-4 p-relative">
            <filter-select-box :class="{'input-disabled2' : true}"
                                 v-if="!chipValues.cryptocurrencyType"></filter-select-box>
            <div v-else>
                <filter-select-box :selectBoxType="'generalToken'" v-if="chipValues.cryptocurrencyType === 'general'"
                                     @generalToken="setData"
                                     :filterValue="chipValues.tokenNo"></filter-select-box>
                <div v-else>
                    <filter-select-box :selectBoxType="'customToken'"
                                         @customToken="setData" :filterValue="chipValues.tokenNo"></filter-select-box>
                </div>
            </div>
        </div>

        <!--  주문 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("adsType")}}</div>
        <div class="mb-4 p-relative">
            <filter-select-box :selectBoxType="'adsType'" :filterValue="chipValues.adsType" :optionFilter="chipValues.cryptocurrencyType"
                                 v-on:adsType="setData"></filter-select-box>
        </div>

        <!--  거래 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("buySell")}}</div>
        <div class="mb-4 p-relative">
            <filter-select-box :selectBoxType="'tradeType'" :filterValue="chipValues.tradeType"
                                 v-on:tradeType="setData"></filter-select-box>
        </div>

        <!--  화폐 종류  -->
        <div class="text-xs-left text-black mb-2">{{$str("currency")}}</div>
        <div class="mb-4 p-relative">
            <filter-select-box :selectBoxType="'currency'" :filterValue="chipValues.currency"
                                 v-on:currency="setData"></filter-select-box>
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
    import FilterSelectBox from '../../../../../../components/filter/FilterSelectBox.vue'
    import DatePicker from '@/components/DatePicker.vue';
    import {abUtils} from "@/common/utils";
    import Vue from 'vue';
    import MainRepository from "../../../../../../vuex/MainRepository";
    import FilterChipsModel from "../../../../../../vuex/model/filterChips";

    export default Vue.extend({
        name: "my-ads-content",
        components: {
            FilterSelectBox, DatePicker
        },
        props: {
            'chipData': {},
        },
        data: () => ({
            clear: 'on',
            startdateclass: 'startdateclass',
            enddateclass: 'enddateclass',
            chipValues: new FilterChipsModel(''),
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
            },
            onEndDate(value) {
                this.setData(['searchEndTime', value]);
            },
            onCheckNum() {
                // 자연수 체크
                if (!abUtils.isNaturalNumber(this.chipValues.adsNo)) {
                    this.chipValues.adsNo = "";
                } else {
                    this.setData('adsNo', this.chipValues.adsNo);
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
                this.adsNo = null;
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
        right: 8px;
        border-width: 7px;

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

        bottom: 100%;
        right: 6px;
        border-width: 10px;

        margin-left: -8px;
        width: 0;
        height: 0;
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
            width: 75%;
            right: 0;
        }
    }

</style>