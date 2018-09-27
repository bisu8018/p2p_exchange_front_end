<template>
    <div>
        <!--nickname 설정 안했을때 나오는 안내문구-->
        <v-layout v-if="!setNickName && isLogin" row wrap nickname-setUp>
            <h6>{{$str("Before you start trading, you need to complete the necessary transaction information.")}}&nbsp;</h6>
            <a class="color-blue h6 text-white-hover" @click="onSetUpClick">{{$str("Set up now.")}}</a>
        </v-layout>
        <nick-name-modal
                v-if="showNickNameModal"
                :show = showNickNameModal
                v-on:close="closeNicknameModal"
        ></nick-name-modal>
        <!-- 상단의 list filter -->
        <trade-center-filter></trade-center-filter>

        <!-- Web 일때만 -->
        <div v-if="!isMobile">
            <!-- chart의 title들 -->
            <v-layout mb-2>
                <v-flex  md3 text-md-left color-darkgray>
                    {{$str("Merchant(Volume | Trade rate)")}}
                </v-flex>
                <v-flex  md2 text-md-left color-darkgray>
                    {{$str("Available")}}
                </v-flex>
                <v-flex  md2 text-md-left color-darkgray>
                    {{$str("limits")}}
                </v-flex>
                <v-flex  md2 text-md-left color-darkgray>
                    {{$str("price")}}
                </v-flex>
                <v-flex  md2 text-md-left color-darkgray>
                    {{$str("paymentMethod")}}
                </v-flex>
                <v-flex  md1 text-md-right color-darkgray>
                    {{$str("control")}}
                </v-flex>
            </v-layout>
            <v-flex><div class="divider"></div></v-flex>
        </div>

        <v-progress-circular v-if="showProgress" indeterminate class="color-blue list_progress"/>

        <!--본 list들-->
        <div v-if="haveItems && !showProgress">
            <!-- user item list들 10개씩 출력-->
            <div v-for="user in TradeItemLists"  >
                <trade-list-item
                        :user ="user"
                ></trade-list-item>
            </div>
            <!-- pagination -->
            <div class="mt-5">
                <Pagination
                        :size="pageSize"
                        :type="pageType"
                ></Pagination>
            </div>
        </div>
        <!--해당되는 item이 1개도 없을때-->
        <div v-else-if="!showProgress">
            <div class="sprite-img ic-no-ad-lg no-more-ads">
            </div>
            <div class="color-gray no-more-ads-text">
                {{$str("No more ads")}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../../../../vuex/MainRepository";
    import TradeListItem from "./tradeListItem/TradeListItem.vue"
    import TradeCenterFilter from './tradeListItem/TradeCenterFilter.vue';
    import Pagination from '@/components/Pagination.vue';
    import NickNameModal from '@/components/NickNameModal.vue';
    import TradeFilter from "../../../../vuex/model/TradeFilter";
    import TradeService from "../../../../service/trade/TradeService";

    export default Vue.extend({
        name: 'TradeCenter',
        props: {
            // generalTrade와 blockTrade를 구분하기 위해
            message : {},
        },
        components: {Pagination, TradeListItem, TradeCenterFilter, NickNameModal},
        data: () => ({
            pageSize : 10,              //한 page에 몇개씩 item을 보여줄건가.
            pageType : "tradecenter",       //pagination을 위해.
            tradeLevel : 'low',
            totalcount : 1,
            showNickNameModal : false,
            showProgress : false,
        }),
        computed: {
            TradeItemLists(){
                //최신화된 model list를 불러옴.
                return MainRepository.TradeView.getSelectPage();
            },
            isMobile() {
                return MainRepository.State.isMobile();
            },
            //불러온 item이 1개라도 있으면 true, 없으면 false.
            haveItems(){
                return MainRepository.Pagination.getTotalCount() !== 0;
            },
            setNickName(){
                //nickname이 없으면 false, 설정이미 했으면 true
                return (MainRepository.MyInfo.getUserInfo().nickname !== '')
            },
            isLogin(){
              return MainRepository.MyInfo.getUserInfo().isLogin()
            }
        },
        created() {
            //customtokenTrade인지 여부 확인.
            this.customCheck();
            let currentURL = window.location.href
            let param = currentURL.split('?');
            //default filter값으로 list setting하기.
            if(this.message === "general"){
                //main에서 search로 온 경우일때
                if(param[1] === 'main'){ MainRepository.TradeView.updatePage({type : 'general',}); }
                //header에서 온 경우일때
                else { MainRepository.TradeView.initPage(false); }
            } //blocktrade로 온 경우일때
            else if(this.message === "block"){
                MainRepository.TradeView.initPage(true);
            }
            else if(this.message === "customToken"){
                MainRepository.TradeView.initPage(false);
                MainRepository.TradeView.updatePage(
                    {cryptocurrency : 'custom'}
                )
            }

            this.showProgress = true;
            MainRepository.TradeView.load(() => {
                this.showProgress = false;
            })

            // Buy/Sell 로 선택된 item 초기화
            MainRepository.TradeView.setchangeDrawer(-1);
        },
        methods: {
            customCheck(){
                if(this.message !== 'customToken'){
                    MainRepository.CustomToken.setCustomTokenNo(-1);
                }

            },
            onSetUpClick() {
                this.showNickNameModal = true;
            },
            closeNicknameModal(){
             this.showNickNameModal = false;
            }
        },
    });
</script>

<style scoped>
    /*web 일때*/
    @media only screen and (min-width: 960px) {
        .nickname-setUp{
            padding-top: 14px;
            padding-bottom: 14px;
            border-radius: 2px;
            background-color: #f8f8fa;
            padding-left : 24px;
            margin-top : 48px;
        }
    }
    /*mobile 일때*/
    @media only screen and (max-width: 959px) {
        .nickname-setUp{
            border-radius: 2px;
            background-color: #f8f8fa;
            padding: 8px 8px 16px 8px;
            text-align: left;
            margin-top : 16px;
        }
    }
    /*web 일때*/
    @media only screen and (min-width: 960px) {
        .no-more-ads{
            margin: 120px auto 16px auto;
        }
        .no-more-ads-text{
            margin-bottom: 56px;
        }
    }
    /*mobile 일때*/
    @media only screen and (max-width: 959px) {
        .no-more-ads{
            margin: 48px auto 16px auto;
        }
    }
    .list_progress {
        margin-top: 80px;
    }

</style>