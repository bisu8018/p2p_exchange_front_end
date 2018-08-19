<template>
  <div>
    <v-layout row wrap mt-5>
      <!--header-->
      <v-flex md6 xs12 mb-4a text-xs-left>
        <h2 class="bold">{{$str("Balances")}}</h2>
      </v-flex>
      <!--toolBox들.-->
      <v-flex md6 xs12 text-xs-left text-md-right >
        <v-layout row wrap justify-space-between>
          <div class="mb-2">
            <span class="dropbtn" @mouseover="showDropdown('on')">
              <span class="color-darkgray mr-1 ">{{$str("Estimated_Value")}}：</span>
              <span >0.00000 BTC </span>
              <span >≈ 0.00000</span>
              <span class="ml-4 p-relative color-blue">
                <span>{{selectedCurrency}}</span>
                <i class="material-icons comp-select-currencybox-icon ">arrow_drop_down</i>
                <div class="dropdown-content" v-if="isdropdown">
                  <!-- 내 정보 list 버튼-->
                  <div v-for="currency in currencyLists" class=" btn-blue-hover pr-3 pl-3 pt-2 pb-2 c-pointer"
                       @click="clickedCurrency(currency.name)">
                    {{currency.name}}
                  </div>
                </div>
              </span>
            </span>
          </div>
          <div class="mb-4a">
            <span class="color-darkgray mr-2">{{$str("Security_Deposit")}}:</span>
            <span> 000000</span>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>


    <!--BalanceList-->
    <!--좌우 padding 맞추기용.-->
    <v-flex>
      <div class="cs-roundborder">
        <div  v-for="tokenlist in tokenLists" >
          <!--좌우 padding 맞춰주기 위해 사용.-->
          <v-flex>
            <balance-token-list
                  :tokenlist="tokenlist"
            ></balance-token-list>
          </v-flex>
          <v-divider></v-divider>
        </div>
      </div>
    </v-flex>

    <v-layout row wrap mt-5 mb-3>
      <!--Detail header-->
      <v-flex md8 xs12 text-xs-left mb-4>
        <h3 class="bold">{{$str("Details")}}</h3>
      </v-flex>

      <!--search filter -->
      <v-flex md4 xs12 p-relative mb-2>
        <v-layout row wrap class="statusBox">
          <div class="color-darkgray  p-relative  ma-2 d-inline-block"
               v-if=" selectedDate === '' && selectedType === '' && selectedToken === ''">
            {{$str("balanceDetailsFilterPlaceholder")}}</div>
          <div class="statusChip" v-if="selectedDate != ''">
            <v-layout align-center row fill-height>
            {{selectedDate}}
              <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('date')">close</i>
            </v-layout>
          </div>
          <div class="statusChip" v-if="selectedType != ''">
            <v-layout align-center row fill-height>
              {{selectedType}}
              <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('type')">close</i>
            </v-layout>
          </div>
          <div class="statusChip" v-if="selectedToken != ''">
            <v-layout align-center row fill-height>
              {{selectedToken}}
              <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('coin')">close</i>
            </v-layout>
          </div>
          <!-- 필터 펼치기 버튼 -->
          <v-spacer></v-spacer>
          <i class="material-icons color-darkgray filter-img p-absolute c-pointer"
             @click.stop="isModal = !isModal">filter_list</i>
        </v-layout>

        <!--필터링 card modal-->
        <div class="cardModal cardModalMobile"  v-if="isModal">
          <v-layout row wrap>

            <v-flex xs12 text-xs-left cardText>{{$str("date")}}</v-flex>
            <!--date 셀렉터-->
            <v-flex xs12 >
              <div>
                <date-picker v-on:date="onDate" :clear="clear"></date-picker>
              </div>
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
          <!-- clear, cancel, search 버튼-->
          <v-flex text-xs-right mt-4>
            <v-layout>
              <button class="btn-rounded-white text-white-hover" @click="onClear" >
                <h6>{{$str("clear")}}</h6>
              </button>
              <!--좌우 정렬을 위한 spacer.-->
              <v-spacer></v-spacer>
              <button class="btn-rounded-white text-white-hover mr-3" @click="isModal = false" >
                <h6>{{$str("cancel")}}</h6>
              </button>
              <button class="btn-rounded-blue btn-blue-hover" @click="onSearch" >
                <h6>{{$str("search")}}</h6>
              </button>
            </v-layout>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>


    <!-- Web 일때-->
    <div v-if="!isMobile">
      <!-- 표의 header들은 Web일때만 보여짐 -->
      <v-layout mb-3 color-darkgray>
        <v-flex  md2 text-md-left>{{$str("Type")}}</v-flex>
        <v-flex  md2 text-md-left>{{$str("Coin")}}</v-flex>
        <v-flex  md2 text-md-left>{{$str("time")}}</v-flex>
        <v-flex  md2 text-md-right>{{$str("amount")}}</v-flex>
        <v-flex  md2 text-md-right>{{$str("status")}}</v-flex>
        <v-flex  md2 text-md-right>{{$str("action")}}</v-flex>
      </v-layout>
      <v-flex><v-divider></v-divider></v-flex>
    </div>
    <!--BalanceList-->
    <div  v-for="detailList in detailLists" >
      <balance-detail-list
              :detailList="detailList"
      ></balance-detail-list>
      <v-flex><v-divider></v-divider></v-flex>
    </div>
  <div class="mt-4">
    <Pagination
            :size="pageSize"
            :type="pageType"
    ></Pagination>
  </div>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue';
    import ListFilter from '@/components/ListFilter.vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import BalanceTokenList from "./balanceList/BalanceTokenList"
    import BalanceDetailList from "./balanceList/BalanceDetailList"
    import DatePicker from '@/components/DatePicker.vue';
    export default {
        name: "Balances",
        components: {
            Pagination,
            ListFilter,
            BalanceTokenList,
            BalanceDetailList,
            DatePicker,
        },
        data: () => ({
            pageSize: 10,
            pageType: 'balance',
            alertStatus : '',
            isdropdown : false,
            currency : 'CNY',
            isAmout : true,
            isModal: false,
            country: 'China',
            paymentMethod: 'All Payments',
            amount : '',
            selectedDate : '',
            selectedType : '',
            selectedToken: '',
            selectedCurrency : 'CNY',
            clear: null,
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
                // {name : 'USDT'},
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
                // {
                //     logo: 'USDT',
                //     name: 'USDT',
                //     OtcAvailable: 66.0,
                //     OtcFrozen: 224,
                //     ExAvailable: 44.0,
                //     ExFrozen : 1234,
                // },
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
                    type: 'Withdrawal',
                    coin: 'BTC',
                    time: '2018-07-03 18:53:08',
                    amount: 224,
                    status: 'Under examination',
                    address: 'abcdabcdacbdasdfjkqlwer',
                    tag : '123456789',
                    TxID: 'ancbdsaqwer',
                    fee: '1000',
                    processingTime: '2018-08-12 16:48:23',
                },
                {
                    type: 'Sell',
                    coin: 'BTC',
                    time: '2018-07-03 18:53:08',
                    amount: 224,
                    status: 'Completed',
                    address: 'abcdabcdacbdasdfjkqlwer',
                    tag : '123456789',
                    TxID: 'ancbdsaqwer',
                    fee: '1000',
                    processingTime: '2018-08-12 16:48:23',
                },
                {
                    type: 'Buy',
                    coin: 'BTC',
                    time: '2018-07-03 18:53:08',
                    amount: 224,
                    status: 'Completed',
                    address: 'abcdabcdacbdasdfjkqlwer',
                    tag : '123456789',
                    TxID: 'ancbdsaqwer',
                    fee: '1000',
                    processingTime: '2018-08-12 16:48:23',
                },
                {
                    type: 'Deposit',
                    coin: 'BTC',
                    time: '2018-07-03 18:53:08',
                    amount: 224,
                    status: 'Under examination',
                    address: 'abcdabcdacbdasdfjkqlwer',
                    tag : '123456789',
                    TxID: 'ancbdsaqwer',
                    fee: '1000',
                    processingTime: '2018-08-12 16:48:23',
                },
            ],

        }),
        created() {
            // 로그인 확인 -> Login 으로
            if (!MainRepository.Login.isLogin()) {
                MainRepository.router().goLogin();
                return;
            }
        },
        mounted() {

        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
        methods: {
            onDate(value) {
                this.selectedDate = value;
            },
            onClear() {
                this.selectedDate = '';
                this.selectedType = '';
                this.selectedToken = '';

            },
            onSearch(){
                this.isModal = false;
            },
            chipDelete (type) {
                switch (type) {
                    case 'date':
                        this.selectedDate = '';
                        break;
                    case 'type':
                        this.selectedType = '';
                        break;
                    case 'coin':
                        this.selectedToken = '';
                        break;
                }
            },
            clickedCurrency(item){
                this.selectedCurrency = item;
                this.isdropdown = false;
                console.log(this.selectedCurrency);
            },
            showDropdown(){
                 this.isdropdown = true;
                console.log(this.isdropdown);
            }

        }


    }
</script>

<style scoped>
  .select-currencybox{
    cursor: pointer;
    overflow: scroll;
    color: #214ea1;
    outline:0;
  }
  .select-currencybox:checked{
    color: #353535;

  }
  .select-currencybox:target{

  }

  .comp-select-currencybox-icon{
    position: absolute;
    right: -20px;
    top: 0px;

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
  .cardModal:before{
    content: '';
    position: absolute;
    border-style: solid;
    bottom: 100.3%;
    left: 95%;
    margin-left: -8px;
    width: 0; height: 0;
    border-width: 10px;
    border-bottom: 8px solid  #ffffff;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-color: transparent transparent #d8d8d8 transparent ;
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
    cursor: pointer;
  }

  .statusChip:hover{
    opacity: 0.8;
  }

  .filter-img {
    right: 20px;
    top: 8px;
  }
  .cs-roundborder{
    border-radius: 2px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
  }

  .dropbtn {
    border: none;
    cursor: pointer;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    color: black;
    min-width: 46px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    z-index: 1;
    border-radius: 2px;
    text-align: center;
    background-color: white;
    left: -15px;
  }
  :hover.dropbtn .dropdown-content{
    display: block;
  }


</style>