<template>
    <v-layout wrap align-center>

        <!--토큰 리스트 로딩-->
        <div class="p-relative"
             v-if="selectBoxType === 'customToken' && customTokens.length === 0 || selectBoxType === 'generalToken'  && generalTokens.length === 0">
            <input type="text" class="input c-progress" placeholder="Loading . . ." readonly/>
            <v-progress-circular indeterminate class="color-blue progress-circular-selectbox"></v-progress-circular>
        </div>

        <!--셀렉트 박스-->
        <div class="p-relative selectbox-width" v-else>
            <select v-model="selected"
                    @change="setting()"
                    class="o-none comp-selectbox h6">
                <option v-for="data in getList" class="o-none "
                        v-bind:value="
                        selectBoxType === 'customToken' || selectBoxType === 'generalToken' ?
                        data.tokenNo : data.code">

                    {{ selectBoxType === 'customToken' || selectBoxType === 'generalToken' ?
                    data.tokenName : (data.value ? data.value : data.code) }}
                </option>
            </select>
            <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
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
            'editValue': ''    // 수정 모드, 데이터
        },
        data: () => ({
            selected: '',

            //SelectBox.ts import
            signupCountries: SelectBox.signupCountries(),
            countries: SelectBox.countries(),
            currencies: SelectBox.currencies(),
            payments: SelectBox.payments(),
            phones: SelectBox.phones(),
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
                }
            }
        },
        created() {
            this.$nextTick(() => {
                this.init();
            });
        },
        beforeDestroy() {
            this.selected = '';
        },
        methods: {

            //  VUEX 초기화
            init() {
                switch (this.selectBoxType) {
                    case 'country' :
                        this.selected = MainRepository.SelectBox.controller().getCountry();
                        break;

                    case 'signupCountry' :
                        if (this.editValue) {
                            this.selected = this.editValue;
                            this.setting();
                        } else {
                            let _country = MainRepository.SelectBox.controller().getCountry();
                            this.selected = _country === 'ALL' ? 'CN' : _country;
                        }
                        break;

                    case 'currency' :
                        if (this.editValue) {
                            this.selected = this.editValue;
                            this.setting();
                        } else {
                            this.selected = MainRepository.SelectBox.controller().getCurrency();
                        }
                        break;

                    case 'customToken' :
                        MainRepository.MyToken.setCustomTokenList(() => {
                            if (this.editValue) {
                                this.selected = this.editValue;
                                this.setting();
                            }
                            this.customTokens = MainRepository.MyToken.controller().getCustomTokenList();
                            this.selected = this.customTokens[0].tokenNo;
                        });
                        break;

                    case 'generalToken' :
                        MainRepository.MyToken.setGeneralTokenList(() => {
                            if (this.editValue) {
                                this.selected = this.editValue;
                                this.setting();
                            } else {
                                this.selected = 2147483646;
                            }
                            this.generalTokens = MainRepository.GeneralToken.controller().getGeneralTokenList();
                        });
                        break;

                    case 'payment' :
                        this.selected = MainRepository.SelectBox.controller().getPayment();
                        break;
                }
            },

            //  VUEX 값 설정
            setting() {
                let type = this.selectBoxType;

                switch (type) {
                    case 'county' :
                        MainRepository.SelectBox.controller().setCountry(this.selected);
                        break;

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
                        break;
                }
                this.$emit(type, this.selected);
            },
        },
    }
</script>

<style>/*특정 뷰에서 셀렉박스 길이 설정 필요 시, selectbox-width 클래스 지정 후 사용*/</style>