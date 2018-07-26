<template>
    <v-layout mt-5 mb-5 column>
        <!--***************      첫번째       *********-->
        <!--***************       섹션        *********-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide pb-4 mb-4>
            <div class="mb-4 pb-4a display-flex flex-divide bold">
                <div class="h2">{{message === 'general' ? $str("generalAdSubject") : $str("blockAdSubject")}}</div>
            </div>
            <div>
                <div class="h3 bold color-black text-xs-left mb-4">{{$str('postAdIn')}}</div>

                <!--국가 select box-->
                <div class="text-xs-left mb-2 h5  color-black">{{$str("country")}}</div>
                <div class="p-relative mb-3">
                    <select class="comp-selectbox h6" id="nationality" v-model="nationality">
                        <option v-for="country in countries" v-bind:value="country.code">{{country.country}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--화폐 select box-->
                <div class="text-xs-left mb-2 h5  color-black">{{$str("currency")}}</div>
                <div class="p-relative mb-3">
                    <select class="comp-selectbox h6" id="currency" v-model="currency">
                        <option v-for="currency in currencies" v-bind:value="currency.currency">{{currency.currency}}
                        </option>
                    </select>
                </div>

                <!--buy/sell select box-->
                <div class="text-xs-left mb-2 h5  color-black">{{$str("tradeType")}}</div>
                <div class="p-relative mb-3">
                    <select class="comp-selectbox h6" v-model="tradeType">
                        <option value="buy">{{$str("buyText")}}</option>
                        <option value="sell">{{$str("sellText")}}</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>

                <!--코인 select box-->
                <div class="text-xs-left mb-2 h5  color-black">{{$str("cryptoCurrency")}}</div>
                <div class="p-relative">
                    <select class="comp-selectbox h6" id="coinType" v-model="coinType">
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDT">USDT</option>
                    </select>
                    <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
                </div>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide pb-4 mb-4>

            <!--가격 유형 select box-->
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("priceType")}}</div>
            <div class="p-relative mb-3">
                <select class="comp-selectbox h6" v-model="priceType">
                    <option value="fixed">{{$str("fixedPrice")}}</option>
                    <option value="float">{{$str("floatPrice")}}</option>
                </select>
                <v-icon class="comp-selectbox-icon ">keyboard_arrow_down</v-icon>
            </div>


            <!--거래가격-->
            <div class="text-xs-left mb-2 button- color-black ">{{$str("fixedPrice")}}</div>
            <div class="price-input-wrapper mb-4 p-relative" v-bind:class="{'warning-border' : warning_fixed_price}">
                <input type="number" class="price-input" placeholder="0" v-model="priceValue" @keyup="onDeleteZero"
                       @blur="onCheckFixedPrice">
                <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_fixed_price}">
                    {{currency}}
                </div>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_fixed_price}">{{verify_warning_fixed_price}}</span>
                </div>
            </div>

            <!--환율 계산 표시-->
            <div class="text-xs-left h5 color-darkgray ">{{$str("priceText")}}</div>
            <div class="price-clac-wrapper text-xs-left">
                <div class="h1 bold mb-3">{{exchangeRateCalc()}} {{currency}}/{{coinType}}</div>
                <div class="price-calculate color-darkgray">{{$str("marektPrice")}} : {{exchangeRateCalc()}}</div>
                <div class="price-explain h6 color-darkgray">{{$str("priceExplain")}}</div>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide mb-4 pb-4>
            <!--거래가 입력-->
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("volumeText")}}</div>
            <div class="price-input-wrapper mb-3 p-relative" v-bind:class="{'warning-border' : warning_volume}">
                <input type="number" class="price-input" v-model="volumeValue" @blur="onCheckVolume"
                       :placeholder="$str('volumePlaceholderMobile') + balance + ' ' + coinType">
                <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_volume}">{{coinType}}
                </div>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_volume}">{{verify_warning_volume}}</span>
                </div>
            </div>

            <!--최소 한도 금액 입력-->
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("minLimit")}}</div>
            <div class="price-input-wrapper mb-3 p-relative" v-bind:class="{'warning-border' : warning_min_limit}">
                <input type="number" class="price-input" :placeholder="$str('minLimitPlaceholder')"
                       @blur="onCheckMinLimit"
                       v-model="minLimitValue">
                <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_min_limit}">
                    {{currency}}
                </div>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_min_limit}">{{verify_warning_min_limit}}</span>
                </div>
            </div>

            <!--최대 한도 금액 입력-->
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("maxLimit")}}</div>
            <div class="price-input-wrapper mb-3 p-relative" v-bind:class="{'warning-border' : warning_max_limit}">
                <input type="number" class="price-input" :placeholder="$str('maxLimitPlaceholder')"
                       @blur="onCheckMaxLimit"
                       v-model="maxLimitValue">
                <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_max_limit}">
                    {{currency}}
                </div>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_max_limit}">{{verify_warning_max_limit}}</span>
                </div>
            </div>

            <!--지불기간 입력-->
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("paymentWindow")}}</div>
            <div class="price-input-wrapper mb-4 p-relative" v-bind:class="{'warning-border' : warning_payment_window}">
                <input type="number" maxlength="3" class="price-input" :placeholder="$str('paymentWindowPlaceholder')"
                       @blur="onCheckPaymentWindow"
                       v-model="paymentWindowValue">
                <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_payment_window}">
                    {{$str("minuteText")}}
                </div>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_payment_window}">{{verify_warning_payment_window}}</span>
                </div>
            </div>
            <div class="text-xs-left color-darkgray line-height-1a">{{$str("paymentWindowExplain")}}</div>
        </v-flex>


        <!--***************      두번째       *********-->
        <!--***************       섹션        *********-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide mb-4a pb-4a>

            <!--유져 data, DB SELECT 하여 결제수단 data get한 후 v-if문 분기 처리-->
            <!--알리페이 결제-->
            <div class="text-xs-left display-flex mb-4" v-if="alipay === 'Y'">
                <div class="mr-3 "><span @click="onToggle('alipay')"><toggle :toggle="alipayUse"
                                                                             class="c-pointer"></toggle></span></div>
                <div class="d-grid p-relative">
                    <div class="align-center "><img src="@/assets/img/method_alipay.png"><span
                            class="ml-2 mr-1 color-darkgray absolute">{{$str("alipayText")}} : </span>
                        <div class="d-inline-block">{{alipayInfo}}</div>
                    </div>
                </div>
            </div>

            <!--위챗페이 결제-->
            <div class="text-xs-left display-flex mb-4" v-if="wechatPay === 'Y'">
                <div class="mr-3"><span @click="onToggle('wechatPay')"><toggle :toggle="wechatPayUse"
                                                                               class="c-pointer"></toggle></span></div>
                <div class="d-grid p-relative">
                    <div class="align-center"><img src="@/assets/img/method_wechatpay.png"><span
                            class="ml-2 mr-1 color-darkgray absolute">{{$str("wechatPayText")}} : </span>
                        <div class="d-inline-block">{{wechatPayInfo}}</div>
                    </div>
                </div>
            </div>

            <!--은행 계좌 결제-->
            <div class="text-xs-left display-flex mb-4" v-if="bankAccount === 'Y'">
                <div class="mr-3"><span @click="onToggle('bankAccount')"><toggle :toggle="bankAccountUse"
                                                                                 class="c-pointer"></toggle></span>
                </div>
                <div class="d-grid p-relative">
                    <div class="align-center"><img src="@/assets/img/method_bankaccount.png"><span
                            class="ml-2 mr-1 color-darkgray absolute">{{$str("bankAccountText")}} : </span>
                        <div class="d-inline-block">{{bankAccountInfo}}</div>
                    </div>
                </div>
            </div>

            <!--결제수단 새로고침-->
            <div>
                <div @click="onRefresh" class="refresh-btn btn-blue-hover h5 btn-rounded-blue mb-4">
                    <i class="material-icons">sync</i>
                    <span class="refresh-btn-span">{{$str('refreshBtnText')}}</span>
                </div>
            </div>
            <div class="payment-explain text-xs-left line-height-1a">
                <span class="color-darkgray ">{{$str("paymentExplain")}}</span>
                <a class="text-white-hover color-blue">{{$str("clickHereText")}}</a>
            </div>
        </v-flex>

        <!--자동 답글 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide mb-4 pb-4>
            <div class="text-xs-left mb-2  h5 color-black">{{$str("autoReplyText")}}</div>
            <div class="price-input-wrapper">
                <textarea class="common-textarea" :placeholder="$str('autoReplyPlaceholder')"
                          v-model="autoReplayValue"></textarea>
            </div>
        </v-flex>

        <!--거래조항 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide mb-4 pb-4>
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("termsTransactionText")}}</div>
            <div class="price-input-wrapper">
                <textarea class="common-textarea" :placeholder="$str('termsTransactionPlaceholder')"
                          v-model="termsTransactinValue"></textarea>
            </div>
        </v-flex>

        <!--상대방 제한사항 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide mb-4 pb-4>
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("counterpartyFilterText")}}</div>
            <div class="text-xs-left mb-2 h6 color-darkgray ">{{$str("counterpartyFilterPlaceholder")}}
            </div>
            <div class="mb-4 p-relative">
                <input class="input" type="text" v-bind:class="{'warning-border' : warning_counterparty}"
                       @blur="onCheckCounterparty" placeholder="0" v-model="counterpartyFilterValue" maxlength="3">
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_counterparty}">{{verify_warning_counterparty}}</span>
                </div>
            </div>
            <div class="text-xs-left mb-4"><label><input type="checkbox"
                                                         v-model="counterpartyCheckbox_first"/><span
                    class="color-black ml-2">{{$str("counterpartyCheckbox1")}}</span></label>
            </div>
            <div class="text-xs-left mb-4 "><label><input type="checkbox" v-model="counterpartyCheckbox_second"/><span
                    class="color-black ml-2">{{$str("counterpartyCheckbox2")}}</span></label>
            </div>
            <div class="text-xs-left mb-4"><label><input type="checkbox"
                                                         v-model="counterpartyCheckbox_third"/><span
                    class="color-black ml-2">{{$str("counterpartyCheckbox3")}}</span></label>
            </div>
            <div class="text-xs-left h6 color-darkgray">{{$str("counterpartyExplain")}}</div>
        </v-flex>

        <!--거래 비밀번호 비교 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide mb-4 pb-4>
            <div class="text-xs-left mb-2 h5 color-black ">{{$str("tradePwText")}}</div>
            <div class="p-relative">
                <input type="text" v-bind:class="{'warning-border' : warning_trade_password}" class="input"
                       :placeholder="$str('tradePwText')" v-model="tradePwValue" @blur="onCheckTradePassword"/>
                <div class="warning-text-wrapper">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_trade_password}">{{verify_warning_trade_password}}</span>
                </div>
            </div>
        </v-flex>

        <!--거래조항/이용약관-->
        <v-flex xs12 lg4 offset-lg4 wrap text-xs-left>
            <div class=" mb-4 display-flex">
                <div >
                    <label class="mb-3">
                        <input type="checkbox" v-model="agreeTerms" class="mr-3"/>{{$str("agreeTermsExplain")}}
                    </label>
                    <div class="d-inline-block">
                        <a class=" color-blue common-text-hover">《{{$str("termsTrading")}}》</a>
                    </div>
                </div>
            </div>

            <!--슬라이드 바 인증-->
            <div class="verify-slider-wrapper mb-4">
            <verify-slider v-on:passcallback="putVerified"></verify-slider>
            </div>

            <button @click='onCheck' class="color-blue btn-blue btn-blue-hover">
                {{$str("postAdBtn")}}
            </button>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import SelectBox from '../../../../components/SelectBox.vue';
    import Toggle from '../../../../components/Toggle.vue';
    import VerifySlider from "../../../../components/VerifySlider.vue";
    import AdService from "../../../../service/ad/AdService";
    import MainRepository from "../../../../vuex/MainRepository";
    import {abUtils} from "../../../../common/utils";

    export default Vue.extend({
        name: 'postAd',
        props: ['message'],
        data: () => ({
            price: "",
            currency: "CNY",
            coin: "",
            balance: 200,
            tradeType: "buy",
            nationality: "CN",
            coinType: "BTC",
            priceType: "fixed",
            priceValue: "",
            volumeValue: "",
            minLimitValue: "",
            maxLimitValue: "",
            paymentWindowValue: "",
            alipay: "Y",
            wechatPay: "Y",
            bankAccount: "Y",
            alipayUse: false,
            wechatPayUse: false,
            bankAccountUse: false,
            alipayInfo: "范鹏龙 , 18529612778 Alipay",
            wechatPayInfo: "范鹏龙 , 18529612778 Wechatpay",
            bankAccountInfo: "范鹏龙 , 6214856562128938 招商银行 珠海分行营业部",
            autoReplayValue: "",
            termsTransactinValue: "",
            counterpartyFilterValue: "",
            counterpartyCheckbox_first: false,
            counterpartyCheckbox_second: false,
            counterpartyCheckbox_third: false,
            tradePwValue: "",
            agreeTerms: false,
            isVerified: false,
            adType: "",
            exchangeRate: '2977.02',
            warning_fixed_price: false,
            warning_volume: false,
            warning_min_limit: false,
            warning_max_limit: false,
            warning_payment_window: false,
            warning_counterparty: false,
            warning_trade_password: false,
            verify_warning_fixed_price: "",
            verify_warning_volume: "",
            verify_warning_min_limit: "",
            verify_warning_max_limit: "",
            verify_warning_counterparty: "",
            verify_warning_payment_window: "",
            verify_warning_trade_password: "",
            countries: [
                {country: 'China', code: 'CN'},
                {country: 'Singapore', code: 'SG'},
                {country: 'India', code: 'IN'},
                {country: 'Vietnam', code: 'VN'},
                {country: 'Canada', code: 'CA'},
                {country: 'Australia', code: 'AU'},
                {country: 'Korea', code: 'KR'},
                {country: 'Switzerland', code: 'CH'},
                {country: 'Netherlands', code: 'NL'},
                {country: 'Taiwan', code: 'TW'},
                {country: 'Russia', code: 'RU'},
                {country: 'United Kingdom', code: 'UK'},
                {country: 'Hong Kong(china)', code: 'HK'},
                {country: 'Nigeria', code: 'NG'},
                {country: 'Indonesia', code: 'ID'},
                {country: 'Philippines', code: 'PH'},
                {country: 'Cambodia', code: 'KH'}
            ],
            currencies: [
                {currency: 'CNY'},
                {currency: 'USD'},
                {currency: 'SGD'},
                {currency: 'INR'},
                {currency: 'VND'},
                {currency: 'CAD'},
                {currency: 'AUD'},
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
                {currency: 'KHR'},
            ],
        }),
        components: {
            SelectBox, VerifySlider, Toggle
        },
        created() {
            //환율 및 유져 정보 get 필요
        },
        methods: {
            onCheck: function () {
                if (this.onCheckPaymentWindow() && this.onCheckMaxLimit() && this.onCheckMinLimit() && this.onCheckVolume() && this.onCheckFixedPrice() && this.onCheckCounterparty()) {
                    this.onPost();
                }
            },
            onPost: function () {
                AdService.AD.postAD({
                    country: MainRepository.SelectBox.controller().getCountry(),
                    currency: MainRepository.SelectBox.controller().getCurrency(),
                    ad_type: this.tradeType,
                    token: this.coinType,
                    priceType: this.priceType,
                    price: this.priceValue,
                    volume_total: this.volumeValue,
                    limit_min: this.minLimitValue,
                    limit_max: this.maxLimitValue,
                    paymentWindowValue: this.paymentWindowValue,
                    alipayUse: this.alipayUse,               //NULL 값 허용
                    wechatPayUse: this.wechatPayUse,         //최소 한개 필요 !!
                    bankAccountUse: this.bankAccountUse,     //KYC 확인란에서 체크
                    autoReplayValue: this.autoReplayValue,
                    termsTransactinValue: this.termsTransactinValue,
                    counterpartyFilterValue: this.counterpartyFilterValue,
                    counterpartyCheckbox_first: this.counterpartyCheckbox_first,
                    counterpartyCheckbox_second: this.counterpartyCheckbox_second,
                    counterpartyCheckbox_third: this.counterpartyCheckbox_third,
                    blocktrade: this.adType,
                    tradePwValue: this.tradePwValue,
                    agreeTerms: this.agreeTerms
                }, function (error) {
                    if (!error) {
                        //console.log("success");
                        alert("Thank you");
                        location.href = "/abMain";

                    } else {
                        console.log("POST ERROR ::::::: " + error);
                    }
                })
            },
            putVerified: function () {
                //슬라이드 바 return function
                this.isVerified = true;
            },
            onRefresh: function () {
                //결제수단 새로고침 function
            },
            onToggle: function (type) {
                // 결제수단 별 토글버튼 on/off 로직
                if (type === 'alipay') {
                    if (this.alipayUse === false) {
                        this.alipayUse = true;
                    } else {
                        this.alipayUse = false;
                    }
                } else if (type === 'wechatPay') {
                    if (this.wechatPayUse === false) {
                        this.wechatPayUse = true;
                    } else {
                        this.wechatPayUse = false;
                    }
                } else {
                    if (this.bankAccountUse === false) {
                        this.bankAccountUse = true;
                    } else {
                        this.bankAccountUse = false;
                    }
                }
            },
            exchangeRateCalc() {
                //금액 , 추가
                return abUtils.toMoneyFormat(String(this.exchangeRate));
            },
            onDeleteZero() {
                let temp = this.priceValue;
                this.priceValue = abUtils.toDeleteZero(temp);
            },
            onCheckFixedPrice() {
                // 고정가격 체크
                let priceValue = Number(this.priceValue)
                if (priceValue === 0 || priceValue === undefined) {
                    this.warning_fixed_price = true;
                    this.verify_warning_fixed_price = Vue.prototype.$str("warningFixedPricePlaceholder");
                    return false;
                }
                this.warning_fixed_price = false;
                return true;
            },
            onCheckVolume() {
                //거래수량 체크
                let volumeValue = Number(this.volumeValue);
                if (volumeValue === 0 || volumeValue === undefined) {
                    this.warning_volume = true;
                    this.verify_warning_volume = Vue.prototype.$str("warningVolume");
                    return false;
                }
                if (volumeValue > this.balance) {
                    this.warning_volume = true;
                    this.verify_warning_volume = Vue.prototype.$str("lowBalance");
                    return false;
                }

                this.warning_volume = false;
                return true;
            },
            onCheckMinLimit() {
                //최소금액 체크
                let minLimitValue = Number(this.minLimitValue);
                console.log(minLimitValue);
                if (minLimitValue === 0 || minLimitValue === undefined) {
                    this.verify_warning_min_limit = Vue.prototype.$str("warningMinLimit");
                    this.warning_min_limit = true;
                    return false;
                }
                if (minLimitValue < 100) {
                    this.warning_min_limit = true;
                    this.verify_warning_min_limit = Vue.prototype.$str("atLeast");
                    return false;
                }
                this.warning_min_limit = false;
                return true;
            },
            onCheckMaxLimit() {
                //최대금액 체크
                let maxLimitValue = Number(this.maxLimitValue);
                if (maxLimitValue === 0 || maxLimitValue === undefined) {
                    this.warning_max_limit = true;
                    this.verify_warning_max_limit = Vue.prototype.$str("warningMaxLimit");
                    return false;
                }
                if (maxLimitValue > 0.00) {
                    this.warning_volume = true;
                    this.verify_warning_max_limit = Vue.prototype.$str("atMost");
                    return false;
                }
                this.warning_max_limit = false;
                return true;
            },
            onCheckPaymentWindow() {
                //지불기간 체크
                let paymentWindowValue = Number(this.paymentWindowValue);
                if (paymentWindowValue === 0 || paymentWindowValue === undefined) {
                    this.warning_payment_window = true;
                    this.verify_warning_payment_window = Vue.prototype.$str("warningPaymentWindow");
                    return false;
                }
                if (paymentWindowValue < 10 || paymentWindowValue > 20) {
                    this.warning_payment_window = true;
                    this.verify_warning_payment_window = Vue.prototype.$str("timeRange");
                    return false;
                }
                this.warning_payment_window = false;
                return true;
            },
            onCheckCounterparty() {
                //거래상대 조건 체크
                let counterpartyFilterValue = Number(this.counterpartyFilterValue);
                if (counterpartyFilterValue > 99) {
                    this.warning_counterparty = true;
                    this.verify_warning_counterparty = Vue.prototype.$str("counterpartyWarning");
                    return false;
                }
                this.warning_counterparty = false;
                return true;
            },
            onCheckTradePassword() {
                //거래 비밀번호 체크
                let tradePwValue = Number(this.tradePwValue);
                if (tradePwValue === 0 || tradePwValue === undefined) {
                    this.warning_trade_password = true;
                    this.verify_warning_trade_password = Vue.prototype.$str("warning_trade_password");
                    return false;
                }
                this.warning_trade_password = false;
                return true;
            }
        }
    });
</script>
<style>
    .selectbox-width {
        width: 100% !important;
    }

    .line-height-1a {
        line-height: 1.2;
    }

    .common-textarea {
        height: 90px;
        width: 100%;
        padding: 8px;
        resize: none;
    }

    .flex-divide {
        border-bottom: solid 1px #d1d1d1;
    }

    .price-input-wrapper {
        border: solid 1px #8d8d8d;
        border-radius: 2px;
        display: flex;
    }

    .price-input {
        height: 40px;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 12px;
        font-weight: 500;
        width: 100%;
        color: #353535;
    }

    .display-flex {
        display: flex;
    }

    .currency-indicator {
        width: 60px;
        height: 40px;
        padding-top: 10px;
        color: #ffffff;
        background-color: #8d8d8d;
        padding-left: 19px;
        padding-right: 19px;
    }

    .refresh-btn {
        width: 106px;
        display: flex;
        padding-top: 7px;
        padding-left: 12px;
    }

    .refresh-btn-span {
        margin-top: 1px;
        margin-left: 5px;
    }

    /*높이 재조정*/
    .warning-text-wrapper {
        top: 42px !important;
    }

    .verify-slider-wrapper {
        max-width: 290px;
    }

    /*warning indicator css */
    .warning-indicator {
        background: white;
        color: black;
        font-weight: bold;
        border-left: 1px solid #e62a2b;
    }

    /*textarea css*/
    textarea::-webkit-input-placeholder {
        color: #9294a6;
    }

    textarea:-moz-placeholder { /* Firefox 18- */
        color: #9294a6;
    }

    textarea::-moz-placeholder { /* Firefox 19+ */
        color: #9294a6;
    }

    textarea:-ms-input-placeholder {
        color: #9294a6;
    }
</style>

