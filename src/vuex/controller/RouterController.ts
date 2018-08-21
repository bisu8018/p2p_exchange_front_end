import Vue from "vue";
import MainRepository from "@/vuex/MainRepository";

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
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/abMain');
        });
    }

    goLogin() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/login');
        });
    }

    goPostAd(isBlock) {
        let r = this.router;
        let url = isBlock ? '/blockAd' : '/generalAd';

        // 권한이 없을 경우 -> 서버에서 다시 한번 확인 -> Merchant
        if (!MainRepository.Merchant.getMyInfo().isVerified()) {
            MainRepository.Merchant.loadMyMerchantInfo(() => {
                if (!MainRepository.Merchant.getMyInfo().isVerified()) {
                    this.goMerchant();
                } else {
                    Vue.nextTick(function () {
                        r.push(url);
                    });
                }
            });
        } else {
            Vue.nextTick(function () {
                r.push(url);
            });
        }

    }

    goMerchant() {
        let r = this.router;
        Vue.nextTick(function () {
            r.push('/merchant');
        });
    }
}
