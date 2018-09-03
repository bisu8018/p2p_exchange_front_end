import {getCookie, setCookie, deleteCookie} from "@/common/common";

const strings = new Map([

    // signup
    ['emailValue', {
        KOR: '이메일을 입력해 주십시오.',
        ENG: 'Please enter email value.',
        CN: '请输入电子邮件',
        HK: '請填寫Email'
    }],
    ['emailForm', {
        KOR: '이메일 양식과 맞지 않습니다.',
        ENG: 'Does not fit with email format.',
        CN: '电子邮件形式不正确',
        HK: 'Email格式不正確'
    }],
    ['verificationCode', {
        KOR: '인증코드를 입력해 주십시오.',
        ENG: 'Pleaes enter verification code.',
        CN: '请输入验证码',
        HK: '請輸入驗證碼'
    }],
    ['verification', {
        KOR: '인증코드',
        ENG: 'Verification Code',
        CN: '验证码',
        HK: '驗證碼'
    }],
    ['slideVerifyText', {
        KOR: '슬라이드 인증',
        ENG: 'Slide to verify',
        CN: '滑动验证',
        HK: '滑動驗證'
    }],
    ['passwordValue', {
        KOR: '비밀번호를 입력해 주십시오.',
        ENG: 'Please Enter password.',
        CN: '请输入密码',
        HK: '請輸入密碼'
    }],
    ['passwordDigit', {
        KOR: '비밀번호는 8자 이상이어야 합니다.',
        ENG: 'Password should be more than eight digits.',
        CN: '密码为最小8个字以上',
        HK: '密碼為最小8個字以上'
    }],
    ['passwordForm', {
        KOR: '비밀번호 양식에 맞지 않습니다.',
        ENG: 'Does not fit with password format.',
        CN: '请输入正确的密码',
        HK: '請輸入正確的密碼'
    }],
    ['passwordMatch', {
        KOR: '패스워드가 일치하지 않습니다.',
        ENG: 'Incorrect Password.',
        CN: '密码错误',
        HK: '密碼錯誤'
    }],
    ['acceptConditions', {
        KOR: '이용약관에 동의해 주십시오.',
        ENG: 'Accept the terms and conditions.',
        CN: '请同意使用条款',
        HK: '請同意使用條款'
    }],
    ['signupSubject', {
        KOR: 'AllB OTC 회원가입',
        ENG: 'Sign up to AllB OTC',
        CN: '注册埃尔比场外交易',
        HK: '注冊埃爾比場外交易'
    }],
    ['email', {
        KOR: '이메일',
        ENG: 'Email',
        CN: '电子邮箱',
        HK: 'Email'
    }],
    ['emailVerificationCode', {
        KOR: '이메일 인증 코드',
        ENG: 'Email Verification Code',
        CN: '邮箱验证编码',
        HK: 'Email驗證編碼'
    }],
    ['clickToSend', {
        KOR: '클릭하여 전송',
        ENG: 'Click to send',
        CN: '点击传送',
        HK: '點擊傳送'
    }],
    ['password', {
        KOR: '비밀번호',
        ENG: 'Password',
        CN: '密码',
        HK: '密碼'
    }],
    ['passwordPlaceholder', {
        KOR: '8~20자 숫자/영문/특수문자 포함',
        ENG: 'Enter 8 to 20 digits with a mix of letters, special characters and numbers',
        CN: '包含8~20个数字、英文以及标点符号',
        HK: '包含8~20位數字、英文以及標點符號'
    }],
    ['passwordConfirm', {
        KOR: '비밀번호 확인',
        ENG: 'Confirm Password',
        CN: '确认密码',
        HK: '確認密碼'
    }],
    ['termsLabel1', {
        KOR: '본 이용약관을 확인하였으며, 이에 동의합니다',
        ENG: 'I agree to the AllB\'s',
        CN: '已阅读并同意遵守本',
        HK: '已閲讀並同意遵守本'
    }],
    ['termsLabel2', {
        KOR: '이용약관',
        ENG: 'Terms of Service.',
        CN: '使用条款',
        HK: '使用條款'
    }],
    ['termsBtn', {
        KOR: '이용약관',
        ENG: 'Terms of Service',
        CN: '使用条款',
        HK: '使用條款'
    }],
    ['signupText', {
        KOR: '가입',
        ENG: 'Sign up',
        CN: '注册',
        HK: '注冊'
    }],
    ['haveAccount', {
        KOR: '이미 계정이 있으십니까 ?',
        ENG: 'Already have an account?',
        CN: '已有账户吗？',
        HK: '已有帳戶嗎？'
    }],
    ['loginText', {
        KOR: '로그인',
        ENG: 'Login',
        CN: '登录',
        HK: '登錄'
    }],

    //login
    ['welcome', {
        KOR: '환영합니다',
        ENG: 'Welcome',
        CN: '欢迎登录',
        HK: '歡迎登錄'
    }],
    ['forgetPassword', {
        KOR: '비밀번호를 잊어버리셨습니까?',
        ENG: 'Forget Password?',
        CN: '忘记密码？',
        HK: '忘記密碼？'
    }],
    ['accountYet', {
        KOR: '아직 계정이 없으십니까?',
        ENG: 'Don\'t have an account?',
        CN: '还没有账户吗？',
        HK: '還沒有帳戶嗎？'
    }],
    ['verify', {
        KOR: '인증하기',
        ENG: 'Verify',
        CN: '验证',
        HK: '驗證'
    }],
    ['verifySlider', {
        KOR: '슬라이드 바를 인증해주세요',
        ENG: 'Slide the bar to verify',
        CN: '请滑动验证',
        HK: '請滑動驗證'
    }],
    ['country', {
        KOR: '국가/지역',
        ENG: 'Country/Region',
        CN: '国家/地区',
        HK: '國家/地區'
    }],
    ['loginEmailPlaceholder', {
        KOR: '이메일을 입력해주세요',
        ENG: 'Enter your email address',
        CN: '请输入您的邮箱',
        HK: '請輸入您的Email'
    }],
    ['loginPasswordPlaceholder', {
        KOR: '비밀번호를 입력해주세요',
        ENG: 'Enter your password',
        CN: '请输入密码',
        HK: '請輸入密碼'
    }],
    ['verifySliderPlaceholder', {
        KOR: '인증을 위해 슬라이드해 주십시오',
        ENG: 'Slide to verify',
        CN: '请按住滑块，拖动到最右测',
        HK: '請按住滑塊，拖動到最右側'
    }],
    ['verifySliderSuccess', {
        KOR: '인증성공',
        ENG: 'Verified',
        CN: '验证成功',
        HK: '驗證成功'
    }],
    ['resetLoginPassword', {
        KOR: '로그인 비밀번호 재설정',
        ENG: 'Reset Sign in password',
        CN: '重设登录密码',
        HK: '重設登錄密碼'
    }],
    ['resetPasswordExplain', {
        KOR: '비밀번호 재설정 후, 24시간 동안 출금을 할 수 없습니다.',
        ENG: 'The withdrawal will be disabled in 24 hours once password is reset.',
        CN: '重设密码后，24小时内禁止提币',
        HK: '重設密碼後，24小時内禁止提幣'
    }],
    ['submit', {
        KOR: '전송',
        ENG: 'Submit',
        CN: '提交',
        HK: '提交'
    }],
    ['warningAttachmentFileType', {
        KOR: '이미지 파일로 업로드 해주십시오.',
        ENG: 'Upload only in an image file.',
        CN: '请上传图像档案',
        HK: '請上傳圖像檔案'
    }],
    ['warningAttachmentFileSize', {
        KOR: '5MB 이하 파일로 업로드 해주십시오.',
        ENG: 'Please upload less than 5MB file.',
        CN: '请上传5MB一下的档案',
        HK: '請上傳5MB一下的檔案'
    }],
    //Trade Center

    ['currency', {
        KOR: '통화',
        ENG: 'Currency',
        CN: '法币币种',
        HK: '幣別'
    }],
    ['payment', {
        KOR: '지불액',
        ENG: 'Payment',
        CN: '付款额',
        HK: '付款額'
    }],
    ['paymentMethod', {
        KOR: '결제수단',
        ENG: 'Payment Method',
        CN: '支付方式',
        HK: '支付方式'
    }],
    ['amount', {
        KOR: '액수',
        ENG: 'Amount',
        CN: '金额',
        HK: '金額'
    }],
    ['How_much_you_want_to_trade?', {
        KOR: '희망하시는 거래량을 입력해주세요',
        ENG: 'How much you want to trade?',
        CN: '请输入交易金额',
        HK: '請輸入交易金額'
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
        CN: '确认',
        HK: '確認'
    }],
    ['cancel', {
        KOR: '취소',
        ENG: 'Cancel',
        CN: '取消',
        HK: '取消'
    }],
    ['Merchant(Volume | Trade rate)', {
        KOR: '판매자(30일 거래량 | 거래율)',
        ENG: 'Merchant(30 Days Volume | Trade rate)',
        CN: '商家（30天成单 | 完成率）',
        HK: '商家（30天成單 | 完成率）'
    }],
    ['Available', {
        KOR: '수량',
        ENG: 'Amount',
        CN: '数量',
        HK: '數量'
    }],
    ['volume', {
        KOR: '수량',
        ENG: 'Volume',
        CN: '数量',
        HK: '數量'
    }],
    ['limits', {
        KOR: '제한',
        ENG: 'Limits',
        CN: '限额',
        HK: '限額'
    }],
    ['price', {
        KOR: '가격',
        ENG: 'Price',
        CN: '价格',
        HK: '價格'
    }],
    ['control', {
        KOR: '선택',
        ENG: 'Select',
        CN: '操作',
        HK: '操作'
    }],
    ['buy', {
        KOR: '구매',
        ENG: 'Buy',
        CN: '购买',
        HK: '購買'
    }],
    ['sell', {
        KOR: '판매',
        ENG: 'Sell',
        CN: '出售',
        HK: '出售'
    }],
    ['Buy', {
        KOR: '구매',
        ENG: 'Buy',
        CN: '购买',
        HK: '購買'
    }],
    ['Sell', {
        KOR: '판매',
        ENG: 'Sell',
        CN: '出售',
        HK: '出售'
    }],
    ['userMemo', {
        KOR: '판매자 메모',
        ENG: 'User Memo',
        CN: '商家备注',
        HK: '商家備注'
    }],
    ['Payment window is', {
        KOR: '지불시간:  ',
        ENG: 'Payment time limit: ',
        CN: '买方付款时限为',
        HK: '買方付款時限為'
    }],
    ['Please_enter_a_vaild_number', {
        KOR: '올바른 숫자를 입력하십시오.',
        ENG: 'Please Enter a valid number',
        CN: '请输入有效的数量',
        HK: '請輸入有效的數量'
    }],
    ['Before you start trading, you need to complete the necessary transaction information.', {
        KOR: '거래를 시작하기 전에, 필수 거래 정보를 등록해야 합니다.',
        ENG: 'Before start trading, you need to fill out necessary transaction information.',
        CN: '开始交易之前，您需要完成必要的交易信息',
        HK: '開始交易之前，您需要完成必要的交易信息'
    }],
    ['Set up now.', {
        KOR: '즉시 설정',
        ENG: 'Set up now.',
        CN: '立即设置',
        HK: '立即設置'
    }],
    ['You need to complete the necessary transaction information.', {
        KOR: '필요한 거래 정보를 등록해야 합니다.',
        ENG: 'You need to fill out necessary transaction information.',
        CN: '需要完成必要的交易信息。',
        HK: '需要完成必要的交易信息。'
    }],

    //  header
    ['exchange', {
        KOR: '거래소',
        ENG: 'Exchange',
        CN: '币币交易',
        HK: '幣幣交易'
    }],
    ['TradeCenter', {
        KOR: '일반 거래',
        ENG: 'Common Trade',
        CN: '普通交易',
        HK: '普通交易'
    }],

    ['BlockTrade', {
        KOR: '대량 거래',
        ENG: 'Block Trade',
        CN: '大宗交易',
        HK: '大宗交易'
    }],
    ['postAd', {
        KOR: '광고 게시',
        ENG: 'Post AD',
        CN: '发布广告',
        HK: '發佈廣告'
    }],
    ['Post_General_AD', {
        KOR: '일반 광고 게시',
        ENG: 'Post General Ad',
        CN: '发布普通广告',
        HK: '發佈普通廣告'
    }],
    ['Post_Block_AD', {
        KOR: '대량거래 광고 게시',
        ENG: 'Post Block Ad',
        CN: '发布大宗广告',
        HK: '發佈大宗廣告'
    }],
    ['MyPage', {
        KOR: '마이페이지',
        ENG: 'My Page',
        CN: '我的页面',
        HK: '我的頁面'
    }],
    ['MyOrder', {
        KOR: '주문내역',
        ENG: 'My Order',
        CN: '我的订单',
        HK: '我的訂單'
    }],
    ['MyAds', {
        KOR: '광고내역',
        ENG: 'My Ads',
        CN: '我的广告',
        HK: '我的廣告'
    }],
    ['assets', {
        KOR: '자산',
        ENG: 'Assets',
        CN: '资产',
        HK: '資產'
    }],
    ['order', {
        KOR: '주문',
        ENG: 'Orders',
        CN: '订单',
        HK: '訂單'
    }],
    ['Balances', {
        KOR: '잔고',
        ENG: 'Balance',
        CN: '余额',
        HK: '餘額'
    }],
    ['From', {
        KOR: '환전 전',
        ENG: 'From',
        CN: '从',
        HK: '從'
    }],
    ['from', {
        KOR: '에게',
        ENG: 'from',
        CN: '向',
        HK: '從'
    }],
    ['To', {
        KOR: '환전 후',
        ENG: 'To',
        CN: '至',
        HK: '至'
    }],
    ['UserCenter', {
        KOR: '유저 센터',
        ENG: 'User Center',
        CN: '用户中心',
        HK: '用戶中心'
    }],
    ['Merchant', {
        KOR: '판매자',
        ENG: 'Merchant',
        CN: '商家',
        HK: '商家'
    }],
    ['LogOut', {
        KOR: '로그아웃',
        ENG: 'Logout',
        CN: '退出',
        HK: '退出'
    }],

    //footer
    ['support', {
        KOR: '지원',
        ENG: 'Support',
        CN: '支持',
        HK: '支持'
    }],
    ['guides', {
        KOR: '이용 안내',
        ENG: 'Guides',
        CN: '新手指南',
        HK: '新手指南'
    }],
    ['FAQ', {
        KOR: 'FAQ',
        ENG: 'FAQ',
        CN: '常见问题',
        HK: '常見問題'
    }],
    ['announcements', {
        KOR: '공지사항',
        ENG: 'Announcements',
        CN: '公告',
        HK: '公告'
    }],
    ['terms', {
        KOR: '이용약관',
        ENG: 'Terms and Conditions',
        CN: '条款',
        HK: '條款'
    }],
    ['terms_Of_Service', {
        KOR: '서비스 약관',
        ENG: 'Terms of Service',
        CN: '服务协议',
        HK: '服務協議'
    }],
    ['transaction_Regulations', {
        KOR: '거래 규제',
        ENG: 'Transaction Regulations',
        CN: '交易规则',
        HK: '交易規則'
    }],
    ['fees', {
        KOR: '수수료율',
        ENG: 'Commission Rate',
        CN: '手续费说明',
        HK: '手續費説明'
    }],
    ['Terms_Of_Privacy_Policy', {
        KOR: '개인정보 보호정책 약관',
        ENG: 'Terms of Privacy Policy',
        CN: '隐私条款',
        HK: '隱私條款'
    }],
    ['KYC&AML_Policies', {
        KOR: 'KYC&AML 정책',
        ENG: 'KYC&AML Policies',
        CN: 'KYC&AML 政策',
        HK: 'KYC&AML 政策'
    }],
    ['contact_Us', {
        KOR: '고객 문의',
        ENG: 'Contact Us',
        CN: '联系我们',
        HK: '聯係我們'
    }],
    ['language', {
        KOR: '언어',
        ENG: 'Language',
        CN: '语言',
        HK: '語言'
    }],
    ['nationality', {
        KOR: '국가/지역',
        ENG: 'Country/Region',
        CN: '国家/地区',
        HK: '國家/地區'
    }],


    //post AD
    ['generalAdSubject', {
        KOR: '일반 공고',
        ENG: 'Post General AD',
        CN: '发布普通广告',
        HK: '發佈普通廣告'
    }],
    ['blockAdSubject', {
        KOR: '대량 공고',
        ENG: 'Block Block AD',
        CN: '发布大宗广告',
        HK: '發佈大宗廣告'
    }],
    ['blockAdSubject', {
        KOR: '대량 공고',
        ENG: 'Post Block AD',
        CN: '发布大宗广告',
        HK: '發佈大宗廣告'
    }],
    ['priceType', {
        KOR: '가격 유형',
        ENG: 'Price Type',
        CN: '价格种类',
        HK: '價格種類'
    }],
    ['fixedPrice', {
        KOR: '고정가격',
        ENG: 'Fixed Price',
        CN: '固定价格',
        HK: '固定價格'
    }],
    ['margin', {
        KOR: '마진',
        ENG: 'Margin',
        CN: '浮动价格',
        HK: '浮動價格'
    }],
    ['warningFixedPricePlaceholder', {
        KOR: '올바른 수를 입력해 주십시오',
        ENG: 'Please Enter a valid number',
        CN: '请输入适合数量',
        HK: '請輸入適合數量'
    }],
    ['warningFloatPricePlaceholder', {
        KOR: '올바른 수를 입력해 주십시오',
        ENG: 'Enter a vaild number',
        CN: '请输入适合数量',
        HK: '請輸入適合數量'
    }],
    ['warningVolume', {
        KOR: '거래 수량을 입력해 주십시오',
        ENG: 'Please Enter Trade volume',
        CN: '请输入交易数量',
        HK: '請輸入交易數量'
    }],
    ['warningMinLimit', {
        KOR: '최소액을 입력해 주십시오',
        ENG: 'Please Enter Minimum limit',
        CN: '请输入最小金额',
        HK: '請輸入最小金額'
    }],
    ['warningMaxLimit', {
        KOR: '최대액을 입력해 주십시오',
        ENG: 'Please Enter Maximum limit',
        CN: '请输入最大金额',
        HK: '請輸入最大金額'
    }],
    ['warningPaymentWindow', {
        KOR: '지불 기간을 입력해 주십시오',
        ENG: 'Please Enter the payment window',
        CN: '请输入支付期间',
        HK: '請輸入支付期間'
    }],
    ['floatPrice', {
        KOR: '변동 가격',
        ENG: 'Float Price',
        CN: '浮动价格',
        HK: '浮動價格'
    }],
    ['priceText', {
        KOR: '거래 가격',
        ENG: 'Transaction Price',
        CN: '交易价格',
        HK: '交易價格'
    }],
    ['marektPrice', {
        KOR: '시장 가격',
        ENG: 'Market Price',
        CN: '市场价格',
        HK: '市場價格'
    }],
    ['priceExplain', {
        KOR: '고정가격은 시장에 따라 변동되지 않습니다.',
        ENG: 'Fixed prices do not fluctuate with the market.',
        CN: '固定价格不会随市场波动。',
        HK: '固定價格不會隨市場波動。'
    }],
    ['volumeText', {
        KOR: '거래 수량',
        ENG: 'Trade Volume',
        CN: '交易数量',
        HK: '交易數量'
    }],
    ['minLimit', {
        KOR: '최소 한도',
        ENG: 'Minimum Limit',
        CN: '最小限额',
        HK: '最小限額'
    }],
    ['maxLimit', {
        KOR: '최대 한도',
        ENG: 'Maximum Limit',
        CN: '最大限额',
        HK: '最大限額'
    }],
    ['paymentWindow', {
        KOR: '지불 시한',
        ENG: 'Pay limit',
        CN: '支付时限',
        HK: '支付時限'
    }],
    ['paymentWindowExplain', {
        KOR: '구매자는 지불 기간 내에 지불금을 이체해야 합니다. 그러지 못할 경우 거래는 자동으로 취소됩니다',
        ENG: 'Buyer should initiate the payment within the payment period. Otherwise the order will be cancelled automatically.',
        CN: '买家必须要在支付时限内完成转账支付，否则此交易将自动取消。',
        HK: '買家必須要在支付時限內完成轉賬支付，否則此交易將自動取消。'
    }],
    ['minuteText', {
        KOR: '분',
        ENG: 'Minutes',
        CN: '分',
        HK: '分'
    }],
    ['sellText', {
        KOR: '판매',
        ENG: 'Sell',
        CN: '出售',
        HK: '出售'
    }],
    ['buyText', {
        KOR: '구매',
        ENG: 'Buy',
        CN: '购买',
        HK: '購買'
    }],
    ['volumePlaceholderWeb', {
        KOR: '거래 금액을 입력하십시오',
        ENG: 'Enter the trade volume',
        CN: '请输入交易数量',
        HK: '請輸入交易數量'
    }],
    ['volumePlaceholderMobile', {
        KOR: '보유 : ',
        ENG: 'Available : ',
        CN: '可用：',
        HK: '可用：'
    }],
    ['minLimitPlaceholder', {
        KOR: '최소 ',
        ENG: 'at least ',
        CN: '最小为 ',
        HK: '最小為 '
    }],
    ['maxLimitPlaceholder', {
        KOR: '최대 0.00',
        ENG: 'at most 0.00',
        CN: '最大为0.00',
        HK: '最大為0.00'
    }],
    ['paymentWindowPlaceholder', {
        KOR: '10-20',
        ENG: '10 to 20',
        CN: '10-20',
        HK: '10-20'
    }],
    ['alipayText', {
        KOR: '알리페이',
        ENG: 'Alipay',
        CN: '支付宝',
        HK: '支付寶'
    }],
    ['wechatPayText', {
        KOR: '위챗페이',
        ENG: 'Wechat',
        CN: '微信支付',
        HK: '微信支付'
    }],
    ['bankAccountText', {
        KOR: '은행 계좌',
        ENG: 'Bank account',
        CN: '银行账户',
        HK: '銀行帳戶'
    }],
    ['refreshBtnText', {
        KOR: '새로고침',
        ENG: 'Refresh',
        CN: '刷新',
        HK: '刷新'
    }],
    ['paymentExplain', {
        KOR: '위 결제 정보는 구매자에게 표시됩니다. 만약 추가 또는 수정을 원하시면 ',
        ENG: 'The above payment information will be displayed to the buyer. If you want to add or modify please ',
        CN: '以上支付信息将向买家展示。如需添加或修改，请 ',
        HK: '以上支付信息將向買家展示。如需添加或修改，請' ,
    }],
    ['clickHereText', {
        KOR: '여기를 클릭해주세요',
        ENG: 'Click here',
        CN: '点击此处',
        HK: '點擊此處'
    }],
    ['autoReplyText', {
        KOR: '자동 댓글',
        ENG: 'Auto-Reply',
        CN: '自动回复',
        HK: '自動回復'
    }],
    ['autoReplyPlaceholder', {
        KOR: '거래가 성사된 후, 본 정보는 자동으로 상대방에게 전송됩니다.',
        ENG: 'After the order is established, this information is automatically sent to the counterparty.',
        CN: '交易完成后，本信息将自动传送至对方。',
        HK: '交易完成後，本信息將自動傳送至對方。'
    }],
    ['termsTransactionText', {
        KOR: '거래조항',
        ENG: 'Terms of the Transaction',
        CN: '交易条款',
        HK: '交易條款'
    }],
    ['termsTransactionPlaceholder', {
        KOR: '주문 시, 거래 조건이 상대방에게 표시됩니다',
        ENG: 'Your trading terms will be displayed to each other when placing an order.',
        CN: '下单时，对方可以看到交易条款。',
        HK: '下單時，對方可以看到交易條款。'
    }],
    ['counterpartyFilterText', {
        KOR: '상대방 제한',
        ENG: 'Counterparty Filter',
        CN: '对方限制',
        HK: '對方限制'
    }],
    ['counterpartyFilterPlaceholder', {
        KOR: '해당 횟수 이상 거래 성공한 상대방만 거래 가능합니다.',
        ENG: 'Counterparty should traded more than numbers below:',
        CN: '对方需要超过下面交易次数：',
        HK: '對方需要超過下面交易次數：'
    }],
    ['counterpartyCheckbox1', {
        KOR: '상대방은 고급 인증을 통과해야 합니다',
        ENG: 'Counterparty should be passed advanced verification',
        CN: '对方需要通过高级验证',
        HK: '對方需要通過高級驗證'
    }],
    ['counterpartyCheckbox2', {
        KOR: '상대방이 휴대전화 번호를 계정과 연동해야 합니다',
        ENG: 'Counterparty should bind between mobile number and its account.',
        CN: '对方需要绑定手机号码和账户',
        HK: '對方需要綁定手機號碼和賬戶'
    }],
    ['counterpartyCheckbox3', {
        KOR: '상대방이 다른 상인들과 거래하지 않아야 합니다',
        ENG: 'Counterparty should not trade with other merchants',
        CN: '对方不应与其他用户交易',
        HK: '對方不應與其他用户交易'
    }],
    ['counterpartyExplain', {
        KOR: '상대방 제한을 설정하면 보다 신뢰할 수 있는 거래자를 필터링 할 수 있지만, 제한이 너무 많으면 거래 성공 가능성이 낮아집니다.',
        ENG: 'The requirements will allow you to filter traders with more trustworthiness. However, setting too many requirements may decrease trading success rate.',
        CN: '设置对方限制可以让您筛选出可信度更高的交易对象，但设定太多限制将下降您交易成功的几率。',
        HK: '設置對方限制可以讓您篩選出可信度更高的交易對象，但設定太多限制將下降您交易成功的幾率。'
    }],
    ['tradePwText', {
        KOR: '거래 비밀번호',
        ENG: 'Trade Password',
        CN: '交易密码',
        HK: '交易密碼'
    }],
    ['agreeTermsExplain', {
        KOR: '본인은 이를 이해하고 준수할 것에 동의합니다',
        ENG: 'I have read and agree to the Terms of Trading',
        CN: '阅读并同意遵守本交易规则',
        HK: '閲讀並同意遵守本交易規則'
    }],
    ['termsTrading', {
        KOR: '거래규칙',
        ENG: 'Terms of trading',
        CN: '交易规则',
        HK: '交易規則'
    }],
    ['postAdBtn', {
        KOR: '일반 AD 등록',
        ENG: 'Post General AD',
        CN: '发布普通广告',
        HK: '發布普通廣告'
    }],
    ['postAdIn', {
        KOR: '광고 등록 정보',
        ENG: 'Post AD info',
        CN: '广告内容',
        HK: '廣告内容'
    }],
    ['tradeType', {
        KOR: '거래 종류',
        ENG: 'Trade type',
        CN: '交易方式',
        HK: '交易方式'
    }],
    ['cryptoCurrency', {
        KOR: '암호화폐',
        ENG: 'Cryptocurrency',
        CN: '加密货币',
        HK: '加密貨幣'
    }],
    ['lowBalance', {
        KOR: '보유하고 계신 코인 잔액이 부족합니다',
        ENG: 'Your coin amount is not enough.',
        CN: '保有货币余额不足',
        HK: '保有貨幣餘額不足'
    }],
    ['atLeast', {
        KOR: '한도금액 이상으로 입력해 주십시오',
        ENG: 'Please input more than limit price',
        CN: '请输入限度以上的金额',
        HK: '請輸入限度以上的金額'
    }],
    ['atMost', {
        KOR: '최저 한도금액 이상으로 입력해 주십시오',
        ENG: 'Please input more than minimum limit',
        CN:  '请输入最小限度以上金额',
        HK:  '請輸入最小限度以上金額'
    }],
    ['timeRange', {
        KOR: '범위 시간 내로 입력해 주십시오',
        ENG: 'Enter within the range of time',
        CN: '请输入范围内时间',
        HK: '請輸入範圍内時間'
    }],
    ['counterpartyWarning', {
        KOR: '거래 수는 99 까지가 최대입니다',
        ENG: 'Trade numbers could be up to 99',
        CN: '交易次数最多为99次',
        HK: '交易次數最多為99次'
    }],
    ['warning_trade_password', {
        KOR: '거래 비밀번호를 입력해 주십시오',
        ENG: 'Please enter your trade password',
        CN: '请输入交易密码',
        HK: '請輸入交易密碼'
    }],

    //Buy
    ['orderText', {
        KOR: '주문번호',
        ENG: 'Order',
        CN: '订单号',
        HK: '訂單號'
    }],
    ['paymentExplain1', {
        KOR: '지불 대기 중. 지불이 필요한 금액은',
        ENG: 'Waiting for Payment. Please complete the payment ',
        CN: '卖家正在待付款，请支付交易总额',
        HK: '賣家正在待付款，請支付交易總額'
    }],
    ['paymentExplain2', {
        KOR: ' 이며, ',
        ENG: ' to ',
        CN: '给',
        HK: '給'
    }],
    ['paymentExplain3', {
        KOR: '에게',
        ENG: 'with',
        CN: '到',
        HK: '到'
    }],
    ['paymentExplain4', {
        KOR: '이내 지불하셔야 합니다. ',
        ENG: '. ',
        CN: '内完成。',
        HK: '内完成。'
    }],
    ['referenceText', {
        KOR: '지불 참조 번호',
        ENG: 'Reference',
        CN: '支付参考编码',
        HK: '支付參考編碼'
    }],
    ['paidText', {
        KOR: '지불완료',
        ENG: 'Payment Complete',
        CN: '我已付款',
        HK: '我已付款'
    }],
    ['paymentText', {
        KOR: '지불 완료 후, 이 버튼을 클릭하여 판매자에게 알려주십시오',
        ENG: 'After complete the payment, please click here to notice seller.',
        CN: '完成付款后，请点击此处提醒卖家',
        HK: '完成付款後，請點擊此處提醒賣家'
    }],
    ['transferChecklist1', {
        KOR: '1. 귀하의 송금은 판매자의 계좌로 입금됩니다. 거래가 완료되기 전에 판매 자산은 저희 플랫폼에 의해 안전하게 보관됩니다.',
        ENG: '1. Your transfer will be credited to seller\'s account. Before the transaction is completed, transaction assets will be frozen by our platform for safekeeping.',
        CN: '1. 您的转帐将汇入到卖家的帐户。在交易完成前，本平台将冻结待售资产以便安全保管。',
        HK: '1. 您的賬款將匯入到賣家的帳戶。在交易完成前，本平台將凍結交易資產以便安全保管。'

    }],
    ['transferChecklist2', {
        KOR: '2. 정해진 시간 내에 결제를 완료하고, 완료되면 \'지불완료\'를 클릭하십시오. 판매자가 대금 수령을 확인하면, 자산이 자동 계좌 이체됩니다',
        ENG: '2. Please complete your payment within the stipulated time. If it\'s complete, please click on \'I have paid\'. After the seller confirms the receipt of funds, the assets will be transferred to your account automatically.',
        CN: '2. 请在规定时间内完成付款，并务必点击“我已付款”，对方确认收款后，系统会将数字资产划转到您的账户。',
        HK: '2. 請在規定時間內完成付款，並務必點擊“我已付款”，對方確認收款後，系統會將數字資產劃轉到您的賬戶。',
    }],
    ['transferChecklist3', {
        KOR: '3. 24시간 이내 3건의 거래를 취소하면, 3번째 취소 직후 24시간 동안 거래가 중지됩니다.',
        ENG: '3. If you canceled transactions 3 times in 24 hours, your account will be disabled transactions 24 hours after the 3rd cancellation.',
        CN: '3. 如在24小时内取消3次的交易，第3次交易取消之后24小时之间被暂停交易功能。',
        HK: '3. 若在24小時内取消3次的交易，第3次交易取消之後24小時之間被暫停交易功能。'
    }],
    ['sellChecklist1', {
        KOR: '1. 판매하는 자산은 이미 동결되어 있습니다. 송금을 받은 후 자산을 지불하려면 버튼을 클릭하십시오.',
        ENG: '1. The assets you sell are already frozen. Please click on the button to pay assets after you receive the transfer.',
        CN: '1. 您出售的资产已经被冻结。收到对方付款后想要支付资产的话，请点击此处。',
        HK: '1. 您出售的資產已經被凍結。收到對方付款後想要支付資產的話，請點擊此處。'
    }],
    ['sellChecklist2', {
        KOR: '2. 만약 구매자가 당신에게 미리 자산을 공개해 달라고 부탁한다면, 그가 이야기하는 어떠한 이유도 믿지 마십시오. 불필요한 손실을 방지하려면 송금을 받은 후 자산을 공개해야 합니다.',
        ENG: '2. Please do not trust any excuses made by the buyer if he wants you to release the assets in advance. To avoid unnecessary loss, please make sure that you release the assets after you receive the transfer.',
        CN: '2. 如果买方要求提前公开资产，请不要相信对方的任何说辞并公开资产邀请。为了防止任何不必要的损失，请务必于收到买方的转账后再公开资产。',
        HK: '2. 若買方要求提前公開資產，請不要相信對方的任何説辭並公開資產邀請。爲了防止任何不必要的損失，請務必於收到匯款後再公開資產。'
    }],
    ['sellChecklist3', {
        KOR: '3. 수신 SMS를 받은 후 사기성 SMS로 인한 실수로 자산을 공개할 수 있으므로, 온라인 은행이나 모바일 은행에 로그인하여 수신을 확인하십시오.',
        ENG: '3. After you receive the arrival SMS, please log into online bank or mobile bank to check the arrival. Fraud SMS can make you release the assets by mistake.',
        CN: '3. 为了免于您因诈骗短信而不小心公开您的资产，请提前登入网上银行或手机的银行软件确认对方的转账。',
        HK: '3. 爲了免於您因詐騙簡訊而不小心公開您的資產，請提前登入網路銀行或手機的銀行APP確認對方的匯款。'
    }],
    ['confirmPayment', {
        KOR: '지불 승인',
        ENG: 'Confirm Payment',
        CN: '确认支付',
        HK: '確認支付'
    }],
    ['paymentContents1', {
        KOR: '판매자에게 대금을 지불했는지 확인하십시오.',
        ENG: 'Please confirm that you have made payment to the seller.',
        CN: '请确认您已经向卖家支付',
        HK: '請確認您已經向賣家支付'
    }],
    ['paymentContents2', {
        KOR: '사기 시도로 인해 계정이 정지될 수 있습니다.',
        ENG: 'Fraudulent attempts will result in the account being suspended.',
        CN: '欺诈性试图将导致帐户被暂停。',
        HK: '欺詐性試圖將導致帳戶被暫停。'
    }],
    ['buyingExplain1', {
        KOR: '지불되었습니다. 당신은 ',
        ENG: 'Paid, you will receive ',
        CN: '支付完成，您将收到',
        HK: '支付完成，您將收到'
    }],
    ['buyingExplain2', {
        KOR: ' 에 대하여 ',
        ENG: ' after ',
        CN: '由',
        HK: '對'
    }],
    ['buyingExplain3', {
        KOR: '가 영수증 발급 확인한 뒤에 전달받게 될 것입니다.',
        ENG: 'confirm receipt and release, ',
        CN: '放行的代币',
        HK: '發行的代幣'
    }],
    ['buyingExplain4', {
        KOR: '지불 참조 번호',
        ENG: 'Payment reference number',
        CN: '支付参考编码',
        HK: '支付參考編碼'
    }],
    ['buyingIndicator', {
        KOR: '구매자가 지불중입니다',
        ENG: 'Buyer is paying',
        CN: '买家正在支付',
        HK: '買家正在支付'
    }],
    ['sellingIndicator', {
        KOR: '판매자가 전송중입니다',
        ENG: 'Seller is releasing',
        CN: '对方正在放币',
        HK: '對方正在放幣'
    }],
    ['appeal', {
        KOR: '이의제기',
        ENG: 'Appeal',
        CN: '投诉',
        HK: '投訴'
    }],
    ['complete', {
        KOR: '완료',
        ENG: 'Complete',
        CN: '邀请成功',
        HK: '邀請成功'
    }],
    ['expired', {
        KOR: '만료됨',
        ENG: 'Expired',
        CN: '时限结束',
        HK: '时限结束'
    }],
    ['completedPayment', {
        KOR: '거래가 완료되었습니다.',
        ENG: 'Payment completed. ',
        CN: '交易成功',
        HK: '交易成功'
    }],
    ['tranferNow', {
        KOR: '잔고 조회',
        ENG: 'Balances',
        CN: '资产',
        HK: '資產'
    }],
    ['cancelExplain', {
        KOR: '주문이 취소되었으며 결제 정보를 볼 수 없습니다.',
        ENG: 'Order cancelled, unable to view payment information.',
        CN: '订单已取消，无法查看支付信息.',
        HK: '訂單已取消，無法查看支付信息.'
    }],
    ['cancelModalContent', {
        KOR: '이 거래를 취소하시겠습니까?',
        ENG: 'Are you sure you want to cancel this order?',
        CN: '您确认取消此订单吗？',
        HK: '您確認取消此訂單嗎？'
    }],
    ['cancelModalButton', {
        KOR: '이의제기 취소',
        ENG: 'Cancel this Appeal',
        CN: '取消投诉',
        HK: '取消投訴'
    }],
    ['appeal', {
        KOR: '이의제기',
        ENG: 'Appeal',
        CN: '投诉',
        HK: '投訴'
    }],
    ['appealModalContent', {
        KOR: '이 이의 제기가 성공적으로 제출된 후에 자산은 동결되며 고객 서비스는 거래가 끝날 때까지 개입합니다. 악의적인 불만사항은 계정이 동결됩니다.',
        ENG: 'The assets will be frozen after this appeal submit successfully, and the customer service will intervene in the transaction until the end. Malicious complainants will be frozen your accounts. ',
        CN: '当投诉成功被提交时，资产将被冻结，客服将会介入此案件至交易结束时。恶意的客诉将导致您的帐户被冻结。',
        HK: '當投訴成功被提交時，資產將被凍結，客服將會介入此案件至交易結束時。惡意的客訴將導致您的帳戶被凍結。'
    }],
    ['cancelModalTrade', {
        KOR: '거래 취소',
        ENG: 'Cancel this Trade',
        CN: '取消交易',
        HK: '取消交易'
    }],
    ['appealReason', {
        KOR: '이의제기 사유',
        ENG: 'Appeal Reason',
        CN: '投诉理由',
        HK: '投訴理由'
    }],
    ['details', {
        KOR: '세부정보',
        ENG: 'Details',
        CN: '详细内容',
        HK: '詳細内容'
    }],
    ['detailsPlaceholder', {
        KOR: '이의제기 사유의 세부정보을 입력해 주십시오',
        ENG: 'Enter the details of appeal reasons',
        CN: '请填写投诉理由的详细内容。',
        HK: '請填寫投訴理由的詳細内容。'
    }],
    ['appealCodeExplain', {
        KOR: '이의제기 중, 이의제기 코드 : ',
        ENG: 'Appealing, the code of appeal : ',
        CN: '正在申请投诉，受理编号：',
        HK: '正在申請異議，受理編號：'
    }],
    ['payingExplain1', {
        KOR: '지불 대기 중. ',
        ENG: 'Waiting for payment, ',
        CN: '等待付款，',
        HK: '等待付款，'
    }],
    ['payingExplain2', {
        KOR: ' 님께서 당신에게 ',
        ENG: ' will pay you ',
        CN: '将给你',
        HK: '將給您'
    }],
    ['payingExplain3', {
        KOR: '을 지불할 것 입니다. ',
        ENG: ' - within ',
        CN: '，',
        HK: '，'
    }],
    ['payingExplain4', {
        KOR: ' 분 이내 지불할 예정입니다. ',
        ENG: 'minute(s)',
        CN: '分钟内将完成支付',
        HK: '分鐘內將完成支付'
    }],
    ['confirmgExplain1', {
        KOR: '지불됨, ',
        ENG: 'Paid, ',
        CN: '已支付',
        HK: '已支付'
    }],
    ['confirmgExplain2', {
        KOR: '이 지불 완료 처리한 금액은 ',
        ENG: ' has marked this order as paid you ',
        CN: '支付完成金额是',
        HK: '支付完成金額是'
    }],
    ['confirmRelease', {
        KOR: '확인 및 전송',
        ENG: 'Confirm and release',
        CN: '确认与放行',
        HK: '確認與公開'
    }],
    ['confirmContents1', {
        KOR: '전송 전, 은행 계좌 또는 기타 전자 지갑에 로그인해 송금 내역을 확인하십시오.',
        ENG: 'Make sure to check the receipt by logging in your bank account or other e-wallet methods.',
        CN: '放行前，请确认银行账户或其他电子钱包的转账记录。',
        HK: '放行前，請確認銀行賬戶過其他電子錢包的轉賬記錄。'
    }],
    ['confirmCheckbox', {
        KOR: '본인은 해당 거래의 지불금을 받았음을 확인합니다.',
        ENG: 'I confirm that I\'ve already received this transaction payment.',
        CN: '我确认已收到此支付金额',
        HK: '我確認已收到此支付金額'
    }],
    // My Order
    ['OrderNumber', {
        KOR: '거래 번호',
        ENG: 'Order number',
        CN: '订单编码',
        HK: '訂單編碼'
    }],
    ['orderType', {
        KOR: '거래 유형',
        ENG: 'Order type',
        CN: '交易类型',
        HK: '交易類型'
    }],
    ['TotalPrice', {
        KOR: '총 가격',
        ENG: 'Total price',
        CN: '总价格',
        HK: '總價格'
    }],
    ['status', {
        KOR: '상태',
        ENG: 'Status',
        CN: '状态',
        HK: '狀態'
    }],
    ['counterparty', {
        KOR: '거래자',
        ENG: 'Counterparty',
        CN: '交易对象',
        HK: '交易對象'
    }],
    // My Order
    ['MyAds', {
        KOR: '내 광고내역',
        ENG: 'My Ads',
        CN: '我的广告',
        HK: '我的廣告'
    }],
    ['No', {
        KOR: 'No',
        ENG: 'No',
        CN: '号码',
        HK: '號碼'
    }],
    ['adsType', {
        KOR: '광고유형',
        ENG: 'Ads Type',
        CN: '广告类型',
        HK: '廣告類型'
    }],
    ['time', {
        KOR: '시간',
        ENG: 'Time',
        CN: '时间',
        HK: '時間'
    }],
    ['Export', {
        KOR: '내보내기',
        ENG: 'Export',
        CN: '传送',
        HK: '傳送'
    }],
    ['orderFilterPlaceholder', {
        KOR: '주문 날짜 / 상태 / 번호 / 통화',
        ENG: 'Date / Status / Number / Currency',
        CN: '订单日期/状态/编号/币种',
        HK: '訂單日期/狀態/編號/幣種'
    }],
    ['date', {
        KOR: '날짜',
        ENG: 'Date',
        CN: '日期',
        HK: '日期'
    }],
    ['datePickerPlaceholder', {
        KOR: '날짜를 선택해 주십시오',
        ENG: 'Select date',
        CN: '请选择日期',
        HK: '請選擇日期'
    }],
    ['orderStatus', {
        KOR: '주문 상태',
        ENG: 'Order Status',
        CN: '订单现状',
        HK: '訂單現狀'
    }],
    ['unpaid', {
        KOR: '미지불',
        ENG: 'Unpaid',
        CN: '未支付',
        HK: '未支付'
    }],
    ['paid', {
        KOR: '지불',
        ENG: 'Paid',
        CN: '已支付',
        HK: '已支付'
    }],
    ['cancelled', {
        KOR: '취소',
        ENG: 'Cancelled',
        CN: '取消',
        HK: '取消'
    }],
    ['complaining', {
        KOR: '이의제기',
        ENG: 'Complaining',
        CN: '投诉',
        HK: '投訴'
    }],
    ['orderNo', {
        KOR: '주문 번호',
        ENG: 'No.',
        CN: '订单编码',
        HK: '訂單編碼'
    }],
    ['orderNoPlaceholder', {
        KOR: '주문 번호를 입력해 주십시오',
        ENG: 'Enter Order number',
        CN: '请输入订单编码',
        HK: '請輸入訂單編碼'
    }],
    ['orderType', {
        KOR: '주문 종류',
        ENG: 'Order type',
        CN: '交易类型',
        HK: '交易類型'
    }],
    ['general', {
        KOR: '일반',
        ENG: 'General',
        CN: '普通',
        HK: '普通'
    }],
    ['block', {
        KOR: '대량',
        ENG: 'Block',
        CN: '大宗',
        HK: '大宗'
    }],
    ['clear', {
        KOR: '초기화',
        ENG: 'Clear',
        CN: '擦除',
        HK: '擦除'
    }],
    ['noOrders', {
        KOR: '주문 기록이 없습니다',
        ENG: 'No more orders',
        CN: '没有任何交易记录',
        HK: '沒有任何交易記錄'
    }],
    ['chatPlaceholder', {
        KOR: '글 입력 후 엔터키를 눌러주십시오',
        ENG: 'Type in and press enter',
        CN: '填写后请按回车键。',
        HK: '填寫後請按Enter。'
    }],

    //My Ads

    ['adsFilterPlaceholder', {
        KOR: '생성날짜/통화/거래종류/광고번호',
        ENG: 'Date / Currency / Type / Number',
        CN: '创建日期/币种/交易类型/广告号码',
        HK: '創建日期/幣種/交易類型/廣告號碼'
    }],
    ['buySell', {
        KOR: '구입/판매',
        ENG: 'Buy/Sell',
        CN: '购买/出售',
        HK: '購買/出售'
    }],
    ['adsNo', {
        KOR: '광고 번호',
        ENG: 'No.',
        CN: '广告号码',
        HK: '廣告號碼'
    }],
    ['adsNoPlaceholder', {
        KOR: '광고 번호를 입력해 주십시오',
        ENG: 'Please input Ad number',
        CN: '请输入广告号码',
        HK: '請輸入廣告號碼'
    }],
    ['edit', {
        KOR: '수정',
        ENG: 'Edit',
        CN: '修改',
        HK: '修改'
    }],
    ['enable', {
        KOR: '올리기',
        ENG: 'Enable',
        CN: '上架',
        HK: '上架'
    }],
    ['delete', {
        KOR: '삭제',
        ENG: 'Delete',
        CN: '删除',
        HK: '刪除'
    }],
    ['share', {
        KOR: '공유',
        ENG: 'Share',
        CN: '分享',
        HK: '分享'
    }],

    //Balance
    ['Details', {
        KOR: '세부사항',
        ENG: 'Details',
        CN: '细节',
        HK: '細節'
    }],
    ['Transfer', {
        KOR: '이체',
        ENG: 'Transfer',
        CN: '转帐',
        HK: '轉帳'
    }],
    ['Deposit', {
        KOR: '예금',
        ENG: 'Deposit',
        CN: '存款',
        HK: '存款'
    }],
    ['Type', {
        KOR: '종류',
        ENG: 'Type',
        CN: '类型',
        HK: '類型'
    }],
    ['Coin', {
        KOR: '코인',
        ENG: 'Coin',
        CN: '代币',
        HK: '代幣'
    }],
    ['OTC_Account', {
        KOR: 'OTC 계좌',
        ENG: 'OTC Account',
        CN: '法币账户',
        HK: '法幣帳戶'
    }],
    ['Frozen', {
        KOR: '동결 계좌',
        ENG: 'Frozen',
        CN: '冻结账户',
        HK: '凍結帳戶'
    }],
    ['withdraw', {
        KOR: '출금',
        ENG: 'Withdraw',
        CN: '提款',
        HK: '提款'
    }],
    ['Withdraw', {
        KOR: '출금',
        ENG: 'Withdraw',
        CN: '提款',
        HK: '提款'
    }],
    ['Withdrawal', {
        KOR: '출금',
        ENG: 'Withdrawal',
        CN: '提款',
        HK: '提款'
    }],
    ['Address', {
        KOR: '주소',
        ENG: 'Address',
        CN: '地址',
        HK: '地址'
    }],
    ['fee', {
        KOR: '수수료',
        ENG: 'Fee',
        CN: '手续费',
        HK: '手續費'
    }],
    ['limit', {
        KOR: '제한',
        ENG: 'limit',
        CN: '限制',
        HK: '限制'
    }],
    ['tips', {
        KOR: 'Tips',
        ENG: 'Tips',
        CN: '提示',
        HK: '提示'
    }],
    ['Range', {
        KOR: '범위',
        ENG: 'Range',
        CN: '范围',
        HK: '範圍'
    }],
    ['Receive Amount', {
        KOR: '수령액',
        ENG: 'Receive Amount',
        CN: '领取额',
        HK: '領取額'
    }],
    ['Minimum withdrawal amount', {
        KOR: '최소 인출 금액',
        ENG: 'Minimum withdrawal amount',
        CN: '最低提款金额',
        HK: '最低提款金額'
    }],
    ['Withdraw to another wallet', {
        KOR: '다른 지갑으로 인출',
        ENG: 'Withdraw to another wallet',
        CN: '提款至其他钱包',
        HK: '提款至其他錢包'
    }],
    ['withdrawtipsETH1', {
        KOR: '• ICO에 참여하기 위해 ETH를 입금하고 이후 ICO 토큰이 입금 주소로 배포되는 경우, ETH를 출금하면 ICO 토큰을 받을 수 없습니다.',
        ENG: '• If you deposit ETH to participate ICO and ICO tokens will be distributed to your deposit address, ' +
        'Please don\'t withdraw ETH to it or you won\'t get your ICO tokens.',
        CN: '• 若您存款ETH参加ICO，ICO代币将被分发到您的存款地址，请不要提款ETH，否则您将无法获得ICO代币。',
        HK: '• 若您存入ETH參加ICO，ICO代幣將被分發到您的存款地址，請不要提款ETH，否則您將無法獲得ICO代幣。'
    }],
    ['withdrawtipsETH2', {
        KOR: '• 스마트 계약 주소로 출금하면 전송이 실패됩니다.',
        ENG: '• Withdrawal to smart contract address may cause the transfer to fail.',
        CN: '• 提款智能合约地址可能导致转账失败。',
        HK: '• 提款智能合約地址可能導致轉帳失敗。'
    }],
    ['withdrawtipsETH3', {
        KOR: '• 거래를 완료하는 데 필요한 계산 용도 (가스)에 따라 거래 수수료가 고정되어 있지 않습니다.' +
        '인출에 대한 저희 시스템의 가스 한도는 90000입니다. 한 거래에 90000 이상의 가스를 사용하면, 거래가 실패됩니다.' +
        '이후 ALLB는 자산을 ALLB 계정에 수동으로 환불하는 절차를 진행하며, 소요 시간이 길어질 수 있습니다.',
        ENG: '• Transaction fee is not fixed which depends on the computational use (gas) required to complete the transaction. ' +
        'Gas limit on our system for withdrawal is 90000. If the transaction uses more than 90000 gas, the transaction will be failed. ' +
        'ALLB will refund your assets to your ALLB account manually.',
        CN: '• 交易费用不固定，取决于完成交易所需的计算用量（燃气）。 对于提款本系统制定的燃气限制为90000。若交易时使用超过90000然气，交易会失败，本系统手动将退款您的资产。',
        HK: '• 交易費用不固定，取決於完成交易所需的計算用量（瓦斯）。' +
        'ALLB提取的天然氣限制為90000.如果交易使用超過90000瓦斯，交易將失敗。ALLB將手動將您的資產退還給您的ALLB賬戶。 感謝你的理解。'
    }],
    ['withdrawTips1', {
        KOR: '보안상의 이유로, 보안 설정을 변경하고 비밀번호를 변경하고 새로운 인출 주소를 사용할 때 인출 사실을 직접 검토합니다. 직원의 전화 혹은 이메일을 기다려주십시오.',
        ENG: '• For security reasons, when you change security settings, change password and use new withdraw address, ' +
        'we will manually review your withdrawal. Please wait for phone calls or emails from our staff.',
        CN: '• 出于安全原因，当您更改安全设置，更改密码并使用新的提款地址时，我们将手动审核您的提款。 请等待客服电话或电子邮箱的回复。',
        HK: '• 出於安全原因，當您更改安全設置，更改密碼並使用新的提款地址時，我們將手動審核您的提款。 請等待工作人員的電話或電子郵件回復。'
    }],
    ['withdrawTips2', {
        KOR: '• 컴퓨터와 브라우저가 안전하고 정보가 변조되거나 유출되지 않도록하십시오.',
        ENG: '• Please make sure that your computer and browser are secure ' +
        'and your information is protected from being tampered or leaked.',
        CN: '• 请确保您的电脑和浏览器安全，并保护您的信息不被篡改或泄露。',
        HK: '• 請確保您的電腦和瀏覽器安全，並保護您的信息不被篡改或泄露。'
    }],
    ['All', {
        KOR: '전액',
        ENG: 'All',
        CN: '所有',
        HK: '所有'
    }],
    ['TransferNow', {
        KOR: '전환하기',
        ENG: 'Transfer Now',
        CN: '转账',
        HK: '轉帳'
    }],
    ['Deposit_Address', {
        KOR: '예금 주소',
        ENG: 'Deposit Address',
        CN: '存款地址',
        HK: '存款地址'
    }],
    ['Or_scan_this_QR_code', {
        KOR: '또는 위의 QR 코드를 스캔하세요',
        ENG: 'Or scan this QR code',
        CN: '或扫描此二维码',
        HK: '或掃描此QR code'
    }],
    ['BalanceDepositExplain1-1', {
        KOR: '• 위 주소에 ',
        ENG: '• Please don\'t deposit any other digital assets except',
        CN: '• 请不要存入',
        HK: '• 請不要存入'
    }],
    ['BalanceDepositExplain1-2', {
        KOR: '를 제외한 다른 디지털 자산을 예치하지 마십시오.',
        ENG: 'to the above address.',
        CN: '例外的任何数字资产。',
        HK: '例外的任何數字資產。'
    }],
    ['BalanceDepositExplain2', {
        KOR: '• 위 주소로 입금하려면 전체 네트워크를 확인해야합니다. ' +
        '6 번의 확인 후에 도착할 것입니다. 일반적으로 약 10 ~ 60 분이 소요됩니다.',
        ENG: '• Depositing to the above address requires confirmations of the entire network. It will arrive ' +
        'after 6 confirmations. It will take about 10 to 60 mins usually.',
        CN: '• 为了将账款汇入上述的地址，需要全面性地确认网路状态。确认 6 次后转帐即可完成。通常需要 10~60 分钟。',
        HK: '• 爲了將帳款匯入上述的地址，需要全面性地確認網路狀態。確認 6 次後轉帳即可完成。通常需要 10~60 分鐘。'
    }],
    ['BalanceDepositExplain3-1', {
        KOR: '• 최소 입금액 :',
        ENG: '• Minimum deposit amount:',
        CN: '• 最低存款金额：',
        HK: '• 最低存款金額：'
    }],
    ['BalanceDepositExplain3-2', {
        KOR: '다음의 값보다 적게 적립되지 않습니다',
        ENG: 'It won\'t be credited less than',
        CN: '价格不会低于',
        HK: '價格不會低於'
    }],
    ['BalanceDepositExplain4', {
        KOR: '• 귀하의 입금 주소는 변경되지 않습니다. ' +
        '모든 변경사항을, 당신의 공지 또는 이메일로 알려드립니다.',
        ENG: '• Your deposit address won\'t be changed frequently.' +
        'Any changes, we will inform you by announcement or email.',
        CN: '• 您的存款地址不会更改。如有任何更改，我们将通过公告或电子邮箱通知您。',
        HK: '• 您的匯入地址不會更改。若有任何更改，我們將通過公告或Email通知您。'
    }],
    ['BalanceDepositExplain5', {
        KOR: '• 컴퓨터와 브라우저의 보안을 유지하시고, 귀하의 정보가 변조되거나 유출되지 않도록 하십시오.',
        ENG: '• Please make sure that your computer and browser are secure ' +
        'and your information is protected from being tampered or leaked.',
        CN: '• 请确保您的电脑与浏览器安全，并保护您的信息不被篡改或泄露。',
        HK: '• 請確保您的電腦與瀏覽器安全，並保護您的信息不被篡改或泄露。'
    }],
    ['balanceDetailsFilterPlaceholder', {
        KOR: '날짜 / 타입 / 코인',
        ENG: 'Time/Type/Coin',
        CN: '订单日期/状态/编号/币种',
        HK: '訂單日期/狀態/編號/幣類'
    }],
    ['Exchange_Account', {
        KOR: '교환 계좌',
        ENG: 'Exchange Account',
        CN: '交换账户',
        HK: '交換帳戶'
    }],
    ['Please_select_date', {
        KOR: '날짜를 선택하세요',
        ENG: 'Select date',
        CN: '请选择日期',
        HK: '請選擇日期'
    }],
    ['clear', {
        KOR: '초기화',
        ENG: 'Clear',
        CN: '删除所有',
        HK: '刪除所有'
    }],
    ['Date', {
        KOR: '날짜',
        ENG: 'Date',
        CN: '日期',
        HK: '日期'
    }],
    ['Estimated_Value', {
        KOR: '예상 금액',
        ENG: 'Estimated Value',
        CN: '总资产折合',
        HK: '总資產折合'
    }],
    ['Security_Deposit', {
        KOR: '보증금',
        ENG: 'Security Deposit',
        CN: '保证金',
        HK: '保證金'
    }],
    ['Tag', {
        KOR: '태그',
        ENG: 'Tag',
        CN: '标签',
        HK: '標籤'
    }],
    ['action', {
        KOR: '동작',
        ENG: 'Action',
        CN: '操作',
        HK: '操作'
    }],
    ['TxID', {
        KOR: 'TxID',
        ENG: 'TxID',
        CN: 'TxID',
        HK: 'TxID'
    }],
    ['Processing Time', {
        KOR: '처리 시간',
        ENG: 'Processing Time',
        CN: '处理时间',
        HK: '處理時間'
    }],
    ['Enter the number you want to trade', {
        KOR: '거래하고자 하는 양을 입력하십시오.',
        ENG: 'Enter the number you want to trade',
        CN: '输入您要交易的数字',
        HK: '輸入您要交易的數字'
    }],
    ['start', {
        KOR: '시작',
        ENG: 'Start',
        CN: '开始',
        HK: '開始'
    }],
    ['end', {
        KOR: '끝',
        ENG: 'End',
        CN: '结束',
        HK: '結束'
    }],
    ['Are you sure to delete this ad?', {
        KOR: '이 광고를 삭제 하시겠습니까?',
        ENG: 'Are you sure to delete this ad?',
        CN: '您确定要删除此广告吗？',
        HK: '您確定要刪除此廣告嗎？'
    }],


    //UserPage
    ['Premium merchant', {
        KOR: '프리미엄등급자',
        ENG: 'Premium merchant',
        CN: '高级商家',
        HK: '高級商家'
    }],
    ['Certified merchant', {
        KOR: '인증등급자',
        ENG: 'Certified merchant',
        CN: '已验证商家',
        HK: '已驗證商家'
    }],
    ['Phone', {
        KOR: '휴대폰',
        ENG: 'Phone',
        CN: '手机',
        HK: '手機'
    }],
    ['ID_Verification', {
        KOR: 'ID 인증',
        ENG: 'ID Verification',
        CN: 'ID验证',
        HK: 'ID驗證'
    }],
    ['Advanced_Verification', {
        KOR: '상위 인증',
        ENG: 'Advanced Verification',
        CN: '高级验证',
        HK: '高級驗證'
    }],
    ['Online_Sell', {
        KOR: '온라인 판매',
        ENG: 'Online Sell',
        CN: '在线出售',
        HK: '在綫出售'
    }],
    ['Online_Buy', {
        KOR: '온라인 구매',
        ENG: 'Online Buy',
        CN: '在线购买',
        HK: '在綫購買'
    }],
    ['Do_not_want_to_trade_with_this_user?', {
        KOR: '이 사용자와 거래를 막으시겠습니까?',
        ENG: 'Do not want to trade with this user?',
        CN: '阻止与此用户交易吗？',
        HK: '阻止與此用戶交易嗎？'
    }],
    ['Block_this_user', {
        KOR: '사용자 차단',
        ENG: 'Block this user',
        CN: '阻止此用户',
        HK: '阻止此用戶'
    }],
    ['Block_user_explain', {
        KOR: '이 사용자는 차단 한 후에 귀하의 광고에 액세스하거나 거래 할 수 없습니다. 진행하시겠습니까?',
        ENG: 'This user cannot access your ads or trade with you\n' +
        ' once you have blocked him or her. Are your sure?',
        CN: '一旦您阻止此用户，此用户将无法访问您的广告或与您进行交易。您确定要进行吗？',
        HK: '一但您阻止此用戶，此用戶將無法訪問您的廣告或與您進行交易。您確定要進行嗎？'
    }],
    ['Notice', {
        KOR: '주의사항',
        ENG: 'Notice',
        CN: '注意',
        HK: '注意'
    }],
    ['Completion_rate', {
        KOR: '거래성공률',
        ENG: 'Completion rate',
        CN: '交易完成率',
        HK: '交易完成率'
    }],
    ['Times', {
        KOR: '번',
        ENG: 'Times',
        CN: '次',
        HK: '次'
    }],
    ['Trades', {
        KOR: '총 거래횟수',
        ENG: 'Trades',
        CN: '总交易量',
        HK: '總交易量'
    }],
    ['Trades_in_30_days', {
        KOR: '30일간 거래횟수',
        ENG: 'Trades in 30 days',
        CN: '30天内交易量',
        HK: '30天内交易量'
    }],
    ['Avg_release', {
        KOR: '평균 릴리즈',
        ENG: 'Avg release',
        CN: '平均放行',
        HK: '平均放行'
    }],
    ['Trades', {
        KOR: '총 거래횟수',
        ENG: 'Trades',
        CN: '总交易量',
        HK: '總交易量'
    }],
    ['min', {
        KOR: '분',
        ENG: 'Min',
        CN: '分钟',
        HK: '分鐘'
    }],
    ['sec', {
        KOR: '초',
        ENG: 'Sec',
        CN: '秒',
        HK: '秒'
    }],

    //My page
    ['trades', {
        KOR: '거래 수',
        ENG: 'Trades',
        CN: '交易量',
        HK: '交易量'
    }],
    ['times', {
        KOR: '번',
        ENG: 'Times',
        CN: '次',
        HK: '次'
    }],
    ['avgRelease', {
        KOR: '평균 릴리즈',
        ENG: 'Avg Release',
        CN: '平均放行',
        HK: '平均放行'
    }],
    ['accountCreatedTime', {
        KOR: '계정생성일',
        ENG: 'Account created at',
        CN: '账户注册日期',
        HK: '帳戶注冊日期'
    }],
    ['noRecord', {
        KOR: '거래 내역 없음',
        ENG: 'No record of transactions',
        CN: '无交易内容',
        HK: '無交易内容'
    }],
    ['accountSecurity', {
        KOR: '계정 및 보안',
        ENG: 'Account & Security',
        CN: '账户与安全',
        HK: '帳戶與安全'
    }],
    ['securityLevel', {
        KOR: '보안 등급',
        ENG: 'Security Level',
        CN: '安全等级',
        HK: '安全等級'
    }],
    ['securityExplain', {
        KOR: '이중 인증 연동을 강력히 추천합니다.',
        ENG: 'Using two-factor authentication is highly recommended.',
        CN: '我们强烈建议您完成双重验证。',
        HK: '我們强烈建議您完成雙重驗證。'
    }],
    ['emailSecurityExplain', {
        KOR: '이메일은 본 계정을 관리하는 동안 인출, 암호 찾기, 보안 설정 변경 및 인증에 사용됩니다.',
        ENG: 'Your Email would be used to withdraw, retrieve password, change security settings and verify while managing your account.',
        CN: '绑定的电子邮箱将用于提款、找回密码、更改安全设置以及验证服务。',
        HK: '綁定的Email將用於提款、找回密碼、更改安全設置以及驗證服務。'
    }],
    ['phoneSecurityExplain', {
        KOR: '휴대폰은 본 계정을 관리하는 동안 인출, 암호 찾기, 보안 설정 변경 및 인증에 사용됩니다.',
        ENG: 'Your phone would be used to withdraw, retrieve password, change security settings and verify while managing your account.',
        CN: '绑定的手机号码用于提款、找回密码、更改安全设置以及验证服务。',
        HK: '綁定的手機號碼用於提款、找回密碼、更改安全設定以及驗證服務。'
    }],
    ['phone', {
        KOR: '휴대폰',
        ENG: 'Phone',
        CN: '手机',
        HK: '手機'
    }],
    ['account', {
        KOR: '계정',
        ENG: 'Account',
        CN: '账户',
        HK: '帳戶'
    }],
    ['idVerification', {
        KOR: '신분 인증',
        ENG: 'ID Verification',
        CN: '身份认证',
        HK: 'ID驗證'
    }],
    ['idVerificationExplain', {
        KOR: '최초 신분증 인증 후, 바꿀 수 없습니다.',
        ENG: 'Once ID verification is completed, you can\'t change to any other ID.',
        CN: '一旦完成身份证验证，将无法更改',
        HK: '一旦完成身份證驗證，將無法更改'
    }],
    ['advancedVerification', {
        KOR: '고급 인증',
        ENG: 'Advanced Verification',
        CN: '高级验证',
        HK: '高級驗證'
    }],
    ['paymentMethodExplain', {
        KOR: '보안상의 이유로 본인 계정만 허용됩니다. 사용 가능한 결제 수단은 구매자에게 최대 3개까지 표시됩니다.',
        ENG: 'For security reasons, only can use your own payment accounts. Available payment methods will be shown to the buyer 3 at most.',
        CN: '为了保障账户安全，只能用本人的支付账户。对方最多只能看到3种支付方式。',
        HK: '爲了保障帳戶安全，只能用本人的支付帳戶。對方最多只能看到3種支付方式。'
    }],
    ['nullPaymentMethod', {
        KOR: '등록된 결제수단 없음',
        ENG: 'No registered payment methods found',
        CN: '没有注册的支付方式',
        HK: '沒有注冊的支付方式'
    }],
    ['noMoreRecords', {
        KOR: '기록 없음',
        ENG: 'No records',
        CN: '无记录',
        HK: '無記錄'
    }],
    ['modify', {
        KOR: '수정하기',
        ENG: 'Modify',
        CN: '更改',
        HK: '修改'
    }],
    ['addPayment', {
        KOR: '새로운 결제수단 추가',
        ENG: 'Add a new payment method',
        CN: '点击添加支付方式',
        HK: '點擊添加支付方式'
    }],
    ['blockList', {
        KOR: '차단 리스트',
        ENG: 'Block List',
        CN: '黑名单',
        HK: '黑名單'
    }],
    ['blockListExplain', {
        KOR: '차단된 이용자는 당신과 거래할 수 없습니다.',
        ENG: 'Users that you blocked will not be able to trade with you',
        CN: '加入黑名单的用户将无法与您进行交易',
        HK: '加入黑名單的用戶將無法與您進行交易'
    }],
    ['history', {
        KOR: '기록',
        ENG: 'History',
        CN: '操作记录',
        HK: '操作記錄'
    }],
    ['securitySettings', {
        KOR: '보안 설정',
        ENG: 'Security Settings',
        CN: '安全设定',
        HK: '安全設定'
    }],
    ['low', {
        KOR: '저',
        ENG: 'Low',
        CN: '低',
        HK: '低'
    }],
    ['medium', {
        KOR: '중',
        ENG: 'Medium',
        CN: '中',
        HK: '中'
    }],
    ['high', {
        KOR: '고',
        ENG: 'High',
        CN: '高',
        HK: '高'
    }],
    ['bound', {
        KOR: '연동됨',
        ENG: 'Bound',
        CN: '绑定',
        HK: '綁定'
    }],
    ['unbound', {
        KOR: '미연동',
        ENG: 'Unbound',
        CN: '未绑定',
        HK: '未綁定'
    }],
    ['turnOff', {
        KOR: '비활성화',
        ENG: 'Turn off',
        CN: '关闭',
        HK: '關閉'
    }],
    ['turnOn', {
        KOR: '활성화',
        ENG: 'Turn On',
        CN: '启用',
        HK: '啓用'
    }],
    ['unverified', {
        KOR: '미인증',
        ENG: 'Unverified',
        CN: '未验证',
        HK: '未驗證'
    }],
    ['reset', {
        KOR: '재설정',
        ENG: 'Reset',
        CN: '重置',
        HK: '重置'
    }],
    ['unblock', {
        KOR: '차단해제',
        ENG: 'Unblock',
        CN: '解除',
        HK: '解除'
    }],
    ['successful', {
        KOR: '성공',
        ENG: 'Successful',
        CN: '成功',
        HK: '成功'
    }],
    ['failed', {
        KOR: '실패',
        ENG: 'Failed',
        CN: '失败',
        HK: '失敗'
    }],
    ['changePhone', {
        KOR: '수정하기',
        ENG: 'Change',
        CN: '更改',
        HK: '更改'
    }],
    ['paymentMethodSelectboxPlaceholder', {
        KOR: '결제수단을 선택하여 주십시오',
        ENG: 'Choose a payment method',
        CN: '请选择支付方式',
        HK: '請選擇支付方式'
    }],
    ['namePlaceholder', {
        KOR: '당신의 실제 이름을 입력해 주십시오',
        ENG: 'Enter your real name',
        CN: '请输入您的实名',
        HK: '請輸入您的實名'
    }],
    ['name', {
        KOR: '성명',
        ENG: 'Name',
        CN: '姓名',
        HK: '姓名'
    }],
    ['realName', {
        KOR: '실명',
        ENG: 'Real Name',
        CN: '实名',
        HK: '實名'
    }],
    ['alipayPlaceholder', {
        KOR: '알리페이를 입력해 주십시오',
        ENG: 'Input Alipay number',
        CN: '请输入支付宝号码',
        HK: '請輸入支付寶號碼'
    }],
    ['wechatPlaceholder', {
        KOR: '위챗페이를 입력해 주십시오',
        ENG: 'Input Wechat number',
        CN: '请输入微信支付号码',
        HK: '請輸入微信支付號碼'
    }],
    ['bankPlaceholder', {
        KOR: '은행 계좌를 입력해 주십시오',
        ENG: 'Input Bank Account number',
        CN: '请输入银行账户号码',
        HK: '請輸入銀行帳戶號碼'
    }],
    ['qrCode', {
        KOR: 'QR 코드',
        ENG: 'QR Code',
        CN: '二维码',
        HK: 'QR Code'
    }],
    ['alipayQrCodeExplain', {
        KOR: '당신의 알리페이 QR코드 이미지를 업로드 해주십시오 ',
        ENG: 'Upload your Alipay receipt QR code image ',
        CN: '请上传您的支付宝二维码',
        HK: '請上傳您的支付寶QR code'
    }],
    ['wechatQrCodeExplain', {
        KOR: '당신의 위챗페이 QR코드 이미지를 업로드 해주십시오 ',
        ENG: 'Upload your Wechat receipt QR code image ',
        CN: '请上传您的微信支付二维码',
        HK: '請上傳您的微信支付QR code'
    }],
    ['tradePwPlaceholder', {
        KOR: '거래 비밀번호를 입력해 주십시오',
        ENG: 'Enter your trade password',
        CN: '请输入交易密码',
        HK: '請輸入交易密碼'
    }],
    ['bankName', {
        KOR: '은행 이름',
        ENG: 'Bank Name',
        CN: '银行名',
        HK: '銀行名'
    }],
    ['branchInfo', {
        KOR: '지점 정보(선택사항)',
        ENG: 'Branch Info(Optional)',
        CN: '分店信息（选项）',
        HK: '分店信息（選項）'
    }],
    ['bankNamePlaceholder', {
        KOR: '은행 이름을 입력해 주십시오',
        ENG: 'Enter the bank name',
        CN: '请输入银行名',
        HK: '請輸入銀行名'
    }],
    ['branchInfoPlaceholder', {
        KOR: '지점 정보를 입력해 주십시오',
        ENG: 'Enter the branch information',
        CN: '请输入分店信息',
        HK: '請輸入分店信息'
    }],
    ['warning_name', {
        KOR: '이름을 입력해 주십시오.',
        ENG: 'Enter your real name.',
        CN: '请输入您的实名',
        HK: '請輸入您的實名'
    }],
    ['warning_alipay', {
        KOR: '알리페이를 입력해 주십시오.',
        ENG: 'Enter your alipay.',
        CN: '请输入您的支付宝',
        HK: '請輸入您的支付寶'
    }],
    ['warning_wechat', {
        KOR: '위챗을 입력해 주십시오.',
        ENG: 'Enter your wechat.',
        CN: '请输入您的微信',
        HK: '請輸入您的微信'
    }],
    ['warning_bank', {
        KOR: '은행 이름을 입력해 주십시오.',
        ENG: 'Enter bank name.',
        CN: '请输入银行名',
        HK: '請輸入銀行名'
    }],
    ['warning_bank_account', {
        KOR: '은행 계좌를 입력해 주십시오.',
        ENG: 'Enter bank account.',
        CN: '请输入您的银行账户',
        HK: '請輸入您的銀行帳戶'
    }],
    ['changePassword', {
        KOR: '비밀번호 변경',
        ENG: 'Change password',
        CN: '更改密码',
        HK: '更改密碼'
    }],
    ['oldPassword', {
        KOR: '현재 비밀번호',
        ENG: 'Current password',
        CN: '现在密码',
        HK: '現在密碼'
    }],
    ['newPassword', {
        KOR: '새로운 비밀번호',
        ENG: 'New password',
        CN: '更改密码',
        HK: '更改密碼'
    }],
    ['changePasswordExplain', {
        KOR: '비밀번호 변경 시, 24시간 동안 출금할 수 없습니다.',
        ENG: 'Once you change the password, withdrawal will be disabled within 24 hours.',
        CN: '一旦更改您的密码，24小时内将不能提款款项。',
        HK: '一但更改您的密碼，24小時内將不能取款款項。'
    }],
    ['change', {
        KOR: '수정',
        ENG: 'Change',
        CN: '更改',
        HK: '更改'
    }],
    ['warningNewPassword', {
        KOR: '새로운 비밀번호를 입력해 주십시오.',
        ENG: 'Enter new password.',
        CN: '请输入更改密码',
        HK: '請輸入更改密碼'
    }],
    ['warningPasswordCharacters', {
        KOR: '8-20 자',
        ENG: '8-20 characters',
        CN: '8-20位',
        HK: '8-20位'
    }],
    ['warningPasswordNumber', {
        KOR: '숫자만 입력할 수 없습니다',
        ENG: 'Cannot input numbers only',
        CN: '不能只输入数字',
        HK: '不能只輸入數字'
    }],
    ['phoneNumber', {
        KOR: '전화번호',
        ENG: 'Phone Number',
        CN: '电话号码',
        HK: '電話號碼'
    }],
    ['SMSverification', {
        KOR: 'SMS 인증코드',
        ENG: 'SMS verification code',
        CN: '短信验证号码',
        HK: '簡訊驗證號嗎'
    }],
    ['emailVerification', {
        KOR: '이메일 인증코드',
        ENG: 'Email verification code',
        CN: '邮箱验证号码',
        HK: 'Email驗證號碼'
    }],
    ['emailTurnOff', {
        KOR: '이메일 비활성화',
        ENG: 'Turn off Email verification',
        CN: '关闭邮箱验证',
        HK: '關閉Email驗證'
    }],
    ['emailTurnOffExplain', {
        KOR: '이메일 인증이 비활성화 되면, 24시간 동안 출금하실 수 없습니다.',
        ENG: 'The withdrawal will be disabled in next 24 hours once email authentication is turned off.',
        CN: '一旦关闭邮箱验证后，24小时内不能提款。',
        HK: '一但關掉Emali驗證後，24小時内不能提款。'
    }],
    ['linkPhone', {
        KOR: '휴대폰 연동',
        ENG: 'Link mobile phone',
        CN: '绑定手机',
        HK: '綁定手機'
    }],
    ['linkEmail', {
        KOR: '이메일 연동',
        ENG: 'Link email',
        CN: '绑定邮箱',
        HK: '綁定Email'
    }],
    ['bind', {
        KOR: '연동하기',
        ENG: 'Bind',
        CN: '绑定',
        HK: '綁定'
    }],
    ['link', {
        KOR: '연동하기',
        ENG: 'Link',
        CN: '绑定',
        HK: '綁定'
    }],
    ['resetTradePassword', {
        KOR: '거래 비밀번호 초기화',
        ENG: 'Reset Trade Password',
        CN: '重置交易密码',
        HK: '重置交易密碼'
    }],
    ['confirmTradePassword', {
        KOR: '거래 비밀번호 확인',
        ENG: 'Confirm trade password',
        CN: '确认交易密码',
        HK: '確認交易密碼'
    }],
    ['nickNameTradePassword', {
        KOR: '닉네임 & 거래 비밀번호',
        ENG: 'Nickname & Trade Password',
        CN: '昵称与交易密码',
        HK: '昵稱與交易密碼'
    }],
    ['nickNameExplain', {
        KOR: '안전을 위하여 하기 거래 정보를 모두 입력해 주시기 바랍니다.',
        ENG: 'For safety reasons, please complete the transaction information',
        CN: '为了账户安全，请填写一下交易信息。',
        HK: '爲了帳戶安全，請填寫一下交易信息。'
    }],
    ['newTradePassword', {
        KOR: '새로운 거래 비밀번호',
        ENG: 'New Trade Password',
        CN: '更改交易密码',
        HK: '更改交易密碼'
    }],
    ['nickName', {
        KOR: '닉네임',
        ENG: 'Nickname',
        CN: '昵称',
        HK: '昵稱'
    }],
    ['nickNamePlaceholder', {
        KOR: '실명을 입력하지 마십시오. 변경할 수 없습니다.',
        ENG: 'Do not use your real name, cannot be changed',
        CN: '请不要更改实名，无法更改',
        HK: '請不要更改實名，無法更改'
    }],
    ['warning_nick_name', {
        KOR: '닉네임을 입력해 주십시오.',
        ENG: 'Enter you nickname.',
        CN: '请设定昵称',
        HK: '請設定昵稱'
    }],
    ['nickNameTradePasswordPlaceholder', {
        KOR: '당신의 자산을 보호해줍니다.',
        ENG: 'To protect your asset',
        CN: '为了保护您的资产，请设定您的交易密码',
        HK: '爲了保護您的資產，請設定您的交易密碼'
    }],
    ['nickNameConfirmPasswordPlaceholder', {
        KOR: '거래 비밀번호를 다시 한번 입력해 주십시오',
        ENG: 'Please put your trade password again',
        CN: '请再输入您的交易密码',
        HK: '請再輸入您的交易密碼'
    }],
    ['timerExplain1', {
        KOR: '재시도',
        ENG: 'Retry after',
        CN: '请重试',
        HK: '請重試'
    }],
    ['timerExplain2', {
        KOR: '초 후에 재시도 해주십시오',
        ENG: 'seconds',
        CN: '秒后',
        HK: '秒後'
    }],
    //    Merchant
    ['Apply to be Merchant', {
        KOR: '판매자 신청',
        ENG: 'Apply Merchant',
        CN: '申请成为商家',
        HK: '申請成爲商家'
    }],
    ['Advertising', {
        KOR: '광고',
        ENG: 'Advertising',
        CN: '广告',
        HK: '廣告'
    }],
    ['Merchants are able to post advertisements, flexible and convenient to trade.', {
        KOR: '판매자는 광고를 게시할 수 있으며, 유연하고 편리하게 거래할 수 있습니다.',
        ENG: 'Merchants are able to post advertisements, flexible and convenient to trade.',
        CN: '商家可发布广告，提高交易的灵活性。',
        HK: '商家可發布廣告，提高交易的靈活性。'
    }],
    ['Exclusive logo', {
        KOR: '독점 로고',
        ENG: 'Exclusive logo',
        CN: '独家标志',
        HK: '獨家標志'
    }],
    ['Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.', {
        KOR: '확인된 판매자는 신뢰도와 신뢰성을 높이기 위해 독점 로고를 보유하게 됩니다.',
        ENG: 'Verified merchants will have an exclusive logo to enhance reliability and trustworthiness.',
        CN: '经过验证的商家将拥有独家徽标，提高商家的真实性和诚信度。',
        HK: '經過驗證的商家將擁有獨家徽標，提高商家的真實性和誠信度。'
    }],
    ['One-to-one Service', {
        KOR: '일대일 서비스',
        ENG: 'One-to-one Service',
        CN: '面对面服务',
        HK: '面對面服務'
    }],
    ['Merchants will enjoy our one-to-one exclusive service.', {
        KOR: '판매자들은 저희의 일대일 전용 서비스를 즐길 수 있습니다.',
        ENG: 'Merchants are able to use our one-to-one exclusive service.',
        CN: '商家可享受面对面专属服务。',
        HK: '商家可享受面對面專屬服務。'
    }],
    ['OTC Trading Terms and Conditions', {
        KOR: 'OTC 거래 조건',
        ENG: 'OTC Trading Terms and Conditions',
        CN: '场外交易规则',
        HK: '場外交易規則'
    }],
    ['ApplyNow', {
        KOR: '지금 신청',
        ENG: 'Apply Now',
        CN: '立刻申请',
        HK: '立刻申請'
    }],
    ['First Name', {
        KOR: '이름',
        ENG: 'First Name',
        CN: '名字',
        HK: '名字'
    }],
    ['Last Name', {
        KOR: '성',
        ENG: 'Last Name',
        CN: '姓',
        HK: '姓'
    }],
    ['Identification Number', {
        KOR: '식별 번호',
        ENG: 'Identification Number',
        CN: '身份证号码',
        HK: '身份證號碼'
    }],
    ['e.g. Passport, ID or Driver\'s License', {
        KOR: '예 : 여권, 신분증 또는 운전 면허증',
        ENG: 'e.g. Passport, ID or Driver\'s License',
        CN: '例如：护照、身份证或驾驶执照',
        HK: '例如：護照、身份證或駕駛執照 '
    }],
    ['Upload photo of identification', {
        KOR: '신분증 사진 업로드',
        ENG: 'Upload photo of identification',
        CN: '上传身份证照片',
        HK: '上傳身份證照片'
    }],
    ['Your application is under review', {
        KOR: '신청서를 검토 중입니다.',
        ENG: 'Your application is under review',
        CN: '交易申请正在审核中',
        HK: '交易申請正在審核中'
    }],
    ['Authentication has been successfully submitted.', {
        KOR: '인증이 성공적으로 신청되었습니다.',
        ENG: 'Authentication has been successfully submitted.',
        CN: '身份验证已成功提交。',
        HK: '身份驗證已成功提交。'
    }],
    ['We will complete the review within 2 working days', {
        KOR: '2 영업일 이내에 검토를 완료하겠습니다.',
        ENG: 'We will complete the review within 2 working days',
        CN: '我们将在2天工作日内完成审核',
        HK: '我們將在2天工作日內完成審核'
    }],
    ['Please enter your first name', {
        KOR: '이름을 입력하십시오',
        ENG: 'Please enter your first name',
        CN: '请输入您的名字',
        HK: '請輸入您的名字'
    }],
    ['Please enter your last name', {
        KOR: '당신의 성을 입력하세요',
        ENG: 'Please enter your last name',
        CN: '请输入您的姓氏',
        HK: '請輸入您的姓氏'
    }],
    ['Please enter your passport number', {
        KOR: '여권 번호를 입력하십시오.',
        ENG: 'Please enter your passport number',
        CN: '请输入您的护照号码',
        HK: '請輸入您的護照號碼'
    }],
    ['Done', {
        KOR: '확인',
        ENG: 'Done',
        CN: '完成',
        HK: '完成'
    }],
    ['Your application is under review.', {
        KOR: '귀하의 신청서를 검토 중입니다.',
        ENG: 'Your application is under review.',
        CN: '您的申请正在审核中。',
        HK: '您的申請正在審核中'
    }],
    ['Your application has been successfully submitted. We will complete the review within 2 working days.', {
        KOR: '신청서가 성공적으로 제출되었습니다. 2일 이내에 ' +
        '검토를 완료할 것입니다.',
        ENG: 'Your application has been successfully submitted. We will complete the review within 2 working days.',
        CN: '您的申请已成功提交。我们将在2天工作日内完成审核。',
        HK: '您的申請已成功提交。我們將在2天工作日內完成審核。'
    }],
    ['OTC Merchant application is approved.', {
        KOR: 'OTC 판매자 신청이 승인되었습니다.',
        ENG: 'OTC Merchant application is approved.',
        CN: '场外交易商家申请成功',
        HK: '場外交易商家申請成功'
    }],
    ['Your Merchant application has been successfully approved. You can post advertisement in AllB OTC!', {
        KOR: '귀하의 판매자 신청이 성공적으로 등록되었습니다. AllB OTC에서 광고를 등록할 수 있습니다!',
        ENG: 'Your Merchant application has been successfully approved. You can post advertisement in AllB OTC!',
        CN: '您的商家申请成功了。您可以在埃尔比场外交易所发广告！',
        HK: '您的商家申請成功了。您可以在埃爾比場外交易所發廣告！'
    }],

    ['Photo of Identification', {
        KOR: '신분증 사진',
        ENG: 'Photo of Identification',
        CN: '身份证照片',
        HK: '身份證照片'
    }],
    ['Upload photo of identification', {
        KOR: '신분증 사진 업로드',
        ENG: 'Upload photo of identification',
        CN: '上传身份证照片',
        HK: '上傳身份證照片'
    }],

    //404 페이지
    ['pageNotFound', {
        KOR: '요청하신 페이지를 찾을 수 없습니다. 나중에 다시 시도해 주십시오.',
        ENG: 'The page you are trying to reach is not available at the moment. Please try again later.',
        CN: '无法显示您所需要的网页。稍后请再试。',
        HK: '無法顯示您所需要的網頁。稍後請再試。'
    }],
    ['pageNotFoundBtn', {
        KOR: '거래소로 이동',
        ENG: 'Back to trading list',
        CN: '返回交易所网页',
        HK: '返回交易所網頁'
    }],

    //no more ads
    ['No more ads', {
        KOR: '해당 광고가 없습니다.',
        ENG: 'No more ads',
        CN: '没有更多广告',
        HK: '沒有更多廣告'
    }],

    //alert
    ['401', {
        KOR: '세션이 만료되었습니다.',
        ENG: 'Session has expired.',
        CN: '会话已过期。',
        HK: '會話已過期。'
    }],
    ['Copy', {
        KOR: '복사',
        ENG: 'Copy',
        CN: '复制',
        HK: '複製'
    }],
    ['adPostSuccess', {
        KOR: '생성성공',
        ENG: 'Created successfully',
        CN: '创建成功',
        HK: '創建成功'
    }],
    ['determine', {
        KOR: '결정',
        ENG: 'Determine',
        CN: '确定',
        HK: '確定'
    }],
    ['adPostSuccessExplain', {
        KOR: '광고가 성공적으로 생성 되었습니다.',
        ENG: 'The ad was created successfully.',
        CN: '广告创建成功。',
        HK: '廣告創建成功。'
    }],
    //tradecenter 예외처리문구
    ['Enter less than maximum limit', {
        KOR: '최대 제한액 이하의 값을 입력하세요',
        ENG: 'Enter less than maximum limit',
        CN: '请输入小于最大限制',
        HK: '請輸入小於最大限制'
    }],

    ['Enter more than minimum limit', {
        KOR: '최소 제한액 이상의 값을 입력하세요',
        ENG: 'Enter more than minimum limit',
        CN: '请输入超过最低限额',
        HK: '請輸入超過最低限額'
    }],
    ['Enter less than available', {
        KOR: '교환가능규모 이하의 값을 입력하세요.',
        ENG: 'Enter less than available',
        CN: '请输入少于可用额',
        HK: '請輸入少於可用額'
    }],

    // 180819 이후 추가. 번역 필요함
    ['Ongoing order', {
        KOR: '진행 중인 주문',
        ENG: 'Ongoing order',
        CN: '正在进行订单',
        HK: '正在進行訂單'
    }],
    ['View All', {
        KOR: '모두 보기',
        ENG: 'View All',
        CN: '更多',
        HK: '更多'
    }],
    ['Trade Num', {
        KOR: '거래횟수',
        ENG: 'Trade Num',
        CN: '交易数量',
        HK: '交易數量'
    }],
    ['No more orders', {
        KOR: '주문 없음',
        ENG: 'No more orders',
        CN: '没有更多订单',
        HK: '沒有更多訂單'
    }],
    ['This user cannot access your ads or trade with you cause you have blocked him/her.', {
        KOR: '이 사용자는 차단된 유저로 광고에 액세스하거나 거래 할 수 없습니다.',
        ENG: 'This user cannot access your ads or trade with you, because you have blocked this user.',
        CN: '由于您阻止了，此用户无法访问您的广告或与您进行交易。',
        HK: '由於您阻止了，此用戶無法訪問您的廣告或與您進行交易。'
    }],
    ['Unblock this user', {
        KOR: '사용자 차단 해제',
        ENG: 'Unblock this user',
        CN: '取消阻止此用户',
        HK: '取消阻止此用戶'
    }],
    ['Verification', {
        KOR: '인증',
        ENG: 'Verification',
        CN: '验证',
        HK: '驗證'
    }],
    ['editPayment', {
        KOR: '결제수단 수정',
        ENG: 'Edit a new payment method',
        CN: '更改支付方式',
        HK: '更改支付方式'
    }],
    ['No Online advertisement', {
        KOR: '온라인 광고 없음',
        ENG: 'No Online advertisement',
        CN: '没有在线广告',
        HK: '沒有在線廣告'
    }],
    ['Your certification order has been submitted.', {
        KOR: '주문이 제출되었습니다.',
        ENG: 'Your order has been submitted.',
        CN: '您的验证订单已提交',
        HK: '您的驗證訂單已提交'
    }],
    ['Please wait a minute.', {
        KOR: '잠시만 기다려주세요.',
        ENG: 'Please wait a moment.',
        CN: '请稍后',    //고의적으로 뺌.
        HK: '請稍後'
    }],
    ['No more history', {
        KOR: '기록 없음',
        ENG: 'No more history',
        CN: '无记录',
        HK: '無記錄'
    }],
    ['Please pay', {
        KOR: '지불 시한',
        ENG: 'Please pay',
        CN: '支付时限',
        HK: '支付时限'
    }],
    ['appealReason1', {
        KOR: '상대방이 지불하지 않음',
        ENG: 'The counterparty doesn’t pay',
        CN: '对方无支付',
        HK: '對方無支付'
    }],
    ['appealReason2', {
        KOR: '상대방이 보내주지 않음',
        ENG: 'The counterparty doesn’t release',
        CN: '对方无传送',
        HK: '對方無傳送'
    }],
    ['appealReason3', {
        KOR: '응답 없음',
        ENG: 'No answer',
        CN: '无答应',
        HK: '無答應'
    }],
    ['appealReason4', {
        KOR: '사기',
        ENG: 'Cheating',
        CN: '诈骗',
        HK: '詐騙'
    }],
    ['appealReason5', {
        KOR: '기타',
        ENG: 'Other',
        CN: '其他',
        HK: '其他'
    }],
    ['No Trade Records', {
        KOR: '최근 30일 이내 거래 내역이 없습니다.',
        ENG: 'No Trade Records',
        CN: '没有30日内交易记录',
        HK: '沒有30日内交易記錄'
    }],
    ['unBlockDialogTxt', {
        KOR: '정말로 이 유저의 차단을 해제하시겠습니까?',
        ENG: 'Are you sure to unblock this user?',
        CN: '您确定在黑名单解除此用户吗？',
        HK: '您確定在黑名單解除此用戶嗎？'
    }],
    ['Turn on email authentication', {
        KOR: '이메일 연동',
        ENG: 'Turn on email authentication',
        CN: '绑定电子邮箱',
        HK: '綁定Email'
    }],
    ['turn_off_email', {
        KOR: '이메일 연동 해제',
        ENG: 'Turn off email authentication',
        CN: '解除电子邮箱绑定',
        HK: '解除Email綁定'
    }],
    ['turn_on_sms', {
        KOR: '휴대폰 연동',
        ENG: 'Turn on SMS authentication',
        CN: '绑定手机',
        HK: '綁定手機'
    }],
    ['turn_off_sms', {
        KOR: '휴대폰 연동 해제',
        ENG: 'Turn off SMS authentication',
        CN: '解除绑定手机',
        HK: '解除綁定手機'
    }],
    ['add_video', {
        KOR: '영상 업로드',
        ENG: 'Upload Video',
        CN: '上传视频',
        HK: '上傳視頻'
    }],
    ['update_passport', {
        KOR: '여권 업로드',
        ENG: 'Upload Passport',
        CN: '上传护照',
        HK: '上傳護照'
    }],
    ['update_video', {
        KOR: '영상 변경',
        ENG: 'Update Video',
        CN: '更改视频',
        HK: '更改視頻'
    }],
    ['Add Id verification', {
        KOR: 'ID 인증 등록',
        ENG: 'ID verification',
        CN: '注册身份验证',
        HK: '注冊身份驗證'
    }],
    ['Add Advanced verification', {
        KOR: '고급 인증 등록',
        ENG: 'Advanced verification registered',
        CN: '注册高级验证',
        HK: '注冊高級驗證'
    }],
    ['Update Id', {
        KOR: '아이디 업데이트',
        ENG: 'Update ID',
        CN: '更改ID',
        HK: '更改ID'
    }],
    ['Add phone', {
        KOR: '휴대폰 번호 등록',
        ENG: 'Mobile number registered',
        CN: '注册手机号码',
        HK: '注冊手機號碼'
    }],
    ['인증이 진행 중입니다', {
        KOR: '인증이 진행 중입니다',
        ENG: 'Verifying',
        CN: '正在验证中',
        HK: '正在驗證中'
    }],
    ['sending', {
        KOR: '전송 중...',
        ENG: 'Sending...',
        CN: '传送中...',
        HK: '傳送中...'
    }],
    ['ALLB OTC', {
        KOR: 'ALLB OTC',
        ENG: 'ALLB OTC',
        CN: '埃尔比场外交易',
        HK: '埃爾比場外交易'
    }],
    ['The world\'s leading P2P trading platform', {
        KOR: '최고의 OTC거래 플랫폼',
        ENG: 'The world\'s leading OTC trading platform',
        CN: '世界领先场外交易平台',
        HK: '世界領先場外交易平台'
    }],
    ['Under examination', {
        KOR: '심사중',
        ENG: 'Under examination',
        CN: '审核中',
        HK: '審核中'
    }],
    ['Completed', {
        KOR: '완료됨',
        ENG: 'Completed',
        CN: '处理完成',
        HK: '處理完成'
    }],
    ['Error', {
        KOR: '처리오류',
        ENG: 'Error',
        CN: '处理错误',
        HK: '處理錯誤'
    }],
    ['Return to Balances', {
        KOR: '밸런스로 돌아가기',
        ENG: 'Return to Balances',
        CN: '返回资产',
        HK: '返回資產'
    }],
    ['mobile', {
        KOR: '모바일',
        ENG: 'mobile',
        CN: '手机',
        HK: '手機'
    }],
    ['web', {
        KOR: '웹',
        ENG: 'web',
        CN: '电脑',
        HK: '電腦'
    }],
    ['Via', {
        KOR: 'Via',
        ENG: 'Via',
        CN: '由',
        HK: '由'
    }],
    ['Warning', {
        KOR: '경고',
        ENG: 'Warning',
        CN: '警告',
        HK: '警告'
    }],
    ['Success', {
        KOR: '요청성공',
        ENG: 'Success',
        CN: '邀请成功',
        HK: '邀請成功'
    }],
    ['Error', {
        KOR: '오류',
        ENG: 'Error',
        CN: '错误',
        HK: '錯誤'
    }],
    ['invalid_email_verification_code', {
        KOR: '이메일 인증번호 오류',
        ENG: 'Please input vaild Email verification.',
        CN: '请输入正确的邮箱验证编码',
        HK: '請輸入正確的Email編碼'
    }],
    ['', {
        KOR: '',
        ENG: '',
        CN: '',
        HK: ''
    }],
    ['All Payments', {
        KOR: '모든 결제수단',
        ENG: 'All Payments',
        CN: '所有支付方式',
        HK: '所有支付方式'
    }],
    ['Alipay', {
        KOR: '알리페이',
        ENG: 'Alipay',
        CN: '支付宝',
        HK: '支付寶'
    }],
    ['Wechat', {
        KOR: '위챗페이',
        ENG: 'Wechat',
        CN: '微信支付',
        HK: '微信支付'
    }],
    ['Bank Account', {
        KOR: '은행 계좌',
        ENG: 'Bank account',
        CN: '银行账户',
        HK: '銀行帳戶'
    }],

    ['china', {
        KOR: '중국',
        ENG: 'China',
        CN: '中国',
        HK: '中國'
    }],
    ['singapore', {
        KOR: '싱가포르',
        ENG: 'Singapore',
        CN: '新加坡',
        HK: '新加坡'
    }],
    ['india', {
        KOR: '인도',
        ENG: 'India',
        CN: '印度',
        HK: '印度'
    }],
    ['vietnam', {
        KOR: '베트남',
        ENG: 'Vietnam',
        CN: '越南',
        HK: '越南'
    }],
    ['canada', {
        KOR: '캐나다',
        ENG: 'Canada',
        CN: '加拿大',
        HK: '加拿大'
    }],
    ['australia', {
        KOR: '호주',
        ENG: 'Australia',
        CN: '澳大利亚',
        HK: '澳大利亞'
    }],
    ['korea', {
        KOR: '대한민국',
        ENG: 'Korea',
        CN: '韩国',
        HK: '韓國'
    }],
    ['switzerland', {
        KOR: '스위스',
        ENG: 'Switzerland',
        CN: '瑞士',
        HK: '瑞士'
    }],
    ['netherlands', {
        KOR: '네덜란드',
        ENG: 'Netherlands',
        CN: '荷兰',
        HK: '荷蘭'
    }],
    ['taiwan', {
        KOR: '대만',
        ENG: 'Taiwan',
        CN: '台湾',
        HK: '台灣'
    }],
    ['russia', {
        KOR: '러시아',
        ENG: 'Russia',
        CN: '俄国',
        HK: '俄羅斯'
    }],
    ['uk', {
        KOR: '영국',
        ENG: 'United Kingdom',
        CN: '英国',
        HK: '英國'
    }],
    ['hongkong', {
        KOR: '홍콩',
        ENG: 'Hong Kong',
        CN: '香港',
        HK: '香港'
    }],
    ['nigeria', {
        KOR: '나이지리아',
        ENG: 'Nigeria',
        CN: '尼日利亚',
        HK: '尼日利亞'
    }],
    ['indonesia', {
        KOR: '인도네시아',
        ENG: 'Indonesia',
        CN: '印度尼西亚',
        HK: '印度尼西亞'
    }],
    ['philippines', {
        KOR: '필리핀',
        ENG: 'Philippines',
        CN: '菲律宾',
        HK: '菲律賓'
    }],
    ['cambodia', {
        KOR: '캄보디아',
        ENG: 'Cambodia',
        CN: '柬埔寨',
        HK: '柬埔寨'
    }],
    ['allCountries', {
        KOR: '모든 국가',
        ENG: 'All countries',
        CN: '所有国家',
        HK: '所有國家'
    }],
    ['allPayment', {
        KOR: '모든 결제수단',
        ENG: 'All Payments',
        CN: '所有支付方式',
        HK: '所有支付方式'
    }],
    ['landingSubject_1', {
        KOR: '안전, 신뢰',
        ENG: 'Safe and Reliable',
        CN: '安全、可靠',
        HK: '安全、信賴'
    }],
    ['landingContents_1', {
        KOR: '신뢰도 높은 본 플랫폼이 안전하게 디지털 자산을 위탁 및 전달합니다. 또한 모든 판매자들은 안전한 거래를 위한 보증금을 이미 지불하였습니다.',
        ENG: 'Platform reliably escrow digital assets while transactions processing, merchants completely paid deposits for safer transactions.',
        CN: '安全、可信任的数字资产托管平台，为您提供更安全的交易环境。',
        HK: '安全、可信任的數字資產托管平台，為您提供更安全的交易環境。'
    }],
    ['landingSubject_2', {
        KOR: '빠른 거래',
        ENG: 'Rapid transaction',
        CN: '快速交易',
        HK: '快速交易'
    }],
    ['landingContents_2', {
        KOR: '빠른 속도, 다운타임 없는 시스템 안정성을 제공합니다. ',
        ENG: 'Providing fast speed, system stability without downtime.',
        CN: '提供更快速度、没有系统瘫痪的稳定性。',
        HK: '提供更快速度、沒有系統癱瘓的穩定性。'
    }],
    ['landingSubject_3', {
        KOR: '365일, 24시간 고객서비스 운영',
        ENG: '24/7 Customer Support',
        CN: '24小时服务专线',
        HK: '全年無休客服服務'
    }],
    ['landingContents_3', {
        KOR: '365일, 24시간 연중무휴 전문 상담사와 고객서비스 상담을 할 수 있으며, 언제든지 문제 해결이 가능합니다.',
        ENG: '24/7 customer service with professional staff, solving your trade problem in anytime.',
        CN: '全年365天，全天24小时为您提供服务专线。',
        HK: '一年365天、24小時為您提供客服服務。'
    }],
    ['err_needPaymentMethod', {
        KOR: '결제수단이 필요합니다.',
        ENG: 'You need payment methods.',
        CN: '需要添加支付方式',
        HK: '需要添加支付方式'
    }],
    ['BalanceDepositExplainTest', {
        KOR: '• 현재 본 사이트는 테스트 중이므로, 테스트넷을 이용한 입금만 유효합니다. 실제 암호화폐를 넣지 마십시오!',
        ENG: '• Our website is test version. Currently only available to deposit from test-net. Don\'t deposit any actual cryptocurrency!',
        CN: '• 目前本网页在测试，通过测试网存款只有效。请不要存款实际加密火币！',
        HK: '• 目前本網頁在測試，只能用測試網存款有效。請不要存款實際加密貨幣！'
    }],
    ['To apply merchant, you should complete the verification.', {
        KOR: '판매자 신청을 위해서는 인증이 필요합니다.',
        ENG: 'To apply merchant, you should complete the verification.',
        CN: '为了申请商家，您需要完成验证。',
        HK: '爲了申請商家，您需要完成驗證。'
    }],
    ['Please set nickname and verify ID to apply merchant.', {
        KOR: '판매자 신청을 위해, 닉네임 설정과 ID 인증을 완료해주세요.',
        ENG: 'Please set nickname and verify ID to apply merchant.',
        CN: '为了进行商家申请，请设定昵称以及验证ID。',
        HK: '爲了進行商家申請，請設定昵稱以及驗證ID。'
    }],
    ['Nickname Setting', {
        KOR: '닉네임 설정',
        ENG: 'Nickname Setting',
        CN: '设定昵称',
        HK: '設定昵稱'
    }],
    ['', {
        KOR: '',
        ENG: '',
        CN: '',
        HK: ''
    }],
    ['', {
        KOR: '',
        ENG: '',
        CN: '',
        HK: ''
    }],
    ['', {
        KOR: '',
        ENG: '',
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
      setCookie('language', 'zh', 30);
      return Lang.ZH;
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
    return '' + key
  }
}
