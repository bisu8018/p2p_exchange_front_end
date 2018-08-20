export default class PaymentMethod {
    type: string;
    activeYn: boolean;
    ownerName: string;
    bankName: string;
    bankBranchInfo: string;
    bankAccount: string;
    wechatId: string;
    wechatQrCodeImgUrl: string;
    alipayId: string;
    alipayQrCodeImgUrl: string;

    // viewModel
    iconClass: string;
    viewId: string;
    viewQrCodeImgUrl: string;

    constructor(data: any) {
        this.type = data.type || '';
        this.activeYn = data.activeYn ==='y'? true : false;
        this.ownerName = data.ownerName || '';
        this.bankName = data.bankName || '';
        this.bankBranchInfo = data.bankBranchInfo || '';
        this.bankAccount = data.bankAccount || '';
        this.wechatId = data.wechatId || '';
        this.wechatQrCodeImgUrl = data.wechatQrCodeImgUrl || '';
        this.alipayId = data.alipayId || '';
        this.alipayQrCodeImgUrl = data.alipayQrCodeImgUrl || '';

        this.iconClass = data.iconClass || '';
        this.viewId = data.viewId || '';
        this.viewQrCodeImgUrl = data.viewQrCodeImgUrl || '';


        this.checkViewModel();
    }

    checkViewModel() {
        switch (this.type) {
            case 'alipay':
                this.iconClass = 'ic-alipay';
                this.viewId = this.alipayId;
                this.viewQrCodeImgUrl = this.alipayQrCodeImgUrl;
            break;
            case 'wechat':
                this.iconClass ='ic-wechat';
                this.viewId = this.wechatId;
                this.viewQrCodeImgUrl = this.wechatQrCodeImgUrl;
                break;
            default:
                this.iconClass ='ic-bank';
                break;
        }
    }

    isNull(): boolean {
        return (this.type === undefined || this.type === '')
    }
}