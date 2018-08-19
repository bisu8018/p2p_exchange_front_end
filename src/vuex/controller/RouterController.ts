import Vue from "vue";

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
}
