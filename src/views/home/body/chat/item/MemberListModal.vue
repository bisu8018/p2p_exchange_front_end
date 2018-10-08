<template>
    <div v-if="onModal">
        <div class="member-list-container">
            <v-layout class="member-list-header-box" align-center>
                <i class="material-icons c-pointer mr-2" @click="onClose()">keyboard_arrow_right</i>
                <h5>OTC Demo {{$str("userList")}}</h5>
            </v-layout>
            <v-divider/>
            <div class="member-list-wrapper">
                <div v-for="data in getMemberList" class="member-list" @click="goUserPage(data.memberNo)">
                    <avatar
                            :chat="'memberList'" :member="data" class="mr-2">
                    </avatar>
                    <span class="color-black h6"> {{ data.name }}</span>
                </div>
            </div>
        </div>
        <div class="modal-wrapper" @click="onClose()"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Avatar from '@/components/Avatar.vue';
    import MainRepository from "../../../../../vuex/MainRepository";

    export default Vue.extend({
        name: 'member-list-modal',
        components: {
            Avatar
        },
        props: {
            onModal: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {}
        },
        computed: {
            getMemberList() {
                return MainRepository.Chat.controller().getChatMembers();
            },
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
            goUserPage(memberNo) {
                //유저페이지 이동
                if (memberNo) MainRepository.router().goUserPage(memberNo);
            }
        }
    })
</script>

<style scoped>
    .member-list-header-box {
        display: flex;
        background-color: #002970;
        height: 64px;
        padding: 22px 0px 22px 8px;
        color: white;
        border-left: #334B99 1px solid;
    }

    .member-list-container {
        background: white;
        height: 100%;
        width: 70%;
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 2;
        animation: modal-on 0.25s ease-out;
    }

    .member-list:hover {
        background: #e8e8e8;
    }

    @keyframes modal-on {
        0% {
            right: -100%
        }
        100% {
            right: 0
        }
    }

    .member-list {
        padding: 16px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        cursor: pointer;
    }

    .modal-wrapper {
        width: 100%;
        height: 100%;
        top: 0px;
        background: black;
        position: absolute;
        opacity: 0.45;
        z-index: 1;
        animation: turn-on 0.25s ease-out;
    }

    .member-list-wrapper {
        overflow-y: auto;
        height: calc(100% - 64px);
    }

    @keyframes turn-on {
        0% {
            opacity: 0
        }
        100% {
            opacity: 0.45
        }
    }

</style>