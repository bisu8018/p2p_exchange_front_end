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
                    //case 413 : this.show(this.type.Error, "", this.$str('invalid_email_verification_code')); break;
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



                    //클라이언트 단 상태코드

                    // 시스템 메세지 2000~
                    case 2000 : this.show(this.type.Success, "", this.$str('comp')); break;    // 성공
                    case 2001 : this.show(this.type.Success, "", this.$str('comp_copy')); break;    // 카피 완료
                    case 2002 : this.show(this.type.Success, "", this.$str('comp_verification_code_send')); break;    // 인증 코드 전송
                    case 2003 : this.show(this.type.Success, "", this.$str('comp_code_verified')); break;    // 코드 인증 성공

                    //로그인 및 회원가입 메세지 2050~
                    case 2051 : this.show(this.type.Success, "", this.$str('comp_copy')); break;    // 계정 존재 확인
                    case 2052 : this.show(this.type.Success, "", this.$str('comp_password_reset')); break;    // 비밀번호 초기화 성공

                    //광고 메세지 2100~
                    case 2101 : this.show(this.type.Success, "", this.$str('comp_ad_post')); break;    // 광고 등록 완료
                    case 2102 : this.show(this.type.Success, "", this.$str('comp_ad_cancel')); break;    // 광고 취소
                    case 2103 : this.show(this.type.Success, "", this.$str('comp_ad_edit')); break;    // 광고 수정 완료

                    //주문 메세지 2150~
                    case 2150 : this.show(this.type.Success, "", this.$str('comp_order')); break;    // 거래 완료
                    case 2151 : this.show(this.type.Success, "", this.$str('comp_order_paid')); break;    // 결제 완료
                    case 2153 : this.show(this.type.Success, "", this.$str('comp_order_appeal')); break;    // 이의제기 등록 완료
                    case 2154 : this.show(this.type.Success, "", this.$str('comp_order_appeal_cancel')); break;    // 이의제기 취소
                    case 2155 : this.show(this.type.Success, "", this.$str('comp_order_expire')); break;    // 거래 만료


                    //클라이언트 단 에러코드 4000 ~
                    case 4001 : this.show(this.type.Warning, "", this.$str('')); break;
                    case 4002 : this.show(this.type.Warning, "", this.$str('err_agreeTermCheck')); break;       // 이용약관 체크 필요
                    case 4003 : this.show(this.type.Warning, "", this.$str('verifySlider')); break;             // 인증 슬라이더 필요
                    case 4004 : this.show(this.type.Warning, "", this.$str('err_needPaymentMethod')); break;    // 결제수단 필요
                    case 4005 : this.show(this.type.Warning, "", this.$str('err_wrongApproach')); break;    // 잘못된 접근



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