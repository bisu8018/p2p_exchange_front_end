<template>
    <div id="app">
        <home></home>
    </div>
</template>


<script>
    import Vue from "vue";
    import {
        setEventBus,
        setRouter
    } from "./common/common";

    import Home from './views/home/Home.vue'
    import MainRepository from './vuex/MainRepository.ts'

    export default Vue.extend({
        name: "app",
        components: {
            'home': Home,
        },
        created() {
            setEventBus(this.$eventBus);
            setRouter(this.$router);
        },
        methods: {}
    });
</script>

<style>
    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 400;
        src: url(assets/font/notosans/NotoSansSC-Regular.woff) format('woff');
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 500;
        src: url(assets/font/notosans/NotoSansSC-Medium.woff) format('woff')
    }

    @font-face {
        font-family: 'Noto Sans SC';
        font-style: normal;
        font-weight: 700;
        src: url(assets/font/notosans/NotoSansSC-Bold.woff) format('woff');
    }

    /*material font*/

    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        /* For IE6-8 */
        src: local('Material Icons'), local('MaterialIcons-Regular'), url(assets/font/material/MaterialIcons-Regular.ttf) format('truetype');
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

    .v-divider {
        background: #d1d1d1 !important;
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

    /* 초기화 태그 */

    /* http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    */

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        /*font: inherit;*/
        font-size: 14px;
        font-weight: 400;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    body {
        line-height: 1;
        -ms-touch-action: unset;
        -webkit-user-select: unset;
        -moz-user-select: unset;
        -ms-user-select: unset;
        user-select: unset;
    }

    ol,
    ul {
        list-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: '';
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    b {
        font-weight: bold;
    }

    /* 웹에서 gutter 주기*/

    @media only screen and (min-width: 960px) {
        .flex {
            padding-left: 12px;
            padding-right: 12px;
        }
    }

    /* mobile 에서 gutter 주기*/

    @media only screen and (max-width: 959px) {
        .flex {
            padding-left: 4px;
            padding-right: 4px;
        }
    }

    #app {
        font-family: Noto Sans SC, Helvetica, Arial, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #353535;
        font-weight: 400;
    }

    /*placeholder CSS 설정*/

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    /*스크롤바 스타일 설정*/
    /* width */
    ::-webkit-scrollbar {
        width: 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #e0e0e0;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #a0a0a0;
        border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #a0a0a0;
    }

    /*체크박스 CSS
    이용법 :
    <input type="checkbox" v-model="checkbox" id="termsCheckbox"> //실제 체크박스
    <label for="termsCheckbox"><span><i class="material-icons">done</i></span>{{$str('termsLabel')}}</label> //스타일 체크박스
       */

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"] + label {
        color: #353535;
        font-size: 12px;
        align-items: center;
        display: flex;
    }

    input[type="checkbox"] + label span {
        display: inline-block;
        position: relative;
        min-width: 20px;
        min-height: 20px;
        margin-right: 8px;
        vertical-align: middle;
        background: white;
        border: 1px solid #8d8d8d;
        cursor: pointer;
        border-radius: 2px;
    }

    input[type="checkbox"]:checked + label span {
        border: 1px solid #214ea1;
        font-size: 12px;
        color: #214ea1;
        font-weight: bold;
    }

    input[type="checkbox"]:hover + label span {
        border: 1px solid #214ea1;
    }

    input[type="checkbox"] + label span i {
        display: none;
    }

    input[type="checkbox"]:checked + label span i {
        position: absolute;
        right: 1px;
        bottom: 1px;
        padding-top: 1px;
        padding-left: 2px;
        font-size: 16px;
        color: #214ea1;
        font-weight: bold;
        display: inline-block;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }

    /*라디오 버튼 CSS
      <input type="radio" id="mainnet" name="tokenServer"/>
        <label for="mainnet">
            <span>
                <i class="material-icons">brightness_1</i>
            </span>
            <h5 class="d-inline-block">{{ $str("mainnet") }}</h5>
        </label>
    */

    input[type="radio"] {
        display: none;
    }

    input[type="radio"] + label {
        color: #353535;
        font-size: 12px;
        align-items: center;
        display: flex;
    }

    input[type="radio"] + label span {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        text-align: center;
        background: white;
        border: 1px solid #8d8d8d;
        cursor: pointer;
        border-radius: 10px;
    }

    input[type="radio"]:checked + label span {
        border: 1px solid #214ea1;
        font-size: 12px;
        color: #214ea1;
        font-weight: bold;
    }

    input[type="radio"]:hover + label span {
        border: 1px solid #214ea1;
    }

    input[type="radio"] + label span i {
        display: none;
    }

    input[type="radio"]:checked + label span i {
        font-size: 14px;
        vertical-align: middle;
        color: #214ea1;
        font-weight: bold;
        display: inline-block;
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        margin-bottom: 3px;
    }

    /* input number에서 측면 버튼 없애기*/
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']:hover::-webkit-inner-spin-button,
    input[type='number']:hover::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }

    .application .nav {
        z-index: 110 !important;
        width: 100%;
    }

    /*폰트 색깔*/

    .color-black {
        color: #353535;
    }

    .color-gray {
        color: #C8C8C8;
    }

    .color-darkgray {
        color: #9294A6;
    }

    .color-blue {
        color: #214EA1;
    }

    .color-blue-active {
        color: #214EA1;
        cursor: pointer;
    }

    .color-blue-active:hover {
        color: #316ee4 !important;

    }

    .color-pointblue {
        color: #316EE4;
    }

    .color-orange {
        color: #F9A825;
    }

    .color-orange-price {
        color: #E25422;
    }

    .color-red {
        color: #E62A2B;
    }

    .color-red-error {
        color: #BF2324;
    }

    .color-green {
        color: #71AA3A;
    }

    .color-white {
        color: #FFFFFF;
    }

    /* 백그라운드 색깔 */

    .bg-white {
        background-color: #fff;
    }

    .bg-gray {
        background-color: #f8f8fa;
    }

    .bg-overlay {
        background-color: rgba(0, 0, 0, 0.45)
    }

    .bg-blue {
        background-color: #214ea1;
    }

    /* border 색깔 */

    .bd-green {
        border-color: #71aa3a;
    }

    .bd-orange {
        border-color: #f9a825;
    }

    .bd-red {
        border-color: #e62a2b;
    }

    bd-btm-none {
        border-bottom: none !important;
    }

    /* 마진, margin 설정*/

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
        margin: 32px !important;
    }

    .mb-6 {
        margin-bottom: 64px !important;
    }

    .mt-6 {
        margin-top: 64px !important;
    }

    .mr-6 {
        margin-right: 64px !important;
    }

    .ml-6 {
        margin-left: 64px !important;
    }

    .ma-6 {
        margin: 64px !important;
    }

    .mb-6a {
        margin-bottom: 100px !important;
    }

    .mt-6a {
        margin-top: 100px !important;
    }

    .mr-6a {
        margin-right: 100px !important;
    }

    .ml-6a {
        margin-left: 100px !important;
    }

    .ma-6a {
        margin: 100px !important;
    }

    .ma-a {
        margin: auto !important;
    }

    /* 패딩, padding 설정 */

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
        padding: 32px;
    }

    /* 폰트 사이즈, 웨이트 등 */

    /*상하 가운데 정렬*/

    .vertical-center {
        align-items: center;
        display: flex;
    }

    /*좌우 가운데 정렬*/

    .horizontal-center {
        margin: 0 auto;
    }

    /*텍스트 정렬*/
    .ta-center {
        text-align: center;
    }

    .ta-right {
        text-align: right;
    }

    .ta-left {
        text-align: left;
    }

    /*overflow*/
    .of-visible {
        overflow: visible;
    }


    /*태그*/
    h1 {
        font-size: 26px;
        line-height: 1.4em;
    }

    h2 {
        font-size: 22px;
    }

    h3 {
        font-size: 18px;
    }

    h4 {
        font-size: 16px;
    }

    h5 {
        font-size: 14px;
        line-height: 1.6em;
    }

    h6 {
        font-size: 12px;
        line-height: 1.6em;
    }

    p {
        font-size: 10px;
        line-height: 1.4em;
        margin-bottom: 0 !important;
    }

    button {
        display: inline-block;
    }

    /*button tag의 border없애기*/
    button:focus {
        outline: 0;
    }

    /*button tag의 border없애기 in firefox*/
    button::-moz-focus-inner {
        border: 0;
    }

    /*클래스*/
    .h1 {
        font-size: 26px;
        line-height: 1.4em;
    }

    .h2 {
        font-size: 22px;
    }

    .h3 {
        font-size: 18px;
    }

    .h4 {
        font-size: 16px;
    }

    .h5 {
        font-size: 14px;
        line-height: 1.6em;
    }

    .h6 {
        font-size: 12px;
        line-height: 1.6em;
    }

    .p {
        font-size: 10px;
        line-height: 1.4em;
    }

    .normal {
        font-weight: 400;
    }

    .medium {
        font-weight: 500;
    }

    .bold {
        font-weight: 700;
    }

    .line-height-1 {
        line-height: 1 !important;
    }

    .line-height-full {
        line-height: 100% !important;
    }

    /* Warning 관련 */

    .warning-border {
        border: solid 1px #e62a2b !important;
    }

    .warning-text {
        color: #e62a2b;
        font-size: 10px;
        display: block !important;
    }

    .warning-text-wrapper {
        position: absolute !important;
        bottom: 6px !important;
        right: 0 !important;
        top: 42px !important;
    }


    /*드래그 방지*/
    .no-drag {
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    /*vuetify 버튼 클릭 시 CSS 에니메이션 숨김 처리*/

    .v-ripple__container {
        opacity: 0;
    }

    /*button 공통 CSS*/

    .btn-blue {
        /*사각형 파랑배경 흰색폰트 버튼*/
        height: 40px;
        width: 100%;
        background: #214ea1;
        color: white;
        border-radius: 2px;
        font-size: 14px;
    }

    .btn-rounded-blue {
        /*라운드 파랑배경 흰색폰트 버튼*/
        height: 36px;
        padding-left: 16px;
        padding-right: 16px;
        background: #214ea1;
        border-radius: 30px;
        color: white;
        font-size: 14px;
    }

    .btn-white {
        /*사각형 하얀배경 파랑폰트 파랑보더 버튼*/
        border: 1px solid #214ea1 !important;
        margin-bottom: -10px;
        width: 100%;
        height: 40px;
        background: white;
        border-radius: 3px;
        color: #214EA1;
        font-size: 14px;
    }

    .btn-rounded-white {
        /*라운드 하얀배경 파랑폰트 버튼*/
        height: 36px;
        padding-left: 16px;
        padding-right: 16px;
        background: white;
        border-radius: 30px;
        color: #214ea1;
        font-size: 14px;
    }

    .btn-disabled-gray {
        height: 36px;
        padding-left: 16px;
        padding-right: 16px;
        background: white;
        border-radius: 30px;
        color: #9294a6;
        font-size: 12px;
    }

    /*버튼 호버 CSS 설정*/
    .btn-rounded-blue:hover {
        background-color: #316ee4 !important;
        color: white !important;
    }

    .btn-blue-hover:hover {
        background-color: #316ee4 !important;
        color: white !important;
    }

    .btn-white:hover {
        background-color: white !important;
        color: #316ee4 !important;
        border: 1px solid #316ee4 !important;
    }

    .text-white-hover:hover {
        color: #316ee4 !important;
    }

    /*refresh 버튼*/

    .refresh-btn {
        padding-top: 8px;
        padding-bottom: 8px;
    }

    .refresh-icon {
        top: 5px;
        position: absolute;
        left: 10px;
    }

    .refresh-btn-span {
        margin-top: 1px;
        margin-left: 22px;
    }

    /*============셀렉박스 공통 CSS*========*/

    .comp-selectbox {
        width: 100%;
        height: 40px;
        border-radius: 2px;
        background-color: #ffffff;
        border: solid 1px #8d8d8d;
        padding-left: 12px;
        cursor: pointer;
        outline: none;
    }

    .comp-selectbox-parted {
        border: none !important;
        border-right: solid 1px #8d8d8d !important;;
    }

    /*
      .comp-selectbox-parted:hover {
          border-right: solid 1px #316ee4 !important;
      }*/

    .comp-selectbox:hover {
        border: solid 1px #316ee4;
    }

    .comp-selectbox-active {
        border: solid 1px #316ee4;
    }

    .comp-selectbox-icon { /*셀렉박스 화살표 아이콘 공통 CSS*/ /*   </select><v-icon class="common-selectbox-icon ">keyboard_arrow_down</v-icon>    추가!!    */
        position: absolute;
        right: 8px;
        top: 9px;
        pointer-events: none;
        color: #9294a6;
        transition: 0.3s all ease;
        -webkit-transition: 0.3s all ease;
        -moz-transition: 0.3s all ease;
        -ms-transition: 0.3s all ease;
        -o-transition: 0.3s all ease;
    }

    .comp-selectbox-icon-phone {
        left: 38px !important;
        right: auto !important;
    }

    .arrow-spin-left {
        -ms-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .select-option-list {
        display: none;
        overflow: auto;
        position: absolute;
        margin-top: 4px;
        z-index: 1500;
        padding: 0;
        width: 100%;
        border-radius: 2px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
        background-color: #ffffff;
        border: solid 1px #b2b2b2;
        animation-duration: 0.3s;
    }

    .select-option-small{
        padding-left: 17px !important;
    }

    .scroll-out {
        max-height: 200px;
        display: block;
        opacity: 1;
        animation-name: scroll-out;
    }

    .scroll-up {
        display: block;
        opacity: 0;
        max-height: 0px;
        animation-name: scroll-up;
    }

    @keyframes scroll-out {
        0% {
            opacity: 0;
            max-height: 0px;
        }
        100% {
            opacity: 1;
            max-height: 200px;
        }
    }

    @keyframes scroll-up {
        0% {
            opacity: 1;
            max-height: 200px;
        }
        100% {
            opacity: 0;
            max-height: 0px;

        }
    }

    .select-option:hover {
        background-color: #f8f8fa;
    }

    .select-option:active {
        background-color: #316ee4;
        color: white
    }

    .selected-option {
        background-color: #316ee4 !important;
        color: white
    }

    .select-option {
        height: 40px;
        display: block;
        background-color: white;
        border-bottom: 1px solid #dddddd;
        cursor: pointer;
        width: 100%;
        position: relative;
        list-style-type: none;
        text-align: left;
        padding: 10px 24px 10px 24px;
        font-size: 12px;
    }

    .select-option:last-child {
        border-bottom: none;
    }

    .selectbox-wrapper { /*input text box 와 selectbox 결합 시 적용*/
        display: flex;
        border: solid 1px #8d8d8d;
    }

    .selectbox-wrapper:hover {
        border-color: #316ee4;
    }

    .selectbox-wrapper:hover :first-child :first-child :first-child {
        border-color: #316ee4 !important;
    }

    .selectbox-width-part {
        width: 80px;
        left: 0;
        bottom: 0;
    }


    /*input text 필드 공통 CSS*/
    input {
        position: relative !important;
    }

    .input {
        height: 40px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        width: 100%;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 14px;
        color: #353535;
        outline: none;
        padding-bottom: 2px;
    }

    .input:hover, .input:focus {
        border: solid 1px #316ee4;
    }

    .input-disabled {
        height: 40px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        background: #f8f8fa;
        width: 100%;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 12px;
        color: #8d8d8d;
        outline: none;
        pointer-events: none;
    }

    .input-disabled2 {
        background: #f8f8fa !important;
        color: #9294a6;
        cursor: no-drop;
        pointer-events: none;
    }

    .input-disabled2 > div > div {
        background: #f8f8fa !important;
        color: #9294a6;
        cursor: no-drop;
        pointer-events: none;
    }

    .common-textarea {
        height: 90px;
        width: 100%;
        padding: 8px;
        resize: none;
        outline: none;
    }

    .common-textarea:hover, .common-textarea:focus {
        border: #316ee4;
    }

    /*인증코드 전달 버튼*/
    /*
    <span class="cs-click-send text-white-hover" @click="sendVerificationCode">{{$str("clickToSend")}}</span>
    */

    .cs-click-send {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #214ea1;
        position: absolute;
        right: 11px;
        top: 10px;
        cursor: pointer;
    }

    /*타이머*/
    .cs-timer {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
        position: absolute;
        right: 11px;
        top: 10px;
    }

    /*인증코드 인증 성공*/
    .cs-code-verified {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #214ea1;
        position: absolute;
        right: 11px;
        top: 10px;
    }

    /*중요 별표 **  (important asterisk)*/
    /*       <div class="cs-red-asterisk">*</div>        */
    .cs-red-asterisk {
        display: inline-block;
        margin-right: 4px;
        font-weight: bold;
        color: #bf2324;
    }

    /*vuetify dialog*/

    .v-dialog {
        margin: 16px !important;
        background: white;
        max-width: 384px;
        padding: 24px 16px 24px 16px;
        overflow-y: inherit !important;
    }

    /* 포지션 */

    .p-absolute {
        position: absolute;
    }

    .p-relative {
        position: relative;
    }

    .p-fixed {
        position: fixed;
    }

    .p-static {
        position: static;
    }

    /* 디스플레이 관련 */

    .d-none {
        display: none ;
    }

    .d-none-important {
        display: none !important;
    }

    .mobile-hide {
        display: none;
    }

    .d-grid {
        display: grid;
    }

    .d-block {
        display: block;
    }

    .d-inline {
        display: inline;
    }

    .d-inline-table {
        display: inline-table;
    }

    .d-inline-block {
        display: inline-block;
        vertical-align: middle;
    }

    .d-inline-block-none-middle {
        display: inline-block;
    }

    .d-inherit {
        display: inherit;
    }

    .d-contents {
        display: contents;
    }

    /* 비지빌리티 */

    .v-visible {
        visibility: visible;
    }

    .v-hidden {
        visibility: hidden;
    }

    /* 이 아이는 커서 */

    .c-pointer {
        cursor: pointer;
    }

    .c-progress {
        cursor: progress;
    }

    /*float */

    .f-right {
        float: right;
    }

    .f-left {
        float: left;
    }

    /*길이관련*/

    .w-full {
        width: 100%;
    }

    .w-half {
        width: 50%;
    }

    .h-full {
        height: 100%;
    }

    .h-half {
        height: 50%;
    }

    /*아웃라인 없애기*/

    .o-none {
        outline: none;
    }

    /*클릭 이벤트 방지*/
    .pe-none {
        pointer-events: none;
    }

    /*divider ex) <div class="divider"></div>*/

    .divider {
        height: 1px;
        width: 100%;
        background-color: #d8d8d8;

    }

    /*hover시 상단 말풍선. 아래와 같이 사용가능*/
    /*<a class="tooltips">*/
    /*<span>Alipay</span>*/
    /*</a>*/

    .tooltip {
        position: relative;
        display: inline;
    }

    .tooltip .tooltip-content {
        display: none;
        position: absolute;
        padding: 8px;
        color: #FFFFFF;
        background: #545c6a;
        font-size: 12px;
        text-align: center;
        border-radius: 2px;
        width: -moz-max-content;
        width: max-content;
        line-height: 1;
    }

    .tooltip .tooltip-content:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -8px;
        width: 0;
        height: 0;
        border-top: 6px solid #545c6a;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
    }

    @media (min-width: 959px) {
        :hover.tooltip .tooltip-content {
            display: block;
            bottom: 140%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
        }
    }
    @media (max-width: 959px) {
        :active.tooltip .tooltip-content {
            display: block;
            bottom: 140%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
        }
    }

    /*vuetify 버튼 hover 시, color foggy 현상 방지*/

    /*.v-btn:before {*/

    /*opacity: 0 !important;*/

    /*border-radius: 3px !important;*/

    /*}*/

    /*.v-btn {*/

    /*height: 40px !important;*/

    /*border-radius: 3px !important;*/

    /*}*/

    /* 랜딩페이지 Carousel */

    .application .v-parallax__content {
        padding: 0 !important;
    }

    .application .v-btn__content i {
        font-size: 32px !important;
    }

    .application .v-carousel__controls {
        background: none;
    }

    /*섹션 보더*/

    .section-border {
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.4);
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.4);
    }

    /*섹션 보더 그림자 더 퍼진거*/

    .section-border-depth {
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;

        -webkit-box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        -moz-box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
        box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.23);
    }

    /*Sprite 이미지*/

    .ic-no-ad-lg {
        background: 0px 0px;
        width: 128px;
        height: 150px;
    }

    .ic-merchant-ad-lg {
        background: 0px -150px;
        width: 128px;
        height: 128px;
    }

    .ic-merchant-logo-lg {
        background: -128px -150px;
        width: 128px;
        height: 128px;
    }

    .ic-merchant-service-lg {
        background: -256px -150px;
        width: 128px;
        height: 128px;
    }

    .ic-merchant-ad-sm {
        background: 0px -278px;
        width: 90px;
        height: 90px;
    }

    .ic-merchant-logo-sm {
        background: -90px -278px;
        width: 90px;
        height: 90px;
    }

    .ic-merchant-service-sm {
        background: -180px -278px;
        width: 90px;
        height: 90px;
    }

    .ic-complete-lg {
        background: 0px -368px;
        width: 86px;
        height: 86px;
    }

    .ic-appeal-lg {
        background: -86px -368px;
        width: 86px;
        height: 86px;
    }

    .ic-cancel-lg {
        background: -172px -368px;
        width: 86px;
        height: 86px;
    }

    .ic-no-ad-sm {
        background: 0px -454px;
        width: 76px;
        height: 90px;
    }

    .ic-upload {
        background: 0px -544px;
        width: 34px;
        height: 24px;
    }

    .ic-allb-lg {
        background: 0px -568px;
        width: 34px;
        height: 34px;
    }

    .ic-btc-lg {
        background: -34px -568px;
        width: 34px;
        height: 34px;
    }

    .ic-usdt-lg {
        background: -68px -568px;
        width: 34px;
        height: 34px;
    }

    .ic-eth-lg {
        background: -102px -568px;
        width: 34px;
        height: 34px;
    }

    .ic-watch {
        background: -136px -568px;
        width: 34px;
        height: 34px;
    }

    .ic-logo {
        background: -30px -602px;
        width: 30px;
        height: 24px;
    }

    .ic-logo-bl {
        background: 0px -602px;
        width: 30px;
        height: 24px;
    }

    .ic-logo-otc {
        background: -128px 0px;
        width: 104px;
        height: 18px;
    }

    .ic-only-logo-otc {
        background: -128px 0px;
        width: 60px;
        height: 18px;
    }

    .ic-allb-sm {
        background: 0 -626px;
        width: 24px;
        height: 24px;
    }

    .ic-btc-sm {
        background: -24px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-eth-sm {
        background: -48px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-usdt-sm {
        background: -72px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-help {
        background: -96px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-complete-sm {
        background: -120px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-email {
        background: -144px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-phone {
        background: -168px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-account {
        background: -192px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-uid {
        background: -216px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-password {
        background: -240px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-id {
        background: -264px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-advanced {
        background: -288px -626px;
        width: 24px;
        height: 24px;
    }

    .ic-fix {
        background: -312px -626px;
        width: 16px;
        height: 24px;
    }

    .ic-bank {
        background: 0px -650px;
        width: 20px;
        height: 20px;
    }

    .ic-alipay {
        background: -20px -650px;
        width: 20px;
        height: 20px;
    }

    .ic-wechatpay {
        background: -40px -650px;
        width: 20px;
        height: 20px;
    }

    .ic-info {
        background: -60px -650px;
        width: 20px;
        height: 20px;
    }

    .ic-slide {
        background: -80px -650px;
        width: 20px;
        height: 20px;
    }

    .ic-error {
        background: 0px -670px;
        width: 18px;
        height: 16px;
    }

    .ic-chinese {
        background: 0px -686px;
        width: 18px;
        height: 12px;
    }

    .ic-english {
        background: -18px -686px;
        width: 18px;
        height: 12px;
    }

    .ic-korean {
        background: -36px -686px;
        width: 18px;
        height: 12px;
    }

    .ic-success-lg {
        background: 0px -698px;
        width: 18px;
        height: 18px;
    }

    .ic-warning {
        background: -18px -698px;
        width: 19px;
        height: 18px;
    }

    .ic-premium {
        background: 0px -716px;
        width: 16px;
        height: 18px;
    }

    .ic-certified {
        background: 0px -734px;
        width: 16px;
        height: 16px;
    }

    .ic-success-sm {
        background: -16px -734px;
        width: 16px;
        height: 16px;
    }

    .ic-unpaid {
        background: -32px -734px;
        width: 16px;
        height: 16px;
    }

    .ic-cancel-sm {
        background: -48px -734px;
        width: 16px;
        height: 16px;
    }

    .ic-x {
        background: 0px -750px;
        width: 14px;
        height: 14px;
    }

    .ic-qr {
        background: -14px -750px;
        width: 14px;
        height: 14px;
    }

    .ic-ok {
        background: 0px -765px;
        width: 16px;
        height: 16px;
    }

    .ic-404 {
        background: 0px -772px;
        width: 384px;
        height: 356px;
    }

    .ic-appeal-sm {
        background: 0px 0px;
        width: 16px;
        height: 16px;
    }

    .ic-paid-sm {
        background: -16px 0px;
        width: 16px;
        height: 16px;
    }

    .ic-cancel-red-sm {
        background: -32px 0px;
        width: 16px;
        height: 16px;
    }

    .ic_postad_help {
        background: -48px 0px;
        width: 16px;
        height: 16px;
    }

    .ic-appeal-octa-lg {
        background: 0px -50px;
        width: 34px;
        height: 34px;
    }

    .ic-header-logo-mobile {
        background: 0px -234px;
        width: 125px;
        height: 20px;
    }

    .ic-header-logo-web {
        background: 0px -84px;
        width: 70px;
        height: 20px;
    }

    /*------컨플루언스 등록 필요-------*/
    /*---------------------------------*/

    .ic-tab-chat-gray {
        background: 0px -105px;
        width: 24px;
        height: 18px;
    }

    .ic-tab-chat-blue {
        background: -24px -105px;
        width: 24px;
        height: 18px;
    }

    .ic-tab-exchange-gray {
        background: -48px -105px;
        width: 20px;
        height: 18px;
    }

    .ic-tab-exchange-blue {
        background: -68px -105px;
        width: 20px;
        height: 18px;
    }

    .ic-tab-wallet-gray {
        background: -88px -105px;
        width: 18px;
        height: 18px;
    }

    .ic-tab-wallet-blue {
        background: -106px -105px;
        width: 18px;
        height: 18px;
    }

    .ic-tab-otc-gray {
        background: -124px -105px;
        width: 28px;
        height: 18px;
    }

    .ic-tab-otc-blue {
        background: -152px -105px;
        width: 28px;
        height: 18px;
    }

    .ic-tab-service-gray {
        background: 0px -123px;
        width: 23px;
        height: 20px;
    }

    .ic-tab-service-blue {
        background: -23px -123px;
        width: 23px;
        height: 20px;
    }

    .ic-tab-service-blue {
        background: -23px -123px;
        width: 23px;
        height: 20px;
    }

    .ic-mytoken-default {
        background: 0px -143px;
        width: 65px;
        height: 65px;
    }

    .ic-mytoken-add {
        background: 0px -208px;
        width: 17.7px;
        height: 17.7px;
    }

    .ic-barcode {
        background: 0px -226px;
        width: 18px;
        height: 14px;
    }

    .ic-wallet-transfer {
        background: -18px -226px;
        width: 18px;
        height: 14px;
    }

    .ic-wallet-scanning {
        background: 0px -240px;
        width: 20px;
        height: 16px;
    }

    .ic-allb-logo-big {
        background: 0px -256px;
        width: 142px;
        height: 112px;
    }

    /*sprite-img-small  전용*/

    .ic-allb-logo-big {
        background: 0px -599px;
        width: 104px;
        height: 78px;
    }

    /*sprite image*/

    .sprite-img {
        background-size: 384px 1128px;
        background-image: url(./assets/img/sprite_x2.png);
    }

    .sprite-img2 {
        background-size: 200px 600px;
        background-image: url(./assets/img/sprite_image-2.png);
    }

    .sprite-img2-small {
        background-size: 140px 420px;
        background-image: url(./assets/img/sprite_image-2.png);
    }

    .badge {
        background-color: #e62a2b;
        border-radius: 100px;
        text-align: center;
        font-size: 12px;
        line-height: 13px;
        color: #ffffff;
        width: 17px;
        height: 17px;
        margin: auto 0 auto 0;
        padding: 2px 0 2px 0;
        cursor: pointer;

        -moz-border-radius: 100px;
        -webkit-border-radius: 100px;
        -ms-border-radius: 100px;
        -khtml-border-radius: 100px;
        -o-border-radius: 100px;
    }

    /* MyInfo Item CSS */
    .mypage-wrapper .sprite-img {
        display: inline-block;
        vertical-align: middle;
    }

    .mypage-wrapper p {
        font-size: 14px;
    }

    .mypage-wrapper h4 {
        font-weight: bold;
        color: #353535;
        height: 24px;
    }

    .mypage-wrapper .caption {
        font-size: 10px;
        color: #9294a6;
    }

    .mypage-wrapper .color-black,
    .mypage-wrapper .color-darkgray {
        white-space: nowrap;
    }

    .myPage-box {
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        padding: 0 24px;
        margin-bottom: 48px;
    }

    .account-header,
    .blocked-user-item {
        border-bottom: 1px solid #d1d1d1;
        padding: 24px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .otherInfo-header {
        border-bottom: 1px solid #d1d1d1;
        padding: 24px 0;
        display: block;
        position: relative;
    }

    .blocked-user-item p {
        display: inline-block;
        font-size: 14px;
        color: #214ea1;
        margin-left: 16px;
    }

    .account-header .header-detail {
        text-align: right;
    }

    .otherInfo-subtitle p {
        color: #9294A6;
        margin-left: 16px;
        display: inline-block;
        vertical-align: middle;
    }

    .otherInfo-body {
        border-bottom: 1px solid #d1d1d1;
        padding: 24px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .myPage-box .otherInfo-body:last-child {
        border-bottom: none !important;
    }

    .otherInfo-body > li {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .otherInfo-body > li:first-child {
        width: 30%;
    }

    .otherInfo-body .caption-wrapper {
        width: 60%;
    }

    .otherInfo-body > li:last-child {
        width: 25%;
        text-align: right;
        display: inline-block;
    }

    /* 모바일 레이아웃 */
    @media (max-width: 940px) {
        .myPage-box > div {
            display: block;
        }

        .otherInfo-header {
            justify-content: flex-start;
        }

        .account-header .header-detail,
        .otherInfo-header .header-detail {
            text-align: left;
        }

    }

    @media (max-width: 959px) {
        .otherInfo-body {
            display: block;
        }

        .otherInfo-body > li {
            display: block;
            width: 100%;
        }

        .otherInfo-body > li:first-child {
            width: 100%;
            margin-bottom: 12px;
        }

        .otherInfo-body > li:last-child {
            width: 100%;
            margin-top: 12px;
        }

        .otherInfo-body .caption-wrapper {
            width: 100%;
            padding-left: 40px;
        }

        .otherInfo-body > li:last-child span {
            display: block;
        }

        .mypage-wrapper .caption {
            color: #9294a6;
            padding: 0 !important;
            display: block;
            margin-top: 12px;
        }

        .payment-toggle {
            margin-top: 24px;
        }

        .btn-wrapper span {
            margin-top: 12px;
        }

    }

    /* MyInfo Item CSS END */

    /* Dialog */
    .dialog_btn-close {
        position: absolute;
        cursor: pointer;
        right: 0;
        top: 0;
    }

    .dialog_btn-close:hover {
        opacity: .7;
    }

    .dialog--footer {
        text-align: right;
    }

    /*group chat name css*/
    .chat-name {
        margin-bottom: 4px !important;
        cursor: pointer;
        font-size: 12px;
        line-height: 1.6em;
        color: #353535;
    }

    .chat-name:hover {
        font-weight: bold;
    }

    /*언어 드롭다운 (header, footer) */
    .lang-menu > div {
        padding: 8px 16px 8px 16px;
        cursor: pointer;
        font-size: 14px;
    }

    .lang-menu > div:active, .lang-menu > div:hover {
        background-color: #316ee4;
        color: white
    }

    /* Main.vue 사용 CSS */
    .landing-img-first {
        width: 100%;
        height: 100%;
        background: url('assets/img/landing_img_first.png');
        background-position: 50% 50%;
        padding-top: 170px;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .landing-img-second {
        width: 100%;
        height: 100%;
        background: url('assets/img/landing_img_second.png');
        background-position: 50% 50%;
        padding-top: 150px;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .landing-img-third {
        width: 100%;
        height: 100%;
        background: url('assets/img/landing_img_third.png');
        background-position: 50% 50%;
        padding-top: 150px;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .landing-subject {
        font-size: 45px;
        color: white;
        letter-spacing: 2px;
        font-weight: 500;
        margin-bottom: 4px;
    }

    .landing-content {
        font-size: 30px;
        color: white;
        letter-spacing: 2px;
        font-weight: 500;
    }

    .arrows-style {
        background: #214EA1;
        border-radius: 6px;
        color: white;
        font-size: 28px;
        margin-bottom: 11px;
    }

    /* 웹에서 최대 width 주기*/
    @media only screen and (min-width: 960px) {
        .pageView {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    @media only screen and (max-width: 959px) {
        .pageView {
            padding-left: 12px;
            padding-right: 12px;
        }
    }

    /*vuetify 로딩 아이콘*/
    .progress-circular {
        width: 24px !important;
        height: 24px !important;
        position: absolute !important;
        right: 10px;
        margin-top: 7px;
    }

    .progress-circular-selectbox {
        width: 20px !important;
        height: 20px !important;
        position: absolute !important;
        right: 12px;
        top: 10px;
    }

    /* Alert CSS */
    @media only screen and (min-width: 959px) {
        .notifications-wrapper {
            position: fixed;
            right: 32px;
            top: 64px;
            width: 290px;
            z-index: 999;

        }
    }

    @media only screen and (max-width: 959px) {
        .notifications-wrapper {
            position: fixed;
            padding: 0 15px 0 15px;
            width: 100%;
            z-index: 999;
        }
    }

    .subj-css {
        display: flex;
        text-align: left;
        margin-top: 3px;
        margin-left: 12px;
        position: relative;
    }

    .close-css {
        right: 11px;
        top: 0;
        position: absolute;
        font-size: 20px;
        font-weight: bold;
    }

    .icon-css {
        margin-top: 6px;
        margin-right: 10px;
    }

    .alert-content-css {
        text-align: left;
        margin-left: 44px;
        margin-right: 13px;
    }

    .notification {
        height: 72px;
        border-radius: 3px;
        border-width: 1px 1px 1px 5px;
        border-style: solid;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
        background-color: #ffffff;
        margin-bottom: 8px;
        display: table;
        width: 100%;
        padding-bottom: 8px;
    }

    .alertItem-enter-active, .alertItem-leave-active {
        transition: all .3s ease;
    }

    .alertItem-enter, .alertItem-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }



    /*post AD 사용 CSS*/
    .price-input-wrapper {
        border: solid 1px #8d8d8d;
        border-radius: 2px;
        display: flex;
        position: relative;
    }

    .price-input-wrapper:hover, .price-input-wrapper:focus-within {
        border: solid 1px #316ee4;
    }

    .price-input {
        height: 40px;
        padding-left: 8px;
        padding-right: 8px;
        font-size: 12px;
        font-weight: 500;
        width: 100%;
        color: #353535;
        outline: none;
    }
    .w-break{
        word-break: break-all;
    }


    /*달력 date picker CSS*/
    .date-picker-icon-style {
        right: 6px;
        top: 2px;
        pointer-events: none;
    }

    .date-picker-wrapper {
        z-index: 2;
    }

    .screen-modal-wrapper {
        z-index: 1;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    /*내역 없음 표시*/

    .no-more-ads-text{
        font-size: 14px;
    }


</style>
