<template>
    <div class="my-id-verification_wrapper">

        <!-- Header -->
        <div class="otherInfo-header">
            <h4>{{$str('idVerification')}}</h4>
            <div class="header-detail">
                <p class="caption mt-3">{{$str('idVerificationExplain')}}</p>
            </div>
        </div>

        <!-- Body -->
        <!-- 1. ID Verification -->
        <ul class="otherInfo-body">
            <!-- 아이콘, 서브타이틀 -->
            <li class="otherInfo-subtitle">
                <div class="sprite-img ic-id"></div> <p>{{$str('idVerification')}}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">

                <!-- ID Verification 되었을 때 -->
                <span class="color-darkgray" v-if="!idVerification.isNull()">
                            {{idVerification.firstName}} {{idVerification.lastName}}, {{getSecuredIdNo}}
                        </span>

                <!-- ID Verification 안 되었을 때 -->
                <span class="color-darkgray" v-else>
                            {{$str('unverified')}}
                        </span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">
                        <span v-if="!idVerification.isNull() && idVerification.identification_no !== undefined">
                            {{$str('verifySliderSuccess')}}
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
                <div class="sprite-img ic-advanced"></div> <p>{{$str('advancedVerification')}}</p>
            </li>

            <!-- 내용 -->
            <li class="caption-wrapper">

                <!-- Advanced Verification 되었을 때 -->
                <span class="color-darkgray"> {{$str('unverified')}} </span>
            </li>

            <!-- 버튼, 토글 등 -->
            <li class="btn-wrapper">
                        <span v-if="!idVerification.isNull() && idVerification.identification_no !== undefined">
                            {{$str('verifySliderSuccess')}}
                        </span>
                <span v-else>
                            <a>{{$str('verify')}}</a>
                        </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import BtnMypage from "./item/BtnMypage";
    import IdVerification from "../../../../vuex/model/IdVerification";

    export default {
        name: "my-id-verification",
        components: {BtnMypage},
        props: {},
        data() {
            return {
                idVerification: new IdVerification(''),
            }
        },
        created() {
            let self = this;

            // 유저 ID 인증 정보 GET
            MainRepository.MyPage.getIdVerification(function (idVerification) {
                self.idVerification = idVerification;
            });
        }
    }
</script>

<style scoped>
    .my-id-verification_wrapper {
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
        padding: 0 24px;
        margin-bottom: 48px;
    }


    .my-id-verification_wrapper ul {
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

    .my-id-verification_wrapper ul:last-child {
        border-bottom: none;
    }


    ul > li {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    ul > li:first-child {
        width: 30%;
    }

    ul .caption-wrapper {
        width: 60%;
    }

    ul > li:last-child {
        width: 25%;
        text-align: right;
        display: inline-block;
    }

    .otherInfo-subtitle p {
        color: #9294A6;
        margin-left: 16px;
        display: inline-block;
        vertical-align: middle;
    }
</style>