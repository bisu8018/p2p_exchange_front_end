<template>
    <div class=" mt-5">
        <v-flex xs12 class="text-xs-left h2 mb-4  bold">
            {{message === 'general' ? $str("generalAdSubject") : $str("blockAdSubject")}}
            <v-divider class="mt-4"></v-divider>
        </v-flex>

        <!--***************      첫번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4>
                {{$str('postAdIn')}}
            </v-flex>

            <!--국가 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{$str("country")}}</div>
                    <div class="p-relative mb-0" :class="{'mb-3' : isMobile}">
                        <select-box :selectBoxType="'signupCountry'"></select-box>
                    </div>
                </div>
            </v-flex>

            <!--화폐 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{$str("currency")}}</div>
                    <div class="p-relative mb-0" :class="{'mb-3' : isMobile}">
                        <select-box :selectBoxType="'currency'"></select-box>
                    </div>
                </div>
            </v-flex>

            <!--buy/sell select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{$str("tradeType")}}</div>
                    <div class="p-relative mb-0" :class="{'mb-3' : isMobile}">
                        <select class="comp-selectbox h6" v-model="tradeType">
                            <option value="buy">{{$str("buyText")}}</option>
                            <option value="sell">{{$str("sellText")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>
                </div>
            </v-flex>

            <!--코인 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{$str("cryptoCurrency")}}</div>
                    <div class="p-relative">
                        <select class="comp-selectbox h6" id="cryptocurrency" v-model="cryptocurrency">
                            <option value="bitcoin">BTC</option>
                            <option value="ethereum">ETH</option>
                            <option value="allb">ALLB</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      두번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{$str('price')}}
            </v-flex>
            <!--가격 유형 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">{{$str("priceType")}}</div>
                    <div class="p-relative mb-3">
                        <select class="comp-selectbox h6" v-model="priceType">
                            <option value="fixedprice">{{$str("fixedPrice")}}</option>
                            <option value="floatprice">{{$str("floatPrice")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>
                </div>
            </v-flex>

            <!--거래가격-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 button- color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{priceType === 'fixedprice' ? $str("fixedPrice") : $str("margin")}}
                    </div>
                    <div class="price-input-wrapper mb-4 p-relative"
                         v-bind:class="{'warning-border' : warning_fixed_price}">
                        <input type="text" class="price-input" placeholder="0" v-model="fixedPrice"
                               @keyup="onNumberCheck('price')"
                        >
                        <div class="border-indicator h6">
                            {{priceType === 'fixedprice' ? getCurrency : '%'}}
                        </div>
                        <!--<div class="currency-indicator h6"
                             v-bind:class="{'warning-indicator' : warning_fixed_price}">
                            {{getCurrency}}
                        </div>-->
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_fixed_price}">{{verify_warning_fixed_price}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>

            <!--환율 계산 표시-->
            <v-flex xs12 md4>
                <div>
                    <div class="text-xs-left h5 color-darkgray ">{{$str("priceText")}}</div>
                    <div class="price-clac-wrapper text-xs-left">
                        <div class="h1 bold mb-3" :class="{'pt-3':!isMobile}">{{priceType === 'fixedprice' ?
                            toMoneyFormat || 0 : getMarketPrice || 0}} {{getCurrency}}/{{getCryptoCurrency}}
                        </div>
                    </div>
                </div>
            </v-flex>
            <v-spacer></v-spacer>

            <!--환율 설명-->
            <v-flex xs12 md8 offset-md4>
                <div class="price-clac-wrapper text-xs-left">
                    <div class="price-calculate color-darkgray">{{$str("marektPrice")}} :
                        {{getMarketPrice || 0}} {{getCurrency}}/{{getCryptoCurrency}}
                    </div>
                    <div class="price-explain color-darkgray">{{$str("priceExplain")}}</div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      세번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4>
                {{$str('limits')}}
            </v-flex>

            <!--거래가 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{$str("volumeText")}}
                    </div>
                    <div class="price-input-wrapper mb-3 p-relative" v-bind:class="{'warning-border' : warning_volume}">
                        <input type="text" class="price-input" v-model="volume"
                               @keyup="onNumberCheck('volume')" ref="volume"
                               :placeholder="$str('volumePlaceholderMobile') + getBalance">
                        <div class="border-indicator h6">
                            {{getCryptoCurrency}}
                        </div>
                        <!--<div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_volume}">
                            {{getCryptoCurrency}}
                        </div>-->
                        <div class="warning-text-wrapper">
                    <span class="d-none"
                          v-bind:class="{'warning-text' : warning_volume}">{{verify_warning_volume}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>

            <!--최소 한도 금액 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{$str("minLimit")}}
                    </div>
                    <div class="price-input-wrapper mb-3 p-relative"
                         v-bind:class="{'warning-border' : warning_min_limit}">
                        <input type="text" class="price-input" :placeholder="$str('minLimitPlaceholder') + getMinLimit"
                               @keyup="onNumberCheck('minLimit')"
                               v-model="minLimit">
                        <div class="border-indicator h6">
                            {{getCurrency}}
                        </div>
                        <!--    <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_min_limit}">
                                {{getCurrency}}
                            </div>-->
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_min_limit}">{{verify_warning_min_limit}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>


            <!--최대 한도 금액 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{$str("maxLimit")}}
                    </div>
                    <div class="price-input-wrapper mb-3 p-relative"
                         v-bind:class="{'warning-border' : warning_max_limit}">
                        <input type="text" class="price-input" :placeholder="$str('maxLimitPlaceholder')"
                               @keyup="onNumberCheck('maxLimit')"
                               v-model="maxLimit">
                        <div class="border-indicator h6">
                            {{getCurrency}}
                        </div>
                        <!--  <div class="currency-indicator h6" v-bind:class="{'warning-indicator' : warning_max_limit}">
                              {{getCurrency}}
                          </div>-->
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_max_limit}">{{verify_warning_max_limit}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>

            <!--지불기간 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{$str("paymentWindow")}}
                    </div>
                    <div class="price-input-wrapper mb-4 p-relative"
                         v-bind:class="{'warning-border' : warning_payment_window}">
                        <input type="text" maxlength="2" class="price-input"
                               :placeholder="$str('paymentWindowPlaceholder')"
                               @keyup="onNumberCheck('paymentWindow')"
                               v-model="paymentWindow">
                        <div class="border-indicator h6">
                            {{$str("minuteText")}}
                        </div>
                        <!--  <div class="currency-indicator h6"
                               v-bind:class="{'warning-indicator' : warning_payment_window}">
                              {{$str("minuteText")}}
                          </div>-->
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_payment_window}">{{verify_warning_payment_window}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 md8 offset-md4>
                <div class="text-xs-left color-darkgray line-height-1a">{{$str("paymentWindowExplain")}}</div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      네번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{$str('paymentMethod')}}
            </v-flex>

            <!--유져 data, DB SELECT 하여 결제수단 data get한 후 v-if문 분기 처리-->
            <!--알리페이 결제-->
            <v-flex xs12 md8>
                <div class="text-xs-left display-flex mb-4" v-if="getAlipay.activeYn === true ">
                    <v-flex xs1 pl-0 pr-0>
                        <span @click="onToggle('alipay')">
                            <toggle :toggle="alipay_toggle_use" class="c-pointer"></toggle>
                        </span>
                    </v-flex>
                    <v-flex xs11>
                        <v-flex xs5 pl-0 pr-0 class="vertical-center ">
                            <div class="sprite-img ic-alipay d-inline-block"></div>
                            <span
                                    class="ml-2 mr-1 color-darkgray absolute">{{$str("alipayText")}} : </span>
                        </v-flex>
                        <v-flex xs7 pl-0 pr-0 class="vertical-center ">
                            <div class="d-inline-block">{{getAlipay.alipayId}}</div>
                        </v-flex>
                    </v-flex>
                </div>
            </v-flex>

            <!--위챗페이 결제-->
            <v-flex xs12 md8 offset-md4>
                <div class="text-xs-left display-flex mb-4" v-if="getWechat.activeYn === true">
                    <v-flex xs1 pl-0 pr-0>
                        <span @click="onToggle('wechatPay')">
                            <toggle :toggle="wechat_toggle_use" class="c-pointer"></toggle>
                        </span>
                    </v-flex>
                    <v-flex xs11>
                        <v-flex xs5 pl-0 pr-0 class="vertical-center">
                            <div class="sprite-img ic-wechatpay d-inline-block"></div>
                            <span
                                    class="ml-2 mr-1 color-darkgray absolute">{{$str("wechatPayText")}} : </span>
                        </v-flex>
                        <v-flex xs6 pl-0 pr-0 class="vertical-center ">
                            <div class="d-inline-block">{{getWechat.wechatId}}</div>
                        </v-flex>
                    </v-flex>

                </div>
            </v-flex>

            <!--은행 계좌 결제-->
            <v-flex xs12 md8 offset-md4>
                <div class="text-xs-left display-flex mb-4 " v-if="getBank === true">
                    <v-flex xs1 pl-0 pr-0>
                        <span @click="onToggle('bankAccount')">
                            <toggle :toggle="bank_toggle_use" class="c-pointer"></toggle>
                        </span>
                    </v-flex>
                    <v-flex xs11>
                        <v-flex xs5 pl-0 pr-0 class="vertical-center">
                            <div class="sprite-img ic-bank d-inline-block"></div>
                            <span
                                    class="ml-2 mr-1 color-darkgray absolute">{{$str("bankAccountText")}} : </span>
                        </v-flex>
                        <v-flex xs6 pl-0 pr-0 class="vertical-center ">
                            <div class="d-inline-block">{{getBank.bankName}}, {{getBank.bankBranchInfo}}
                                {{getBank.bankAccount}}
                            </div>
                        </v-flex>
                    </v-flex>
                </div>
            </v-flex>

            <!--결제수단 새로고침-->
            <v-flex xs12 md8 offset-md4 text-xs-left mb-4>
                <span @click="onRefresh" class="p-relative refresh-btn btn-blue-hover h5 btn-rounded-blue c-pointer">
                    <i class="material-icons refresh-icon">sync</i>
                    <span class="refresh-btn-span">{{$str('refreshBtnText')}}</span>
                </span>
            </v-flex>


            <v-flex xs12 md8 offset-md4>
                <div class="payment-explain text-xs-left line-height-1a">
                    <span class="color-darkgray ">{{$str("paymentExplain")}}</span>
                    <a class="text-white-hover color-blue" @click="goMyPage()">{{$str("clickHereText")}}</a>
                </div>
            </v-flex>

            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      다섯번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{$str('autoReplyText')}}
            </v-flex>
            <!--자동 답글 입력-->
            <v-flex xs12 md8>
                <div>
                    <div class="text-xs-left mb-2  h5 color-black" v-if="isMobile">{{$str("autoReplyText")}}</div>
                    <div class="price-input-wrapper">
                <textarea class="common-textarea" :placeholder="$str('autoReplyPlaceholder')"
                          v-model="autoReplay"></textarea>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      여섯번째       *********-->
        <!--***************       섹션        *********-->

        <!--거래조항 입력-->
        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{$str('termsTransactionText')}}
            </v-flex>
            <v-flex xs12 md8>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black " v-if="isMobile">{{$str("termsTransactionText")}}
                    </div>
                    <div class="price-input-wrapper">
                <textarea class="common-textarea" :placeholder="$str('termsTransactionPlaceholder')"
                          v-model="termsOfTransaction"></textarea>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      일곱번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{$str('counterpartyFilterText')}}
            </v-flex>
            <!--상대방 제한사항 입력-->
            <v-flex xs12 md4>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black " v-if="isMobile">{{$str("counterpartyFilterText")}}
                    </div>
                    <div class="text-xs-left mb-2 h6 color-darkgray ">{{$str("counterpartyFilterPlaceholder")}}
                    </div>
                    <div class="mb-4 p-relative">
                        <input class="input" type="text" v-bind:class="{'warning-border' : warning_counterparty}"
                               @keyup="onNumberCheck('counterParty')"
                               placeholder="0" v-model="counterpartyFilterTradeCount "
                               maxlength="2">
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_counterparty}">{{verify_warning_counterparty}}</span>
                        </div>
                    </div>

                </div>
            </v-flex>
            <v-flex xs12 md6 offset-md4>
                <div>
                    <div class="text-xs-left mb-4 vertical-center">
                        <input type="checkbox" id="first_condition_chkbox" v-model="counterpartyCheckbox_first"/>
                        <label for="first_condition_chkbox">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                            <h5 class="d-inline-block">{{$str("counterpartyCheckbox1")}}</h5>
                        </label>
                    </div>
                    <div class="text-xs-left mb-4 ">
                        <input type="checkbox" id="second_condition_chkbox" v-model="counterpartyCheckbox_second"/>
                        <label for="second_condition_chkbox">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                            <h5 class="d-inline-block">{{$str("counterpartyCheckbox2")}}</h5>
                        </label>
                    </div>
                    <div class="text-xs-left mb-4">
                        <input type="checkbox" v-model="counterpartyCheckbox_third" id="third_condition_chkbox"/>
                        <label for="third_condition_chkbox">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                            <h5 class="d-inline-block">{{$str("counterpartyCheckbox3")}}</h5>
                        </label>
                    </div>
                    <div class="text-xs-left h6 color-darkgray">{{$str("counterpartyExplain")}}</div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      여덞번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left v-if="!isMobile">
                {{$str('tradePwText')}}
            </v-flex>
            <!--거래 비밀번호 비교 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black " v-if="isMobile">{{$str("tradePwText")}}</div>
                    <div class="p-relative">
                        <input type="password" v-bind:class="{'warning-border' : warning_trade_password}" class="input"
                               :placeholder="$str('tradePwText')" v-model="tradePassword" @blur="onCheckTradePassword"/>
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_trade_password}">{{verify_warning_trade_password}}</span>
                        </div>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      아홉번째       *********-->
        <!--***************       섹션        *********-->

        <!--거래조항/이용약관-->
        <v-layout wrap row>
            <v-flex xs12 md6 offset-md4 text-xs-left vertical-center>
                <input type="checkbox" id="terms_chkbox" v-model="agreeTerms" class="mr-3"/>
                <label for="terms_chkbox">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                    <h5 class="d-inline-block">{{$str("agreeTermsExplain")}}</h5>
                </label>
                <a class=" color-blue text-white-hover" v-if="!isMobile">《{{$str("termsTrading")}}》</a>
            </v-flex>
            <a class=" color-blue text-white-hover ml-4 mt-1" v-if="isMobile">《{{$str("termsTrading")}}》</a>
            <v-flex xs12 md3 offset-md4 mt-4>
                <!--슬라이드 바 인증-->
                <div class="verify-slider-wrapper mb-4">
                    <div>
                        <verify-slider v-on:passcallback="putVerified"></verify-slider>
                    </div>
                </div>
                <div>
                    <button @click='onCheck' class="color-blue btn-blue btn-blue-hover">
                        {{$str("postAdBtn")}}
                    </button>
                </div>
            </v-flex>
        </v-layout>
        <post-ad-modal :show="showModal" v-on:close="onClose" v-on:determine="onDetermine"></post-ad-modal>
    </div>
</template>

<script>
    import Vue from 'vue';
    import SelectBox from '../../../../components/SelectBox.vue';
    import Toggle from '../../../../components/Toggle.vue';
    import VerifySlider from "../../../../components/VerifySlider.vue";
    import Common from "../../../../service/common/CommonService";
    import MainRepository from "../../../../vuex/MainRepository";
    import {abUtils} from "../../../../common/utils";
    import PostAdModal from "./postAdItem/PostAdModal.vue";

    export default Vue.extend({
        name: 'postAd',
        props: ['message'],
        components: {
            SelectBox, VerifySlider, Toggle, PostAdModal
        },
        data: () => ({
            balace: '',
            showModal: false,
            tradeType: "buy",
            cryptocurrency: "bitcoin",
            priceType: "fixedprice",
            fixedPrice: "",
            volume: "",
            minLimit: "",
            maxLimit: "",
            paymentWindow: "",
            alipay_toggle_use: false,
            wechat_toggle_use: false,
            bank_toggle_use: false,
            autoReplay: "",
            termsOfTransaction: "",
            counterpartyFilterTradeCount: "",
            counterpartyCheckbox_first: false,
            counterpartyCheckbox_second: false,
            counterpartyCheckbox_third: false,
            tradePassword: "",
            agreeTerms: false,
            adType: "piece",


            isVerified: false,
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

            // 후오비 정책
            officialMinLimit: [
                {currency: 'CNY', minLimit: 100},
                {currency: 'USD', minLimit: 15},
                {currency: 'SGD', minLimit: 20},
                {currency: 'INR', minLimit: 1000},
                {currency: 'VND', minLimit: 350000},
                {currency: 'CAD', minLimit: 20},
                {currency: 'CNY', minLimit: 20},
                {currency: 'KRW', minLimit: 15000},
                {currency: 'CHF', minLimit: 15},
                {currency: 'TWD', minLimit: 500},
                {currency: 'RUB', minLimit: 1000},
                {currency: 'GBP', minLimit: 10},
                {currency: 'HKD', minLimit: 100},
                {currency: 'EUR', minLimit: 10},
                {currency: 'NGN', minLimit: 5000},
                {currency: 'IDR', minLimit: 200000},
                {currency: 'PHP', minLimit: 1000},
                {currency: 'KHR', minLimit: 60000},
            ],

            marketPrice: '',
        }),
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }

            //환율 및 유져 정보 get 필요
            let self = this;
            Common.info.getMarketPrice(function (data) {
                self.marketPrice = data;
            });
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            getCurrency() {
                return MainRepository.SelectBox.controller().getCurrency();
            },
            getMarketPrice() {
                let tmp_currency = MainRepository.SelectBox.controller().getCurrency();
                for (var i = 0; i < Object.keys(this.marketPrice).length; i++) {
                    if (this.marketPrice[i].cryptocurrency === this.cryptocurrency && this.marketPrice[i].currency === tmp_currency) {
                        //console.log(this.marketPrice[i]);
                        let tmp_price = this.marketPrice[i].price;
                        tmp_price = Math.floor(tmp_price * 100) / 100;
                        return abUtils.toMoneyFormat(String(tmp_price));
                        break;
                    }
                }
            },
            getMinLimit() {
                let tmp_currency = MainRepository.SelectBox.controller().getCurrency();
                for (var i = 0; i < Object.keys(this.officialMinLimit).length; i++) {
                    if (this.officialMinLimit[i].currency === tmp_currency) {
                        let tmp_minLimit = this.officialMinLimit[i].minLimit;
                        if (this.message != 'general') {
                            tmp_minLimit = tmp_minLimit * 1000;
                        }
                        return tmp_minLimit;
                        break;
                    }
                }
            },
            toMoneyFormat(type) {
                return abUtils.toMoneyFormat(this.fixedPrice);
            },
            getAlipay() {
                return MainRepository.Common.getPaymentMethod().alipay;
            },
            getWechat() {
                return MainRepository.Common.getPaymentMethod().wechat;
            },
            getBank() {
                return MainRepository.Common.getPaymentMethod().bank;
            },
            getCryptoCurrency() {
                if (this.cryptocurrency === 'bitcoin') {
                    return 'BTC'
                } else if (this.cryptocurrency === 'ethereum') {
                    return 'ETH'
                } else {
                    return 'ALLB'
                }
            },
            getBalance() {
                if(Object.keys(MainRepository.Balance.getBalance()).length > 0){
                    if (this.cryptocurrency === 'ethereum' || this.cryptocurrency === 'bitcoin' ) {
                        this.balance = MainRepository.Balance.getBalance()[this.cryptocurrency].availableAmount;
                        return MainRepository.Balance.getBalance()[this.cryptocurrency].availableAmount;
                    } else {
                        this.balance = 0;
                        return 0;
                    }
                }else {
                    this.balance = 0;
                    return 0;
                }
            }
        },
        methods: {
            onClose() {
                this.showModal = false;
            },
            onNumberCheck(type) {
                if (type === 'price') {
                    this.onCheckFixedPrice();
                    let temp = this.fixedPrice;
                    if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                        return this.fixedPrice = "";
                    }
                    if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                        return this.fixedPrice = abUtils.toDeleteZero(temp);
                    }
                } else if (type === 'volume') {
                    this.onCheckVolume();
                    let temp = this.volume;
                    if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                        return this.volume = "";
                    }
                    if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                        return this.volume = abUtils.toDeleteZero(temp);
                    }
                } else if (type === "minLimit") {
                    this.onCheckMinLimit();
                    let temp = this.minLimit;
                    if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                        return this.minLimit = "";
                    }
                    if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                        return this.minLimit = abUtils.toDeleteZero(temp);
                    }
                } else if (type === "maxLimit") {
                    this.onCheckMaxLimit();
                    let temp = this.maxLimit;
                    if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                        return this.maxLimit = "";
                    }
                    if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                        return this.maxLimit = abUtils.toDeleteZero(temp);
                    }
                } else if (type === "paymentWindow") {
                    this.onCheckPaymentWindow();
                    let temp = this.paymentWindow;
                    if (!abUtils.isInteger(temp) || temp[0] === '-') {
                        return this.paymentWindow = "";
                    }
                    return this.paymentWindow = abUtils.toDeleteZero(temp);
                } else if (type === "counterParty") {
                    this.onCheckCounterparty();
                    let temp = this.counterpartyFilterTradeCount;
                    if (!abUtils.isInteger(temp) || temp[0] === '-') {
                        return this.counterpartyFilterTradeCount = "";
                    }
                    return this.counterpartyFilterTradeCount = abUtils.toDeleteZero(temp);
                }
            },
            onCheck: function () {
                if (this.onCheckPaymentWindow() && this.onCheckMaxLimit() && this.onCheckMinLimit() && this.onCheckVolume() && this.onCheckFixedPrice() && this.onCheckCounterparty()) {
                    this.onModal();
                }
            },
            onModal: function () {
                this.showModal = true;
            },
            onDetermine: function () {
                this.showModal = false;
                this.onPost();
            },
            onPost: function () {
                let self = this;
                //결제수단 토글 object 화
                let alipayToggle = this.alipay_toggle_use ? 'alipay' : '';
                let wechatToggle = this.wechat_toggle_use ? 'wechat' : '';
                let bankToggle = this.bank_toggle_use ? 'bank' : '';


                var paymentMethodsArr = {
                    'alipay': alipayToggle,
                    'wechat': wechatToggle,
                    'bank': bankToggle,
                };

                var paymentMethods = JSON.stringify(paymentMethodsArr);

                MainRepository.AD.postAD({
                    autoReplay: self.autoReplay,
                    counterpartyFilterTradeCount: self.counterpartyFilterTradeCount,
                    counterpartyFilterAdvancedVerificationYn: self.counterpartyCheckbox_first,
                    counterpartyFilterDoNotOtherMerchantsYn: self.counterpartyCheckbox_second,
                    counterpartyFilterMobileVerificationYn: self.counterpartyCheckbox_third,
                    cryptocurrency: self.cryptocurrency,
                    currency: MainRepository.SelectBox.controller().getCurrency(),
                    fixedPrice: Number(self.fixedPrice),
                    maxLimit: Number(self.maxLimit),
                    minLimit: Number(self.minLimit),
                    memberNo: MainRepository.MyInfo.getUserInfo().memberNo,
                    nationality: MainRepository.SelectBox.controller().getCountry(),
                    paymentWindow: Number(self.paymentWindow),
                    paymentMethods: paymentMethods,
                    priceType: self.priceType,
                    termsAgreeYn: self.agreeTerms,
                    termsOfTransaction: self.termsOfTransaction,
                    tradePassword: self.tradePassword,
                    tradeType: self.tradeType,
                    type: self.adType,
                    volume: Number(self.volume),
                    status: 'enable',
                    volumeAvailable: Number(self.volume),
                }, function (result) {
                    MainRepository.Balance.setBalances(function (result) {
                        self.$router.push("tradeCenter");
                    });
                })
            },
            putVerified: function () {
                //슬라이드 바 return function
                this.isVerified = true;
            },
            onRefresh: function () {
                //결제수단 새로고침 function
                MainRepository.Common.setPaymentMethod({
                    email : MainRepository.MyInfo.getUserInfo().email
                },function (result) {
                })
            },
            onToggle: function (type) {
                // 결제수단 별 토글버튼 on/off 로직
                if (type === 'alipay') {
                    if (this.alipay_toggle_use === false) {
                        this.alipay_toggle_use = true;
                    } else {
                        this.alipay_toggle_use = false;
                    }
                } else if (type === 'wechatPay') {
                    if (this.wechat_toggle_use === false) {
                        this.wechat_toggle_use = true;
                    } else {
                        this.wechat_toggle_use = false;
                    }
                } else {
                    if (this.bank_toggle_use === false) {
                        this.bank_toggle_use = true;
                    } else {
                        this.bank_toggle_use = false;
                    }
                }
            },
            exchangeRateCalc() {
                //금액 , 추가
                return abUtils.toMoneyFormat(String(this.exchangeRate));
            },
            onCheckFixedPrice() {
                // 고정가격 체크
                let fixedPrice = Number(this.fixedPrice);
                if (fixedPrice === 0 || fixedPrice === undefined) {
                    this.warning_fixed_price = true;
                    this.verify_warning_fixed_price = Vue.prototype.$str("warningFixedPricePlaceholder");
                    return false;
                }
                this.warning_fixed_price = false;
                return true;
            },
            onCheckVolume() {
                //거래수량 체크
                let volume = Number(this.volume);
                if (volume === 0 || volume === undefined) {
                    this.warning_volume = true;
                    this.verify_warning_volume = Vue.prototype.$str("warningVolume");
                    return false;
                }
                if (volume > this.balance) {
                    this.warning_volume = true;
                    this.verify_warning_volume = Vue.prototype.$str("lowBalance");
                    return false;
                }

                this.warning_volume = false;
                return true;
            },
            onCheckMinLimit() {
                //최소금액 체크
                let minLimit = Number(this.minLimit);
                if (minLimit === 0 || minLimit === undefined) {
                    this.verify_warning_min_limit = Vue.prototype.$str("warningMinLimit");
                    this.warning_min_limit = true;
                    return false;
                }
                if (minLimit < this.getMinLimit) {
                    this.warning_min_limit = true;
                    this.verify_warning_min_limit = Vue.prototype.$str("atLeast");
                    return false;
                }
                this.warning_min_limit = false;
                return true;
            },
            onCheckMaxLimit() {
                //최대금액 체크
                let minLimit = Number(this.minLimit);
                let maxLimit = Number(this.maxLimit);
                if (maxLimit === undefined) {
                    this.warning_max_limit = true;
                    this.verify_warning_max_limit = Vue.prototype.$str("warningMaxLimit");
                    return false;
                }
                if (maxLimit <= minLimit) {
                    this.warning_max_limit = true;
                    this.verify_warning_max_limit = Vue.prototype.$str("atMost");
                    return false;
                }
                this.warning_max_limit = false;
                return true;
            },
            onCheckPaymentWindow() {
                //지불기간 체크
                let paymentWindow = Number(this.paymentWindow);
                if (paymentWindow === 0 || paymentWindow === undefined) {
                    this.warning_payment_window = true;
                    this.verify_warning_payment_window = Vue.prototype.$str("warningPaymentWindow");
                    return false;
                }
                if (paymentWindow < 10 || paymentWindow > 20) {
                    this.warning_payment_window = true;
                    this.verify_warning_payment_window = Vue.prototype.$str("timeRange");
                    return false;
                }
                this.warning_payment_window = false;
                return true;
            },
            onCheckCounterparty() {
                //거래상대 조건 체크
                let counterpartyFilterTradeCount = Number(this.counterpartyFilterTradeCount);
                if (counterpartyFilterTradeCount > 99) {
                    this.warning_counterparty = true;
                    this.verify_warning_counterparty = Vue.prototype.$str("counterpartyWarning");
                    return false;
                }
                this.warning_counterparty = false;
                return true;
            },
            onCheckTradePassword() {
                //거래 비밀번호 체크
                let tradePassword = Number(this.tradePassword);
                if (tradePassword === 0 || tradePassword === undefined) {
                    this.warning_trade_password = true;
                    this.verify_warning_trade_password = Vue.prototype.$str("warning_trade_password");
                    return false;
                }
                this.warning_trade_password = false;
                return true;
            },
            goMyPage() {
                this.$router.push("/myPage");
            },

        }
    });
</script>
<style scoped>
    .selectbox-width {
        width: 100% !important;
    }

    .warning-text {
        text-align: right;
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
        position: relative;
    }

    .price-input {
        height: 40px;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 12px;
        font-weight: 500;
        width: 100%;
        color: #353535;
        outline: none;
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

    .border-indicator {
        font-weight: 500;
        color: #353535;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .refresh-btn {
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .refresh-icon {
        top: 5px;
        position: absolute;
        left: 10px;
    }

    .refresh-btn-span {
        margin-top: 1px;
        margin-left: 22px;
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

