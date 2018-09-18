<template>
<div>
  <v-layout row wrap mt-4a mb-3>
    <!--Detail header-->
    <v-flex md8 xs12 text-xs-left mb-4>
      <h3 class="bold">{{$str("Details")}}</h3>
    </v-flex>

    <!--search filter -->
    <v-flex md4 xs12 p-relative mb-2>
      <v-layout row wrap class="statusBox">
        <div class="color-darkgray  p-relative  ma-2 d-inline-block"
             v-if=" (start_date === '' || start_date === undefined) && (end_date === '' || end_date === undefined)
                && selectedType === '' && cryptocurrency === ''">
          {{$str("walletDetailsFilterPlaceholder")}}</div>
        <div class="statusChip" v-if="start_date != ''">
          <v-layout align-center row fill-height>
            {{start_date}} - {{end_date}}
            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('date')">close</i>
          </v-layout>
        </div>
        <div class="statusChip" v-if="selectedType != ''">
          <v-layout align-center row fill-height>
            {{$str(selectedType)}}
            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('type')">close</i>
          </v-layout>
        </div>
        <div class="statusChip" v-if="cryptocurrency != ''">
          <v-layout align-center row fill-height>
            {{cryptocurrency}}
            <i class="h5 material-icons ml-2 close-icons c-pointer" @click="chipDelete('cryptocurrency')">close</i>
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

          <v-flex xs12 text-xs-left text-black mb-2>{{$str("start")}} {{$str("date")}}</v-flex>
          <v-flex xs12 mb-4>
            <date-picker :classname = 'startdateclass' v-on:date="onStartDate" :clear="clear" v-on:switch="clear = 'on'"></date-picker>
          </v-flex>
          <!--end date-->
          <v-flex xs12 text-xs-left text-black mb-2>{{$str("end")}} {{$str("date")}}</v-flex>
          <v-flex xs12>
            <date-picker :classname = "enddateclass" v-on:date="onEndDate" :clear="clear" v-on:switch="clear = 'on'"></date-picker>
          </v-flex>

          <!-- Type 셀렉터-->
          <v-flex xs12 text-xs-left cardText  >{{$str("Type")}}</v-flex>
          <v-flex xs12 >
            <div class="p-relative">
              <select v-model="modal_selectedType"  class="comp-selectbox">
                <option v-for="type in types" v-bind:value="type.name" >{{$str(type.name)}}</option>
              </select>
              <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
            </div>
          </v-flex>
          <!-- cryptocurrency 셀렉터-->
          <v-flex xs12 text-xs-left class="cardText" >{{$str("cryptoCurrency")}}</v-flex>
          <v-flex xs12 >
            <div class="p-relative">
              <select v-model="modal_cryptocurrency"  class="comp-selectbox">
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
      <v-flex  md2 text-md-left>{{$str("cryptoCurrency")}}</v-flex>
      <v-flex  md2 text-md-left>{{$str("time")}}</v-flex>
      <v-flex  md2 text-md-right>{{$str("amount")}}</v-flex>
      <v-flex  md2 text-md-right>{{$str("status")}}</v-flex>
      <v-flex  md2 text-md-right>{{$str("action")}}</v-flex>
    </v-layout>
    <v-flex><v-divider></v-divider></v-flex>
  </div>
  <v-progress-circular v-if="showProgress" indeterminate class="color-blue list_progress"/>
  <!--detailList-->
  <div v-if="haveItems&& !showProgress">
    <div  v-for="detailList in detailLists" >
      <wallet-detail-list-item
              :detailList="detailList"
      ></wallet-detail-list-item>
      <v-flex><div class="divider"></div></v-flex>
    </div>
    <div class="mt-4">
      <Pagination
              :size="pageSize"
              :type="pageType"
      ></Pagination>
    </div>
  </div>
  <!-- 해당되는 item이 1개도 없을때-->
  <div v-else-if="!showProgress">
    <div class="sprite-img ic-no-ad-lg no-more-ads">
    </div>
    <div class="color-gray no-more-ads-text">
      {{$str("No more history")}}
    </div>
  </div>
</div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue';
    import ListFilter from '@/components/ListFilter.vue';
    import WalletDetailListItem from "./item/WalletDetailListItem"
    import DatePicker from '@/components/DatePicker.vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abUtils} from "../../../../../common/utils";
    import Common from "../../../../../service/common/CommonService";
    export default {
        name: "WalletDetail",
        components: {
            Pagination,
            ListFilter,
            WalletDetailListItem,
            DatePicker,
        },
        data: () => ({
            pageSize: 8,
            pageType: 'wallet',
            showProgress : false,
            start_date: "",
            end_date: "",
            selectedType : '',
            cryptocurrency: '',
            modal_start_date: "",
            modal_end_date: "",
            modal_selectedType: "",
            modal_cryptocurrency: "",
            clear: null,
            isModal: false,
            isAmout : true,
            startdateclass : 'startdateclass',
            enddateclass : 'enddateclass',types : [
                {name : 'Buy'},
                {name : 'Sell'},
                {name : 'Deposit'},
                {name : 'Withdraw'},
            ],
            tokens : [
                {name : 'BTC', fullname: 'bitcoin'},
                {name : 'ETH', fullname: 'ethereum'},
                {name : 'AllB', fullname: 'allb'},
            ],
            walletInterval: {},
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            detailLists(){
                return MainRepository.Wallet.getWalletHistories();
            },
            haveItems(){
                return (MainRepository.Pagination.getTotalCount() >0)
            },
        },
        created(){
            MainRepository.Wallet.initHistory();
            this.showProgress = true;

            let urlParam = this.getUrlParam();
            //tokenlist에서 넘어올때
            if (urlParam !== '') {
                MainRepository.Wallet.updateHistoryPage({
                    cryptocurrency: urlParam,
                });
                this.cryptocurrency = urlParam;
                this.modal_cryptocurrency = urlParam;
            }

            MainRepository.MarketPrice.load(() => {
                MainRepository.Wallet.loadHistory(() => {
                    this.showProgress = false;
                });
            })
            // 5초에 1번씩 불러옴
            this.walletInterval = setInterval(() => {
                MainRepository.MarketPrice.load(() => {
                    MainRepository.Wallet.loadHistory(() => {});
                });
            }, 5000);
        },
        beforeDestroy(){
            MainRepository.Wallet.initHistoryData();
            clearInterval(this.walletInterval);
        },
        methods:{
            getUrlParam() {
                let currentURL = window.location.href;
                let params = currentURL.split('?');

                if (params[1]) {
                    return params[1];
                } else {
                    return '';
                }
            },
            toMoneyFormat(value) {
                return abUtils.toMoneyFormat(String(value));
            },
            onStartDate(value) {
                this.modal_start_date = value;
            },
            onEndDate(value) {
                this.modal_end_date = value;
            },
            onClear() {
                this.modal_start_date = ""
                this.modal_end_date = ""
                this.modal_selectedType = ""
                this.modal_cryptocurrency = ""
            },
            onSearch(){
                //Axios 태우기
                MainRepository.Wallet.updateHistoryPage({
                    searchStartTime : this.modal_start_date,
                    searchEndTime : this.modal_end_date,
                    type : this.modal_selectedType,
                    cryptocurrency : this.modal_cryptocurrency,
                });
                this.start_date = this.modal_start_date;
                this.end_date = this.modal_end_date;
                this.selectedType = this.modal_selectedType;
                this.cryptocurrency = this.modal_cryptocurrency;
                this.isModal = false;
            },
            chipDelete (type) {
                switch (type) {
                    case 'date':
                        this.start_date = '';
                        this.modal_start_date = '';
                        this.end_date = '';
                        this.modal_end_date = '';
                        break;
                    case 'type':
                        this.selectedType = '';
                        this.modal_selectedType = ''
                        break;
                    case 'cryptocurrency':
                        this.cryptocurrency = '';
                        this.modal_cryptocurrency = '';
                        break;
                }
                MainRepository.Wallet.updateHistoryPage({
                    searchStartTime : this.modal_start_date,
                    searchEndTime : this.modal_end_date,
                    type : this.modal_selectedType,
                    cryptocurrency : this.modal_cryptocurrency,
                });
            },
        }



    }
</script>

<style scoped>
  /* mobile 에서*/
  @media only screen and (max-width: 959px) {
    .cardModalMobile {
      width: 100%;
      left: 0%;
    }
    .no-more-ads{
      margin: 48px auto 16px auto;
    }

  }

  /* 웹에서*/
  @media only screen and (min-width: 960px) {
    .no-more-ads{
      margin: 120px auto 16px auto;
    }
    .no-more-ads-text{
      margin-bottom: 56px;
    }
  }
  .statusBox{
    min-height: 40px;
    border-radius: 2px;
    border: solid 1px #8d8d8d;
    width: 100%;
    padding-right: 4px;
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
  .cardText{
    margin-top: 24px;
    margin-bottom: 8px;
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

  .list_progress {
    margin-top: 80px;
  }
</style>