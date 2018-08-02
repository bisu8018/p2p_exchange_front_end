export var abUtils = {
  // 정수형인지
  isNaturalNumber: function (number: any) {
    let regExp = /^\d*$/;
    return regExp.test(String(number));
  },
  // 정수형인지
  isInteger: function (number: any) {
    let regExp = /^[+-]?\d*$/;
    return regExp.test(String(number));
  },
  // 실수형 (소숫점) 인지
  isDouble: function (number: any) {
    let regExp = /^[+-]?\d*(\.?\d*)$/;
    return regExp.test(String(number));
  },
  // 숫자 (소수점 포함) 인지
  isNumber: function (number: any) {
    let regExp = /^[-]?\d+(?:[.]\d+)?$/;
    return regExp.test(number);
  },
  // 휴대폰 번호
  isPhone: function (number: any) {
    let regExp = /^\d{3}-\d{3,4}-\d{4}$/;
    let regExp2 = /^\d{3}\d{3,4}\d{4}$/;
    return regExp.test(number) || regExp2.test(number);
  },
  // 아이디
  isEmail: function (email: any) {
    let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
  },
  // 비밀번호
  isPasswd: function (passwd: any) {
    let pw = passwd;
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if(pw.length < 8 || pw.length > 20){
      return false;
    }
    // 공백 체크
    if(pw.search(/₩s/) != -1){
      return false;
    }
    // 영문/숫자/특수문자 중 택2
    // if ( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
    //   return false;
    // }
    // 영문/숫자/특수문자 필수
     if (num < 0 || eng < 0 || spe < 0){
       return false;
     }
    return true;
  },
  // 비밀번호 (길이체크 X)
  isPasswd_ignoreLength: function (passwd: any) {
    let pw = passwd;
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    // 공백 체크
    if(pw.search(/₩s/) != -1){
      return false;
    }

    // 영문/숫자/특수문자 필수
     if (num < 0 || eng < 0 || spe < 0){
       return false;
     }
    return true;
  },

  // 날짜
  isDate: function (input: any) {
    let regExp = /^(20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    return regExp.test(input);
  },
  isDateWithTime: function (input: any) {
    let regExp = /^(20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    let regExp2 = /^(20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    return regExp.test(input) || regExp2.test(input);
  },
  isEmpty: function (value: any) {
    return ( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) )
  },
  toMoneyFormat: function(amount: string): string {
    amount = amount || '';
    let parts = amount.split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
  },
  toDeleteZero: function (amount: string): string {
    amount = amount || '';
    return amount.replace(/(^0+)/, "");
  }
};

