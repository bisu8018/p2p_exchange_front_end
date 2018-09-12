
// getter, 액션, 변이의 이름을 상수로 정의하고
// 모듈 이름 접두어를 붙입니다

// Home
export enum VuexTypes {
    // Login

    // SignIn
    //======================================
    //              Home
    // =====================================
    INIT_COMPLETED = 'state/INIT_COMPLETED',    // 초기화 완료 체크
    SET_CHECK_OS = 'state/SET_CHECK_OS',        // OS 체크
    SET_IS_MOBILE = 'state/SET_IS_MOBILE',      // 모바일 인지 체크
    SET_DOMAIN = 'state/SET_DOMAIN',      // 현재 도메인 체크


    //======================================
    //              SelectBox
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
    //myAds
    SET_MYADSLIST_DATA = 'myads/SET_MYADSLIST_DATA',
    SET_MYADSFILTER_DATA = 'myads/SET_MYADSFILTER_DATA',
    UPDATE_MYADSFILTER_DATA = 'myads/UPDATE_MYADSFILTER_DATA',
    //myOrder
    SET_MYORDERSLIST_DATA = 'myorder/SET_MYORDERSLIST_DATA',
    SET_MYORDERFILTER_DATA = 'myorder/SET_MYORDERFILTER_DATA',
    UPDATE_MYORDERFILTER_DATA = 'myorder/UPDATE_MYORDERFILTER_DATA',
    SET_MY_ORDER_AlARM_LIST = 'myorder/SET_MY_ORDER_AlARM_LIST',
    SET_MY_ORDER_MODAL_FIXED = 'myorder/SET_MY_ORDER_MODAL_FIXED',



    //======================================
    //              Merchant
    // =====================================
    SET_MERCHANT_DATA = 'trade/SET_LIMITMIN_DATA',


    //======================================
    //              Account
    // =====================================
    SET_USER_INFO = 'account/SET_USER_INFO',
    SET_MY_PAYMENT_METHOD = 'common/SET_MY_PAYMENT_METHOD',


    //======================================
    //              Market Price
    // =====================================
    SET_MARKET_PRICE = 'market/SET_MARKET_PRICE',

    //======================================
    //               Wallet (구 Balance)
    // =====================================
    SET_WALLET_DATA = 'wallet/SET_WALLET_DATA',
    SET_WALLET_CURRENCY = 'wallet/SET_WALLET_CURRENCY',
    UPDATE_WALLET_TRANSFER = 'wallet/UPDATE_WALLET_TRANSFER',

    SET_WITHDRAW_DATA = 'wallet/SET_WITHDRAW_DATA',
    //WalletHistory
    SET_WALLETHISTORYFILTER_DATA = 'wallet/SET_WALLETHISTORYFILTER_DATA',
    UPDATE_WALLETHISTORYFILTER_DATA = 'wallet/UPDATE_WALLETHISTORYFILTER_DATA',
    SET_WALLETHISTORYLIST_DATA = 'wallet/SET_WALLETHISTORYLIST_DATA',

    //======================================
    //              Trade Process
    // =====================================
    SET_CURRENT_ORDER = 'tradeProcess/SET_CURRENT_ORDER',
    UPDATE_CURRENT_ORDER = 'tradeProcess/UPDATE_CURRENT_ORDER',


    //======================================
    //              Msg Avatar
    // =====================================
    SET_TRADE_MSG_AVATAR = 'chatAvatar/SET_TRADE_MSG_AVATAR',
    UPDATE_TRADE_MSG_AVATAR = 'chatAvatar/UPDATE_TRADE_MSG_AVATAR',

    //======================================
    //              Message
    // =====================================
    SET_MSG_LIST = 'message/SET_MSG_LIST',
    ADD_MSG = 'message/ADD_MSG',


    //======================================
    //              Chat
    // =====================================
    SET_CHAT_OPEN = 'chat/SET_CHAT_OPEN',
    SET_CHAT_MESSAGE = 'chat/SET_CHAT_MESSAGE',
    SET_CHAT_SUBSCRIBE = 'chat/SET_CHAT_SUBSCRIBE',
    SET_CHAT_MEMBERS = 'chat/SET_CHAT_MEMBERS',


    //======================================
    //              Custom Token
    // =====================================
    SET_MY_TOKEN = 'customToken/SET_MY_TOKEN',
}
