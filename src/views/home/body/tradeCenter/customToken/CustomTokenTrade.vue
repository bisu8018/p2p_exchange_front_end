<template>
    <div>
        <v-flex xs12>
            <h2 class="title">Custom Token Trade</h2>
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
            <v-layout v-for="item in CustomTokenList" class="tokenlist" align-center row fill-height>
              <v-flex xs2 class="cs-flex">
                <img class="symbol" :src="item.symbolImgUrl">
                <h4 class="medium">{{item.tokenName}}</h4>
              </v-flex>
              <v-flex xs10 text-xs-right>
                <span class="btn-rounded-white text-white-hover" @click="onDescription(item.tokenName)">Description</span>
              </v-flex>
              <custom-token-description-dialog
                      :description = item.description
                      :tokenName = item.tokenName
              ></custom-token-description-dialog>
            </v-layout>
          </div>
        </v-flex>
    </div>
</template>

<script>
    import Vue from 'vue';
    import tradeCenter from "../TradeCenter.vue"
    import MainRepository from "../../../../../vuex/MainRepository";
    import CustomTokenDescriptionDialog from "./dialog/CustomTokenDescriptionDialog"
    export default {
        name: "CustomTokenTrade",
        components: {
            CustomTokenDescriptionDialog,
            tradeCenter,
        },
        data: () => ({
            searchCustomToken : '',
            showProgress : false,
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

        },
        methods: {
            onDescription(tokenName){
                this.$eventBus.$emit('showCustomTokenDescriptionDialog', tokenName);
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
      .symbol{
        margin-right: 32px;
      }
    }

    /* mobile*/

    @media only screen and (max-width: 959px) {
        .search-input{
            margin-top: 24px;
            margin-bottom: 24px;
        }
      .symbol{
        margin-right: 16px;
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
  .symbol{
    width: 24px;
    height: 24px;
    border-radius: 100px;
  }
  .tokenlist{
    min-height: 56px;
    border-bottom: 1px solid #d1d1d1;
  }
  .tokenlist-wrapper{
    border-radius: 2px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
  }
    .list_progress {
      margin-top: 80px;
    }

</style>