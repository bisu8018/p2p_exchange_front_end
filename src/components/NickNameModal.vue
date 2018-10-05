<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    {{$str("nickNameTradePassword")}}
                </div>
            </div>
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
                           @keyup="onCheckNewPassword" maxlength="24" :placeholder="$str('nickNameTradePasswordPlaceholder')"
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
                           @keyup="onCheckPasswordConfirm" maxlength="24" :placeholder="$str('nickNameConfirmPasswordPlaceholder')"
                           v-bind:class="{'warning-border' : warning_confirm_password}">
                    <div class="warning-text-wrapper">
                        <span class="d-none" v-bind:class="{'warning-text' : warning_confirm_password}">{{$str('passwordMatch')}}</span>
                    </div>
                </div>
            </span>


            <div class="text-xs-right">
                <v-spacer></v-spacer>
                <button @click="onClose" class="h6 btn-rounded-white text-white-hover mr-3" v-if="option !== 'mypage'">
                    {{$str("cancel")}}
                </button>

                <!--닉네임 추가 확인 버튼-->
                <button @click="onNickNameCheck" class="h6 btn-rounded-blue btn-blue-hover">
                    {{$str("complete")}}
                </button>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    import Vue from 'vue';
    import {abUtils} from '@/common/utils';
    import AccountService from '../service/account/AccountService';
    import MainRepository from '../vuex/MainRepository';
    export default {
        name: 'nickNameModal',
        props: ['show', 'option'],
        data() {
            return {
                user: {
                    member_no: 0,
                    email: 'test@naver.com',
                    nick_name: '',
                },
                type : 'nickName',

                // 닉네임 & 거래 비밀번호
                new_password: '',
                confirm_password: '',
                warning_password: "",
                warning_new_password: "",
                warning_confirm_password: "",
                warning_nick_name: "",
            }
        },
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onComplete: function (type) {
                if (type === 'nickName') {
                    AccountService.Account.setNickName({
                        email: MainRepository.MyInfo.getUserInfo().email,
                        nickname: this.user.nick_name,
                        tradePassword: this.new_password
                    },  (result) => {
                        MainRepository.MyInfo.loadMyInfo(() => {
                            this.onClose();
                            this.onClearData();
                        })
                    })
                }
            },
            onClearData() {
                this.new_password =  '';
                this.confirm_password= '';
                this.user.nick_name = '';
            },
            onNickNameCheck() {
                // 닉네임 && 거래 비밀번호 전체 검사
                if (this.onCheckNickName() && this.onCheckNewPassword() && this.onCheckPasswordConfirm() ) {

                    this.onComplete('nickName');
                }
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
            }
        },
    }
</script>
<style scoped>

    .modal-subject-wrapper {
        display: flex;
    }
</style>