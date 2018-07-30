<template>
  <div>
    <!--아래와 같이 함수 실행시 동작.-->
    <!--<button class="color-green" @click="showSuccessMessage">Show Success Message</button>-->
    <!--<button class="color-orange" @click="showWarningMessage">Show warning Message</button>-->
    <!--<button class="color-red" @click="showErrorMessage">Show Error Message</button>-->
    <div class="notifications">
      <notification v-for="notification in notifications" :notification="notification" @close-notification="removeNotification" transition="fade">
      </notification>
    </div>
  </div>
</template>

<script>
    // Vue.transition('fade', {       // animation은 좀더 연구해봐야함
    //     enterClass: 'fadeInDown', // class of animate.css
    //     leaveClass: 'fadeOutDown' // class of animate.css
    // })
    import Vue from 'vue';
    import notification from '@/components/Alert_item.vue';
    const NotificationStore = {
        state: [], // here the notifications will be added

        addNotification: function (notification) {
            this.state.push(notification)
        },
        removeNotification: function (notification) {
            this.state.splice(notification,0)
        }
    };


    export default {
        name: "Alerts",
        components: {
            notification: notification,
        },
        props: {
            title: {
                type:String,
                default:'Success'},
            text: {
                type:String,
                default:'A Success Message'},
            type: {
                type:String,
                default:'Success'},
        },
        data () {
            return {
                notifications: NotificationStore.state
            }
        },
        methods: {
            removeNotification: function (notification) {
                NotificationStore.removeNotification(notification)
            },
            showSuccessMessage: function () {
                NotificationStore.addNotification({
                    title: "Success!!",
                    text: "A Success Message",
                    type: "Success",
                    timeout: true
                });

            },
            showWarningMessage: function () {
                NotificationStore.addNotification({
                    title: "Warning",
                    text: "An Warning Message,",
                    type: "Warning",
                    timeout: true
                    // timeout not specified - defaults to true
                    // delay not specified, defaults to 3000
                });

            },
            showErrorMessage: function () {
                NotificationStore.addNotification({
                    title: "Error",
                    text: "Error message",
                    type: "Error",
                    timeout: true // won't disappear on it's own
                });

            },
        }
    }
</script>

<style scoped>
  .notifications {
    position: fixed;
    right: 32px;
    top: 64px;
    width: 290px;
    z-index: 999;
  }
</style>