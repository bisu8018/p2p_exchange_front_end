<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-unbind_wrapper">

            <!-- 헤더, 타이틀 -->
            <div class="modal-subject-wrapper mb-3">
                <h3 class=" text-xs-left color-black bold">
                    {{ (modalType === 'phone' ? $str('Phone') : $str('email')) }} {{ $str('turnOn') }}
                </h3>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="onClose" >close</i>
            </div>

           <!-- 핸드폰 번호 / 이메일 입력 -->
            <div class="mb-4">
                <div class=" color-black  mb-2 text-xs-left">
                    {{ (modalType === 'phone' ? $str('phoneNumber') : $str('email')) }}
                </div>
                <div class="input-disabled  vertical-center disabled">
                    {{ (modalType === 'phone' ? setPhoneNumber : setEmail) }}
                </div>
            </div>

            <!-- 문자 인증 번호 입력 -->
            <div>
                <div class=" color-black  mb-2 text-xs-left">
                    {{ (modalType === 'phone' ? $str('SMSverification') : $str('emailVerification')) }}
                </div>
                <verification-code @verify="onCheckVerificationCode"
                                   :phone="phoneNumber"
                                   :email="email"
                                   :type="modalType"
                />
            </div>

            <!-- footer, 버튼 영역 -->
            <div class="dialog--footer">
                <button class="btn-rounded-white text-white-hover" @click="onClose">
                    <h6>{{ $str("cancel") }}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" @click="onDone">
                    <h6>{{ $str("Done") }}</h6>
                </button>
            </div>
        </div>
    </v-dialog>
</template>

<script>
    import VerificationCode from '@/components/VerificationCode.vue';
    import MainRepository from "../../vuex/MainRepository";
    import AccountService from "../../service/account/AccountService";

    export default {
        name: "dialog-turn-on",
        components: {
            VerificationCode
        },
        props: {
            showDialog: {
                type: Boolean,
                default: () => false
            },
            phoneNumber: {},
            email : {},
            modalType : {},
        },
        computed: {
            setPhoneNumber: function () {
                let phoneValue = this.phoneNumber.substr(0, 5) + '****' + this.phoneNumber.substr(10, 4);
                return phoneValue;
            },
            setEmail: function () {
                let emailSplited = this.email.split('@');
                let emailValue = emailSplited[0].substr(0,3) + '****@' + emailSplited[1];
                return emailValue
            }
        },
        data() {
            return {
                verify: false,
                verificationCode: '',
            }
        },
        methods: {
            // 인증코드 체크
            onCheckVerificationCode(code) {
                this.verify = true;
                this.verificationCode = code;
            },
            onClose(item) {
                this.$emit('close', item);
            },
            onDone(item) {
                //turn on 수행
                let self = this;

                MainRepository.Service.Account().Account.checkVerificationCode(self.modalType, {
                    email: MainRepository.MyInfo.getUserInfo().email,
                    phoneNumber: self.phoneNumber,
                    email: self.email,
                    code: self.verificationCode,
                    status: 'turn_on'
                }, function (result) {
                    self.verifyStatus = 'verified';
                    self.$emit('done');
                    self.onClose();
                });

            }
        }
    }
</script>

<style scoped>
    .modal-subject-wrapper {
        display: flex;
    }
</style>