<template>
  <div>
    <v-flex xs12>
      <h2 class="title">{{$str('Custom Token Trade')}}</h2>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 text-md-left text-xs-center>
      <h4 class="p-relative mt-4a" >
        <button @click.stop="showDropdown()" class="cs-flex">
          <span class="mr-1">{{ selectedCustomToken}}</span>
          <i class="material-icons color-blue md-24 ">keyboard_arrow_down</i>
        </button>
        <div class="dropdown-content scroll-space" v-if="isdropdown">
          <!-- 내 정보 list 버튼-->
          <div v-for="item in CustomTokenLists" class=" btn-blue-hover"
               @click.stop="clickedTokenItem(item)">
            {{item.tokenName}}
          </div>
        </div>
      </h4>
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
            selectedCustomToken : '',
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
            leaving(){
              this.$router.replace('/customTokenTrade?'+this.tokenNo);
            },
            showDropdown(){
              this.isdropdown = !this.isdropdown;
            },
            clickedTokenItem(item){
              this.showDropdown();
              this.selectedCustomToken = item.tokenName;
              this.tokenNo = item.tokenNo;
              MainRepository.MyToken.setCustomTokenNo(item.tokenNo);
              MainRepository.TradeView.load(()=>{});
            },
        }
    }
</script>

<style scoped>
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
    min-width: 46px;
    max-height: 204px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
    z-index: 1;
    border-radius: 2px;
    text-align: center;
    background-color: white;
  }
  .dropdown-content > div{
    cursor: pointer;
    padding-right: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 14px;
    text-align: center;
  }
</style>