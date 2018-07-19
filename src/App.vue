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
        font-weight: 400;
        src: url(assets/font/notosans/NotoSansSC-Regular.woff2) format('woff2'), url(assets/font/notosans/NotoSansSC-Regular.woff) format('woff'), url(assets/font/notosans/NotoSansSC-Regular.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 500;
        src: url(assets/font/notosans/NotoSansSC-Medium.woff2) format('woff2'), url(assets/font/notosans/NotoSansSC-Medium.woff) format('woff'), url(assets/font/notosans/NotoSansSC-Medium.otf) format('opentype');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 700;
        src: url(assets/font/notosans/NotoSansSC-Bold.woff2) format('woff2'), url(assets/font/notosans/NotoSansSC-Bold.woff) format('woff'), url(assets/font/notosans/NotoSansSC-Bold.otf) format('opentype');
    }

    /*material font*/
    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: url(assets/font/material/MaterialIcons-Regular.eot);
        /* For IE6-8 */
        src: local('Material Icons'), local('MaterialIcons-Regular'), url(assets/font/material/MaterialIcons-Regular.woff2) format('woff2'), url(assets/font/material//MaterialIcons-Regular.woff) format('woff'), url(assets/font/material/MaterialIcons-Regular.ttf) format('truetype');
    }




    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;
        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;
        /* Support for IE. */
        font-feature-settings: 'liga';
    }


    /* Rules for sizing the icon. */

    .material-icons.md-12 {
        font-size: 12px;
    }


    .material-icons.md-18 {
        font-size: 18px;
    }

    .material-icons.md-24 {
        font-size: 24px;
    }

    .material-icons.md-36 {
        font-size: 36px;
    }

    .material-icons.md-48 {
        font-size: 48px;
    }


    /* Rules for using icons as white on a dark background. */

    .material-icons.md-light {
        color: rgba(255, 255, 255, 1);
    }

    .material-icons.md-light.md-inactive {
        color: rgba(255, 255, 255, 0.3);
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

    .text-black {
        color: #353535;
    }

    .text-darkgray {
        color: #9294A6;
    }

    .text-gray {
        color: #C8C8C8;
    }

    .text-blue {
        color: #214EA1;
    }

    .text-pointblue {
        color: #316EE4;
    }

    .text-hover {
        color: #316EE4;
    }

    .text-price {
        color: #E25422;
    }

    .text-error {
        color: #E62A2B;
    }

    .text-warning {
        color: #F9A825;
    }

    .text-success {
        color: #71AA3A;
    }

    .text-white {
        color: #FFFFFF;
    }

    /* 웹에서 gutter 주기*/
    @media only screen and (min-width: 960px) {
        .flex{
            padding-left: 12px;
            padding-right: 12px;
        }
    }
    /* mobile 에서 gutter 주기*/
    @media only screen and (max-width: 959px) {
        .flex{
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
