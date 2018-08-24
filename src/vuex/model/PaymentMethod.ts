export default class PaymentMethod {
    activeYn: string;
    alipayId: string;
    alipayQrCodeImgUrl: string;
    bankAccount: string;
    bankBranchInfo: string;
    bankName: string;
    memberNo: number;
    modifyDatetime: number;
    modifyMemberNo: number;
    ownerName: string;
    registerDatetime: number;
    registerMemberNo: number;
    type: string;
    wechatId: string;
    wechatQrCodeImgUrl: string;

    // viewModel
    iconClass: string;

    constructor(data: any) {
        this.activeYn = data.activeYn || 'y';
        this.alipayId = data.alipayId || '';
        this.alipayQrCodeImgUrl = data.alipayQrCodeImgUrl || '';
        this.bankAccount = data.bankAccount || '';
        this.bankBranchInfo = data.bankBranchInfo || '';
        this.bankName = data.bankName || '';
        this.memberNo = data.memberNo || null;
        this.modifyDatetime = data.modifyDatetime || null;
        this.modifyMemberNo = data.modifyMemberNo || null;
        this.ownerName = data.ownerName || '';
        this.registerDatetime = data.registerDatetime || null;
        this.registerMemberNo = data.registerMemberNo || null;
        this.type = data.type || '';
        this.wechatId = data.wechatId || '';
        this.wechatQrCodeImgUrl = data.wechatQrCodeImgUrl || '';

        this.iconClass = data.iconClass;

        this.checkViewModel();
    }

    checkViewModel() {
        switch (this.type) {
            case 'alipay':
                this.iconClass = 'ic-alipay';
            break;
            case 'wechat':
                this.iconClass ='ic-wechat';
                break;
            case 'bankaccount':
                this.iconClass ='ic-bank';
                break;
        }
    }

    isNull(): boolean {
        return (this.type === undefined || this.type === '')
    }
}