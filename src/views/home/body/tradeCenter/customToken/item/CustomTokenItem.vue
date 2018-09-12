<template>
  <v-layout class="tokenlist" align-center row fill-height>
    <v-flex xs6 class="cs-flex">
      <img class="symbol" :src="item.symbolImgUrl">
      <h4 class="medium">{{item.tokenName}}</h4>
    </v-flex>
    <v-flex xs6 text-xs-right>
                <span class="btn-rounded-white c-pointer text-white-hover" @click="onDescription(item.tokenName)">
                  {{$str('Description')}}
                </span>
    </v-flex>
    <custom-token-description-dialog
            :description = item.description
            :tokenName = item.tokenName
    ></custom-token-description-dialog>
  </v-layout>
</template>

<script>
    import CustomTokenDescriptionDialog from "../dialog/CustomTokenDescriptionDialog"
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
            }
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
</style>