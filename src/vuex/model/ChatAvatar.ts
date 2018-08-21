export default class ChatAvatar {
    name: number;
    bgColor: string;
    isLogin: string;

    constructor (data: any) {
        this.name = data.memberNo || '';
        this.bgColor = data.bgColor || '';
        this.isLogin = data.isLogin || false;
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