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
        ENG: '8 to 20 characters with a mix of letters and numbers',
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

let currentLang: Lang = Lang.EN;
// let currentLang: Lang = checkLocale();


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
