<template>
    <div>
        <v-layout>
            <v-flex xs12 md12 text-md-left text-xs-left class="mt-5">
                <h1 class="bold">Merchant</h1>
                <h5 class="mt-4">Apply to be Merchant</h5>
            </v-flex>

        </v-layout>

        <v-layout wrap row>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3">
                <div class="section-border-depth pt-5 pb-5">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3">Advertising</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">Merchants are able to post advertisements, flexible and covenient to trade.</h4>
                </div>
            </v-flex>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3">
                <div class="section-border-depth pt-5 pb-5">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3 medium">Exclusive logo</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.</h4>
                </div>
            </v-flex>
            <v-flex xs12 md4 text-md-left text-xs-left class="mt-3">
                <div class="section-border-depth pt-5 pb-72">
                    <div class="sprite-img ic-merchant-ad-lg horizontal-center mb-4"></div>
                    <h2 class="text-md-center text-xs-center mb-3">One-to-one Service</h2>
                    <h4 class="text-md-center text-xs-center mr-5 ml-5 color-darkgray">Merchants will enjoy our one-to-one exclusive service.</h4>
                </div>
            </v-flex>

        </v-layout>

        <v-layout>
            <v-flex xs12 md12 class="text-md-center text-xs-center mt-4a">
                <div>
                    <label class="mb-3">
                        <input type="checkbox" v-model="agreeTerms" class="mr-3"/>{{$str("agreeTermsExplain")}}
                    </label>
                </div>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs12 md12 class="mt-4 mb-6">
                <button class="btn-blue btn-blue-hover pl-4 pr-4 btn-apply" @click="onSearch">
                    <h6>{{$str("search")}}</h6>
                </button>
            </v-flex>
        </v-layout>
    </div>




























































</template>

<script>


    export default {
        name: "merchant",

    }
</script>

<style scoped>

    .pb-72 {
        padding-bottom: 72px;
    }



    .btn-apply {
        width: auto !important;
    }


</style>