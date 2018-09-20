<template>
    <a class="btn-mypage" :class="{ noBtnCss : noBtn }"
       @click="onBtnClicked">{{ txt }}</a>
</template>

<script>
    export default {
        name: "btn-mypage",
        props: {
            txt: {},
            noBtn: {
                type: Boolean,
                default: ()=> false
            }
        },
        methods: {
            onBtnClicked(item) {
                this.$emit('click', item);
            },
        }
    }
</script>

<style scoped>
     .btn-mypage {
        font-size: 12px;
        letter-spacing: 0;
        text-align: center;
        color: #214ea1;
        line-height: 1;
        padding: 10px 14px;
        display: inline-block;
        vertical-align: middle;
        -webkit-transition: all 0.1s ease-out;
        -o-transition: all 0.1s ease-out;
        transition: all 0.1s ease-out;
        border-radius: 4px;
    }

    .btn-mypage:hover {
        background-color: #214ea1 !important;
        color: #fff !important;
    }

    @media (max-width: 959px) {
        .btn-mypage {
            font-size: 12px;
            letter-spacing: 0;
            text-align: center;
            background-color: #214ea1 !important;
            color: #fff !important;
            line-height: 1;
            padding: 10px 14px;
            display: inline-block;
            vertical-align: middle;
            -webkit-transition: all 0.1s ease-out;
            -o-transition: all 0.1s ease-out;
            transition: all 0.1s ease-out;
            border-radius: 4px;
            margin: 0 0 0 8px;
        }

        .btn-mypage:hover {
            opacity: .6;
        }
    }

    .noBtnCss {
        color: #9294a6 !important;
        background-color: transparent !important;
        cursor: default !important;
    }

    .noBtnCss:hover {
        opacity: 1;
        color: #9294a6 !important;
        background-color: transparent !important;
    }

</style>