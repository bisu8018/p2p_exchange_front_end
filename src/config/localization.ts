import {getCookie, setCookie, deleteCookie} from "@/common/common";

const strings = new Map([

    // signup
    ['emailValue', {
        KOR: '이메일을 입력해 주십시오.',
        ENG: 'Pleaes enter email value.',
        CN: '请输入您的电子邮件',
        JP: ''
    }],
    ['emailForm', {
        KOR: '이메일 양식에 맞지 않습니다.',
        ENG: 'Does not fit email format.',
        CN: '不合适与电子邮件形式',
        JP: ''
    }],
    ['verificationCode', {
        KOR: '인증코드를 입력해 주십시오.',
        ENG: 'Pleaes enter verification code.',
        CN: '请输入认证号码',
        JP: ''
    }],
    ['verification', {
        KOR: '인증코드',
        ENG: 'Verification',
        CN: '验证号码',
        JP: ''
    }],
    ['slideVerifyText', {
        KOR: '슬라이드 인증',
        ENG: 'Slide verify',
        CN: '滑动验证',
        JP: ''
    }],
    ['passwordValue', {
        KOR: '비밀번호를 입력해 주십시오.',
        ENG: 'Pleaes enter password value.',
        CN: '请输入密码',
        JP: ''
    }],
    ['passwordDigit', {
        KOR: '최소 8자를 입력해 주세요.',
        ENG: 'Please enter at least eight digits.',
        CN: '密码为8个字以上',
        JP: ''
    }],
    ['passwordForm', {
        KOR: '비밀번호 양식에 맞지 않습니다.',
        ENG: 'Does not fit password format.',
        CN: '不合适与密码形式',
        JP: ''
    }],
    ['passwordMatch', {
        KOR: '패스워드가 일치하지 않습니다.',
        ENG: 'Password is not matching.',
        CN: '密码错误',
        JP: ''
    }],
    ['acceptConditions', {
        KOR: '이용약관에 동의해 주십시오.',
        ENG: 'Please accept the terms and conditions.',
        CN: '请同意使用条款',
        JP: ''
    }],
    ['signupSubject', {
        KOR: '회원가입',
        ENG: 'Sign up to AllB OTC',
        CN: '注册火币',
        JP: ''
    }],
    ['email', {
        KOR: '이메일',
        ENG: 'Email',
        CN: '账户名',
        JP: ''
    }],
    ['emailVerificationCdoe', {
        KOR: '이메일 인증 코드',
        ENG: 'Email Verification Cdoe',
        CN: '手机验证码',
        JP: ''
    }],
    ['clickToSend', {
        KOR: '클릭하여 전송',
        ENG: 'Click to send',
        CN: '发送验证码',
        JP: ''
    }],
    ['password', {
        KOR: '비밀번호',
        ENG: 'Password',
        CN: '密码',
        JP: ''
    }],
    ['passwordPlaceholder', {
        KOR: '8~20자 숫자/영문/특수문자 포함',
        ENG: 'Enter 8 to 20 characters with a mix of letters and numbers',
        CN: '8-20位数字和字母组合',
        JP: ''
    }],
    ['passwordConfirm', {
        KOR: '비밀번호 확인',
        ENG: 'Confirm Password',
        CN: '确认密码',
        JP: ''
    }],
    ['termsLabel', {
        KOR: '이용약관에 동의합니다.',
        ENG: 'I agree to the ',
        CN: '我已阅读并同意',
        JP: ''
    }],
    ['termsBtn', {
        KOR: '이용약관',
        ENG: 'Terms of Service',
        CN: '用户协议',
        JP: ''
    }],
    ['signupText', {
        KOR: '가입',
        ENG: 'Signup',
        CN: '注册',
        JP: ''
    }],
    ['haveAccount', {
        KOR: '이미 계정이 있으십니까 ?',
        ENG: 'Already have an account',
        CN: '已有账号?',
        JP: ''
    }],
    ['loginText', {
        KOR: '로그인',
        ENG: 'Login',
        CN: '立即登录',
        JP: ''
    }],

    //login
    ['welcome', {
        KOR: '환영합니다',
        ENG: 'Welcome',
        CN: '欢迎登录',
        JP: ''
    }],
    ['forgetPassword', {
        KOR: '비밀번호를 잊어버리셨습니까?',
        ENG: 'Forget Password?',
        CN: '忘记密码？',
        JP: ''
    }],
    ['accountYet', {
        KOR: '아직 계정이 없으십니까?',
        ENG: "Don't have an account?",
        CN: '还没有账号？',
        JP: ''
    }],
    ['verify', {
        KOR: '인증',
        ENG: 'Verify',
        CN: '滑动验证',
        JP: ''
    }],
    ['verifySlider', {
        KOR: '슬라이드 바 인증을 부탁드립니다.',
        ENG: 'Please certify slide bar',
        CN: '请滑动验证',
        JP: ''
    }],
    ['country', {
        KOR: '국가',
        ENG: 'Nationality',
        CN: '国家',
        JP: ''
    }],
    ['loginEmailPlaceholder', {
        KOR: '이메일을 입력해주세요',
        ENG: 'Please enter your email address',
        CN: '账号为邮箱',
        JP: ''
    }],
    ['loginPasswordPlaceholder', {
        KOR: '비밀번호를 입력해주세요',
        ENG: 'Please enter your password',
        CN: '请输入密码',
        JP: ''
    }],
    ['verifySliderPlaceholder', {
        KOR: '인증을 위해 슬라이드해 주십시오',
        ENG: 'Please slide to verify',
        CN: '请按住滑块，拖动到最右边',
        JP: ''
    }],
    ['verifySliderSuccess', {
        KOR: '인증성공',
        ENG: 'Verified',
        CN: '验证成功',
        JP: ''
    }],
    //Trade Center

    ['currency', {
        KOR: '통화',
        ENG: 'Currency',
        CN: '法币币种',
        JP: ''
    }],
    ['payment', {
    KOR: '지불액',
    ENG: 'Payment',
    CN: '付款',
    JP: ''
    }],
  ['paymentMethod', {
      KOR: '결제수단',
      ENG: 'Payment Method',
      CN: '支付方式',
      JP: ''
  }],
  ['amount', {
      KOR: '액수',
      ENG: 'Amount',
      CN: '金额',
      JP: ''
  }],
  ['How_much_you_want_to_trade?', {
      KOR: '희망하시는 거래량을 입력해주세요',
      ENG: 'How much you want to trade?',
      CN: '请输入交易金额',
      JP: ''
  }],
  ['search', {
      KOR: '검색',
      ENG: 'Search',
      CN: '搜索',
      JP: ''
  }],
    ['confirm', {
        KOR: '확인',
        ENG: 'Confirm',
        CN: '下单',
        JP: ''
    }],
  ['cancel', {
      KOR: '취소',
      ENG: 'Cancel',
      CN: '取消',
      JP: ''
  }],
  ['Merchant(Volume | Trade rate)', {
      KOR: '판매자(규모 | 거래율)',
      ENG: 'Merchant(Volume | Trade rate)',
      CN: '商家(30天成单 | 完成率)',
      JP: ''
  }],
    ['Available', {
        KOR: '가능규모',
        ENG: 'Available',
        CN: '可用尺寸',
        JP: ''
    }],
  ['volume', {
      KOR: '거래수량',
      ENG: 'Volume',
      CN: '数量',
      JP: ''
  }],
  ['limits', {
      KOR: '제한',
      ENG: 'Limits',
      CN: '限额',
      JP: ''
  }],
  ['price', {
      KOR: '가격',
      ENG: 'Price',
      CN: '单价',
      JP: ''
  }],
  ['control', {
      KOR: '거래결제',
      ENG: 'Control',
      CN: '操作',
      JP: ''
  }],
  ['buy', {
      KOR: '구매',
      ENG: 'Buy',
      CN: '购买',
      JP: ''
  }],
  ['sell', {
      KOR: '판매',
      ENG: 'Sell',
      CN: '出售',
      JP: ''
  }],
    ['userMemo', {
        KOR: '판매자 메모',
        ENG: 'User Memo',
        CN: '商家备注',
        JP: ''
    }],
    ['Payment_window_is_15minutes', {
        KOR: '15분후 거래화면이 닫힙니다.',
        ENG: 'Payment window is 15minutes',
        CN: '买方付款时限为15分钟',
        JP: ''
    }],
    ['Please_enter_a_vaild_number', {
        KOR: '올바른 숫자를 입력하십시오.',
        ENG: 'Please enter a vaild number',
        CN: '请输入有效的号码',
        JP: ''
    }],

  //  header
  ['exchange', {
      KOR: '거래',
      ENG: 'Exchange',
      CN: '币币交易',
      JP: ''
  }],
    ['TradeCenter', {
        KOR: '거래소',
        ENG: 'Trade Center',
        CN: '普通交易',
        JP: ''
    }],

    ['BlockTrade', {
        KOR: '대량거래',
        ENG: 'Block Trade',
        CN: '大宗交易',
        JP: ''
    }],
  ['postAd', {
      KOR: '광고게시',
      ENG: 'Post AD',
      CN: '发布广告',
      JP: ''
  }],
    ['Post_General_AD', {
        KOR: '일반광고게시',
        ENG: 'Post General Ad',
        CN: '发布广告',
        JP: ''
    }],
    ['Post_Block_AD', {
        KOR: '블록광고게시',
        ENG: 'Post Block Ad',
        CN: '发布广告',
        JP: ''
    }],
    ['MyPage', {
        KOR: '마이페이지',
        ENG: 'My Page',
        CN: '我的页面',
        JP: ''
    }],
    ['MyOrder', {
        KOR: '내 주문내역',
        ENG: 'My Order',
        CN: '我的订单',
        JP: ''
    }],
    ['MyAds', {
        KOR: '내 광고내역',
        ENG: 'My Ads',
        CN: '我的广告',
        JP: ''
    }],
  ['assets', {
      KOR: '자산',
      ENG: 'Assets',
      CN: '订单',
      JP: ''
  }],
  ['order', {
      KOR: '주문',
      ENG: 'Orders',
      CN: '发布广告',
      JP: ''
  }],
    ['Balances', {
        KOR: '밸런스',
        ENG: 'Balances',
        CN: '余额',
        JP: ''
    }],
    ['From', {
        KOR: '환전전',
        ENG: 'From',
        CN: '从',
        JP: ''
    }],
    ['To', {
        KOR: '환전후',
        ENG: 'To',
        CN: '至',
        JP: ''
    }],
    ['UserCenter', {
        KOR: '유저센터',
        ENG: 'User Center',
        CN: '用户中心',
        JP: ''
    }],
    ['Merchant', {
        KOR: '판매자',
        ENG: 'Merchant',
        CN: '商人',
        JP: ''
    }],
    ['LogOut', {
        KOR: '로그아웃',
        ENG: 'Log Out',
        CN: '登出',
        JP: ''
    }],

    //footer
    ['support', {
        KOR: '지원안내',
        ENG: 'Support',
        CN: '支持',
        JP: ''
    }],
    ['guides', {
        KOR: '이용안내',
        ENG: 'Guides',
        CN: '新手帮助',
        JP: ''
    }],
    ['FAQ', {
        KOR: 'FAQ',
        ENG: 'FAQ',
        CN: '常见问题',
        JP: ''
    }],
    ['announcements', {
        KOR: '공지사항',
        ENG: 'Announcements',
        CN: '公告',
        JP: ''
    }],
    ['terms', {
        KOR: '이용약관',
        ENG: 'Terms',
        CN: '条款',
        JP: ''
    }],
    ['terms_Of_Service', {
        KOR: '서비스 약관',
        ENG: 'Terms of Service',
        CN: '服务协议',
        JP: ''
    }],
    ['transaction_Regulations', {
        KOR: '거래규제',
        ENG: 'Transaction Regulations',
        CN: '交易规则',
        JP: ''
    }],
    ['fees', {
        KOR: '수수료율',
        ENG: 'Fees',
        CN: '费率说明',
        JP: ''
    }],
    ['Terms_Of_Privacy_Policy', {
        KOR: '개인정보 보호 정책약관',
        ENG: 'Terms of Privacy Policy',
        CN: '隐私政策条款',
        JP: ''
    }],
    ['KYC&AML_Policies', {
        KOR: 'KYC&AML 정책',
        ENG: 'KYC&AML Policies',
        CN: 'KYC&AML 政策',
        JP: ''
    }],
    ['contact_Us', {
        KOR: '고객센터',
        ENG: 'Contact Us',
        CN: '客服',
        JP: ''
    }],
    ['language', {
        KOR: '언어',
        ENG: 'Language',
        CN: '客服',
        JP: ''
    }],
    ['nationality', {
        KOR: '국가',
        ENG: 'Nationality',
        CN: '国家',
        JP: ''
    }],


    //post AD
    ['generalAdSubject', {
        KOR: '일반공고',
        ENG: 'Post General AD',
        CN: '发布普通广告',
        JP: ''
    }],
    ['blockAdSubject', {
        KOR: '대량공고',
        ENG: 'Block General AD',
        CN: '发布大宗广告',
        JP: ''
    }],
    ['blockAdSubject', {
        KOR: '대량가격공고',
        ENG: 'Post Block AD',
        CN: '发布大宗广告',
        JP: ''
    }],
    ['priceType', {
        KOR: '가격유형',
        ENG: 'Price Type',
        CN: '定价方式',
        JP: ''
    }],
    ['fixedPrice', {
        KOR: '고정가격',
        ENG: 'Fixed Price',
        CN: '浮动价格',
        JP: ''
    }],
    ['warningFixedPricePlaceholder', {
        KOR: '수를 입력해 주십시오',
        ENG: 'Please enter a number',
        CN: '',
        JP: ''
    }],
    ['warningVolume', {
        KOR: '거래수량을 입력해 주십시오',
        ENG: 'Please enter volume',
        CN: '',
        JP: ''
    }],
    ['warningMinLimit', {
        KOR: '최소액을 입력해 주십시오',
        ENG: 'Please enter Min.limit',
        CN: '',
        JP: ''
    }],
    ['warningMaxLimit', {
        KOR: '최대액을 입력해 주십시오',
        ENG: 'Please enter Max.limit',
        CN: '',
        JP: ''
    }],
    ['warningPaymentWindow', {
        KOR: '지불기간을 입력해 주십시오',
        ENG: 'Please enter the payment window',
        CN: '',
        JP: ''
    }],
    ['floatPrice', {
        KOR: '변동가격',
        ENG: 'Float Price',
        CN: '固定价格',
        JP: ''
    }],
    ['priceText', {
        KOR: '거래가격',
        ENG: 'Price',
        CN: '交易价格',
        JP: ''
    }],
    ['marektPrice', {
        KOR: '시장가격',
        ENG: 'Market Price',
        CN: '市场参考价',
        JP: ''
    }],
    ['priceExplain', {
        KOR: '고정가격은 시장에 따라 변동되지 않습니다',
        ENG: 'Fixed prices do not fluctuate with the market.',
        CN: '固定价格不会随市场波动',
        JP: ''
    }],
    ['volumeText', {
        KOR: '거래수량',
        ENG: 'Volume',
        CN: '交易数量',
        JP: ''
    }],
    ['minLimit', {
        KOR: '최소 한도',
        ENG: 'Min. Limit',
        CN: '最小单笔限额',
        JP: ''
    }],
    ['maxLimit', {
        KOR: '최대 한도',
        ENG: 'Max. Limit',
        CN: '最大单笔限额',
        JP: ''
    }],
    ['paymentWindow', {
        KOR: '지불 기간',
        ENG: 'Payment Window',
        CN: '付款期限',
        JP: ''
    }],
    ['paymentWindowExplain', {
        KOR: '구매자는 지불 기간 내에 지불금을 이체해야 합니다. 그러지 못할 경우 거래는 자동으로 취소됩니다',
        ENG: 'Buyer should initiate the payment within the payment window. Otherwise the order will be cancelled automatically.',
        CN: '买家需在付款期限内转账并点击确认付款按钮，超过时限该笔交易将自动取消，您可以依据不同交易方式来调整时限',
        JP: ''
    }],
    ['minuteText', {
        KOR: '분',
        ENG: 'Min',
        CN: '分钟',
        JP: ''
    }],
    ['sellText', {
        KOR: '판매',
        ENG: 'Sell',
        CN: '出售',
        JP: ''
    }],
    ['buyText', {
        KOR: '구매',
        ENG: 'Buy',
        CN: '购买',
        JP: ''
    }],
    ['volumePlaceholderWeb', {
        KOR: '거래 금액을 입력하십시오',
        ENG: 'Please enter volume',
        CN: '请输入交易数量',
        JP: ''
    }],
    ['volumePlaceholderMobile', {
        KOR: '사용 가능 : ',
        ENG: 'Available : ',
        CN: '可用：',
        JP: ''
    }],
    ['minLimitPlaceholder', {
        KOR: '최소 100',
        ENG: 'at least 100',
        CN: '最小为100',
        JP: ''
    }],
    ['maxLimitPlaceholder', {
        KOR: '최대 0.00',
        ENG: 'at most 0.00',
        CN: '最大为0.00',
        JP: ''
    }],
    ['paymentWindowPlaceholder', {
        KOR: '10-20분',
        ENG: '10 to 20 Min',
        CN: '10-20分钟',
        JP: ''
    }],
    ['alipayText', {
        KOR: '알리페이',
        ENG: 'Alipay',
        CN: '支付宝',
        JP: ''
    }],
    ['wechatPayText', {
        KOR: '위챗페이',
        ENG: 'Wechat',
        CN: '微信支付',
        JP: ''
    }],
    ['bankAccountText', {
        KOR: '은행 계좌',
        ENG: 'Bank account',
        CN: '银行卡',
        JP: ''
    }],
    ['refreshBtnText', {
        KOR: '새로고침',
        ENG: 'Refresh',
        CN: '点击刷新',
        JP: ''
    }],
    ['paymentExplain', {
        KOR: '위 결제 정보는 구매자에게 표시됩니다. 만약 추가 또는 수정을 원하시면 ',
        ENG: 'The above payment information will be displayed to the buyer.If you want to add or modify please ',
        CN: '以上支付信息将向买家展示。如需添加、修改请 ',
        JP: ''
    }],
    ['clickHereText', {
        KOR: '여기를 클릭해주세요',
        ENG: 'click here',
        CN: '点击这里',
        JP: ''
    }],
    ['autoReplyText', {
        KOR: '자동 댓글',
        ENG: 'Auto-Reply',
        CN: '自动回复',
        JP: ''
    }],
    ['autoReplyPlaceholder', {
        KOR: '자동 답장 하려는 정보를 입력하십시오.',
        ENG: 'After the order is established, this information is automatically sent to the other party.',
        CN: '请输入您希望自动回复给对方的信息',
        JP: ''
    }],
    ['termsTransactionText', {
        KOR: '거래조항',
        ENG: 'Terms of the Transaction',
        CN: '交易条款',
        JP: ''
    }],
    ['termsTransactionPlaceholder', {
        KOR: '주문 시, 거래 조건이 상대방에게 표시됩니다',
        ENG: 'Your trading terms will be displayed to each other when placing an order.',
        CN: '您的交易条款会在下单时，向对方展示',
        JP: ''
    }],
    ['counterpartyFilterText', {
        KOR: '상대 제한',
        ENG: 'Counterparty Filter',
        CN: '对方限制',
        JP: ''
    }],
    ['counterpartyFilterPlaceholder', {
        KOR: '상대방 제한사항',
        ENG: 'The counterparty should complete how many trades',
        CN: '需对方最少完成几笔交易',
        JP: ''
    }],
    ['counterpartyCheckbox1', {
        KOR: '상대방은 고급 인증을 통과해야 합니다',
        ENG: 'The counterparty should pass advanced verification',
        CN: '需对方通过高级认证',
        JP: ''
    }],
    ['counterpartyCheckbox2', {
        KOR: '상대방은 휴대전화 번호를 연동해야 합니다',
        ENG: 'The counterparty should bind mobile number to their account',
        CN: '需对方绑定手机号码',
        JP: ''
    }],
    ['counterpartyCheckbox3', {
        KOR: '다른 사람과 거래하지 말아야 합니다',
        ENG: 'Do not trade with other merchants',
        CN: '不和其他商家交易',
        JP: ''
    }],
    ['counterpartyExplain', {
        KOR: '상대방 제한을 설정하면보다 신뢰할 수있는 거래자를 필터링 할 수 있지만 제한이 너무 많으면 거래 성공 가능성이 낮아집니다.',
        ENG: 'The requirements will allow you to filter traders with more trustworthiness. However, please note that too many filter requirements may decrease trading success rate. ',
        CN: '设置对方限制可以让您筛选出可信度更高的交易对象，但过多的限制将下降您交易成功的机率。',
        JP: ''
    }],
    ['tradePwText', {
        KOR: '거래 비밀번호',
        ENG: 'Trade Password',
        CN: '资金密码',
        JP: ''
    }],
    ['agreeTermsExplain', {
        KOR: '본인은 이를 이해하고 준수할 것에 동의 합니다',
        ENG: 'I have read and agree to the ',
        CN: '我已知晓并同意遵守',
        JP: ''
    }],
    ['termsTrading', {
        KOR: '거래규칙',
        ENG: 'Terms of trading',
        CN: '',
        JP: ''
    }],
    ['postAdBtn', {
        KOR: '일반 AD 등록',
        ENG: 'Post General AD',
        CN: '发布普通广告',
        JP: ''
    }],
    ['postAdIn', {
        KOR: '광고 등록 정보',
        ENG: 'Post AD in',
        CN: '',
        JP: ''
    }],
    ['tradeType', {
        KOR: '거래 종류',
        ENG: 'Trade type',
        CN: '',
        JP: ''
    }],
    ['cryptoCurrency', {
        KOR: '암호화폐',
        ENG: 'Cryptocurrency',
        CN: '',
        JP: ''
    }],
    ['lowBalance', {
        KOR: '보유하고 계신 코인 잔액이 부족합니다',
        ENG: 'You do not have enough coins',
        CN: '保有货币余额不足',
        JP: ''
    }],
    ['atLeast', {
        KOR: '한도금액 이상으로 입력해 주십시오',
        ENG: 'Please enter greater than or equal to limit',
        CN: '请输入限度以上的金额',
        JP: ''
    }],
    ['atMost', {
        KOR: '한도금액 이하로 입력해 주십시오',
        ENG: 'Please enter less than or equal to limit',
        CN: '请输入限度以下的金额',
        JP: ''
    }],
    ['timeRange', {
        KOR: '범위 시간 내로 입력해 주십시오',
        ENG: 'Please enter within the range of time',
        CN: '请输入范围时间内',
        JP: ''
    }],
    ['counterpartyWarning', {
        KOR: '거래 수는 99 까지가 최대입니다',
        ENG: 'Trade number limits can be up to 99',
        CN: '',
        JP: ''
    }],
    ['warning_trade_password', {
        KOR: '거래 비밀번호를 입력해 주십시오',
        ENG: 'Please enter you trade password',
        CN: '',
        JP: ''
    }],

    //Buy
    ['orderText', {
        KOR: '주문번호',
        ENG: 'Order',
        CN: '',
        JP: ''
    }],
    ['paymentExplain1', {
        KOR: '지불 대기 중. 지불이 필요한 금액은',
        ENG: 'Pending Payment. Please complete the payment of ',
        CN: '',
        JP: ''
    }],
    ['paymentExplain2', {
        KOR: ' 이며, ',
        ENG: ' to ',
        CN: '',
        JP: ''
    }],
    ['paymentExplain3', {
        KOR: '에게',
        ENG: 'with',
        CN: '',
        JP: ''
    }],
    ['paymentExplain4', {
        KOR: '까지 지불 부탁 드립니다, ',
        ENG: ', ',
        CN: '',
        JP: ''
    }],
    ['referenceText', {
        KOR: '지불 참조 번호',
        ENG: 'Reference',
        CN: '付款参考号',
        JP: ''
    }],
    ['paidText', {
        KOR: '지불완료',
        ENG: "i've paid",
        CN: '已完成',
        JP: ''
    }],
    ['paymentText', {
        KOR: '지불 완료 후, 이 버튼을 클릭하여 판매자에게 상기시켜 주십시오',
        ENG: 'Please click here to remind seller after you complete the payment',
        CN: '',
        JP: ''
    }],
    ['transferChecklist1', {
        KOR: '1. 귀하의 송금은 판매자의 계좌로 입금됩니다. 거래가 완료되기 전에 판매 자산은 저희 플랫폼에 의해 안전하게 보관됩니다.',
        ENG: '1. Your transfer will be credited to seller’s account. Before the transaction is completed, the assets for sale will be frozen by our platform for safekeeping.',
        CN: '1、您的汇款将直接进入卖方账户，交易过程中卖方出售的数字资产由平台托管保护。',
        JP: ''
    }],
    ['transferChecklist2', {
        KOR: '2. 정해진 시간 내에 결제를 완료하고, 완료되면 \'지불완료\'를 클릭하십시오. 판매자가 자금 수령을 확인하면 자산이 자동 계좌 이체됩니다',
        ENG: '2. Please complete your payment within the stipulated time and proceed to click on ‘I have paid’ when done. After the seller confirms the receipt of funds, the assets will be transferred to your account automatically.',
        CN: '2、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转到您的账户。',
        JP: ''
    }],
    ['transferChecklist3', {
        KOR: '3. 하루에 3건의 거래가 취소되면 당일 거래가 일시 중지됩니다.',
        ENG: '3. Trading will be suspended for the day, should there 3 cancelled transactions in a day.',
        CN: '3、如果买方当日取消订单达3次，将会被限制当日的买入功能。',
        JP: ''
    }],
    ['sellChecklist1', {
        KOR: '1. 판매하는 자산은 이미 고정되어 있습니다. 송금을받은 후 자산을 지불하려면 버튼을 클릭하십시오.',
        ENG: '1. The assets you sell are already frozen. Please click on the button to pay assets after you receive the transfer.',
        CN: '',
        JP: ''
    }],
    ['sellChecklist2', {
        KOR: '2. 만약 구매자가 당신에게 미리 자산을 공개해 달라고 부탁한다면, 그가 이야기하는 어떠한 이유도 믿지 마십시오. 불필요한 손실을 방지하려면 송금을 받은 후 자산을 공개 해야합니다.',
        ENG: '2. Please do not trust any excuses made by the buyer if he wants you to release the assets in advance. To avoid unnecessary loss, please make sure that you release the assets after you receive the transfer.',
        CN: '',
        JP: ''
    }],
    ['sellChecklist3', {
        KOR: '3. 수신 SMS를받은 후 사기성 SMS로 인한 실수로 자산을 공개 할 수 있으므로 온라인 은행이나 모바일 은행에 로그인하여 수신을 확인하십시오.',
        ENG: '3. After you receive the arrival SMS, please log into online bank or mobile bank to check the arrival because fraud SMS can make you release the assets by mistake.',
        CN: '',
        JP: ''
    }],
    ['confirmPayment', {
        KOR: '지불 승인',
        ENG: 'Confirm Payment',
        CN: '',
        JP: ''
    }],
    ['paymentContents1', {
        KOR: '판매자에게 대금을 지불했는지 확인하십시오.',
        ENG: 'Kindly confirm that you have made payment to the seller.',
        CN: '',
        JP: ''
    }],
    ['paymentContents2', {
        KOR: '사기 시도로 인해 계정이 정지 될 수 있습니다.',
        ENG: 'Fraudulent attempts will result in the account being suspended.',
        CN: '',
        JP: ''
    }],
    ['buyingExplain1', {
        KOR: '지불되었습니다. 당신은 ',
        ENG: 'Paid, you will receive ',
        CN: '',
        JP: ''
    }],
    ['buyingExplain2', {
        KOR: ' 에 대하여 ',
        ENG: ' after ',
        CN: '',
        JP: ''
    }],
    ['buyingExplain3', {
        KOR: '가 영수증 발급 확인한 뒤에 전달 받게 될 것입니다.',
        ENG: 'confirm receipt and release, ',
        CN: '',
        JP: ''
    }],
    ['buyingExplain4', {
        KOR: '지불 참조 번호',
        ENG: ' ',
        CN: '',
        JP: ''
    }],
    ['buyingIndicator', {
        KOR: '구매자가 지불중 입니다',
        ENG: 'Buyer is paying',
        CN: '',
        JP: ''
    }],
    ['appeal', {
        KOR: '이의제기',
        ENG: 'Appeal',
        CN: '',
        JP: ''
    }],
    ['complete', {
        KOR: '완료, ',
        ENG: 'Complete',
        CN: '已完成',
        JP: ''
    }],
    ['completedPayment', {
        KOR: '지금 거래소 계좌로 전송하여 거래를 시작하십시오!',
        ENG: 'Now transfer to Exchange Account and start trading! ',
        CN: '',
        JP: ''
    }],
    ['tranferNow', {
        KOR: '지금 전송하기',
        ENG: 'Transfer Now',
        CN: '',
        JP: ''
    }],
    ['cancelExplain', {
        KOR: '주문이 취소되었으며 결제 정보를 볼 수 없습니다',
        ENG: 'Order cancelled, unable to view payment information',
        CN: '订单已取消，无法查看支付信息',
        JP: ''
    }],
    ['cancelModalContent', {
        KOR: '이 거래를 취소 하시겠습니까?',
        ENG: 'Are you sure you want to cancel this applying?',
        CN: '',
        JP: ''
    }],
    ['cancelModalButton', {
        KOR: '이의제기 취소',
        ENG: 'Cancel this Appeal',
        CN: '',
        JP: ''
    }],
    ['appeal', {
        KOR: '이의제기',
        ENG: 'Appeal',
        CN: '',
        JP: ''
    }],
    ['appealModalContent', {
        KOR: '이 이의 제기가 성공적으로 제출 된 후에 자산은 동결되며 고객 서비스는 거래가 끝날 때까지 개입합니다. 악의적인 불만사항은 계정이 동결됩니다.',
        ENG: 'The assets will be frozen after this appeal submit successfully, and the customer service will intervene in the transaction until the end. Malicious complainants will be frozen accounts. ',
        CN: '',
        JP: ''
    }],
    ['cancelModalTrade', {
        KOR: '거래 취소',
        ENG: 'Cancel this Trade',
        CN: '',
        JP: ''
    }],
    ['appealReason', {
        KOR: '이의제기 사유',
        ENG: 'Appeal Reason',
        CN: '',
        JP: ''
    }],
    ['details', {
        KOR: '상세내용',
        ENG: 'Details',
        CN: '',
        JP: ''
    }],
    ['detailsPlaceholder', {
        KOR: '이의제기 사유의 상세내용을 입력해 주십시오',
        ENG: 'Please enter the details of appeal reasons',
        CN: '',
        JP: ''
    }],
    ['appealCodeExplain', {
        KOR: '이의제기 중, 이의제기 코드 : ',
        ENG: 'Appealing,the code of appeal : ',
        CN: '',
        JP: ''
    }],
    ['payingExplain1', {
        KOR: '잠시만 기다려 주십시오, ',
        ENG: 'Wait for payment, ',
        CN: '',
        JP: ''
    }],
    ['payingExplain2', {
        KOR: ' 님께서 당신에게 ',
        ENG: ' will pay you ',
        CN: '',
        JP: ''
    }],
    ['payingExplain3', {
        KOR: '을 지불할 것 입니다. ',
        ENG: ' in ',
        CN: '',
        JP: ''
    }],
    ['payingExplain4', {
        KOR: ' 까지 지불될 예정 입니다. ',
        ENG: ',',
        CN: '',
        JP: ''
    }],
    ['confirmgExplain1', {
        KOR: '지불됨, ',
        ENG: 'Paid, ',
        CN: '',
        JP: ''
    }],
    ['confirmgExplain2', {
        KOR: '이 지불 완료 처리한 금액은 ',
        ENG: ' has marked this order as paid you ',
        CN: '',
        JP: ''
    }],
    ['confirmgExplain3', {
        KOR: '입니다. ',
        ENG: ', ',
        CN: '',
        JP: ''
    }],
    ['confirmRelease', {
        KOR: '확인 및 공개',
        ENG: 'Confirm and release',
        CN: '',
        JP: ''
    }],
    ['confirmContents1', {
        KOR: '영수증을 확인하려면 은행 계좌 또는 기타 전자 지갑에 로그인했는지 확인하십시오.',
        ENG: 'Make sure that you have logged in your bank account or other e-wallet to check the receipt.',
        CN: '',
        JP: ''
    }],
    ['confirmCheckbox', {
        KOR: '나는 이 지불금을 받았음을 확인합니다.',
        ENG: 'I confirm that I\'ve received this payment',
        CN: '',
        JP: ''
    }],
    // My Order
    ['OrderNumber', {
        KOR: '거래 번호',
        ENG: 'Order number',
        CN: '订单号',
        JP: ''
    }],
    ['orderType', {
        KOR: '거래 유형',
        ENG: 'Order type',
        CN: '交易类型',
        JP: ''
    }],
    ['TotalPrice', {
        KOR: '총 가격',
        ENG: 'Total price',
        CN: '总价',
        JP: ''
    }],
    ['status', {
        KOR: '상태',
        ENG: 'Status',
        CN: '状态',
        JP: ''
    }],
    ['counterparty', {
        KOR: '거래자',
        ENG: 'Counterparty',
        CN: '交易对象',
        JP: ''
    }],
    // My Order
    ['MyAds', {
        KOR: '내 광고내역',
        ENG: 'My Ads',
        CN: '我的订单',
        JP: ''
    }],
    ['No', {
        KOR: 'No',
        ENG: 'No',
        CN: '订单号',
        JP: ''
    }],
    ['adsType', {
        KOR: '광고유형',
        ENG: 'Ads Type',
        CN: '交易类型',
        JP: ''
    }],
    ['time', {
        KOR: '시간',
        ENG: 'Time',
        CN: '时间',
        JP: ''
    }],
    ['Export', {
        KOR: '',
        ENG: 'Export',
        CN: '',
        JP: ''
    }],
    ['orderFilterPlaceholder', {
        KOR: '주문 날짜/상태/번호/통화',
        ENG: 'Date/Status/Number/Currency',
        CN: '订单日期/状态/编号/币种',
        JP: ''
    }],
    ['date', {
        KOR: '날짜',
        ENG: 'Date',
        CN: '日期',
        JP: ''
    }],
    ['datePickerPlaceholder', {
        KOR: '날짜를 선택해 주십시오',
        ENG: 'Please select date',
        CN: '',
        JP: ''
    }],
    ['orderStatus', {
        KOR: '주문 상태',
        ENG: 'Order Status',
        CN: '',
        JP: ''
    }],
    ['unpaid', {
        KOR: '미지불',
        ENG: 'Unpaid',
        CN: '',
        JP: ''
    }],
    ['paid', {
        KOR: '지불',
        ENG: 'Paid',
        CN: '',
        JP: ''
    }],
    ['cancelled', {
        KOR: '취소',
        ENG: 'Cancelled',
        CN: '',
        JP: ''
    }],
    ['complaining', {
        KOR: '이의제기',
        ENG: 'Complaining',
        CN: '',
        JP: ''
    }],
    ['orderNo', {
        KOR: '주문 번호',
        ENG: 'No.',
        CN: '',
        JP: ''
    }],
    ['orderNoPlaceholder', {
        KOR: '주문 번호를 입력해 주십시오',
        ENG: 'Please enter Order number',
        CN: '',
        JP: ''
    }],
    ['orderType', {
        KOR: '주문 종류',
        ENG: 'Order type',
        CN: '',
        JP: ''
    }],
    ['general', {
        KOR: '일반',
        ENG: 'General',
        CN: '',
        JP: ''
    }],
    ['block', {
        KOR: '대량',
        ENG: 'Block',
        CN: '',
        JP: ''
    }],
    ['clear', {
        KOR: '초기화',
        ENG: 'Clear',
        CN: '',
        JP: ''
    }],
    ['noOrders', {
        KOR: '주문 기록이 없습니다',
        ENG: 'No more orders',
        CN: '',
        JP: ''
    }],
    ['chatPlaceholder', {
        KOR: '글 입력 후 엔터키를 눌러주십시오',
        ENG: 'Type in and press enter',
        CN: '',
        JP: ''
    }],

    //My Ads

    ['adsFilterPlaceholder', {
        KOR: '생성날짜/통화/거래종류/광고번호',
        ENG: 'Date / Currency / Type / Number',
        CN: '创建时间/币种/交易类型/广告编号',
        JP: ''
    }],
    ['buySell', {
        KOR: '구입/판매',
        ENG: 'Buy/Sell',
        CN: '购买/出售',
        JP: ''
    }],
    ['adsNo', {
        KOR: '광고 번호',
        ENG: 'No.',
        CN: '',
        JP: ''
    }],
    ['adsNoPlaceholder', {
        KOR: '광고 번호를 입력해 주십시오',
        ENG: 'Please enter Ads number',
        CN: '',
        JP: ''
    }],
    ['edit', {
        KOR: '수정',
        ENG: 'Edit',
        CN: '',
        JP: ''
    }],
    ['enable', {
        KOR: '허용',
        ENG: 'Enable',
        CN: '',
        JP: ''
    }],
    ['delete', {
        KOR: '삭제',
        ENG: 'Delete',
        CN: '',
        JP: ''
    }],
    ['share', {
        KOR: '공유',
        ENG: 'Share',
        CN: '',
        JP: ''
    }],

    //Balance
    ['Details', {
        KOR: '세부사항',
        ENG: 'Details',
        CN: '细节',
        JP: ''
    }],
    ['Transfer', {
        KOR: '이체',
        ENG: 'Transfer',
        CN: '转让',
        JP: ''
    }],
    ['Deposit', {
        KOR: '예금',
        ENG: 'Deposit',
        CN: '存款',
        JP: ''
    }],
    ['Type', {
        KOR: '종류',
        ENG: 'Type',
        CN: '类型',
        JP: ''
    }],
    ['Coin', {
        KOR: '코인',
        ENG: 'Coin',
        CN: '硬币',
        JP: ''
    }],
    ['OTC_Account', {
        KOR: 'OTC 계좌',
        ENG: 'OTC Account',
        CN: 'OTC 帐户',
        JP: ''
    }],
    ['Frozen', {
        KOR: '동결 계좌',
        ENG: 'Frozen',
        CN: '冻结账户',
        JP: ''
    }],
    ['Transfer_to_Exchange_account_to_withdraw', {
        KOR: '인출을 위해 교환 계정으로 전송',
        ENG: 'Transfer to Exchange account to withdraw',
        CN: '转账到兑换账户退出',
        JP: ''
    }],
    ['All', {
        KOR: '전액',
        ENG: 'All',
        CN: '所有',
        JP: ''
    }],
    ['TransferNow', {
        KOR: '전환하기',
        ENG: 'Transfer Now',
        CN: '现在转移',
        JP: ''
    }],
    ['Deposit_Address', {
        KOR: '예금 주소',
        ENG: 'Deposit Address',
        CN: '存款地址',
        JP: ''
    }],
    ['Or_scan_this_QR_code', {
        KOR: '또는 위의 QR 코드를 스캔하세요',
        ENG: 'Or scan this QR code',
        CN: '或者扫描这个二维码',
        JP: ''
    }],
    ['BalanceDepositExplain1-1', {
        KOR: '위 주소에',
        ENG: 'Please don\'t deposit any other digital assets except',
        CN: '请不要存入任何其他数字资产，除非',
        JP: ''
    }],
    ['BalanceDepositExplain1-2', {
        KOR: '를 제외한 다른 디지털 자산을 예치하지 마십시오.',
        ENG: 'to the above address.',
        CN: '到上述地址',
        JP: ''
    }],
    ['BalanceDepositExplain2', {
        KOR: '위 주소로 입금하려면 전체 네트워크를 확인해야합니다. ' +
        '6 번의 확인 후에 도착할 것입니다. 일반적으로 약 10 ~ 60 분이 소요됩니다.',
        ENG: 'Depositing to the above address requires confirmations of the entire network. It will arrive ' +
        'after 6 confirmations. It will take about 10 to 60 mins usually.',
        CN: '或者扫描这个二维码',
        JP: ''
    }],
    ['BalanceDepositExplain3-1', {
        KOR: '최소 입금액 :',
        ENG: 'Minimum deposit amount:',
        CN: '最低存款金额:',
        JP: ''
    }],
    ['BalanceDepositExplain3-2', {
        KOR: '다음의 값보다 적게 적립되지 않습니다',
        ENG: 'It won\'t be credited less than',
        CN: '它不会低于',
        JP: ''
    }],
    ['BalanceDepositExplain4', {
        KOR: '귀하의 입금 주소는 자주 변경되지 않습니다. ' +
        '모든 변경사항을, 당신의 공지 또는 이메일로 알려드립니다.',
        ENG: 'Your deposit address won\'t be changed frequently.' +
        'Any changes, we will inform you by announcement or email.',
        CN: '您的存款地址不会经常更改。 如有任何更改，我们将通过公告或电子邮件通知您。',
        JP: ''
    }],
    ['BalanceDepositExplain5', {
        KOR: '컴퓨터와 브라우저의 보안을 유지하시고, 귀하의 정보가 변조되거나 유출되지 않도록하십시오.',
        ENG: 'Please make sure that your computer and browser are secure ' +
        'and your information is protected from being tampered or leaked.',
        CN: '请确保您的计算机和浏览器安全，并保护您的信息不被篡改或泄露。',
        JP: ''
    }],
    ['Exchange_Account', {
        KOR: '교환 계좌',
        ENG: 'Exchange Account',
        CN: '交换账户',
        JP: ''
    }],
    ['Please_select_date', {
        KOR: '날짜를 선택하세요',
        ENG: 'Please select date',
        CN: '请选择日期',
        JP: ''
    }],
    ['clear', {
        KOR: '초기화',
        ENG: 'Clear',
        CN: '删除所有',
        JP: ''
    }],
    ['Date', {
        KOR: '날짜',
        ENG: 'Date',
        CN: '日期',
        JP: ''
    }],
    ['Estimated_Value', {
        KOR: '예상 금액',
        ENG: 'Estimated Value',
        CN: '估计的价值',
        JP: ''
    }],
    ['Security_Deposit', {
        KOR: '보증금',
        ENG: 'Security Deposit',
        CN: '保证金',
        JP: ''
    }],

    //UserPage
    ['Phone', {
        KOR: '보증금',
        ENG: 'Phone',
        CN: '保证金',
        JP: ''
    }],
    ['ID_Verification', {
        KOR: 'ID 인증',
        ENG: 'ID Verification',
        CN: '身份验证',
        JP: ''
    }],
    ['Advanced_Verification', {
        KOR: '상위 인증',
        ENG: 'Advanced Verification',
        CN: '高级验证',
        JP: ''
    }],
    ['Online_Sell', {
        KOR: '온라인 판매',
        ENG: 'Online Sell',
        CN: '在线销售',
        JP: ''
    }],
    ['Online_Buy', {
        KOR: '온라인 구매',
        ENG: 'Online Buy',
        CN: '在线购买',
        JP: ''
    }],
    ['Do_not_want_to_trade_with_this_user?', {
        KOR: '이 사용자와 거래를 막으시겠습니까?',
        ENG: 'Do not want to trade with this user?',
        CN: '不想与这个用户交易',
        JP: ''
    }],
    ['Block_this_user', {
        KOR: '사용자 차단',
        ENG: 'Block this user',
        CN: '阻止此用户',
        JP: ''
    }],
    ['Block_user_explain', {
        KOR: '이 사용자는 차단 한 후에 귀하의 광고에 액세스하거나 거래 할 수 없습니다. 진행하시겠습니까?',
        ENG: 'This user cannot access your ads or trade with you\n' +
        ' once you have blocked him or her. Are your sure?',
        CN: '一旦您阻止他或她，该用户将无法访问您的广告或与您进行交易。 你确定吗？',
        JP: ''
    }],
    ['Notice', {
        KOR: '주의사항',
        ENG: 'Notice',
        CN: '注意',
        JP: ''
    }],
    ['Completion_rate', {
        KOR: '거래성공률',
        ENG: 'Completion rate',
        CN: '完成率',
        JP: ''
    }],
    ['Times', {
        KOR: '번',
        ENG: 'Times',
        CN: '次',
        JP: ''
    }],
    ['Trades', {
        KOR: '총 거래횟수',
        ENG: 'Trades',
        CN: '总交易量',
        JP: ''
    }],
    ['Trades_in_30_days', {
        KOR: '30일간 거래횟수',
        ENG: 'Trades in 30 days',
        CN: '在30天内交易',
        JP: ''
    }],
    ['Avg_release', {
        KOR: '평균 릴리즈',
        ENG: 'Avg release',
        CN: '平均释放',
        JP: ''
    }],
    ['Trades', {
        KOR: '총 거래횟수',
        ENG: 'Trades',
        CN: '总交易量',
        JP: ''
    }],
    ['Min', {
        KOR: '분',
        ENG: 'Min',
        CN: '分钟',
        JP: ''
    }],

    //My page
    ['trades', {
        KOR: '거래 수',
        ENG: 'Trades',
        CN: '总成单',
        JP: ''
    }],
    ['times', {
        KOR: '번',
        ENG: 'Times',
        CN: '次',
        JP: ''
    }],
    ['avgRelease', {
        KOR: '평균 릴리즈',
        ENG: 'Avg Release',
        CN: '平均放行',
        JP: ''
    }],
    ['accountCreatedTime', {
        KOR: '계정생성시간',
        ENG: 'Account created at',
        CN: '平均放行',
        JP: ''
    }],
    ['noRecord', {
        KOR: '거래 내역 없음',
        ENG: 'No record of transactions',
        CN: ' 尚未交易',
        JP: ''
    }],
    ['accountSecurity', {
        KOR: '계정 및 보안',
        ENG: 'Account & Security',
        CN: '账户与安全',
        JP: ''
    }],
    ['securityLevel', {
        KOR: '보안 등급',
        ENG: 'Security Level',
        CN: '安全等',
        JP: ''
    }],
    ['securityExplain', {
        KOR: '두가지 이상 인증 받는 것을 강력히 추천 드립니다.',
        ENG: 'Using two-factor authentication is highly recommended.',
        CN: '',
        JP: ''
    }],
    ['emailSecurityExplain', {
        KOR: 'API를 관리하는 동안 인출, 암호검색, 보안 설정 변경 그리고 인증에 사용 됩니다.',
        ENG: 'Used to withdraw, retrieve password, change security settings and verify while managing API.',
        CN: '',
        JP: ''
    }],
    ['phone', {
        KOR: '전화',
        ENG: 'Phone',
        CN: '手机',
        JP: ''
    }],
    ['account', {
        KOR: '계정',
        ENG: 'Account',
        CN: '帐户',
        JP: ''
    }],
    ['idVerification', {
        KOR: '신분증 인증',
        ENG: 'ID Verification',
        CN: '身份认证',
        JP: ''
    }],
    ['idVerificationExplain', {
        KOR: '최초 신분증 인증 후, 바꿀 수 없습니다.',
        ENG: 'Once ID verification is completed, no changes may be made.',
        CN: '',
        JP: ''
    }],
    ['advancedVerification', {
        KOR: '고급 인증',
        ENG: 'Advanced Verification',
        CN: '高级认证',
        JP: ''
    }],
    ['paymentMethodExplain', {
        KOR: '개인 보안상의 이유로 자신의 계정 만을 사용해야 합니다. 사용 가능한 결제 방법은 구매자에게 최대 3 개까지 표시됩니다.',
        ENG: 'For personal security reasons, please only use your own account.Enabled payment instructions will be showen to the buyer,3 at most',
        CN: '',
        JP: ''
    }],
    ['modify', {
        KOR: '수정',
        ENG: 'Modify',
        CN: '修改',
        JP: ''
    }],
    ['addPayment', {
        KOR: '새로운 결제수단 추가',
        ENG: 'Add a new payment method',
        CN: '点击添加支付方式',
        JP: ''
    }],
    ['blockList', {
        KOR: '차단 리스트',
        ENG: 'Block List',
        CN: '屏蔽名单',
        JP: ''
    }],
    ['blockListExplain', {
        KOR: '차단된 이용자는 당신과 거래할 수 없습니다.',
        ENG: 'Users that you blocked will not be able to trade with you',
        CN: '被屏蔽的用户将无法与您进行交易',
        JP: ''
    }],
    ['history', {
        KOR: '기록',
        ENG: 'History',
        CN: '',
        JP: ''
    }],
    ['securitySettings', {
        KOR: '보안 설정',
        ENG: 'Security Settings',
        CN: '',
        JP: ''
    }],
    ['low', {
        KOR: '저',
        ENG: 'Low',
        CN: '低',
        JP: ''
    }],
    ['medium', {
        KOR: '중',
        ENG: 'Medium',
        CN: '中',
        JP: ''
    }],
    ['high', {
        KOR: '고',
        ENG: 'High',
        CN: '高',
        JP: ''
    }],
    ['bound', {
        KOR: '연동',
        ENG: 'Bound',
        CN: '绑定',
        JP: ''
    }],
    ['unbound', {
        KOR: '미연동',
        ENG: 'Unbound',
        CN: '',
        JP: ''
    }],
    ['turnOff', {
        KOR: '해제',
        ENG: 'Turn off',
        CN: '',
        JP: ''
    }],
    ['unverified', {
        KOR: '미인증',
        ENG: 'Unverified',
        CN: '未认证',
        JP: ''
    }],
    ['reset', {
        KOR: '설정',
        ENG: 'Reset',
        CN: '设置',
        JP: ''
    }],
    ['unblock', {
        KOR: '차단해제',
        ENG: 'Unblock',
        CN: '',
        JP: ''
    }],
    ['successful', {
        KOR: '성공',
        ENG: 'Successful',
        CN: '成功',
        JP: ''
    }],
    ['failed', {
        KOR: '실패',
        ENG: 'Failed',
        CN: '失败',
        JP: ''
    }],
    ['', {
        KOR: '',
        ENG: '',
        CN: '',
        JP: ''
    }],
    ['', {
        KOR: '',
        ENG: '',
        CN: '',
        JP: ''
    }],


])

export enum Lang {
  EN = 'EN',
  KO = 'KO',
  JP = 'JP',
  ZH = 'ZH',
}


function checkLocale(): Lang {
  let cookieLang = getCookie('language');

  // 쿠키 값이 있을 때
  if (cookieLang !== '') {
    switch (cookieLang) {
      case 'en':
        return Lang.EN;

      case 'zh':
        return Lang.ZH;

      case 'ko':
        return Lang.KO;

      default:
        return Lang.KO;
    }
  }

  // 없을 때
  let userLang = navigator.language;

  switch (userLang.toLowerCase()) {
    case 'ko-kr':
    case 'ko':
      setCookie('language', 'ko', 30);
      return Lang.KO;

    case 'en':
    case 'en-us':
      setCookie('language', 'en', 30);
      return Lang.EN;

    case 'zh':
      setCookie('language', 'zh', 30);
      return Lang.ZH;

    default:
      setCookie('language', 'ko', 30);
      return Lang.KO;
  }
}

//let currentLang: Lang = Lang.EN;
 let currentLang: Lang = checkLocale();


export function abGetLang (): Lang {
    return currentLang
}

export function abSetLang (lang: Lang) {
    currentLang = lang;

    deleteCookie('language');

    switch (lang) {
        case Lang.EN:
            setCookie('language', 'en', 30);
            location.reload();
            break;

        case Lang.ZH:
            setCookie('language', 'zh', 30);
            location.reload();
            break;

        case Lang.JP:
            setCookie('language', 'en', 30);
            location.reload();
            break;

        case Lang.KO:
        default:
            setCookie('language', 'ko', 30);
            location.reload();
            break;
    }
}


export function abString(key: string): string {
  const string = strings.get(key);
  if (string !== undefined && string !== null) {
    switch (currentLang) {
      case Lang.KO:
        return string.KOR;

      case Lang.ZH:
        if (string.CN === '') return string.KOR;
        return string.CN;

      case Lang.JP:
        if (string.JP === '') return string.KOR;
        return string.JP;

      case Lang.EN:
        if (string.ENG === '') return string.KOR;
        return string.ENG;

      default :
        return string.KOR;
    }
  } else {
    return '.' + key
  }
}
