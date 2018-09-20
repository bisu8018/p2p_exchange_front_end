<template>
    <v-layout wrap align-center>

        <!--token list loading indicator-->
        <div class="p-relative w-full"
             v-if="selectBoxType === 'customToken' && customTokens.length === 0 || selectBoxType === 'generalToken'  && generalTokens.length === 0">
            <input type="text" class="input" placeholder="Loading . . ." readonly/>
            <v-progress-circular indeterminate class="color-blue progress-circular-selectbox"></v-progress-circular>
        </div>

        <!--select box-->
        <div class="p-relative  w-full" v-else @click="onShow()">

            <!--body-->
            <div class="o-none comp-selectbox h6 vertical-center" :id="selectBoxType" :class="[selectBoxType, showOptions ? 'comp-selectbox-active' : '']">
                {{ selectedValue }}
            </div>

            <!--scroll-->
            <div class="p-relative">
                <ul class="o-none select-option-list"
                    :class="{'scroll-out' : showOptions , 'scroll-up' : !showOptions && showOptions !== ''  && !showInit}">
                    <li class="select-option vertical-center"
                        v-for="data in getList"
                        @click="onSelect(data)"
                        v-if="selectBoxType !== 'customToken' && selectBoxType !== 'generalToken' ? getCondition !== data.code : true"
                        :class="selected === (selectBoxType === 'customToken' || selectBoxType === 'generalToken' ? data.tokenNo : data.code) ? 'selected-option' : ''">
                        {{ selectBoxType === 'customToken' || selectBoxType === 'generalToken' ? data.tokenName : data.value }}
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
    import MainRepository from "@/vuex/MainRepository";
    import SelectBox from "../vuex/model/SelectBox";

    export default {
        name: 'selectBox',
        props: {
            'selectBoxType': {type: String, default: 'country'},        //country, currency, payment, phone, customToken
            'editValue': '',    // 수정 모드, 데이터
            'optionFilter': ''    // 옵션 필터링
        },
        data: () => ({
            selected: '',
            selectedValue: "",
            showOptions: '',
            showInit: false,

            //SelectBox.ts import
            signupCountries: SelectBox.signupCountries(),
            signupCountry: SelectBox.signupCountries(),
            countries: SelectBox.countries(),
            currencies: SelectBox.currencies(),
            payments: SelectBox.payments(),
            phones: SelectBox.phones(),
            tradeTypes: SelectBox.tradeTypes(),
            cryptocurrencyTypes: SelectBox.cryptocurrencyTypes(),
            priceTypes: SelectBox.priceTypes(),
            customTokens: [],
            generalTokens: [],
        }),
        computed: {
            getList() {
                switch (this.selectBoxType) {
                    case 'country' :
                        return this.countries;

                    case 'signupCountry' :
                        return this.signupCountries;

                    case 'currency' :
                        return this.currencies;

                    case 'customToken' :
                        return this.customTokens;

                    case 'generalToken' :
                        return this.generalTokens;

                    case 'payment' :
                        return this.payments;

                    case 'phone' :
                        return this.phones;

                    case 'tradeType' :
                        return this.tradeTypes;

                    case 'cryptocurrencyType' :
                        return this.cryptocurrencyTypes;

                    case 'priceType' :
                        return this.priceTypes;
                }
            },
            //특정 option에 대한 작업 필요 시 이용
            getCondition() {
                switch (this.selectBoxType) {
                    case 'priceType' :
                        if (this.optionFilter === 'custom') {
                            this.selected = 'fixedprice';
                            this.selectedValue = SelectBox.findValue(this.selectBoxType, this.selected);
                            return 'floatprice'
                        }
                        break;
                }
            }
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
                switch (this.selectBoxType) {
                    case 'country' :
                    case 'signupCountry' :
                    case 'currency' :
                    case 'payment' :
                    case 'tradeType' :
                    case 'priceType' :
                    case 'cryptocurrencyType' :
                    case 'phone' :
                        if (this.editValue) {
                            this.selected = this.editValue;
                            this.selectedValue = SelectBox.findValue(this.selectBoxType, this.editValue);
                        } else {
                            this.selected = this.getList[0].code;
                            this.selectedValue = this.getList[0].value;
                        }
                        this.setting();
                        break;

                    case 'customToken' :
                        MainRepository.CustomToken.setCustomTokenList(() => {
                            this.customTokens = MainRepository.MyToken.controller().getCustomTokenList();
                            this.selected = this.getList[0].tokenNo;
                            this.selectedValue = this.getList[0].tokenName;
                            if (this.editValue) {
                                this.selected = this.editValue;
                            }
                            this.setting();
                        });
                        break;
                    case 'generalToken' :
                        MainRepository.GeneralToken.setGeneralTokenList(() => {
                            this.generalTokens = MainRepository.GeneralToken.controller().getGeneralTokenList();
                            this.selected = this.getList[0].tokenNo;
                            this.selectedValue = this.getList[0].tokenName;
                            if (this.editValue) {
                                this.selected = this.editValue;
                            }
                            this.setting();
                        });
                        break;
                }
            },

            //  값 설정
            setting() {
                let type = this.selectBoxType;

                switch (type) {
                    case 'country' :
                    case 'signupCountry' :
                        MainRepository.SelectBox.controller().setCountry(this.selected);
                        break;

                    case 'currency' :
                        MainRepository.SelectBox.controller().setCurrency(this.selected);
                        break;

                    case 'customToken' :
                        MainRepository.SelectBox.controller().setCustomToken(this.selected);
                        break;

                    case 'generalToken' :
                        MainRepository.SelectBox.controller().setGeneralToken(this.selected);
                        break;

                    case 'payment' :
                        MainRepository.SelectBox.controller().setPayment(this.selected);
                        break;

                    case 'phone' :
                    case 'tradeType' :
                    case 'priceType' :
                    case 'cryptocurrencyType' :
                        break;
                }
                this.$emit(type, this.selected);
            },

            //선택 시
            onSelect(data) {
                let type = this.selectBoxType;
                switch (type) {
                    case 'country' :
                    case 'signupCountry' :
                    case 'payment' :
                    case 'phone' :
                    case 'tradeType' :
                    case 'priceType' :
                    case 'cryptocurrencyType' :
                    case 'currency' :
                        this.selected = data.code;
                        this.selectedValue = data.value;
                        this.setting();
                        break;
                    case 'customToken' :
                    case 'generalToken' :
                        this.selected = data.tokenNo;
                        this.selectedValue = data.tokenName;
                        this.setting();
                        break;
                }
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

<style>

</style>