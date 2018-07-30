<template>
  <div class="notification callout animated" v-if="isClosed"
       :class= "{'warning-bor' : isWarning, 'error-bor' : isError, 'success-bor' : isSuccess}">
       <!--:class="notification.type ? notification.type : 'secondary'" transition="fade"-->
    <v-layout mt-2>
      <v-flex xs2 pt-1>
        <i v-if="notification.type =='Error' " class="h3 material-icons error-font">warning</i>
        <i v-else-if="notification.type =='Warning' " class="h3 material-icons warning-font">error</i>
        <i v-else-if="notification.type =='Success' " class="h3 material-icons success-font">check_circle</i>
      </v-flex>
      <v-flex xs8 text-xs-left ml-2>
        <h5 class="bold" v-bind:class= "{'error-font' : isError, 'warning-font' : isWarning, 'success-font' : isSuccess}"
        >{{notification.title}}</h5>
      </v-flex>
      <v-flex xs2 text-xs-center>
        <button @click="triggerClose(notification)" aria-label="Close alert">
          <span aria-hidden="true">&times;</span>
        </button>
      </v-flex>
    </v-layout>
    <v-layout mb-3>
      <v-flex xs2></v-flex>
      <v-flex  xs10 text-xs-left ml-2>
        <h6 class="color-darkgray">{{notification.text}}</h6>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        name : 'Alert_test',
        props: ['notification'],
        data: function () {
            return {
                timer: null,
                isClosed : true,
                isError : false,
                isWarning : false,
                isSuccess : false,
            }
        },

        mounted() {
            // type 선별
            switch (this.notification.type){
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
            //시간할당
            let timeout = this.notification.hasOwnProperty('timeout') ? this.notification.timeout : true
            if (timeout) {
                let delay = this.notification.delay || 3000
                this.timer = setTimeout(function () {
                    this.triggerClose(this.notification)
                }.bind(this), delay)
            }

        },
        methods: {
            //닫게 될때
            triggerClose: function (notification) {
                clearTimeout(this.timer)
                this.isClosed = false;
                this.$emit('close-notification', notification)
            }
        }
    }
</script>
<style scoped>

  .notification {
    height: 72px;
    margin-right: 20px;
    border-radius: 3px;
    border-width: 1px 1px 1px 5px;
    border-style: solid;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
    margin-bottom: 8px;
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