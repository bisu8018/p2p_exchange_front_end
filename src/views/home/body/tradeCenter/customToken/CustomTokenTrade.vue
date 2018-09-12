<template>
  <div>
    <v-flex xs12>
      <h2 class="title">{{$str('Custom Token Trade')}}</h2>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12>
      <h4 class="ml-2 p-relative" >
        <div @click="showDropdown()">{{ selectedCustomToken}}
        <i class="material-icons color-blue md-24 ">keyboard_arrow_down</i>
        </div>
        <div class="dropdown-content scroll-space" v-if="isdropdown">
          <!-- 내 정보 list 버튼-->
          <div v-for="item in CustomTokenLists" class=" btn-blue-hover"
               @click.stop="clickedTokenItem(item)">
            {{item}}
          </div>
        </div>
      </h4>
    </v-flex>
  </div>
</template>

<script>
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "CustomToken",
        components: {

        },
        data: () => ({
            showProgress : false,
            isdropdown : false,
            selectedCustomToken : 'XRP',
        }),
        computed:{
            CustomTokenLists(){
                return MainRepository.TradeView.getCustomTokenList().tokenName;
            }
        },
        created(){
            this.showProgress = true;


        },
        methods: {
            showDropdown(){
              this.isdropdown = !this.isdropdown;
            },
            clickedTokenItem(){

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
    left: -15px;
  }
  .dropdown-content > div{
    cursor: pointer;
    padding-right: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    text-align: center;
  }
</style>