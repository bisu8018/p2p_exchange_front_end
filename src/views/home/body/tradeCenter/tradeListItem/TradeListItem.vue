<template>
  <div>
    <!-- mobile 일때-->
    <div v-if="isMobile" class="p-relative">
      <!--거래 list -->
      <div v-if="!drawer">
        <!-- name-->
        <v-layout mt-4  align-center fill-height>
          <v-flex xs2 text-xs-left>
            <avatar :me= true>
            </avatar>
          </v-flex>

          <v-flex xs10 text-xs-left>
            <v-layout>
              <h5 class="color-blue text-white-hover c-pointer" @click="goUserPage">
                {{user.nickname}} ( {{user.volume}} | {{user.tradeRate}}%)
              </h5>
              <!-- user의 rank 이미지-->
              <a class="tooltip d-inline-block" v-if="user.rank==1">
                <div class="sprite-img ic-premium ml-2"></div>
                <span class="premiumTooltip tooltip-content">{{$str("Premium merchant")}}</span>
              </a>
              <a class="tooltip d-inline-block" v-else-if="user.rank==2">
                <div class="sprite-img ic-certified ml-2"></div>
                <span class="certifiedTooltip tooltip-content">{{$str("Certified merchant")}}</span>
              </a>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- Volume -->
        <v-layout>
            <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left color-darkgray>{{$str("Available")}} :</v-flex>
            <v-flex xs6 text-xs-right> {{user.volumeAvailable}} {{user.cryptocurrency}} </v-flex>
        </v-layout>
        <!-- Limits -->
        <v-layout>
          <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left color-darkgray>{{$str("limits")}} :</v-flex>
            <v-flex xs6 text-xs-right> {{user.minLimit}}-{{user.maxLimit}} {{user.currency}} </v-flex>
        </v-layout>
        <!-- Price -->
        <v-layout mb-3>
          <v-flex xs2></v-flex>
            <v-flex xs4 text-xs-left color-darkgray>{{$str("price")}} :</v-flex>
            <v-flex xs6 text-xs-right bold color-orange-price> {{user.fixedPrice}} {{user.currency}} </v-flex>
        </v-layout>
        <!-- Payment Methods -->
        <v-layout align-center justify-space-between row fill-height mb-4>
          <v-flex xs2></v-flex>
          <v-flex xs5 text-xs-left>
            <v-layout>
              <a class="tooltip" v-if="user.bank_account== 'y'">
                <div class="mr-2 sprite-img ic-bank "></div>
                <!--tooltip-->
                <span class="BankTooltip tooltip-content">Bank account</span>
              </a>
              <a class="tooltip" v-if="user.alipay_id== 'y'">
                <div class="mr-2 sprite-img ic-alipay "></div>
                <!--tooltip-->
                <span class="tooltip-content">Alipay</span>
              </a>
              <a class="tooltip" v-if="user.wechat_id== 'y'">
                <div class="mr-2 sprite-img ic-wechatpay "></div>
                <!--tooltip-->
                <span class="tooltip-content">Wechatpay</span>
              </a>
            </v-layout>
          </v-flex>
          <!--거래 버튼-->
          <v-flex xs5 text-xs-right>
            <div v-if="can_not_trade">
              <h6 class="color-darkgray"> Need to</h6>
              <h6 class="color-blue">{{do_not_trade_message}}</h6>
            </div>
            <div v-else>
              <button class="btn-rounded-blue medium" @click="changeDrawer">
                <h5>{{user.tradeType}} {{user.cryptocurrency}}</h5>
              </button>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <!-- Nicname 설정을 안했을경우 띄움-->
      <v-flex v-if="drawer&& !setNickName" >
        <div class="mobileModal">
          <v-layout>
            <v-flex xs2 pl-2>
              <avatar :me= true>
              </avatar>
            </v-flex>
            <v-flex xs10 text-xs-left mb-4>
              <h5 class="medium color-blue c-pointer text-white-hover">
                {{user.nickname}} ( {{user.volume}} | {{user.tradeRate}}%)
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
                {{$str("Available")}}  {{user.volumeAvailable}} {{user.cryptocurrency}}
              </h5>
            </v-flex>
          </v-layout>
          <v-layout >
            <v-flex xs7  offset-xs2 text-xs-left>
                <span class="color-darkgray">
                  {{$str("You need to complete the necessary transaction information.")}}
                </span>
                <span class="color-blue c-pointer text-white-hover" @click="showNickNameModal = true">{{$str("Set up now.")}}</span>
            </v-flex>
          </v-layout>
          <v-layout mt-4a>
          <v-flex xs4 offset-xs8 >
            <button class="btn-white " @click="changeDrawer">{{$str("cancel")}}</button>
          </v-flex>
        </v-layout>
        </div>
      </v-flex>
      <!--버튼 클릭시 거래를 위한 mobile modal-->
      <v-flex v-else-if="drawer">
        <div class="mobileModal">
          <!-- name-->
          <v-layout>
            <v-flex xs2 pl-2>
              <avatar :me= true>
            </avatar>
            </v-flex>
            <v-flex xs8 text-xs-left>
              <v-layout>
                <h5 class="medium color-blue text-white-hover c-pointer" @click="goUserPage">
                {{user.nickname}} ( {{user.volume}} | {{user.tradeRate}}%)
                </h5>
                <a class="tooltip d-inline-block" v-if="user.rank==1">
                  <div class="sprite-img ic-premium ml-2"></div>
                  <span class="premiumTooltip tooltip-content">{{$str("Premium merchant")}}</span>
                </a>
                <a class="tooltip d-inline-block" v-else-if="user.rank==2">
                  <div class="sprite-img ic-certified ml-2"></div>
                  <span class="certifiedTooltip tooltip-content">{{$str("Certified merchant")}}</span>
                </a>
              </v-layout>
            </v-flex>
            <v-flex xs2 text-xs-center>
              <button><i class="material-icons" @click="changeDrawer">close</i></button>
            </v-flex>
          </v-layout>
          <!-- Volume -->
          <v-layout medium>
            <v-flex xs4  offset-xs2 text-xs-left>
              <h5 class="color-darkgray">
                {{$str("Available")}} :
              </h5>
            </v-flex>
            <v-flex xs4 offset-xs1 text-xs-right>
              <h5>{{user.volumeAvailable}} {{user.cryptocurrency}}</h5>
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
              <h5>{{user.minLimit}}-{{user.maxLimit}} {{user.currency}}</h5>
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
              <h5 class=" bold color-orange-price">{{user.fixedPrice}} {{user.currency}}</h5>
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
              <h5 class="color-darkgray medium">{{$str("Payment_window_is_15minutes")}}</h5>
            </v-flex>
          </v-layout>
          <!--user Memo가 있을시-->
          <v-layout v-if="user.termsOfTransaction.length >0 " mt-4>
          <v-flex xs9 offset-xs2 text-xs-left>
            <h6 class="color-darkgray medium">
              {{$str("userMemo")}}： <br>
              {{user.termsOfTransaction}}
            </h6>
          </v-flex>
        </v-layout>
        </div>
      </v-flex>
    </div>

    <!--Web 일때-->
    <div v-else class="p-relative">
      <v-layout class="userWebList" v-if="!drawer" align-center justify-center fill-height>
        <!--ㅡmerchant-->
        <v-flex  md3 text-md-left>
          <v-layout  align-center>
              <avatar :me= true>
            </avatar>
            <span class="ml-3 color-blue text-white-hover ">
              <button @click="goUserPage">{{user.nickname}} ( {{user.volume}} | {{user.tradeRate}}%)</button>
            </span>
            <!--판매자 rank-->
            <a class="tooltip" v-if="user.rank==1">
              <div class="sprite-img ic-premium ml-2"></div>
              <span class="premiumTooltip tooltip-content">{{$str("Premium merchant")}}</span>
            </a>
            <a class="tooltip" v-else-if="user.rank==2">
              <div class="sprite-img ic-certified ml-2"></div>
              <span class="certifiedTooltip tooltip-content">{{$str("Certified merchant")}}</span>
            </a>
          </v-layout>
        </v-flex>
        <!--available-->
        <v-flex md2 text-md-left >{{user.volumeAvailable}} {{user.cryptocurrency}} </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >{{user.minLimit}}-{{user.maxLimit}} {{user.currency}} </v-flex>
        <!--price-->
        <v-flex md2 text-md-left color-orange-price bold>{{user.fixedPrice}} {{user.currency}} </v-flex>
        <!-- payment method-->
        <v-flex md3 text-md-right>
          <v-layout align-center >
            <!--payment method-->
            <a class="tooltip" v-if="user.bank_account== 'y'">
              <div class="sprite-img ic-bank mr-2"></div>
              <span class="BankTooltip tooltip-content">{{$str("bankAccountText")}}</span>
            </a>
            <a class="tooltip" v-if="user.alipay_id== 'y'">
              <div class="sprite-img ic-alipay mr-2"></div>
              <span class="tooltip-content">{{$str("alipayText")}}</span>
            </a>
            <a class="tooltip" v-if="user.wechat_id== 'y'">
              <div class="sprite-img ic-wechatpay mr-2"></div>
              <span class="tooltip-content">{{$str("wechatPayText")}}</span>
            </a>
            <!--img와 button을 양쪽에 정렬시키기 위함.-->
            <v-spacer></v-spacer>
            <!-- buy 혹은 sell button -->
            <div v-if="can_not_trade">
              <h6 class="color-darkgray"> Need to</h6>
              <h6 class="color-blue">{{do_not_trade_message}}</h6>
            </div>
            <div v-else>
              <button class="btn-rounded-blue medium" @click="changeDrawer">
                <h5>{{user.tradeType}} {{user.cryptocurrency}}</h5>
              </button>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <!--nickname 설정 안했을때 띄우는 modal. click은 했는데, setNickName이 false일때-->
      <v-flex v-if="drawer && !setNickName" >
        <div class="tradeWebModal">
          <v-layout row wrap>
            <v-flex md3 text-md-left >
              <v-layout pl-4 >
                <!--avatar-->
                <avatar :me= true>
                </avatar>
                <!-- merchant 정보-->
                <span>
                  <span class="mr-2 ml-3 color-blue medium c-pointer text-white-hover">
                    {{user.nickname}} ( {{user.volume}} | {{user.tradeRate}}%)
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
              <v-layout row  align-center fill-height justify-end pr-4>
                <h5>{{$str("You need to complete the necessary transaction information.")}}&nbsp;</h5>
                <h5 class="color-blue c-pointer text-white-hover" @click="showNickNameModal = true">{{$str("Set up now.")}}</h5>
                <v-divider class="mx-3" inset vertical></v-divider>
                <button class="btn-rounded-white text-white-hover"
                        @click="changeDrawer">{{$str("cancel")}}
                </button>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <!--trade가 가능한 modal click은 했고, setNickName이 true 일때-->
      <v-flex v-else-if="drawer">
        <div class="tradeWebModal">
          <v-layout row wrap>
            <v-flex md3 text-md-left >
              <v-layout row pl-4 >
                <!--avatar-->
                <avatar :me= true>
                </avatar>

                <!-- merchant 정보-->
                <span>
                  <span class="mr-2 ml-3 color-blue medium text-white-hover c-pointer" @click="goUserPage">
                    {{user.nickname}} ( {{user.volume}} | {{user.tradeRate}}%)
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
            <!--두번째열-->
            <v-flex md2 text-md-left>
              <div class="bold color-orange-price">
                {{user.fixedPrice}} {{user.currency}}
              </div>
              <div class="medium">
                {{user.minLimit}}-{{user.maxLimit}} {{user.currency}}
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
                  <input type="number" class="input userInput textLeftPlaceholder"
                         name="tradePW" v-model="tradePW" :placeholder="$str('tradePwText')"
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
              <h6 class="color-darkgray">{{$str("Payment_window_is_15minutes")}}</h6>
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
            :show = showNickNameModal
            v-on:close="closeNicknameModal"
    ></nick-name-modal>
  </div>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import Avatar from '@/components/Avatar.vue';
    import NickNameModal from '@/components/NickNameModal.vue';
    import Common from "../../../../../service/common/CommonService";
    import {abUtils} from "../../../../../common/utils";

    export default {
        name: "TradeListItem",
        components:{Avatar, NickNameModal},
        data: () => ({
            toValue : '',
            fromValue : '',
            tradePW : '',       // Trade Password
            rankSrc : '',
            verify_warning_toValue: "",
            verify_warning_fromValue: "",
            verify_warning_tradePassword: "",
            do_not_trade_message: "",         // trade 충족이 안돼면 어떤 이유인지 알려주는 string.
            can_not_trade : false,            //merchant가 올린 요건이 충족 안될경우 true로 trade버튼을 가려줌.
            warning_toValue: false,
            warning_fromValue: false,
            warning_tradePassword: false,

            showNickNameModal : false,        //nickname modal을 띄울려면 true로.
            clickToAll: false,              //tovalue부분의 input에 All button이 올라가 있게
            clickFromAll: false,            //fromvalue부분의 input에 All button이 올라가 있게
            currency: MainRepository.TradeView.getSelectFilter().currency,
            cryptocurrency : MainRepository.TradeView.getSelectFilter().cryptocurrency,
            marketPrice: '',
            tempMarketPrice: '',

        }),
        props : {
            user: {},
        },
        computed : {
            isMobile(){
                return MainRepository.State.isMobile();
            },
            //item 하나씩만 선택하기 위한 원격 drawer
            drawer(){
                return (MainRepository.TradeView.getDrawer() == this.user.adNo);
            },
            setNickName(){
                //nickname 설정이 필요하면 false, 설정이미 했으면 true
                return (MainRepository.Login.getUserInfo().nickname !== '')
            }

        },
        methods : {
            onNumberCheck(type){
                if(type ==='toValue'){
                    if (this.toValue >this.user.maxLimit) { // || this.toValue < this.user.minLimit 나중에 추가할것.
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
                    //fromvalue 계산해줌
                    this.fromValue = this.toValue/this.user.fixedPrice;
                    this.fromValue = this.fromValue.toFixed(6);         //소수점 6번째자리까지

                }else if(type ==='fromValue'){
                    let tempTovalue = this.fromValue* this.user.fixedPrice;
                    if ( tempTovalue > this.user.maxLimit) { // || this.toValue < this.user.minLimit 나중에 추가할것.
                        this.verify_warning_fromValue = Vue.prototype.$str("Enter less than maximum limit");
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
                    //toValue 계산해줌
                    this.toValue = this.fromValue * this.user.fixedPrice;
                    this.toValue = this.toValue.toFixed(2);         //소수점 2번째자리까지

                }else if(type ==='tradePW'){
                    this.onChecktradePassword();

                }

            },
            goTrade(){
                if (this.onChecktoValue() && this.onCheckfromValue()) {
                    let res = MainRepository.TradeView.createOrder(
                        this.user.adNo,                           //adNo
                        this.toValue,                             //amount
                        this.fromValue,                           //coinCount
                        MainRepository.Login.getUserInfo().memberNo,//customerMemberNo
                        this.user.memberNo,                       //merchantMemberNo
                        this.user.fixedPrice,                     //price
                        this.tradePW                              //tradePassword
                    );
                    if(res == true){
                      switch (this.user.tradeType) {
                          case 'Buy':
                              console.log('buy로 ㄱㄱ');
                              this.$router.push("/buy");
                              break;

                          case 'Sell':
                              //sell 모드 일때는 trade password를 추가로 검증해야함.
                              if(this.onChecktradePassword()){
                                  this.$router.push("/sell");
                                  break;
                              }
                      }
                    }
                    else{
                        console.log('res는 false');
                    }
                }
            },
            //trade modal에서 input에서 All 버튼 누를때
            fillAll(){
                this.clickToAll = false;
                this.clickFromAll = false;
                //차후 내 잔고 불러와 마진고려해 수정해야함
                if(this.user.volumeAvailable*this.user.fixedPrice > this.user.maxLimit){
                    this.toValue = this.user.maxLimit
                }
                else{this.toValue = this.user.volumeAvailable;}
                this.warning_toValue = false;
                this.warning_fromValue = false;

                //fromvalue 계산해줌
                this.fromValue = this.toValue/this.user.fixedPrice;
                this.fromValue = this.fromValue.toFixed(6);         //소수점 6번째자리까지

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
            closeNicknameModal(){
                this.showNickNameModal = false;
            },
            onChecktoValue(){
                //All 버튼 없애기.
                this.clickToAll = false;
                if(this.toValue === ""){
                    this.warning_toValue = true;
                    this.verify_warning_toValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    return false;
                }
                if(this.toValue< this.user.minLimit){
                    this.warning_toValue = true;
                    this.verify_warning_toValue = Vue.prototype.$str("Enter more than minimum limit");
                    return false;
                }
                if(this.toValue> this.user.maxLimit){
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
                let tempTovalue = this.fromValue* this.user.fixedPrice;
                if (this.fromValue === "" ||  tempTovalue > this.user.maxLimit) {
                    this.verify_warning_fromValue = Vue.prototype.$str("Please_enter_a_vaild_number");
                    this.warning_fromValue = true;
                    return false;
                }
                if(this.fromValue > this.user.volumeAvailable){
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
            //원격 Drawer를 향해 set 해줌
            changeDrawer(){
                /////////////login 안했을때 login창으로 돌려보냄////////
                MainRepository.Users.isUserActive({
                    email : MainRepository.Login.getUserInfo().email
                },function (result) {
                    return result
                })
                /////////////////////////////////
                MainRepository.TradeView.setchangeDrawer(this.user.adNo);
            },
            goUserPage(){
                this.$router.push("/userpage");
            },

        },
        created(){
            //  trade를 막는 filter. 차후 백단 연결시 수정필요.
            //  mobile 인증 안했을때
            if(!this.user.counterpartyFilterMobileVerificationYn){
                this.do_not_trade_message += 'verify phone'
                this.can_not_trade = true;
            }
            // advanced 인증 안했을때.
            if(!this.user.counterpartyFilterAdvancedVerificationYn){
                if(!this.do_not_trade_message == ''){
                    this.do_not_trade_message +='/ '
                }
                this.do_not_trade_message += 'adv. verification'
                this.can_not_trade = true;
            }
            //환율 및 유져 정보 get 필요
            let self = this;
            Common.info.getMarketPrice(function (data) {
                self.marketPrice = data;
            });
        },
        mounted(){
          switch (this.user.rank) {
              case 1:
                  this.rankSrc = require('../../../../../assets/img/rank_crown.png');
                  break;
              case 2:
                  this.rankSrc = require('../../../../../assets/img/rank_diamond.png');
                  break;
              default:
                  this.rankSrc = '';
          }

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
    left: 45% !important;
  }
  .premiumTooltip{
    width: 150px;
    left: 75% !important;
  }
  .certifiedTooltip{
    width: 150px;
    left: 75% !important;
    bottom: 160% !important;
  }

  .tradeWebModal{
    /*position: absolute;*/
    border-radius: 2px;
    padding-top: 24px;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    display: block;
    min-height: 171px;
    background-color: #ffffff;
    width: 100%;
    z-index: 1;
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
    /*position: absolute;*/
    display: block;
    z-index: 1;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    padding-top: 24px;
    padding-bottom: 24px;
  }

  .currencyPlaceholderBtn {
    display: block;
  }

</style>