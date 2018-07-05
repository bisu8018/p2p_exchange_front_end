import {getCookie, setCookie} from "@/common/common";

const strings = new Map([

  // 버튼
  [ '돌아가기', {
    KOR : '돌아가기',
    ENG: 'Back',
    CN: '返回',
    JP: ''
  }],
  [ '취소하기', {
    KOR : '취소하기',
    ENG: 'Cancel',
    CN: '取消',
    JP: ''
  }],
  [ '취소', {
    KOR : '취소',
    ENG: 'Cancel',
    CN: '取消',
    JP: ''
  }],
  [ '저장하기', {
    KOR : '저장하기',
    ENG: 'Save',
    CN: '保存',
    JP: ''
  }],
  [ '변경하기', {
    KOR : '변경하기',
    ENG: 'Change',
    CN: '变更',
    JP: ''
  }],
  ['생성하기', {
    KOR: '생성하기',
    ENG: 'Create',
    CN: '创建',
    JP: ''
  }],
    ['I agree to the Terms of Service', {
        KOR: '',
        ENG: 'I agree to the Terms of Service',
        CN: '',
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

let currentLang: Lang = Lang.EN;


export function wbGetLang (): Lang {
  return currentLang
}

export function wbSetLang (lang: Lang): void {
  currentLang = lang
}


export function wbString(key: string): string {
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
