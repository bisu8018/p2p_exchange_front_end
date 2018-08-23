<template>
  <v-layout pt-5 pb-5>
    <v-flex card-flex xs12 md6 lg4 offset-md3 offset-lg4 pt-4a pb-4a pr-3 pl-3>
      <div>
        <div class="mb-3 login-title align-center">
          <div class="mr-2 sprite-img ic-logo-bl d-inline-block"></div>
          <div class="h2 bold"> {{$str("Verification")}}</div>
        </div>
        <div class="color-darkgray mb-4 text-xs-left">
          {{$str("emailTurnOffExplain")}}
        </div>

        <!--전화 번호-->
        <div class=" color-black  mb-2 text-xs-left">
          {{$str("phoneNumber")}}
        </div>
        <div class="input-disabled  vertical-center disabled mb-4">{{setPhoneNumber}}</div>

        <!--문자인증-->
        <div class=" color-black  mb-2 text-xs-left">
          {{$str("SMSverification")}}
        </div>
        <verification-code v-on:verify="onCheckVerificationCode('phone')" :phone="phone"
                           :type="'phone'"></verification-code>

        <!--이메일 -->
        <div class=" color-black  mb-2 text-xs-left">
          {{$str("email")}}
        </div>
        <div class="input-disabled  vertical-center disabled mb-4">{{setEmail}}</div>


        <!--이메일인증-->
        <div class=" color-black  mb-2 text-xs-left">
          {{$str("emailVerification")}}
        </div>
        <verification-code v-on:verify="onCheckVerificationCode('deposit')" :email="email"
                             :type="'deposit'"></verification-code>
        <div class="text-xs-right">
          <button class="btn-white  button-style" @click="goBalances">{{$str('cancel')}}</button>
          <button class="button-style ml-4a"
                  :class="{'btn-blue btn-blue-hover ': verifiedAll, 'inactive' : !verifiedAll}"
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
                  email: MainRepository.MyInfo.getUserInfo().email,
                  phone: MainRepository.MyInfo.getUserInfo().phoneNumber,
                  emailVerify: false,
                  phoneVerify: true,      //차후 phone 가능시 false로 수정.

              }
          },
          created() {
              // 로그인 확인 -> Login 으로
              if (!MainRepository.MyInfo.isLogin()) {
                  MainRepository.router().goLogin();
                  return;
              }

              window.scrollTo(0, 0);
          },
          computed: {
              setPhoneNumber: function () {
                  var phoneNumber = this.phone.substr(0, 3) + '****' + this.phone.substr(7, 5);
                  return phoneNumber;
              },
              setEmail: function () {
                  var emailSplit = this.email.split('@');
                  var emailValue = emailSplit[0].substr(0, 2) + '****' + '@' + emailSplit[1];
                  return emailValue;
              },
              verifiedAll(){
                  return (this.emailVerify && this.phoneVerify)
              }
          },
          methods: {
              goBalances() {
                  this.$router.push("/balances");
              },
              onCheck() {
                  //일단은 email만 되도록해놓음.
                  // if ( this.emailVerify === true && this.phoneVerify === true) {
                  if ( this.emailVerify === true) {
                      this.onChange();
                  }
              },
              onChange() {
                  let self = this;
                  if(this.verifiedAll == true){
                      MainRepository.Balance.postWithdraw(function (data){
                          let url = "/successWithdraw"
                              //+ data.processingTime
                          self.$router.push(url);
                      });
                  }
              },
              // 인증코드 체크
              onCheckVerificationCode(type) {
                  if (type === 'deposit') {
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