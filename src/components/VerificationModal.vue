
<!----------------------------------------이용법----------------------------------->
<!--<verification-modal :show="showModal" v-on:verifyConfirm="onSignup" v-on:close="onClose"></verification-modal>-->
<!--모달 사용 시, 위 :show 를 통하여 true/false 인자값을 bind 해주어야 합니다.-->
<!--modal의 확인/취소 역할은 verifyConfirm / close 를 통하여 show에 true/false를 bind 해줍시다.-->


<template>
    <v-dialog v-model="show" persistent >
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    {{$str("verification")}}
                </div>
                <v-spacer></v-spacer>
                    <!--아이콘 직접 import 필요 (해당 부분 kay 작업 중 2018-07-19)-->
                    <v-icon  @click="onClose">close</v-icon>
            </div>
            <div>
                <div class="modal-subject-2 color-black">
                    {{$str("slideVerifyText")}}
                </div>
                <verify-slider v-on:passcallback="putVerified"></verify-slider>
                <div class="p-absolute">
                    <span class="d-none" v-bind:class="{'warning-text' : warning_verify_terms}">{{$str("verifySlider")}}</span>
                </div>
            </div>
            <div class="text-xs-right mt-4">
                <v-spacer></v-spacer>
                <button @click="onClose" class="btn-rounded-white btn-blue-hover mr-3">
                    {{$str("cancel")}}
                </button>
                <button @click="onConfirm" class="btn-rounded-blue common-btn-hover">
                    {{$str("confirm")}}
                </button>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    import VerifySlider from "@/components/VerifySlider";

    export default {
        name: 'verificationModal',
        props: ['show'],
        components: {
            VerifySlider,
        },
        data() {
            return {
                isVerified: false,
                warning_verify_terms: false
            }
        },
        methods: {
            putVerified: function () {
                this.isVerified = true;
                this.warning_verify_terms = false;
            },
            onConfirm: function () {
                if (this.isVerified) {
                    this.$emit('verifyConfirm');
                } else {
                    this.warning_verify_terms = true;
                }
            },
            onClose: function () {
                this.$emit('close');
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

    .application .theme--light.v-icon, .theme--light .v-icon {
        color : black;
    }
</style>