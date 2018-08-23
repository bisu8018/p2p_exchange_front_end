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
    import {abGetLang} from "../config/localization";

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
        components: { notification: notification, },
        props: { },
        data () {
            return {
                notifications: NotificationStore.state,
                type: {
                    Success: 'Success',
                    Warning: 'Warning',
                    Error: 'Error',
                }
            }
        },
        created() {
            this.$eventBus.$on('showAlert', (param) => {
                // Title === "" 의 경우 Title = Type
                switch (param) {
                    case 0 : this.show(this.type.Success, "", ""); break;
                    case 400 : this.show(this.type.Error, "", ""); break;
                    case 401 : this.show(this.type.Error, "401 Error", abGetLang('401')); break;
                    case 412 : this.show(this.type.Error, "", 'invalid_request'); break;
                    case 413 : this.show(this.type.Error, "", 'invalid_email_verification_code'); break;
                    case 414 : this.show(this.type.Error, "", 'not_verified_email'); break;
                    case 415 : this.show(this.type.Error, "", 'id_verification_required'); break;
                    case 416 : this.show(this.type.Error, "", 'already_setted'); break;
                    case 417 : this.show(this.type.Error, "", 'not_enough_available_balance'); break;
                    case 418 : this.show(this.type.Error, "", 'not_enough_available_volume'); break;
                    case 419 : this.show(this.type.Error, "", 'invalid_trade_password'); break;
                    case 420 : this.show(this.type.Error, "", 'not_valid_min_max_amount'); break;
                    case 421 : this.show(this.type.Error, "", 'amount_not_matched'); break;
                    case 422 : this.show(this.type.Error, "", 'invalid_ad_no'); break;
                    case 423 : this.show(this.type.Error, "", 'invalid_id_verification'); break;
                    case 424 : this.show(this.type.Error, "", 'merchant_can_not_approach'); break;
                    case 425 : this.show(this.type.Error, "", "invalid_mobile_verification"); break;
                    case 426 : this.show(this.type.Error, "", "already_paid_order"); break;
                    case 427 : this.show(this.type.Error, "", "invalid_order_status"); break;
                    case 428 : this.show(this.type.Error, "", "not_unpaid_status"); break;
                    case 429 : this.show(this.type.Error, "", "not_paid_status"); break;
                    case 430 : this.show(this.type.Error, "", "not_complaining_status"); break;
                    case 431 : this.show(this.type.Error, "", "already_completed_order"); break;
                    case 432 : this.show(this.type.Error, "", "already_canceled_order"); break;
                    case 433 : this.show(this.type.Error, "", "invalid_member_for_cancel"); break;
                    case 434 : this.show(this.type.Error, "", "has_processing_order"); break;
                    case 435 : this.show(this.type.Error, "", "already_expired_order"); break;
                    case 499 : this.show(this.type.Error, "", "not_valid_approach"); break;
                    // case 500 : this.show(this.type.Error, "", "failed"); break;
                    case 512 : this.show(this.type.Error, "", "mail_server_error"); break;
                    case 'chat_size' : this.show(this.type.Error, "Error", abGetLang('warningAttachmentFileSize')); break;
                    default : break;

                }
            })

        },
        methods: {
            show(type, title, text) {
                NotificationStore.addNotification({
                    title: title === '' ? type : title,
                    text: text,
                    type: type,
                    timeout: true
                });
            },
            remove() {
                NotificationStore.removeNotification(notification)
            },
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

  @media only screen and (max-width: 959px) {
    .notifications {
      width: 98%;
      left: 12px;
      right: 0;

    }
  }
</style>