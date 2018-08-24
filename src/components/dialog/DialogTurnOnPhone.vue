<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-unbind_wrapper">

            <!-- 헤더, 타이틀 -->
            <h3>{{ $str('핸드폰 번호 Turn On') }}</h3>
            <div class="dialog_btn-close">
                <i class="material-icons " @click="onClose">close</i>
            </div>

           <!-- 핸드폰 번호 입력 -->
            <div class="mb-4">
                <div class=" color-black  mb-2 text-xs-left">
                    {{$str("phoneNumber")}}
                </div>
                <div class="input-disabled  vertical-center disabled">{{ setPhoneNumber }}</div>
            </div>

            <!-- 문자 인증 번호 입력 -->
            <div class="mb-4">
                <div class=" color-black  mb-2 text-xs-left">
                    {{$str("SMSverification")}}
                </div>
                <verification-code @verify="onCheckVerificationCode"
                                   :phone="phoneNumber"
                                   :type="'phone'"
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
        name: "dialog-turn-on-phone",
        components: {
            VerificationCode
        },
        props: {
            showDialog: {
                type: Boolean,
                default: () => false
            },
            phoneNumber: {},
        },
        computed: {
            setPhoneNumber: function () {
                let phoneValue = this.phoneNumber.substr(0, 3) + '****' + this.phoneNumber.substr(7, 5);
                return phoneValue;
            },
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

                AccountService.Account.checkVerificationCode(phone, {
                    email: MainRepository.MyInfo.getUserInfo().email,
                    phoneNumber: self.phoneNumber,
                    code: self.verificationCode,
                    status: 'turn_on'
                }, function (result) {
                    self.verifyStatus = 'verified';
                    self.$emit('turnon');
                });

                this.$emit('done', item);
                this.onClose();

            }
        }
    }
</script>

<style scoped>

</style>