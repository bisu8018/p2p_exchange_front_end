<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    {{$str("adPostSuccess")}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="onClose" >close</i>
            </div>

            <!--******************************************
                        NickName / Trade Password
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
                               v-model="nick_name"
                               v-bind:class="{'warning-border' : warning_nick_name}" @keyup="onCheckNickName">
                        <div class="warning-text-wrapper">
                            <span class="d-none"
                                  v-bind:class="{'warning-text' : warning_nick_name}">{{$str('warning_nick_name')}}</span>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    </v-dialog>
</template>
<script>
    import {abUtils} from '@/common/utils';

    export default {
        name: 'postAdModal',
        props: ['show'],
        data() {
            return {


            }
        },
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onConfirm: function () {
                this.$emit('close');
            },
        },
    }
</script>
<style scoped>
    .modal-subject-wrapper {
        display: flex;
    }
</style>