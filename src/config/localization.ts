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
  ['AcceptConditions', {
    KOR: '이용약관에 동의해 주십시오.',
    ENG: 'Please accept the terms and conditions.',
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
