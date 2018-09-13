import {Store} from "vuex";
import {VuexTypes} from "@/vuex/config/VuexTypes";

import SelectBoxController from "@/vuex/controller/SelectBoxController";
import StateController from "@/vuex/controller/StateController";
import TradeListController from "@/vuex/controller/TradeListController";
import MyTradeController from "@/vuex/controller/MyTradeController";
import MerchantController from "@/vuex/controller/MerchantController";
import PaginationController from "@/vuex/controller/PaginationController";
import WalletController from "@/vuex/controller/WalletController";
import MarketPriceController from "@/vuex/controller/MarketPriceController";
import AccountController from "@/vuex/controller/AccountController";
import MsgAvatarController from "@/vuex/controller/MsgAvatarController";
import CustomTokenController from "@/vuex/controller/CustomTokenController";

import AccountService from "@/service/account/AccountService";
import TradeService from "@/service/trade/TradeService";
import AdService from "@/service/ad/AdService";
import CommonService from "@/service/common/CommonService";
import AxiosService from "@/service/AxiosService";
import OrderService from "@/service/order/OrderService";
import WalletService from "@/service/wallet/WalletService";

import Account from "@/vuex/model/Account";
import EmailVerification from "@/vuex/model/EmailVerification";
import PhoneVerification from "@/vuex/model/PhoneVerification";
import IdVerification from "@/vuex/model/IdVerification";
import PaymentMethod from "@/vuex/model/PaymentMethod";
import OtherUsers from "@/vuex/model/OtherUsers";
import Block from "@/vuex/model/Block";
import Wallet from "@/vuex/model/Wallet";
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
import MessageService from "@/service/message/MessageService";
import {abUtils} from "@/common/utils";
import MessageController from "@/vuex/controller/MessageController";
import message from "@/vuex/modules/message";
import OrderStat from "@/vuex/model/OrderStat";
import Withdraw from "@/vuex/model/Withdraw";
import WalletHistory from "@/vuex/model/WalletHistory";
import IdVerificationId from "@/vuex/model/IdVerificationId";
import MyAd from "@/vuex/model/MyAd";
import Vue from "vue";
import ChatController from "@/vuex/controller/ChatController";
import AppealService from "@/service/order/AppealService";
import ChatService from "@/service/chat/ChatService";
import Chat from "@/vuex/model/Chat";
import ChatSubscribe from "@/vuex/model/ChatSubscribe";
import ChatMembers from "@/vuex/model/ChatMembers";
import customTokenService from "@/service/customToken/customTokenService";
import CustomToken from "@/vuex/model/CustomToken";

let myTradeController: MyTradeController;
let selectBoxController: SelectBoxController;
let tradelistController: TradeListController;
let stateController: StateController;
let merchantController: MerchantController;
let paginationController: PaginationController;
let accountController: AccountController;
let marketPriceController: MarketPriceController;
let walletController: WalletController;
let routerController: RouterController;
let tradeController: TradeController;
let msgAvatarController: MsgAvatarController;
let messageController: MessageController;
let chatController: ChatController;
let customTokenController: CustomTokenController;

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
        walletController = new WalletController(store);
        tradeController = new TradeController(store);
        msgAvatarController = new MsgAvatarController(store);
        messageController = new MessageController(store);
        chatController = new ChatController(store);
        customTokenController = new CustomTokenController(store);

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
            instance.State.setInitCompleted(true);
        });

        this.initInterval();

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

                self.Wallet.loadWallets(() => {
                });
                self.Wallet.setSecurityWallets(() => {
                });
                self.Merchant.loadMyMerchantInfo(() => {
                });
                self.MarketPrice.load(() => {
                });
                self.MyToken.getMytoken(()=> {
                });
                self.MyInfo.loadMyPaymentMethods(() => {
                    callback();
                });

            },
            // 로그인 하지 않음
            function () {
                callback();
            }
        );
    },
    // 주기적으로 작동하는 함수
    initInterval() {
        setInterval(() => {
            if (this.MyInfo.isLogin()) {
                this.MyOrder.loadAlarm();
            }
        }, 10000)
    },
    //서버 데이터 초기화 완료 체크

    State: {
        controller(): StateController {
            return stateController
        },
        isMobile(): boolean {
            return stateController.isMoblie();
        },
        isInitCompleted() {
            return stateController.isInitCompleted();
        },
        setInitCompleted(isCompleted: boolean) {
            stateController.setInitCompleted(isCompleted);
        },
        setDomain(domain: string) {
            stateController.setDomain(domain)
        },
        getDomain() {
            return stateController.getDomain();
        }
    },
    Wallet: {
        controller(): WalletController {
            return walletController;
        },
        loadWallets: function (callback: any) {
            WalletService.getWallets({
                email: instance.MyInfo.getUserInfo().email
            }, (result) => {
                walletController.setWallet(result);
                callback();
            })
        },
        getWallets: function () {
            return walletController.getWallets();
        },
        setSecurityWallets: function (callback: any) {
            WalletService.getMySecurityBalance({
                email: instance.MyInfo.getUserInfo().email
            }, (result) => {
                //securityDeposit 해야함.

            })
        },
        //Withdraw
        setWithdraw: function (data: any) {
            walletController.setWithdraw(
                new Withdraw(data)
            )
        },
        getWithdraw: function () {
            return walletController.getWithdraw();
        },
        postWithdraw: function (data: boolean, callback: any) {
            WalletService.postWithdraw(
                {verificationMethod: data ? 'sms' : 'email'},
                {
                    addressTo: walletController.getWithdraw().addressTo,
                    amount: walletController.getWithdraw().amount,
                    cryptocurrency: walletController.getWithdraw().cryptocurrency,
                    fee: walletController.getWithdraw().fee,
                    ownerMemberNo: walletController.getWithdraw().ownerMemberNo,
                    receiveAmount: walletController.getWithdraw().receiveAmount
                }, (result) => {
                    callback(result);
                })
        },
        //Transfer
        updateTransfer: function (data: any) {
            walletController.updateTransfer(data)
        },
        getTransfer: function () {
            return walletController.getTransfer();
        },

        //currency
        setCurrency: function (data: any) {
            walletController.setWithdrawCurrency(data)
        },
        getCurrency: function () {
            return walletController.getWithdrawCurrency();
        },

        //Wallet history
        initHistoryData() {
            this.setHIstoryFilter('')
            paginationController.setPage(1);
            paginationController.setTotalCount(1);
        },
        initHistory() {
            this.setHIstoryFilter({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: '',
                searchEndTime: '',
                type: '',
                cryptocurrency: '',
                page: '1',
                size: '8'
            })
        },
        setHIstoryFilter(data) {
            walletController.setHistoryFilter(
                new MyTradeFilter(data)
            )
        },
        updateHistoryPage(data) {
            if (data.page === undefined) {
                walletController.updateHistoryFilter({page: 1});
                instance.Pagination.setPage(1,);
            }
            walletController.updateHistoryFilter(data);
            this.loadHistory(() => {
            });
        },
        loadHistory(callback: any) {
            WalletService.getWalletHistory({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: walletController.getHistoryFilter().searchStartTime,
                searchEndTime: walletController.getHistoryFilter().searchEndTime,
                type: walletController.getHistoryFilter().type,
                cryptocurrency: walletController.getHistoryFilter().cryptocurrency,
                page: walletController.getHistoryFilter().page,
                size: '8'
            }, function (data) {
                //전체 item list model화 시켜 주기
                let result = data.balanceHistoryList
                let walletHistoryList: WalletHistory[] = [];
                for (let key in result) {
                    let item: WalletHistory = new WalletHistory(result[key])
                    walletHistoryList.push(item);
                }
                paginationController.setTotalCount(data.totalCount);
                walletController.setWalletHistoryList(walletHistoryList);
                callback();
            })
        },
        getWalletHistories() {
            return walletController.getWalletHistoryList();
        }

    },
    MyPage: {
        getMemberVerification: function (callback: any) {
            AccountService.Verification.memberVerification({
                email: instance.MyInfo.getUserInfo().email
            }, (result) => {
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
            }, (result) => {
                let _idVerification = new IdVerification('');

                for (let i = 0; i < result.length; i++) {
                    let idVerification_tmp = result[i];
                    if (idVerification_tmp.type === 'id') {
                        _idVerification = new IdVerification(idVerification_tmp);
                    }
                }
                callback(_idVerification);
            })
        },
        postIdVerification: function (email: string, idVerificationId: IdVerificationId, callback: any) {
            AccountService.Verification.postIdVerification(email, idVerificationId, (result) => {
                callback(result);
            })
        },
        setPaymentMethod: function (email: string, paymentType: any, callback: any) {
            AccountService.Account.addPaymentMethod(email, paymentType, (result) => {
                instance.MyInfo.loadMyPaymentMethods(() => {
                })
                callback(result);
            })
        },
        deletePaymentMethod: function (email: string, paymentMethods: any, callback: any) {
            AccountService.Account.deletePaymentMethod(email, paymentMethods, (result) => {
                instance.MyInfo.loadMyPaymentMethods(() => {
                })
                callback(result);
            })
        },
        getBlockList: function (callback: any) {
            AccountService.BlockList.getBlockList({
                email: instance.MyInfo.getUserInfo().email
            }, (result) => {
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
        getLoginHistory: function (page: number, callback: any) {
            AccountService.LoginHistory.getLoginHistory({
                email: instance.MyInfo.getUserInfo().email,
                page: page,
                size: 10
            }, (result) => {
                let _loginHistory = new LoginHistory(result);
                callback(_loginHistory);
            })
        },
        getSecuritySettings: function (page: number, callback: any) {
            AccountService.SecuritySettings.getSecuritySettings({
                email: instance.MyInfo.getUserInfo().email,
                page: page,
                size: 10
            }, (result) => {
                let _securitySettings = new SecuritySettings(result);
                callback(_securitySettings);
            })
        },
        changeTradePassword: function (data: string, callback: any, failure: any) {
            AccountService.Account.changeTradePassword(data
                , (result) => {
                    callback(result);
                }, (code) => {
                    failure();
                });
        },
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
        // 인증 여부 체크
        checkValidity(needGo): boolean {
            // NickName 설정 여부
            if (this.getUserInfo().nickname === "") {
                if (needGo) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4006);
                    routerController.goMyPage();
                }
                return false;
            }

            // Payment 등록 여부
            if (!this.controller().checkPaymentMethods()) {
                if (needGo) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4004);
                    routerController.goMyPage();
                }
                return false;
            }

            // Id 인증 여부
            if (!this.controller().getUserInfo().isIdVerified) {
                if (needGo) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4007);
                    routerController.goMyPage();
                }
                return false;
            }

            return true;
        },
        loadMyInfo(callback: any) {
            AccountService.Account.checkLogin(
                // 로그인 유저 -> 유저 정보 Set
                function (data) {
                    accountController.setUserInfo(new Account(data));
                    callback();
                },
                // 로그인 하지 않음
                function () {
                }
            );
        },
        loadMyPaymentMethods: function (callback: any) {
            AccountService.PaymentMethod.setPaymentMethod({
                email: this.getUserInfo().email
            }, (result) => {
                let _payments: PaymentMethod[] = [];
                for (let i = 0; i < result.length; i++) {
                    _payments.push(new PaymentMethod(result[i]));
                }
                accountController.setMyPaymentMethods(_payments);
                callback();
            })
        },
        getMyPaymentMethods() {
            return accountController.getMyPaymentMethods();
        },
    },
    Users: {
        //다른 유저 정보 GET
        getOtherUsers(email: string, callback: any) {
            AccountService.Account.getOtherUsersInfo({
                email: email
            }, (result) => {
                let otherUserInfo = new OtherUsers(result);
                callback(otherUserInfo);

            })
        },
        getOtherUsersbyMemberNo(memberNo: string, callback: any) {
            AccountService.Account.getOtherUsersInfobyMemberNo({
                memberNo: memberNo
            }, (result) => {
                let otherUserInfo = new OtherUsers(result);
                callback(otherUserInfo);
            })
        },
        isUserActive(data: any, callback: any) {
            AccountService.Account.isUserActive(data, (result) => {
                callback(result);
            })
        },
        ///UserPage에서 user의 과거 이력data GET
        getUserPageHistoryInfo(data: number, callback: any) {
            AdService.getUserPageHistoryInfo(data, (result) => {
                callback(result);
            })
        },
        getUserPageAdsList(data: number, callback: any) {
            AdService.getUserPageAdsList(data, (result) => {

                let BuyLists: TradeItem[] = [];
                let SellLists: TradeItem[] = [];
                let tempLists = {};
                for (let key in result) {

                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    if (itemList.tradeType === 'buy') {
                        BuyLists.push(itemList);
                    } else if (itemList.tradeType === 'sell') {
                        SellLists.push(itemList);
                    }
                }
                tempLists = {BuyLists, SellLists};
                callback(tempLists);
            })
        },
        postBlockThisUser(data: any, callback: any) {
            AccountService.BlockList.postBlockUser(data, (result) => {
                callback(result);
            })
        },
        deleteBlockThisUser(data: any, callback: any) {
            AccountService.BlockList.deleteBlockUser(data, (result) => {
                callback(result);
            })
        },
        isDuplicated(email: string, callback: any) {
            AccountService.Account.isDuplicated(email, (result) => {
                callback(result);
            })
        },
        resetPassword(data: any, callback: any) {
            AccountService.Account.resetPassword(data, (result) => {
                callback(result);
            })
        }

    },
    // SignUp: {},
    Service: {
        Account() {
            return AccountService;
        },
        Trade() {
            return TradeService;
        },
        Common() {
            return CommonService;
        }
    },

    TradeView: {
        controller(): TradeListController {
            return tradelistController
        },
        initData() {
            //filter 초기화
            tradelistController.updateTradeFilter({
                type: 'general',
                status: 'enable',
                cryptocurrencyType: (customTokenController.getCustomTokenNo() ===-1) ? 'general' : 'custom',
                cryptocurrency: 'bitcoin',
                tradeType: 'Buy',
                nationality: 'ALL',
                currency: 'CNY',
                amount: -1,
                paymentMethods: '',
                page: 1,
                size: 10,
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
                type: isBlock ? 'block' : 'general',
                status: 'enable',
                cryptocurrencyType: (customTokenController.getCustomTokenNo() ===-1) ? 'general' : 'custom',
                cryptocurrency: 'bitcoin',
                tradeType: 'sell',
                nationality: 'ALL',
                currency: 'CNY',
                amount: -1,
                paymentMethods: '',
                page: 1,
                size: 10,
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
            this.load(function () {
            });
        },

        load(callback: any) {
            // 변환 로직

            TradeService.tradeView.tradePage({
                type: tradelistController.getTradeFilter().type,
                status: 'enable',
                cryptocurrencyType: (customTokenController.getCustomTokenNo() ===-1) ? 'general' : 'custom',
                cryptocurrency: tradelistController.getTradeFilter().cryptocurrency,
                tradeType: tradelistController.getTradeFilter().tradeType,
                nationality: tradelistController.getTradeFilter().nationality,
                currency: tradelistController.getTradeFilter().currency,
                amount: tradelistController.getTradeFilter().amount,
                paymentMethods: tradelistController.getTradeFilter().paymentMethods,
                page: tradelistController.getTradeFilter().page,
                size: tradelistController.getTradeFilter().size,
            }, function (data) {
                //전체 item 갯수 pagination에 넣어주기.
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);

                //전체 item list model화 시켜 주기
                let result = data.adList
                let tradeList: TradeItem[] = [];
                for (let key in result) {
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
                cryptocurrency: cryptocurrency,
                tradeType: tradeType,
                page: 1,                     //이 1은 TradeFilter에 들어가는 page 정보이므로 여기에 추가해 줘야함.
            };
            //page는 1로 초기화
            instance.Pagination.setPage(1,);
            instance.TradeView.updateSelectPage(LeftFilterArr);      //필터에 맞게 화면 재구성
        },
        setTradeRightFilter(nationality: string, paymentMethod: string, currency: string, amount: string) {
            //amount 에 들어간 값이 없을때
            if (amount == '') {
                amount = '0'
            }
            var RightFilterArr = {
                nationality: instance.SelectBox.controller().getCountry(),
                paymentMethods: instance.SelectBox.controller().getPayment(),
                currency: instance.SelectBox.controller().getCurrency(),
                amount: Number(amount),
                page: 1,
            };
            instance.Pagination.setPage(1,);//page는 1로 초기화
            instance.TradeView.updateSelectPage(RightFilterArr);     //필터에 맞게 화면 재구성
        },

        setchangeDrawer(adNo: number) {
            let tempNo = tradelistController.getDrawerID();
            if (tempNo === adNo) {
                tradelistController.setDrawerID(0)
            }
            else {
                tradelistController.setDrawerID(adNo)
            }
        },
        getDrawer() {
            return tradelistController.getDrawerID();
        },
        createOrder: function (data: any, callback: any) {
            OrderService.addOrder(data, (result) => {
                callback(result);
            })
        },
    //Custom token Trade
        loadCustomTokenList(callback: any){
            AdService.getCustomTokenList((data)=>{
                let result = data
                let customTokenList: CustomToken[] = [];
                for (let key in result) {
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let item: CustomToken = new CustomToken(result[key])
                    customTokenList.push(item);
                }
                customTokenController.setCustomTokenList(customTokenList);
                callback();
            })
        },
        getCustomTokenList(){
            return customTokenController.getCustomTokenList();
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
        setPage(page: number, size: number, type: string) {
            //현재 page set
            paginationController.setPage(page);
            //pagination에서 직접버튼을 눌렀을때만 아래의 case 따라 page update 시켜줌.
            if (type !== '') {
                switch (type) {
                    case 'tradecenter':     //tradecenter page 일때.
                        instance.TradeView.updateSelectPage({page: page});
                        break;

                    case 'MyOrder':
                        instance.MyOrder.updatePage({page: page});
                        break;

                    case 'myAds':
                        instance.MyAds.updatePage({page: page});
                        break;

                    case 'wallet':
                        instance.Wallet.updateHistoryPage({page: page});
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
    MyAds: {
        controller(): MyTradeController {
            return myTradeController;
        },
        initPage() {
            this.setFilter({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: '',
                searchEndTime: '',
                status: '',
                orderNo: '',
                cryptocurrency: '',
                adsType: '',
                tradeType: '',
                currency: '',
                page: '1',
                size: '10'
            })
        },
        initData() {
            myTradeController.setMyAdsFilter({
                searchStartTime: '',
                searchEndTime: '',
                status: '',
                orderNo: '',
                cryptocurrencyType: '',
                cryptocurrency: '',
                adsType: '',
                tradeType: '',
                currency: '',
                page: '1',
                size: '10',
            })
            //pagination 초기화
            paginationController.setPage(1);
            paginationController.setTotalCount(1);
        },
        load(callback: any) {
            AdService.getMyAds({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: myTradeController.getMyAdsFilter().searchStartTime,
                searchEndTime: myTradeController.getMyAdsFilter().searchEndTime,
                status: myTradeController.getMyAdsFilter().status,
                adNo: myTradeController.getMyAdsFilter().adNo,
                cryptocurrencyType: myTradeController.getMyAdsFilter().cryptocurrencyType,
                cryptocurrency: myTradeController.getMyAdsFilter().cryptocurrency,
                type: myTradeController.getMyAdsFilter().adsType,
                tradeType: myTradeController.getMyAdsFilter().tradeType,
                currency: myTradeController.getMyAdsFilter().currency,
                page: myTradeController.getMyAdsFilter().page,
                size: '10',
            }, function (data) {
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);
                //전체 item list model화 시켜 주기
                let result = data.myAdsList
                let myAdsList: TradeItem[] = [];
                for (let key in result) {
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: TradeItem = new TradeItem(result[key])
                    myAdsList.push(itemList);
                }
                myTradeController.setMyAdsItems(myAdsList);
                callback();
            })
        },
        setFilter(data) {
            myTradeController.setMyAdsFilter(
                new MyTradeFilter(data)
            );
        },
        updatePage(data) {
            if (data.page === undefined) {
                myTradeController.updateMyAdsFilter({page: 1});
                instance.Pagination.setPage(1,);
            }
            myTradeController.updateMyAdsFilter(data);
            this.load(() => {
            });
        },
        getPage() {
            return myTradeController.getMyAdsItems();
        },
    },
    MyOrder: {
        controller(): MyTradeController {
            return myTradeController;
        },
        initPage() {
            this.setFilter({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: '',
                searchEndTime: '',
                status: '',
                orderNo: '',
                cryptocurrencyType: '',
                cryptocurrency: '',
                orderType: '',
                tradeType: '',
                currency: '',
                page: '1',
                size: '10',
            })
        },
        loadAlarm() {
            OrderService.getMyOrderAlarm(function (data) {
                let result = data
                let myOrderList: Order[] = [];
                for (let key in result) {
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: Order = new Order(result[key])
                    myOrderList.push(itemList);
                }
                myTradeController.setMyOrderAlarmItems(myOrderList);
            })
        },
        load(callback: any) {
            OrderService.getMyOrder({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: myTradeController.getMyOrderFilter().searchStartTime,
                searchEndTime: myTradeController.getMyOrderFilter().searchEndTime,
                status: myTradeController.getMyOrderFilter().status,
                orderNo: myTradeController.getMyOrderFilter().orderNo,
                cryptocurrencyType: myTradeController.getMyOrderFilter().cryptocurrencyType,
                cryptocurrency: myTradeController.getMyOrderFilter().cryptocurrency,
                orderType: myTradeController.getMyOrderFilter().orderType,
                tradeType: myTradeController.getMyOrderFilter().tradeType,
                currency: myTradeController.getMyOrderFilter().currency,
                page: myTradeController.getMyOrderFilter().page,
                size: '10',
            }, function (data) {
                //전체 item list model화 시켜 주기
                let result = data.ordersList
                let myOrderList: Order[] = [];
                for (let key in result) {
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let itemList: Order = new Order(result[key])
                    myOrderList.push(itemList);
                }
                let totalCount = data.totalCount;
                paginationController.setTotalCount(totalCount);
                myTradeController.setMyOrderItems(myOrderList);
                callback();
            })
        },
        // //다른 유저 정보 GET
        // getOtherUsers(email : string, callback: any) {
        //     AccountService.Account.getOtherUsersInfo({
        //         email: email
        //     }, (result) => {
        //         let otherUserInfo = new OtherUsers(result);
        //         callback(otherUserInfo);
        //
        //     })
        // },
        getMyOrderStat(email: string, callback: any) {
            OrderService.getMyOrderStat({
                email: email
            }, function (data) {
                let _orderStat = new OrderStat(data);
                callback(_orderStat);
            })
        },
        getMyOrderDownload() {
            OrderService.getMyOrderDownload({
                email: instance.MyInfo.getUserInfo().email,
                searchStartTime: myTradeController.getMyOrderFilter().searchStartTime,
                searchEndTime: myTradeController.getMyOrderFilter().searchEndTime,
                status: myTradeController.getMyOrderFilter().status,
                orderNo: myTradeController.getMyOrderFilter().orderNo,
                cryptocurrencyType: myTradeController.getMyOrderFilter().cryptocurrencyType,
                cryptocurrency: myTradeController.getMyOrderFilter().cryptocurrency,
                orderType: myTradeController.getMyOrderFilter().orderType,
                tradeType: myTradeController.getMyOrderFilter().tradeType,
                currency: myTradeController.getMyOrderFilter().currency
            })
        },
        initData() {
            this.setFilter({
                searchStartTime: '',
                searchEndTime: '',
                status: '',
                orderNo: '',
                cryptocurrencyType: '',
                cryptocurrency: '',
                orderType: '',
                tradeType: '',
                currency: '',
                page: '1',
                size: '10',
            })
            //pagination 초기화
            paginationController.setPage(1);
            paginationController.setTotalCount(1);
        },
        setFilter(data) {
            myTradeController.setMyOrderFilter(
                new MyTradeFilter(data)
            )
        },
        updatePage(data) {
            //pagination이 아닌 filter의 값 변경시
            if (data.page === undefined) {
                myTradeController.updateMyOrderFilter({page: 1});
                instance.Pagination.setPage(1,);
            }
            myTradeController.updateMyOrderFilter(data);


            this.load(() => {
            });
        },
        getPage() {
            return myTradeController.getMyOrderItems();
        },
    },
    AD: {
        postAD: function (data: any, callback: any, failure: any) {
            AdService.postAD(data, (result) => {
                    callback(result);
                },
                function (code: any) {
                    failure(code)
                })
        },
        editAD: function (data: any, callback: any, failure: any) {
            AdService.editAD(data, (result) => {
                    callback(result);
                },
                function (code: any) {
                    failure(code)
                })
        },
        checkMine: function (data: string, callback: any) {
            AdService.getAd(data
                , (result) => {
                    let data = new MyAd(result);
                    callback(data);
                })
        }
    },
    TradeProcess: {
        controller() {
            return tradeController;
        },

        createOrder: function (data: any, callback: any) {
            OrderService.addOrder(data, (orderNo) => {
                callback(orderNo);
            })
        },
        getCurrentOrder: function () {
            return tradeController.getCurrentOrder();
        },


        setCurrentOrder: function (data: any, success: any, fail: any) {
            OrderService.getOrder(data, (result) => {
                let tradeProcess = new Order(result);
                tradeController.setCurrentOrder(tradeProcess);
                success();
            }, function () {
                fail();
            })
        },
        onPaid: function (data: any, callback: any, failure: any) {
            OrderService.onPaid(data, (result) => {
                callback(result);
            }, () => {
                failure();
            })
        },
        onCancel: function (data: any, callback: any, failure: any) {
            OrderService.onCancel(data, (result) => {
                callback(result);
            }, () => {
                failure();
            })
        },
        onAppeal: function (data: any, callback: any, failure: any) {
            OrderService.onAppeal(data, (result) => {
                callback(result);
            }, () => {
                failure();
            })
        },
        onAppealCancel: function (data: any, callback: any, failure: any) {
            OrderService.onAppealCancel(data, (result) => {
                callback(result);
            }, () => {
                failure();
            })
        },
        onConfirm: function (data: any, callback: any, failure: any) {
            OrderService.onConfirm(data, (result) => {
                callback(result);
            }, () => {
                failure();
            })
        },
        getOrderStatus: function (data: any, callback: any) {
            OrderService.getOrderStatus(data, (result) => {
                let data = {status : result}
                tradeController.updateOrder(data);
                callback(result);
            })
        },
        getAppeal: function (data: any, callback: any) {
            AppealService.getAppeal(data, (result) => {
                let _result = {
                    appealList : result
                };
                tradeController.updateOrder(_result);
                callback(_result);
            })
        }
    },
    //buy/sell 채팅
    Message: {
        controller(): MessageController {
            return messageController;
        },
        msgAvatar(): MsgAvatarController {
            return msgAvatarController;
        },

        createRoom(callback: any) {
            let _dateTime = instance.TradeProcess.getCurrentOrder().registerDatetime - 3000;
            MessageService.message.getMessage({
                    email: instance.MyInfo.getUserInfo().email,
                    dateTime: _dateTime,
                    orderNo: instance.TradeProcess.getCurrentOrder().orderNo,
                }, (data) => {
                    this.controller().setMsgList(data);
                    callback();
                }
            )
        },

        updateMsg(callback: any) {
            MessageService.message.getMessage({
                    email: instance.MyInfo.getUserInfo().email,  //VUEX userInfo.nickName
                    dateTime: this.controller().getLatestMsgTime(),
                    orderNo: instance.TradeProcess.getCurrentOrder().orderNo,
                }, (data) => {
                    for (let key in data) {
                        this.controller().addMsg(data[key]);
                    }
                    callback();
                }
            )
        },

        postMsg(msg: string, callback: any) {
            MessageService.message.postMessage({
                attachedImgUrl: "",
                message: msg,
                orderNo: instance.TradeProcess.getCurrentOrder().orderNo,
                mine: true,
                registerMemberNo: instance.MyInfo.getUserInfo().memberNo
            }, function () {
                callback();
            });
        },

        postImg(data: any, callback: any) {
            MessageService.message.postImg(data, function () {
                callback();
            })
        }
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
    Chat: {
        controller: function () {
            return chatController;
        },
        isOpened: function () {
            return chatController.setChatOpen(true);
        },
        isClosed: function () {
            return chatController.setChatOpen(false);
        },
        setMessage: function (data : any, callback: any) {
            ChatService.getMessage('',(result)=> {
                let _result = result.data.result;
                let _chatMessage: Chat[] = [];

                for (let key in _result) {
                    _chatMessage.push(new Chat(_result[key]));
                }

                this.controller().setMessage(_chatMessage);
                callback();
            })
        },
        setChatSubscribe: function (data : any, callback: any) {
            let _data = new ChatSubscribe(data);
            this.controller().setChatSubscribe(_data);

            callback();
        },
        setChatMembers: function (callback: any) {
            let members : ChatMembers[] = [];

            ChatService.getMembers('', (result)=> {
                for (let key in result) {
                    members.push(new ChatMembers(result[key]));
                }
                this.controller().setChatMembers(members);
                callback();
            });
        },
        addChatMessage: function (data : string) {
            let _message = this.controller().getMessage();
            _message.push(new Chat(data));
            let _chatMessage = {msg : _message};

            this.controller().setMessage(_chatMessage.msg);
        }
    },
    MyToken: {
        controller: function () {
            return customTokenController;
        },
        generateToken: function (data: any, callback: any, failure: any) {
            customTokenService.generateToken(data, result => {
                callback();
            }, err => {
                failure(err);
            })
        },
        getMytoken: function (callback: any) {
            customTokenService.getMyToken(result => {
                customTokenController.setMyToken(new CustomToken(result));
                callback(result);
            })
        },
        setCustomTokenList(callback: any){
            AdService.getCustomTokenList((data)=>{
                let result = data;
                let customTokenList: CustomToken[] = [];
                for (let key in result) {
                    //한 itemlist를 model화 시켜 다시 list에 넣어줌
                    let item: CustomToken = new CustomToken(result[key]);
                    customTokenList.push(item);
                }
                customTokenController.setCustomTokenList(customTokenList);
                callback();
            })
        },
        setCustomTokenNo(tokenNo){
            customTokenController.setCustomTokenNo(tokenNo);
        },
        getCustomTokenNo(){
            return customTokenController.getCustomTokenNo();
        },
    },

    router() {
        return routerController;
    },
    initRouterController(router: any) {
        routerController = new RouterController(router);
    }
}