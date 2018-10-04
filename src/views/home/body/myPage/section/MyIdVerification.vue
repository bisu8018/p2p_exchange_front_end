<template>
    <div class="myPage-box my-id-verification_wrapper">

        <!-- Dialog -->
        <dialog-id-verification
                :showDialog="dialog_idVerification"
                @close="offIdVerification"
                @done="onDoneIdVerification"
        />

        <!-- Header -->
        <div class="otherInfo-header">
            <h4>{{ $str('idVerification') }}</h4>
            <div class="header-detail">
                <p class="caption mt-3">{{ $str('idVerificationExplain') }}</p>
            </div>
        </div>

        <!-- 1. ID Verification -->
        <ul class="otherInfo-body">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-id"></div>
                <p>{{ $str('idVerification') }}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">

                <!-- ID Verification 진행 중일 때 -->
                <span class="color-darkgray" v-if="idVerification.status === 'registered'">
                     {{ $str('인증이 진행 중입니다') }}
                </span>

                <!-- ID Verification 되었을 때 -->
                <span class="color-darkgray" v-else-if="idVerification.status === 'verified'">
                   {{ idVerification.firstName }} {{ idVerification.lastName }}, {{ getSecuredIdNo }}
                </span>

                <!-- ID Verification 안 되었을 때 -->
                <span class="color-darkgray" v-else>
                    {{ $str('unverified') }}
                </span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">

                <!-- 인증이 진행 중일 때 -->
                <span v-if="idVerification.status === 'registered'">

                </span>

                <!-- 인증이 완료되었을 때 -->
                <span v-else-if="idVerification.status === 'verified'">
                    <btn-mypage
                            :txt="$str('verifySliderSuccess')"
                            noBtn
                    />
                </span>

                <!-- 인증이 안 되었을 때 -->
                <span v-else>
                    <btn-mypage
                            @click="onIdVerification"
                            :txt="$str('verify')"
                    />
               </span>
            </li>
        </ul>

      <!--  &lt;!&ndash; 2. Advanced Verification &ndash;&gt;
        <ul class="otherInfo-body">

            &lt;!&ndash; 아이콘, 서브타이틀 &ndash;&gt;
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-advanced"></div> <p>{{ $str('advancedVerification') }}</p>
            </li>

            &lt;!&ndash; 내용 &ndash;&gt;
            <li class="caption-wrapper">
                &lt;!&ndash; Advanced Verification 되었을 때 &ndash;&gt;
                <span class="color-darkgray"> {{ $str('unverified') }} </span>
            </li>

            &lt;!&ndash; 버튼, 토글 등 &ndash;&gt;
            <li class="btn-wrapper">
                <btn-mypage
                    :txt="$str('verify')"
                    @click="onAdvancedVerification"
                />
            </li>
        </ul>
-->
        <!--<advenced-verification v-if="isMobile"></advenced-verification>-->
    </div>
</template>

<script>
    import BtnMypage from "../item/BtnMypage";
    import AdvencedVerification from "../item/AdvencedVerification.vue";
    import DialogIdVerification from "../../../../../components/dialog/DialogIdVerification";
    import MainRepository from "../../../../../vuex/MainRepository";

    export default {
        name: "my-id-verification",
        components: {
            DialogIdVerification,
            BtnMypage,
            AdvencedVerification
        },
        props: {
            idVerification: {}
        },
        data() {
            return {
                // Dialog 관련
                dialog_idVerification: false,
            }
        },
        computed: {
            getSecuredIdNo() {
                let noLength = this.idVerification.identificationNo;
                let securedIdNo = this.idVerification.identificationNo.substr(0, 2) + '*********' + this.idVerification.identificationNo.substr(noLength - 2, 2);
                return securedIdNo;
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },
        methods: {
            onIdVerification() {
                this.dialog_idVerification = true;
            },
            offIdVerification() {
                this.dialog_idVerification = false;
            },
            onAdvancedVerification() {
                alert('준비중입니다');
            },
            onDoneIdVerification() {
                this.$eventBus.$emit('showAlert', 2257);
                this.$eventBus.$emit('refreshMypage');
            }
        },
    }
</script>

<style scoped>

</style>