import {getCookie, setCookie} from "@/common/common";

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
    ENG: 'SIGN UP',
    CN: '注册火币',
    JP: ''
  }],
  ['email', {
    KOR: '이메일',
    ENG: 'Email',
    CN: '邮箱',
    JP: ''
  }],
  ['password', {
    KOR: '비밀번호',
    ENG: 'Password',
    CN: '登录密码',
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
    ENG: 'Password Confirm',
    CN: '确认密码',
    JP: ''
  }],
  ['termsLabel', {
    KOR: '이용약관에 동의합니다.',
    ENG: 'I agree to the Terms of Service',
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
    KOR: '회원가입',
    ENG: 'SIGN UP',
    CN: '确定注册',
    JP: ''
  }],
  ['haveAccount', {
    KOR: '이미 계정이 있으십니까 ?',
    ENG: 'Already have an account ?',
    CN: '已有账号 ?',
    JP: ''
  }],
  ['loginText', {
    KOR: '로그인',
    ENG: 'LOG IN',
    CN: '立即登录',
    JP: ''
  }],

  //login
  ['welcome', {
    KOR: '환영합니다 Welcome 欢迎登录',
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
    CN: '请证明滑动条',
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

let currentLang: Lang = Lang.KO;


export function abGetLang (): Lang {
  return currentLang
}

export function abSetLang (lang: Lang): void {
  currentLang = lang
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
