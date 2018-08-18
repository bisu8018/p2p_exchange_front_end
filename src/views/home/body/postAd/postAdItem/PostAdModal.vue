<template>
    <v-dialog v-model="show" persistent>
        <div class="modal-subject-wrapper mb-3">
            <div class="h3 text-xs-left color-black bold">
                {{$str("adPostSuccess")}}
            </div>
            <v-spacer></v-spacer>
            <i class="material-icons color-black c-pointer" @click="onClose">close</i>
        </div>
        <!--******************************************
                    NickName / Trade Password
         ******************************************-->
        <div  class="text-xs-left vertical-center mb-4">
            <i class="material-icons check-icon ml-0 mr-2">check_circle</i>
            <span>{{$str("determine")}}</span>
        </div>
        <div class="text-xs-right">
            <button @click="onDetermine" class="h6 btn-rounded-blue btn-blue-hover color-black ">
                {{$str("determine")}}
            </button>
        </div>
    </v-dialog>
</template>
<script>
    import {abUtils} from '@/common/utils';

    export default {
        name: 'postAdModal',
        props: ['show'],
        data() {
            return {}
        },
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onDetermine: function () {
                this.$emit('determine');
            },
        },
    }
</script>
<style scoped>
    .modal-subject-wrapper {
        display: flex;
    }
    .check-icon {
        font-size: 30px;

        font-weight: bold;
        color: #71aa3a;
        margin: -7px;
    }
</style>