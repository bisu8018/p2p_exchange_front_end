<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-3">
                <div class="h3 text-xs-left color-black bold">
                    <!--type에 따른 제목 변경-->
                    {{type === 'confirm' ? $str("confirmRelease") : (type === 'appeal' ? $str("appeal") :
                    $str("cancelAppeal"))}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons color-black c-pointer" @click="onClose">close</i>
            </div>
            <div class="line-height-1 modal-subject-2 mb-4">

                <!--type이 confirm 상태 일 경우 내용-->
                <span v-if="type === 'confirm'">
                    <div class=" color-darkgray mb-3">
                        {{$str("confirmContents1")}}
                    </div>
                    <div class="color-black mb-2">
                        {{$str("tradePwText")}}
                    </div>
                   <input type="password" class="input mb-4" :placeholder="$str('tradePwText')"
                          v-model="tradePassword"/>
                    <label class="color-black "><input type="checkbox" v-model="confirmCheckbox"/>  {{$str("confirmCheckbox")}}</label>
                </span>
            </div>


            <!--type이 appeal 상태 일 경우 내용-->
            <div class="line-height-1 modal-subject-2" v-if="type === 'appeal'">
                    <div class=" color-darkgray mb-4">
                        {{$str("appealModalContent")}}
                    </div>
                    <div class="text-xs-left color-black mb-2">
                         {{$str("appealReason")}}
                    </div>

                <!--이의제기 이유 selectbox-->
                    <div class="p-relative mb-4">
                        <select class="comp-selectbox h6" id="appealReasonSelectbox" v-model="appealReason">
                            <option value="notPaid">{{$str("appealReason1")}}</option>
                            <option value="notRelease">{{$str("appealReason2")}}</option>
                            <option value="noAnswer">{{$str("appealReason3")}}</option>
                            <option value="cheating">{{$str("appealReason4")}}</option>
                            <option value="other">{{$str("appealReason5")}}</option>
                        </select>
                        <i class="material-icons comp-selectbox-icon">keyboard_arrow_down</i>
                    </div>
                    <div class="text-xs-left color-black mb-2">
                       {{$str("details")}}
                    </div>
                    <div class="mb-4">
                        <textarea v-model="appealDetails" :placeholder="$str('detailsPlaceholder')"
                                  class="textarea-style"/>
                    </div>
            </div>

            <div class="text-xs-right">
                <!--type이 confirm 상태 일 경우 확인 버튼-->
                <span v-if="type === 'confirm'">
                    <button @click="onConfirm" class="btn-blue btn-blue-hover ">
                        {{$str("confirmRelease")}}
                    </button>
                </span>

                <!--type이 appeal 상태 일 경우 확인 버튼-->
                <span v-if="type === 'appeal'">
                   <button @click="onAppeal" class="h6 btn-rounded-blue btn-blue-hover">
                        {{$str("confirm")}}
                    </button>
                </span>

                <!--type이 cancelAppeal 상태 일 경우 확인 버튼-->
                <span v-if="type === 'cancelAppeal'">
                   <button @click="onCancelAppeal" class="h6 btn-rounded-blue btn-blue-hover">
                        {{$str("cancelModalButton")}}
                    </button>
                </span>
            </div>
        </div>
    </v-dialog>
</template>
<script>
    export default {
        name: 'sellModal',
        props: ['show', 'type'],
        data() {
            return {
                appealReason: "",
                appealDetails: "",
                tradePassword: "",
                confirmCheckbox: false
            }
        },
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onConfirm: function () {
                this.$emit('confirm', this.tradePassword);
            },
            onAppeal: function () {
                let appeal = {
                    appealReason : this.appealReason,
                    details : this.appealDetails,
                    status : 'registered',
                };
                this.$emit('appeal', appeal);
            },
            onCancelAppeal: function () {
                this.$emit('cancelAppeal');
            }
        },
    }
</script>
<style scoped>

    .modal-subject-wrapper {
        display: flex;
    }

    .modal-subject-2 {
        text-align: left;
        margin-bottom: 8px;
    }

    .textarea-style {
        width: 100%;
        height: 130px;
        border-radius: 2px;
        border: solid 1px #8d8d8d;
        padding: 8px;
        resize: none;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #9294a6;
    }

</style>