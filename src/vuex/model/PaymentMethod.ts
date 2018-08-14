export default class PaymentMethod {
    type: string;
    active_yn: string;
    owner_name: string;
    bank_name: string;
    bank_branch_info: string;
    bank_account: string;
    wechat_id: string;
    wechat_qr_code_img_url: string;
    alipay_id: string;
    alipay_qr_code_img_url: string;


    constructor(data: any) {
        this.type = data.type || '';
        this.active_yn = data.active_yn || '';
        this.owner_name = data.owner_name || '';
        this.bank_name = data.bank_name || '';
        this.bank_branch_info = data.bank_branch_info || '';
        this.bank_account = data.bank_account || '';
        this.wechat_id = data.wechat_id || '';
        this.wechat_qr_code_img_url = data.wechat_qr_code_img_url || '';
        this.alipay_id = data.alipay_id || '';
        this.alipay_qr_code_img_url = data.alipay_qr_code_img_url || '';
    }

    isNull(): boolean {
        return (this.type === undefined || this.type === '')
    }
}