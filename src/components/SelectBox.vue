<template>
    <v-layout wrap align-center>
        <div class="p-relative selectbox-width">
            <select  v-model="selected"
                     @change="setting()"
                    class="o-none comp-selectbox h6">
                <option v-for="data in getList" class="o-none "
                        v-bind:value=" selectBoxType === 'customToken' ? data.tokenNo : data.code">
                    {{ selectBoxType === 'customToken' ?
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

            // 수정 모드
            'editCountry': {type: String, default: ''},
            'editCurrency': {type: String, default: ''},
            'editCustomToken': {type: Number},
        },
        data: () => ({
            selected : '',

            //SelectBox.ts import
            signupCountries: SelectBox.signupCountries(),
            countries: SelectBox.countries(),
            currencies: SelectBox.currencies(),
            payments: SelectBox.payments(),
            phones: SelectBox.phones(),
            customTokens: [],
        }),
        computed : {
          getList () {
              switch (this.selectBoxType) {
                  case 'country' :
                      return this.countries;

                  case 'signupCountry' :
                      return this.signupCountries;

                  case 'currency' :
                      return this.currencies;

                  case 'customToken' :
                      return this.customTokens;

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
                        if (this.editCountry !== '') {
                            this.selected = this.editCountry;
                            this.setting();
                        } else {
                            let _country = MainRepository.SelectBox.controller().getCountry();
                            this.selected = _country === 'ALL' ? 'CN' : _country;
                        }
                        break;

                    case 'currency' :
                        if (this.editCurrency !== '') {
                            this.selected = this.editCurrency;
                            this.setting();
                        } else {
                            this.selected = MainRepository.SelectBox.controller().getCurrency();
                        }
                        break;

                    case 'customToken' :
                        MainRepository.MyToken.setCustomTokenList(() => {
                            if (this.editCustomToken !== '') {
                                this.selected = this.editCustomToken;
                                this.setting();
                            }
                            this.customTokens = MainRepository.MyToken.controller().getCustomTokenList();
                        });
                        break;

                    case 'payment' :
                        this.selected = MainRepository.SelectBox.controller().getPayment();
                        break;
                }
            },

            //  VUEX 값 설정
            setting() {
                switch (this.selectBoxType) {
                    case 'county' :
                        MainRepository.SelectBox.controller().setCountry(this.selected);
                        break;

                    case 'signupCountry' :
                        MainRepository.SelectBox.controller().setCountry(this.selected);
                        this.$emit('country', this.selected);
                        break;

                    case 'currency' :
                        MainRepository.SelectBox.controller().setCurrency(this.selected);
                        this.$emit('currency', this.selected);
                        break;

                    case 'customToken' :
                        MainRepository.SelectBox.controller().setCustomToken(this.selected);
                        this.$emit('customToken', this.selected);
                        break;

                    case 'payment' :
                        MainRepository.SelectBox.controller().setPayment(this.selected);
                        break;

                    case 'phone' :
                        this.$emit('number', this.selected);
                        break;
                }
            },
        },
    }
</script>

<style>/*특정 뷰에서 셀렉박스 길이 설정 필요 시, selectbox-width 클래스 지정 후 사용*/</style>