import {getCookie, setCookie, deleteCookie} from "@/common/common";

const strings = new Map([

    // signup
    ['emailValue', {
        KOR: '이메일을 입력해 주십시오.',
        ENG: 'Pleaes enter email value.',
        CN: '请输入您的电子邮件',
        HK: ''
    }],
    ['emailForm', {
        KOR: '이메일 양식에 맞지 않습니다.',
        ENG: 'Does not fit email format.',
        CN: '不合适与电子邮件形式',
        HK: ''
    }],
    ['verificationCode', {
        KOR: '인증코드를 입력해 주십시오.',
        ENG: 'Pleaes enter verification code.',
        CN: '请输入认证号码',
        HK: ''
    }],
    ['verification', {
        KOR: '인증코드',
        ENG: 'Verification',
        CN: '验证号码',
        HK: ''
    }],
    ['slideVerifyText', {
        KOR: '슬라이드 인증',
        ENG: 'Slide verify',
        CN: '滑动验证',
        HK: ''
    }],
    ['passwordValue', {
        KOR: '비밀번호를 입력해 주십시오.',
        ENG: 'Enter password.',
        CN: '请输入密码',
        HK: ''
    }],
    ['passwordDigit', {
        KOR: '최소 8자를 입력해 주세요.',
        ENG: 'Enter at least eight digits.',
        CN: '密码为8个字以上',
        HK: ''
    }],
    ['passwordForm', {
        KOR: '비밀번호 양식에 맞지 않습니다.',
        ENG: 'Does not fit password format.',
        CN: '不合适与密码形式',
        HK: ''
    }],
    ['passwordMatch', {
        KOR: '패스워드가 일치하지 않습니다.',
        ENG: 'Password is not matching.',
        CN: '密码错误',
        HK: ''
    }],
    ['acceptConditions', {
        KOR: '이용약관에 동의해 주십시오.',
        ENG: 'Accept the terms and conditions.',
        CN: '请同意使用条款',
        HK: ''
    }],
    ['signupSubject', {
        KOR: '회원가입',
        ENG: 'Sign up to AllB OTC',
        CN: '注册火币',
        HK: ''
    }],
    ['email', {
        KOR: '이메일',
        ENG: 'Email',
        CN: '账户名',
        HK: ''
    }],
    ['emailVerificationCode', {
        KOR: '이메일 인증 코드',
        ENG: 'Email Verification Code',
        CN: '手机验证码',
        HK: ''
    }],
    ['clickToSend', {
        KOR: '클릭하여 전송',
        ENG: 'Click to send',
        CN: '发送验证码',
        HK: ''
    }],
    ['password', {
        KOR: '비밀번호',
        ENG: 'Password',
        CN: '密码',
        HK: ''
    }],
    ['passwordPlaceholder', {
        KOR: '8~20자 숫자/영문/특수문자 포함',
        ENG: 'Enter 8 to 20 characters with a mix of letters and numbers',
        CN: '8-20位数字和字母组合',
        HK: ''
    }],
    ['passwordConfirm', {
        KOR: '비밀번호 확인',
        ENG: 'Confirm Password',
        CN: '确认密码',
        HK: ''
    }],
    ['termsLabel', {
        KOR: '이용약관에 동의합니다.',
        ENG: 'I agree to the ',
        CN: '我已阅读并同意',
        HK: ''
    }],
    ['termsBtn', {
        KOR: '이용약관',
        ENG: 'Terms of Service',
        CN: '用户协议',
        HK: ''
    }],
    ['signupText', {
        KOR: '가입',
        ENG: 'Signup',
        CN: '注册',
        HK: ''
    }],
    ['haveAccount', {
        KOR: '이미 계정이 있으십니까 ?',
        ENG: 'Already have an account',
        CN: '已有账号?',
        HK: ''
    }],
    ['loginText', {
        KOR: '로그인',
        ENG: 'Login',
        CN: '立即登录',
        HK: ''
    }],

    //login
    ['welcome', {
        KOR: '환영합니다',
        ENG: 'Welcome',
        CN: '欢迎登录',
        HK: ''
    }],
    ['forgetPassword', {
        KOR: '비밀번호를 잊어버리셨습니까?',
        ENG: 'Forget Password?',
        CN: '忘记密码？',
        HK: ''
    }],
    ['accountYet', {
        KOR: '아직 계정이 없으십니까?',
        ENG: "Don't have an account?",
        CN: '还没有账号？',
        HK: ''
    }],
    ['verify', {
        KOR: '인증',
        ENG: 'Verify',
        CN: '滑动验证',
        HK: ''
    }],
    ['verifySlider', {
        KOR: '슬라이드 바 인증을 부탁드립니다.',
        ENG: 'Certify slide bar',
        CN: '请滑动验证',
        HK: ''
    }],
    ['country', {
        KOR: '국가',
        ENG: 'Nationality',
        CN: '国家',
        HK: ''
    }],
    ['loginEmailPlaceholder', {
        KOR: '이메일을 입력해주세요',
        ENG: 'Enter your email address',
        CN: '账号为邮箱',
        HK: ''
    }],
    ['loginPasswordPlaceholder', {
        KOR: '비밀번호를 입력해주세요',
        ENG: 'Enter your password',
        CN: '请输入密码',
        HK: ''
    }],
    ['verifySliderPlaceholder', {
        KOR: '인증을 위해 슬라이드해 주십시오',
        ENG: 'Slide to verify',
        CN: '请按住滑块，拖动到最右边',
        HK: ''
    }],
    ['verifySliderSuccess', {
        KOR: '인증성공',
        ENG: 'Verified',
        CN: '验证成功',
        HK: ''
    }],
    ['resetLoginPassword', {
        KOR: '비밀번호 재설정',
        ENG: 'Reset Login password',
        CN: '',
        HK: ''
    }],
    ['resetPasswordExplain', {
        KOR: '비밀번호 재설정 후, 24시간 동안 입금을 할 수 없습니다.',
        ENG: 'The withdrawal will be disabled in 24 hours once password is reset.',
        CN: '',
        HK: ''
    }],
    ['submit', {
        KOR: '전송',
        ENG: 'Submit',
        CN: '',
        HK: ''
    }],
    ['warningAttachmentFileType', {
        KOR: '이미지 파일로 업로드 해주십시오.',
        ENG: 'Uload only an image file.',
        CN: '',
        HK: ''
    }],
    ['warningAttachmentFileSize', {
        KOR: '5MB 이하 파일로 업로드 해주십시오.',
        ENG: 'Upload less than 5MB.',
        CN: '',
        HK: ''
    }],
    //Trade Center

    ['currency', {
        KOR: '통화',
        ENG: 'Currency',
        CN: '法币币种',
        HK: '貨幣'
    }],
    ['payment', {
    KOR: '지불액',
    ENG: 'Payment',
    CN: '付款',
    HK: '付款'
    }],
  ['paymentMethod', {
      KOR: '결제수단',
      ENG: 'Payment Method',
      CN: '支付方式',
      HK: '付款方法'
  }],
  ['amount', {
      KOR: '액수',
      ENG: 'Amount',
      CN: '金额',
      HK: '量'
  }],
  ['How_much_you_want_to_trade?', {
      KOR: '희망하시는 거래량을 입력해주세요',
      ENG: 'How much you want to trade?',
      CN: '请输入交易金额',
      HK: ''
  }],
  ['search', {
      KOR: '검색',
      ENG: 'Search',
      CN: '搜索',
      HK: '搜索'
  }],
    ['confirm', {
        KOR: '확인',
        ENG: 'Confirm',
        CN: '下单',
        HK: ''
    }],
  ['cancel', {
      KOR: '취소',
      ENG: 'Cancel',
      CN: '取消',
      HK: ''
  }],
  ['Merchant(Volume | Trade rate)', {
      KOR: '판매자(규모 | 거래율)',
      ENG: 'Merchant(Volume | Trade rate)',
      CN: '商家(30天成单 | 完成率)',
      HK: ''
  }],
    ['Available', {
        KOR: '가능규모',
        ENG: 'Available',
        CN: '可用尺寸',
        HK: ''
    }],
  ['volume', {
      KOR: '거래수량',
      ENG: 'Volume',
      CN: '数量',
      HK: ''
  }],
  ['limits', {
      KOR: '제한',
      ENG: 'Limits',
      CN: '限额',
      HK: ''
  }],
  ['price', {
      KOR: '가격',
      ENG: 'Price',
      CN: '单价',
      HK: ''
  }],
  ['control', {
      KOR: '거래결제',
      ENG: 'Control',
      CN: '操作',
      HK: ''
  }],
  ['buy', {
      KOR: '구매',
      ENG: 'Buy',
      CN: '购买',
      HK: ''
  }],
  ['sell', {
      KOR: '판매',
      ENG: 'Sell',
      CN: '出售',
      HK: ''
  }],
    ['userMemo', {
        KOR: '판매자 메모',
        ENG: 'User Memo',
        CN: '商家备注',
        HK: ''
    }],
    ['Payment_window_is_15minutes', {
        KOR: '15분후 거래화면이 닫힙니다.',
        ENG: 'Payment window is 15minutes',
        CN: '买方付款时限为15分钟',
        HK: ''
    }],
    ['Please_enter_a_vaild_number', {
        KOR: '올바른 숫자를 입력하십시오.',
        ENG: 'Enter a vaild number',
        CN: '请输入有效的号码',
        HK: ''
    }],
    ['Before you start trading, you need to complete the necessary transaction information.', {
        KOR: '거래를 시작하기 전에 필요한 거래 정보를 등록해야합니다.',
        ENG: 'Before you start trading, you need to complete the necessary transaction information.',
        CN: '在开始交易之前，您需要完成必要的交易信息',
        HK: ''
    }],
    ['Set up now.', {
        KOR: '지금 설정',
        ENG: 'Set up now.',
        CN: '立即设置。',
        HK: ''
    }],
    ['You need to complete the necessary transaction information.', {
        KOR: '필요한 거래 정보를 등록해야합니다.',
        ENG: 'You need to complete the necessary transaction information.',
        CN: '您需要完成必要的交易信息。',
        HK: ''
    }],

  //  header
  ['exchange', {
      KOR: '거래',
      ENG: 'Exchange',
      CN: '币币交易',
      HK: ''
  }],
    ['TradeCenter', {
        KOR: '거래소',
        ENG: 'Trade Center',
        CN: '普通交易',
        HK: ''
    }],

    ['BlockTrade', {
        KOR: '대량거래',
        ENG: 'Block Trade',
        CN: '大宗交易',
        HK: ''
    }],
  ['postAd', {
      KOR: '광고게시',
      ENG: 'Post AD',
      CN: '发布广告',
      HK: ''
  }],
    ['Post_General_AD', {
        KOR: '일반광고게시',
        ENG: 'Post General Ad',
        CN: '发布广告',
        HK: ''
    }],
    ['Post_Block_AD', {
        KOR: '블록광고게시',
        ENG: 'Post Block Ad',
        CN: '发布广告',
        HK: ''
    }],
    ['MyPage', {
        KOR: '마이페이지',
        ENG: 'My Page',
        CN: '我的页面',
        HK: ''
    }],
    ['MyOrder', {
        KOR: '내 주문내역',
        ENG: 'My Order',
        CN: '我的订单',
        HK: ''
    }],
    ['MyAds', {
        KOR: '내 광고내역',
        ENG: 'My Ads',
        CN: '我的广告',
        HK: ''
    }],
  ['assets', {
      KOR: '자산',
      ENG: 'Assets',
      CN: '订单',
      HK: ''
  }],
  ['order', {
      KOR: '주문',
      ENG: 'Orders',
      CN: '发布广告',
      HK: ''
  }],
    ['Balances', {
        KOR: '밸런스',
        ENG: 'Balances',
        CN: '余额',
        HK: ''
    }],
    ['From', {
        KOR: '환전전',
        ENG: 'From',
        CN: '从',
        HK: ''
    }],
    ['To', {
        KOR: '환전후',
        ENG: 'To',
        CN: '至',
        HK: ''
    }],
    ['UserCenter', {
        KOR: '유저센터',
        ENG: 'User Center',
        CN: '用户中心',
        HK: ''
    }],
    ['Merchant', {
        KOR: '판매자',
        ENG: 'Merchant',
        CN: '商人',
        HK: ''
    }],
    ['LogOut', {
        KOR: '로그아웃',
        ENG: 'Log Out',
        CN: '登出',
        HK: ''
    }],

    //footer
    ['support', {
        KOR: '지원안내',
        ENG: 'Support',
        CN: '支持',
        HK: ''
    }],
    ['guides', {
        KOR: '이용안내',
        ENG: 'Guides',
        CN: '新手帮助',
        HK: ''
    }],
    ['FAQ', {
        KOR: 'FAQ',
        ENG: 'FAQ',
        CN: '常见问题',
        HK: ''
    }],
    ['announcements', {
        KOR: '공지사항',
        ENG: 'Announcements',
        CN: '公告',
        HK: ''
    }],
    ['terms', {
        KOR: '이용약관',
        ENG: 'Terms',
        CN: '条款',
        HK: ''
    }],
    ['terms_Of_Service', {
        KOR: '서비스 약관',
        ENG: 'Terms of Service',
        CN: '服务协议',
        HK: ''
    }],
    ['transaction_Regulations', {
        KOR: '거래규제',
        ENG: 'Transaction Regulations',
        CN: '交易规则',
        HK: ''
    }],
    ['fees', {
        KOR: '수수료율',
        ENG: 'Fees',
        CN: '费率说明',
        HK: ''
    }],
    ['Terms_Of_Privacy_Policy', {
        KOR: '개인정보 보호 정책약관',
        ENG: 'Terms of Privacy Policy',
        CN: '隐私政策条款',
        HK: ''
    }],
    ['KYC&AML_Policies', {
        KOR: 'KYC&AML 정책',
        ENG: 'KYC&AML Policies',
        CN: 'KYC&AML 政策',
        HK: ''
    }],
    ['contact_Us', {
        KOR: '고객센터',
        ENG: 'Contact Us',
        CN: '客服',
        HK: ''
    }],
    ['language', {
        KOR: '언어',
        ENG: 'Language',
        CN: '客服',
        HK: ''
    }],
    ['nationality', {
        KOR: '국가',
        ENG: 'Nationality',
        CN: '国家',
        HK: ''
    }],


    //post AD
    ['generalAdSubject', {
        KOR: '일반공고',
        ENG: 'Post General AD',
        CN: '发布普通广告',
        HK: ''
    }],
    ['blockAdSubject', {
        KOR: '대량공고',
        ENG: 'Block General AD',
        CN: '发布大宗广告',
        HK: ''
    }],
    ['blockAdSubject', {
        KOR: '대량가격공고',
        ENG: 'Post Block AD',
        CN: '发布大宗广告',
        HK: ''
    }],
    ['priceType', {
        KOR: '가격유형',
        ENG: 'Price Type',
        CN: '定价方式',
        HK: ''
    }],
    ['fixedPrice', {
        KOR: '고정가격',
        ENG: 'Fixed Price',
        CN: '浮动价格',
        HK: ''
    }],
    ['warningFixedPricePlaceholder', {
        KOR: '수를 입력해 주십시오',
        ENG: 'Enter a number',
        CN: '',
        HK: ''
    }],
    ['warningVolume', {
        KOR: '거래수량을 입력해 주십시오',
        ENG: 'Enter volume',
        CN: '',
        HK: ''
    }],
    ['warningMinLimit', {
        KOR: '최소액을 입력해 주십시오',
        ENG: 'Enter Min.limit',
        CN: '',
        HK: ''
    }],
    ['warningMaxLimit', {
        KOR: '최대액을 입력해 주십시오',
        ENG: 'Enter Max.limit',
        CN: '',
        HK: ''
    }],
    ['warningPaymentWindow', {
        KOR: '지불기간을 입력해 주십시오',
        ENG: 'Enter the payment window',
        CN: '',
        HK: ''
    }],
    ['floatPrice', {
        KOR: '변동가격',
        ENG: 'Float Price',
        CN: '固定价格',
        HK: ''
    }],
    ['priceText', {
        KOR: '거래가격',
        ENG: 'Price',
        CN: '交易价格',
        HK: ''
    }],
    ['marektPrice', {
        KOR: '시장가격',
        ENG: 'Market Price',
        CN: '市场参考价',
        HK: ''
    }],
    ['priceExplain', {
        KOR: '고정가격은 시장에 따라 변동되지 않습니다',
        ENG: 'Fixed prices do not fluctuate with the market.',
        CN: '固定价格不会随市场波动',
        HK: ''
    }],
    ['volumeText', {
        KOR: '거래수량',
        ENG: 'Volume',
        CN: '交易数量',
        HK: ''
    }],
    ['minLimit', {
        KOR: '최소 한도',
        ENG: 'Min. Limit',
        CN: '最小单笔限额',
        HK: ''
    }],
    ['maxLimit', {
        KOR: '최대 한도',
        ENG: 'Max. Limit',
        CN: '最大单笔限额',
        HK: ''
    }],
    ['paymentWindow', {
        KOR: '지불 기간',
        ENG: 'Payment Window',
        CN: '付款期限',
        HK: ''
    }],
    ['paymentWindowExplain', {
        KOR: '구매자는 지불 기간 내에 지불금을 이체해야 합니다. 그러지 못할 경우 거래는 자동으로 취소됩니다',
        ENG: 'Buyer should initiate the payment within the payment window. Otherwise the order will be cancelled automatically.',
        CN: '买家需在付款期限内转账并点击确认付款按钮，超过时限该笔交易将自动取消，您可以依据不同交易方式来调整时限',
        HK: ''
    }],
    ['minuteText', {
        KOR: '분',
        ENG: 'Min',
        CN: '分钟',
        HK: ''
    }],
    ['sellText', {
        KOR: '판매',
        ENG: 'Sell',
        CN: '出售',
        HK: ''
    }],
    ['buyText', {
        KOR: '구매',
        ENG: 'Buy',
        CN: '购买',
        HK: ''
    }],
    ['volumePlaceholderWeb', {
        KOR: '거래 금액을 입력하십시오',
        ENG: 'Enter volume',
        CN: '请输入交易数量',
        HK: ''
    }],
    ['volumePlaceholderMobile', {
        KOR: '사용 가능 : ',
        ENG: 'Available : ',
        CN: '可用：',
        HK: ''
    }],
    ['minLimitPlaceholder', {
        KOR: '최소 ',
        ENG: 'at least ',
        CN: '最小为 ',
        HK: ''
    }],
    ['maxLimitPlaceholder', {
        KOR: '최대 0.00',
        ENG: 'at most 0.00',
        CN: '最大为0.00',
        HK: ''
    }],
    ['paymentWindowPlaceholder', {
        KOR: '10-20분',
        ENG: '10 to 20 Min',
        CN: '10-20分钟',
        HK: ''
    }],
    ['alipayText', {
        KOR: '알리페이',
        ENG: 'Alipay',
        CN: '支付宝',
        HK: ''
    }],
    ['wechatPayText', {
        KOR: '위챗페이',
        ENG: 'Wechat',
        CN: '微信支付',
        HK: ''
    }],
    ['bankAccountText', {
        KOR: '은행 계좌',
        ENG: 'Bank account',
        CN: '银行卡',
        HK: ''
    }],
    ['refreshBtnText', {
        KOR: '새로고침',
        ENG: 'Refresh',
        CN: '点击刷新',
        HK: ''
    }],
    ['paymentExplain', {
        KOR: '위 결제 정보는 구매자에게 표시됩니다. 만약 추가 또는 수정을 원하시면 ',
        ENG: 'The above payment information will be displayed to the buyer.If you want to add or modify please ',
        CN: '以上支付信息将向买家展示。如需添加、修改请 ',
        HK: ''
    }],
    ['clickHereText', {
        KOR: '여기를 클릭해주세요',
        ENG: 'click here',
        CN: '点击这里',
        HK: ''
    }],
    ['autoReplyText', {
        KOR: '자동 댓글',
        ENG: 'Auto-Reply',
        CN: '自动回复',
        HK: ''
    }],
    ['autoReplyPlaceholder', {
        KOR: '자동 답장 하려는 정보를 입력하십시오.',
        ENG: 'After the order is established, this information is automatically sent to the other party.',
        CN: '请输入您希望自动回复给对方的信息',
        HK: ''
    }],
    ['termsTransactionText', {
        KOR: '거래조항',
        ENG: 'Terms of the Transaction',
        CN: '交易条款',
        HK: ''
    }],
    ['termsTransactionPlaceholder', {
        KOR: '주문 시, 거래 조건이 상대방에게 표시됩니다',
        ENG: 'Your trading terms will be displayed to each other when placing an order.',
        CN: '您的交易条款会在下单时，向对方展示',
        HK: ''
    }],
    ['counterpartyFilterText', {
        KOR: '상대 제한',
        ENG: 'Counterparty Filter',
        CN: '对方限制',
        HK: ''
    }],
    ['counterpartyFilterPlaceholder', {
        KOR: '상대방 제한사항',
        ENG: 'The counterparty should complete how many trades',
        CN: '需对方最少完成几笔交易',
        HK: ''
    }],
    ['counterpartyCheckbox1', {
        KOR: '상대방은 고급 인증을 통과해야 합니다',
        ENG: 'The counterparty should pass advanced verification',
        CN: '需对方通过高级认证',
        HK: ''
    }],
    ['counterpartyCheckbox2', {
        KOR: '상대방은 휴대전화 번호를 연동해야 합니다',
        ENG: 'The counterparty should bind mobile number to their account',
        CN: '需对方绑定手机号码',
        HK: ''
    }],
    ['counterpartyCheckbox3', {
        KOR: '상대방은 다른 사람과 거래하지 말아야 합니다',
        ENG: 'Do not trade with other merchants',
        CN: '不和其他商家交易',
        HK: ''
    }],
    ['counterpartyExplain', {
        KOR: '상대방 제한을 설정하면보다 신뢰할 수있는 거래자를 필터링 할 수 있지만 제한이 너무 많으면 거래 성공 가능성이 낮아집니다.',
        ENG: 'The requirements will allow you to filter traders with more trustworthiness. However, please note that too many filter requirements may decrease trading success rate. ',
        CN: '设置对方限制可以让您筛选出可信度更高的交易对象，但过多的限制将下降您交易成功的机率。',
        HK: ''
    }],
    ['tradePwText', {
        KOR: '거래 비밀번호',
        ENG: 'Trade Password',
        CN: '资金密码',
        HK: ''
    }],
    ['agreeTermsExplain', {
        KOR: '본인은 이를 이해하고 준수할 것에 동의 합니다',
        ENG: 'I have read and agree to the',
        CN: '我已知晓并同意遵守',
        HK: ''
    }],
    ['termsTrading', {
        KOR: '거래규칙',
        ENG: 'Terms of trading',
        CN: '',
        HK: ''
    }],
    ['postAdBtn', {
        KOR: '일반 AD 등록',
        ENG: 'Post General AD',
        CN: '发布普通广告',
        HK: ''
    }],
    ['postAdIn', {
        KOR: '광고 등록 정보',
        ENG: 'Post AD in',
        CN: '',
        HK: ''
    }],
    ['tradeType', {
        KOR: '거래 종류',
        ENG: 'Trade type',
        CN: '',
        HK: ''
    }],
    ['cryptoCurrency', {
        KOR: '암호화폐',
        ENG: 'Cryptocurrency',
        CN: '',
        HK: ''
    }],
    ['lowBalance', {
        KOR: '보유하고 계신 코인 잔액이 부족합니다',
        ENG: 'You do not have enough coins',
        CN: '保有货币余额不足',
        HK: ''
    }],
    ['atLeast', {
        KOR: '한도금액 이상으로 입력해 주십시오',
        ENG: 'Enter greater than or equal to limit',
        CN: '请输入限度以上的金额',
        HK: ''
    }],
    ['atMost', {
        KOR: '한도금액 이하로 입력해 주십시오',
        ENG: 'Enter less than or equal to limit',
        CN: '请输入限度以下的金额',
        HK: ''
    }],
    ['timeRange', {
        KOR: '범위 시간 내로 입력해 주십시오',
        ENG: 'Enter within the range of time',
        CN: '请输入范围时间内',
        HK: ''
    }],
    ['counterpartyWarning', {
        KOR: '거래 수는 99 까지가 최대입니다',
        ENG: 'Trade number limits can be up to 99',
        CN: '',
        HK: ''
    }],
    ['warning_trade_password', {
        KOR: '거래 비밀번호를 입력해 주십시오',
        ENG: 'enter you trade password',
        CN: '',
        HK: ''
    }],
    ['nullPaymentMethod', {
        KOR: '추가된 계정 정보가 없습니다.',
        ENG: 'No account information has been added.',
        CN: '',
        HK: ''
    }],
    ['noMoreRecords', {
        KOR: '기록 없음',
        ENG: 'No more record',
        CN: '',
        HK: ''
    }],

    //Buy
    ['orderText', {
        KOR: '주문번호',
        ENG: 'Order',
        CN: '',
        HK: ''
    }],
    ['paymentExplain1', {
        KOR: '지불 대기 중. 지불이 필요한 금액은',
        ENG: 'Pending Payment. Please complete the payment of ',
        CN: '',
        HK: ''
    }],
    ['paymentExplain2', {
        KOR: ' 이며, ',
        ENG: ' to ',
        CN: '',
        HK: ''
    }],
    ['paymentExplain3', {
        KOR: '에게',
        ENG: 'with',
        CN: '',
        HK: ''
    }],
    ['paymentExplain4', {
        KOR: '까지 지불 부탁 드립니다, ',
        ENG: ', ',
        CN: '',
        HK: ''
    }],
    ['referenceText', {
        KOR: '지불 참조 번호',
        ENG: 'Reference',
        CN: '付款参考号',
        HK: ''
    }],
    ['paidText', {
        KOR: '지불완료',
        ENG: "i've paid",
        CN: '已完成',
        HK: ''
    }],
    ['paymentText', {
        KOR: '지불 완료 후, 이 버튼을 클릭하여 판매자에게 상기시켜 주십시오',
        ENG: 'Please click here to remind seller after you complete the payment',
        CN: '',
        HK: ''
    }],
    ['transferChecklist1', {
        KOR: '1. 귀하의 송금은 판매자의 계좌로 입금됩니다. 거래가 완료되기 전에 판매 자산은 저희 플랫폼에 의해 안전하게 보관됩니다.',
        ENG: '1. Your transfer will be credited to seller’s account. Before the transaction is completed, the assets for sale will be frozen by our platform for safekeeping.',
        CN: '1、您的汇款将直接进入卖方账户，交易过程中卖方出售的数字资产由平台托管保护。',
        HK: ''
    }],
    ['transferChecklist2', {
        KOR: '2. 정해진 시간 내에 결제를 완료하고, 완료되면 \'지불완료\'를 클릭하십시오. 판매자가 자금 수령을 확인하면 자산이 자동 계좌 이체됩니다',
        ENG: '2. Please complete your payment within the stipulated time and proceed to click on ‘I have paid’ when done. After the seller confirms the receipt of funds, the assets will be transferred to your account automatically.',
        CN: '2、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转到您的账户。',
        HK: ''
    }],
    ['transferChecklist3', {
        KOR: '3. 하루에 3건의 거래가 취소되면 당일 거래가 일시 중지됩니다.',
        ENG: '3. Trading will be suspended for the day, should there 3 cancelled transactions in a day.',
        CN: '3、如果买方当日取消订单达3次，将会被限制当日的买入功能。',
        HK: ''
    }],
    ['sellChecklist1', {
        KOR: '1. 판매하는 자산은 이미 고정되어 있습니다. 송금을받은 후 자산을 지불하려면 버튼을 클릭하십시오.',
        ENG: '1. The assets you sell are already frozen. Please click on the button to pay assets after you receive the transfer.',
        CN: '',
        HK: ''
    }],
    ['sellChecklist2', {
        KOR: '2. 만약 구매자가 당신에게 미리 자산을 공개해 달라고 부탁한다면, 그가 이야기하는 어떠한 이유도 믿지 마십시오. 불필요한 손실을 방지하려면 송금을 받은 후 자산을 공개 해야합니다.',
        ENG: '2. Please do not trust any excuses made by the buyer if he wants you to release the assets in advance. To avoid unnecessary loss, please make sure that you release the assets after you receive the transfer.',
        CN: '',
        HK: ''
    }],
    ['sellChecklist3', {
        KOR: '3. 수신 SMS를받은 후 사기성 SMS로 인한 실수로 자산을 공개 할 수 있으므로 온라인 은행이나 모바일 은행에 로그인하여 수신을 확인하십시오.',
        ENG: '3. After you receive the arrival SMS, please log into online bank or mobile bank to check the arrival because fraud SMS can make you release the assets by mistake.',
        CN: '',
        HK: ''
    }],
    ['confirmPayment', {
        KOR: '지불 승인',
        ENG: 'Confirm Payment',
        CN: '',
        HK: ''
    }],
    ['paymentContents1', {
        KOR: '판매자에게 대금을 지불했는지 확인하십시오.',
        ENG: 'Kindly confirm that you have made payment to the seller.',
        CN: '',
        HK: ''
    }],
    ['paymentContents2', {
        KOR: '사기 시도로 인해 계정이 정지 될 수 있습니다.',
        ENG: 'Fraudulent attempts will result in the account being suspended.',
        CN: '',
        HK: ''
    }],
    ['buyingExplain1', {
        KOR: '지불되었습니다. 당신은 ',
        ENG: 'Paid, you will receive ',
        CN: '',
        HK: ''
    }],
    ['buyingExplain2', {
        KOR: ' 에 대하여 ',
        ENG: ' after ',
        CN: '',
        HK: ''
    }],
    ['buyingExplain3', {
        KOR: '가 영수증 발급 확인한 뒤에 전달 받게 될 것입니다.',
        ENG: 'confirm receipt and release, ',
        CN: '',
        HK: ''
    }],
    ['buyingExplain4', {
        KOR: '지불 참조 번호',
        ENG: ' ',
        CN: '',
        HK: ''
    }],
    ['buyingIndicator', {
        KOR: '구매자가 지불중 입니다',
        ENG: 'Buyer is paying',
        CN: '',
        HK: ''
    }],
    ['appeal', {
        KOR: '이의제기',
        ENG: 'Appeal',
        CN: '',
        HK: ''
    }],
    ['complete', {
        KOR: '완료, ',
        ENG: 'Complete',
        CN: '已完成',
        HK: ''
    }],
    ['completedPayment', {
        KOR: '지금 거래소 계좌로 전송하여 거래를 시작하십시오!',
        ENG: 'Now transfer to Exchange Account and start trading! ',
        CN: '',
        HK: ''
    }],
    ['tranferNow', {
        KOR: '지금 전송하기',
        ENG: 'Transfer Now',
        CN: '',
        HK: ''
    }],
    ['cancelExplain', {
        KOR: '주문이 취소되었으며 결제 정보를 볼 수 없습니다',
        ENG: 'Order cancelled, unable to view payment information',
        CN: '订单已取消，无法查看支付信息',
        HK: ''
    }],
    ['cancelModalContent', {
        KOR: '이 거래를 취소 하시겠습니까?',
        ENG: 'Are you sure you want to cancel this applying?',
        CN: '',
        HK: ''
    }],
    ['cancelModalButton', {
        KOR: '이의제기 취소',
        ENG: 'Cancel this Appeal',
        CN: '',
        HK: ''
    }],
    ['appeal', {
        KOR: '이의제기',
        ENG: 'Appeal',
        CN: '',
        HK: ''
    }],
    ['appealModalContent', {
        KOR: '이 이의 제기가 성공적으로 제출 된 후에 자산은 동결되며 고객 서비스는 거래가 끝날 때까지 개입합니다. 악의적인 불만사항은 계정이 동결됩니다.',
        ENG: 'The assets will be frozen after this appeal submit successfully, and the customer service will intervene in the transaction until the end. Malicious complainants will be frozen accounts. ',
        CN: '',
        HK: ''
    }],
    ['cancelModalTrade', {
        KOR: '거래 취소',
        ENG: 'Cancel this Trade',
        CN: '',
        HK: ''
    }],
    ['appealReason', {
        KOR: '이의제기 사유',
        ENG: 'Appeal Reason',
        CN: '',
        HK: ''
    }],
    ['details', {
        KOR: '상세내용',
        ENG: 'Details',
        CN: '',
        HK: ''
    }],
    ['detailsPlaceholder', {
        KOR: '이의제기 사유의 상세내용을 입력해 주십시오',
        ENG: 'Enter the details of appeal reasons',
        CN: '',
        HK: ''
    }],
    ['appealCodeExplain', {
        KOR: '이의제기 중, 이의제기 코드 : ',
        ENG: 'Appealing,the code of appeal : ',
        CN: '',
        HK: ''
    }],
    ['payingExplain1', {
        KOR: '잠시만 기다려 주십시오, ',
        ENG: 'Wait for payment, ',
        CN: '',
        HK: ''
    }],
    ['payingExplain2', {
        KOR: ' 님께서 당신에게 ',
        ENG: ' will pay you ',
        CN: '',
        HK: ''
    }],
    ['payingExplain3', {
        KOR: '을 지불할 것 입니다. ',
        ENG: ' in ',
        CN: '',
        HK: ''
    }],
    ['payingExplain4', {
        KOR: ' 까지 지불될 예정 입니다. ',
        ENG: ',',
        CN: '',
        HK: ''
    }],
    ['confirmgExplain1', {
        KOR: '지불됨, ',
        ENG: 'Paid, ',
        CN: '',
        HK: ''
    }],
    ['confirmgExplain2', {
        KOR: '이 지불 완료 처리한 금액은 ',
        ENG: ' has marked this order as paid you ',
        CN: '',
        HK: ''
    }],
    ['confirmgExplain3', {
        KOR: '입니다. ',
        ENG: ', ',
        CN: '',
        HK: ''
    }],
    ['confirmRelease', {
        KOR: '확인 및 공개',
        ENG: 'Confirm and release',
        CN: '',
        HK: ''
    }],
    ['confirmContents1', {
        KOR: '영수증을 확인하려면 은행 계좌 또는 기타 전자 지갑에 로그인했는지 확인하십시오.',
        ENG: 'Make sure that you have logged in your bank account or other e-wallet to check the receipt.',
        CN: '',
        HK: ''
    }],
    ['confirmCheckbox', {
        KOR: '나는 이 지불금을 받았음을 확인합니다.',
        ENG: 'I confirm that I\'ve received this payment',
        CN: '',
        HK: ''
    }],
    // My Order
    ['OrderNumber', {
        KOR: '거래 번호',
        ENG: 'Order number',
        CN: '订单号',
        HK: ''
    }],
    ['orderType', {
        KOR: '거래 유형',
        ENG: 'Order type',
        CN: '交易类型',
        HK: ''
    }],
    ['TotalPrice', {
        KOR: '총 가격',
        ENG: 'Total price',
        CN: '总价',
        HK: ''
    }],
    ['status', {
        KOR: '상태',
        ENG: 'Status',
        CN: '状态',
        HK: ''
    }],
    ['counterparty', {
        KOR: '거래자',
        ENG: 'Counterparty',
        CN: '交易对象',
        HK: ''
    }],
    // My Order
    ['MyAds', {
        KOR: '내 광고내역',
        ENG: 'My Ads',
        CN: '我的订单',
        HK: ''
    }],
    ['No', {
        KOR: 'No',
        ENG: 'No',
        CN: '订单号',
        HK: ''
    }],
    ['adsType', {
        KOR: '광고유형',
        ENG: 'Ads Type',
        CN: '交易类型',
        HK: ''
    }],
    ['time', {
        KOR: '시간',
        ENG: 'Time',
        CN: '时间',
        HK: ''
    }],
    ['Export', {
        KOR: '',
        ENG: 'Export',
        CN: '',
        HK: ''
    }],
    ['orderFilterPlaceholder', {
        KOR: '주문 날짜 / 상태 / 번호 / 통화',
        ENG: 'Date / Status / Number / Currency',
        CN: '订单日期/状态/编号/币种',
        HK: ''
    }],
    ['date', {
        KOR: '날짜',
        ENG: 'Date',
        CN: '日期',
        HK: ''
    }],
    ['datePickerPlaceholder', {
        KOR: '날짜를 선택해 주십시오',
        ENG: 'Select date',
        CN: '',
        HK: ''
    }],
    ['orderStatus', {
        KOR: '주문 상태',
        ENG: 'Order Status',
        CN: '',
        HK: ''
    }],
    ['unpaid', {
        KOR: '미지불',
        ENG: 'Unpaid',
        CN: '',
        HK: ''
    }],
    ['paid', {
        KOR: '지불',
        ENG: 'Paid',
        CN: '',
        HK: ''
    }],
    ['cancelled', {
        KOR: '취소',
        ENG: 'Cancelled',
        CN: '',
        HK: ''
    }],
    ['complaining', {
        KOR: '이의제기',
        ENG: 'Complaining',
        CN: '',
        HK: ''
    }],
    ['orderNo', {
        KOR: '주문 번호',
        ENG: 'No.',
        CN: '',
        HK: ''
    }],
    ['orderNoPlaceholder', {
        KOR: '주문 번호를 입력해 주십시오',
        ENG: 'Enter Order number',
        CN: '',
        HK: ''
    }],
    ['orderType', {
        KOR: '주문 종류',
        ENG: 'Order type',
        CN: '',
        HK: ''
    }],
    ['general', {
        KOR: '일반',
        ENG: 'General',
        CN: '',
        HK: ''
    }],
    ['block', {
        KOR: '대량',
        ENG: 'Block',
        CN: '',
        HK: ''
    }],
    ['clear', {
        KOR: '초기화',
        ENG: 'Clear',
        CN: '',
        HK: ''
    }],
    ['noOrders', {
        KOR: '주문 기록이 없습니다',
        ENG: 'No more orders',
        CN: '',
        HK: ''
    }],
    ['chatPlaceholder', {
        KOR: '글 입력 후 엔터키를 눌러주십시오',
        ENG: 'Type in and press enter',
        CN: '',
        HK: ''
    }],

    //My Ads

    ['adsFilterPlaceholder', {
        KOR: '생성날짜/통화/거래종류/광고번호',
        ENG: 'Date / Currency / Type / Number',
        CN: '创建时间/币种/交易类型/广告编号',
        HK: ''
    }],
    ['buySell', {
        KOR: '구입/판매',
        ENG: 'Buy/Sell',
        CN: '购买/出售',
        HK: ''
    }],
    ['adsNo', {
        KOR: '광고 번호',
        ENG: 'No.',
        CN: '',
        HK: ''
    }],
    ['adsNoPlaceholder', {
        KOR: '광고 번호를 입력해 주십시오',
        ENG: 'Enter Ads number',
        CN: '',
        HK: ''
    }],
    ['edit', {
        KOR: '수정',
        ENG: 'Edit',
        CN: '',
        HK: ''
    }],
    ['enable', {
        KOR: '허용',
        ENG: 'Enable',
        CN: '',
        HK: ''
    }],
    ['delete', {
        KOR: '삭제',
        ENG: 'Delete',
        CN: '',
        HK: ''
    }],
    ['share', {
        KOR: '공유',
        ENG: 'Share',
        CN: '',
        HK: ''
    }],

    //Balance
    ['Details', {
        KOR: '세부사항',
        ENG: 'Details',
        CN: '细节',
        HK: ''
    }],
    ['Transfer', {
        KOR: '이체',
        ENG: 'Transfer',
        CN: '转让',
        HK: ''
    }],
    ['Deposit', {
        KOR: '예금',
        ENG: 'Deposit',
        CN: '存款',
        HK: ''
    }],
    ['Type', {
        KOR: '종류',
        ENG: 'Type',
        CN: '类型',
        HK: ''
    }],
    ['Coin', {
        KOR: '코인',
        ENG: 'Coin',
        CN: '硬币',
        HK: ''
    }],
    ['OTC_Account', {
        KOR: 'OTC 계좌',
        ENG: 'OTC Account',
        CN: 'OTC 帐户',
        HK: ''
    }],
    ['Frozen', {
        KOR: '동결 계좌',
        ENG: 'Frozen',
        CN: '冻结账户',
        HK: ''
    }],
    ['Transfer_to_Exchange_account_to_withdraw', {
        KOR: '인출을 위해 교환 계정으로 전송',
        ENG: 'Transfer to Exchange account to withdraw',
        CN: '转账到兑换账户退出',
        HK: ''
    }],
    ['All', {
        KOR: '전액',
        ENG: 'All',
        CN: '所有',
        HK: ''
    }],
    ['TransferNow', {
        KOR: '전환하기',
        ENG: 'Transfer Now',
        CN: '现在转移',
        HK: ''
    }],
    ['Deposit_Address', {
        KOR: '예금 주소',
        ENG: 'Deposit Address',
        CN: '存款地址',
        HK: ''
    }],
    ['Or_scan_this_QR_code', {
        KOR: '또는 위의 QR 코드를 스캔하세요',
        ENG: 'Or scan this QR code',
        CN: '或者扫描这个二维码',
        HK: ''
    }],
    ['BalanceDepositExplain1-1', {
        KOR: '위 주소에',
        ENG: 'Please don\'t deposit any other digital assets except',
        CN: '请不要存入任何其他数字资产，除非',
        HK: ''
    }],
    ['BalanceDepositExplain1-2', {
        KOR: '를 제외한 다른 디지털 자산을 예치하지 마십시오.',
        ENG: 'to the above address.',
        CN: '到上述地址',
        HK: ''
    }],
    ['BalanceDepositExplain2', {
        KOR: '위 주소로 입금하려면 전체 네트워크를 확인해야합니다. ' +
        '6 번의 확인 후에 도착할 것입니다. 일반적으로 약 10 ~ 60 분이 소요됩니다.',
        ENG: 'Depositing to the above address requires confirmations of the entire network. It will arrive ' +
        'after 6 confirmations. It will take about 10 to 60 mins usually.',
        CN: '或者扫描这个二维码',
        HK: ''
    }],
    ['BalanceDepositExplain3-1', {
        KOR: '최소 입금액 :',
        ENG: 'Minimum deposit amount:',
        CN: '最低存款金额:',
        HK: ''
    }],
    ['BalanceDepositExplain3-2', {
        KOR: '다음의 값보다 적게 적립되지 않습니다',
        ENG: 'It won\'t be credited less than',
        CN: '它不会低于',
        HK: ''
    }],
    ['BalanceDepositExplain4', {
        KOR: '귀하의 입금 주소는 자주 변경되지 않습니다. ' +
        '모든 변경사항을, 당신의 공지 또는 이메일로 알려드립니다.',
        ENG: 'Your deposit address won\'t be changed frequently.' +
        'Any changes, we will inform you by announcement or email.',
        CN: '您的存款地址不会经常更改。 如有任何更改，我们将通过公告或电子邮件通知您。',
        HK: ''
    }],
    ['BalanceDepositExplain5', {
        KOR: '컴퓨터와 브라우저의 보안을 유지하시고, 귀하의 정보가 변조되거나 유출되지 않도록하십시오.',
        ENG: 'Please make sure that your computer and browser are secure ' +
        'and your information is protected from being tampered or leaked.',
        CN: '请确保您的计算机和浏览器安全，并保护您的信息不被篡改或泄露。',
        HK: ''
    }],
    ['balanceDetailsFilterPlaceholder', {
        KOR: '날짜 / 타입 / 코인',
        ENG: 'Time/Type/Coin',
        CN: '订单日期/状态/编号/币种',
        HK: ''
    }],
    ['Exchange_Account', {
        KOR: '교환 계좌',
        ENG: 'Exchange Account',
        CN: '交换账户',
        HK: ''
    }],
    ['Please_select_date', {
        KOR: '날짜를 선택하세요',
        ENG: 'Select date',
        CN: '请选择日期',
        HK: ''
    }],
    ['clear', {
        KOR: '초기화',
        ENG: 'Clear',
        CN: '删除所有',
        HK: ''
    }],
    ['Date', {
        KOR: '날짜',
        ENG: 'Date',
        CN: '日期',
        HK: ''
    }],
    ['Estimated_Value', {
        KOR: '예상 금액',
        ENG: 'Estimated Value',
        CN: '估计的价值',
        HK: ''
    }],
    ['Security_Deposit', {
        KOR: '보증금',
        ENG: 'Security Deposit',
        CN: '保证金',
        HK: ''
    }],

    //UserPage
    ['Premium merchant', {
        KOR: '프리미엄등급자',
        ENG: 'Premium merchant',
        CN: '额外费用零售商',
        HK: ''
    }],
    ['Certified merchant', {
        KOR: '인증등급자',
        ENG: 'Certified merchant',
        CN: '认证零售商',
        HK: ''
    }],
    ['Phone', {
        KOR: '보증금',
        ENG: 'Phone',
        CN: '保证金',
        HK: ''
    }],
    ['Phone', {
        KOR: '보증금',
        ENG: 'Phone',
        CN: '保证金',
        HK: ''
    }],
    ['ID_Verification', {
        KOR: 'ID 인증',
        ENG: 'ID Verification',
        CN: '身份验证',
        HK: ''
    }],
    ['Advanced_Verification', {
        KOR: '상위 인증',
        ENG: 'Advanced Verification',
        CN: '高级验证',
        HK: ''
    }],
    ['Online_Sell', {
        KOR: '온라인 판매',
        ENG: 'Online Sell',
        CN: '在线销售',
        HK: ''
    }],
    ['Online_Buy', {
        KOR: '온라인 구매',
        ENG: 'Online Buy',
        CN: '在线购买',
        HK: ''
    }],
    ['Do_not_want_to_trade_with_this_user?', {
        KOR: '이 사용자와 거래를 막으시겠습니까?',
        ENG: 'Do not want to trade with this user?',
        CN: '不想与这个用户交易',
        HK: ''
    }],
    ['Block_this_user', {
        KOR: '사용자 차단',
        ENG: 'Block this user',
        CN: '阻止此用户',
        HK: ''
    }],
    ['Block_user_explain', {
        KOR: '이 사용자는 차단 한 후에 귀하의 광고에 액세스하거나 거래 할 수 없습니다. 진행하시겠습니까?',
        ENG: 'This user cannot access your ads or trade with you\n' +
        ' once you have blocked him or her. Are your sure?',
        CN: '一旦您阻止他或她，该用户将无法访问您的广告或与您进行交易。 你确定吗？',
        HK: ''
    }],
    ['Notice', {
        KOR: '주의사항',
        ENG: 'Notice',
        CN: '注意',
        HK: ''
    }],
    ['Completion_rate', {
        KOR: '거래성공률',
        ENG: 'Completion rate',
        CN: '完成率',
        HK: ''
    }],
    ['Times', {
        KOR: '번',
        ENG: 'Times',
        CN: '次',
        HK: ''
    }],
    ['Trades', {
        KOR: '총 거래횟수',
        ENG: 'Trades',
        CN: '总交易量',
        HK: ''
    }],
    ['Trades_in_30_days', {
        KOR: '30일간 거래횟수',
        ENG: 'Trades in 30 days',
        CN: '在30天内交易',
        HK: ''
    }],
    ['Avg_release', {
        KOR: '평균 릴리즈',
        ENG: 'Avg release',
        CN: '平均释放',
        HK: ''
    }],
    ['Trades', {
        KOR: '총 거래횟수',
        ENG: 'Trades',
        CN: '总交易量',
        HK: ''
    }],
    ['Min', {
        KOR: '분',
        ENG: 'Min',
        CN: '分钟',
        HK: ''
    }],

    //My page
    ['trades', {
        KOR: '거래 수',
        ENG: 'Trades',
        CN: '总成单',
        HK: ''
    }],
    ['times', {
        KOR: '번',
        ENG: 'Times',
        CN: '次',
        HK: ''
    }],
    ['avgRelease', {
        KOR: '평균 릴리즈',
        ENG: 'Avg Release',
        CN: '平均放行',
        HK: ''
    }],
    ['accountCreatedTime', {
        KOR: '계정생성시간',
        ENG: 'Account created at',
        CN: '平均放行',
        HK: ''
    }],
    ['noRecord', {
        KOR: '거래 내역 없음',
        ENG: 'No record of transactions',
        CN: ' 尚未交易',
        HK: ''
    }],
    ['accountSecurity', {
        KOR: '계정 및 보안',
        ENG: 'Account & Security',
        CN: '账户与安全',
        HK: ''
    }],
    ['securityLevel', {
        KOR: '보안 등급',
        ENG: 'Security Level',
        CN: '安全等',
        HK: ''
    }],
    ['securityExplain', {
        KOR: '두가지 이상 인증 받는 것을 강력히 추천 드립니다.',
        ENG: 'Using two-factor authentication is highly recommended.',
        CN: '',
        HK: ''
    }],
    ['emailSecurityExplain', {
        KOR: 'API를 관리하는 동안 인출, 암호검색, 보안 설정 변경 그리고 인증에 사용 됩니다.',
        ENG: 'Used to withdraw, retrieve password, change security settings and verify while managing API.',
        CN: '',
        HK: ''
    }],
    ['phone', {
        KOR: '전화',
        ENG: 'Phone',
        CN: '手机',
        HK: ''
    }],
    ['account', {
        KOR: '계정',
        ENG: 'Account',
        CN: '帐户',
        HK: ''
    }],
    ['idVerification', {
        KOR: '신분증 인증',
        ENG: 'ID Verification',
        CN: '身份认证',
        HK: ''
    }],
    ['idVerificationExplain', {
        KOR: '최초 신분증 인증 후, 바꿀 수 없습니다.',
        ENG: 'Once ID verification is completed, no changes may be made.',
        CN: '',
        HK: ''
    }],
    ['advancedVerification', {
        KOR: '고급 인증',
        ENG: 'Advanced Verification',
        CN: '高级认证',
        HK: ''
    }],
    ['paymentMethodExplain', {
        KOR: '개인 보안상의 이유로 자신의 계정 만을 사용해야 합니다. 사용 가능한 결제 방법은 구매자에게 최대 3 개까지 표시됩니다.',
        ENG: 'For personal security reasons, please only use your own account.Enabled payment instructions will be showen to the buyer,3 at most',
        CN: '',
        HK: ''
    }],
    ['modify', {
        KOR: '수정',
        ENG: 'Modify',
        CN: '修改',
        HK: ''
    }],
    ['addPayment', {
        KOR: '새로운 결제수단 추가',
        ENG: 'Add a new payment method',
        CN: '点击添加支付方式',
        HK: ''
    }],
    ['blockList', {
        KOR: '차단 리스트',
        ENG: 'Block List',
        CN: '屏蔽名单',
        HK: ''
    }],
    ['blockListExplain', {
        KOR: '차단된 이용자는 당신과 거래할 수 없습니다.',
        ENG: 'Users that you blocked will not be able to trade with you',
        CN: '被屏蔽的用户将无法与您进行交易',
        HK: ''
    }],
    ['history', {
        KOR: '기록',
        ENG: 'History',
        CN: '',
        HK: ''
    }],
    ['securitySettings', {
        KOR: '보안 설정',
        ENG: 'Security Settings',
        CN: '',
        HK: ''
    }],
    ['low', {
        KOR: '저',
        ENG: 'Low',
        CN: '低',
        HK: ''
    }],
    ['medium', {
        KOR: '중',
        ENG: 'Medium',
        CN: '中',
        HK: ''
    }],
    ['high', {
        KOR: '고',
        ENG: 'High',
        CN: '高',
        HK: ''
    }],
    ['bound', {
        KOR: '연동',
        ENG: 'Bound',
        CN: '绑定',
        HK: ''
    }],
    ['unbound', {
        KOR: '미연동',
        ENG: 'Unbound',
        CN: '',
        HK: ''
    }],
    ['turnOff', {
        KOR: '비활성화',
        ENG: 'Turn off',
        CN: '',
        HK: ''
    }],
    ['turnOn', {
        KOR: '활성화',
        ENG: 'Turn On',
        CN: '',
        HK: ''
    }],
    ['unverified', {
        KOR: '미인증',
        ENG: 'Unverified',
        CN: '未认证',
        HK: ''
    }],
    ['reset', {
        KOR: '설정',
        ENG: 'Reset',
        CN: '设置',
        HK: ''
    }],
    ['unblock', {
        KOR: '차단해제',
        ENG: 'Unblock',
        CN: '',
        HK: ''
    }],
    ['successful', {
        KOR: '성공',
        ENG: 'Successful',
        CN: '成功',
        HK: ''
    }],
    ['failed', {
        KOR: '실패',
        ENG: 'Failed',
        CN: '失败',
        HK: ''
    }],
    ['changePhone', {
        KOR: '수정',
        ENG: 'Change',
        CN: '',
        HK: ''
    }],
    ['paymentMethodSelectboxPlaceholder', {
        KOR: '결제수단을 선태하여 주십시오',
        ENG: 'Choose a paymnet method',
        CN: '',
        HK: ''
    }],
    ['namePlaceholder', {
        KOR: '당신의 실제 이름을 입력해 주십시오',
        ENG: 'Enter your real name',
        CN: '',
        HK: ''
    }],
    ['name', {
        KOR: '성명',
        ENG: 'Name',
        CN: '',
        HK: ''
    }],
    ['alipayPlaceholder', {
        KOR: '알리페이를 입력해 주십시오',
        ENG: 'Input Alipay',
        CN: '',
        HK: ''
    }],
    ['wechatPlaceholder', {
        KOR: '위챗페이를 입력해 주십시오',
        ENG: 'Input Wechat',
        CN: '',
        HK: ''
    }],
    ['bankPlaceholder', {
        KOR: '은행 계좌를 입력해 주십시오',
        ENG: 'Input Bank Account',
        CN: '',
        HK: ''
    }],
    ['qrCode', {
        KOR: 'QR 코드',
        ENG: 'QR Code',
        CN: '',
        HK: ''
    }],
    ['alipayQrCodeExplain', {
        KOR: '당신의 알리페이 QR코드 이미지를 업로드 해주십시오 ',
        ENG: 'Upload your Alipay receipt QR code image ',
        CN: '',
        HK: ''
    }],
    ['wechatQrCodeExplain', {
        KOR: '당신의 위챗페이 QR코드 이미지를 업로드 해주십시오 ',
        ENG: 'Upload your Wechat receipt QR code image ',
        CN: '',
        HK: ''
    }],
    ['tradePwPlaceholder', {
        KOR: '거래 비밀번호를 입력해 주십시오',
        ENG: 'Enter your trade password',
        CN: '',
        HK: ''
    }],
    ['bankName', {
        KOR: '은행 이름',
        ENG: 'Bank Name',
        CN: '',
        HK: ''
    }],
    ['branchInfo', {
        KOR: '추가 정보(선택사항)',
        ENG: 'Branch Info(Oprional)',
        CN: '',
        HK: ''
    }],
    ['bankNamePlaceholder', {
        KOR: '은행 이름을 입력해 주십시오',
        ENG: 'Enter bank name',
        CN: '',
        HK: ''
    }],
    ['branchInfoPlaceholder', {
        KOR: '추가 정보를 입력해 주십시오',
        ENG: 'Enter branch information',
        CN: '',
        HK: ''
    }],
    ['warning_name', {
        KOR: '이름을 입력해 주십시오.',
        ENG: 'Enter your real name.',
        CN: '',
        HK: ''
    }],
    ['warning_alipay', {
        KOR: '알리페이를 입력해 주십시오.',
        ENG: 'Enter your alipay.',
        CN: '',
        HK: ''
    }],
    ['warning_wechat', {
        KOR: '위챗을 입력해 주십시오.',
        ENG: 'Enter your wechat.',
        CN: '',
        HK: ''
    }],
    ['warning_bank', {
        KOR: '은행 이름을 입력해 주십시오.',
        ENG: 'Enter bank name.',
        CN: '',
        HK: ''
    }],
    ['warning_bank_account', {
        KOR: '은행 계좌를 입력해 주십시오.',
        ENG: 'Enter bank account.',
        CN: '',
        HK: ''
    }],
    ['changePassword', {
        KOR: '비밀번호 변경',
        ENG: 'Change password',
        CN: '',
        HK: ''
    }],
    ['oldPassword', {
        KOR: '이전 비밀번호',
        ENG: 'Old password',
        CN: '',
        HK: ''
    }],
    ['newPassword', {
        KOR: '새로운 비밀번호',
        ENG: 'New password',
        CN: '',
        HK: ''
    }],
    ['changePasswordExplain', {
        KOR: '한번 비밀번호를 변경하게 되면, 24시간 동안 입금을 할 수 없습니다.',
        ENG: 'The withdrawal will be disabled in 24 hours once password is changed.',
        CN: '',
        HK: ''
    }],
    ['change', {
        KOR: '수정',
        ENG: 'Change',
        CN: '',
        HK: ''
    }],
    ['warningNewPassword', {
        KOR: '새로운 비밀번호를 입력해 주십시오.',
        ENG: 'Enter new password.',
        CN: '',
        HK: ''
    }],
    ['warningPasswordCharacters', {
        KOR: '8-20 자',
        ENG: '8-20 characters',
        CN: '',
        HK: ''
    }],
    ['warningPasswordNumber', {
        KOR: '숫자만 입력할 수 없습니다',
        ENG: 'Can not be pure numbers',
        CN: '',
        HK: ''
    }],
    ['phoneNumber', {
        KOR: '전화번호',
        ENG: 'Phone Number',
        CN: '',
        HK: ''
    }],
    ['SMSverification', {
        KOR: 'SMS 인증코드',
        ENG: 'SMS verification code',
        CN: '',
        HK: ''
    }],
    ['emailVerification', {
        KOR: '이메일 인증코드',
        ENG: 'Email verification code',
        CN: '',
        HK: ''
    }],
    ['emailTurnOff', {
        KOR: '이메일 비활성화',
        ENG: 'Email turn off',
        CN: '',
        HK: ''
    }],
    ['emailTurnOffExplain', {
        KOR: '이메일 인증이 비활성화 되면, 24시간 동안 입금 하실 수 없습니다.',
        ENG: 'The withdrawal will be disabled in next 24 hours once email authentication is  turned off.',
        CN: '',
        HK: ''
    }],
    ['linkPhone', {
        KOR: '휴대폰 연동',
        ENG: 'Link mobile phone',
        CN: '',
        HK: ''
    }],
    ['linkEmail', {
        KOR: '이메일 연동',
        ENG: 'Link email',
        CN: '',
        HK: ''
    }],
    ['bind', {
        KOR: '연동하기',
        ENG: 'Bind',
        CN: '',
        HK: ''
    }],
    ['link', {
        KOR: '연동하기',
        ENG: 'Link',
        CN: '',
        HK: ''
    }],
    ['resetTradePassword', {
        KOR: '거래 비밀번호 초기화',
        ENG: 'Reset Trade Password',
        CN: '',
        HK: ''
    }],
    ['confirmTradePassword', {
        KOR: '거래 비밀번호 확인',
        ENG: 'Confirm trade password',
        CN: '',
        HK: ''
    }],
    ['nickNameTradePassword', {
        KOR: '닉네임 & 거래 비밀번호',
        ENG: 'Nickname & Trade Password',
        CN: '',
        HK: ''
    }],
    ['nickNameExplain', {
        KOR: '안전을 위하여 하기 거래 정보를 모두 입력해 주시기 바랍니다.',
        ENG: 'For safety reasons, please complete the transaction information',
        CN: '',
        HK: ''
    }],
    ['newTradePassword', {
        KOR: '새로운 거래 비밀번호',
        ENG: 'New Trade Password',
        CN: '',
        HK: ''
    }],
    ['nickName', {
        KOR: '닉네임',
        ENG: 'Nickname',
        CN: '',
        HK: ''
    }],
    ['nickNamePlaceholder', {
        KOR: '실명을 입력하지 마십시오. 변경 할 수 없습니다.',
        ENG: 'Do not use your real name, can not be changed',
        CN: '',
        HK: ''
    }],
    ['warning_nick_name', {
        KOR: '닉네임을 입력해 주십시오.',
        ENG: 'Enter you nickname.',
        CN: '',
        HK: ''
    }],
    ['nickNameTradePasswordPlaceholder', {
        KOR: '당신의 자산을 보호해줍니다.',
        ENG: 'To protect your asset',
        CN: '',
        HK: ''
    }],
    ['nickNameConfirmPasswordPlaceholder', {
        KOR: '거래 비밀번호를 다시 한번 입력해 주십시오.',
        ENG: 'Confirm trade password.',
        CN: '',
        HK: ''
    }],
    ['timerExplain1', {
        KOR: '',
        ENG: 'Retry after',
        CN: '',
        HK: ''
    }],
    ['timerExplain2', {
        KOR: '초 후에 재시도 해주십시오',
        ENG: 'seconds',
        CN: '',
        HK: ''
    }],
//    Merchant
    ['Apply to be Merchant', {
        KOR: '판매자 신청',
        ENG: 'Apply to be Merchant',
        CN: '申请成为商人',
        HK: ''
    }],
    ['Advertising', {
        KOR: '광고',
        ENG: 'Advertising',
        CN: '广告',
        HK: ''
    }],
    ['Merchants are able to post advertisements, flexible and covenient to trade.', {
        KOR: '판매자은 광고를 게시 할 수 있으며 유연하고 편리하게 거래 할 수 있습니다.',
        ENG: 'Merchants are able to post advertisements, flexible and covenient to trade.',
        CN: '商家可以发布广告，灵活方便交易。',
        HK: ''
    }],
    ['Exclusive logo', {
        KOR: '독점 로고',
        ENG: 'Exclusive logo',
        CN: '独家标志',
        HK: ''
    }],
    ['Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.', {
        KOR: '확인 된 판매자는 신뢰도와 신뢰성을 높이기 위해 독점 로고를 보유하게됩니다.',
        ENG: 'Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.',
        CN: '经过验证的商家将拥有独家徽标，以提高可靠性和可信度。',
        HK: ''
    }],
    ['One-to-one Service', {
        KOR: '일대일 서비스',
        ENG: 'One-to-one Service',
        CN: '一对一服务',
        HK: ''
    }],
    ['Merchants will enjoy our one-to-one exclusive service.', {
        KOR: '판매자들께선 저희의 일대일 전용 서비스를 즐길 수 있습니다.',
        ENG: 'Merchants will enjoy our one-to-one exclusive service.',
        CN: '商家将享受我们的一对一专属服务。',
        HK: ''
    }],
    ['OTC Trading Terms and Conditions', {
        KOR: 'OTC 거래 조건',
        ENG: 'OTC Trading Terms and Conditions',
        CN: '场外交易条款和条件',
        HK: ''
    }],
    ['ApplyNow', {
        KOR: '지금 신청',
        ENG: 'Apply Now',
        CN: '现在申请',
        HK: ''
    }],
    ['For safety reasons, please complete the transaction information', {
        KOR: '안전을 위해 거래 정보를 작성하십시오.',
        ENG: 'For safety reasons, please complete the transaction information',
        CN: '出于安全考虑，请填写交易信息',
        HK: ''
    }],
    ['First Name', {
        KOR: '이름',
        ENG: 'First Name',
        CN: '名字',
        HK: ''
    }],
    ['Last Name', {
        KOR: '성',
        ENG: 'Last Name',
        CN: '姓',
        HK: ''
    }],
    ['Identification Number', {
        KOR: '식별 번호',
        ENG: 'Identification Number',
        CN: '识别号码',
        HK: ''
    }],
    ['e.g. Passport, ID or Driver\'s License', {
        KOR: '예 : 여권, 신분증 또는 운전 면허증',
        ENG: 'e.g. Passport, ID or Driver\'s License',
        CN: '例如 护照，身份证或驾驶执照',
        HK: ''
    }],
    ['Upload photo of identiication', {
        KOR: '신분증 사진 업로드',
        ENG: 'Upload photo of identiication',
        CN: '上传身份证的照片',
        HK: ''
    }],
    ['Your application is under review', {
        KOR: '신청서를 검토 중입니다.',
        ENG: 'Your application is under review',
        CN: '您的申请正在审核中',
        HK: ''
    }],
    ['Authentication has been successfully submitted.', {
        KOR: '인증이 성공적으로 신청되었습니다.',
        ENG: 'Authentication has been successfully submitted.',
        CN: '身份验证已成功提交。',
        HK: ''
    }],
    ['We will complete the review within 2 working days', {
        KOR: '2 일 이내에 검토를 완료하겠습니다.',
        ENG: 'We will complete the review within 2 working days',
        CN: '我们将在2个工作日内完成审核',
        HK: ''
    }],
    ['Please enter your first name', {
        KOR: '이름을 입력하십시오',
        ENG: 'Enter your first name',
        CN: '请输入您的名字',
        HK: ''
    }],
    ['Please enter your last name', {
        KOR: '당신의 성을 입력하세요',
        ENG: 'Enter your last name',
        CN: '请输入您的姓氏',
        HK: ''
    }],
    ['Please enter your passport number', {
        KOR: '여권 번호를 입력하십시오.',
        ENG: 'Enter your passport number',
        CN: '请输入您的护照号码',
        HK: ''
    }],
    ['Done', {
        KOR: '확인',
        ENG: 'Done',
        CN: '完成',
        HK: ''
    }],
    ['Your application is under review.', {
        KOR: '귀하의 신청서를 검토 중입니다.',
        ENG: 'Your application is under review.',
        CN: '您的申请正在审核中。',
        HK: ''
    }],
    ['Your application has been successfully submitted. We will complete the review within 2 working days.', {
        KOR: '신청서가 성공적으로 제출되었습니다. 2일 이내에 ' +
        '검토를 완료 할 것입니다.',
        ENG: 'Your application has been successfully submitted. We will complete the review within 2 working days.',
        CN: '您的申请已成功提交。 我们将在2个工作日内完成审核。',
        HK: ''
    }],

    ['Photo of Identification', {
        KOR: '신분증 사진',
        ENG: 'Photo of Identification',
        CN: '鉴定照片',
        HK: ''
    }],
    ['Upload photo of identification', {
        KOR: '신분증 사진 업로드',
        ENG: 'Upload photo of identification',
        CN: '上传身份证的照片',
        HK: ''
    }],

    //404 페이지
    ['pageNotFound', {
        KOR: '요청하신 페이지를 찾을 수 없습니다. 나중에 다시 시도해 주십시오.',
        ENG: 'The page you are trying to reach is not available at the moment. Please try again later.',
        CN: '',
        HK: ''
    }],
    ['pageNotFoundBtn', {
        KOR: '거래소로 이동',
        ENG: 'Back to trading list',
        CN: '',
        HK: ''
    }],

    //alert
    ['401', {
        KOR: '세션이 만료되었습니다.',
        ENG: 'Your session has expired.',
        CN: '',
        HK: ''
    }],





])

export enum Lang {
  EN = 'EN',
  KO = 'KO',
  HK = 'HK',
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

       case 'hk':
        return Lang.HK;

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

    case 'hk':
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

        case Lang.HK:
            setCookie('language', 'hk', 30);
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

      case Lang.HK:
        if (string.HK === '') return string.KOR;
        return string.HK;

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
