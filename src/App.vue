<template>
    <div id="app">
        <home></home>
    </div>
</template>


<script>
    import Vue from "vue";
    import {setEventBus, setRouter} from "./common/common";
    import Home from './views/home/Home.vue'

    export default Vue.extend({
        name: "app",
        components: {
            'home': Home,
        },
        created() {
            setEventBus(this.$eventBus);
            setRouter(this.$router);
        }
    });
</script>
<style>
    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 100;
        src: url(assets/font/NotoSansSC-Thin.woff2) format('woff2'), url(assets/font/NotoSansSC-Thin.woff) format('woff'), url(assets/font/NotoSansSC-Thin.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 300;
        src: url(assets/font/NotoSansSC-Light.woff2) format('woff2'), url(assets/font/NotoSansSC-Light.woff) format('woff'), url(assets/font/NotoSansSC-Light.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 400;
        src: url(assets/font/NotoSansSC-Regular.woff2) format('woff2'), url(assets/font/NotoSansSC-Regular.woff) format('woff'), url(assets/font/NotoSansSC-Regular.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 500;
        src: url(assets/font/NotoSansSC-Medium.woff2) format('woff2'), url(assets/font/NotoSansSC-Medium.woff) format('woff'), url(assets/font/NotoSansSC-Medium.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 700;
        src: url(assets/font/NotoSansSC-Bold.woff2) format('woff2'), url(assets/font/NotoSansSC-Bold.woff) format('woff'), url(assets/font/NotoSansSC-Bold.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 900;
        src: url(assets/font/NotoSansSC-Black.woff2) format('woff2'), url(assets/font/NotoSansSC-Black.woff) format('woff'), url(assets/font/NotoSansSC-Black.otf) format('opentype');
    }

    #app {
        font-family: Noto Sans SC, Helvetica, Arial, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    .coinselect-1 {
        font-size: 16px;
        font-weight: 700;
    }

    .coinselect-2 {
        font-size: 16px;
        font-weight: 500;
    }

    .avatar {
        font-size: 16px;
        font-weight: 400;
    }

    .price-1 {
        font-size: 18px;
        font-weight: 700;
    }

    .price-2 {
        font-size: 14px;
        font-weight: 700;
    }

    .name {
        font-size: 14px;
        font-weight: 500;
    }

    .button-1 {
        font-size: 14px !important;
        font-weight: 700 !important;
    }

    .button-2 {
        font-size: 14px !important;
        font-weight: 400 !important;
    }

    .layer-text {
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #353535;
    }

    .display-1 {
        font-size: 36px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #353535;

    }

    .headline-2 {
        font-size: 26px !important;
        font-weight: bold !important;
        font-style: normal!important;
        font-stretch: normal !important;
        line-height: normal !important;
        letter-spacing: normal !important;
        color: #353535 !important;
    }

    .title-2 {
        font-size: 22px !important;
        font-weight: normal !important;
        font-style: normal !important;
        font-stretch: normal !important;
        line-height: normal !important;
        letter-spacing: normal !important;
        color: #353535 !important;
        font-weight: bold !important;
    }

    .subheading {
        font-size: 18px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #353535;
    }

    .caption {
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #353535;
    }

    /*placeholder CSS 설정*/
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    /*margin, padding 32px 설정*/
    .mb-4a {
        margin-bottom: 32px !important;
    }

    .mt-4a {
        margin-top: 32px !important;
    }

    .mr-4a {
        margin-right: 32px !important;
    }

    .ml-4a {
        margin-left: 32px !important;
    }

    .ma-4a {
        margin : 32px !important;
    }

    .pb-4a {
        padding-bottom: 32px;
    }

    .pt-4a {
        padding-top: 32px;
    }

    .pr-4a {
        padding-right: 32px;
    }

    .pl-4a {
        padding-left: 32px;
    }

    .pa-4a {
        padding : 32px;
    }

    /*버튼 호버 CSS 설정*/
    .btnHover:hover  {
        background-color: #316ee4 !important;
        color : white !important;
    }

    /*vuetify 버튼 클릭 시 CSS 에니메이션 숨김 처리*/
    .v-ripple__container {
        opacity: 0;
    }

    /*vuetify 버튼 hover 시, color foggy 현상 방지*/
    .v-btn:before {
        opacity: 0 !important;
        border-radius: 3px !important;
    }
    .v-btn {
        height: 40px !important;
        border-radius: 3px !important;
    }
    /*input text 필드 공통 CSS*/
    .common-input {
        height: 40px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        width: 100%;
        margin-bottom: 22px;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 12px;
        font-weight: 500;
        color: #9294a6;
    }

    /*common text style*/
    .TextDarkgray{
        color : #9294A6;
    }
    .TextBlack{
        color: #353535;
    }
    .TextDarkgray{
        color : #9294A6
    }
    .TextGray{
        color : #C8C8C8
    }
    .TextBlue{
        color : #214EA1
    }
    .TextPointBlue{
        color : #316EE4
    }
    .TextHover{
        color : #316EE4
    }
    .TextPrice{
        color : #E25422
    }
    .TextError{
        color : #BF2324
    }
    .TextWarning{
        color : #F9A825
    }
    .TextSuccess{
        color : #71AA3A
    }
    .TextWhite{
        color : #FFFFFF;
    }
    /* 웹에서*/
    @media only screen and (min-width: 960px) {
        .gridBox {
            padding-left: 12px;
            padding-right: 12px;

        }
    }
    /* mobile 에서*/
    @media only screen and (max-width: 959px) {
        .gridBox {
            padding-left: 4px;
            padding-right: 4px;

        }
    }

    .warning_border {
        border: solid 1px #e62a2b;
    }

    .warning_text {
        color: #e62a2b;
        font-size: 10px;
        display: block !important;
    }

    .hide_warning_text {
        display: none;
    }

    .text-input-wrapper {
        position: relative;
    }

    .warning-text-wrapper {
        position: absolute !important;
        bottom: 6px !important;;
        right: 0 !important;;
    }

</style>
