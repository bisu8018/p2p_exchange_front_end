
let eventBus: any;
let router: any;

export function setRouter (_router: any) {
  router = _router;
}
export function setEventBus (event: any) {
  eventBus = event
}
export function getEventBus () {
  return eventBus
}


export function getCookie (cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export function setCookie(cname: string, cvalue: string, exdays: number) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function deleteCookie(name) {
    if (getCookie(name)) document.cookie = name + "=" + ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}


export function setTimer() {
    // 1초 마다 Update
    let x = setInterval(function() {

        // Get todays date and time
        let now1 = new Date();
        let countDownDate = new Date(now1.getFullYear() + "-" + (now1.getMonth()+1) + "-" + (now1.getDate() + 1));
        let now = new Date().getTime();

        // Find the distance between now an the count down date
        let distance = countDownDate.getTime() - now;

        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // 결과를 받을 text;
        let timer = '';

        // Display the result in the element with id="demo"
        timer =  hours + "시간 " + minutes + "분 " + seconds + "초";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            timer = "만료 되었을 경우";
        }
    }, 1000);
}


//firefox 동작 안됨
export function doesHttpOnlyCookieExist(cookiename : string) {
    var d = new Date();
    d.setTime(d.getTime() + (1000));
    var expires = "expires=" + d.toUTCString();

    document.cookie = cookiename + "=new_value;path=/;" + expires;
    if (document.cookie.indexOf(cookiename + '=') == -1) {
        return true;
    } else {
        return false;
    }
}