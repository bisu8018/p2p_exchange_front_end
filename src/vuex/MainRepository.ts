import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";
import SelectBoxController from "@/vuex/controller/SelectBoxController";
import StateController from "@/vuex/controller/StateController";
import TradeListController from "@/vuex/controller/TradeListController";
import MyTradeController from "@/vuex/controller/MyTradeController";
import MerchantController from "@/vuex/controller/MerchantController";
import PaginationController from "@/vuex/controller/PaginationController";

import AccountService from "@/service/account/AccountService";
import {doesHttpOnlyCookieExist} from "@/common/common";
import TradeItem from "@/vuex/model/TradeItem";
import TradeService from "@/service/trade/TradeService";
import AdService from "@/service/ad/AdService";
import AccountController from "@/vuex/controller/AccountController";
import Account from "@/vuex/model/Account";
import EmailVerification from "@/vuex/model/EmailVerification";
import PhoneVerification from "@/vuex/model/PhoneVerification";
import IdVerification from "@/vuex/model/IdVerification";
import PaymentMethod from "@/vuex/model/PaymentMethod";
import OtherUsers from "@/vuex/model/OtherUsers";
import Block from "@/vuex/model/Block";
import LoginHistory from "@/vuex/model/LoginHistory";
import SecuritySettings from "@/vuex/model/SecuritySettings";
import MarketPriceController from "@/vuex/controller/MarketPriceController";
import CommonService from "@/service/common/CommonService";
import MarketPrice from "@/vuex/model/MarketPrice";

let myTradeController : MyTradeController;
let selectBoxController: SelectBoxController;
let tradelistController: TradeListController;
let stateController: StateController;
let merchantController: MerchantController;
let paginationController: PaginationController;
let accountController: AccountController;
let marketPriceController: MarketPriceController;

let store: Store<any>;
let instance: any;

export default {
    init: function (vuexStore: Store<any>, callback: () => any) {
        // Vuex < > Controller 연결
        store = vuexStore;
        selectBoxController = new SelectBoxController(store);
        stateController = new StateController(store);
        tradelistController = new TradeListController(store);
        paginationController = new PaginationController(store);
        merchantController = new MerchantController(store);
        accountController = new AccountController(store);
        myTradeController = new MyTradeController(store);

        // 자기 참조할 때 씀
        marketPriceController = new MarketPriceController(store);

        // 자기 참조
        instance = this;

        // 모바일 체크 -> Vuex
        if (document.documentElement.clientWidth < 768) {
            this.State.controller().setMobile(true);
        } else {
            this.State.controller().setMobile(false);
        }


        // 서버 데이터 초기화 -> 완료 후 Callback
        instance.initData(function () {console.log('init');
            instance.setInitCompleted(true);
        });
      /*  CommonService.init.getInitValue(function (data: any) {
           instance.initData(data);
           callback();
        });*/
        /*getInitValue(function (data: any) {
            instance.initData(data);
            callback()
        });
        */

        // 운영체제 체크
        // if (/Android/i.test(navigator.userAgent)) { // 안드로이드 체크
        //     this.State.controller().setCheckOs(1);
        // } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { // IOS 체크
        //     this.State.controller().setCheckOs(2);
        // } else { // 기타
        //     this.State.controller().setCheckOs(3);
        // }
    },
    //서버 초기 데이터를 파싱
    initData: function (callback: any) {
        // 로그인한 유저 정보 파싱
        let isLogin = doesHttpOnlyCookieExist('SESSION'); //firefox 미동작 하므로 추가 코딩 필요
        let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isLogin === true || isFirefox) {
            this.Login.setUserInfo(function () {
                callback();
            })
        }else{
            callback();
        }
        // 계정 JSON 파싱
      /* for (let key in data['accounts']) {
            accountController.push(data['accounts'][key])
        }*/
    },
    //서버 데이터 초기화 완료 체크
    setInitCompleted(isCompleted: boolean) {
        store.dispatch(VuexTypes.INIT_COMPLETED, isCompleted)
    },
    State: {
        controller(): StateController {
            return stateController
        },
        isMobile(): boolean {
            return stateController.isMoblie();
        },
        isInitCompleted(){
            return stateController.isInitCompleted();
        },
    },
    MyPage: {
        getMemberVerification: function (callback: any) {
            AccountService.Verification.memberVerification({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let email = new EmailVerification('');
                let phone = new PhoneVerification('');

                for (let i = 0; i < result.length; i++) {
                    const memberVerification_tmp = result[i];
                    if (memberVerification_tmp.type === 'email') {
                        email = new EmailVerification(memberVerification_tmp);
                    } else {
                        phone = new PhoneVerification(memberVerification_tmp);
                    }
                }
                callback(email, phone);
            });
        },
        getIdVerification: function (callback: any) {
            console.log(instance.Login.getUserInfo().email);
            AccountService.Verification.idVerification({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let idVerification = new IdVerification(result);
                callback(idVerification);
            })
        },
        getPaymentMethod: function (callback: any) {
            AccountService.PaymentMethod.getPaymentMethod({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let paymentMethod = new PaymentMethod('');
                const paymentMethod_map = new Map();

                for (let i = 0; i < result.length; i++) {
                    const paymentMethod_tmp = result[i];
                    paymentMethod = new PaymentMethod(paymentMethod_tmp);
                    paymentMethod_map.set(paymentMethod_tmp.type, paymentMethod);
                }
                callback(paymentMethod_map);
            })
        },
        setPaymentMethod: function (type: string, data: any, callback: any){
            AccountService.Account.addPaymentMethod(type,data,function (result) {
                callback(result);
            })
        },
        getBlockList: function (callback: any) {
            AccountService.BlockList.getBlockList({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let blockList = new Block('');
                const blockList_arr = new Array();

                for (let i = 0; i < result.length; i++) {
                    const blockList_tmp = result[i];
                    blockList = new Block(blockList_tmp);
                    blockList_arr.push(blockList);
                }
                callback(blockList_arr);
            })
        },
        getLoginHistory: function (callback: any) {
            AccountService.LoginHistory.getLoginHistory({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let loginHistory = new LoginHistory('');
                const loginHistory_arr = new Array();

                for (let i = 0; i < result.length; i++) {
                    const loginHistory_tmp = result[i];
                    loginHistory = new LoginHistory(loginHistory_tmp)
                    loginHistory_arr.push(loginHistory);
                }
                callback(loginHistory_arr);
            })
        },
        getSecuritySettings: function (callback: any) {
            AccountService.SecuritySettings.getSecuritySettings({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let securitySettings = new SecuritySettings('');
                const securitySettings_arr = new Array();

                for (let i = 0; i < result.length; i++) {
                    const securitySettings_tmp = result[i];
                    securitySettings =  new SecuritySettings(securitySettings_tmp);
                    securitySettings_arr.push(securitySettings);
                }
                callback(securitySettings_arr);
            })
        }
    },
    Login: {
        // 유저 정보 VUEX 저장
        setUserInfo(callback : any) {
            AccountService.Account.getUserInfo(function (result) {
                let userInfo = new Account(result);
                // var nextArr = JSON.stringify(tradeInfo)
                accountController.setUserInfo(userInfo);
                callback();
            });
        },
        getUserInfo() {
            return accountController.getUserInfo();
        }
    },
    Users: {
        //다른 유저 정보 GET
        getOtherUsers(email : string, callback: any) {
            AccountService.Account.getOtherUsersInfo({
                email: email
            }, function (result) {
                let otherUserInfo = new OtherUsers(result);
                callback(otherUserInfo);

            })
        },
    },
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
        controller(): TradeListController {
            return tradelistController
        },
        initData() {
            //filter 초기화
            tradelistController.updateTradeFilter({
                type : 'piece',
                cryptocurrency : 'bitcoin',
                tradeType : 'buy',
                nationality : 'ALL',
                currency :  'CNY',
                amount :  -1,
                paymentMethods :  '',
                page :  1,
                size : 10,
                })
            //pagination 초기화
            paginationController.setPage(1);
            paginationController.setTotalCount(1);
            //selectbox 초기화
            selectBoxController.setCountry('ALL');
            selectBoxController.setCurrency('CNY');
            selectBoxController.setPayment('ALL');
        },
        initFromMainPage(){
            //tradecenter에서 창 열면 type piece로 생성
            instance.TradeView.updateTradeFilter({type : 'piece',})
            //page 켜졌을때 default로 생성.
        },
        initPiecePage(){
            //tradecenter에서 창 열면 type piece로 생성
            tradelistController.updateTradeFilter({type : 'piece',})
            //default로 초기보여줄 창의 filter들 넣어줌
            TradeService.tradeView.tradePage({
                type : 'piece',
                cryptocurrency : 'bitcoin',
                tradeType : 'buy',
                nationality : 'ALL',
                currency :  'CNY',
                amount :  -1,
                paymentMethods :  '',
                page :  1,
                size : 10,
            }, function (data) {
                //전체 item 갯수 pagination에 넣어주기.
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.adList
                let tradeList: TradeItem[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    tradeList.push(itemList);
                }
                tradelistController.setTradeItems(tradeList);
            })
        },
        initBlockPage(){
            //tradecenter에서 창 열면 type block으로 생성
            tradelistController.updateTradeFilter({type : 'block',})
            TradeService.tradeView.tradePage({
                type : 'block',
                cryptocurrency : 'bitcoin',
                tradeType : 'buy',
                nationality : 'ALL',
                currency :  'CNY',
                amount :  -1,
                paymentMethods :  '',
                page :  1,
                size : 10,
            }, function (data) {
                //전체 item 갯수 pagination에 넣어주기.
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.adList
                let tradeList: TradeItem[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    tradeList.push(itemList);
                }
                tradelistController.setTradeItems(tradeList);
            })
        },
        // 리스트 페이지 SET
        updateSelectPage(data) {
            //바뀐 data로 filter update해주기.
            tradelistController.updateTradeFilter(data);
            //바뀐 data로 DB에서 item 불러오기
            TradeService.tradeView.tradePage({
                type : tradelistController.getTradeFilter().type,
                cryptocurrency : tradelistController.getTradeFilter().cryptocurrency,
                tradeType :   tradelistController.getTradeFilter().tradeType,
                nationality : tradelistController.getTradeFilter().nationality,
                currency :  tradelistController.getTradeFilter().currency,
                amount :  tradelistController.getTradeFilter().amount,
                paymentMethods :  tradelistController.getTradeFilter().paymentMethods,
                page :   tradelistController.getTradeFilter().page,
                size : tradelistController.getTradeFilter().size,
            }, function (data) {
                //전체 item 갯수 pagination에 넣어주기.
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.adList
                let tradeList: TradeItem[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    tradeList.push(itemList);
                }
                tradelistController.setTradeItems(tradeList);

            })

        },
        getSelectFilter() {
            return tradelistController.getTradeFilter();
        },
        getSelectPage() {
            return tradelistController.getTradeItems();
        },

        // cryptocurrency & tradeType
        // tradecenter 왼쪽 필터
        setTradeLeftFilter(cryptocurrency: string, tradeType: string,) {
            var LeftFilterArr = {
                cryptocurrency : cryptocurrency,
                tradeType :   tradeType,
                page : 1,                     //이 1은 TradeFilter에 들어가는 page 정보이므로 여기에 추가해 줘야함.
            };
            //page는 1로 초기화
            instance.Pagination.setPage(1,);
            instance.TradeView.updateSelectPage(LeftFilterArr);      //필터에 맞게 화면 재구성
        },
        setTradeRightFilter(nationality: string, paymentMethod: string, currency: string, amount: string){
            //amount 에 들어간 값이 없을때
            if(amount ==''){
                amount = '0'
            }
            var RightFilterArr = {
                nationality : instance.SelectBox.controller().getCountry(),
                paymentMethods : instance.SelectBox.controller().getPayment(),
                currency : instance.SelectBox.controller().getCurrency(),
                amount :  Number(amount),
                page: 1,
            };
            instance.Pagination.setPage(1,);//page는 1로 초기화
            instance.TradeView.updateSelectPage(RightFilterArr);     //필터에 맞게 화면 재구성
        },

        setchangeDrawer(adNo: number){
            let tempNo = tradelistController.getDrawerID();
            if(tempNo === adNo){
                tradelistController.setDrawerID(0)
            }
            else{
                tradelistController.setDrawerID(adNo)
            }
        },
        getDrawer(){
            return tradelistController.getDrawerID();
        },

    },
    SelectBox: {
        controller(): SelectBoxController {
            return selectBoxController
        },
    },

    // /*  Pagination 사용법
    //     view에서 paginiation을 직접 누르는 게 아닌, 다른 요인으로 pagination을 1페이지로 돌리고 싶을시엔
    //     Paginatin.setPage(1); 만 선언할것.   */
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
            //현재 page set
            paginationController.setPage(page);
            //pagination에서 직접버튼을 눌렀을때만 아래의 case 따라 page update 시켜줌.
            if(type !==''){
                switch (type) {
                    case 'tradecenter':     //tradecenter page 일때.
                        instance.TradeView.updateSelectPage({page : page});  //이거 살리면 오히려 위에 update랑 충돌나서 안됌
                        break;

                    case 'MyAds':

                        break;
                    default :

                        break;
                }
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
    MyAds:{
        controller(): MyTradeController {
            return myTradeController;
        },
        initPage(){
            AdService.getMyAds({
                email : '',
                searchStartTime : '',
                searchEndTime : '',
                status : '',
                orderNo : '',
                cryptocurrency : '',
                orderType : '',
                tradeType : '',
                currency : '',
                page : '1',
                size : '10',
            }, function (data) {
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.adList
                let myAdsList: TradeItem[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    myAdsList.push(itemList);
                }
                myTradeController.setMyAdsItems(myAdsList);
            })
        },
        initData(){
            myTradeController.setMyAdsFilter({
                email : '',
                searchStartTime : '',
                searchEndTime : '',
                status : '',
                orderNo : '',
                cryptocurrency : '',
                orderType : '',
                tradeType : '',
                currency : '',
                page : '1',
                size : '10',
            })
            //pagination 초기화
            paginationController.setPage(1);
            paginationController.setTotalCount(1);
        },
        setFilter( start_date: string, end_date: string, coinType: string, tradeType: string,
                   orderNo: number, adsType: string, currency: string,){
            AdService.getMyAds({
                email : instance.Login.getUserInfo().email,
                searchStartTime : start_date,
                searchEndTime : end_date,
                status : '',
                orderNo : orderNo,
                cryptocurrency : coinType,
                orderType : adsType,
                tradeType : tradeType,
                currency : currency,
                page : instance.paginationController.getPage(),
                size : '10',
            }, function (data) {
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.adList
                let myAdsList: TradeItem[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    myAdsList.push(itemList);
                }
                myTradeController.setMyAdsItems(myAdsList);
            })
        },
        updatePage(){

        },
        getPage(){
            return myTradeController.getMyAdsItems();
        },
    },


    MarketPrice: {
        controller(): MarketPriceController {
            return marketPriceController;
        },
        load(callback: any) {
            CommonService.info.getMarketPrice(function (data) {
                let priceList: MarketPrice[] = [];
                for (let key in data) {
                    priceList.push(new MarketPrice(data[key]));
                }
                marketPriceController.setMarketPriceList(priceList);
                callback();
            })
        }
    }
}