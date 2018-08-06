<!--사용법. created에 case를 추가하고 쓰고자 하는 vue 파일의 메서드에
showWarning(){ this.$eventBus.$emit('showAlert', 2); }
 과 같이 선언하시면 됩니다.-->
<template>
    <div class="notifications">
      <notification v-for="notification in notifications" :notification="notification" @close-notification="removeNotification" transition="fade">
      </notification>
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
        created() {
            this.$eventBus.$on('showAlert', (param) => {
                switch (param) {
                    case 1 :
                        this.showSuccessMessage("Success", "A Success Message")
                        break
                    case 2 :
                        this.showWarningMessage("Warning", "A Waring Message")
                        break
                    case 3 :
                        this.showErrorMessage("Error", "A Error Message")
                        break
                    case 4 :
                        this.showWarningMessage("Notice", "Please enter account")
                        break
                    case 5 :
                        break

                    default :
                        break

                }
            })

        },
        methods: {
            removeNotification: function (notification) {
                NotificationStore.removeNotification(notification)
            },
            showSuccessMessage: function (title, text) {
                NotificationStore.addNotification({
                    title: title,
                    text: text,
                    type: "Success",
                    timeout: true
                });

            },
            showWarningMessage: function (title,text) {
                NotificationStore.addNotification({
                    title: title,
                    text: text,
                    type: "Warning",
                    timeout: true
                    // timeout not specified - defaults to true
                    // delay not specified, defaults to 3000
                });

            },
            showErrorMessage: function (title,text) {
                NotificationStore.addNotification({
                    title: title,
                    text: text,
                    type: "Error",
                    timeout: true
                });

            },
        },
        beforeDestroy() {
            //다른 화면 갔다가 돌아왔을때 창이 refresh 되어있기 위함.
            NotificationStore.state = [];
            this.$eventBus.$off('showAlert');
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