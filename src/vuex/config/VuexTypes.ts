
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
    SET_TRADEVIEW_DATA = 'trade/SET_TRADEVIEW_DATA',
    SET_SELECTTRADEVIEW_DATA = 'trade/SET_SELECTTRADEVIEW_DATA',
    SET_CRYPTOCURRENCY_DATA = 'trade/SET_CRYPTOCURRENCY_DATA',
    SET_TRADETYPE_DATA = 'trade/SET_TRADETYPE_DATA',

    SET_PAGE_DATA = 'trade/SET_PAGE_DATA',
    SET_TOTALCOUNT_DATA = 'trade/SET_TOTALCOUNT_DATA',
    //======================================
    //              TradeFilter
    // =====================================
    // amount == limitMin
    SET_LIMITMIN_DATA = 'trade/SET_LIMITMIN_DATA',

    //======================================
    //              Merchant
    // =====================================
    SET_MERCHANT_DATA = 'trade/SET_LIMITMIN_DATA',




}
