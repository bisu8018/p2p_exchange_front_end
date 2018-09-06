<template>
  <div>
    <!-- mobile 일때 -->
    <div v-if="isMobile">
      <v-layout row wrap>
        <v-flex xs12 text-xs-left mt-5 mb-4>
          <div v-if="merchant.email !== ''">
            <avatar :email="merchant.email"
                    class="f-left mr-3">
            </avatar>
          </div>
          <h5 class="ml-3">
            <v-layout>
              {{merchant.nickName}}
              <h5 class="userRank sprite-img ic-premium"></h5>
            </v-layout>
          </h5>
          <!--판매자 rank-->
          <h6 class="ml-3 color-darkgray">{{$str("accountCreatedTime")}}: {{transTime(merchant.createDatetime)}}</h6>
        </v-flex>
        <v-flex xs12><v-divider></v-divider></v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mt-3 mb-2>{{$str("Security_Deposit")}}</v-flex>
        <v-flex xs4 text-xs-right mt-3 mb-2>{{merchant.securityDeposit}} BTC</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>{{$str("Completion_rate")}}</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.completionRate}} % </v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>{{$str("Trades")}}</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.tradeTimes}} {{$str("Times")}}</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-2>{{$str("Trades_in_30_days")}}</v-flex>
        <v-flex xs4 text-xs-right mb-2>{{merchant.tradeMonthTimes}} {{$str("Times")}}</v-flex>
        <v-flex xs6 offset-xs2 text-xs-left color-darkgray mb-3>{{$str("Avg_release")}}</v-flex>
        <v-flex xs4 text-xs-right mb-3>{{merchant.avgRelease}} {{$str("Min")}}</v-flex>
        <v-flex xs12><v-divider></v-divider></v-flex>

        <v-flex xs3 offset-xs2 text-xs-left mt-4>
          <v-layout v-if="merchant.emailVerification" align-center>
            <h6>{{$str("email")}}</h6>
            <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
        <v-flex xs7 text-xs-right mt-4>
          <v-layout v-if="merchant.idVerification" justify-end align-center >
            <h6>{{$str("ID_Verification")}}</h6>
            <h6 class="ic-success-sm sprite-img ml-1 "></h6>
          </v-layout>
        </v-flex>
        <v-flex xs3 offset-xs2 text-xs-left mt-3>
          <v-layout v-if="merchant.phoneVerification" align-center >
            <h6>{{$str("phone")}}</h6>
            <h6 class="ic-success-sm sprite-img ml-1"></h6>
          </v-layout>
        </v-flex>
        <v-flex xs7 text-xs-right mt-3>
          <v-layout v-if="merchant.advancedVerification" justify-end align-center >
            <h6>{{$str("advancedVerification")}}</h6>
            <h6 class="ic-success-sm sprite-img ml-1 "></h6>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-progress-circular v-if="showProgress" indeterminate class="color-blue progress-circular list_progress"/>
      <div v-if="!showBlockView&& haveItem && !showProgress">
        <!--SELL-->
        <div v-if="haveSellList ">
          <v-flex xs12 text-xs-left mt-5 mb-2>
            <h3 class="bold">{{$str("Online_Buy")}}</h3>
          </v-flex>
          <div  v-for="user in SellLists" >
              <user-trade-item
                      :user="user"
              ></user-trade-item>
            <v-flex><v-divider></v-divider></v-flex>
          </div>
        </div>
        <!--Buy-->
        <div v-if="haveBuyList">
        <v-flex text-xs-left mt-5 mb-2>
          <h3 class="bold">{{$str("Online_Sell")}}</h3>
        </v-flex>
        <div  v-for="user in BuyLists">
          <user-trade-item
                  :user="user"
          ></user-trade-item>
          <v-flex><v-divider></v-divider></v-flex>
        </div>
      </div>
      </div>
      <v-flex v-else-if="!showProgress" >
        <div class="no-online-border">
          <div class="sprite-img ic-no-ad-lg no-more-ads"></div>
          <div class="color-gray ">
            {{$str("No Online advertisement")}}
          </div>
        </div>
      </v-flex>
      <v-flex text-xs-right color-darkgray mt-3 mb-5>
        <div v-if="!showBlockView">
          {{$str("Do_not_want_to_trade_with_this_user?")}}
          <span class="color-blue c-pointer" @click="showBlockModal = true"> {{$str("Block_this_user")}}</span>
        </div>
        <div v-else>
          {{$str("This user cannot access your ads or trade with you cause you have blocked him/her.")}}
          <span class="color-blue c-pointer" @click="UnblockThisUser()"> {{$str("Unblock this user")}}</span>
        </div>
      </v-flex>
    </div>
    <!--Web 일때-->
    <div v-else>
      <!--최 상단부 user정보-->
      <v-layout class="userWebList" align-center justify-center fill-height mt-5 mb-4>
        <v-flex  md3 text-md-left>
          <v-layout align-center>
            <div v-if="merchant.email !== ''">
              <avatar :email="merchant.email"
                      class="f-left mr-3">
              </avatar>
            </div>
            <span class="ml-3 ">
            {{merchant.nickName}}
            </span>
            <!--판매자 rank-->
            <span class="userRank sprite-img ic-premium"></span>
          </v-layout>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.securityDeposit}} BTC</div>
          <div class="color-darkgray">{{$str("Security_Deposit")}} </div>
        </v-flex>
        <!--limits-->
        <v-flex md2 text-md-left >
          <div>{{merchant.completionRate}} %</div>
          <div class="color-darkgray">{{$str("Completion_rate")}}</div>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.tradeTimes}} {{$str("Times")}}</div>
          <div class="color-darkgray">{{$str("Trades")}}</div>
        </v-flex>
        <v-flex md2 text-md-left >
          <div>{{merchant.tradeMonthTimes}} {{$str("Times")}}</div>
          <div class="color-darkgray">{{$str("Trades_in_30_days")}}</div>
        </v-flex>
        <v-flex md1 text-md-right >
          <div>{{merchant.avgRelease}} {{$str("Min")}}</div>
          <div class="color-darkgray"> {{$str("Avg_release")}}</div>
        </v-flex>
      </v-layout>
      <v-flex><v-divider></v-divider></v-flex>
      <!--2번째 줄-->
      <v-layout mt-3 mb-4a>
        <v-flex md3 text-md-left>
          <h6 class="color-darkgray">{{$str("accountCreatedTime")}} : {{transTime(merchant.createDatetime)}}</h6>
        </v-flex>
        <v-flex md9>
          <v-layout justify-end >
            <div v-if="merchant.emailVerification" class="vertical-center">
              <h6 class="veri_icon">{{$str("email")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 mr-4 veri_icon"></h6>
            </div>
            <div v-if="merchant.phoneVerification" class="vertical-center">
              <h6 class="veri_icon">{{$str("Phone")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 mr-4 veri_icon"></h6>
            </div>
            <div v-if="merchant.idVerification" class="vertical-center">
              <h6 class="veri_icon">{{$str("ID_Verification")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 mr-4 veri_icon"></h6>
            </div>
            <div v-if="merchant.advancedVerification" class="vertical-center">
              <h6 class="veri_icon">{{$str("Advanced_Verification")}}</h6>
              <h6 class="ic-success-sm sprite-img ml-1 veri_icon"></h6>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-progress-circular v-if="showProgress" indeterminate class="color-blue progress-circular list_progress"/>

      <div v-if="!showBlockView && haveItem && !showProgress">
        <div v-if="haveBuyList">
          <!--Online Sell title-->
          <v-flex text-md-left mb-4 bold>
            <h3>{{$str("Online_Sell")}}</h3>
          </v-flex>
          <!-- chart의 title들 -->
          <v-layout mb-3>
            <v-flex  md3 text-md-left color-darkgray>
              {{$str("Coin")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("Available")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("limits")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("price")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("paymentMethod")}}
            </v-flex>
            <v-flex  md1 text-md-right color-darkgray>
              {{$str("control")}}
            </v-flex>
          </v-layout>
          <v-flex><v-divider></v-divider></v-flex>

          <!-- user item list들 10개씩 출력-->
          <div v-for="user in BuyLists"  >
            <user-trade-item
                    :user ="user"
            ></user-trade-item>
            <v-flex><v-divider></v-divider></v-flex>
          </div>
        </div>
        <!--Online Buy title-->
        <div v-if="haveSellList">
          <v-flex text-md-left mb-4 mt-4a bold>
            <h3>{{$str("Online_Buy")}}</h3>
          </v-flex>
          <!-- chart의 title들 -->
          <v-layout mb-3>
            <v-flex  md3 text-md-left color-darkgray>
              {{$str("Coin")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("Available")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("limits")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("price")}}
            </v-flex>
            <v-flex  md2 text-md-left color-darkgray>
              {{$str("paymentMethod")}}
            </v-flex>
            <v-flex  md1 text-md-right color-darkgray>
              {{$str("control")}}
            </v-flex>
          </v-layout>
          <v-flex><v-divider></v-divider></v-flex>
          <!-- user item list들 10개씩 출력-->
          <div v-for="user in SellLists"  >
            <user-trade-item
                    :user ="user"
            ></user-trade-item>
            <v-flex><v-divider></v-divider></v-flex>
          </div>
        </div>
      </div>
      <v-flex v-else-if="!showProgress" >
        <div class="no-online-border">
          <div class="sprite-img ic-no-ad-lg no-more-ads"></div>
          <div class="color-gray ">
            {{$str("No Online advertisement")}}
          </div>
        </div>
      </v-flex>
      <v-flex text-md-right mt-3 mb-6>
        <div v-if="!showBlockView">
          {{$str("Do_not_want_to_trade_with_this_user?")}}
          <span class="color-blue c-pointer" @click="showBlockModal = true"> {{$str("Block_this_user")}}</span>
        </div>
        <div v-else>
          {{$str("This user cannot access your ads or trade with you cause you have blocked him/her.")}}
          <span class="color-blue c-pointer" @click="UnblockThisUser()"> {{$str("Unblock this user")}}</span>
        </div>
      </v-flex>
    </div>


    <v-dialog v-model="showBlockModal">
      <v-layout row wrap>
        <v-flex pl-3 pr-3 mb-4>
          <h3 class="bold f-left">{{$str("Notice")}}</h3>
          <button class="f-right"><i class="material-icons " @click="showBlockModal = false">close</i></button>
        </v-flex>
        <v-flex pl-3 pr-3 mb-4 text-xs-left>
          <h5 class="color-darkgray">{{$str("Block_user_explain")}}</h5>
        </v-flex>
        <v-flex pl-3 pr-3>
          <v-layout justify-end>
            <button class="btn-rounded-white text-white-hover" @click="showBlockModal = false">
              <h6 >{{$str("cancel")}}</h6>
            </button>
            <button class="btn-rounded-blue btn-blue-hover" @click="blockThisUser">
              <h6 >{{$str("confirm")}}</h6>
            </button>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-dialog>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import UserTradeItem from "./userTradeItem/UserTradeItem"
    import Avatar from '@/components/Avatar.vue';
    import {abUtils} from '@/common/utils';
    import MemberInfo from "../../../../../vuex/model/MemberInfo";

    export default {
        name: "UserPage",
        components: {UserTradeItem,Avatar,},
        data: () =>({
            showBlockModal : false,
            showUnBlockModal : false,
            showProgress : false,
            merchant: new MemberInfo('') ,
            BuyLists: [],
            SellLists: [],
            userMemberNo : '',
            blockThisMember : false,
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            haveBuyList(){
                return (this.BuyLists.length >0 );
            },
            haveSellList(){
                return (this.SellLists.length >0 );
            },
            showBlockView(){
                return this.blockThisMember
            },
            haveItem(){
                return (this.haveBuyList||this.haveSellList)
            }
        },
        created(){
            let currentURL = window.location.href
            let param = currentURL.split('?');
            this.userMemberNo = Number(param[1])
            let self = this;
            this.showProgress = true;
            //상단 과거 이력정보 5개
            MainRepository.Users.getUserPageHistoryInfo(
                {memberNo : self.userMemberNo},function (result) {
                    self.merchant.securityDeposit = result.securityDeposit
                    self.merchant.completionRate = result.completionRate
                    self.merchant.tradeTimes = result.tradeTimes
                    self.merchant.tradeMonthTimes = result.tradeMonthTimes
                    self.merchant.avgRelease = result.avgRelease
                })
            //상단 유저 인증정보
            MainRepository.Users.getOtherUsersbyMemberNo(
                    self.userMemberNo,function (result) {
                    self.merchant.email = result.email
                    self.merchant.nickName = result.nickName
                    self.merchant.createDatetime = result.createDatetime
                    self.merchant.emailVerification = result.emailVerification
                    self.merchant.phoneVerification = result.phoneVerification
                    self.merchant.idVerification = result.idVerification
                })
            //이 유저가 올린 ads 리스트
            MainRepository.Users.getUserPageAdsList(
                {memberNo : self.userMemberNo},function (result) {
                    self.BuyLists = result.BuyLists
                    self.SellLists = result.SellLists
                    self.showProgress = false;
                })
            // 나의 block 리스트 정보 GET
            if(MainRepository.MyInfo.isLogin()){
              MainRepository.MyPage.getBlockList(function (result) {
                  for(let key in result){
                    if(self.userMemberNo == result[key].blockMemberNo){

                        self.blockThisMember = true;
                    }
                }
              })
            }

        },
        methods:{
            transTime(time){
                return abUtils.toTimeFormat(time);
            },

            blockThisUser(){
                let self = this;
                MainRepository.Users.postBlockThisUser({
                        memberNo: MainRepository.MyInfo.getUserInfo().memberNo,
                        blockMemberNo: self.userMemberNo
                },function (result) {
                        self.showBlockModal = false;
                        self.blockThisMember = true;
                    }
                )

            },
            UnblockThisUser(){
                let self = this;
                MainRepository.Users.deleteBlockThisUser({
                    email: MainRepository.MyInfo.getUserInfo().email,
                    BlockMemberNo: self.userMemberNo
                }, function (result) {
                        self.showUnBlockModal = false;
                        self.blockThisMember = false;
                    }
                )

            }

        }
    }
</script>

<style scoped>
  .userWebList{

    position: relative;
    z-index: 0;
  }
  .userRank{
    max-width: 16px;
    height: 18px;
    margin-left: 16px;
  }
  .veri_icon{
    position: relative;
    display: inline-block;
  }
  .list_progress {
    margin-top: 80px;
  }

  .no-more-ads{
    margin: 0px auto 16px auto;
  }
  .no-online-border{
    border-radius: 2px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    padding-top: 112px;
    padding-bottom: 112px;
  }
  @media only screen and (max-width: 959px) {
    .no-online-border{
      margin-top: 48px;
    }
  }
</style>