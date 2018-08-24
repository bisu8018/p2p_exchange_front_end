<template>
    <v-dialog v-model="showDialog" persistent>
        <div class="dialog-unbind_wrapper">

            <!-- 헤더, 타이틀 -->
            <h3>{{ $str('Notice') }}</h3>
            <div class="dialog_btn-close">
                <i class="material-icons " @click="onClose">close</i>
            </div>

            <h5 class="color-darkgray mt-3 mb-4">{{ $str('unBlockDialogTxt') }}</h5>

            <!-- footer, 버튼 영역 -->
            <div class="dialog--footer">
                <button class="btn-rounded-white text-white-hover" @click="onClose">
                    <h6>{{$str("cancel")}}</h6>
                </button>
                <button class="btn-rounded-blue btn-blue-hover" @click="onDone">
                    <h6>{{$str("Done")}}</h6>
                </button>
            </div>
        </div>
    </v-dialog>
</template>

<script>
    export default {
        name: "dialog-unblock",
        props: {
            showDialog: {
                type: Boolean,
                default: () => false
            }
        },
        methods: {
            onClose(item) {
                this.$emit('close', item);
            },
            onCheckName() {
                return true;
            },
            onCheckIdNum() {
                return true;
            },
            onDone(item) {
                if (this.onCheckName() && this.onCheckIdNum()) {
                    this.$emit('done', item);
                    this.onClose();
                    // this.showSuccessModal = true;
                }
            }
        }
    }
</script>

<style scoped>
    .dialog-unbind_wrapper {
        text-align: left;
        position: relative;
    }

    .dialog-unbind_wrapper h3 {
        font-weight: bold;
    }
</style>