<template>
    <v-layout wrap align-center>

        <!--select box-->
        <div class="p-relative  w-full" @click="onShow()">

            <!--body-->
            <div class="o-none comp-selectbox h6 vertical-center" :id="selectBoxType"
                 :class="[selectBoxType, showOptions ? 'comp-selectbox-active' : '']">
                {{ filterValue ? selectedValue : filterValue }}
            </div>

            <!--scroll-->
            <div class="p-relative">
                <ul class="o-none select-option-list"
                    :class="{'scroll-out' : showOptions , 'scroll-up' : !showOptions && showOptions !== ''  && !showInit}">
                    <li class="select-option vertical-center"
                        v-for="data in getList"
                        @click="onSelect(data)"
                        :class="selected === (data.tokenNo || data.code) ? 'selected-option' : ''">
                        {{ data.tokenName || data.value }}
                    </li>
                </ul>
            </div>

            <!--arrow icon-->
            <i class="material-icons comp-selectbox-icon"
               :class="{'arrow-spin-left' : showOptions}">keyboard_arrow_down</i>
        </div>
    </v-layout>
</template>

<script>
    import SelectBox from "../../../../../../vuex/model/SelectBox";
    import MainRepository from "../../../../../../vuex/MainRepository";

    export default {
        name: 'my-order-select-box',
        props: {
            'selectBoxType': {type: String, default: 'currency'},        //country, currency, payment, phone, customToken
            'filterValue': '',    // 수정 모드, 데이터
        },
        data: () => ({
            selected: '',
            selectedValue: "",
            showOptions: '',
            showInit: false,

            //SelectBox.ts import
            countries: SelectBox.countries(),
            currencies: SelectBox.currencies(),
            tradeTypes: SelectBox.tradeTypes(),
            orderStatus: SelectBox.orderStatus(),
            orderTypes: SelectBox.orderTypes(),
            cryptocurrencyTypes: SelectBox.cryptocurrencyTypes(),
            customTokens: [],
            generalTokens: [],
        }),
        computed: {
            getList() {
                switch (this.selectBoxType) {
                    case 'currency' :
                        return this.currencies;

                    case 'customToken' :
                        return this.customTokens;

                    case 'generalToken' :
                        return this.generalTokens;

                    case 'tradeType' :
                        return this.tradeTypes;

                    case 'cryptocurrencyType' :
                        return this.cryptocurrencyTypes;

                    case 'orderStatus' :
                        return this.orderStatus;

                    case 'orderType' :
                        return this.orderTypes;
                }
            },
        },
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
            this.selected = '';
            this.$eventBus.$off('clickEvent', (event) => {
            });
        },
        methods: {
            //  초기화
            init() {
                if (this.selectBoxType === 'customToken' ) {
                    MainRepository.CustomToken.setCustomTokenList(() => {
                        this.customTokens = MainRepository.MyToken.controller().getCustomTokenList();
                    });
                }else if(this.selectBoxType === 'generalToken'){
                    MainRepository.GeneralToken.setGeneralTokenList(() => {
                        this.generalTokens = MainRepository.GeneralToken.controller().getGeneralTokenList();
                    });
                }

                if(this.filterValue !== '' && this.filterValue) {
                    this.selected = this.filterValue;
                    this.selectedValue = SelectBox.findValue(this.selectBoxType, this.filterValue);
                }
            },
            //선택 시
            onSelect(data) {
                if (this.selectBoxType === 'customToken' || this.selectBoxType === 'generalToken') {
                    this.selected = data.tokenNo;
                    this.selectedValue = data.tokenName;
                } else {
                    this.selected = data.code;
                    this.selectedValue = data.value;
                }

                this.$emit(this.selectBoxType, this.selected);
            },
            //영역 밖 클릭시 스크롤 업
            hideOnClickOutside(event) {
                if (!event.target.classList.contains(this.selectBoxType)) {
                    this.showInit = true;
                    this.showOptions = false;
                }
            },
            onShow() {
                if (this.showOptions === '' || !this.showOptions) {
                    this.showOptions = true;
                    this.showInit = false;
                } else {
                    this.showOptions = false;
                }
            },
        },
    }
</script>

<style></style>