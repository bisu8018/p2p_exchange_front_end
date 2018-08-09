import {Store} from "vuex";
import SelectBoxController from "@/vuex/controller/SelectBoxController";
import StateController from "@/vuex/controller/StateController";
import TradeListController from "@/vuex/controller/TradeListController";
import MerchantController from "@/vuex/controller/MerchantController";
import PaginationController from "@/vuex/controller/PaginationController";

import {VuexTypes} from "@/vuex/config/VuexTypes";
import AccountService from "@/service/account/AccountService";
import TradeFilter from "@/vuex/model/TradeFilter";
import TradeItem from "@/vuex/model/TradeItem";
import TradeService from "@/service/trade/TradeService";
import {AxiosInstance} from "axios";
import {toASCII} from "punycode";


let selectBoxController: SelectBoxController;
let tradelistController : TradeListController;
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
        tradelistController = new TradeListController(store);
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
        controller(): TradeListController {
            return tradelistController
        },

        initPage(){
            //page 켜졌을때 default로 생성.
            TradeService.tradeView.tradePage({
                cryptocurrency : tradelistController.getTradeFilter().cryptocurrency,
                tradeType :   tradelistController.getTradeFilter().tradeType,
                nationality : tradelistController.getTradeFilter().nationality,
                currency :  tradelistController.getTradeFilter().currency,
                minLimit :  tradelistController.getTradeFilter().minLimit,
                paymentMethod :  tradelistController.getTradeFilter().paymentMethod,
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

        // 리스트 페이지 SET
        updateSelectPage(data) {
            //바뀐 data update해주기.
            tradelistController.updateTradeFilter(data);
            TradeService.tradeView.tradePage({
                cryptocurrency : tradelistController.getTradeFilter().cryptocurrency,
                tradeType :   tradelistController.getTradeFilter().tradeType,
                nationality : tradelistController.getTradeFilter().nationality,
                currency :  tradelistController.getTradeFilter().currency,
                minLimit :  tradelistController.getTradeFilter().minLimit,
                paymentMethod :  tradelistController.getTradeFilter().paymentMethod,
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
            //fullname으로 변환
            switch (cryptocurrency) {
                case 'BTC':
                    cryptocurrency = 'bitcoin'
                    break;

                case 'ETH':
                    cryptocurrency = 'ethereum'
                    break;
            }
            //소문자 변환
            tradeType = tradeType.toLowerCase()

            var LeftFilterArr = {
                cryptocurrency : cryptocurrency,
                tradeType :   tradeType,
                page : 1,                           //이 1은 TradeFilter에 들어가는 page 정보이므로 여기에 추가해 줘야함.
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
                paymentMethod : '{"alipay":"y","wechat":"y","bank":"n"}',
                currency : instance.SelectBox.controller().getCurrency(),
                minLimit : minLimit,
                page: 1,
            };
            console.log(RightFilterArr);
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