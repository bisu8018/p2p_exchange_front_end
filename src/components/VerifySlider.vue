<template>
    <v-layout id="verify_wrapper">
        <div :class="{'verify_dim' : showDim}"
             @mousemove="dragMoving"
             @mouseup="dragFinish"
             @touchmove="dragMoving"
             @touchend="dragFinish"></div>
        <div class="drag_verify"
             :style="dragVerifyStyle"
             @mousemove="dragMoving"
             @mouseup="dragFinish"
             @touchmove="dragMoving"
             @touchend="dragFinish">
            <div class="dv_progress_bar" ref="progressBar" :style="progressBarStyle"></div>
            <div class="dv_text" :style="textStyle" ref="message">
                <span :class="{ 'verfity-txt_animation' : !isVerified  }">{{message}}</span>
            </div>
            <div class="dv_handler dv_handler_bg"
                 :class="{ 'transition-animation' : isAnimation }"
                 @mousedown="dragStart"
                 ref="handler" :style="handlerStyle" @touchstart="dragStart">
                <i class="handlerIcon">
                    <v-icon dark class="verify-icon" standard>{{vIcon}}</v-icon>
                </i>
            </div>
        </div>

    </v-layout>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'dragVerify',
        data() {
            return {
                isMoving: false,
                x: 0,
                isPassing: false,
                slidebarWidth: 200,
                slidebarHeight: 40,
                vIcon: "keyboard_arrow_right",
                text: Vue.prototype.$str("verifySliderPlaceholder"),
                successText: Vue.prototype.$str("verifySliderSuccess"),
                isVerified: false,
                showDim: false,
                isAnimation: false,
            }
        },
        props: {
            background: {
                type: String,
                default: 'white'
            },
            progressBarBg: {
                type: String,
                default: 'white'
            },
            completedBg: {
                type: String,
                default: 'white'
            },
            circle: {
                type: Boolean,
                default: false
            },
            handlerIcon: {
                type: String
            },
            successIcon: {
                type: String
            },
            handlerBg: {
                type: String,
                default: '#f8f8fa'
            },
            handlerCompletedBg: {
                type: String,
                default: '#deecff'
            },
            handlerBorder: {},
            textSize: {
                type: String,
                default: '15px'
            }
        },
        computed: {
            handlerStyle: function () {
                return {
                    left: '0px',
                    width: this.slidebarHeight - 2 + 'px',
                    height: this.slidebarHeight - 2 + 'px',
                    borderRadius: this.circle ? '50%' : 0,
                    background: this.handlerBg,
                    border: this.handlerBorder
                }
            },
            message: function () {
                return this.isPassing ? this.successText : this.text
            },
            //드래그 전체 창 css
            dragVerifyStyle: function () {
                return {
                    width: this.slidebarWidth + 'px',
                    height: this.slidebarHeight + 'px',
                    lineHeight: this.slidebarHeight + 'px',
                    background: this.background,
                    borderRadius: this.circle ? this.slidebarHeight / 2 + 'px' : 0
                }
            },
            progressBarStyle: function () {
                return {
                    background: this.progressBarBg,
                    height: this.slidebarHeight - 2 + 'px',
                    borderRadius: this.circle ? this.slidebarHeight / 2 + 'px 0 0 ' + this.slidebarHeight / 2 + 'px' : 0
                }
            },
            textStyle: function () {
                return {
                    height: this.slidebarHeight + 'px',
                    width: this.slidebarWidth + 'px',
                    fontSize: this.textSize
                }
            },
            handlerIconClass: function () {
                return this.isPassing ? this.handlerIcon : this.successIcon
            },
        },
        mounted: function () {
            this.init();
            this.$nextTick(() => {
                window.addEventListener('resize', () => {
                    var layout_width = document.getElementById('verify_wrapper').offsetWidth;
                    this.slidebarWidth = layout_width;
                    if(this.slidebarWidth == 0){
                        //모달 길이 fix시 수정 필요
                        this.slidebarWidth = 352;
                    }
                });
            })
        },
        methods: {
            init: function () {
                this.slidebarWidth = document.getElementById('verify_wrapper').offsetWidth;
                if(this.slidebarWidth == 0){
                    //모달 길이 fix시 수정 필요
                    this.slidebarWidth = 352;
                }
            },
            dragStart: function (e) {
                if (!this.isPassing) {
                    this.isAnimation = false;
                    this.showDim = true;
                    this.isMoving = true;
                    var handler = this.$refs.handler;
                    this.x = (e.pageX || e.touches[0].pageX) - parseInt(handler.style.left.replace('px', ''), 10);
                }
            },
            dragMoving: function (e) {
                if (this.isMoving && !this.isPassing) {
                    var _x = (e.pageX || e.touches[0].pageX) - this.x;
                    var handler = this.$refs.handler;
                    if (_x > 0 && _x <= (this.slidebarWidth - this.slidebarHeight)) {
                        handler.style.left = _x + 'px';
                        this.$refs.progressBar.style.width = (_x + this.slidebarHeight / 2) + 'px';
                    } else if (_x > (this.slidebarWidth - this.slidebarHeight)) {
                        handler.style.left = (this.slidebarWidth - this.slidebarHeight) - 2 + 'px';
                        this.$refs.progressBar.style.width = (this.slidebarWidth - this.slidebarHeight / 2) + 'px';
                        this.passVerify();
                    } else if (_x <= 0) {
                        this.$refs.handler.style.left = '0';
                        this.$refs.progressBar.style.width = '0';
                    }
                }
            },
            dragFinish: function (e) {
                if (this.isMoving && !this.isPassing) {
                    let _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
                    if (_x < (this.slidebarWidth - this.slidebarHeight)) {
                        this.isAnimation = true;
                        this.$nextTick(() => {
                            this.$refs.handler.style.left = '0';
                            this.$refs.progressBar.style.width = '0';
                        })
                    }
                    this.isMoving = false;
                    this.showDim = false;
                }
            },

            //Verify Completed Bar
            passVerify: function () {
                this.showDim = false;
                this.isPassing = true;
                this.isMoving = false;
                this.vIcon = "check";
                this.isVerified = true;
                //this.$refs.progressBar.style.background = 'this.completedBg';
                this.$refs.message.style.textAlign = 'left';
                this.$refs.message.style.color = '#214ea1';
                this.$refs.message.style.paddingLeft = '8px';
                var handler = this.$refs.handler;
                handler.className += ' dv_handler_ok_bg';
                handler.children[0].className = this.successIcon;
                this.$emit('passcallback');
                document.getElementsByClassName("verify-icon")[0].style.textSize = '16px';
                document.getElementsByClassName("drag_verify")[0].style.border = '1px solid #316ee4';
                document.getElementsByClassName("dv_handler")[0].style.outline = '1px solid #316ee4';
                document.getElementsByClassName('drag_verify')[0].lastChild.children[0].children[0].style.background = '#316ee4'
            }
        },
    }
</script>

<style scopped>
    .drag_verify {
        position: relative;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border: 1px solid #8d8d8d;
        color: #9294a6;
        font-size: 12px;
        letter-spacing: 0;
        border-radius: 2px !important;
        overflow: hidden;
        z-index: 1;
    }

    .drag_verify .dv_handler {
        -ms-user-select: none;
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 40px !important;
        cursor: move;
        outline: 1px solid #8d8d8d;
    }

    .transition-animation {
        -webkit-transition: all 0.4s ease-out;
        -o-transition: all 0.4s ease-out;
        transition: all 0.4s ease-out;
    }

    .drag_verify .dv_handler_bg {
        background: #dae1ff !important;
    }

    .drag_verify .dv_handler_ok_bg {
        background: #e4ecff !important;
    }

    .drag_verify .dv_handler i {
        background: #214ea1;
        padding: 0px 1px 0px 2px;
        border-radius: 47px;
        color: white;
    }

    .drag_verify .dv_progress_bar {
        position: absolute;
        height: 34px;
        width: 0px;
    }

    .drag_verify .dv_text {
        position: absolute;
        top: 0px;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select: none;
        -ms-user-select: none;
        font-size: 12px !important;
        letter-spacing: 0 !important;
        padding-left: 52px;
        text-align: center;
    }

    .verify-icon {
        width: 21px;
        height: 21px;
        font-size: 21px;
        padding: 0px 0px 0px 1px;
        position: absolute;
        font-weight: 100;
        left: 9px;
        top: 9px;
    }

    .verify_dim {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .verfity-txt_animation {
        background: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-animation: isMove 4s infinite running;
        -webkit-text-size-adjust: none;
        width: 100%;
        display: inline-block;
        text-align: center;
        padding-right: 40px;
    }

    @keyframes isMove {
        0% {
            background-position: -100px 0;
        }
        100% {
            background-position: 100px 0;
        }
    }

    @media (max-width: 768px) {
        @keyframes isMove {
            0% {
                background-position: -100px 0;
            }
            100% {
                background-position: 100px 0;
            }
        }
    }
</style>
