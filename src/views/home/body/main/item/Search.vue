<template>
    <v-layout row wrap pageView mt-6>

        <!-- 국가 -->
        <v-flex xs6 md2 mb-4>
            <select-box :selectBoxType="'country'"></select-box>
        </v-flex>


        <!-- tradeType -->
        <v-flex xs6 md2 mb-4>
            <div class="p-relative">
                <select-box :selectBoxType="'tradeType'"  v-on:tradeType="setTradeType" ></select-box>
            </div>
        </v-flex>


        <!-- amount -->
        <v-flex xs12 md3 mb-4>
            <div class="p-relative selectbox-wrapper">
                <<select-box :selectBoxType="'currency'" :cssOption="true" class="selectbox-width-part" ></select-box>
                <input type="text" class="input" v-model="amount" :placeholder="$str('How_much_you_want_to_trade?')">
            </div>
        </v-flex>


        <v-flex xs12 md4 mb-4>
            <v-layout justify-space-between>
                <div class="search-input">
                    <!-- cryptocurrency -->
                    <select-box :selectBoxType="'generalToken'" @generalToken="selectToken" ></select-box>
                </div>
                <div v-if="isMobile" class="pl-1 pr-1"></div>
                <h6 v-else class="color-darkgray pt-2 mb-4 mr-3 ml-3">{{$str('Via')}}</h6>
                <!-- paymentmethod -->
                <div class="search-input">
                    <select-box :selectBoxType="'payment'"></select-box>
                </div>
            </v-layout>
        </v-flex>


        <!--버튼-->
        <v-flex xs12 md1 mb-4>
            <button @click='goSearchedTradeCenter' class="color-blue btn-blue btn-blue-hover">
                {{$str("search")}}
            </button>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../vuex/MainRepository";
    import {abGetLang} from "../../../../../config/localization";
    import SelectBox from "../../../../../components/SelectBox.vue";

    export default Vue.extend({
        name: 'search',
        components: {SelectBox},
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },

        },
        data() {
            return {
                tokenNo: '',
                cryptocurrency: '',
                tradeType: '',
                amount: '',
                currentLang: abGetLang(),
            }
        },
        methods: {
            goSearchedTradeCenter() {
                MainRepository.TradeView.setTradeLeftFilter(this.cryptocurrency,this.tradeType);
                MainRepository.TradeView.setTradeRightFilter('', '', '', this.amount);
                this.$router.push("/generalTrade?main");
            },
            setTradeType(code){
                this.tradeType = code;
            },
            selectToken(tokenNo) {
                let _tokenName = MainRepository.GeneralToken.controller().findGeneralToken(tokenNo, 'no').tokenName;
                this.cryptocurrency = _tokenName;
                this.tokenNo = tokenNo;
            },
        },
    })
</script>

<style scoped>

    @media only screen and (min-width: 960px) {
        .search-input{
            position: relative;
            min-width: 155px;
        }
    }

    @media only screen and (max-width: 959px) {
        .search-input {
            position: relative;
            width: 100%;
        }
    }

    .input {
        border-left: none;
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
    }

    .selectbox-wrapper {
        border: none;
    }
    /*:focus-within*/
    .selectbox-wrapper:focus-within  :first-child  :first-child  :first-child   {
        border: solid 1px #316ee4;
    }

    .selectbox-width-part :first-child  {
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
    }



    .selectbox-width-part :first-child > :last-child {
        right: 0px;
    }

</style>