<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper p-relative ">
                <div class="sprite-img2 ic-appeal-octa-lg appeal-css"></div>
                <i class="material-icons color-black close-btn-css" @click="onClose">close</i>
            </div>

            <h4 class="font-weight-bold mt-3 color-black">
                {{$str("myTokenModalWarn")}}
            </h4>

            <h5 class=" mt-3 color-darkgray">
                {{$str("myTokenModalExplain1")}}
            </h5>

            <h5 class="color-red ">
                {{$str("myTokenModalExplain2")}}
            </h5>

            <div class="text-xs-right mt-3">
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
        name: 'my-token-modal',
        props: ['show'],
        data() {
            return {}
        },
        computed: {},
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onConfirm: function () {
                this.$emit('confirm');
            },
        },
    }
</script>
<style scoped>

    .modal-subject-wrapper {
        display: flex;
    }

    .close-btn-css {
        cursor: pointer;
        position: absolute;
        right: 0;
    }

    .appeal-css {
        margin: auto;
    }
</style>