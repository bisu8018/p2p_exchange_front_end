<template>
    <div class="block-list-item">

        <!-- dialog -->
        <dialog-unblock
                :showDialog="onCheckUnblock"
                @close="offDialog"
                @done="onUnblock(data.blockMemberNo)"
        />

        <!-- item -->
        <div class="block-list-item_wrapper">
            <div>
                <avatar :email="data.email" />
                <p class="color-blue-active" @click="goUserPage">{{ data.nickname || data.email }}</p>
            </div>
            <div>
                <btn-mypage
                        :txt="$str('unblock')"
                        @click="clickUnblock"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar.vue';
    import BtnMypage from "./BtnMypage";
    import MainRepository from "../../../../../vuex/MainRepository";
    import DialogUnblock from "../../../../../components/dialog/DialogUnblock";

    export default {
        name: "block-list-item",
        components: {
            DialogUnblock,
            BtnMypage,
            Avatar
        },
        props: {
            data: {}
        },
        data() {
            return {
                onCheckUnblock: false,
            }
        },
        methods: {
            clickUnblock() {
                this.onCheckUnblock = true;
            },

            offDialog() {
                this.onCheckUnblock = false;
            },

            onUnblock(num) {
                let self = this;
                MainRepository.Users.deleteBlockThisUser({
                        email : MainRepository.MyInfo.getUserInfo().email,
                        BlockMemberNo: num,
                    }, function (result) {
                        self.onCheckUnblock = false;
                        self.$eventBus.$emit('refreshMypage');
                        self.$eventBus.$emit('showAlert', 2252);
                    }
                )
            },
            goUserPage() {
                //유저페이지 이동
                MainRepository.router().goUserPage(this.data.blockMemberNo);
            }
        }
    }
</script>

<style scoped>
    .block-list-item {
        position: relative;
        width: 100%;
    }

    .block-list-item_wrapper {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        position: relative;
        width: 100%;
    }

    .block-list-item_wrapper p {
        display: inline-block;
        font-size: 14px;
        color: #214ea1;
        margin-left: 16px;
    }
</style>