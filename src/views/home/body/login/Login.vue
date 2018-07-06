<template>   
    <!--수직,수평정렬-->
    <v-layout mt-5 mb-5>                 
        <v-flex xs12 lg4  offset-lg4 >
            <form action="/signin" method="post">
                <v-card flat>
                    <v-card-title primary-title>
                        <img class="iconLogo mr-2" src="@/assets/img/logo_black.png" >
                        <h2 class="headline">{{htmlWelcome}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field prepend-icon="person" name="email" v-model="email" v-bind:label="htmlEmail" type="text" required></v-text-field>
                        <v-text-field prepend-icon="lock" name="encryptedPassword" v-model="encryptedPassword" v-bind:label="htmlPassword" type="password" required></v-text-field>                                
                           <!--find password  페이지로 이동--> 
                        <v-flex text-xs-left>                                                                            
                            <a @click="goFindPassword">{{htmlForgetPassword}}</a>    
                        </v-flex>
                    </v-card-text>   
                      <!--클라이언트 단 보안상 약점 존재, 구글 캣챠 대체가능-->   
                    <v-card-actions>
                    <v-flex text-xs-left>
                    <v-btn color="primary" type="submit" large >{{htmlLoginText}}</v-btn>
                    </v-flex>
                    <v-flex>
                        {{htmlAccoutYet}} <a @click='goSignup'>{{htmlSignupText}}</a>
                    </v-flex>
                    </v-card-actions>        
                </v-card> 
            </form>   
        </v-flex>
    </v-layout>     
</template>

<script>
import Vue from 'vue';
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
            email : '',
            encryptedPassword : '',           
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be more than 8 characters',
                v => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(v) || 'Does not fit password format'
            ]
        }
    },  
    methods: {      
        goSignup(){
            this.$router.push("/signup");
        },
        goFindPassword() {
             this.$router.push("/findPassword");
        }        
    }
}
</script>
<style>
.loginPage{
    position: relative;
    
}

</style>