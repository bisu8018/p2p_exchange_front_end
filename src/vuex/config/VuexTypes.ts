
// getter, 액션, 변이의 이름을 상수로 정의하고
// 모듈 이름 접두어를 붙입니다

// Home
export enum VuexTypes {
    // Login

    // SignIn
    //======================================
    //              Home
    // =====================================
    // 초기화 완료
    INIT_COMPLETED = 'state/INIT_COMPLETED',
    //OS 체크
    SET_CHECK_OS = 'state/SET_CHECK_OS',
    // 모바일 인지 체크
    SET_IS_MOBILE = 'state/SET_IS_MOBILE',


    //======================================
    //              SELECTBOX
    // =====================================
    SET_COUNTRY_DATA = 'selectbox/SET_COUNTRY_DATA',
    SET_CURRENCY_DATA = 'selectbox/SET_CURRENCY_DATA',
    SET_PAYMENET_DATA = 'selectbox/SET_PAYMENET_DATA',


    //======================================
    //              TradeView
    // =====================================
    SET_SELECTTRADEFILTER_DATA = 'trade/SET_SELECTTRADEVIEW_DATA',
    UPDATE_SELECTTRADEVIEW_DATA = 'trade/UPDATE_SELECTTRADEVIEW_DATA',
    SET_TRADEITEMS_DATA = 'trade/SET_TRADEITEMS_DATA',
    SET_DRAWER_DATA = 'trade/SET_DRAWER_DATA',


    SET_PAGE_DATA = 'trade/SET_PAGE_DATA',
    SET_TOTALCOUNT_DATA = 'trade/SET_TOTALCOUNT_DATA',
    //======================================
    //              MyTrade(My Ads & My Orders)
    // =====================================
    SET_MYADSLIST_DATA = 'myads/SET_MYADSLIST_DATA',
    SET_MYADSFILTER_DATA = 'myads/SET_MYADSFILTER_DATA',


    //======================================
    //              Merchant
    // =====================================
    SET_MERCHANT_DATA = 'trade/SET_LIMITMIN_DATA',


    //======================================
    //              Account
    // =====================================
    SET_USER_INFO = 'account/SET_USER_INFO',




}
