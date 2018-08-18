export default class LoginHistoryFilter {
    page : number;
    size : number;

    constructor (data: any) {
        this.page = Number(data.page) || 1;
        this.size = data.size || 5;
    }

    update (data: any){
        if(data.page !==undefined && data.page !==null) this.page = data.page;
        if(data.size !==undefined && data.size !==null) this.size = data.size;
    }
}


