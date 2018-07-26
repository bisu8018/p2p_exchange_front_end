<template>
  <v-layout class="mt-5">
      <v-flex xs12 md3 text-md-left text-xs-left>
        <h5 class="color-blue">John</h5>
        <h5 class="color-darkgray">UID: 45276327</h5>
        <v-divider class="mt-4 mb-4"></v-divider>
        <h5 class="color-darkgray">Trades :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">0 Times</span></h5>
        <h5 class="color-darkgray">Avg Release :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">0.00 Min</span></h5>
        <v-divider class="mt-4 mb-4"></v-divider>
        <h5 class="color-darkgray">Account created at 2018-06-20</h5>
        <h5 class="color-darkgray">08:26:33 , No record of transactions</h5>

      </v-flex>



      <v-flex xs12 md9 wrap row text-md-left text-xs-left>
          <div class="section-border ma-3 pa-4 mb-5">
        <v-layout>
        <h4 class="bold">Account & Security</h4>
        <v-spacer></v-spacer>
        <h5 class="color-darkgray text-md-right mb-3">Security Level :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-orange">Medium</span></h5>
        </v-layout>
        <p class="text-md-right">*Using two-factor authentication is highly recommended.</p>
        <v-divider class="mt-4 mb-4"></v-divider>
        <v-layout wrap row class="vertical-center">
          <v-flex md4><img src="@/assets/img/mypage/email.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">Email</h5></v-flex>
          <v-flex md3><h5>Bound</h5></v-flex>
          <v-flex md4><p>*Used to withdraw, retrieve password, change
              security settings and verify while managing API.</p></v-flex>
            <v-flex md1><h6><a class="color-blue">Close</a></h6></v-flex>
        </v-layout>
          <v-divider class="mt-4 mb-4"></v-divider>

          <v-layout wrap row class="vertical-center">
            <v-flex md4><img src="@/assets/img/mypage/phone.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">Phone</h5></v-flex>
            <v-flex md3><h5 class="color-darkgray">Unbound</h5></v-flex>
            <v-flex md4><p>*Used to withdraw, retrieve password, change
                security settings and verify while managing API.</p></v-flex>
            <v-flex md1><h6><a class="color-blue">Close</a></h6></v-flex>
          </v-layout>
          <v-divider class="mt-4 mb-4"></v-divider>

          <v-layout wrap row class="vertical-center">
              <v-flex md4><img src="@/assets/img/mypage/account.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">Account</h5></v-flex>
              <v-flex md3><h5>ab***@allblab.com</h5></v-flex>
              <v-flex md4></v-flex>
              <v-flex md1></v-flex>
          </v-layout>
          <v-divider class="mt-4 mb-4"></v-divider>

          <v-layout wrap row class="vertical-center">
              <v-flex md4><img src="@/assets/img/mypage/uid.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">UID</h5></v-flex>
              <v-flex md3><h5>45276327</h5></v-flex>
              <v-flex md4></v-flex>
              <v-flex md1></v-flex>
          </v-layout>
          <v-divider class="mt-4 mb-4"></v-divider>

          <v-layout wrap row class="vertical-center">
              <v-flex md4><img src="@/assets/img/mypage/password.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">Password</h5></v-flex>
              <v-flex md3><h5 class="color-darkgray">******</h5></v-flex>
              <v-flex md4></v-flex>
              <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
          </v-layout>
          <v-divider class="mt-4 mb-4"></v-divider>

          <v-layout wrap row class="vertical-center">
              <v-flex md4><img src="@/assets/img/mypage/password.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">Trade Password</h5></v-flex>
              <v-flex md3><h5 class="color-darkgray">*******</h5></v-flex>
              <v-flex md4></v-flex>
              <v-flex md1><h6><a class="color-blue">Reset</a></h6></v-flex>
          </v-layout>
          </div>



          <div class="mt-6 section-border ma-3 mb-5 pa-4">
              <v-layout column>
                  <h4 class="bold">ID Verification</h4>
                  <h6 class="color-darkgray mt-3">Once ID verification is completed, no changes may be made.</h6>
              </v-layout>
              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/mypage/id.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">ID Verification</h5></v-flex>
                  <v-flex md3><h5 class="color-black">未绑定, 36**********51</h5></v-flex>
                  <v-flex md4></v-flex>
                  <v-flex md1><h6 class="color-darkgray">Verified</h6></v-flex>
              </v-layout>
              <v-divider class="mt-4 mb-4"></v-divider>

              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/mypage/advanced_id.png" class="mr-3 mypage-icon"><h5 class="color-darkgray">Advanced Verification</h5></v-flex>
                  <v-flex md3><h5 class="color-black">Verified</h5></v-flex>
                  <v-flex md4></v-flex>
                  <v-flex md1></v-flex>
              </v-layout>

          </div>



          <div class="mt-6 section-border ma-3 mb-5 pa-4">
              <v-layout column>
                  <h4 class="bold">Payment Method</h4>
                  <h6 class="color-darkgray mt-3">For personal security reasons, please only use your own account.Enabled payment instructions will be showen to the buyer,3 at most</h6>
              </v-layout>
              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/method_alipay.png"  class="mr-3 float-left"><h5 class="color-darkgray">Alipay</h5></v-flex>
                  <v-flex md6><h5 class="color-black">18529612778 未绑定 Alipay</h5></v-flex>
                  <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                  <v-flex md1><h6><a class="color-darkgray">Verified</a></h6></v-flex>
              </v-layout>

              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/method_wechatpay.png" class="mr-3 float-left"><h5 class="color-darkgray">Wechatpay</h5></v-flex>
                  <v-flex md6><h5 class="color-black">1852961277 未绑定 Wechatpay</h5></v-flex>
                  <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                  <v-flex md1><h6><a class="color-darkgray">Verified</a></h6></v-flex>
              </v-layout>

              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/method_bankaccount.png" class="mr-3 float-left"><h5 class="color-darkgray">Bank Account</h5></v-flex>
                  <v-flex md6><h5 class="color-black">6214856562128938 未绑定 未绑定未 绑定未绑定未绑定</h5></v-flex>
                  <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                  <v-flex md1><h6><a class="color-darkgray">Verified</a></h6></v-flex>
              </v-layout>


              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md12><h5 class="text-md-center"><a class="color-blue">Add a new payment method</a></h5></v-flex>
              </v-layout>


          </div>



          <div class="mt-6 section-border ma-3 pa-4 mb-5">
              <v-layout column>
                  <h4 class="bold">Block List</h4>
                  <h6 class="color-darkgray mt-3">Users that you blocked will not be able to trade with you</h6>
              </v-layout>
              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/method_alipay.png" class="mr-3 float-left"><h5 class="color-darkgray">John</h5></v-flex>
                  <v-flex md6></v-flex>
                  <v-flex md1></v-flex>
                  <v-flex md1><h6><a class="color-blue">Unblock</a></h6></v-flex>
              </v-layout>



              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md4><img src="@/assets/img/method_alipay.png" class="mr-3 float-left"><h5 class="color-darkgray">John</h5></v-flex>
                  <v-flex md6></v-flex>
                  <v-flex md1></v-flex>
                  <v-flex md1><h6><a class="color-blue">Unblock</a></h6></v-flex>
              </v-layout>

          </div>







          <div class="mt-6 section-border ma-3 pa-4 mb-5">
              <v-layout column>
                  <h4 class="bold">History</h4>
                  <v-layout class="vertical-center mb-5 mt-4">
                  <h4 class="color-darkgray medium mr-4a"><a class="color-darkgray">Login</a></h4>
                      <v-divider inset vertical></v-divider>
                      <h4 class="color-darkgray medium mr-4a ml-4"><a class="color-blue">Security Settings</a></h4>
                  </v-layout>
              </v-layout>
              <v-layout wrap row class="vertical-center">
                  <v-flex md3><h5 class="color-darkgray">Date</h5></v-flex>
                  <v-flex md7><h5 class="color-darkgray">Security Settings</h5></v-flex>
                  <v-flex md2><h5 class="color-darkgray">IP</h5></v-flex>
              </v-layout>



              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md3><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                  <v-flex md7><h5 class="color-black">Turn off SMS authentication</h5></v-flex>
                  <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
              </v-layout>

              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md3><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                  <v-flex md7><h5 class="color-black">Turn on email authentication</h5></v-flex>
                  <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
              </v-layout>

              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md3><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                  <v-flex md7><h5 class="color-black">Turn off SMS authentication</h5></v-flex>
                  <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
              </v-layout>

              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md3><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                  <v-flex md7><h5 class="color-black">Turn off SMS authentication</h5></v-flex>
                  <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
              </v-layout>


              <v-divider class="mt-4 mb-4"></v-divider>
              <v-layout wrap row class="vertical-center">
                  <v-flex md3><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                  <v-flex md7><h5 class="color-black">Turn on email authentication</h5></v-flex>
                  <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
              </v-layout>

              <v-divider class="mt-4 mb-4"></v-divider>

              <Pagination></Pagination>


          </div>










      </v-flex>


  </v-layout>















</template>

<script>
    export default {
        name: "MyPage",

    }
</script>

<style scoped>

    .float-left {
        float: left;
    }
    
    .mypage-icon{
        float: left;
        width: 24px;

    }

  .section-border {
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;

    -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
  }

    .v-divider--vertical {
        height: 26px !important;
    }

</style>