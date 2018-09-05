<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    {{$str("securityAuthentication") }}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="onClose">close</i>
            </div>


            <!--이메일 입력-->
            <div class="mb-4">
                <div class=" color-black  mb-2 text-xs-left">
                    {{$str("email")}}
                </div>
                <div class="input-disabled  vertical-center disabled">{{getEmail}}</div>
            </div>

            <!--이메일인증-->
            <div>
                <div class=" color-black  mb-2 text-xs-left">
                    {{$str("emailVerification")}}
                </div>
                <verification-code v-on:verify="onCheckVerificationCode" :email="getEmail"
                                   :type="'email'"></verification-code>
            </div>


            <div class="text-xs-right">
                <v-spacer></v-spacer>
                <button @click="onClose" class="h6 btn-rounded-white text-white-hover mr-3">
                    {{$str("cancel")}}
                </button>
                <button @click="onConfirm" class="h6 btn-rounded-blue btn-blue-hover">
                    {{$str("confirm")}}
                </button>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import AccountService from "../../../../../service/account/AccountService";
    import MainRepository from "../../../../../vuex/MainRepository";
    import VerificationCode from '@/components/VerificationCode.vue';
    import CommonService from "../../../../../service/common/CommonService";

    export default {
        name: 'change-phone-modal',
        components: {
            VerificationCode
        },
        props: ['show'],
        data() {
            return {
                verify : false,
            }
        },
        computed: {
            getEmail: function () {
                return MainRepository.MyInfo.getUserInfo().email;
            }
        },
        methods: {
            // 인증코드 체크
            onCheckVerificationCode(code) {
                this.verify = true;
            },
            onClose: function () {
                this.$emit('close');
                this.$eventBus.$emit('refreshVerificationCode');
            },
            onConfirm: function () {
                if(this.verify){
                    this.$emit('confirm');
                }
            },
        },
    }
</script>
<style scoped>

    .modal-subject-wrapper {
        display: flex;
    }
</style>