<template>
    <v-layout wrap align-center>
        <div class="p-relative selectbox-width">
            <select v-if="selectBoxType === 'country' " v-model="selectedCountry" @change="setCountry('normal')"
                    class="o-none comp-selectbox h6">
                <option v-for="country in countries" class="o-none " v-bind:value="country.code">{{country.country}}
                </option>
            </select>
            <select v-if="selectBoxType === 'signupCountry' " v-model="selectedCountry_signup"
                    @change="setCountry('signup')" class="o-none comp-selectbox h6">
                <option v-for="country in signupCountries" class="o-none " v-bind:value="country.code">
                    {{country.country}}
                </option>
            </select>
            <select v-else-if="selectBoxType === 'currency'" v-model="selectedCurrency" @change="setCurrency"
                    class="o-none comp-selectbox h6">
                <option v-for="currency in currencies" class="o-none " v-bind:value="currency.currency">
                    {{currency.currency}}
                </option>
            </select>
            <select v-else-if="selectBoxType === 'payment'" v-model="selectedPayment" @change="setPayment"
                    class="o-none comp-selectbox h6">
                <option v-for="payment in payments" class="o-none " v-bind:value="payment.code">{{payment.payment}}
                </option>
            </select>
            <select v-else-if="selectBoxType === 'phone'" v-model="selectedPhone" @change="setPhone"
                    class="o-none comp-selectbox h6">
                <option v-for="phone in phones" class="o-none " v-bind:value="phone.code">{{phone.code}}</option>
            </select>
            <select v-else-if="selectBoxType === 'customToken'" v-model="selectedCustomToken" @change="setCustomToken"
                    class="o-none comp-selectbox h6">
                <option v-for="customToken in customTokens" class="o-none " v-bind:value="customToken.tokenNo">
                    {{customToken.tokenName}}
                </option>
            </select>
            <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
        </div>
    </v-layout>
</template>
<script>
    import MainRepository from "@/vuex/MainRepository";
    import Vue from 'vue'

    export default {
        name: 'selectBox',
        props: {
            'selectBoxType': {type: String, default: 'country'}, //country, currency, payment, phone
            'editCountry': {type: String, default: ''},
            'editCurrency': {type: String, default: ''},
            'editCustomToken': {type: Number},
        },
        data: () => ({
            selectedCountry: 'ALL',
            selectedCountry_signup: 'CN',
            selectedCurrency: 'CNY',
            selectedPayment: 'ALL',
            selectedPhone: '+86',
            selectedCustomToken: '',
            signupCountries: [
                {country: Vue.prototype.$str('china'), code: 'CN'},
                {country: Vue.prototype.$str('singapore'), code: 'SG'},
                {country: Vue.prototype.$str('india'), code: 'IN'},
                {country: Vue.prototype.$str('vietnam'), code: 'VN'},
                {country: Vue.prototype.$str('canada'), code: 'CA'},
                {country: Vue.prototype.$str('australia'), code: 'AU'},
                {country: Vue.prototype.$str('korea'), code: 'KR'},
                {country: Vue.prototype.$str('switzerland'), code: 'CH'},
                {country: Vue.prototype.$str('netherlands'), code: 'NL'},
                {country: Vue.prototype.$str('taiwan'), code: 'TW'},
                {country: Vue.prototype.$str('russia'), code: 'RU'},
                {country: Vue.prototype.$str('uk'), code: 'UK'},
                {country: Vue.prototype.$str('hongkong'), code: 'HK'},
                {country: Vue.prototype.$str('nigeria'), code: 'NG'},
                {country: Vue.prototype.$str('indonesia'), code: 'ID'},
                {country: Vue.prototype.$str('philippines'), code: 'PH'},
                {country: Vue.prototype.$str('cambodia'), code: 'KH'}
            ],
            countries: [
                {country: Vue.prototype.$str('allCountries'), code: 'ALL'},
                {country: Vue.prototype.$str('china'), code: 'CN'},
                {country: Vue.prototype.$str('singapore'), code: 'SG'},
                {country: Vue.prototype.$str('india'), code: 'IN'},
                {country: Vue.prototype.$str('vietnam'), code: 'VN'},
                {country: Vue.prototype.$str('canada'), code: 'CA'},
                {country: Vue.prototype.$str('australia'), code: 'AU'},
                {country: Vue.prototype.$str('korea'), code: 'KR'},
                {country: Vue.prototype.$str('switzerland'), code: 'CH'},
                {country: Vue.prototype.$str('netherlands'), code: 'NL'},
                {country: Vue.prototype.$str('taiwan'), code: 'TW'},
                {country: Vue.prototype.$str('russia'), code: 'RU'},
                {country: Vue.prototype.$str('uk'), code: 'UK'},
                {country: Vue.prototype.$str('hongkong'), code: 'HK'},
                {country: Vue.prototype.$str('nigeria'), code: 'NG'},
                {country: Vue.prototype.$str('indonesia'), code: 'ID'},
                {country: Vue.prototype.$str('philippines'), code: 'PH'},
                {country: Vue.prototype.$str('cambodia'), code: 'KH'}
            ],
            currencies: [
                {currency: 'CNY'},
                {currency: 'USD'},
                {currency: 'SGD'},
                {currency: 'INR'},
                {currency: 'VND'},
                {currency: 'CAD'},
                //  {currency : 'AUD'},
                {currency: 'KRW'},
                {currency: 'CHF'},
                {currency: 'TWD'},
                {currency: 'RUB'},
                {currency: 'GBP'},
                {currency: 'HKD'},
                {currency: 'EUR'},
                {currency: 'NGN'},
                {currency: 'IDR'},
                {currency: 'PHP'},
                // {currency : 'KHR'},
            ],
            payments: [
                {payment: Vue.prototype.$str('allPayment'), code: 'ALL'},
                {payment: Vue.prototype.$str('bankAccountText'), code: 'bankaccount'},
                {payment: Vue.prototype.$str('alipayText'), code: 'alipay'},
                {payment: Vue.prototype.$str('wechatPayText'), code: 'wechat'},
            ],
            phones: [
                // {code : '0086', nation : 'China'},
                // {code : '00852', nation : 'Hong Kong(China)'},
                // {code : '00886', nation : 'Taiwan(China)'},
                // {code : '0081', nation : 'Japan'},
                // {code : '0082', nation : 'Korea'},
                // {code : '0044', nation : 'United Kingdom'},

                {code: '+86', nation: Vue.prototype.$str('china')},
                {code: '+852', nation: Vue.prototype.$str('hongkong')},
                {code: '+886', nation: Vue.prototype.$str('taiwan')},
                {code: '+82', nation: Vue.prototype.$str('korea')},
                {code: '+44', nation: Vue.prototype.$str('uk')},
            ],
            customTokens: [],
        }),
        created() {
            this.$nextTick(() => {
                this.init();
            });
        },
        beforeDestroy() {
            this.onClear();
        },
        methods: {
            init() {
                switch (this.selectBoxType) {
                    case 'county' :
                        this.selectedCountry = MainRepository.SelectBox.controller().getCountry();
                        break;

                    case 'signupCountry' :
                        if (this.editCountry !== '') {
                            this.selectedCountry_signup = this.editCountry;
                            this.setCountry();
                        } else {
                            let _country = MainRepository.SelectBox.controller().getCountry();
                            this.selectedCountry_signup = _country === 'ALL' ? 'CN' : _country;
                        }
                        break;

                    case 'currency' :
                        if (this.editCurrency !== '') {
                            this.selectedCurrency = this.editCurrency;
                            this.setCurrency();
                        } else {
                            this.selectedCurrency = MainRepository.SelectBox.controller().getCurrency();
                        }
                        break;

                    case 'customToken' :
                        MainRepository.MyToken.setCustomTokenList(() => {
                            if (this.editCustomToken !== '') {
                                this.selectedCustomToken = this.editCustomToken;
                                this.setCustomToken();
                            }
                            this.customTokens = MainRepository.MyToken.controller().getCustomTokenList();

                        });
                        break;

                    case 'payment' :
                        this.selectedPayment = MainRepository.SelectBox.controller().getPayment();
                        break;

                }

            },
            onClear() {
                this.selectedCountry = 'ALL';
                this.selectedCountry_signup = 'CN';
                this.selectedCurrency = 'CNY';
                this.selectedPayment = 'ALL';
                this.selectedPhone = '+86';
                this.selectedCustomToken = '';
            },
            setCountry(type) {
                if (type === 'normal') {
                    MainRepository.SelectBox.controller().setCountry(this.selectedCountry);
                } else {
                    MainRepository.SelectBox.controller().setCountry(this.selectedCountry_signup);
                    this.$emit('country', this.selectedCountry_signup);
                }
            }, setCurrency() {
                MainRepository.SelectBox.controller().setCurrency(this.selectedCurrency);
                this.$emit('currency', this.selectedCurrency);
            }, setPayment() {
                MainRepository.SelectBox.controller().setPayment(this.selectedPayment);
            }, setPhone() {
                this.$emit('number', this.selectedPhone);
            }, setCustomToken() {
                MainRepository.SelectBox.controller().setCustomToken(this.selectedCustomToken);
                this.$emit('customToken', this.selectedCustomToken);
            }
        },
    }
</script>
<style>
    /*특정 뷰에서 셀렉박스 길이 설정 필요 시,*/
    /*selectbox-width 클래스 지정 후 사용*/
</style>