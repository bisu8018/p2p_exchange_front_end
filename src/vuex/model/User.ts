export default class User {
  id: number;
  userName: string;
  phoneNumber: string;
  grade: string;
  platform: string;
  countryCallingCode: string;

  constructor (data: any) {
    this.id = Number(data.id) || -1;
    this.userName = data.userName || '';
    this.phoneNumber = data.phoneNumber || '';
    this.grade = data.grade || '';
    this.platform = data.platform;
    this.countryCallingCode = data.countryCallingCode;
  }

  isNull (): boolean {
    return (this.id === undefined || this.id === -1)
  }
}