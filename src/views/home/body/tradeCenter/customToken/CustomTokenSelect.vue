<template>
    <div>
        <v-flex xs12>
            <h2 class="title">{{$str('Custom Token Trade')}}</h2>
            <v-divider></v-divider>
        </v-flex>
        <v-flex xs12 md3 offset-md9 >
            <div class="p-relative search-input">
                <input type="text" v-model="searchCustomToken" class="input" :placeholder="$str('search')">
                <i class="material-icons cs-search">search</i>
            </div>
        </v-flex>
        <v-progress-circular v-if="showProgress" indeterminate class="color-blue list_progress"/>
        <v-flex xs12 v-else>
          <div class="tokenlist-wrapper">
            <!--CustomToken item-->
            <div v-for="item in CustomTokenList">
              <custom-token-item
                      :item = item
              ></custom-token-item>
            </div>
          </div>
        </v-flex>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CustomTokenItem from './item/CustomTokenItem';
    import MainRepository from "../../../../../vuex/MainRepository";
    export default {
        name: "CustomTokenTrade",
        components: {
            CustomTokenItem
        },
        data: () => ({
            searchCustomToken : '',
            showProgress : false,
            tokenNo : MainRepository.MyToken.getCustomTokenNo(),
        }),
        computed:{
          CustomTokenList(){
              return MainRepository.TradeView.getCustomTokenList();
          }
        },
        created(){
            this.showProgress = true;
            MainRepository.TradeView.loadCustomTokenList(()=>{
                this.showProgress = false;
            });
            //새로고침해서 들어가지게 된 경우
            this.checkReload();

        },
        methods: {
            checkReload(){
                if(MainRepository.MyToken.getCustomTokenNo() === -1){
                    let tmpTokenNo = this.CustomTokenList[0].tokenNo;
                    MainRepository.MyToken.getCustomTokenNo(tmpTokenNo)
                }
                console.log()
            }
        }
    }
</script>

<style scoped>
    /* web*/
    @media only screen and (min-width: 960px) {
        .search-input{
            margin-top: 32px;
            margin-bottom: 32px;
        }
    }

    /* mobile*/

    @media only screen and (max-width: 959px) {
        .search-input{
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }

    .title{
        text-align: left;
        font-weight : 700;
        margin-top: 48px;
        margin-bottom: 24px;
    }

    .cs-search{
        color: #9294a6;
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
    }

    .tokenlist-wrapper{
      border-radius: 2px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
    }
      .list_progress {
        margin-top: 80px;
      }

</style>