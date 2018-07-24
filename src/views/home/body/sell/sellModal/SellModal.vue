<template>
    <v-dialog v-model="show" persistent>
        <div>
            <div class="modal-subject-wrapper mb-4a">
                <div class="price-1b text-xs-left text-black">
                    <!--type에 따른 제목 변경-->
                    {{type === 'confirm' ? $str("confirmRelease") : $str("appeal")}}
                </div>
                <v-spacer></v-spacer>
                <i class="material-icons text-black" @click="onClose">close</i>
            </div>
            <div class="line-height-1 modal-subject-2 mb-4a" >

                <!--type이 confirm 상태 일 경우 내용-->
                <span v-if="type === 'confirm'" >
                    <div class=" text-black mb-4a">
                        {{$str("confirmContents1")}}
                    </div>
                    <div class="text-black mb-2">
                        {{$str("tradePwText")}}
                    </div>
                   <input type="text" class="common-input mb-4a" :placeholder="$str('tradePwText')"/>
                    <label class="text-black"><input type="checkbox" v-model="confirmCheckbox"/>  {{$str("confirmCheckbox")}}</label>
                </span>

                <!--&lt;!&ndash;type이 cancelAppeal 상태 일 경우 내용&ndash;&gt;-->
                <!--<span v-else-if="type === 'cancelAppeal'">-->
                    <!--<div class=" text-black mb-5">-->
                        <!--{{$str("cancelModalContent")}}-->
                    <!--</div>-->
                <!--</span>-->

                <!--&lt;!&ndash;type이 appeal 상태 일 경우 내용&ndash;&gt;-->
                <!--<span v-else-if="type === 'appeal'">-->
                    <!--<div class=" text-black mb-4">-->
                        <!--{{$str("appealModalContent")}}-->
                    <!--</div>-->
                    <!--<div class="text-xs-left text-black mb-2">-->
                         <!--{{$str("appealReason")}}-->
                    <!--</div>-->

                    <!--&lt;!&ndash;이의제기 이유 selectbox&ndash;&gt;-->
                    <!--<div class="relative mb-4">-->
                        <!--<select class="common-selectbox caption" id="appealReasonSelectbox" v-model="appealReason">-->
                            <!--<option value="notpay">The counterparty doesn’t pay</option>-->
                            <!--<option value="notrelease">The counterparty doesn’t release</option>-->
                            <!--<option value="noanswer">No answer</option>-->
                            <!--<option value="cheating">Cheating</option>-->
                            <!--<option value="other">Other</option>-->
                        <!--</select>-->
                           <!--<v-icon class="common-selectbox-icon ">keyboard_arrow_down</v-icon>-->
                    <!--</div>-->
                    <!--<div class="text-xs-left text-black mb-2">-->
                       <!--{{$str("details")}}-->
                    <!--</div>-->
                    <!--<div class="mb-4">-->
                        <!--<textarea v-model="appealDetails" :placeholder="$str('detailsPlaceholder')"-->
                                  <!--class="textarea-style"/>-->
                    <!--</div>-->
                <!--</span>-->
            </div>
            <div class="text-xs-right">
                <!--type이 confirm 상태 일 경우 확인 버튼-->
                <span v-if="type === 'confirm'">
                    <button @click="onConfirm" class="common-normal-button common-btn-hover ">
                        {{$str("confirmRelease")}}
                    </button>
                </span>

                <!--<span v-if="type != 'confirm'">-->
                    <!--<button @click="onClose" class="common-rounded-flat-button common-btn-hover mr-3">-->
                        <!--{{$str("cancel")}}-->
                    <!--</button>-->
                <!--</span>-->

                <!--&lt;!&ndash;type이 appeal 상태 일 경우 확인 버튼&ndash;&gt;-->
                <!--<span v-if="type === 'appeal'">-->
                   <!--<button @click="onAppeal" class="common-rounded-button common-btn-hover">-->
                        <!--{{$str("confirm")}}-->
                    <!--</button>-->
                <!--</span>-->

                <!--&lt;!&ndash;type이 appeal 상태 일 경우 확인 버튼&ndash;&gt;-->
                <!--<span v-if="type === 'cancelAppeal'">-->
                   <!--<button @click="onCancelAppeal" class="common-rounded-button common-btn-hover">-->
                        <!--{{$str("cancelModalButton")}}-->
                   <!--</button>-->
                <!--</span>-->
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
                confirmCheckbox: false
            }
        },
        methods: {
            onClose: function () {
                this.$emit('close');
            },
            onConfirm: function () {
                this.$emit('confirm');
            },
            onAppeal: function () {
                this.$emit('appeal');
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