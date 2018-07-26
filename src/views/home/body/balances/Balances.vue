<template>
  <div>
    <v-layout row wrap mt-5>
      <!--header-->
      <v-flex md6 xs12 mb-4a pl-0 text-xs-left>
        <h2 class="bold">{{$str("Balances")}}</h2>
      </v-flex>
      <!--search filter 추가할것-->
      <v-flex md6 xs12 text-xs-left text-md-right pr-0>
        <v-layout row wrap justify-space-between>
          <div class="mb-2">
            <span class="color-darkgray mr-1">Estimated Value：</span>
            <span >0.00000 BTC </span>
            <span >≈ 0.00000</span>
            <span class="ml-4 p-relative" >
              <select v-model="currency"  class="select-currencybox">
                <option v-for="currencyList in currencyLists" v-bind:value="currencyList.name" >{{currencyList.name}}</option>
              </select>
              <i class="material-icons comp-select-currencybox-icon ">arrow_drop_down</i>
            </span>
          </div>

          <div class="mb-4a">
            <span class="color-darkgray mr-2">Security Deposit:</span>
            <span> 000000</span>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>



    <!--BalanceList-->
    <div  v-for="tokenlist in tokenLists" >
      <balance-token-list
              :tokenlist="tokenlist"
      ></balance-token-list>
    </div>

    <v-layout row wrap mt-5 mb-4a>
      <!--Detail header-->
      <v-flex md8 xs12 text-xs-left>
        <h3 class="bold">{{$str("Details")}}</h3>
      </v-flex>

      <!--search filter -->
      <v-flex md4 xs12 p-relative>
        <v-layout row class="statusBox">
            <h6 class="statusChip" >{{selectedTime}}</h6>
            <h6 class="statusChip">{{selectedType}}</h6>
            <h6 class=" statusChip">{{selectedToken}}</h6>
            <h6 class="statusChip " v-if="amount!=0" v-model="isAmout"
                 @input="removeAmount" >{{amount}}</h6>
            <!-- 필터 펼치기 버튼 -->
            <v-spacer></v-spacer>
            <button @click.stop="isModal = !isModal">
              <i class="material-icons color-darkgray" >filter_list</i>
            </button>
        </v-layout>

        <!--필터링 card modal-->
        <div class="cardModal cardModalMobile"  v-if="isModal">
          <v-layout row wrap>

            <v-flex xs12 text-xs-left cardText>{{$str("Date")}}</v-flex>
            <!--date 셀렉터-->
            <v-flex xs12 >
              <v-layout comp-selectbox p-relative>
                <h6>{{$str('Please_select_date')}}</h6>
                <i class="material-icons comp-selectbox-icon">calendar_today</i>
              </v-layout>
            </v-flex>

            <!-- Type 셀렉터-->
            <v-flex xs12 text-xs-left cardText  >{{$str("Type")}}</v-flex>
            <v-flex xs12 >
              <div class="p-relative">
                <select v-model="selectedType"  class="comp-selectbox">
                  <option v-for="type in types" v-bind:value="type.name" >{{type.name}}</option>
                </select>
                <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
              </div>
            </v-flex>
            <!-- Coin 셀렉터-->
            <v-flex xs12 text-xs-left cardText >{{$str("Coin")}}</v-flex>
            <v-flex xs12 >
              <div class="p-relative">
                <select v-model="selectedToken"  class="comp-selectbox">
                  <option v-for="token in tokens" v-bind:value="token.name" >{{token.name}}</option>
                </select>
                <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
              </div>
            </v-flex>
          </v-layout>
          <!-- cancel, search 버튼-->
          <v-flex text-xs-right mt-4>
            <button class="btn-rounded-white text-white-hover" @click="" >{{$str("clear")}} </button>
            <button class="btn-rounded-white text-white-hover mr-3 ml-3" @click="isModal = false" >{{$str("cancel")}} </button>
            <button class="btn-rounded-blue btn-blue-hover" @click="onSearch" >{{$str("search")}} </button>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>


    <!-- Web 일때-->
    <div v-if="!isMobile">
      <!-- 표의 header들은 Web일때만 보여짐 -->
      <v-layout mb-3 color-darkgray>
        <v-flex  md3 text-md-left>{{$str("Type")}}</v-flex>
        <v-flex  md3 text-md-left>{{$str("Coin")}}</v-flex>
        <v-flex  md3 text-md-left>{{$str("time")}}</v-flex>
        <v-flex  md3 text-md-right>{{$str("amount")}}</v-flex>
      </v-layout>
      <v-divider></v-divider>
    </div>

    <!--BalanceList-->
    <div  v-for="detailList in detailLists" >
      <balance-detail-list
              :detailList="detailList"
      ></balance-detail-list>
      <v-divider></v-divider>
    </div>

    <Pagination></Pagination>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue';
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import BalanceTokenList from "./balanceList/BalanceTokenList"
    import BalanceDetailList from "./balanceList/BalanceDetailList"
    export default {
        name: "Balances",
        components: {
            Pagination,
            ListFilter,
            BalanceTokenList,
            BalanceDetailList
        },
        data: () => ({
            currency : 'CNY',
            isAmout : true,
            isModal: false,
            country: 'China',
            currency: 'CNY',
            paymentMethod: 'All Payments',
            amount : '',
            selectedTime : 'Time',
            selectedType : 'Type',
            selectedToken: 'Coin',
            types : [
                {name : 'Buy'},
                {name : 'Sell'},
                {name : 'Transfer In'},
                {name : 'Transfer Out'},
                {name : 'Deposit'},
                {name : 'Legal service fee'},
            ],
            tokens : [
                {name : 'BTC'},
                {name : 'ETH'},
                {name : 'USDT'},
                {name : 'ALLB'},
            ],
            currencyLists : [
                {name : 'CNY'},
                {name : 'USD'},
                {name : 'SGD'},
                {name : 'INR'},
                {name : 'CAD'},
                {name : 'KRW'},
            ],

            tokenLists: [
                {
                    logo: 'BTC',
                    name: 'BTC',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
                {
                    logo: 'ETH',
                    name: 'ETH',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
                {
                    logo: 'USDT',
                    name: 'USDT',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
                {
                    logo: 'ALLB',
                    name: 'ALLB',
                    OtcAvailable: 66.0,
                    OtcFrozen: 224,
                    ExAvailable: 44.0,
                    ExFrozen : 1234,
                },
            ],
            detailLists: [
                {
                    type: 'Buy',
                    coin: 'BTC',
                    time: 66.0,
                    amount: 224,
                },
                {
                    type: 'Sell',
                    coin: 'BTC',
                    time: 66.0,
                    amount: 224,
                },
                {
                    type: 'Transfer Out',
                    coin: 'BTC',
                    time: 66.0,
                    amount: 224,
                },
            ],

        }),
        created() {

        },
        mounted() {

        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
        methods: {

        }


    }
</script>

<style scoped>
  .select-currencybox{
    cursor: pointer;
    overflow: scroll;

  }
  .comp-select-currencybox-icon{
    position: absolute;
    right: -18px;

  }

  .cardText{
    margin-top: 24px;
    margin-bottom: 8px;
  }
  .statusBox{
    min-height: 40px;
    border-radius: 2px;
    border: solid 1px #8d8d8d;
    width: 100%;
    padding-right: 4px;

  }
  .cardParent{
    position: relative;
  }
  .cardModal{
    z-index: 2;
    position: absolute;
    background-color: #ffffff;
    box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    padding: 16px 8px 24px 8px;
    width: 75%;
    left: 22%;
    top: 60px;

  }
  .cardModal:after{
    content: '';
    position: absolute;
    bottom: 100%;
    left: 95%;
    margin-left: -8px;
    width: 0; height: 0;
    border-bottom: 8px solid  #ffffff;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;

  }
  /* filter card 가 mobile에선 width 100이므로
  mobile에서만 추가 선언.*/
  @media only screen and (max-width: 959px) {
    .cardModalMobile{
      width: 100%;
      left: 0%;
    }
  }

  .selectDivider{
    border: solid 1px #d1d1d1;
    height: 56px;
    width: 2px;
    margin-left: auto;
    margin-right: auto;
  }
  .statusChip{
    height: 26px;
    border-radius: 2px;
    background-color: #9294a6;
    padding: 4px 8px 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 7px;
    margin-bottom: 7px;
  }
</style>