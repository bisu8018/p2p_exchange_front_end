<template>
    <!--Vertical, horizontal alignment-->
    <v-layout mt-5 mb-5>
        <v-flex style="border:1px solid #c5c5c5" xs12 md6 lg4  offset-md3 offset-lg4 pt-4 pb-4 >           
            <v-card flat>
                <v-card-title primary-title>
                    <img class="iconLogo mr-2" src="@/assets/img/logo_black.png" >
                    <h2 class="headline">{{htmlWelcome}}</h2>
                </v-card-title>
                <v-card-text>
                    <form action="/signin" method="post" id="signinForm">
                        <v-flex text-xs-left mb-2 style="color:#353535;">{{htmlEmail}}</v-flex>
                        <v-text-field  name="email" v-model="email" type="text" solo></v-text-field>
                        <v-flex text-xs-left mb-2 style="color:#353535;">{{htmlPassword}}</v-flex>
                        <v-text-field  name="encryptedPassword" v-model="password" type="password" solo ></v-text-field>
                    </form>                        
                    <v-flex class="verifySlider" v-if="email.length>0 && password.length>=8" mb-5>                                              
                        <v-flex text-xs-left mb-2 style="color:#353535;">{{htmlVerify}}</v-flex>
                        <VerifySlider v-on:passcallback="putVerified"></VerifySlider>
                    </v-flex>
                    <!--go to the page 'find password' -->
                    <v-flex text-xs-left>
                        <a @click="goFindPassword">{{htmlForgetPassword}}</a>
                    </v-flex>
                    <v-btn dark color="blue darken-3" @click='onCheck' type="submit" large block>{{htmlLoginText}}</v-btn>                    
                    <v-flex class="mt-4 mb-4" style="border-bottom:1px solid #9294a6; position:relative">
                        <div style="width:100%; position:absolute; top: -10px;"><span style="background:white; padding-left:15px; padding-right:15px; color:#9294a6">or</span></div>     
                    </v-flex>  
                    <v-btn   @click='goSignup' large block>{{htmlSignupText}}</v-btn>
                </v-card-text>                    
            </v-card>            
        </v-flex>
    </v-layout>
</template>

<script>
import Vue from 'vue';
import VerifySlider from "@/components/VerifySlider";
import { abUtils } from '@/common/utils';

export default{
    name : 'login',
    data: function(){
        return{
            htmlWelcome: Vue.prototype.$str("welcome"),
            htmlEmail: Vue.prototype.$str("email"),
            htmlPassword: Vue.prototype.$str("password"),
            htmlSignupText: Vue.prototype.$str("signupText"), //SIGN UP
            htmlLoginText: Vue.prototype.$str("loginText"),       //LOG IN
            htmlForgetPassword: Vue.prototype.$str("forgetPassword"), //Forget Password?
            htmlAccoutYet: Vue.prototype.$str("accountYet"), //Don't have an account?
            htmlVerify: Vue.prototype.$str("verify"),
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
        onSignin() {
            document.getElementById("signinForm").submit();
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
            this.onSignin();
        }        
    }
}
</script>
<style>

</style>