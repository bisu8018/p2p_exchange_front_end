<template>
    <!--head 쿠키단에서 1차 검증, v-if문 2차 검증, post 시 체크 3차 검증-->
    <!--최초 페이지 진입 시, v-if 문 사용 하여 경고창 밑 로그인/KYC 페이지 진입-->
    <v-layout mt-5 mb-5 column>
        <!--***************      첫번째       *********-->
        <!--***************       섹션        *********-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="mb-4a signup-flex">
                <div class="title-2">{{message === 'general' ? $str("generalAdSubject") : $str("blockAdSubject")}}</div>
            </div>
            <div>
                <!--국가 select box-->
                <select-box select-box-type="country"></select-box>

                <!--화폐 select box-->
                <select-box select-box-type="currency"></select-box>

                <!--buy/sell select box-->
                <div class="select-box-wrapper">
                    <select class="abSelectBox caption" v-model="tradeType">
                        <option value="buy">{{$str("buyText")}}</option>
                        <option value="sell">{{$str("sellText")}}</option>
                    </select>
                    <v-icon class="icon-style">keyboard_arrow_down</v-icon>
                </div>

                <!--코인 select box-->
                <div class="select-box-wrapper">
                    <select class="abSelectBox caption" id="coinType" v-model="coinType">
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                        <option value="usdt">USDT</option>
                    </select>
                    <v-icon class="icon-style">keyboard_arrow_down</v-icon>
                </div>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("priceType")}}</div>

            <!--가격 유형 select box-->
            <div class="select-box-wrapper">
                <select class="abSelectBox caption" v-model="priceType">
                    <option value="fixed">{{$str("fixedPrice")}}</option>
                    <option value="float">{{$str("floatPrice")}}</option>
                </select>
                <v-icon class="icon-style">keyboard_arrow_down</v-icon>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("fixedPrice")}}</div>

            <!--거래가격-->
            <div class="price-input-wrapper">
                <input type="text" class="price-input" v-model="priceValue">
                <div class="currency-indicator caption">CNY</div>
            </div>

            <!--환율 계산 표시-->
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("priceText")}}</div>
            <div class="price-clac-wrapper">
                <div class="price-calculate">{{$str("marektPrice")}}</div>
                <div class="price-coin"></div>
                <div class="price-explain">{{$str("priceExplain")}}</div>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>

            <!--거래가 입력-->
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("volumeText")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" v-model="volumeValue"
                       :placeholder="$str('volumePlaceholderMobile') + volumePlaceholder + ' BTC'">
                <div class="currency-indicator caption">CNY</div>
            </div>

            <!--최소 한도 금액 입력-->
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("minLimit")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" :placeholder="$str('minLimitPlaceholder')"
                       v-model="minLimitValue">
                <div class="currency-indicator caption">CNY</div>
            </div>

            <!--최대 한도 금액 입력-->
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("maxLimit")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" :placeholder="$str('maxLimitPlaceholder')"
                       v-model="maxLimitValue">
                <div class="currency-indicator caption">CNY</div>
            </div>

            <!--지불기간 입력-->
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("paymentWindow")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" :placeholder="$str('paymentWindowPlaceholder')"
                       v-model="paymentWindowValue">
                <div class="currency-indicator caption">{{$str("minuteText")}}</div>
            </div>
            <div>{{$str("paymentWindowExplain")}}</div>
        </v-flex>


        <!--***************      두번째       *********-->
        <!--***************       섹션        *********-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>

            <!--유져 data, DB SELECT 하여 결제수단 data get한 후 v-if문 분기 처리-->
            <!--알리페이 결제-->
            <div class="payment-alipay">
                <div>
                    <p><img src="@/assets/img/method_alipay.png">{{$str("alipayText")}} : </p>
                    <p></p>
                    <p></p>
                </div>
                <v-switch v-model="alipayUse"></v-switch>
            </div>

            <!--위챗페이 결제-->
            <div class="payment-wechat">
                <div>
                    <p><img src="@/assets/img/method_wechatpay.png">{{$str("wechatPayText")}} : </p>
                    <p></p>
                    <p></p>
                </div>
                <v-switch v-model="wechatPayUse"></v-switch>
            </div>

            <!--은행 계좌 결제-->
            <div class="payment-bankAccount">
                <div>
                    <p><img src="@/assets/img/method_bankaccount.png">{{$str("bankAccountText")}} : </p>
                    <p></p>
                    <p></p>
                </div>
                <v-switch v-model="bankAccountUse"></v-switch>
            </div>

            <!--결제수단 새로고침-->
            <div>
                <input type="button" :value="$str('refreshBtnText')" @click="onRefresh"/>
            </div>
            <div class="payment-explain">
                {{$str("paymentExplain")}}
                <a>{{$str("clickHereText")}}</a>
            </div>
        </v-flex>

        <!--자동 답글 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("autoReplyText")}}</div>
            <div class="price-input-wrapper">
                <textarea :placeholder="$str('autoReplyPlaceholder')" v-model="autoReplayValue"></textarea>
            </div>
        </v-flex>

        <!--거래조항 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("termsTransactionText")}}</div>
            <div class="price-input-wrapper">
                <textarea :placeholder="$str('termsTransactionPlaceholder')" v-model="termsTransactinValue"></textarea>
            </div>
        </v-flex>

        <!--상대방 제한사항 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("counterpartyFilterText")}}</div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("counterpartyFilterPlaceholder")}}</div>
            <div class="price-input-wrapper">
                <input type="tel" v-model="counterpartyFilterValue">
            </div>
            <div><label><input type="checkbox"
                               v-model="counterpartyCheckbox_first"/>{{$str("counterpartyCheckbox1")}}</label></div>
            <div><label><input type="checkbox" v-model="counterpartyCheckbox_second"/>{{$str("counterpartyCheckbox2")}}</label>
            </div>
            <div><label><input type="checkbox"
                               v-model="counterpartyCheckbox_third"/>{{$str("counterpartyCheckbox3")}}</label></div>
            <div><label><input type="checkbox"/>{{$str("counterpartyExplain")}}</label></div>
        </v-flex>

        <!--거래 비밀번호 비교 입력-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("tradePwText")}}</div>
            <input type="text" class="price-input" :placeholder="$str('tradePwText')" v-model="tradePwValue">
        </v-flex>

        <!--거래조항/이용약관-->
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div>
                <label>
                    <input type="checkbox" v-model="agreeTerms"/>{{$str("agreeTermsExplain")}}
                </label>
                <a>《{{$str("termsTrading")}}》</a>
            </div>

            <!--슬라이드 바 인증-->
            <verify-slider v-on:passcallback="putVerified"></verify-slider>
            <v-btn @click='onPost' flat large block class="textBlue common-btn-hover common-normal-bordered-button">{{$str("postAdBtn")}}
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import SelectBox from '../../../../components/SelectBox.vue';
    import VerifySlider from "../../../../components/VerifySlider.vue";
    import AdService from "../../../../service/ad/AdService";
    import MainRepository from "../../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'postAd',
        props: ['message'],
        data: () => ({
            price: "",
            currency: "",
            coin: "",
            volumePlaceholder: 0,
            tradeType: "buy",
            coinType: "btc",
            priceType: "fixed",
            priceValue: "0",
            volumeValue: "",
            minLimitValue: "",
            maxLimitValue: "",
            paymentWindowValue: "",
            alipayUse: false,
            wechatPayUse: false,
            bankAccountUse: false,
            autoReplayValue: "",
            termsTransactinValue: "",
            counterpartyFilterValue: "",
            counterpartyCheckbox_first: false,
            counterpartyCheckbox_second: false,
            counterpartyCheckbox_third: false,
            tradePwValue: "",
            agreeTerms: false,
            isVerified: false,
            adType: ""
        }),
        components: {
            SelectBox, VerifySlider
        },
        methods: {
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
            }
        }
    });
</script>

<style>
    .select-box-wrapper {
        position: relative;
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
        color: #9294a6;
    }

    .currency-indicator {
        width: 60px;
        height: 40px;
        padding-top: 10px;
        color: #ffffff;
        background-color: #c8c8c8;
        padding-left: 19px;
        padding-right: 19px;
    }
</style>
