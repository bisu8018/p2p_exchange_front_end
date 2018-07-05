<template>
    <v-app >
        <form action="/signin" method="post" @submit="onSubmit">
            <v-content>
                <v-container grid-list-md fill-height>
                    <v-layout row wrap align-center justify-center>                 <!--수직,수평정렬-->
                        <v-flex xs12 md6 lg4>
                            <v-card>
                                <v-card-title primary-title>
                                    <div class="loginTitle">
                                        <img class="iconLogo" src="../../../../assets/imgs/logo_black.png"> <!--우리로고이미지로 대체해야함-->
                                        <h3 class="headline mb-0"> Welcome</h3>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <v-text-field prepend-icon="person" name="email" v-model="email" label="Email" type="text" required></v-text-field>
                                    <v-text-field prepend-icon="lock" name="encryptedPassword" v-model="password" label="Password" type="password" required></v-text-field>
                                </v-card-text>
                                <div class="forgetPassword">
                                    <a href="https://www.allblab.com" class="forgetPwd">               <!--password 분실시 찾아주는 페이지로 이동-->
                                        Forget Password?</a>
                                    <br>
                                </div>
                                <div class="btnItem">
                                    <v-btn color="primary" type="submit" >Log In</v-btn>
                                </div>
                                <div class="loginOrBox">
                                    <span>or</span>
                                    <div class="loginOrLine"></div>
                                </div>
                                <div>
                                    <v-btn @click="goSignup">Sign Up</v-btn>        <!--sign up page로 이동-->
                                </div>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </form>
    </v-app>
</template>
<script>
    export default{
        data: function(){
            return{
                email : '',
                password : '',
                isModal : false
            }
        },
        methods: {
            onSubmit() {
                return false;
            },
            goSignup() {
                this.$router.push("/signup");
            }
        }
    }
</script>
<style>
</style>