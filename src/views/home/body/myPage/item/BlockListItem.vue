<template>
    <div class="block-list-item_wrapper">
        <div>
            <avatar :email="data.email" />
            <p class="color-blue text-white-hover c-pointer">{{data.nickName}}</p>
        </div>
        <div>
            <btn-mypage
                    :txt="$str('unblock')"
                    @click="onUnblock"
            />
        </div>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar.vue';
    import BtnMypage from "./BtnMypage";

    export default {
        name: "block-list-item",
        components: {
            BtnMypage,
            Avatar},
        props: {
            data: {}
        },
        methods: {
            onUnblock() {

            }
        }
    }
</script>

<style scoped>
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