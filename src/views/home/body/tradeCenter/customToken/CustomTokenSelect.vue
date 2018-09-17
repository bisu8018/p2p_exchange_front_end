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
        <v-flex xs12 v-else-if="haveItems">
          <div class="tokenlist-wrapper">
            <!--CustomToken item-->
            <div v-for="item in CustomTokenListData">
              <custom-token-item
                      :item = item
              ></custom-token-item>
            </div>
          </div>
        </v-flex>
      <v-flex v-else-if="!showProgress">
        <div class="sprite-img ic-no-ad-lg no-more-ads">
        </div>
        <div class="color-gray no-more-ads-text">
          {{$str("No more item")}}
        </div>
      </v-flex>
      <!--customToken을 불러오기위한 dummy 태그-->
      <div v-if="CustomTokenList"></div>
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
            CustomTokenListData : [],   //search통해 걸러진 data list
        }),
        computed:{
            CustomTokenList(){
                //전체 list get
                this.CustomTokenListData = MainRepository.TradeView.getCustomTokenList();
            },
            haveItems(){
                  return (this.CustomTokenListData.length !== 0)
            },

        },
        watch: {
            searchCustomToken: function (value) {
                this.CustomTokenListData = MainRepository.MyToken.controller().findCustomTokenList(value);
            },
        },
        created(){
            this.showProgress = true;
            //전체 list load
            MainRepository.TradeView.loadCustomTokenList(()=>{
                this.showProgress = false;
            });
        },
        methods: {

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
        .no-more-ads{
          margin: 120px auto 16px auto;
        }
        .no-more-ads-text{
          margin-bottom: 56px;
        }
    }

    /* mobile*/

    @media only screen and (max-width: 959px) {
        .no-more-ads{
          margin: 48px auto 16px auto;
        }

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
