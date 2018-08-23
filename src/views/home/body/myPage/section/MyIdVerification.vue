<template>
    <div class="myPage-box my-id-verification_wrapper">

        <!-- Dialog -->
        <dialog-id-verification
                :showDialog="dialog_idVerification"
                @close="offIdVerification"
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

                <!-- ID Verification 되었을 때 -->
                <span class="color-darkgray" v-if="idVerification.status === 'registered'">
                    {{ idVerification.firstName }} {{ idVerification.lastName }}, {{ idVerification.identificationNo }}
                </span>

                <!-- ID Verification 안 되었을 때 -->
                <span class="color-darkgray" v-else>
                    {{ $str('unverified') }}
                </span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">
                <span v-if="idVerification.status === 'registered'">
                    {{ $str('verifySliderSuccess') }}
                </span>
                <span v-else>
                    <btn-mypage
                            @click="onIdVerification"
                            :txt="$str('verify')"
                    />
               </span>
            </li>
        </ul>

        <!-- 2. Advanced Verification -->
        <ul class="otherInfo-body">

            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-advanced"></div> <p>{{ $str('advancedVerification') }}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">
                <!-- Advanced Verification 되었을 때 -->
                <span class="color-darkgray"> {{ $str('unverified') }} </span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">
                <btn-mypage
                    :txt="$str('verify')"
                    @click="onAdvancedVerification"
                />
            </li>
        </ul>
    </div>
</template>

<script>
    import BtnMypage from "../item/BtnMypage";
    import DialogIdVerification from "../../../../../components/dialog/DialogIdVerification";

    export default {
        name: "my-id-verification",
        components: {
            DialogIdVerification,
            BtnMypage
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
            // getSecuredIdNo() {
            //     let noLength = this.idVerification.identificationNo;
            //     let securedIdNo = this.idVerification.identificationNo.substr(0, 2) + '*********' + this.idVerification.identificationNo.substr(noLength - 2, 2);
            //     return securedIdNo;
            // },
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
            }
        },
    }
</script>

<style scoped>

</style>