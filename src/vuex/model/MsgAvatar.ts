export default class MsgAvatar {
    email: string;
    name: string;
    bgColor: string;
    isLogin: boolean;

    constructor (email: string, name: string, bgColor: string, isLogin: boolean) {
        this.email = email;
        this.name = name;
        this.bgColor = bgColor;
        this.isLogin = isLogin;
    }

    update (data: any){
        if(data.isLogin !==undefined && data.isLogin !==null) this.isLogin = data.isLogin;
        if(data.name !==undefined && data.isLogin !==null) this.name = data.name;
        if(data.bgColor !==undefined && data.bgColor !==null) this.bgColor = data.bgColor;
    }

    isNull (): boolean {
        return (this.bgColor === undefined || this.bgColor === '')
    }
}