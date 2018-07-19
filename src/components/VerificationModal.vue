<template>
    <div class="text-xs-center">
        <v-dialog
                v-model="show"
                width="384"
                persistent = false
        >
            <v-card>
                <v-card-title
                        class="headline"
                        primary-title
                >
                    {{$str("verification")}}
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click.native="onClose">
                        <!--아이콘 직접 import 필요 (해당 부분 kay 작업 중 2018-07-19)-->
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    {{$str("slideVerifyText")}}
                    <verify-slider v-on:passcallback="putVerified"></verify-slider>
                    <div class="warning_terms_text">
                        <span class="hide_warning_text" v-bind:class="{'warning_text' : warning_verify_terms}">{{$str("verifySlider")}}</span>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            flat
                            @click="onClose"
                    >
                        {{$str("cancel")}}
                    </v-btn>
                    <v-btn
                            color="primary"
                            flat
                            @click="onConfirm"
                    >
                        {{$str("confirm")}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import VerifySlider from "@/components/VerifySlider";

    export default {
        name: 'verificationModal',
        props: ['show'],
        components: {
            VerifySlider,
        },
        data() {
            return {
                isVerified: false,
                warning_verify_terms: false
            }
        },
        methods: {
            putVerified: function () {
                this.isVerified = true;
                this.warning_verify_terms = false;
            },
            onConfirm: function () {
                if (this.isVerified) {
                    this.$emit('verifyConfirm');
                } else {
                    this.warning_verify_terms = true;
                }
            },
            onClose: function () {
                this.$emit('close');
            }
        },
    }
</script>
<style scoped>
    .warning_terms_text {
        position: absolute;
    }
</style>