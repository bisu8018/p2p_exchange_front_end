export default class MsgAvatar {
    email: string;
    name: string;
    bgColor: string;
    isLogin: boolean;

    constructor (data: any) {
        this.email = data.email || '';
        this.name = data.name || '';
        this.bgColor = data.bgColor || '';
        this.isLogin = data.isLogin || false;
    }

    update (data: any){
        if(data.email !==undefined && data.email !==null) this.email = data.email;
        if(data.name !==undefined && data.name !==null) this.name = data.name;
        if(data.isLogin !==undefined && data.isLogin !==null) this.isLogin = data.isLogin;
        if(data.bgColor !==undefined && data.bgColor !==null) this.bgColor = data.bgColor;
    }

    isNull (): boolean {
        return (this.bgColor === undefined || this.bgColor === '')
    }
}