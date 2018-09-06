<template>
    <div class=" mt-5" v-if="initCompleted">
        <v-flex xs12 class="text-xs-left h2 mb-4  bold">
            {{ message === 'general' ? $str("generalAdSubject") : $str("blockAdSubject") }}
            <v-divider class="mt-4"></v-divider>
        </v-flex>

        <!--***************      첫번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4>
                {{ $str('postAdIn') }}
            </v-flex>

            <!--국가 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{ $str("country") }}</div>
                    <div class="p-relative mb-0" :class="{'mb-3' : isMobile}">
                        <select-box :selectBoxType="'signupCountry'" :country="myAdList.nationality"
                                    :class="{'input-disabled2' : edit}"></select-box>
                    </div>
                </div>
            </v-flex>

            <!--화폐 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{ $str("currency") }}</div>
                    <div class="p-relative mb-0" :class="{'mb-3' : isMobile}">
                        <select-box :selectBoxType="'currency'" :currency="myAdList.currency"
                                    :class="{'input-disabled2' : edit}"></select-box>
                    </div>
                </div>
            </v-flex>

            <!--buy/sell select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{ $str("tradeType") }}</div>
                    <div class="p-relative mb-0" :class="{'mb-3' : isMobile}">
                        <select class="comp-selectbox h6" v-model="tradeType" :class="{'input-disabled2' : edit}">
                            <option value="buy">{{ $str("buyText") }}</option>
                            <option value="sell">{{ $str("sellText") }}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>
                </div>
            </v-flex>

            <!--코인 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5  color-black">{{ $str("cryptoCurrency") }}</div>
                    <div class="p-relative">
                        <select class="comp-selectbox h6" id="cryptocurrency" v-model="cryptocurrency"
                                :class="{'input-disabled2' : edit}">
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
                {{ $str('price') }}
            </v-flex>
            <!--가격 유형 select box-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">{{ $str("priceType") }}</div>
                    <div class="p-relative mb-3">
                        <select class="comp-selectbox h6" v-model="priceType" @change="onClear">
                            <option value="fixedprice">{{ $str("fixedPrice") }}</option>
                            <option value="floatprice">{{ $str("floatPrice") }}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                    </div>
                </div>
            </v-flex>

            <!--거래가격-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2  color-black display-flex ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{ priceType === 'fixedprice' ? $str("fixedPrice") : $str("margin") }}
                        <div v-if="priceType === 'floatprice'"
                             class="sprite-img2 ic_postad_help ml-2 c-pointer tooltip">
                            <div class="tooltip">
                                <span class="tooltip-content">{{ $str("explainMargin") }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="price-input-wrapper mb-4 p-relative"
                         v-bind:class="{'warning-border' : warning_fixed_price, 'warning-border' : warning_float_price}">
                        <input type="text" class="price-input" placeholder="0" v-model="fixedPrice"
                               @keyup="onNumberCheck('fixedPrice')" v-if="priceType === 'fixedprice'"
                        >
                        <input type="text" class="price-input" placeholder="0" v-model="margin"
                               @keyup="onNumberCheck('floatPrice')" v-else maxlength="4"
                        >
                        <div class="border-indicator h6">
                            {{ priceType === 'fixedprice' ? getCurrency : '%' }}
                        </div>
                        <div class="warning-text-wrapper">
                            <span v-if="priceType === 'fixedprice'" class="d-none"
                                  v-bind:class="{'warning-text' : warning_fixed_price}">{{ verify_warning_fixed_price }}</span>
                            <span v-else class="d-none" v-bind:class="{'warning-text' : warning_float_price}">{{ verify_warning_float_price }}</span>
                        </div>
                    </div>
                </div>
            </v-flex>

            <!--환율 계산 표시-->
            <v-flex xs12 md4>
                <div>
                    <div class="text-xs-left h5 color-darkgray ">{{ $str("priceText") }}</div>
                    <div class="price-clac-wrapper text-xs-left">
                        <div class="h1 bold mb-3" :class="{'pt-3':!isMobile}">{{ priceType === 'fixedprice' ?
                            toMoneyFormat || 0 : (tradeType === 'sell' ? getFloatPriceSell : getFloatPriceBuy) || 0 }}
                            {{ getCurrency }}/{{ getCryptoCurrency }}
                        </div>
                    </div>
                </div>
            </v-flex>
            <v-spacer></v-spacer>

            <!--환율 설명-->
            <v-flex xs12 md8 offset-md4>
                <div class="price-clac-wrapper text-xs-left">
                    <div class="price-calculate color-darkgray">{{ $str("marektPrice") }} :
                        {{ getMarketPrice || 0 }} {{ getCurrency }}/{{ getCryptoCurrency }}
                    </div>
                    <div class="price-explain color-darkgray">{{ priceType === 'fixedprice' ? $str("fixedPriceExplain")
                        : $str("floatPriceExplain") }}
                    </div>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      세번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('limits') }}
            </v-flex>

            <!--거래가 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{ $str("volumeText") }}
                    </div>
                    <div class="price-input-wrapper mb-3 p-relative" v-bind:class="{'warning-border' : warning_volume}">
                        <input type="text" class="price-input" v-model="volume"
                               @keyup="onNumberCheck('volume')" ref="volume"
                               :placeholder="$str('volumePlaceholderMobile') + getBalance">
                        <div class="border-indicator h6">
                            {{ getCryptoCurrency }}
                        </div>
                        <div class="warning-text-wrapper">
                    <span class="d-none"
                          v-bind:class="{'warning-text' : warning_volume}">{{ verify_warning_volume }}</span>
                        </div>
                    </div>
                </div>
            </v-flex>

            <!--최소 한도 금액 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{ $str("minLimit") }}
                    </div>
                    <div class="price-input-wrapper mb-3 p-relative"
                         v-bind:class="{'warning-border' : warning_min_limit}">
                        <input type="text" class="price-input" :placeholder="$str('minLimitPlaceholder') + getMinLimit"
                               @keyup="onNumberCheck('minLimit')"
                               v-model="minLimit">
                        <div class="border-indicator h6">
                            {{ getCurrency }}
                        </div>
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_min_limit}">{{ verify_warning_min_limit }}</span>
                        </div>
                    </div>
                </div>
            </v-flex>


            <!--최대 한도 금액 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{ $str("maxLimit") }}
                    </div>
                    <div class="price-input-wrapper mb-3 p-relative"
                         v-bind:class="{'warning-border' : warning_max_limit}">
                        <input type="text" class="price-input" :placeholder="$str('maxLimitPlaceholder')"
                               @keyup="onNumberCheck('maxLimit')"
                               v-model="maxLimit">
                        <div class="border-indicator h6">
                            {{ getCurrency }}
                        </div>
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_max_limit}">{{ verify_warning_max_limit }}</span>
                        </div>
                    </div>
                </div>
            </v-flex>

            <!--지불기간 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black ">
                        <div class="cs-red-asterisk" v-if="!isMobile">*</div>
                        {{ $str("paymentWindow") }}
                    </div>
                    <div class="price-input-wrapper mb-4 p-relative"
                         v-bind:class="{'warning-border' : warning_payment_window}">
                        <input type="text" maxlength="2" class="price-input"
                               :placeholder="$str('paymentWindowPlaceholder')"
                               @keyup="onNumberCheck('paymentWindow')"
                               v-model="paymentWindow">
                        <div class="border-indicator h6">
                            {{ $str("minuteText") }}
                        </div>
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_payment_window}">{{ verify_warning_payment_window }}</span>
                        </div>
                    </div>
                </div>
            </v-flex>
            <v-flex xs12 md8 offset-md4>
                <div class="text-xs-left color-darkgray line-height-1a">{{ $str("paymentWindowExplain") }}</div>
            </v-flex>
            <v-flex xs12>
                <v-divider class="mt-4"></v-divider>
            </v-flex>
        </v-layout>

        <!--***************      네번째       *********-->
        <!--***************       섹션        *********-->

        <v-layout wrap row mb-4>
            <v-flex xs12 md4 h3 bold color-black text-xs-left mb-4 v-if="!isMobile">
                {{ $str('paymentMethod') }}
            </v-flex>
            <v-flex xs12 md8 pl-0 pr-0>
                <div>
                    <!--유져 data, DB SELECT 하여 결제수단 data get한 후 v-if문 분기 처리-->
                    <!--알리페이 결제-->
                    <v-flex xs12 text-xs-left mb-4 display-flex v-if="getAlipay.activeYn === 'y' ">
                        <toggle :toggle="alipay_toggle_use" class="c-pointer mr-4" @click="onToggle('alipay')"></toggle>
                        <v-layout wrap row>
                            <v-flex xs12 md4 pl-0 pr-0 class="vertical-center ">

                                <div class="sprite-img ic-alipay d-inline-block"></div>
                                <span class="ml-2 mr-1 color-darkgray absolute">{{ $str("alipayText") }} : </span>
                            </v-flex>
                            <v-flex xs12 md8 pa-0>
                                <div class="d-inline-block">{{ getAlipay.alipayId }}</div>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <!--위챗페이 결제-->
                    <v-flex xs12 text-xs-left mb-4 display-flex v-if="getWechat.activeYn === 'y' ">
                        <toggle :toggle="wechat_toggle_use" class="c-pointer mr-4" @click="onToggle('wechat')"></toggle>
                        <v-layout wrap row>
                            <v-flex xs12 md4 pl-0 pr-0 class="vertical-center ">

                                <div class="sprite-img ic-wechatpay d-inline-block"></div>
                                <span class="ml-2 mr-1 color-darkgray absolute">{{ $str("wechatPayText") }} : </span>
                            </v-flex>
                            <v-flex xs12 md8 pa-0>
                                <div class="d-inline-block">{{ getWechat.wechatId }}</div>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <!--은행 계좌 결제-->
                    <v-flex xs12 text-xs-left mb-4 display-flex v-if="getBank.activeYn === 'y' ">
                        <toggle :toggle="bank_toggle_use" class="c-pointer mr-4"
                                @click="onToggle('bankAccount')"></toggle>
                        <v-layout wrap row>
                            <v-flex xs12 md4 pl-0 pr-0 class="vertical-center ">

                                <div class="sprite-img ic-bank d-inline-block"></div>
                                <span class="ml-2 mr-1 color-darkgray absolute">{{ $str("bankAccountText") }} : </span>
                            </v-flex>
                            <v-flex xs12 md8 pa-0>
                                <div class="d-inline-block">{{ getBank.bankName }}, {{ getBank.bankBranchInfo }}
                                    {{ getBank.bankAccount }}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <!--결제수단 새로고침-->
                    <v-flex xs12 text-xs-left mb-4>
                <span @click="onRefresh" class="p-relative refresh-btn btn-blue-hover h5 btn-rounded-blue c-pointer">
                    <i class="material-icons refresh-icon">sync</i>
                    <span class="refresh-btn-span">{{ $str('refreshBtnText') }}</span>
                </span>
                    </v-flex>

                    <!--결제수단 설명-->
                    <v-flex xs12>
                        <div class="payment-explain text-xs-left line-height-1a">
                            <span class="color-darkgray ">{{ $str("paymentExplain") }}</span>
                            <a class="text-white-hover color-blue" @click="goMyPage()">{{ $str("clickHereText") }}</a>
                        </div>
                    </v-flex>
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
                {{ $str('autoReplyText') }}
            </v-flex>
            <!--자동 답글 입력-->
            <v-flex xs12 md8>
                <div>
                    <div class="text-xs-left mb-2  h5 color-black" v-if="isMobile">{{ $str("autoReplyText") }}</div>
                    <div class="price-input-wrapper">
                <textarea class="common-textarea" :placeholder="$str('autoReplyPlaceholder')"
                          v-model="autoReply"></textarea>
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
                {{ $str('termsTransactionText') }}
            </v-flex>
            <v-flex xs12 md8>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black " v-if="isMobile">{{ $str("termsTransactionText") }}
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
                {{ $str('counterpartyFilterText') }}
            </v-flex>
            <!--상대방 제한사항 입력-->
            <v-flex xs12 md4>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black " v-if="isMobile">{{ $str("counterpartyFilterText") }}
                    </div>
                    <div class="text-xs-left mb-2 h6 color-darkgray ">{{ $str("counterpartyFilterPlaceholder") }}
                    </div>
                    <div class="mb-4 p-relative">
                        <input class="input" type="text" v-bind:class="{'warning-border' : warning_counterparty}"
                               @keyup="onNumberCheck('counterParty')"
                               placeholder="0" v-model="counterpartyFilterTradeCount "
                               maxlength="2">
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_counterparty}">{{ verify_warning_counterparty }}</span>
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
                            <h5 class="d-inline-block">{{ $str("counterpartyCheckbox1") }}</h5>
                        </label>
                    </div>
                    <div class="text-xs-left mb-4 ">
                        <input type="checkbox" id="second_condition_chkbox" v-model="counterpartyCheckbox_second"/>
                        <label for="second_condition_chkbox">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                            <h5 class="d-inline-block">{{ $str("counterpartyCheckbox2") }}</h5>
                        </label>
                    </div>
                    <div class="text-xs-left mb-4">
                        <input type="checkbox" v-model="counterpartyCheckbox_third" id="third_condition_chkbox"/>
                        <label for="third_condition_chkbox">
                            <span>
                                <i class="material-icons">done</i>
                            </span>
                            <h5 class="d-inline-block">{{ $str("counterpartyCheckbox3") }}</h5>
                        </label>
                    </div>
                    <div class="text-xs-left h6 color-darkgray">{{ $str("counterpartyExplain") }}</div>
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
                {{ $str('tradePwText') }}
            </v-flex>
            <!--거래 비밀번호 비교 입력-->
            <v-flex xs12 md2>
                <div>
                    <div class="text-xs-left mb-2 h5 color-black " v-if="isMobile">{{ $str("tradePwText") }}</div>
                    <div class="p-relative">
                        <input type="password" v-bind:class="{'warning-border' : warning_trade_password}" class="input"
                               :placeholder="$str('tradePwText')" v-model="tradePassword" @blur="onCheckTradePassword"/>
                        <div class="warning-text-wrapper">
                            <span class="d-none" v-bind:class="{'warning-text' : warning_trade_password}">{{ verify_warning_trade_password }}</span>
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
                    <h5 class="d-inline-block">{{ $str("agreeTermsExplain") }}</h5>
                </label>
                <a class=" color-blue text-white-hover" v-if="!isMobile">《{{ $str("termsTrading") }}》</a>
            </v-flex>
            <a class=" color-blue text-white-hover ml-4 mt-1" v-if="isMobile">《{{ $str("termsTrading") }}》</a>
            <v-flex xs12 md3 offset-md4 mt-4>
                <!--슬라이드 바 인증-->
                <div class="verify-slider-wrapper mb-4">
                    <div>
                        <verify-slider v-on:passcallback="putVerified"></verify-slider>
                    </div>
                </div>
                <div>
                    <button @click='onCheck' class="color-blue btn-blue btn-blue-hover">
                        {{ edit === true ? $str("modify") : $str("postAdBtn") }}
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
            adNo: 0,
            balace: '',
            showModal: false,
            tradeType: "buy",
            cryptocurrency: "bitcoin",
            priceType: "fixedprice",
            fixedPrice: "",
            margin: "",
            volume: "",
            minLimit: "",
            maxLimit: "",
            paymentWindow: "",
            alipay_toggle_use: false,
            wechat_toggle_use: false,
            bank_toggle_use: false,
            autoReply: "",
            termsOfTransaction: "",
            counterpartyFilterTradeCount: "",
            counterpartyCheckbox_first: false,
            counterpartyCheckbox_second: false,
            counterpartyCheckbox_third: false,
            tradePassword: "",
            agreeTerms: false,
            tmpMarketPrice: "",


            isVerified: false,
            warning_fixed_price: false,
            warning_float_price: false,
            warning_volume: false,
            warning_min_limit: false,
            warning_max_limit: false,
            warning_payment_window: false,
            warning_counterparty: false,
            warning_trade_password: false,
            verify_warning_fixed_price: "",
            verify_warning_float_price: "",
            verify_warning_volume: "",
            verify_warning_min_limit: "",
            verify_warning_max_limit: "",
            verify_warning_counterparty: "",
            verify_warning_payment_window: "",
            verify_warning_trade_password: "",

            //코인별 시세
            marketPrice: '',

            //edit 시, 광고 정보
            myAdList: '',

            //edit 상태값
            edit: false,

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

        }),
        beforeCreate() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.MyInfo.isLogin()) {
                MainRepository.router().goLogin();
                return false;
            }


            //my ads (edit) 접근 체크
            let currentURL = window.location.href;
            let params = currentURL.split('?');

            if (params[1]) {
                let no = params[1].split('=')[1];
                MainRepository.AD.checkMine(no, (result) => {
                    let memberNo = MainRepository.MyInfo.getUserInfo().memberNo;
                    if (result.registerMemberNo !== memberNo) {
                        Vue.prototype.$eventBus.$emit('showAlert', 4005);
                        MainRepository.router().goTradeCenter();
                    }
                    this.myAdList = result;
                    this.edit = true;

                    this.adNo = result.adNo;
                    this.tradeType = result.tradeType;
                    this.cryptocurrency = result.cryptocurrency;
                    this.priceType = result.priceType;
                    this.fixedPrice = String(result.fixedPrice);
                    this.margin = result.margin;
                    this.volume = result.volume;
                    this.maxLimit = result.maxLimit;
                    this.minLimit = result.minLimit;
                    this.paymentWindow = result.paymentWindow;
                    this.autoReply = result.autoReply;
                    this.termsOfTransaction = result.termsOfTransaction;
                    this.counterpartyFilterTradeCount = result.counterpartyFilterTradeCount;
                    this.counterpartyCheckbox_first = result.counterpartyFilterAdvancedVerificationYn;
                    this.counterpartyCheckbox_second = result.counterpartyFilterDoNotOtherMerchantsYn;
                    this.counterpartyCheckbox_third = result.counterpartyFilterMobileVerificationYn;

                    //결제수단 토글버튼
                    let paymentMethods = result.paymentMethods.split(',');
                    for (let key in paymentMethods) {
                        if (paymentMethods[key] === 'alipay') {
                            this.alipay_toggle_use = true;
                        } else if (paymentMethods[key] === 'wechat') {
                            this.wechat_toggle_use = true;
                        } else {
                            this.bank_toggle_use = true;
                        }
                    }
                })
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
            initCompleted() {
                if (MainRepository.State.isInitCompleted()) {
                    if (this.getAlipay.activeYn === 'n' && this.getWechat.activeYn === 'n' && this.getBank.activeYn === 'n' && MainRepository.MyInfo.isLogin()) {
                        Vue.prototype.$eventBus.$emit('showAlert', 4004);
                        MainRepository.router().goMyPage();
                    }
                }
                return MainRepository.State.isInitCompleted();
            },
            getCurrency() {
                return MainRepository.SelectBox.controller().getCurrency();
            },
            getMarketPrice() {
                let tmp_currency = MainRepository.SelectBox.controller().getCurrency();
                for (let i = 0; i < Object.keys(this.marketPrice).length; i++) {
                    if (this.marketPrice[i].cryptocurrency === this.cryptocurrency && this.marketPrice[i].currency === tmp_currency) {
                        //console.log(this.marketPrice[i]);
                        let tmp_price = this.marketPrice[i].price;
                        tmp_price = Math.floor(tmp_price * 100) / 100;
                        this.tmpMarketPrice = tmp_price;
                        return abUtils.toMoneyFormat(String(tmp_price));
                        break;
                    }
                }
            },
            getMinLimit() {
                let tmp_currency = MainRepository.SelectBox.controller().getCurrency();
                for (let i = 0; i < Object.keys(this.officialMinLimit).length; i++) {
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
                return MainRepository.MyInfo.controller().findPaymentMethods('alipay');
            },
            getWechat() {
                return MainRepository.MyInfo.controller().findPaymentMethods('wechat');
            },
            getBank() {
                return MainRepository.MyInfo.controller().findPaymentMethods('bankaccount');
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
                if (Object.keys(MainRepository.Balance.getBalances()).length > 0) {
                    if (this.cryptocurrency === 'ethereum' || this.cryptocurrency === 'bitcoin') {
                        this.balance = MainRepository.Balance.controller().findByCrptoCurrency(this.cryptocurrency).availableAmount;
                        return this.balance
                    } else {
                        this.balance = 0;
                        return 0;
                    }
                } else {
                    this.balance = 0;
                    return 0;
                }
            },
            getFloatPriceSell() {
                let currency = MainRepository.SelectBox.controller().getCurrency();
                let floatPrice = this.tmpMarketPrice + (this.tmpMarketPrice * this.margin / 100);
                return abUtils.toMoneyFormat(Vue.prototype.$fixed(floatPrice, currency));
            },
            getFloatPriceBuy() {
                let currency = MainRepository.SelectBox.controller().getCurrency();
                let floatPrice = (this.tmpMarketPrice * this.margin / 100);
                floatPrice = this.tmpMarketPrice - floatPrice;
                if (floatPrice < 0) {
                    floatPrice = 0;
                }

                return abUtils.toMoneyFormat(Vue.prototype.$fixed(floatPrice, currency));
            }
        },
        methods: {
            onClose() {
                this.showModal = false;
            },
            onNumberCheck(type) {
                //값 숫자 형식 체크
                let temp;
                switch (type) {
                    // 고정가격
                    case 'fixedPrice' :
                        temp = this.fixedPrice;
                        this.onCheckFixedPrice();
                        if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                            return this.fixedPrice = "";
                        }
                        if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                            return this.fixedPrice = abUtils.toDeleteZero(temp);
                        }
                        break;

                    // 유동가격
                    case 'floatPrice' :
                        temp = this.margin;
                        this.onCheckMargin();
                        if (!abUtils.isDouble(temp) || temp[0] === '.') {
                            return this.margin = "";
                        }
                        if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                            return this.margin = abUtils.toDeleteZero(temp);
                        }
                        break;

                    // 총 코인 수량
                    case 'volume' :
                        temp = this.volume;
                        this.onCheckVolume();
                        if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                            return this.volume = "";
                        }
                        if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                            return this.volume = abUtils.toDeleteZero(temp);
                        }
                        break;

                    // 최소가격
                    case 'minLimit' :
                        temp = this.minLimit;
                        this.onCheckMinLimit();
                        if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                            return this.minLimit = "";
                        }
                        if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                            return this.minLimit = abUtils.toDeleteZero(temp);
                        }
                        break;

                    // 최대갸격
                    case 'maxLimit' :
                        temp = this.maxLimit;
                        this.onCheckMaxLimit();
                        if (!abUtils.isDouble(temp) || temp[0] === '.' || temp[0] === '-') {
                            return this.maxLimit = "";
                        }
                        if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                            return this.maxLimit = abUtils.toDeleteZero(temp);
                        }
                        break;

                    // 지불시간
                    case 'paymentWindow' :
                        temp = this.paymentWindow;
                        this.onCheckPaymentWindow();
                        if (!abUtils.isInteger(temp) || temp[0] === '-') {
                            return this.paymentWindow = "";
                        }
                        return this.paymentWindow = abUtils.toDeleteZero(temp);
                        break;

                    // 거래상대 조건
                    case 'counterParty' :
                        temp = this.counterpartyFilterTradeCount;
                        this.onCheckCounterparty();
                        if (!abUtils.isInteger(temp) || temp[0] === '-') {
                            return this.counterpartyFilterTradeCount = "";
                        }
                        return this.counterpartyFilterTradeCount = abUtils.toDeleteZero(temp);
                        break;
                }
            },
            //최종 값 체크
            onCheck: function () {
                if (this.onCheckPaymentWindow() && this.onCheckMaxLimit() && this.onCheckMinLimit() && this.onCheckVolume() &&
                    this.onCheckFixedPrice() && this.onCheckMargin() && this.onCheckCounterparty() && this.onCheckToggle() && this.onCheckSlideBar &&
                    this.onCheckTradePassword() && this.onCheckAgreeTerm()) {

                    this.onModal();
                }
            },
            onModal: function () {
                this.showModal = true;

            },
            //가격타입 변경 시, 값 초기화
            onClear: function () {
                this.fixedPrice = '';
                this.margin = '';
                this.warning_fixed_price = false;
                this.warning_float_price = false;
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
                let bankToggle = this.bank_toggle_use ? 'bankaccount' : '';
                let _adType = this.message === 'general' ? 'piece' : 'block';

                let paymentMethodsArr = [
                    alipayToggle,
                    wechatToggle,
                    bankToggle
                ];

                let nationality = MainRepository.SelectBox.controller().getCountry()
                nationality = nationality === 'ALL' ? 'CN' : nationality;

                let data = {
                    adNo: self.adNo,
                    autoReply: self.autoReply,
                    counterpartyFilterTradeCount: self.counterpartyFilterTradeCount,
                    counterpartyFilterAdvancedVerificationYn: self.counterpartyCheckbox_first,
                    counterpartyFilterMobileVerificationYn: self.counterpartyCheckbox_second,
                    counterpartyFilterDoNotOtherMerchantsYn: self.counterpartyCheckbox_third,
                    cryptocurrency: self.cryptocurrency,
                    currency: MainRepository.SelectBox.controller().getCurrency(),
                    fixedPrice: Number(self.fixedPrice),
                    margin: self.margin,
                    maxLimit: Number(self.maxLimit),
                    minLimit: Number(self.minLimit),
                    memberNo: MainRepository.MyInfo.getUserInfo().memberNo,
                    nationality: nationality,
                    paymentWindow: Number(self.paymentWindow),
                    paymentMethods: String(paymentMethodsArr),
                    priceType: self.priceType,
                    termsAgreeYn: self.agreeTerms,
                    termsOfTransaction: self.termsOfTransaction,
                    tradePassword: self.tradePassword,
                    tradeType: self.tradeType,
                    type: _adType,
                    volume: Number(self.volume),
                    status: 'enable',
                    volumeAvailable: Number(self.volume),
                };

                if (this.edit) {
                    MainRepository.AD.editAD(data, (result) => {
                        MainRepository.Balance.loadBalances(function () {
                                Vue.prototype.$eventBus.$emit('showAlert', 2103);
                                MainRepository.router().goMyAd();
                            },
                        );
                    }, (code) => {

                    })
                } else {
                    MainRepository.AD.postAD(data, function (result) {
                        MainRepository.Balance.loadBalances(function () {
                            Vue.prototype.$eventBus.$emit('showAlert', 2101);
                            MainRepository.router().goTradeCenter();
                        });
                    }, (code) => {
                        MainRepository.router().goMyAd();
                    })
                }
            },
            putVerified: function () {
                //슬라이드 바 return function
                this.isVerified = true;
            },
            onRefresh: function () {
                //결제수단 새로고침 function
                MainRepository.MyInfo.loadMyPaymentMethods((result) => {
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
                } else if (type === 'wechat') {
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
                if (this.priceType === 'floatprice') {
                    return true
                }
                let fixedPrice = Number(this.fixedPrice);
                if (fixedPrice === 0 || fixedPrice === undefined) {
                    this.warning_fixed_price = true;
                    this.verify_warning_fixed_price = Vue.prototype.$str("warningFixedPricePlaceholder");
                    return false;
                }
                this.warning_fixed_price = false;
                return true;
            },
            onCheckMargin() {
                // 유동가격 체크
                if (this.priceType === 'fixedprice') {
                    return true
                }
                let margin = Number(this.margin);
                if (!margin) {
                    this.warning_float_price = true;
                    this.verify_warning_float_price = Vue.prototype.$str("warningFloatPricePlaceholder");
                    return false;
                }
                if (margin > 100 || margin < -100) {
                    this.warning_float_price = true;
                    this.verify_warning_float_price = Vue.prototype.$str("warningFloatPriceLimit");
                    return false;
                }
                this.warning_float_price = false;
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
                if (volume > this.balance && this.tradeType === 'sell') {
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
            onCheckAgreeTerm: function () {
                //이용약관 체크
                if (!this.agreeTerms) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4002);
                    return false;
                }
                return true;

            },
            onCheckSlideBar: function () {
                //인증바 체크
                if (!this.isVerified) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4003);
                    return false;
                }
                return true;

            },
            onCheckToggle: function () {
                if (!this.alipay_toggle_use && !this.wechat_toggle_use && !this.bank_toggle_use) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4004);
                    return false;
                } else {
                    return true
                }
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



    .price-input-wrapper {
        border: solid 1px #8d8d8d;
        border-radius: 2px;
        display: flex;
        position: relative;
    }

    .price-input-wrapper:hover, .price-input-wrapper:focus {
        border: solid 1px #316ee4;
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

    /*tooltip 수정*/
    :hover.tooltip .tooltip-content {
        width: 200px !important;
        top: 25px;
        height: fit-content;
        text-align: left;
        line-height: 1.4;
        left: 77px;
    }

    .tooltip .tooltip-content:after {
        left: 16% !important;
        bottom: 100% !important;
        top: -9% !important;
        border-top: 0px !important;
        border-bottom: 10px solid #545c6a !important;
    }
</style>

