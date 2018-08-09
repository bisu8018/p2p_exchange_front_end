<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    <!--type에 따른 제목 변경-->
                    {{type === 'addPayment' ? $str("addPayment") : (type === 'emailTurnOn' || type ==='phoneTurnOn' ?
                    $str("turnOn") :
                    $str("nickNameTradePassword"))}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="onClose" v-if="type != 'nickName' ">close</i>
            </div>

            <!--******************************************
                              ADD PAYMENT
             ******************************************-->
            <span v-if="type === 'nickName'">
                <div class="color-darkgray mb-4 text-xs-left">
                    {{$str("nickNameExplain")}}
                </div>

                <!--가명 입력-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("nickName")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('nickNamePlaceholder')"
                               v-model="user.nick_name"
                               v-bind:class="{'warning-border' : warning_nick_name}" @keyup="onCheckNickName">
                        <div class="warning-text-wrapper">
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_nick_name}">{{$str('warning_nick_name')}}</span>
                        </div>
                    </div>
                </div>

                <!--새로운 비밀번호-->
                <div class="text-xs-left mb-2 h5 color-black">{{$str("tradePwText")}}</div>
                <div class="p-relative mb-4">
                    <input v-model="new_password" type="password" class="input"
                           @keyup="onCheckNewPassword" maxlength="24"
                           :placeholder="$str('nickNameTradePasswordPlaceholder')"
                           v-bind:class="{'warning-border' : warning_new_password}">
                    <div class="warning-text-wrapper">
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_new_password}">{{warning_password}}</span>
                    </div>
                </div>

                <!--비밀번호 확인-->
                <div class="text-xs-left mb-2 h5 color-black">{{$str("confirmTradePassword")}}</div>
                <div class="p-relative mb-4">
                    <input v-model="confirm_password" type="password" class="input"
                           @keyup="onCheckPasswordConfirm" maxlength="24"
                           :placeholder="$str('nickNameConfirmPasswordPlaceholder')"
                           v-bind:class="{'warning-border' : warning_confirm_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none" v-bind:class="{'warning-text' : warning_confirm_password}">{{$str('passwordMatch')}}</span>
                    </div>
                </div>
            </span>


            <!--******************************************
                            ADD PAYMENT
            ******************************************-->
            <div class="line-height-1 modal-subject-2" v-if="type === 'addPayment'">
                <!--type이 addPayment 상태 일 경우 내용-->
                <div class=" color-black  mb-2">
                    {{$str("paymentMethod")}}
                </div>
                <div class="p-relative mb-4">
                    <select class="comp-selectbox h6" id="paymentMethod" v-model="paymentMethod">
                        <option value="" disabled selected
                                hidden>{{$str('paymentMethodSelectboxPlaceholder')}}
                        </option>
                        <option value="bank">{{$str("bankAccountText")}}</option>
                        <option value="alipay">{{$str("alipayText")}}</option>
                        <option value="wechat">{{$str("wechatPayText")}}</option>
                    </select>
                    <i class="material-icons comp-selectbox-icon ">keyboard_arrow_down</i>
                </div>
            </div>

            <div v-if="type === 'addPayment'">
                <!--실명 입력-->
                <div class="mb-4" v-if="paymentMethod != ''">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("name")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('namePlaceholder')" v-model="realName"
                               v-bind:class="{'warning-border' : warning_name}" @keyup="onCheckName">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_name}">{{verify_warning_name}}</span>
                        </div>
                    </div>
                </div>

                <!--알리페이-->
                <div class="mb-4" v-if="paymentMethod === 'alipay'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("alipayText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('alipayPlaceholder')" v-model="alipay"
                               v-bind:class="{'warning-border' : warning_alipay}" @keyup="onCheckAlipay">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_alipay}">{{verify_warning_alipay}}</span>
                        </div>
                    </div>
                </div>

                <!--위챗페이-->
                <div class="mb-4" v-if="paymentMethod === 'wechat'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("wechatPayText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('wechatPlaceholder')" v-model="wechat"
                               v-bind:class="{'warning-border' : warning_wechat}" @keyup="onCheckWechat">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_wechat}">{{verify_warning_wechat}}</span>
                        </div>
                    </div>
                </div>


                <!--은행이름-->
                <div class="mb-4" v-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("bankName")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('bankNamePlaceholder')" v-model="bank"
                               v-bind:class="{'warning-border' : warning_bank}" @keyup="onCheckBank">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_bank}">{{verify_warning_bank}}</span>
                        </div>
                    </div>
                </div>

                <!--은행정보-->
                <div class="mb-4" v-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("branchInfo")}}
                    </div>
                    <input type="text" class="input" :placeholder="$str('branchInfoPlaceholder')" v-model="branchInfo">
                </div>

                <!--은행계좌-->
                <div class="mb-4" v-if="paymentMethod === 'bank'">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("bankAccountText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('bankPlaceholder')" v-model="bankAccount"
                               v-bind:class="{'warning-border' : warning_bank_accout}" @keyup="onCheckBankAccount">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_bank_accout}">{{verify_warning_bank_account}}</span>
                        </div>
                    </div>
                </div>

                <!--QR코드-->
                <div class="mb-4" v-if="paymentMethod === 'alipay' || paymentMethod === 'wechat'">

                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("qrCode")}}
                    </div>
                    <label class="">
                        <div class="textarea-style p-relative" v-bind:class="{'warning-border' : warning_attachment_file}">
                            <div v-if="file === ''" class="ma-4a">
                                <input type="file" id="file" ref="file" v-on:change="onCheckAttachmentFile()"
                                       class="d-none"/>
                                <div class="d-inline-block mt-2">
                                    <div class="sprite-img ic-upload"></div>
                                </div>
                                <div class="color-darkgray h6">
                                    {{paymentMethod === 'wechat' ? $str('wechatQrCodeExplain') :
                                    $str('alipayQrCodeExplain') }} (*.jpg / *.png / *.jpeg)
                                </div>
                            </div>
                            <div v-else class="text-xs-center p-relative">
                                <img :src="image" class="attachment-img-style">
                                <span class="text-white-hover color-blue c-pointer vertical-center image-delete"
                                      @click="deleteFile()">
                                    {{$str('delete')}}
                                    <i class="material-icons ">close</i>
                                </span>
                            </div>
                            <div class="warning-text-wrapper">
                                <span class="d-none"
                                      v-bind:class="{'warning-text' : warning_attachment_file}">{{verify_warning_attachment_file}}</span>
                            </div>
                        </div>
                    </label>
                </div>

                <!--거래 비밀번호 입력-->
                <div class="mb-4" v-if="paymentMethod != ''">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("tradePwText")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" :placeholder="$str('tradePwPlaceholder')"
                               v-model="tradePassword"
                               v-bind:class="{'warning-border' : warning_trade_password}" @keyup="onCheckTradePassword">
                        <div class="warning-text-wrapper">
                        <span class="d-none"
                              v-bind:class="{'warning-text' : warning_trade_password}">{{verify_warning_trade_password}}</span>
                        </div>
                    </div>
                </div>
            </div>


            <!--******************************************
                          TURN ON
          ******************************************-->
            <div v-else-if="type === 'phoneTurnOn'">
                <!--전화 번호 입력-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("phoneNumber")}}
                    </div>
                    <div class="input-disabled  vertical-center disabled">{{setPhoneNumber}}</div>
                </div>

                <!--문자인증-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("SMSverification")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" v-model="SMSverificationCode" maxlength="12">
                        <span class="cs-click-send text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                    </div>
                </div>
            </div>

            <div v-else-if="type === 'emailTurnOn'">
                <!--이메일 입력-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("email")}}
                    </div>
                    <div class="input-disabled  vertical-center disabled">{{setEmail}}</div>
                </div>

                <!--이메일인증-->
                <div class="mb-4">
                    <div class=" color-black  mb-2 text-xs-left">
                        {{$str("emailVerification")}}
                    </div>
                    <div class="p-relative">
                        <input type="text" class="input" v-model="SMSverificationCode" maxlength="12">
                        <span class="cs-click-send text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
                    </div>
                </div>
            </div>


            <div class="text-xs-right">
                <v-spacer></v-spacer>
                <button @click="onClose" class="h6 btn-rounded-white text-white-hover mr-3" v-if="type != 'nickName' ">
                    {{$str("cancel")}}
                </button>

                <!--결제수단 추가 확인 버튼-->
                <button @click="onPaymentCheck" class="h6 btn-rounded-blue btn-blue-hover"
                        v-if="type === 'addPayment' ">
                    {{$str("complete")}}
                </button>

                <!--닉네임 추가 확인 버튼-->
                <button @click="onNickNameCheck" class="h6 btn-rounded-blue btn-blue-hover" v-if="type === 'nickName'">
                    {{$str("complete")}}
                </button>

                <!--turn on 확인 버튼-->
                <button @click="onConfirmTurnOn" class="h6 btn-rounded-blue btn-blue-hover"
                        v-if="type === 'emailTurnOn' || type === 'phoneTurnOn'">
                    {{$str("confirm")}}
                </button>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';

    export default {
        name: 'myPageModal',
        props: ['show', 'type', 'phoneNo', 'email'],
        data() {
            return {
                user: {
                    member_no: 0,
                    email: 'test@naver.com',
                    nick_name: '',
                },
                //거래수단 변경
                paymentMethod: "",
                realName: "",
                alipay: "",
                wechat: "",
                bank: "",
                tradePassword: "",
                branchInfo: "",
                bankAccount: "",
                warning_name: false,
                warning_alipay: false,
                warning_wechat: false,
                warning_bank: false,
                warning_bank_accout: false,
                warning_trade_password: false,
                warning_attachment_file : false,
                verify_warning_name: Vue.prototype.$str('warning_name'),
                verify_warning_alipay: Vue.prototype.$str('warning_alipay'),
                verify_warning_wechat: Vue.prototype.$str('warning_wechat'),
                verify_warning_bank: Vue.prototype.$str('warning_bank'),
                verify_warning_bank_account: Vue.prototype.$str('warning_name'),
                verify_warning_trade_password: Vue.prototype.$str('warning_trade_password'),
                verify_warning_attachment_file: '',
                SMSverificationCode: '',

                // 닉네임 & 거래 비밀번호
                new_password: '',
                confirm_password: '',
                warning_password: "",
                warning_new_password: "",
                warning_confirm_password: "",
                warning_nick_name: "",

                //파일 첨부
                file: '',
                image: '',
            }
        },
        computed: {
            setPhoneNumber: function () {
                var phoneValue = this.phoneNo.substr(0, 3) + '****' + this.phoneNo.substr(7, 5);
                return phoneValue;
            },
            setEmail: function () {
                var emailValue = this.email.split('@')[0];
                return emailValue;
            }
        },
        methods: {
            onCheckAttachmentFile() {
                //첨부파일 타입, 확장자, 용량 체크
                let fileInfo = this.$refs.file.files[0];
                let fileSize = fileInfo.size;
                if (fileSize > 5000) {
                    this.warning_attachment_file = true;
                    this.verify_warning_attachment_file = Vue.prototype.$str('warningAttachmentFileSize');

                    return false;
                }
                this.warning_attachment_file = false;
                return true;
                this.handleFileUpload();

            },
            handleFileUpload() {
                //첨부파일 사진 등록 및 출력
                this.file = this.$refs.file.files[0];
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(this.file);
            },
            onClose: function () {
                this.$emit('close');
            },
            onComplete: function (type) {
                // post 작업 완료 후 진행
                if (type === 'payment') {
                    this.$emit('paymentMethod');
                } else if (type === 'nickName') {
                    this.$emit('nickName', this.user.nick_name);
                }
            },
            onNickNameCheck() {
                // 닉네임 && 거래 비밀번호 전체 검사
                if (this.onCheckNickName() && this.onCheckNewPassword() && this.onCheckPasswordConfirm()) {
                    this.onComplete('nickName');
                }
            },
            onPaymentCheck() {
                // 결제수단 전체 검사
                if (this.onCheckName() && this.onCheckAlipay() && this.onCheckWechat() && this.onCheckBank() && this.onCheckBankAccount() && this.onCheckTradePassword()) {
                    this.onComplete('payment');
                }
            },
            onCheckName: function () {
                if (this.realName === '') {
                    this.warning_name = true;
                    return false;
                }
                this.warning_name = false;
                return true;
            },
            onCheckAlipay: function () {
                if (this.paymentMethod === 'alipay') {
                    if (this.alipay === '') {
                        this.warning_alipay = true;
                        return false;
                    }
                    this.warning_alipay = false;
                }
                return true;
            },
            onCheckWechat: function () {
                if (this.paymentMethod === 'wechat') {
                    if (this.wechat === '') {
                        this.warning_wechat = true;
                        return false;
                    }
                    this.warning_wechat = false;
                }
                return true;
            },
            onCheckBank: function () {
                if (this.paymentMethod === 'bank') {
                    if (this.bank === '') {
                        this.warning_bank = true;
                        return false;
                    }
                    this.warning_bank = false;
                }
                return true;
            },
            onCheckBankAccount: function () {
                if (this.paymentMethod === 'bank') {
                    if (this.bankAccount === '') {
                        this.warning_bank_accout = true;
                        return false;
                    }
                    this.warning_bank_accout = false;
                }
                return true;
            },
            onCheckTradePassword: function () {
                if (this.tradePassword === '') {
                    this.warning_trade_password = true;
                    return false;
                }
                this.warning_trade_password = false;
                return true;
            },
            sendVerificationCode: function () {
                // 문자 전송 코드
            },
            onConfirmTurnOn: function () {
                //AXIOS POST

                // 성공후
                this.$emit('turnon');
            },
            onCheckPasswordConfirm() {
                //confirm password null
                if (this.new_password != this.confirm_password) {
                    this.warning_confirm_password = true;
                    return false;
                }
                this.warning_confirm_password = false;
                return true;
            },
            onCheckNewPassword() {
                if (this.type === 'nickName') {
                    //new password null
                    if (this.new_password === "") {
                        this.warning_new_password = true;
                        this.warning_password = Vue.prototype.$str('passwordValue');
                        return false;
                    }

                    //새 비밀번호 양식 점검
                    if (!abUtils.isPasswd(this.new_password)) {
                        this.warning_new_password = true;
                        this.warning_password = Vue.prototype.$str('passwordForm');
                        return false;
                    }
                    this.warning_new_password = false;
                    return true;
                }
            },
            onCheckNickName() {
                // 닉네임 null 체크
                if (this.type === 'nickName') {
                    if (this.user.nick_name === "") {
                        this.warning_nick_name = true;
                        return false;
                    }
                    this.warning_nick_name = false;
                    return true;
                }
            },
            // 첨부파일 서버 전송
            submitFile() {
                let formData = new FormData();
                formData.append('file', this.file);
            },
            deleteFile() {
                this.file = '';
                this.image = '';
            }
        },
    }
</script>
<style scoped>

    .modal-subject-wrapper {
        display: flex;
    }

    .modal-subject-2 {
        text-align: left;
        margin-bottom: 8px;
    }

    .textarea-style {
        width: 100%;
        height: 152px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        resize: none;
    }

    .comp-selectbox {
        /*셀렉박스 공통 CSS*/
        width: 100%;
        height: 40px;
        border-radius: 2px;
        background-color: #ffffff;
        border: solid 1px #8d8d8d;
        padding-left: 12px;
        cursor: pointer;
    }

    .attachment-img-style {
        height: 105px;
        margin-top: 22px;
    }

    .image-delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 9px;
    }

    .warning-text-wrapper {
        top : 153px !important;
    }

</style>