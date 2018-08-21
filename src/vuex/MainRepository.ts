import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

import SelectBoxController from "@/vuex/controller/SelectBoxController";
import StateController from "@/vuex/controller/StateController";
import TradeListController from "@/vuex/controller/TradeListController";
import MyTradeController from "@/vuex/controller/MyTradeController";
import MerchantController from "@/vuex/controller/MerchantController";
import PaginationController from "@/vuex/controller/PaginationController";
import BalanceController from "@/vuex/controller/BalanceController";
import CommonController from "@/vuex/controller/CommonController";
import MarketPriceController from "@/vuex/controller/MarketPriceController";
import AccountController from "@/vuex/controller/AccountController";
import ChatAvatarController from "@/vuex/controller/ChatAvatarController";

import AccountService from "@/service/account/AccountService";
import TradeService from "@/service/trade/TradeService";
import AdService from "@/service/ad/AdService";
import CommonService from "@/service/common/CommonService";
import AxiosService from "@/service/AxiosService";
import OrderService from "@/service/order/OrderService";
import BalanceService from "@/service/balance/BalanceService";

import Account from "@/vuex/model/Account";
import EmailVerification from "@/vuex/model/EmailVerification";
import PhoneVerification from "@/vuex/model/PhoneVerification";
import IdVerification from "@/vuex/model/IdVerification";
import PaymentMethod from "@/vuex/model/PaymentMethod";
import OtherUsers from "@/vuex/model/OtherUsers";
import Block from "@/vuex/model/Block";
import Balance from "@/vuex/model/Balance";
import LoginHistory from "@/vuex/model/LoginHistory";
import SecuritySettings from "@/vuex/model/SecuritySettings";
import MarketPrice from "@/vuex/model/MarketPrice";
import TradeItem from "@/vuex/model/TradeItem";
import Order from "@/vuex/model/Order";
import {doesHttpOnlyCookieExist} from "@/common/common";
import RouterController from "@/vuex/controller/RouterController";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeController from "@/vuex/controller/TradeController";
import MyTradeFilter from "@/vuex/model/MyTradeFilter";
import MerchantService from "@/service/merchant/MerchantService";
import Merchant from "@/vuex/model/Merchant";

let myTradeController : MyTradeController;
let selectBoxController: SelectBoxController;
let tradelistController: TradeListController;
let stateController: StateController;
let merchantController: MerchantController;
let paginationController: PaginationController;
let accountController: AccountController;
let marketPriceController: MarketPriceController;
let commonController: CommonController;
let balanceController: BalanceController;
let routerController: RouterController;
let tradeController: TradeController;
let chatAvatarController: ChatAvatarController;

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
        commonController = new CommonController(store);
        balanceController = new BalanceController(store);
        tradeController = new TradeController(store);
        chatAvatarController = new ChatAvatarController(store);

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


        // 유져 정보 GET
        this.initData(function () {
            instance.setInitCompleted(true);
        });

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
        let self = this;
        AccountService.Account.checkLogin(
            // 로그인 유저 -> 유저 정보 Set
            function (data) {
                accountController.setUserInfo(new Account(data));

                self.Balance.setBalances(function () {});
                self.Balance.setSecurityBalance(function () {});
                // 객체형으로 관리하도록 변경 필요
                self.MyInfo.loadMyPaymentMethods();

                // 내 Merchant 정보
                self.Merchant.loadMyMerchantInfo(function () {});
                callback();
            },
            // 로그인 하지 않음
            function () {
                callback();
            }
        );
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
    Common: {
        //sell/buy 프로세스 상대방 결제수단 정보 get
        setPaymentMethod: function (data: any, callback: any) {
            CommonService.info.setPaymentMethod({
                email : instance.MyInfo.getUserInfo().email
            },function (result) {
                const paymentMethod_map = {
                    alipay : {},
                    wechat : {},
                    bank : {}
                };

                for (let i = 0; i < result.length; i++) {
                    const paymentMethod_tmp = result[i];
                    let paymentMethod = new PaymentMethod(paymentMethod_tmp);
                    if(paymentMethod.type === 'alipay'){
                        paymentMethod_map.alipay = paymentMethod;
                    }else if(paymentMethod.type === 'wechat'){
                        paymentMethod_map.wechat = paymentMethod;
                    }else{
                        paymentMethod_map.bank = paymentMethod;
                    }
                }
                //console.log(paymentMethod_map);
                commonController.setPaymentMethod(paymentMethod_map);
                callback();
            })
        },
        getPaymentMethod: function () {
            return commonController.getPaymentMethod();
        }
    },
    Balance: {
        setBalances: function (callback:any) {
          BalanceService.getBalances({
              email: instance.MyInfo.getUserInfo().email
          }, function (result) {
              let balance = new Balance('');
              const balance_map = {};

              for (let i = 0; i < result.length; i++) {
                  const balance_tmp = result[i];
                  balance = new Balance(balance_tmp);
                  balance_map[balance_tmp.cryptoCurrency] = balance;
              }
              balanceController.setBalance(balance_map);
              callback(balance_map);
          })
        },
        getBalance: function () {
            return balanceController.getBalance();
        },
        setSecurityBalance: function(callback:any){
            BalanceService.getMySecurityBalance({
                email: instance.MyInfo.getUserInfo().email
            }, function(result){
            //securityDeposit 해야함.

            })
        }

    },
    MyPage: {
        getMemberVerification: function (callback: any) {
            AccountService.Verification.memberVerification({
                email: instance.MyInfo.getUserInfo().email
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
            AccountService.Verification.idVerification({
                email: instance.MyInfo.getUserInfo().email
            }, function (result) {
                let idVerification = new IdVerification(result);
                callback(idVerification);
            })
        },
        setPaymentMethod: function (type: string, data: any, callback: any){
            AccountService.Account.addPaymentMethod(type,data,function (result) {
                callback(result);
            })
        },
        getBlockList: function (callback: any) {
            AccountService.BlockList.getBlockList({
                email: instance.MyInfo.getUserInfo().email
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
                email: instance.MyInfo.getUserInfo().email
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
                email: instance.MyInfo.getUserInfo().email
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
    MyInfo: {
        controller(): AccountController {
            return accountController;
        },
        getUserInfo(): Account {
            return accountController.getUserInfo();
        },
        isLogin(): boolean {
            return accountController.getUserInfo().isLogin();
        },
        checkLoginBySession(): boolean {
            let isLogin = doesHttpOnlyCookieExist('SESSION'); //firefox 미동작 하므로 추가 코딩 필요
            let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            return isLogin || isFirefox
        },

        loadMyPaymentMethods: function () {
            CommonService.info.setPaymentMethod({
                email : this.getUserInfo().email
            },function (result) {
                let _payments: PaymentMethod[] = [];
                for (let i = 0; i < result.length; i++) {
                    _payments.push(new PaymentMethod(result[i]));
                }
                accountController.setMyPaymentMethods(_payments);
            })
        },
        updateMyPamentMethods: function () {
            let self = this;
            self.loadMyPaymentMethods();

        },

        getMyPaymentMethods() {
            return accountController.getMyPaymentMethods();
        },
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
        getOtherUsersbyMemberNo(memberNo : string, callback: any) {
            AccountService.Account.getOtherUsersInfobyMemberNo({
                memberNo: memberNo
            }, function (result) {
                let otherUserInfo = new OtherUsers(result);
                callback(otherUserInfo);

            })
        },
        isUserActive(data : any, callback: any){
            AccountService.Account.isUserActive(data, function (result) {
                callback(result);
            })
        },
        ///UserPage에서 user의 과거 이력data GET
        getUserPageHistoryInfo(data : number, callback: any){
            AdService.getUserPageHistoryInfo(data, function (result) {
                callback(result);
            })
        },
        getUserPageAdsList(data : number, callback: any){
            AdService.getUserPageAdsList(data, function (result) {

                let BuyLists: TradeItem[] = [];
                let SellLists: TradeItem[] = [];
                let tempLists = {};
                for(let key in result){

                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    if(itemList.tradeType ==='Buy'){
                        BuyLists.push(itemList);
                    }else if(itemList.tradeType ==='Sell'){
                        SellLists.push(itemList);
                    }
                }
                tempLists = {BuyLists, SellLists};
                callback(tempLists);
            })
        },
        postBlockThisUser(data : number, callback: any){
            AccountService.BlockList.postBlockUser(data, function (result) {
                callback(result);
            })
        },
        deleteBlockThisUser(data : number, callback: any){
            AccountService.BlockList.deleteBlockUser(data, function (result) {
                callback(result);
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
                tradeType : 'Buy',
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
        initPage(isBlock: boolean) {
            this.setTradeFilter({
                type : isBlock ? 'block' : 'piece',
                cryptocurrency : 'bitcoin',
                tradeType : 'sell',
                nationality : 'ALL',
                currency :  'CNY',
                amount :  -1,
                paymentMethods :  '',
                page :  1,
                size : 10,
            })
        },
        setTradeFilter(data) {
            tradelistController.setTradeFilter(
                new TradeFilter(data)
            )
        },
        // 리스트 페이지 SET
        updatePage(data) {
            //바뀐 data로 filter update해주기.
            tradelistController.updateTradeFilter(data);
        },
        // 리스트 페이지 SET
        updateSelectPage(data) {
            //바뀐 data로 filter update해주기.
            tradelistController.updateTradeFilter(data);
            this.load(function () {});
        },

        load(callback: any) {
            // 변환 로직

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
                callback();
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
        createOrder: function (data : any, callback: any) {
            OrderService.addOrder(data, function (result) {
                callback(result);
            })
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

                    case 'MyOrder':
                        instance.MyOrder.updatePage({page : page});
                        break;

                    case 'MyAds':
                        instance.MyAds.updatePage({page : page});
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
        getMyInfo(): Merchant {
            return merchantController.getMerchant();
        },
        loadMyMerchantInfo(callback: any) {
            MerchantService.getMerchant((data) => {
                this.controller().setMerchant(data);
                callback();
            })
        },
        postMerchant(callback: any) {
            MerchantService.postMerchant(() => {
                callback();
            })
        }
    },
    MyAds:{
        controller(): MyTradeController {
            return myTradeController;
        },
        initPage(){
            this.setFilter({
                email : instance.MyInfo.getUserInfo().email,
                searchStartTime : '',
                searchEndTime : '',
                status : '',
                orderNo : '',
                cryptocurrency : '',
                orderType : '',
                tradeType : '',
                currency : '',
                page : '1',
                size : '10'
            })
            this.load();
        },
        initData(){
            myTradeController.setMyAdsFilter({
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
        load(){
            AdService.getMyAds({
                email : instance.MyInfo.getUserInfo().email,
                searchStartTime : myTradeController.getMyAdsFilter().searchStartTime,
                searchEndTime : myTradeController.getMyAdsFilter().searchEndTime,
                status : myTradeController.getMyAdsFilter().status,
                adNo : myTradeController.getMyAdsFilter().adNo,
                cryptocurrency : myTradeController.getMyAdsFilter().cryptocurrency,
                orderType : myTradeController.getMyAdsFilter().orderType,
                tradeType : myTradeController.getMyAdsFilter().tradeType,
                currency : myTradeController.getMyAdsFilter().currency,
                page : myTradeController.getMyAdsFilter().page,
                size : '10',
            }, function (data) {
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.myAdsList
                let myAdsList: TradeItem[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    myAdsList.push(itemList);
                }
                myTradeController.setMyAdsItems(myAdsList);
            })
        },
        setFilter( data){
            myTradeController.setMyAdsFilter(new MyTradeFilter(data));
        },
        updatePage(data){
            myTradeController.updateMyAdsFilter(data);
            this.load();
        },
        getPage(){
            return myTradeController.getMyAdsItems();
        },
    },
    MyOrder: {
        controller(): MyTradeController {
            return myTradeController;
        },
        initPage(){
            this.setFilter({
                email : instance.MyInfo.getUserInfo().email,
                searchStartTime : '',
                searchEndTime : '',
                status : '',
                orderNo : '',
                cryptocurrency : '',
                orderType : '',
                tradeType : '',
                currency : '',
                page : '1',
                size : '10',})
            this.load();

        },
        load(){
            OrderService.getMyOrder({
                email : instance.MyInfo.getUserInfo().email,
                searchStartTime : myTradeController.getMyOrderFilter().searchStartTime,
                searchEndTime : myTradeController.getMyOrderFilter().searchEndTime,
                status : myTradeController.getMyOrderFilter().status,
                orderNo : myTradeController.getMyOrderFilter().orderNo,
                cryptocurrency : myTradeController.getMyOrderFilter().cryptocurrency,
                orderType : myTradeController.getMyOrderFilter().orderType,
                tradeType : myTradeController.getMyOrderFilter().tradeType,
                currency : myTradeController.getMyOrderFilter().currency,
                page : myTradeController.getMyOrderFilter().page,
                size : '10',
            }, function (data) {
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.ordersList
                let myOrderList: Order[] = [];
                for(let key in result){
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: Order = new Order(result[key])
                    myOrderList.push(itemList);
                }
                myTradeController.setMyOrderItems(myOrderList);
            })
        },
        initData(){
            this.setFilter({
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
        setFilter(data){
            myTradeController.setMyOrderFilter(
                new MyTradeFilter(data)
            )
        },
        updatePage(data){
            myTradeController.updateMyOrderFilter(data);
            this.load();
        },
        getPage(){
            return myTradeController.getMyOrderItems();
        },

    },
    AD : {
        postAD: function (data : any, callback: any) {
            AdService.postAD(data, function (result) {
                callback(result);
            })
        }
    },
    TradeProcess: {
        setOrder: function (data: any, callback: any) {
            OrderService.getOrder(data, function (result) {
                let tradeProcess = new Order(result);
                tradeController.setOrder(tradeProcess);
                callback();
            })
        },
        getOrder: function () {
            return tradeController.getOrder();
        },
        onPaid: function (data: any, callback: any) {
            OrderService.onPaid(data, function (result) {
                callback(result);
            })
        },
        onCancel: function (data: any, callback: any) {
            OrderService.onCancel(data, function (result) {
                callback(result);
            })
        },
        onAppeal: function (data: any, callback: any) {
            OrderService.onAppeal(data, function (result) {
                callback(result);
            })
        },
        onConfirm: function (data: any, callback: any) {
            OrderService.onAppeal(data, function (result) {
                callback(result);
            })
        },
        setChatAvatar: function  (data: any, callback: any) {
            chatAvatarController.setChatAvatar(data);
            callback();
        },
        getChatAvatar: function () {
            return chatAvatarController.getChatAvatar();
        },
        updateChatAvatar: function  (data: any, callback: any) {
            chatAvatarController.updateChatAvatar(data);
            callback();
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
    },

    router() {
        return routerController;
    },
    initRouterController(router: any) {
        routerController = new RouterController(router);
    }
}