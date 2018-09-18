<template>
  <div>
    <v-layout class="tokenlist" align-center row fill-height >
      <v-flex xs12 class="cs-flex c-pointer" @click="goCustomTokenTrade">
        <img class="symbol" :src="item.symbolImgUrl">
        <h4 class="medium">{{item.tokenName}}</h4>
        <v-spacer></v-spacer>
        <button class="btn-rounded-white text-white-hover" @mousedown="onDescription(item.tokenName)">
          {{$str('Description')}}
        </button>
      </v-flex>
    </v-layout>
    <custom-token-description-dialog
            :description = item.description
            :tokenName = item.tokenName
            :tokenNo = item.tokenNo
    ></custom-token-description-dialog>
  </div>
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
  .cs-flex{
    align-items: center;
  }
  .tokenlist:hover{
    background-color: #F8F8FA;
  }
</style>