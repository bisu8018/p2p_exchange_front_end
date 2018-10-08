<template>
    <div class="chat-wrapper">
        <div class="p-relative d-inline">
            <!--chat header section-->
            <v-layout class="header-box" align-center>
                <i class="material-icons c-pointer " @click="clickCancel()">close</i>
                <v-spacer></v-spacer>
                <h5>OTC Demo {{$str("Chat")}}</h5>
                <v-spacer></v-spacer>
                <i class="material-icons c-pointer mr-3" @click="onMemberListModal()">more_vert</i>
            </v-layout>
            <v-divider/>


            <!--chat contents section-->
            <div class="scroll-space" v-on:scroll.passive="scrollEvent" id="chatContentsWrapper">
                <div v-for="data in getMassageList">
                    <!--상대방-->
                    <div class="mb-4 display-flex" v-if="getChatSubscribe.myInfo.name !== data.sender.name ">
                        <div>
                            <avatar :member="data.sender" :chat="'memberList'" class="mt-1"/>
                        </div>
                        <div class="pl-2">
                            <div class="chat-name" @click="goUserPage(data.sender.memberNo)"> {{ data.sender.name }}
                            </div>
                            <div class="chat-content-wrapper text-xs-left color-black h6" v-if="data.type === 'CHAT'">
                                {{ data.message }}
                            </div>
                            <div class="chat-content-wrapper" v-else>
                                <a :href="data.message" target="_blank"><img :src="data.message" class="w-full"></a>
                            </div>
                            <div class="h6 color-darkgray mt-2 line-height-full text-xs-left">
                                {{ getTime(data.sendDateTime) }}
                            </div>
                            <!--<div class="chat-content-wrapper" v-else-if="data.attachedImgUrl !== ''">-->
                            <!--<img :src="data.attachedImgUrl" class="w-full">-->
                            <!--</div>-->
                        </div>
                    </div>

                    <!--자신-->
                    <div class="mb-4 display-flex " v-else>
                        <v-spacer></v-spacer>
                        <div class="pr-2">
                            <div class="chat-name text-xs-right" @click="goUserPage(data.sender.memberNo)"> {{
                                data.sender.name }}
                            </div>
                            <div class="chat-content-wrapper-mine text-xs-left color-black h6" v-if="data.type === 'CHAT'">
                                {{ data.message }}
                            </div>
                            <div class="chat-content-wrapper-mine" v-else>
                                <a :href="data.message" target="_blank"><img :src="data.message" class="w-full"></a>
                            </div>
                            <div class="h6 color-darkgray text-xs-right mt-2 line-height-full ">
                                {{ getTime(data.sendDateTime) }}
                            </div>

                        </div>
                        <div>
                            <avatar :chat="'memberList'" :member="data.sender" class="mt-1"></avatar>
                        </div>
                    </div>
                </div>
            </div>


            <!--chat input section-->
            <div class="chat-div text-white-hover py-3 pr-3 vertical-center pa-2">
                <div class="chat-input-wrapper vertical-center">
                    <!--파일첨부-->
                    <label class="file-icon-wrapper">
                        <i class="c-pointer material-icons color-darkgray file-icon">attachment</i>
                        <input type="file" id="file" ref="file" v-on:input="onCheckAttachmentFile()"
                               class="d-none" accept="image/*" />
                    </label>
                    <input type="text" v-model="inputValue" class="chat-input" :placeholder="$str('chatPlaceholder')"
                           @keypress.enter="onSend()"/>
                </div>
                <i class="c-pointer material-icons color-darkgray ml-3" @click="onSend()">send</i>
            </div>
        </div>

        <!--members list modal-->
        <member-list-modal :onModal="memberListModal" @close="onCloseMemberListModal"></member-list-modal>

    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import Avatar from '../../../../components/Avatar.vue';
    import MemberListModal from './item/MemberListModal';

    export default {
        name: "Chat",
        components: {
            Avatar, MemberListModal
        },
        data: () => ({
            inputValue: "",
            st: 0,
            needScrollDown: true,
            received_messages: [],
            memberListModal: false,
            latestPostTime: 0,

            //파일 첨부
            file: '',
            image: '',
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            getMassageList() {
                this.$nextTick(() => {
                    // 현재 스크롤이 최하단일경우 -> scroll
                    if (this.needScrollDown) {
                        this.scrollBottom();
                    }
                });
                return MainRepository.Chat.controller().getMessage();
            },
            getChatSubscribe() {
                return MainRepository.Chat.controller().getChatSubscribe();
            },
        },
        created() {
            this.$eventBus.$on('chatScrollBottom', () => {
                this.scrollBottom();
            });
        },
        mounted() {
            this.scrollBottom();
        },
        beforeDestroy() {
            this.$eventBus.$off('chatScrollBottom', () => {});
        },
        methods: {
            onSend(url) {
                let message;
                let type;

                if(url){        //이미지 파일 전송
                    message = url;
                    type = 'IMAGE_CHAT'
                }else{      //텍스트 전송
                    message = this.inputValue;
                    type = 'CHAT'
                }

                if (message !== '') {
                    //도배 및 중복 값 입력 방지
                    if (Date.now() - this.latestPostTime < 500) {
                        return false;
                    } else {
                        this.latestPostTime = Date.now();
                        this.$eventBus.$emit('chatSendMessage', message, type);
                        this.inputValue = '';
                    }
                }
            },
            getTime(date) {
                let _date = new Date(date).toTimeString().substr(0, 8);
                return _date;
            },
            onCheckAttachmentFile() {               //첨부파일 타입, 확장자, 용량 체크
                let fileInfo = this.$refs.file.files[0];
                let fileSize = fileInfo.size;
                // console.log(fileInfo);
                if (fileSize > 20000000) {
                    this.$eventBus.$emit('showAlert', 4012);
                    document.getElementById("file").value = "";
                    return false;
                }
                this.handleFileUpload();
            },
            handleFileUpload() {                    //첨부파일 사진 등록 및 출력
                this.file = this.$refs.file.files[0];
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(this.file);
                this.onPostImg();
            },
            submitFile() {      // 첨부파일 서버 전송
                let formData = new FormData();
                formData.append('file', this.file);
                return formData;
            },
            onPostImg() {
                MainRepository.Service.Common().fileUpload.fileUpload({
                    file: this.submitFile(),
                    purpose: 'groupchat'
                }, (url) => {
                    this.onSend(url);
                    this.file = '';
                    this.image = '';
                });
            },
            clickCancel() {
               // this.$eventBus.$emit('chatDisconnect')
                MainRepository.Chat.isClosed();
            },
            scrollBottom() {
                let chatWrapper = document.getElementById("chatContentsWrapper");
                chatWrapper.scrollTop = chatWrapper.scrollHeight;
            },
            scrollEvent(e) {
                this.offsetTop = e.target.scrollTop;
                this.offsetTop = ((e.target.scrollTop || 0) - window.pageYOffset);
                let a = this.$el.querySelector(".scroll-space").clientHeight;
                let b = this.$el.querySelector(".scroll-space").scrollHeight;
                this.st = b - (a + this.offsetTop);
                this.needScrollDown = this.st < 120;
            },
            onMemberListModal() {
                this.memberListModal = true;
            },
            onCloseMemberListModal() {
                this.memberListModal = false;
            },
            goUserPage(memberNo) {
                //유저페이지 이동
                if(memberNo) MainRepository.router().goUserPage(memberNo);
                if(this.isMobile) MainRepository.Chat.isClosed();
            }
        }

    }
</script>

<style scoped>
    .chat-wrapper {
        position: relative;
        background-color: #ffffff;
        height: 100%;
        text-align: left;
        width: 100%;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    }

    .header-box {
        display: flex;
        background-color: #002970;
        height: 64px;
        padding: 22px 0px 22px 24px;
        color: white;
        border-left: #334B99 1px solid;
    }

    .scroll-space {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: relative;
        background-color: #ffffff;
        padding-top: 24px;
        padding-left: 16px;
        padding-right: 16px;
        height: calc(100% - 126px);
    }

    .chat-div {
        color: #214ea1;
        background-color: #ffffff;
        position: relative;
        width: 100%;
        height: 62px;
        border-top: solid 1px #d1d1d1;
    }

    .chat-input-wrapper {
        border: solid 1px #d1d1d1;
        height: 40px;
        width: 100%;
        border-radius: 2px;
    }

    .chat-input {
        height: 100%;
        width: 100%;
        color: #353535;
        padding-left: 8px;
        outline: none;
    }

    .file-icon-wrapper {
        padding-left: 4px;
        padding-right: 4px;
        border-right: solid 1px #d1d1d1;
    }

    .file-icon {
        font-size: 27px;
        margin-top: 5px;
    }

    .display-flex {
        display: flex;
    }

    .chat-content-wrapper {
        width: 170px;
        padding: 8px;
        background: #d8d8d8;
        border-radius: 2px;
    }

    .chat-content-wrapper-mine {
        width: 170px;
        padding: 8px;
        background: #c8d5ef;
        border-radius: 2px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px white;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #d8d8d8;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #d8d8d8;
    }

</style>