<!--TradeListItem과 대부분 같은 코드-->
<!--merchant 부분만 조금 다름-->
<template>
  <div>
    <!-- mobile 일때-->
    <div v-if="isMobile" class="p-relative">
      <!--거래 list -->
      <div v-if="!drawer">
        <!-- name-->
        <!--userPage 일때-->
        <v-layout  mt-4 align-center fill-height>
          <v-flex xs2>
            <h5 v-if="user.cryptocurrency=='BTC'"class="sprite-img ic-btc-lg"> </h5>
            <h5 v-else-if="user.cryptocurrency=='ETH'"class="sprite-img ic-eth-lg"> </h5>
            <h5 v-else-if="user.cryptocurrency=='USDT'"class="sprite-img ic-usdt-lg"> </h5>
            <h5 v-else class="sprite-img ic-allb-lg"> </h5>
          </v-flex>
          <v-flex xs10 text-xs-left>
            <span class="bold">{{user.cryptocurrency}}</span>
          </v-flex>
        </v-layout>


        <!-- Volume -->
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs4 text-xs-left color-darkgray>{{ $str('Available') }} :</v-flex>
          <v-flex xs6 text-xs-right> {{ $fixed(user.volumeAvailable, user.cryptocurrency) }} {{user.cryptocurrency}} </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs4 text-xs-left color-darkgray>{{ $str('limits') }} :</v-flex>
          <v-flex xs6 text-xs-right> {{user.minLimit}}-{{user.maxLimit}} {{currency}} </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout mb-3>
          <v-flex xs2></v-flex>
          <v-flex xs4 text-xs-left color-darkgray>{{ $str('price') }} :</v-flex>
          <v-flex xs6 text-xs-right bold color-orange-price> {{user.fixedPrice}} {{currency}} </v-flex>
        </v-layout>
        <!-- Payment Methods -->
        <v-layout align-center justify-space-between row fill-height mb-4>
          <v-flex xs2></v-flex>
          <v-flex xs5 text-xs-left>
            <a class="tooltip" v-if="user.bank_account.length >0">
              <div class="mr-2 sprite-img ic-bank f-left"></div>
              <span class="BankTooltip tooltip-content">{{ $str('bankAccountText') }}</span>
            </a>
            <a class="tooltip" v-if="user.alipay_id.length >0">
              <div class="mr-2 sprite-img ic-alipay f-left"></div>
              <span class="tooltip-content">{{ $str('alipayText') }}</span>
            </a>
            <a class="tooltip" v-if="user.wechat_id.length >0">
              <div class="mr-2 sprite-img ic-wechatpay f-left"></div>
              <span class="tooltip-content">{{ $str('wechatPayText') }}</span>
            </a>
          </v-flex>
          <!--거래 버튼-->
          <v-flex xs5 text-xs-right>
            <button class="btn-rounded-blue medium" @click="changeDrawer">
              {{$str(user.tradeType)}} {{user.cryptocurrency}}</button>
          </v-flex>
        </v-layout>
      </div>
      <!-- Nicname 설정을 안했을경우 띄움-->
      <v-flex v-if="drawer&& !setNickName">
        <div class="mobileModal">
          <v-layout>
            <v-flex xs2 pl-2>
              <avatar me>
              </avatar>
            </v-flex>
            <v-flex xs10 text-xs-left mb-4>
              <h5 class="medium color-blue c-pointer text-white-hover">
                {{user.nickname}} ( {{ $fixed(user.volumeAvailable, user.cryptocurrency) }} | {{user.tradeRate}}%)
              </h5>
              <a class="tooltip d-inline-block" v-if="user.rank==1">
                <div class="sprite-img ic-premium ml-2"></div>
                <span class="premiumTooltip tooltip-content">{{$str("Premium merchant")}}</span>
              </a>
              <a class="tooltip d-inline-block" v-else-if="user.rank==2">
                <div class="sprite-img ic-certified ml-2"></div>
                <span class="certifiedTooltip tooltip-content">{{$str("Certified merchant")}}</span>
              </a>

              <h5 class="color-darkgray medium">
                {{$str("Available")}} {{ $fixed(user.volumeAvailable, user.cryptocurrency) }} {{user.cryptocurrency}}
              </h5>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs7 offset-xs2 text-xs-left>
                <span class="color-darkgray">
                  {{$str("You need to complete the necessary transaction information.")}}
                </span>
              <span class="color-blue c-pointer text-white-hover" @click="showNickNameModal = true">{{$str("Set up now.")}}</span>
            </v-flex>
          </v-layout>
          <v-layout mt-4a>
            <v-flex xs4 offset-xs8>
              <button class="btn-white " @click="changeDrawer">{{$str("cancel")}}</button>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <!--버튼 클릭시 거래를 위한 mobile modal-->
      <div v-else-if="drawer" class="mobileModal">
        <!-- name-->
        <v-layout mt-4 align-center fill-height>
          <v-flex xs2 pl-2 >
            <h5 v-if="user.cryptocurrency=='BTC'"class="sprite-img ic-btc-lg"> </h5>
            <h5 v-else-if="user.cryptocurrency=='ETH'"class="sprite-img ic-eth-lg"> </h5>
            <h5 v-else-if="user.cryptocurrency=='USDT'"class="sprite-img ic-usdt-lg"> </h5>
            <h5 v-else class="sprite-img ic-allb-lg"> </h5>
          </v-flex>
          <v-flex xs8 text-xs-left>
            <span class="bold">{{user.cryptocurrency}}</span>
          </v-flex>
          <v-flex xs2 text-xs-center>
            <button><i class="material-icons" @click="changeDrawer">close</i></button>
          </v-flex>
        </v-layout>
        <!-- Volume -->
        <v-layout medium>
          <v-flex xs4  offset-xs2 text-xs-left>
            <h5 class="color-darkgray">
              {{$str("Available")}}
            </h5>
          </v-flex>
          <v-flex xs4 offset-xs1 text-xs-right>
            <h5>{{ $fixed(user.volumeAvailable, user.cryptocurrency) }} {{user.cryptocurrency}}</h5>
          </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout  medium>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class=" color-darkgray">
              {{$str("limits")}} :
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <h5>{{user.minLimit}}-{{user.maxLimit}} {{currency}}</h5>
          </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout medium>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class="color-darkgray">
              {{$str("price")}} :
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <h5 class=" bold color-orange-price">{{user.fixedPrice}} {{currency}}</h5>
          </v-flex>
        </v-layout>
        <!-- payment methods -->
        <v-layout>
          <v-flex xs3  offset-xs2 text-xs-left>
            <h5 class="medium color-darkgray">
              {{$str("payment")}}:
            </h5>
          </v-flex>
          <v-flex xs5 offset-xs1 text-xs-right>
            <div v-if="user.bank_account.length >0"
                 class="ml-2 sprite-img ic-bank f-right"></div>
            <div v-if="user.alipay_id.length >0"
                 class="ml-2 sprite-img ic-alipay f-right"></div>
            <div v-if="user.wechat_id.length >0"
                 class="ml-2 sprite-img ic-wechatpay f-right"></div>
          </v-flex>
        </v-layout>
        <v-layout mt-4>
          <v-flex xs9 offset-xs2 text-xs-left >
            <!--to input-->
            <div class="p-relative">
              <input type="text" class="input textRightPlaceholder" name="toValue" v-model="toValue"
                     @focus="inputFocus('toValue')"  @blur="onChecktoValue" @keyup="onNumberCheck('toValue')"
                     v-bind:class="{'warning-border' : warning_toValue}">
              <!--All 버튼-->
              <span class="cs-click-send allCurrencyBtn" @mousedown="fillAll()"
                    v-if="clickToAll">{{$str("All")}}</span>
              <!--currency placeholder-->
              <span class="cs-timer currencyPlaceholderBtn" v-else>{{user.currency}}</span>
              <div class="warning-text-wrapper">
                <p class="d-none" v-bind:class="{'warning-text' : warning_toValue}">{{verify_warning_toValue}}</p>
              </div>
            </div>
            <!--from input-->
            <div class="mt-3 p-relative">
              <input type="text" class="input textRightPlaceholder" name="fromValue" v-model="fromValue"
                     @focus="inputFocus('fromValue')" @blur="onCheckfromValue" @keyup="onNumberCheck('fromValue')"
                     v-bind:class="{'warning-border' : warning_fromValue}">
              <!--All 버튼-->
              <span class="cs-click-send" @mousedown="fillAll()"
                    v-if="clickFromAll">{{$str("All")}}</span>
              <!--cryptocurrency placeholder-->
              <span class="cs-timer" v-else>{{user.cryptocurrency}}</span>
              <div class="warning-text-wrapper">
                <p class="d-none" v-bind:class="{'warning-text' : warning_fromValue}">
                  {{verify_warning_fromValue}}</p>
              </div>
            </div>
            <!--trade PW. sell 일때만 활성화-->
            <div class="mt-3 p-relative" v-if="user.tradeType =='Sell'">
              <input type="text" class="input textRightPlaceholder" name="tradePW" v-model="tradePW"
                     :placeholder="$str('tradePwText')" @blur="onChecktradePassword" @keyup="onNumberCheck('tradePW')"
                     v-bind:class="{'warning-border' : warning_tradePassword}">
              <div class="warning-text-wrapper">
                <span class="d-none" v-bind:class="{'warning-text' : warning_tradePassword}">{{verify_warning_tradePassword}}</span>
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-layout mt-4a>
          <v-flex xs9 offset-xs2 text-xs-left>
            <button class="btn-blue" @click="goTrade">{{$str("confirm")}}</button>
          </v-flex>
        </v-layout>
        <v-layout mt-4>
          <v-flex xs9 offset-xs2 text-xs-left>
            <h5 class="color-darkgray medium">{{$str("Payment window is")}} {{user.paymentWindow}} {{$str("minuteText")}}</h5>
          </v-flex>
        </v-layout>
        <!--user Memo가 있을시-->
        <v-layout v-if="user.termsOfTransaction !== '' " mt-4>
          <v-flex xs9 offset-xs2 text-xs-left>
            <h6 class="color-darkgray medium">
              {{$str("userMemo")}}： <br>
              {{user.termsOfTransaction}}
            </h6>
          </v-flex>
        </v-layout>
      </div>
    </div>

    <!--Web 일때-->
    <div v-else class="p-relative">
      <v-layout v-if="!drawer" class="userWebList" align-center justify-center fill-height>
        <!--ㅡmerchant-->
        <v-flex  md3 text-md-left>
          <v-layout justify-start align-center>
            <!--coin 종류에 따라 하나만 이미지 보여줌-->
            <span v-if="user.cryptocurrency=='BTC'"class="sprite-img ic-btc-lg"> </span>
            <span v-else-if="user.cryptocurrency=='ETH'"class="sprite-img ic-eth-lg"> </span>
            <span v-else-if="user.cryptocurrency=='USDT'"class="sprite-img ic-usdt-lg"> </span>
            <span v-else class="sprite-img ic-allb-lg"> </span>
            <span class="ml-3 bold">{{user.cryptocurrency}}</span>
          </v-layout>
        </v-flex>
        <!--available-->
        <v-flex md2 text-md-left >{{ $fixed(user.volumeAvailable, user.cryptocurrency) }} {{user.cryptocurrency}} </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >{{user.minLimit}}-{{user.maxLimit}} {{currency}} </v-flex>
        <!--price-->
        <v-flex md2 text-md-left color-orange-price bold>{{user.fixedPrice}} {{user.cryptocurrency}} </v-flex>
        <!-- payment method-->
        <v-flex md3 text-md-right>
          <v-layout align-center >
            <!--payment method-->
            <a class="tooltip" v-if="user.bank_account.length >0">
              <div class="sprite-img ic-bank mr-2"></div>
              <span class="BankTooltip tooltip-content">{{$str("bankAccountText")}}</span>
            </a>
            <a class="tooltip" v-if="user.alipay_id.length >0">
              <div class="sprite-img ic-alipay mr-2"></div>
              <span class="tooltip-content">{{$str("alipayText")}}</span>
            </a>
            <a class="tooltip" v-if="user.wechat_id.length >0">
              <div class="sprite-img ic-wechatpay mr-2"></div>
              <span class="tooltip-content">{{$str("wechatPayText")}}</span>
            </a>
            <!--img와 button을 양쪽에 정렬시키기 위함.-->
            <v-spacer></v-spacer>
            <!-- buy 혹은 sell button -->
            <button class="btn-rounded-blue medium" @click="changeDrawer">
              <h5>{{$str(user.tradeType)}} {{user.cryptocurrency}}</h5>
            </button>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--nickname 설정 안했을때 띄우는 modal. click은 했는데, setNickName이 false일때-->
      <v-flex v-if="drawer && !setNickName">
        <div class="tradeWebModal">
          <v-layout row wrap>
            <v-flex md3 text-md-left>
              <v-layout pl-4>
                <!--avatar-->
                <avatar me>
                </avatar>
                <!-- merchant 정보-->
                <span>
                  <span class="mr-2 ml-3 color-blue medium c-pointer text-white-hover">
                    {{user.nickname}} ( {{user.volumeAvailable}} | {{user.tradeRate}}%)
                  </span>
                  <!--판매자 rank-->
                  <a class="tooltip d-inline-block" v-if="user.rank==1">
                    <div class="sprite-img ic-premium ml-2"></div>
                    <span class="premiumTooltip tooltip-content">{{$str("Premium merchant")}}</span>
                  </a>
                  <a class="tooltip d-inline-block" v-else-if="user.rank==2">
                    <div class="sprite-img ic-certified ml-2"></div>
                    <span class="certifiedTooltip tooltip-content">{{$str("Certified merchant")}}</span>
                  </a>
                  <div class="ml-3 color-darkgray medium">{{$str("Available")}}  {{user.volumeAvailable}} {{user.cryptocurrency}}</div>
                </span>
              </v-layout>
            </v-flex>
            <v-flex md9>
              <!--수직, 수평가운데 정렬.-->
              <v-layout row align-center fill-height justify-end pr-4>
                <h5>{{$str("You need to complete the necessary transaction information.")}}&nbsp;</h5>
                <h5 class="color-blue c-pointer text-white-hover" @click="showNickNameModal = true">
                  {{$str("Set up now.")}}</h5>
                <v-divider class="mx-3" inset vertical></v-divider>
                <button class="btn-rounded-white text-white-hover"
                        @click="changeDrawer">{{$str("cancel")}}
                </button>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <!--Buy 를 위한 modal-->
      <v-flex v-else-if="drawer" >
        <div class="tradeWebModal">
        <v-layout row wrap>
          <v-flex md3 text-md-left >
            <v-layout pl-4 >
              <span v-if="user.cryptocurrency=='BTC'"class="sprite-img ic-btc-lg"> </span>
              <span v-else-if="user.cryptocurrency=='ETH'"class="sprite-img ic-eth-lg"> </span>
              <span v-else-if="user.cryptocurrency=='USDT'"class="sprite-img ic-usdt-lg"> </span>
              <span v-else class="sprite-img ic-allb-lg"> </span>
              <span>
                <span class="ml-3 bold">{{user.cryptocurrency}}</span>
                <div class="ml-3 color-darkgray medium">{{$str("Available")}}  {{ $fixed(user.volumeAvailable, user.cryptocurrency) }} {{user.cryptocurrency}}</div>
              </span>
            </v-layout>
          </v-flex>
          <!--둘째줄-->
          <v-flex md2 text-md-left>
            <div class="bold color-orange-price">
              {{user.fixedPrice}} {{currency}}
            </div>
            <div class="medium">
              {{user.minLimit}}-{{user.maxLimit}} {{currency}}
            </div>
          </v-flex>

          <v-flex md4>
            <!-- 수평: 양쪽으로 벌리고, 수직: 가운데정렬-->
            <v-layout align-center justify-space-between row fill-height>
              <!--to input-->
              <div class="p-relative">
                <input type="number" class="input userInput textRightPlaceholder"
                       name="toValue" v-model="toValue" @keyup="onNumberCheck('toValue')"
                       @focus="inputFocus('toValue')" @blur="onChecktoValue"
                       v-bind:class="{'warning-border' : warning_toValue}">
                <!--All 버튼-->
                <span class="cs-click-send allCurrencyBtn" @mousedown="fillAll()"
                      v-if="clickToAll">{{$str("All")}}</span>
                <!--currency placeholder-->
                <span class="cs-timer currencyPlaceholderBtn" v-else>{{user.currency}}</span>
                <div class="warning-text-wrapper">
                  <p class="d-none" v-bind:class="{'warning-text' : warning_toValue}">{{verify_warning_toValue}}</p>
                </div>
              </div>
              <!--가운데 아이콘-->
              <i class="material-icons color-darkgray swapIcon">swap_horiz</i>
              <!--from input-->
              <div class="p-relative">
                <input type="number" class="input userInput textRightPlaceholder"
                       name="fromValue" v-model="fromValue" @keyup="onNumberCheck('fromValue')"
                       @focus="inputFocus('fromValue')" @blur="onCheckfromValue"
                       v-bind:class="{'warning-border' : warning_fromValue}">
                <!--All 버튼-->
                <span class="cs-click-send" @mousedown="fillAll()"
                      v-if="clickFromAll">{{$str("All")}}</span>
                <!--cryptocurrency placeholder-->
                <span class="cs-timer" v-else>{{user.cryptocurrency}}</span>
                <div class="warning-text-wrapper">
                  <p class="d-none" v-bind:class="{'warning-text' : warning_fromValue}">
                    {{verify_warning_fromValue}}</p>
                </div>
              </div>
            </v-layout>
          </v-flex>
          <v-flex md3 text-md-left>
            <!--confirm 버튼-->
            <button class="btn-rounded-blue btn-blue-hover mr-3"
                    @click="goTrade">{{$str("confirm")}}
            </button>
            <!--cancel 버튼-->
            <button class="btn-rounded-white text-white-hover"
                    @click="changeDrawer">{{$str("cancel")}}
            </button>
          </v-flex>
        </v-layout>
        <v-layout row wrap tradeWebModal-secondRow>
          <v-flex md6 text-md-left>
            <div class="margin-left-74">
              <!--Bank account-->
              <div v-if="user.bank_account.length >0">
                <div class="sprite-img ic-bank mr-2 f-left"></div>
                <span class="mr-3 f-left">{{$str("bankAccountText")}}</span>
              </div>
              <!--Alipay-->
              <div v-if="user.alipay_id.length >0">
                <div class="sprite-img ic-alipay mr-2 f-left"></div>
                <span class="mr-3 f-left">{{$str("alipayText")}}</span>
              </div>
              <!--WechatPay-->
              <div v-if="user.wechat_id.length >0">
                <div class="sprite-img ic-wechatpay mr-2 f-left"></div>
                <span class="mr-3 f-left">{{$str("wechatPayText")}}</span>
              </div>
            </div>
          </v-flex>
          <v-flex md3 text-md-right>
            <div v-if="user.tradeType =='Sell'">
              <div class="p-relative">
                <input type="password" class="input userInput textLeftPlaceholder"
                       name="tradePW" v-model="tradePW" :placeholder="pwPlaceholder"
                       @blur="onChecktradePassword"
                       v-bind:class="{'warning-border' : warning_tradePassword}"
                >
                <div class="warning-text-wrapper">
                  <span class="d-none" v-bind:class="{'warning-text' : warning_tradePassword}">{{verify_warning_tradePassword}}</span>
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex md2 text-md-right>
            <h6 class="color-darkgray">{{$str("Payment window is")}} {{user.paymentWindow}} {{$str("minuteText")}}</h6>
          </v-flex>
        </v-layout>



        <!-- 판매자가 남긴 요구 메모가 있을시-->
        <v-layout >
          <v-flex md12 mt-5 mb-5 v-if="user.termsOfTransaction !== '' " margin-left-74 mr-4 text-md-left>
            <h6 class="color-darkgray">
              {{$str("userMemo")}}： <br>
              {{user.termsOfTransaction}}
            </h6>
          </v-flex>
        </v-layout>
        </div>
      </v-flex>
    </div>
    <!--nickname설정을 위한 modal-->
    <nick-name-modal
            :show=showNickNameModal
            v-on:close="closeNicknameModal"
    ></nick-name-modal>
  </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../../vuex/MainRepository";
    import Avatar from '@/components/Avatar.vue';
    import {abUtils} from "../../../../../../common/utils";
    import NickNameModal from '@/components/NickNameModal.vue';

    export default {
        name: "UserTradeItem",
        components:{Avatar,NickNameModal},
        props : {
            user: {},
        },
        data: () => ({
            pwPlaceholder: Vue.prototype.$str('tradePwText'),
            toValue : '',
            fromValue : '',
            tradePassword : '',
            currency : 'CNY',   //현재 사용하고자 하는 화폐단위
            tradePW : '',       // Trade Password
            rankSrc : '',
            showNickNameModal: false,        //nickname modal을 띄울려면 true로.
            verify_warning_toValue: "",
            verify_warning_fromValue: "",
            verify_warning_tradePassword: "",
            warning_toValue: false,
            warning_fromValue: false,
            warning_tradePassword: false,
            clickToAll: false,              //tovalue부분의 input에 All button이 올라가 있게
            clickFromAll: false,            //fromvalue부분의 input에 All button이 올라가 있게

        }),

        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
            drawer() {
                return (MainRepository.TradeView.getDrawer() == this.user.adNo);
            },
            setNickName() {
                //nickname 설정이 필요하면 false, 설정이미 했으면 true
                return (MainRepository.MyInfo.getUserInfo().nickname !== '')
            },
            getBalance(){
                let MyBalance = MainRepository.Balance.controller().findByCrptoCurrency(
                    MainRepository.TradeView.getSelectFilter().cryptocurrency
                );
                return MyBalance.availableAmount
            },
        },
        methods : {
            onNumberCheck(type){
                if(type ==='toValue'){
                    if (this.toValue > this.user.maxLimit) { // || this.toValue < this.user.minLimit 나중에 추가할것.
                        this.verify_warning_toValue = Vue.prototype.$str("Enter less than maximum limit");
                        this.warning_toValue = true;
                        return false;
                    }
                    let temp = this.toValue;
                    if (!abUtils.isDouble(temp) || temp[0] === '.') {
                        return this.toValue = "";
                    }
                    if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                        return this.toValue = abUtils.toDeleteZero(temp);
                    }
                    this.warning_toValue = false;
                    //fromvalue 계산해줌
                    this.fromValue = this.toValue / this.user.fixedPrice;
                    this.fromValue = this.fromValue.toFixed(6);         //소수점 6번째자리까지

                }else if(type ==='fromValue'){
                    let tempTovalue = this.fromValue * this.user.fixedPrice;
                    if (tempTovalue > this.user.maxLimit) {
                        this.verify_warning_fromValue = Vue.prototype.$str("Enter less than maximum limit");
                        this.warning_fromValue = true;
                        return false;
                    }
                    if (this.fromValue > this.getBalance) {
                        this.verify_warning_fromValue = Vue.prototype.$str("Enter less than available");
                        this.warning_fromValue = true;
                        return false;
                    }
                    let temp = this.fromValue;
                    if (!abUtils.isDouble(temp) || temp[0] === '.') {
                        return this.fromValue = "";
                    }
                    if (Number(temp[0]) === 0 && temp[1] != '.' && temp.length > 1) {
                        return this.fromValue = abUtils.toDeleteZero(temp);
                    }
                    this.warning_fromValue = false;
                    //toValue 계산해줌
                    this.toValue = this.fromValue * this.user.fixedPrice;
                    this.toValue = this.toValue.toFixed(2);         //소수점 2번째자리까지

                }else if(type ==='tradePW'){
                    this.onChecktradePassword();

                }

            },
            fillAll(){
                this.clickToAll = false;
                this.clickFromAll = false;
                //차후 마진고려해 수정해야함
                this.toValue = this.user.maxLimit
                if (this.user.volumeAvailable * this.user.fixedPrice < this.user.maxLimit) {
                    this.toValue = this.user.volumeAvailable * this.user.fixedPrice;
                }
                if(this.toValue > this.user.fixedPrice * this.getBalance){
                    this.toValue = this.user.fixedPrice * this.getBalance;
                }
                if(this.toValue < this.user.minLimit){
                    this.warning_toValue = true;
                    this.verify_warning_toValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    return false;
                }
                this.warning_toValue = false;
                this.warning_fromValue = false;

                ////소수점 6번째자리까지 fromvalue 계산해줌
                this.fromValue = Math.floor(this.toValue *1000000/ this.user.fixedPrice) / 1000000;

            },
            inputFocus(type){
                if(type =='toValue' ){
                    if(this.toValue < this.user.maxLimit){
                        this.clickToAll = true;
                    }
                }
                else{
                    this.clickFromAll = true;
                }
            },
            onChecktoValue(){
                //All 버튼 없애기.
                this.clickToAll = false;
                if (this.toValue === "") {
                    this.warning_toValue = true;
                    this.verify_warning_toValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    return false;
                }
                if (this.toValue < this.user.minLimit) {
                    this.warning_toValue = true;
                    this.verify_warning_toValue = Vue.prototype.$str("Enter more than minimum limit");
                    return false;
                }
                if (this.toValue > this.user.maxLimit) {
                    this.warning_toValue = true;
                    this.verify_warning_toValue = Vue.prototype.$str("Enter less than maximum limit");
                    return false;
                }
                this.warning_toValue = false;
                return true;
            },
            onCheckfromValue(){
                this.clickFromAll = false;
                //All 버튼 없애기.
                let tempTovalue = (this.fromValue * this.user.fixedPrice).toFixed(0);
                if (this.fromValue === "" || tempTovalue > this.user.maxLimit) {
                    this.verify_warning_fromValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    this.warning_fromValue = true;
                    return false;
                }
                if (this.fromValue > this.user.volumeAvailable) {
                    this.verify_warning_fromValue = Vue.prototype.$str("Enter less than available");
                    this.warning_fromValue = true;
                    return false;
                }
                if (this.fromValue > this.getBalance) {
                    this.verify_warning_fromValue = Vue.prototype.$str("Enter less than available");
                    this.warning_fromValue = true;
                    return false;
                }
                this.warning_fromValue = false;
                return true;
            },
            onChecktradePassword(){
                if (this.tradePW === "") {
                    this.verify_warning_tradePassword = Vue.prototype.$str("warning_trade_password");
                    this.warning_tradePassword = true;
                    return false;
                }
                this.warning_tradePassword = false;
                return true;
            },
            goTrade(){
                let instance = this;
                if (this.onChecktoValue() && this.onCheckfromValue()) {
                    MainRepository.TradeView.createOrder({
                        email : MainRepository.MyInfo.getUserInfo().email,
                        adNo : this.user.adNo,
                        amount :   this.toValue,
                        coinCount : this.fromValue,
                        customerMemberNo :  MainRepository.MyInfo.getUserInfo().memberNo,
                        merchantMemberNo :  this.user.memberNo,
                        price : this.user.fixedPrice,
                        status : "unpaid",
                        tradePassword : this.tradePW,
                    }, function (orderNo) {
                        let tradePage;
                        switch (instance.user.tradeType) {
                            case 'Buy':
                                tradePage = "/buy?"+orderNo
                                instance.$router.push(tradePage);
                                break;

                            case 'Sell':
                                tradePage = "/sell?"+orderNo
                                instance.$router.push(tradePage);
                                break;
                        }
                    });
                }
            },
            changeDrawer() {
                /////////////login 안했을때 login창으로 돌려보냄////////
                if (!MainRepository.MyInfo.isLogin()) {
                    MainRepository.router().goLogin();
                    return;
                }
                /////////////////////////////////
                MainRepository.TradeView.setchangeDrawer(this.user.adNo);
            },
            closeNicknameModal() {
                this.showNickNameModal = false;
            },

        },
    }
</script>

<style scoped>
  .userWebList{
    height: 84px;
    position: relative;
    z-index: 0;
  }
  .userInput{
    border: solid 1px #b2b2b2;
    max-width: 153px;
  }
  .mobileInput{
    height: 36px;

  }
  .textRightPlaceholder::-webkit-input-placeholder{
    text-align: right;


  }
  .textLeftPlaceholder::-webkit-input-placeholder{
    text-align: left;

  }
  .userRank{
    max-width: 16px;
    height: 18px;
    margin-left: 16px;
  }

  .BankTooltip{
    width: 101px;
  }
  .tradeWebModal{
    min-height: 171px;
    background-color: #ffffff;
    width: 100%;
    border-radius: 2px;
    padding-top: 24px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    display: block;
  }


  .tradeWebModal-secondRow{
    margin-top: 36px;
  }
  .margin-left-74{
    margin-left: 74px;
  }
  .mobileModal{
    border-radius: 2px;
    background-color: #ffffff;
    width: 100%;
    display: block;
    z-index: 1;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    padding-top: 24px;
    padding-bottom: 24px;
  }
</style>