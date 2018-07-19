import {getCookie, setCookie, deleteCookie} from "@/common/common";

const strings = new Map([

    // signup
    ['emailValue', {
        KOR: '이메일을 입력해 주십시오.',
        ENG: 'Pleaes enter email value.',
        CN: '',
        JP: ''
    }],
    ['emailForm', {
        KOR: '이메일 양식에 맞지 않습니다.',
        ENG: 'Does not fit email format.',
        CN: '',
        JP: ''
    }],
    ['passwordValue', {
        KOR: '비밀번호를 입력해 주십시오.',
        ENG: 'Pleaes enter password value.',
        CN: '',
        JP: ''
    }],
    ['passwordDigit', {
        KOR: '최소 8자를 입력해 주세요.',
        ENG: 'Please enter at least eight digits.',
        CN: '',
        JP: ''
    }],
    ['passwordForm', {
        KOR: '비밀번호 양식에 맞지 않습니다.',
        ENG: 'Does not fit password format.',
        CN: '',
        JP: ''
    }],
    ['passwordMatch', {
        KOR: '패스워드가 일치하지 않습니다.',
        ENG: 'Password is not matching.',
        CN: '',
        JP: ''
    }],
    ['acceptConditions', {
        KOR: '이용약관에 동의해 주십시오.',
        ENG: 'Please accept the terms and conditions.',
        CN: '',
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
        ENG: 'Sign Up',
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
        ENG: 'Log in',
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
      KOR: '규모',
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
      ENG: 'Order',
      CN: '发布广告',
      JP: ''
  }],
    ['Balances', {
        KOR: '밸런스',
        ENG: 'Balances',
        CN: '余额',
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
        ENG: 'Fixed prices do not fluctuate with the market',
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
        ENG: 'Buyer should initiate the payment within the payment window. Otherwise the order will be cancelled automatically',
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
        ENG: '10 to 20 Min.',
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
        ENG: 'Wechat Pay',
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
        ENG: 'The above payment information will be displayed to the buyer.If you want to add or modify ',
        CN: '以上支付信息将向买家展示。如需添加、修改请 ',
        JP: ''
    }],
    ['clickHereText', {
        KOR: '여기를 클릭해주세요',
        ENG: 'please click here',
        CN: '点击这里',
        JP: ''
    }],
    ['autoReplyText', {
        KOR: '자동 댓글',
        ENG: 'autoReplyText',
        CN: '自动回复',
        JP: ''
    }],
    ['autoReplyPlaceholder', {
        KOR: '자동 답장 하려는 정보를 입력하십시오',
        ENG: 'After the order is established, this information is automatically sent to the other party',
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
        ENG: 'Your trading terms will be displayed to each other when placing an order',
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
        KOR: '참고',
        ENG: 'Reference',
        CN: '',
        JP: ''
    }],
    ['paidText', {
        KOR: '지불완료',
        ENG: "i've paid",
        CN: '',
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
        CN: '',
        JP: ''
    }],
    ['transferChecklist2', {
        KOR: '2. 정해진 시간 내에 결제를 완료하고, 완료되면 \'지불완료\'를 클릭하십시오. 판매자가 자금 수령을 확인하면 자산이 자동 계좌 이체됩니다',
        ENG: '2. Please complete your payment within the stipulated time and proceed to click on ‘I have paid’ when done. After the seller confirms the receipt of funds, the assets will be transferred to your account automatically.',
        CN: '',
        JP: ''
    }],
    ['transferChecklist3', {
        KOR: '3. 하루에 3건의 거래가 취소되면 당일 거래가 일시 중지됩니다.',
        ENG: '3. Trading will be suspended for the day, should there 3 cancelled transactions in a day.',
        CN: '',
        JP: ''
    }],
    ['sellChecklist1', {
        KOR: '1. 판매하는 자산은 이미 고정되어 있습니다. 송금을받은 후 자산을 지불하려면 버튼을 클릭하십시오.',
        ENG: '1. The assets you sell are already frozen. Please click on the button to pay assets after you receive the transfer.',
        CN: '',
        JP: ''
    }],
    ['sellChecklist2', {
        KOR: '2. 만약 구매자가 당신이 미리 자산을 공개하기를 원한다면, 그가 이야기 하는 어떠한 이유도 믿지 마십시오. 불필요한 손실을 방지하려면 송금을 받은 후 자산을 공개 해야합니다.',
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
    ['', {
        KOR: '',
        ENG: '',
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
    ['TransactionType', {
        KOR: '거래 유형',
        ENG: 'Transaction type',
        CN: '交易类型',
        JP: ''
    }],
    ['NumberOfTransactions', {
        KOR: '거래 수',
        ENG: 'Number of transactions',
        CN: '交易数量',
        JP: ''
    }],
    ['TotalPrice', {
        KOR: '총 가격',
        ENG: 'Total price',
        CN: '总价',
        JP: ''
    }],
    ['unitPrice', {
        KOR: '단가',
        ENG: 'Unit price',
        CN: '单价',
        JP: ''
    }],
    ['status', {
        KOR: '상태',
        ENG: 'Status',
        CN: '状态',
        JP: ''
    }],
    ['TradingPartners', {
        KOR: '교환 상대',
        ENG: 'Trading partners',
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
    ['AdsType', {
        KOR: '광고 종류',
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

// let currentLang: Lang = Lang.EN;
 let currentLang: Lang = checkLocale();


export function abGetLang (): Lang {
    return currentLang
}

export function abSetLang (lang: Lang) {
    currentLang = lang

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
