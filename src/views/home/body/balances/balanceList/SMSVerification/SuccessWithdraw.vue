<template>
  <v-layout>
    <v-flex xs12 md8 offset-md2 mt-5>
      <div class="main-border">
        <div class="sprite-img ic-watch margin-auto"></div>
        <h3 class="bold">{{$str("Your certification order has been submitted.")}}</h3>
        <h3 class="bold">{{$str("Please wait a minute.")}}</h3>
        <v-divider class="mt-4a mb-4"></v-divider>
        <v-layout mb-3>
          <v-flex md3 xs6 text-xs-left>
            <div class="ml-4 color-darkgray">
            {{$str("Coin")}}:
            </div>
          </v-flex>
          <v-flex md9 xs6 text-xs-left>
            {{}}:
          </v-flex>
        </v-layout>
        <v-layout mb-3>
          <v-flex md3 xs6 text-xs-left>
            <div class="ml-4 color-darkgray">
              {{$str("Address")}}:
            </div>
          </v-flex>
          <v-flex md9 xs6 text-xs-left>
            {{}}:
          </v-flex>
        </v-layout>
        <v-layout mb-3>
          <v-flex md3 xs6 text-xs-left>
            <div class="ml-4 color-darkgray">
              {{$str("amount")}}:
            </div>
          </v-flex>
          <v-flex md9 xs6 text-xs-left>
            {{}}:
          </v-flex>
        </v-layout>
        <v-layout mb-4a>
          <v-flex md3 xs6 text-xs-left>
            <div class="ml-4 color-darkgray">
              {{$str("Processing Time")}}:
            </div>
          </v-flex>
          <v-flex md9 xs6 text-xs-left>
            {{}}:
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <div class="history-btn-margin">
          <button class="btn-blue btn-blue-hover btn-width" @click="goHistory">{{$str('history')}}
          </button>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "SuccessWithdraw",
        data: function () {
            return {

            }
        },
    }
</script>

<style scoped>
.main-border{
  border-radius: 3px;
  border: solid 1px #8d8d8d;
}
  .margin-auto{
    margin : 32px auto 24px auto;
  }
  .history-btn-margin{
    margin : 32px auto 32px auto;
  }
  .btn-width{
    width: 96px;
  }
</style>