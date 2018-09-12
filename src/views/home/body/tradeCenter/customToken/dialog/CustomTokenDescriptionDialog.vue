<template>
  <v-dialog v-model="show">
    <div class="cs-flex">
      <!--header-->
      <div class=" h4 bold text-xs-left">
        {{tokenName}} {{$str("Description")}}
      </div>
      <v-spacer></v-spacer>
      <i class="material-icons color-black c-pointer" @click="onClose">close</i>
    </div>
    <div class="description-text">
      {{description}}
    </div>
    <div class="text-xs-right">
      <button class="btn-rounded-white text-white-hover" @click="onClose" >
        <h6>{{$str("cancel")}}</h6>
      </button>
      <button class="btn-rounded-blue btn-blue-hover" @click="onTrade">
        <h6>{{$str("Trade")}}</h6>
      </button>
    </div>
  </v-dialog>
</template>

<script>
    export default {
        name: "CustomTokenDescriptionDialog",
        data: () => ({
            show: false,
        }),
        props: {
            description: {    // token 설명
                type: String,
                default: ''
            },
            tokenName: {    // token 설명
                type: String,
                default: ''
            },
        },
        created(){
            this.$eventBus.$on('showCustomTokenDescriptionDialog', (PramName) => {
                if(this.tokenName === PramName){
                  this.show = true;
                }
          })
        },
        methods:{
            onClose: function () {
                this.show = false;
            },
            onTrade(){
                //해당 token의 tradecenter로 보냄.
            }
        }
    }
</script>

<style scoped>
  .description-text{
    color : #9294a6;
    text-align: left;
    margin-top: 24px;
    margin-bottom: 24px;
  }
</style>