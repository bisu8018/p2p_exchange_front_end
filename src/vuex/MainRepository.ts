import {Store} from "vuex";
import SelectBoxController from "@/vuex/controller/SelectBoxController";
import StateController from "@/vuex/controller/StateController";
import ListController from "@/vuex/controller/ListController";
import MerchantController from "@/vuex/controller/MerchantController";
import PaginationController from "@/vuex/controller/PaginationController";

import {VuexTypes} from "@/vuex/config/VuexTypes";
import AccountService from "@/service/account/AccountService";
import Trade from "@/vuex/model/Trade";
import TradeService from "@/service/trade/TradeService";
import {AxiosInstance} from "axios";
import {toASCII} from "punycode";


let selectBoxController: SelectBoxController;
let listController : ListController;
let stateController: StateController;
let merchantController: MerchantController;
let paginationController: PaginationController;

let store: Store<any>;
let instance: any;

export default {
    init: function (vuexStore: Store<any>, callback: () => any) {
        // Vuex < > Controller 연결
        store = vuexStore;
        selectBoxController = new SelectBoxController(store);
        stateController = new StateController(store);
        listController = new ListController(store);
        paginationController = new PaginationController(store);
        merchantController = new MerchantController(store);


        // 자기 참조할 때 씀
        instance = this;

        // 서버 데이터 초기화 -> 완료 후 Callback
        // MainService.getInitValue(function (data: any) {
        //     instance.initData(data);
        //     callback()
        // });


        // 모바일 인지 체크 -> Vuex
        if (document.documentElement.clientWidth < 768) {
            this.State.controller().setMobile(true);
        } else {
            this.State.controller().setMobile(false);
        }

        // 운영체제 체크
        // if (/Android/i.test(navigator.userAgent)) { // 안드로이드 체크
        //     this.State.controller().setCheckOs(1);
        // } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { // IOS 체크
        //     this.State.controller().setCheckOs(2);
        // } else { // 기타
        //     this.State.controller().setCheckOs(3);
        // }
    },
    // initData: function (data: any) {
    // 서버 초기 데이터를 파싱 한다.
    // // 유저 파싱
    // this.setMyInfo(new User(data['user']));
    //
    // // 계정 JSON 파싱
    // for (let key in data['accounts']) {
    //     accountController.push(data['accounts'][key])
    // }
    // },

    // 서버 데이터 초기화가 완료를 파악할 때 사용한다. (서버 데이터 완료 후 뷰 그리기 등)
    // setInitCompleted(isCompleted: boolean) {
    //     store.dispatch(VuexTypes.INIT_COMPLETED, isCompleted)
    // },
    State: {
        controller(): StateController {
            return stateController
        },
        isMobile(): boolean {
            return stateController.isMoblie();
        }
    },
    // User: {},
    // Login: {},
    // SignUp: {},

    Service: {
        Account() {
            return AccountService;
        },
        Trade() {
            return TradeService;
        }
    },

    TradeView: {
        controller(): ListController {
            return listController
        },

        initPage(){
            var tempArr = {
                page :   '1', //paginationController.getPage(),
                cryptocurrency : 'BTC',  //listController.getCryptocurrency(),
                tradeType :   'buy', //listController.getTradeType(),
                nationality : 'ALL',  //selectBoxController.getCountry(),
                currency :  'CNY', //selectBoxController.getCurrency(),
                limitMin :  0, //listController.getLimitMin(),
                paymentMethod :  'ALL', //selectBoxController.getPayment(),
            };
            //이 위까지 어차피 axios로 받아와할듯.

            let tradeInfo = new Trade(tempArr);
            // var nextArr = JSON.stringify(tradeInfo)
            // console.log(nextArr)
            listController.setSelectTrade(tradeInfo);

        },

        // 리스트 페이지 SET
        updateSelectPage(data) {

            listController.updateSelectTrade(data);
            // TradeService.tradeView.tradePageInfo(page, cryptocurrency, tradeType, nationality, currency, limitMin, paymentMethod, function (data) {
            //     let tradeList: Trade[] = data;
            //     // for (let key in data) {
            //     //     let trade: Trade = new Trade(data[key]);
            //     //     tradeList.push(trade);
            //     // }
            //     //리스트 형태 SET
            //     listController.setSelectTrade(tradeList);
            // });
        },
        getSelectPage() {
            return listController.getSelectTrade();
        },

        // Token AdType Vuex
        // tradecenter 왼쪽 필터
        setTradeLeftFilter(cryptocurrency: string, tradeType: string,) {
            var LeftFilterArr = {
                cryptocurrency : cryptocurrency,
                tradeType :   tradeType,
                page : 1,
            };
            instance.Pagination.setPage(1);          //page는 1로 초기화
            instance.TradeView.updateSelectPage(LeftFilterArr);      //필터에 맞게 화면 재구성
        },
        setTradeRightFilter(nationality: string, paymentMethod: string, currency: string, amount: number){
            var RightFilterArr = {
                nationality : instance.SelectBox.controller().getCountry(),
                paymentMethod : instance.SelectBox.controller().getPayment(),
                currency : instance.SelectBox.controller().getCurrency(),
                minLimit : amount,
            };
            instance.Pagination.setPage(1);         //page는 1로 초기화
            instance.TradeView.updateSelectPage(RightFilterArr);     //필터에 맞게 화면 재구성
        },
    },
    SelectBox: {
        controller(): SelectBoxController {
            return selectBoxController
        },
    },

    Pagination: {
        controller(): PaginationController {
            return paginationController
        },
        getPage() {
            return paginationController.getPage();
        },
        getTotalCount() {
            return paginationController.getTotalCount();
        },
        setPage(page: number, size : number, type : string) {
            paginationController.setPage(page);
            switch (type) {
                case 'tradecenter':                         //tradecenter page 일때.
                    instance.TradeView.updateSelectPage({page : page});
                    break;

                case 'MyAds':

                    break;
                default :

                    break;
            }

        },

    },
    Merchant: {
        controller(): MerchantController {
            return merchantController
        },
        // setMerchant (name: string) {
        //     MerchantController.setMerchant(name);
        // //    여기까지 선언하다 막힘.
        // },
    },

}