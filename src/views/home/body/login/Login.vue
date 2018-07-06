<template>
        <form action="/signin" method="post">
            <v-content>
                <v-container grid-list-md fill-height>
                    <!--수직,수평정렬-->
                    <v-layout row wrap align-center justify-center>                 
                        <v-flex xs12 md6 lg4>
                            <v-card>
                                <v-card-title primary-title>
                                        <img class="iconLogo" src="@/assets/img/logo_black.png">
                                        <h3 class="headline mb-0">欢迎登录</h3>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field prepend-icon="person" name="email" v-model="email" label="Email" type="text" required></v-text-field>
                                    <v-text-field prepend-icon="lock" name="encryptedPassword" v-model="encryptedPassword" label="Password" type="password" required></v-text-field>
                                </v-card-text>
                                <!--password 분실시 찾아주는 페이지로 이동-->
                                <div class="forgetPassword">
                                    <a @click="goFindPassword">            
                                        Forget Password?</a>
                                    <br>
                                    <br>                                
                              </div>
                            <!--클라이언트 단 보안상 약점 존재, 구글 캣챠 대체가능-->                           
                            <div class="btnItem">
                                <v-btn color="primary" block type="submit" large >Log In</v-btn>
                            </div>
                            <div class="text-xs-center">
                                <hr class="v-divider">
                                <span  style="position: relative; z-index:2;">or</span>
                                <hr class="v-divider">
                                <div class="loginOrLine"></div>
                            </div>
                            <div>
                                <!--sign up page로 이동-->
                                <v-btn @click="goSignup">Sign Up</v-btn>       
                            </div>  
                        </v-card>
                    </v-flex>
                </v-layout>      
            </v-container>
        </v-content>
    </form>   
</template>
<script>
export default{
    name : 'login',
    data: function(){
        return{
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
.iconLogo{
    width : 20px;
    height: 20px;
}
.forgetPwd{
    text-align: left;
}

</style>