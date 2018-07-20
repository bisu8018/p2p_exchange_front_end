<template>
    <v-dialog v-model="show" persistent >
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="price-1 text-xs-left text-black">
                    {{$str("verification")}}
                </div>
                <v-spacer></v-spacer>
                    <!--아이콘 직접 import 필요 (해당 부분 kay 작업 중 2018-07-19)-->
                    <v-icon text-darkgray @click="onClose">close</v-icon>
            </div>
            <div>
                <div class="modal-subject-2 text-black">
                    {{$str("slideVerifyText")}}
                </div>
                <verify-slider v-on:passcallback="putVerified"></verify-slider>
                <div class="absolute">
                    <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_verify_terms}">{{$str("verifySlider")}}</span>
                </div>
            </div>
            <div class="text-xs-right mt-4">
                <v-spacer></v-spacer>
                <button @click="onClose" class="common-rounded-flat-button common-btn-hover mr-3">
                    {{$str("cancel")}}
                </button>
                <button @click="onConfirm" class="common-rounded-button common-btn-hover">
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
</style>