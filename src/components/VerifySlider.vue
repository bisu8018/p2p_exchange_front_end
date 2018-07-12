<template>
    <v-layout id="verify_wrapper">
        <div class="drag_verify"
             :style="dragVerifyStyle"
             @mousemove="dragMoving"
             @mouseup="dragFinish"
             @touchmove="dragMoving"
             @touchend="dragFinish">
            <div class="dv_progress_bar" ref="progressBar" :style="progressBarStyle"></div>
            <div class="dv_text" :style="textStyle" ref="message">{{message}}</div>
            <div class="dv_handler dv_handler_bg" @mousedown="dragStart"
                 ref="handler" :style="handlerStyle" @touchstart="dragStart">
                <i class="handlerIcon">
                    <v-icon dark class="verify-icon" standard>keyboard_arrow_right</v-icon>
                </i>
            </div>
        </div>
    </v-layout>
</template>

<script>

    export default {
        name: 'dragVerify',
        data() {
            return {
                isMoving: false,
                x: 0,
                isPassing: false,
                windowWidth: 0,
                txt: ''
            }
        },
        props: {
            width: {
                type: Number
            },
            height: {
                type: Number,
                default: 44
            },
            text: {
                type: String,
                default: "Please slide to verify"
            },
            successText: {
                type: String,
                default: 'Verified'
            },
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
                default: '#white'
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
                    width: this.height - 2 + 'px',
                    height: this.height - 2 + 'px',
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
                    width: this.width + 'px',
                    height: this.height + 'px',
                    lineHeight: this.height + 'px',
                    background: this.background,
                    borderRadius: this.circle ? this.height / 2 + 'px' : 0
                }
            },
            progressBarStyle: function () {
                return {
                    background: this.progressBarBg,
                    height: this.height - 2 + 'px',
                    borderRadius: this.circle ? this.height / 2 + 'px 0 0 ' + this.height / 2 + 'px' : 0
                }
            },
            textStyle: function () {
                return {
                    height: this.height + 'px',
                    width: this.width + 'px',
                    fontSize: this.textSize
                }
            },
            handlerIconClass: function () {
                return this.isPassing ? this.handlerIcon : this.successIcon
            },
        },
        mounted: function () {
            this.init(),
                this.$nextTick(() => {
                    window.addEventListener('resize', () => {
                        this.windowWidth = window.innerWidth;
                        var layout_width = document.getElementById('verify_wrapper').offsetWidth;
                        this.width = layout_width;
                    });
                })
        },
        methods: {
            init: function () {
                //this.text = Vue.prototype.$str('verifySliderPlaceholder');
                this.width = document.getElementById('verify_wrapper').offsetWidth;
            },
            dragStart: function (e) {
                if (!this.isPassing) {
                    this.isMoving = true;
                    var handler = this.$refs.handler;
                    this.x = (e.pageX || e.touches[0].pageX) - parseInt(handler.style.left.replace('px', ''), 10);
                }

            },
            dragMoving: function (e) {
                if (this.isMoving && !this.isPassing) {
                    var _x = (e.pageX || e.touches[0].pageX) - this.x;
                    var handler = this.$refs.handler;
                    if (_x > 0 && _x <= (this.width - this.height)) {
                        handler.style.left = _x + 'px';
                        this.$refs.progressBar.style.width = (_x + this.height / 2) + 'px';
                    } else if (_x > (this.width - this.height)) {
                        handler.style.left = (this.width - this.height) + 'px';
                        this.$refs.progressBar.style.width = (this.width - this.height / 2) + 'px';
                        this.passVerify();
                    }
                }
            },
            dragFinish: function (e) {
                if (this.isMoving && !this.isPassing) {
                    var _x = (e.pageX || e.changedTouches[0].pageX) - this.x;
                    if (_x < (this.width - this.height)) {
                        this.$refs.handler.style.left = '0';
                        this.$refs.progressBar.style.width = '0';
                    }
                    this.isMoving = false;
                }
            },
            //Verify Completed Bar
            passVerify: function () {
                this.isPassing = true;
                this.isMoving = false;
                var handler = this.$refs.handler;
                handler.className += ' dv_handler_ok_bg';
                handler.children[0].className = this.successIcon;
                this.$refs.progressBar.style.background = 'this.completedBg';
                this.$refs.message.style.color = '#3a75c2';
                this.$emit('passcallback');
                document.getElementsByClassName("drag_verify")[0].style.border = '1px solid #5e91d2';
                document.getElementsByTagName("i")[1].style.background = '#5e91d2';
                // = '#5e91d2';
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
        width: 44px !important;
    }

    .drag_verify .dv_handler_bg {
        background: #dae1ff !important;
    }

    .drag_verify .dv_handler_ok_bg {
        background: #e4ecff !important;
    }

    .drag_verify .dv_handler i {
        background: #214ea1;
        padding: 0px 0px 0px 2px;
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
        left: -13px;
    }

    .verify-icon {
        width: 23px;
        height: 23px;
        font-size: 21px;
        padding: 0px 0px 0px 1px;
        position: absolute;
        font-weight: 100;
        left: 9px;
        top: 9px;
    }
</style>
