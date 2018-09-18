<template>
  <div>
    <v-flex xs12>
      <h2 class="title">{{$str('Custom Token Trade')}}</h2>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 class="selector-wrapper" >
      <span class="p-relative  ">
        <button @click.stop="showDropdown()" class="token-selector">
          <h2 class="mr-1 bold">{{ selectedCustomToken}}</h2>
          <i class="material-icons color-blue md-24 mt-1">keyboard_arrow_down</i>
        </button>
        <div class="dropdown-content scroll-space" v-if="isdropdown">
          <!-- 내 정보 list 버튼-->
          <div v-for="item in CustomTokenLists" class=" btn-blue-hover"
               @click.stop="clickedTokenItem(item)">
            {{item.tokenName}}
          </div>
        </div>
      </span>
    </v-flex>
    <div>
      <trade-center
              :message = "'customToken'"
      ></trade-center>
    </div>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    import TradeCenter from "../TradeCenter";
    export default {
        name: "CustomToken",
        components: {
            TradeCenter

        },
        data: () => ({
            isdropdown : false,
            selectedCustomToken : '...',
            tokenNo : '',
        }),
        computed:{
            CustomTokenLists(){
                return MainRepository.TradeView.getCustomTokenList();
            }
        },
        created(){

            //URL로 tokenNo 받기
            let currentURL = window.location.href
            let param = currentURL.split('?');
            this.tokenNo = param[1];
            //해당Custom Ad를 뿌려주기 위해 customTokenNo를 vuex에 set 해주기.
            MainRepository.MyToken.setCustomTokenNo(this.tokenNo);
            //customToken들 list 불러오기
            MainRepository.TradeView.loadCustomTokenList(()=>{
              this.selectedCustomToken = MainRepository.MyToken.controller().findCustomToken(Number(this.tokenNo), 'no').tokenName
            })
        },
        methods: {
            //새로고침시 동작하게 하면 됨
            showDropdown(){
              this.isdropdown = !this.isdropdown;
            },
            clickedTokenItem(item){
              this.showDropdown();
              this.selectedCustomToken = item.tokenName;
              this.tokenNo = item.tokenNo;

              MainRepository.MyToken.setCustomTokenNo(item.tokenNo);
              MainRepository.TradeView.load(()=>{});
              //계속 url을 업데이트 쳐줘야하므로 router push를 함.
              MainRepository.router().goCustomTokenTrade(item.tokenNo);
            },
        }
    }
</script>

<style scoped>

  /* 웹에서 최대 size 주기*/
  @media only screen and (min-width: 960px) {
    .selector-wrapper{
      text-align: left;
      padding-top: 32px;
      /*기존의 tradecenter의 margin-top이 48이므로 디자인상 갭을 줄이기 위함*/
      margin-bottom: -38px;
    }
  }

  /* mobile 에서 gutter 주기*/
  @media only screen and (max-width: 959px) {
    .selector-wrapper{
      text-align: center;
      padding-top: 32px;
      /*기존의 tradecenter의 margin-top이 48이므로 디자인상 갭을 줄이기 위함*/
      margin-bottom: -24px;
    }

    .dropdown-content{
      left: -24px !important;
    }
  }

  .token-selector {
    cursor: pointer;
    display: inline-flex;
  }
  .title{
    text-align: left;
    font-weight : 700;
    margin-top: 48px;
    margin-bottom: 24px;
  }
  .scroll-space {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    max-height: 336px;
  }

  .dropdown-content {
    position: absolute;
    color: black;
    min-width: 128px;
    max-height: 204px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    z-index: 1;
    border-radius: 2px;
    left:0;
    text-align: left;
    background-color: white;
  }
  .dropdown-content > div{
    cursor: pointer;
    padding-right: 16px;
    padding-left: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    text-align: left;
  }
</style>