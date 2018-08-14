import {Store} from "vuex";
import SelectBoxController from "@/vuex/controller/SelectBoxController";
import StateController from "@/vuex/controller/StateController";
import TradeListController from "@/vuex/controller/TradeListController";
import MerchantController from "@/vuex/controller/MerchantController";
import PaginationController from "@/vuex/controller/PaginationController";

import AccountService from "@/service/account/AccountService";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";
import TradeService from "@/service/trade/TradeService";
import AccountController from "@/vuex/controller/AccountController";
import Account from "@/vuex/model/Account";
import EmailVerification from "@/vuex/model/EmailVerification";
import PhoneVerification from "@/vuex/model/PhoneVerification";
import IdVerification from "@/vuex/model/IdVerification";
import PaymentMethod from "@/vuex/model/PaymentMethod";
import OtherUsers from "@/vuex/model/OtherUsers";


let selectBoxController: SelectBoxController;
let tradelistController: TradeListController;
let stateController: StateController;
let merchantController: MerchantController;
let paginationController: PaginationController;
let accountController: AccountController;

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
    MyPage: {
        getMemberVerification: function () {
            AccountService.Verification.memberVerification({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                const memberVerification_arr = new Array();
                for (let i = 0; i < result.length; i++) {
                    const memberVerification_tmp = result[i];
                    if (memberVerification_tmp.type === 'email') {
                        let emailVerification = new EmailVerification(memberVerification_tmp);
                        memberVerification_arr.push(emailVerification);
                    } else {
                        let phoneVerification = new PhoneVerification(memberVerification_tmp);
                        memberVerification_arr.push(phoneVerification);
                    }
                }
                return memberVerification_arr;
            });
        },
        getIdVerification: function () {
            AccountService.Verification.idVerification({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                let idVerification = new IdVerification(result);
                return idVerification;
            })
        },
        getPaymentMethod: function () {
            AccountService.PaymentMethod.getPaymentMethod({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                const paymentMethod_map = new Map();
                for (let i = 0; i < result.length; i++) {
                    const paymentMethod_tmp = result[i];
                    paymentMethod_map.set(paymentMethod_tmp.type, paymentMethod_tmp);
                }
                return paymentMethod_map;
            })
        },
        getBlockList: function () {
            AccountService.BlockList.getBlockList({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                const blockList_arr = new Array();
                for (let i = 0; i < result.length; i++) {
                    const blockList_tmp = result[i];
                    blockList_arr.push(blockList_tmp);
                }
                return blockList_arr;
            })
        },
        getLoginHistory: function () {
            AccountService.LoginHistory.getLoginHistory({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                const loginHistory_arr = new Array();
                for (let i = 0; i < result.length; i++) {
                    const loginHistory_tmp = result[i];
                    loginHistory_arr.push(loginHistory_tmp);
                }
                return loginHistory_arr;
            })
        },
        getSecuritySettings: function () {
            AccountService.LoginHistory.getLoginHistory({
                email: instance.Login.getUserInfo().email
            }, function (result) {
                const loginHistory_arr = new Array();
                for (let i = 0; i < result.length; i++) {
                    const loginHistory_tmp = result[i];
                    loginHistory_arr.push(loginHistory_tmp);
                }
                return loginHistory_arr;
            })
        }
    },
    Login: {
        // 유저 정보 VUEX 저장
        setUserInfo() {
            AccountService.Account.getUserInfo(function (result) {
                let userInfo = new Account(result);
                // var nextArr = JSON.stringify(tradeInfo)
                // console.log(nextArr)
                accountController.setUserInfo(userInfo);
            });
        },
        getUserInfo() {
            return accountController.getUserInfo();
        }
    },
    Users: {
        //다른 유저 정보 GET
        getOtherUsers(email) {
            AccountService.Account.getOtherUsersInfo({
                email: email
            }, function (result) {
                let otherUserInfo = new OtherUsers(result);
                return otherUserInfo;

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
                minLimit :  -1,
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
        initPiecePage(){
            //tradecenter에서 창 열면 type piece로 생성
            instance.TradeView.updateSelectPage({type : 'piece',})
            //page 켜졌을때 default로 생성.
            TradeService.tradeView.tradePage({
                type : 'piece',
                cryptocurrency : 'bitcoin',
                tradeType : 'buy',
                nationality : 'ALL',
                currency :  'CNY',
                minLimit :  -1,
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
            instance.TradeView.updateSelectPage({type : 'block',})
            TradeService.tradeView.tradePage({
                type : 'block',
                cryptocurrency : 'bitcoin',
                tradeType : 'buy',
                nationality : 'ALL',
                currency :  'CNY',
                minLimit :  -1,
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
            //바뀐 data update해주기.
            tradelistController.updateTradeFilter(data);
            TradeService.tradeView.tradePage({
                type : tradelistController.getTradeFilter().type,
                cryptocurrency : tradelistController.getTradeFilter().cryptocurrency,
                tradeType :   tradelistController.getTradeFilter().tradeType,
                nationality : tradelistController.getTradeFilter().nationality,
                currency :  tradelistController.getTradeFilter().currency,
                minLimit :  tradelistController.getTradeFilter().minLimit,
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
                amount = '-1'
            }
            //amount 는 filter에서 minLImit과 같음.
            let minLimit = Number(amount);
            var RightFilterArr = {
                nationality : instance.SelectBox.controller().getCountry(),
                paymentMethods : instance.SelectBox.controller().getPayment(),
                currency : instance.SelectBox.controller().getCurrency(),
                minLimit : minLimit,
                page: 1,
            };
            instance.Pagination.setPage(1,);//page는 1로 초기화
            instance.TradeView.updateSelectPage(RightFilterArr);     //필터에 맞게 화면 재구성
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

}