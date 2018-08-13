
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