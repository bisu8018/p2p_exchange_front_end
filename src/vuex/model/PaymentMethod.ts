export default class PaymentMethod {
    activeYn: string;
    alipayId: string;
    alipayQrCodeImgUrl: string;
    bankAccount: string;
    bankBranchInfo: string;
    bankName: string;
    memberNo: any;
    modifyDatetime: any;
    modifyMemberNo: any;
    ownerName: string;
    registerDatetime: any;
    registerMemberNo: any;
    type: string;
    wechatId: string;
    wechatQrCodeImgUrl: string;
    tradePassword: string;

    // viewModel
    iconClass: string;

    constructor(data: any) {
        this.activeYn = data.activeYn || 'n';
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
        this.tradePassword = data.tradePassword || '';

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

    onClear() {
        this.activeYn =  'n';
        this.alipayId = '';
        this.alipayQrCodeImgUrl ='';
        this.bankAccount =  '';
        this.bankBranchInfo = '';
        this.bankName = '';
        this.memberNo = null;
        this.modifyDatetime = null;
        this.modifyMemberNo = null;
        this.ownerName ='';
        this.registerDatetime = null;
        this.registerMemberNo = null;
        this.type = '';
        this.wechatId = '';
        this.wechatQrCodeImgUrl = '';
        this.tradePassword = '';
        this.iconClass = ''
    }
}