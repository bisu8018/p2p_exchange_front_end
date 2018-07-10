<template>
    <!--Vertical, horizontal alignment-->
    <v-layout mt-5 mb-5>
        <v-flex style="border:1px solid #c5c5c5" xs12 md6 lg4  offset-md3 offset-lg4 pt-4 pb-4 >           
            <v-card flat>
                <v-card-title primary-title>
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png" >
                    <h2 class="">{{$str("welcome")}}</h2>
                </v-card-title>
                <v-card-text>               
                     <!-- <form action="http://52.78.153.51/signin" method="post" >      -->
                    <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("email")}}</v-flex>
                    <v-text-field  name="email" v-model="email" type="text" solo></v-text-field>
                    <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("password")}}</v-flex>
                    <v-text-field  name="encryptedPassword" v-model="password" type="password" solo ></v-text-field>
                    <v-flex class="verifySlider" v-if="email.length>0 && password.length>=8" mb-5>                                              
                        <v-flex text-xs-left mb-2 style="color:#353535;">{{$str("verify")}}</v-flex>
                        <VerifySlider v-on:passcallback="putVerified"></VerifySlider>
                    </v-flex>
                     <!-- <v-btn color="primary" type="submit" >Log In</v-btn> -->
                      <!-- </form> -->
                    <!--go to the page 'find password' -->
                    <v-flex text-xs-left>
                        <a @click="goFindPassword">{{$str("forgetPassword")}}</a>
                    </v-flex>
                    <v-btn dark color="blue darken-3" @click='onCheck' large block>{{$str("loginText")}}</v-btn>                    
                    <v-flex class="mt-4 mb-4" style="border-bottom:1px solid #9294a6; position:relative">
                        <div style="width:100%; position:absolute; top: -10px;"><span style="background:white; padding-left:15px; padding-right:15px; color:#9294a6">or</span></div>     
                    </v-flex>  
                    <v-btn   @click='goSignup' large block>{{$str("signupText")}}</v-btn>
                </v-card-text>                    
            </v-card>            
        </v-flex>
    </v-layout>
</template>

<script>
import Vue from 'vue';
import VerifySlider from "@/components/VerifySlider";
import { abUtils } from '@/common/utils';
import AccountService from '@/service/account/AccountService';

export default{
    name : 'login',
    data: function(){
        return{
            email : '',
            password : '',     
            isVerified : false,
            verify_warning: ""
        }
    },  
    components: {
        'VerifySlider' : VerifySlider,
    },
    methods: {      
        goSignup(){
            this.$router.push("/signup");
        },
        goFindPassword() {
            this.$router.push("/findPassword");
        },
        onLogin() {
               //Send Email verification codes to Server
            AccountService.Account.login({
            email : this.email,
            encryptedPassword : this.password
            },function(error){
            if(!error){
                console.log("success");
            }else{
                console.log("POST ERROR ::::::: " + error);
            }
            })
        },
        putVerified : function(){
            this.isVerified = true;
        },
        onCheck() { 
            // Warnings in case of error in e-mail or password entry  
            //email null
            if (this.email === "") {
                this.verify_warning = Vue.prototype.$str("emailValue");
                return;
            }
            //email form 
            if (!abUtils.isEmail(this.email)) {
                this.verify_warning = Vue.prototype.$str("emailForm");
                return;
            }
            //password null
            if (this.password === "") {
                this.verify_warning = Vue.prototype.$str("passwordValue");
                return;
            }
            //password form
            if (!abUtils.isPasswd(this.password)) {
                this.verify_warning = Vue.prototype.$str("passwordForm");
                return;
            }       
            //verify slider
            if(this.isVerified === false){
                this.verify_warning = Vue.prototype.$str("verifySlider");
                return;
            }
            this.onLogin();
        }        
    }
}
</script>
<style>

</style>