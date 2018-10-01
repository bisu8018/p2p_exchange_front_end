import Vue from "vue";
import MainRepository from "@/vuex/MainRepository";
import CustomToken from "@/vuex/model/CustomToken";

export default class RouterController {
    router: any;

    constructor(router: any) {
        this.router = router;
    }

    goBack() {
        this.router.go(-1);
    }

    go(n: number) {
        this.router.go(n);
    }

    goMain() {
        MainRepository.State.setDomain('OTC')
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/');
        });
    }

    goLogin() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/login');
        });
    }

    goMyPage() {
        MainRepository.MyInfo.loadMyInfo(()=>{});

        let r = this.router;
        Vue.nextTick(function () {
            r.push('/myPage');
        });
    }

    goPostAd(isBlock) {
        let currentURL = window.location.href;
        let params = currentURL.split('?');
        let r = this.router;
        let url = isBlock ? '/blockAd' : '/generalAd';
        if (!MainRepository.MyInfo.checkValidity(true)) {
            return;
        }

        // 권한이 없을 경우 -> 서버에서 다시 한번 확인 -> Merchant
        if (!MainRepository.Merchant.getMyInfo().isVerified()) {
            MainRepository.Merchant.loadMyMerchantInfo(() => {
                if (!MainRepository.Merchant.getMyInfo().isVerified()) {
                    Vue.prototype.$eventBus.$emit('showAlert', 4010);
                    this.goMerchant();
                } else {
                    Vue.nextTick(function () {
                        // edit에서 post ad 이동 시 뷰 새로고침
                        if(params.length >1){
                            location.href = url;
                        }else{
                            r.push(url);
                        }
                    });
                }
            });
        } else {
            Vue.nextTick(function () {
                // edit에서 post ad 이동 시 뷰 새로고침
                if(params.length >1){
                    location.href = url;
                }else{
                    r.push(url);
                }
            });
        }
    }

    editPostAd(isBlock, number) {
        let r = this.router;
        let url = isBlock ? '/blockAd' : '/generalAd';
        Vue.nextTick(function () {
            r.push({ path : url, query: {no: number}});
        });
    }

    goGeneralTrade() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/generalTrade');
        });
    }

    goBlockTrade() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/blockTrade');
        });
    }

    goCustomTokenSelect(){
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/customTokenSelect');
        });
    }

    goCustomTokenTrade(tokenNo){
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/customTokenTrade?'+tokenNo);
        });
    }

    goMerchant() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/merchant');
        });
    }

    goSignup() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/signup');
        });
    }

    goBuyOrSell(isBuy: boolean, orderNo: number) {
        let url = (isBuy ? '/buy?' : '/sell?') + orderNo;
        let r = this.router;

        Vue.nextTick(function () {
            r.push(url);
            isBuy ? Vue.prototype.$eventBus.$emit('refreshBuy') : Vue.prototype.$eventBus.$emit('refreshSell');
        });
    }

    goUserPage(memberNo) {
        if(MainRepository.MyInfo.isLogin() && MainRepository.MyInfo.getUserInfo().memberNo === memberNo){
            this.goMyPage();
            return false;
        }
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/userpage?" + memberNo);
            Vue.prototype.$eventBus.$emit('refreshUserPage');
        });
    }

    goChangePassword() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/changePassword");
        });
    }

    goChangePhone() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/changePhone");
        });
    }

    goResetTradePassword() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/resetTradePassword");
        });
    }

    goTurnOff(type: string) {
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/turnOff?" + type);
        });
    }

    goMyAd(){
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/myAds");
        });
    }


    goWallet(){
        MainRepository.State.setDomain('Wallet');
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/wallet");
        });
    }

    goWalletDetail(cryptoCurrency,cryptocurrencyType){
        let code = '';
        let type = cryptocurrencyType ? "?" + cryptocurrencyType : '';
        switch (cryptoCurrency) {
            case 'bitcoin':
                code = 'BTC';
                break;

            case 'ethereum':
                code = 'ETH';
                break;
            default:
                code = cryptoCurrency;
        }
        let r = this.router;
        Vue.nextTick(function () {
            r.push("/wallet/details?"+code + type);
        });
    }

    goMyToken() {
        MainRepository.State.setDomain('Service');
        let tokenInfo = MainRepository.MyToken.controller().getMyToken();
        let r = this.router;
        let url;
        if (tokenInfo.isNull()) {
            url = "/myToken"
        } else {
            url = "/myTokenComplete"
        }
        Vue.nextTick(function () {
            r.push(url);
        });
    }
    goChat() {
        let nickName = MainRepository.MyInfo.getUserInfo().nickname;

        if (MainRepository.MyInfo.isLogin()) {
            if(nickName === '' || !nickName){
                this.goMyPage();
                Vue.prototype.$eventBus.$emit('showAlert', 4006);
                return false;
            }
        }
        if (MainRepository.Chat.controller().getChatStatus()) {
            MainRepository.Chat.isClosed();
        } else {
            MainRepository.Chat.isOpened();
            MainRepository.MyOrder.controller().setMyOrderModalFixed(false);        //my order modal fix 종료 후 채팅 open
        }
    }
}
