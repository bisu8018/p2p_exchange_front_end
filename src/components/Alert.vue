<template>
  <div class="alert-wrapper"
       v-bind:class= "{'warning-bor' : isWarning, 'error-bor' : isError, 'success-bor' : isSuccess}"
  >
    <v-layout mt-2>
      <v-flex xs2 pt-1>
        <i v-if="type =='Error' " class="h3 material-icons error-font">warning</i>
        <i v-else-if="type =='Warning' " class="h3 material-icons warning-font">error</i>
        <i v-else-if="type =='Success' " class="h3 material-icons success-font">check_circle</i>
      </v-flex>
      <v-flex xs8 text-xs-left ml-2>
        <h5 class="bold" v-bind:class= "{'error-font' : isError, 'warning-font' : isWarning, 'success-font' : isSuccess}"
        >{{type}}</h5>
      </v-flex>
      <v-flex xs2 text-xs-center>
        <i class="material-icons" @click="isClosed = false">close</i>
      </v-flex>
    </v-layout>
    <v-layout mb-3>
      <v-flex xs2></v-flex>
      <v-flex  xs10 text-xs-left ml-2>
        <h6 class="color-darkgray">{{message}}</h6>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            type: {
                type: String,
                default: 'Success'
            },
            message: {
                type: String,
                default: 'Error message',
            }
        },
        data: () => ({
            isError : false,
            isWarning : false,
            isSuccess : false,
            isClosed: true,
        }),
        mounted(){
          switch (this.type){
              case 'Error':
                  this.isError = true;
                  break;

              case 'Warning':
                  this.isWarning = true;
                  break;

              case 'Success':
                  this.isSuccess = true;
                  break;
          }
        },
        methods: {

        }
    }
</script>

<style scoped>
  .alert-wrapper{
    width: 290px;
    height: 72px;
    border-radius: 3px;
    border-width: 1px 1px 1px 5px;
    border-style: solid;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    position: fixed;
    top: 64px;
    right: 32px;
    z-index: 999;
    -webkit-transition: top 0.5s;

  }

  .error-font{
    color: #e62a2b;
  }
  .error-bor{
    border-color: #e62a2b;
  }
  .warning-font{
    color: #f9a825;
  }
  .warning-bor{
    border-color: #f9a825;
  }
  .success-font{
    color: #71aa3a;
  }
  .success-bor{
    border-color: #71aa3a;
  }

</style>