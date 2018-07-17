<template>
    <v-layout mt-5 mb-5 column>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="mb-4a signup-flex">
                <div class="title-2">{{$str("generalAdSubject")}}</div>
            </div>
            <div>
                <!--국가 select box-->
                <select-box select-box-type="country"></select-box>
                <!--화폐 select box-->
                <select-box select-box-type="currency"></select-box>
                <!--buy/sell select box-->
                <div class="select-box-wrapper">
                    <select class="abSelectBox caption">
                        <option value="buy">{{$str("buyText")}}</option>
                        <option value="sell">{{$str("sellText")}}</option>
                    </select>
                    <v-icon class="icon-style">keyboard_arrow_down</v-icon>
                </div>
                <!--코인 select box-->
                <div class="select-box-wrapper">
                    <select class="abSelectBox caption">
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
                <select class="abSelectBox caption">
                    <option value="fixed">{{$str("fixedPrice")}}</option>
                    <option value="float">{{$str("floatPrice")}}</option>
                </select>
                <v-icon class="icon-style">keyboard_arrow_down</v-icon>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("fixedPrice")}}</div>
            <!--가격 유형 select box-->
            <div class="price-input-wrapper">
                <input type="text" class="price-input">
                <div class="currency-indicator caption">CNY</div>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("priceText")}}</div>
            <div class="price-clac-wrapper">
                <div class="price-calculate">{{$str("marektPrice")}}</div>
                <div class="price-coin"></div>
                <div class="price-explain">{{$str("priceExplain")}}</div>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("volumeText")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input"
                       :placeholder="$str('volumePlaceholderMobile') + volumePlaceholder + ' BTC'">
                <div class="currency-indicator caption">CNY</div>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("minLimit")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" :placeholder="$str('minLimitPlaceholder')">
                <div class="currency-indicator caption">CNY</div>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("maxLimit")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" :placeholder="$str('maxLimitPlaceholder')">
                <div class="currency-indicator caption">CNY</div>
            </div>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("paymentWindow")}}</div>
            <div class="price-input-wrapper">
                <input type="text" class="price-input" :placeholder="$str('paymentWindowPlaceholder')">
                <div class="currency-indicator caption">{{$str("minuteText")}}</div>
            </div>
            <div>{{$str("paymentWindowExplain")}}</div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="payment-alipay">
                <div>
                    <p><i class="alipay-img"></i>{{$str("alipayText")}} : </p>
                    <p></p>
                    <p></p>
                </div>
                <v-switch></v-switch>
            </div>
            <div class="payment-wechat">
                <div>
                    <p><i class="alipay-img"></i>{{$str("alipayText")}} : </p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <v-switch></v-switch>
            <div class="payment-bankAccount">
                <div>
                    <p><i class="alipay-img"></i>{{$str("bankAccountText")}} : </p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <div>
                <input type="button" :value="$str('refreshBtnText')"/>
            </div>
            <div class="payment-explain">
                {{$str("paymentExplain")}}
                <a>{{$str("clickHereText")}}</a>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("autoReplyText")}}</div>
            <div class="price-input-wrapper">
                <textarea :placeholder="$str('autoReplyPlaceholder')"></textarea>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("termsTransactionText")}}</div>
            <div class="price-input-wrapper">
                <textarea :placeholder="$str('termsTransactionPlaceholder')"></textarea>
            </div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("counterpartyFilterText")}}</div>
            <div class="price-input-wrapper">
                <textarea :placeholder="$str('counterpartyFilterPlaceholder')"></textarea>
            </div>
            <div><label><input type="checkbox"/>{{$str("counterpartyCheckbox1")}}</label></div>
            <div><label><input type="checkbox"/>{{$str("counterpartyCheckbox2")}}</label></div>
            <div><label><input type="checkbox"/>{{$str("counterpartyCheckbox3")}}</label></div>
            <div><label><input type="checkbox"/>{{$str("counterpartyExplain")}}</label></div>
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div class="text-xs-left mb-2 caption mt-1 input-label">{{$str("tradePwText")}}</div>
            <input type="text" class="price-input" :placeholder="$str('tradePwText')">
        </v-flex>
        <v-flex xs12 lg4 offset-lg4 wrap flex-divide>
            <div><label><input type="checkbox"/>{{$str("agreeTermsExplain")}}</label><a>《{{$str("termsTrading")}}》</a></div>
            <verify-slider v-on:passcallback="putVerified"></verify-slider>
            <v-btn @click='onPost' flat large block class="textBlue btnHover btnSignup">{{$str("postAdBtn")}}
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import SelectBox from '@/components/SelectBox.vue';
    import VerifySlider from "@/components/VerifySlider";
    import AdService from "../../../../service/ad/AdService";

    export default Vue.extend({
        name: 'postAd',
        data: () => ({
            price: "",
            currency: "",
            coin: "",
            volumePlaceholder: 0
        }),
        components: {
            SelectBox,VerifySlider
        },
        beforeCreate () {
            AdService.AD.getMarketPrice(function (error) {
                if (!error) {
                    //console.log("success");
                    alert("Thank you");
                    location.href = "/abMain";

                } else {
                    console.log("GET ERROR ::::::: " + error);
                }
            })
        },
        methods: {
            onPost: function () {

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
