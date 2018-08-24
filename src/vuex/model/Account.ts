export default class Account {
    memberNo: number;
    bgColor: string;
    email: string;
    membershipLevel: string;
    nationality: string;
    nickname: string;
    phoneNumber: string;
    role: 'ROLE_CUSTOMER';
    createDatetime: string;
    tradeTimes : number;
    processingOrderCount : number;
    isIdVerified: boolean;
    //encryptedPassword: string;
    //termsAgreeYn: true;
    //tradePassword: string

  constructor (data: any) {
      this.memberNo = data.memberNo || -1;
      this.tradeTimes = data.tradeTimes || 0;
      this.processingOrderCount = data.processingOrderCount || 0;
      this.isIdVerified = data.isIdVerified || false;
      this.bgColor = data.bgColor || '';
      this.email = data.email || '';
      this.membershipLevel = data.membershipLevel || 'none';
      this.nationality = data.nationality || 'CN';
      this.nickname = data.nickname || '';
      this.phoneNumber = data.phoneNumber || '';
      this.createDatetime = data.createDatetime || '';
      this.role = data.role || 'ROLE_CUSTOMER';
  }

  isLogin() {
      return this.email !== undefined && this.email !== '';
  }

  isNull (): boolean {
    return (this.email === undefined || this.email === '')
  }
}