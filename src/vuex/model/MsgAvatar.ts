export default class MsgAvatar {
    email: string;
    nickname: string;
    bgColor: string;
    isLogin: boolean;

    constructor (data: any) {
        this.email = data.email || '';
        this.nickname = data.name || '';
        this.bgColor = data.bgColor || '';
        this.isLogin = data.isLogin || false;
    }

    update (data: any){
        if(data.email !==undefined && data.email !==null) this.email = data.email;
        if(data.nickname !==undefined && data.nickname !==null) this.nickname = data.nickname;
        if(data.isLogin !==undefined && data.isLogin !==null) this.isLogin = data.isLogin;
        if(data.bgColor !==undefined && data.bgColor !==null) this.bgColor = data.bgColor;
    }

    isNull (): boolean {
        return (this.bgColor === undefined || this.bgColor === '')
    }
}