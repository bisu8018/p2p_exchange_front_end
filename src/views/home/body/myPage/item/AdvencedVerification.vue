<template>
    <div class="verification-container">
        <!-- 배경 -->
        <div class="background-div">

        </div>


        <!-- 제목 -->
        <h3 class=" bold mt-4 mb-4">
            高级验证
        </h3>


        <!-- 내용 -->
        <div class="verification-content-container mb-4">
            <div class="verification-content">

            </div>
        </div>


        <!-- 버튼 -->
        <div class="verification-btn mb-4">
                <button @click='' class="btn-blue btn-blue-hover mb-3">
                    {{ $str("startVerification") }}
                </button>

            <button @click='' class="btn-rounded-white text-white-hover">
                {{ $str("exitVerification") }}
            </button>
        </div>


        <!-- 설명 -->
        <div class="verification-explain mb-4">
            请在 3G/4G.WiFi 环境下使用
        </div>


        <!-- 푸터 -->
        <h6 class="verification-footer">
            © 2018 allb.com
        </h6>


</div>
</template>

<script>
    export default {
        name: "advenced-verification",
        props: {
            idVerification: {}
        },
        data() {
            return {
                status : 'main',          //main -> ready -> camera ->
                onModal : false,

            }
        },
        computed: {

        },
        methods: {

        },
    }

</script>

<style scoped>
    .verification-container {
        width: 100%;
        height: 100%;
        z-index: 150;
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        color: #ffffff;
        font-size: 18px;
    }

    .verification-content-container {
        background: white;
        position: relative;
        padding-top: 63%;
        margin: 0 16px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 7px;
    }

    .verification-content {


    }

    .verification-explain{
        color: #353535;
        height: 100%;
    }

    .verification-btn{
        width: 180px;
        margin: auto;
    }

    .verification-footer {
        color: #9294a6;
        position: absolute;
        bottom: 0;
        margin: auto;
        width: 100%;
        margin-bottom: 8px;
    }

    .background-div {
        width: 100%;
        height: 100%;
        border-radius: 100px;
        background-image: linear-gradient(115deg, #214ea1, #316ee4, #214ea1);
        position: fixed;
        -webkit-transform: skew(40deg,-40deg);
        -moz-transform: skew(40deg,-40deg);
        transform: skew(40deg,-40deg);
        top: -80%;
        right: 20%;
        z-index: -1 !important;
    }

</style>

