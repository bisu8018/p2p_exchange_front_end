<template>
  <v-layout pt-5 pb-5>
    <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
      <div>
        <div class="mb-4 login-title align-center">
          <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
          <div class="h2 bold"> {{$str("Verification")}}</div>
        </div>
        <div v-if="verifyWithPhone">
          <!--전화 번호-->
          <div class=" color-black  mb-2 text-xs-left">
            {{$str("phoneNumber")}}
          </div>
          <div class="input-disabled  vertical-center disabled mb-4">{{setPhoneNumber}}</div>
          <!--문자인증-->
          <div class=" color-black  mb-2 text-xs-left">
            {{$str("SMSverification")}}
          </div>
          <verification-code v-on:verify="onCheckVerificationCode('depositSMS')" :phone="phone"
                             :type="'depositSMS'"></verification-code>
        </div>
        <div v-else>
          <!--이메일 -->
          <div class=" color-black  mb-2 text-xs-left">
            {{$str("email")}}
          </div>
          <div class="input-disabled  vertical-center disabled mb-4">{{setEmail}}</div>
          <!--이메일인증-->
          <div class=" color-black  mb-2 text-xs-left">
            {{$str("emailVerification")}}
          </div>
          <verification-code v-on:verify="onCheckVerificationCode('depositEmail')" :email="email"
                               :type="'depositEmail'"></verification-code>
        </div>
        <div class="text-xs-right">
          <button class="btn-white  button-style" @click="goBalances">{{$str('cancel')}}</button>
          <button class="button-style ml-4a"
                  :class="{'btn-blue btn-blue-hover ': verified, 'inactive' : !verified}"
                  @click="onChange">{{$str('confirm')}}
          </button>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
    import Vue from 'vue';
    import MainRepository from "../../../../../../vuex/MainRepository";
    import VerificationCode from '@/components/VerificationCode.vue';
    import AccountService from "../../../../../../service/account/AccountService";
      export default {
        name: "SMSVerification",
          components: {
              VerificationCode
          },
          data: function () {
              return {
                  type: '',
                  email: '',
                  phone: '',
                  emailVerify: false,
                  phoneVerify: false,      //차후 phone 가능시 false로 수정.
                  verifyWithPhone: false,
              }
          },
          created() {
              let self = this;
              // 로그인 확인 -> Login 으로
              if (!MainRepository.MyInfo.isLogin()) {
                  MainRepository.router().goLogin();
                  return;
              }

              MainRepository.MyPage.getMemberVerification(function (email, phone) {
                  self.email = email.email;
                  self.phone = phone.phoneNumber;
                  //핸드폰등록이 되어있는경우 핸드폰 인증으로 진행
                  if(self.phone !==''){
                      self.verifyWithPhone = true;
                  }
              });

              window.scrollTo(0, 0);
          },
          computed: {
              setPhoneNumber: function () {
                  var phoneNumber = this.phone.substr(0, 3) + '****' + this.phone.substr(7, 6);
                  return phoneNumber;
              },
              setEmail: function () {
                  var emailSplit = this.email.split('@');
                  var emailValue = emailSplit[0].substr(0, 2) + '****' + '@' + emailSplit[1];
                  return emailValue;
              },
              verified(){
                  return this.emailVerify || this.phoneVerify;
              }
          },
          methods: {
              goBalances() {
                  this.$router.push("/balances");
              },
              onCheck() {
                  if (this.verifyWithPhone) {
                      if ( this.phoneVerify === true) {
                          this.onChange();
                      }
                  }
                  else{
                      if( this.emailVerify === true) {
                        this.onChange();
                      }
                  }
              },
              onChange() {
                  let self = this;
                  MainRepository.Balance.postWithdraw(this.verifyWithPhone, function (data){
                      MainRepository.Balance.controller().processingTime = data.result.txTime;
                      self.$router.push("/successWithdraw");
                  });
              },
              // 인증코드 체크
              onCheckVerificationCode(type) {
                  if (type === 'depositEmail') {
                      this.emailVerify = true;
                  } else {
                      this.phoneVerify = true;
                  }


              },
          }


    }
</script>

<style scoped>
  .iconLogo {
    width: 30px;
    height: 24px;
  }

  .card-flex {
    border-radius: 3px;
    border: solid 1px #8d8d8d;
    padding-bottom: 40px !important;
  }

  .login-title {
    display: flex;
  }

  .button-style {
    width: 96px;
  }

  .warning-characters {
    color: #71aa3a !important;
    font-size: 10px;
    display: block !important;
  }
  .inactive{
    /*사각형 파랑배경 흰색폰트 버튼*/
    height: 40px;
    background: #d1d1d1;
    color: white;
    border-radius: 3px;
  }
</style>