<!--사용법. created에 case를 추가하고 쓰고자 하는 vue 파일의 메서드에
showWarning(){ this.$eventBus.$emit('showAlert', 2); }
 과 같이 선언하시면 됩니다.-->
<template>
    <div class="notifications-wrapper">
        <notification v-for="notification in notifications" :notification="notification"
                      @close-notification="removeNotification" transition="fade">
        </notification>
    </div>
</template>

<script>
    import notification from '@/components/alert/Alert_item.vue';
    import {abGetLang} from "../../config/localization";

    const NotificationStore = {
        state: [], // here the notifications will be added

        addNotification: function (notification) {
            if (this.state.length > 0) {
                if (this.state[this.state.length - 1].text = notification.text) {

                }
                notification['index'] = this.state[this.state.length - 1].index + 1;
            }
            this.state.push(notification)
        },
        removeNotification: function (index) {
            console.log(index);
            for(let i = this.state.length - 1; i >= 0; i--) {
                if(this.state[i].index === index) {
                    this.state.splice(i, 1);
                }
            }
            //this.state.splice(notification, 0);
        }
    };


    export default {
        name: "Alerts",
        components: {notification: notification,},
        props: {},
        data() {
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
                    case 0 :
                        this.show(this.type.Success, "", "");
                        break;
                    case 400 :
                        this.show(this.type.Error, "", "duplicate_request");
                        break;
                    case 401 :
                        this.show(this.type.Error, "401 Error", abGetLang('401'));
                        break;
                    case 406 :
                        this.show(this.type.Error, "", "suspended_account");
                        break;
                    case 412 :
                        this.show(this.type.Error, "", 'invalid_request');
                        break;
                    case 413 :
                        this.show(this.type.Error, "", this.$str('invalid_email_verification_code'));
                        break;
                    case 414 :
                        this.show(this.type.Error, "", 'not_verified_email');
                        break;
                    case 415 :
                        this.show(this.type.Error, "", 'id_verification_required');
                        break;
                    case 416 :
                        this.show(this.type.Error, "", 'already_setted');
                        break;
                    case 417 :
                        this.show(this.type.Error, "", 'not_enough_available_balance');
                        break;
                    case 418 :
                        this.show(this.type.Error, "", 'not_enough_available_volume');
                        break;
                    case 419 :
                        this.show(this.type.Error, "", 'invalid_trade_password');
                        break;
                    case 420 :
                        this.show(this.type.Error, "", 'not_valid_min_max_amount');
                        break;
                    case 421 :
                        this.show(this.type.Error, "", 'amount_not_matched');
                        break;
                    case 422 :
                        this.show(this.type.Error, "", 'invalid_ad_no');
                        break;
                    case 423 :
                        this.show(this.type.Error, "", 'invalid_id_verification');
                        break;
                    case 424 :
                        this.show(this.type.Error, "", 'merchant_can_not_approach');
                        break;
                    case 425 :
                        this.show(this.type.Error, "", "invalid_mobile_verification");
                        break;
                    case 426 :
                        this.show(this.type.Error, "", "already_paid_order");
                        break;
                    case 427 :
                        this.show(this.type.Error, "", "invalid_order_status");
                        break;
                    case 428 :
                        this.show(this.type.Error, "", "not_unpaid_status");
                        break;
                    case 429 :
                        this.show(this.type.Error, "", "not_paid_status");
                        break;
                    case 430 :
                        this.show(this.type.Error, "", "not_complaining_status");
                        break;
                    case 431 :
                        this.show(this.type.Error, "", "already_completed_order");
                        break;
                    case 432 :
                        this.show(this.type.Error, "", "already_canceled_order");
                        break;
                    case 433 :
                        this.show(this.type.Error, "", "invalid_member_for_cancel");
                        break;
                    case 434 :
                        this.show(this.type.Error, "", "has_processing_order");
                        break;
                    case 435 :
                        this.show(this.type.Error, "", "already_expired_order");
                        break;
                    case 436 :
                        this.show(this.type.Error, "", "invalid_sms_verification_code");
                        break;
                    case 437 :
                        this.show(this.type.Error, "", "invalid_sms_phone_number");
                        break;
                    case 450 :
                        this.show(this.type.Error, "", "block_member");
                        break;
                    case 451 :
                        this.show(this.type.Error, "", "update_password_suspension_period");
                        break;  //password update  되면 24시간 거래x
                    case 452 :
                        this.show(this.type.Error, "", "trade_count_limit");
                        break;
                    case 453 :
                        this.show(this.type.Error, "", "already_disabled_ad");
                        break;
                    case 454 :
                        this.show(this.type.Error, "", "already_enable_ad");
                        break;
                    case 455 :
                        this.show(this.type.Error, "", "not_disabled_ad");
                        break;
                    case 456 :
                        this.show(this.type.Error, "", "not_enable_ad");
                        break;
                    case 457 :
                        this.show(this.type.Error, "", "invalid_amount");
                        break;
                    case 458 :
                        this.show(this.type.Error, "", "duplicated_custom_token_name");
                        break;
                    case 459 :
                        this.show(this.type.Error, "", "duplicated_custom_token_name_short");
                        break;
                    case 460 :
                        this.show(this.type.Error, "", "update_phone_suspension_period");
                        break;  //phone update  되면 24시간 거래x
                    case 499 :
                        this.show(this.type.Error, "", "not_valid_approach");
                        break;
                    // case 500 : this.show(this.type.Error, "", "failed"); break;
                    case 512 :
                        this.show(this.type.Error, "", "mail_server_error");
                        break;
                    case 513 :
                        this.show(this.type.Error, "", "sms_sender_error");
                        break;



                    //클라이언트 단 상태코드

                    // 시스템 메세지 2000~
                    case 2000 :
                        this.show(this.type.Success, "", this.$str('comp'));
                        break;    // 성공
                    case 2001 :
                        this.show(this.type.Success, "", this.$str('comp_copy'));
                        break;    // 카피 완료
                    case 2002 :
                        this.show(this.type.Success, "", this.$str('comp_verification_code_send'));
                        break;    // 인증 코드 전송
                    case 2003 :
                        this.show(this.type.Success, "", this.$str('comp_code_verified'));
                        break;    // 코드 인증 성공
                    case 2004 :
                        this.show(this.type.Success, "", this.$str('comp_request_complete'));
                        break;    // 코드 인증 성공

                    //로그인 및 회원가입 메세지 2050~
                    case 2051 :
                        this.show(this.type.Success, "", this.$str('comp_copy'));
                        break;    // 계정 존재 확인
                    case 2052 :
                        this.show(this.type.Success, "", this.$str('comp_password_reset'));
                        break;    // 비밀번호 초기화 성공

                    //광고 메세지 2100~
                    case 2101 :
                        this.show(this.type.Success, "", this.$str('comp_ad_post'));
                        break;    // 광고 등록 완료
                    case 2102 :
                        this.show(this.type.Success, "", this.$str('comp_ad_cancel'));
                        break;    // 광고 취소
                    case 2103 :
                        this.show(this.type.Success, "", this.$str('comp_ad_edit'));
                        break;    // 광고 수정 완료
                    case 2104 :
                        this.show(this.type.Success, "", this.$str('comp_ad_disable'));
                        break;    // 광고 비활성 완료
                    case 2105 :
                        this.show(this.type.Success, "", this.$str('comp_ad_enable'));
                        break;    // 광고 활성 완료
                    case 2106 :
                        this.show(this.type.Success, "", this.$str('comp_ad_delete'));
                        break;    // 광고 삭제 완료

                    //주문 메세지 2150~
                    case 2150 :
                        this.show(this.type.Success, "", this.$str('comp_order'));
                        break;    // 거래 완료
                    case 2151 :
                        this.show(this.type.Success, "", this.$str('comp_order_paid'));
                        break;    // 결제 완료
                    case 2153 :
                        this.show(this.type.Success, "", this.$str('comp_order_appeal'));
                        break;    // 이의제기 등록 완료
                    case 2154 :
                        this.show(this.type.Success, "", this.$str('comp_order_appeal_cancel'));
                        break;    // 이의제기 취소
                    case 2155 :
                        this.show(this.type.Success, "", this.$str('comp_order_expire'));
                        break;    // 거래 만료


                    //마이페이지 메세지 2250~
                    case 2251 :
                        this.show(this.type.Success, "", this.$str('comp_linked_phone_change'));
                        break;    // 연동 전화번호 수정 완료
                    case 2252 :
                        this.show(this.type.Success, "", this.$str('comp_unblock'));
                        break;    // 차단해제 완료
                    case 2253 :
                        this.show(this.type.Success, "", this.$str('comp_payment_method_register'));
                        break;    // 결제수단 등록 완료
                    case 2254 :
                        this.show(this.type.Success, "", this.$str('comp_payment_method_delete'));
                        break;    // 결제수단 삭제 완료
                    case 2255 :
                        this.show(this.type.Success, "", this.$str('comp_payment_method_active'));
                        break;    // 결제수단 turn on
                    case 2256 :
                        this.show(this.type.Success, "", this.$str('comp_payment_method_deactive'));
                        break;    // 결제수단 turn off

                    //Merchant 메세지 2350~
                    case 2350 :
                        this.show(this.type.Success, "", this.$str('comp_apply_merchant'));
                        break;    // merchant 등록 완료


                    //클라이언트 단 에러코드 4000 ~
                    case 4001 :
                        this.show(this.type.Warning, "", this.$str(''));
                        break;
                    case 4002 :
                        this.show(this.type.Warning, "", this.$str('err_agreeTermCheck'));
                        break;       // 이용약관 체크 필요
                    case 4003 :
                        this.show(this.type.Warning, "", this.$str('verifySlider'));
                        break;             // 인증 슬라이더 필요
                    case 4004 :
                        this.show(this.type.Warning, "", this.$str('err_needPaymentMethod'));
                        break;    // 결제수단 필요
                    case 4005 :
                        this.show(this.type.Warning, "", this.$str('err_wrongApproach'));
                        break;    // 잘못된 접근
                    case 4006 :
                        this.show(this.type.Warning, "", this.$str('warn_needSetNickname'));
                        break;    // 닉네임 등록 필요
                    case 4007 :
                        this.show(this.type.Warning, "", this.$str('warn_needSetIDVerification'));
                        break;    // ID인증 필요
                    case 4008 :
                        this.show(this.type.Warning, "", this.$str('warn_verification_no_phone_data'));
                        break;    // 인증 코드 실패, 번호 없음
                    case 4009 :
                        this.show(this.type.Warning, "", this.$str('warn_verification_code_no_email_data'));
                        break;    // 인증 코드 실패, 번호 없음
                    case 4010 :
                        this.show(this.type.Warning, "", this.$str('warn_need_Merchant_verification'));
                        break;    // 인증 코드 실패, 번호 없음
                    case 4011 :
                        this.show(this.type.Error, "", this.$str('err_login'));
                        break;    // 로그인 실패
                    case 4012 :
                        this.show(this.type.Error, "", this.$str('warn_file_size'));
                        break;    // 이미지 용량 초과
                    case 4013 :
                        this.show(this.type.Error, "", this.$str('warn_file_exist'));
                        break;    // 이미지 없음

                    //광고 에러코드 4100 ~
                    case 4101 :
                        this.show(this.type.Warning, "", this.$str('warn_completeProcessingOrder'));
                        break;       // 진행중인 거래 존재
                    case 4102 :
                        this.show(this.type.Warning, "", this.$str('warn_changeStatusDisable'));
                        break;       // disable 상태 변경 필요

                    // 준비중
                    case 9000 :
                        this.show(this.type.Warning, "", this.$str('It\'s under development now.'));
                        break;       // 개발중입니다.


                    case 'chat_size' :
                        this.show(this.type.Error, "Error", abGetLang('warningAttachmentFileSize'));
                        break;
                    default :
                        break;
                }
            })
        },
        methods: {
            show(type, title, text) {
                NotificationStore.addNotification({
                    title: title === '' ? type : title,
                    text: text,
                    type: type,
                    timeout: true,
                    index: 0,
                    timestamp: Date.now()
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
            showWarningMessage: function (title, text) {
                NotificationStore.addNotification({
                    title: title,
                    text: text,
                    type: "Warning",
                    timeout: true
                });

            },
            showErrorMessage: function (title, text) {
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

</style>