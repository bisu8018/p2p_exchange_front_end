<template>
  <v-layout class="tokenlist" align-center row fill-height >
    <v-flex xs8 md10 class="cs-flex c-pointer" @click="goCustomTokenTrade">
      <img class="symbol" :src="item.symbolImgUrl">
      <h4 class="medium">{{item.tokenName}}</h4>
    </v-flex>
    <v-flex xs4 md2 text-xs-right>
      <span class="btn-rounded-white c-pointer text-white-hover" @click="onDescription(item.tokenName)">
        {{$str('Description')}}
      </span>
    </v-flex>
    <custom-token-description-dialog
            :description = item.description
            :tokenName = item.tokenName
            :tokenNo = item.tokenNo
    ></custom-token-description-dialog>
  </v-layout>
</template>

<script>
    import CustomTokenDescriptionDialog from "../dialog/CustomTokenDescriptionDialog"
    import MainRepository from "../../../../../../vuex/MainRepository"
    export default {
        name: "CustomTokenItem",
        components: {
            CustomTokenDescriptionDialog,
        },
        props: ['item'],
        data: () => ({
            currentPage : 1,
        }),
        methods: {
            onDescription(tokenName){
                this.$eventBus.$emit('showCustomTokenDescriptionDialog', tokenName);
            },
            goCustomTokenTrade(){
                MainRepository.router().goCustomTokenTrade(this.item.tokenNo);
            },
        },
    }
</script>

<style scoped>
  /* web*/
  @media only screen and (min-width: 960px) {

    .symbol{
      margin-right: 32px;
      margin-left: 16px;
      width: 24px;
      height: 24px;
      border-radius: 100px;
    }
  }
  /* mobile*/

  @media only screen and (max-width: 959px) {
    .symbol{
      margin-right: 16px;
      margin-left: 16px;
      width: 24px;
      height: 24px;
      border-radius: 100px;
    }
  }
  .tokenlist{
    min-height: 56px;
    border-bottom: 1px solid #d1d1d1;
  }
  .tokenlist:hover{
    background-color: #F8F8FA;
  }
</style>