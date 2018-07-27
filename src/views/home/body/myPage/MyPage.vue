<template>
<div>

    <div v-if="isMobile">
        <v-layout class="mt-5">

            <v-flex xs12 text-md-left text-xs-left>
                <big-avatar
                        :name = user.email[0]
                        :isLogin = user.isLogin
                        :color = user.color class="f-left mr-3">
                </big-avatar>
                <h5 class="color-blue">John</h5>
                <h5 class="color-darkgray">UID: 45276327</h5>
                <v-divider class="mt-4 mb-4"></v-divider>
                <h5 class="color-darkgray">Trades :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">0 Times</span></h5>
                <h5 class="color-darkgray">Avg Release :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">0.00 Min</span></h5>
                <v-divider class="mt-4 mb-4"></v-divider>
                <h5 class="color-darkgray">Account created at 2018-06-20</h5>
                <h5 class="color-darkgray mb-5">08:26:33 , No record of transactions</h5>



                <div class="section-border pa-4 mb-5">
                    <v-layout column>
                        <h4 class="bold mb-3">Account & Security</h4>
                        <h5 class="color-darkgray text-md-right mb-3">Security Level :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-orange">Medium</span></h5>
                    </v-layout>
                    <p class="text-xs-left color-darkgray">*Using two-factor authentication is highly recommended.</p>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row>
                        <v-flex xs8><div class="sprite-img ic-email f-left mr-3"></div><h5 class="color-darkgray mb-3">Email</h5><h5 class="mb-3 ml-4 pl-3">Bound</h5></v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 class="mt-3"><h6><a class="color-blue">Close</a></h6></v-flex>

                        <v-flex xs12><p class="color-darkgray">*Used to withdraw, retrieve password, change
                            security settings and verify while managing API.</p></v-flex>

                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs8><div class="sprite-img ic-phone f-left mr-3"></div><h5 class="color-darkgray mb-3">Phone</h5><h5 class="mb-3 ml-4 pl-3 color-darkgray">Unbound</h5></v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 class="mt-3"><h6><a class="color-blue">Bind</a></h6></v-flex>

                        <v-flex xs12><p class="color-darkgray">*Used to withdraw, retrieve password, change
                            security settings and verify while managing API.</p></v-flex>

                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>


                    <v-layout wrap row>
                        <v-flex xs12><div class="sprite-img ic-account f-left mr-3"></div><h5 class="color-darkgray mb-3">Account</h5><h5 class="ml-4 pl-3 color-black">ab****@allblab.com</h5></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>


                    <v-layout wrap row>
                        <v-flex xs12><div class="sprite-img ic-uid f-left mr-3"></div><h5 class="color-darkgray mb-3">UID</h5><h5 class="ml-4 pl-3 color-black">45276327</h5></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs8><div class="sprite-img ic-password f-left mr-3"></div><h5 class="color-darkgray mb-3">Password</h5><h5 class="mb-3 ml-4 pl-3 color-black">******</h5></v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 class="mt-3"><h6><a class="color-blue">Modify</a></h6></v-flex>

                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>


                    <v-layout wrap row>
                        <v-flex xs8><div class="sprite-img ic-password f-left mr-3"></div><h5 class="color-darkgray mb-3">Trade Password</h5><h5 class="mb-3 ml-4 pl-3 color-black">******</h5></v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 class="mt-3"><h6><a class="color-blue">Modify</a></h6></v-flex>

                    </v-layout>


                </div>



                <div class="mt-5 section-border mb-5 pa-4">
                    <v-layout column>
                        <h4 class="bold">ID Verification</h4>
                        <h6 class="color-darkgray mt-3">Once ID verification is completed, no changes may be made.</h6>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>



                    <v-layout wrap row>
                        <v-flex xs8><div class="sprite-img ic-id f-left mr-3"></div><h5 class="color-darkgray mb-3">ID Verification</h5><h5 class="mb-3 ml-4 pl-3 color-black">未绑定, 36**********
                            51</h5></v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs2 class="mt-3"><h6 class="color-darkgray">Verified</h6></v-flex>

                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs8><div class="sprite-img ic-advanced f-left mr-3"></div><h5 class="color-darkgray mb-3">Advanced Verification</h5><h5 class="mb-3 ml-4 pl-3 color-black">Verified</h5></v-flex>
                        <v-spacer></v-spacer>

                    </v-layout>



                </div>



                <div class="mt-5 section-border mb-5 pa-4">
                    <v-layout column>
                        <h4 class="bold">Payment Method</h4>
                        <h6 class="color-darkgray mt-3">For personal security reasons, please only use your own account.Enabled payment instructions will be showen to the buyer,3 at most</h6>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>


                    <v-layout wrap row>
                        <v-flex xs12><div class="sprite-img ic-alipay f-left mr-3"></div><h5 class="color-darkgray mb-3">Alipay</h5><h5 class="mb-3 ml-4 pl-3 color-black">18529612778 未绑定 Alipay
                            51</h5></v-flex>
                        <v-layout class="vertical-center">
                        <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">Modify</a></h6></v-flex>
                        <v-flex xs6><toggle></toggle></v-flex>
                        </v-layout>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>


                    <v-layout wrap row>
                        <v-flex xs12><div class="sprite-img ic-wechatpay f-left mr-3"></div><h5 class="color-darkgray mb-3">Wechatpay</h5><h5 class="mb-3 ml-4 pl-3 color-black">1852961277 未绑定 Wechatpay</h5></v-flex>
                        <v-layout class="vertical-center">
                            <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">Modify</a></h6></v-flex>
                            <v-flex xs6><toggle></toggle></v-flex>
                        </v-layout>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>



                    <v-layout wrap row>
                        <v-flex xs12><div class="sprite-img ic-bank f-left mr-3"></div><h5 class="color-darkgray mb-3">Bank Account</h5><h5 class="mb-3 ml-4 pl-3 color-black">6214856562128938 未绑定
                            未绑定未 绑定未绑定未绑定</h5></v-flex>
                        <v-layout class="vertical-center">
                            <v-flex xs6 class="text-xs-right mr-4"><h6><a class="color-blue">Modify</a></h6></v-flex>
                            <v-flex xs6><toggle></toggle></v-flex>
                        </v-layout>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>


                    <v-layout wrap row class="vertical-center">
                        <v-flex md12><h5 class="text-xs-center"><a class="color-blue">Add a new payment method</a></h5></v-flex>
                    </v-layout>


                </div>



                <div class="mt-5 section-border pa-4 mb-5">
                    <v-layout column>
                        <h4 class="bold">Block List</h4>
                        <h6 class="color-darkgray mt-3">Users that you blocked will not be able to trade with you</h6>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex xs10 class="vertical-center"><avatar :name = user.email[0]
                                             :isLogin = user.isLogin
                                             :color = user.color class="mr-3 f-left"></avatar><h5 class="color-darkgray">John</h5></v-flex>

                        <v-flex xs2><h6><a class="color-blue">Unblock</a></h6></v-flex>
                    </v-layout>



                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex xs10 class="vertical-center"><avatar :name = user.email[0]
                                                                     :isLogin = user.isLogin
                                                                     :color = user.color class="mr-3 f-left"></avatar><h5 class="color-darkgray">John</h5></v-flex>

                        <v-flex xs2><h6><a class="color-blue">Unblock</a></h6></v-flex>
                    </v-layout>

                </div>







                <div class="mt-5 section-border pa-4 mb-6">
                    <v-layout column>
                        <h4 class="bold">History</h4>
                        <v-layout class="vertical-center mt-4">
                            <h4 class="color-darkgray medium mr-4a"><a class="color-darkgray">Login</a></h4>
                            <v-divider inset vertical></v-divider>
                            <h4 class="color-darkgray medium mr-4a ml-4"><a class="active-history">Security Settings</a></h4>
                        </v-layout>
                    </v-layout>


                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs12 class="text-xs-left">
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Date:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">2018-07-23 10:05:32</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Security Settings:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">Reset password</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">IP:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">210.91.70.158</h5>
                                </v-flex>
                            </div>

                        </v-flex>
                    </v-layout>





                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs12 class="text-xs-left">
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Date:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">2018-07-23 10:05:32</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Security Settings:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">Reset password</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">IP:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">210.91.70.158</h5>
                                </v-flex>
                            </div>

                        </v-flex>
                    </v-layout>


                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs12 class="text-xs-left">
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Date:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">2018-07-23 10:05:32</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Security Settings:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">Reset password</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">IP:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">210.91.70.158</h5>
                                </v-flex>
                            </div>

                        </v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs12 class="text-xs-left">
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Date:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">2018-07-23 10:05:32</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Security Settings:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">Reset password</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">IP:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">210.91.70.158</h5>
                                </v-flex>
                            </div>

                        </v-flex>
                    </v-layout>


                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row>
                        <v-flex xs12 class="text-xs-left">
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Date:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">2018-07-23 10:05:32</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center mb-2">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">Security Settings:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">Reset password</h5>
                                </v-flex>
                            </div>
                            <div class="vertical-center">
                                <v-flex xs4 class="flex-pl-0 vertical-center">
                                    <h5 class="color-darkgray text-xs-left">IP:</h5>
                                </v-flex>
                                <v-flex xs8 class="flex-pr-0">
                                    <h5 class="color-black">210.91.70.158</h5>
                                </v-flex>
                            </div>

                        </v-flex>
                    </v-layout>





                    <v-divider class="mt-4 mb-4"></v-divider>








                    <Pagination class="text-xs-center mb-4"></Pagination>


                </div>










            </v-flex>

        </v-layout>


    </div>

























    <div v-else>
        <v-layout class="mt-5">

            <v-flex md3 text-md-left text-xs-left>
                <big-avatar
                        :name = user.email[0]
                        :isLogin = user.isLogin
                        :color = user.color class="f-left mr-3">
                </big-avatar>
                <h5 class="color-blue">John</h5>
                <h5 class="color-darkgray">UID: 45276327</h5>
                <v-divider class="mt-4 mb-4"></v-divider>
                <h5 class="color-darkgray">Trades :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">0 Times</span></h5>
                <h5 class="color-darkgray">Avg Release :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-black">0.00 Min</span></h5>
                <v-divider class="mt-4 mb-4"></v-divider>
                <h5 class="color-darkgray">Account created at 2018-06-20</h5>
                <h5 class="color-darkgray">08:26:33 , No record of transactions</h5>

            </v-flex>


            <v-flex md9 wrap row text-md-left text-xs-left>
                <div class="section-border ml-3 mr-3 mb-3 pa-4 mb-5">
                    <v-layout>
                        <h4 class="bold">Account & Security</h4>
                        <v-spacer></v-spacer>
                        <h5 class="color-darkgray text-md-right mb-3">Security Level :&nbsp;&nbsp;&nbsp;&nbsp;<span class="color-orange">Medium</span></h5>
                    </v-layout>
                    <p class="text-md-right color-darkgray">*Using two-factor authentication is highly recommended.</p>
                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-email f-left mr-3"></div><h5 class="color-darkgray">Email</h5></v-flex>
                        <v-flex md3><h5>Bound</h5></v-flex>
                        <v-flex md4><p class="color-darkgray">*Used to withdraw, retrieve password, change
                            security settings and verify while managing API.</p></v-flex>
                        <v-flex md1><h6><a class="color-blue">Close</a></h6></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-phone f-left mr-3"></div><h5 class="color-darkgray">Phone</h5></v-flex>
                        <v-flex md3><h5 class="color-darkgray">Unbound</h5></v-flex>
                        <v-flex md4><p class="color-darkgray">*Used to withdraw, retrieve password, change
                            security settings and verify while managing API.</p></v-flex>
                        <v-flex md1><h6><a class="color-blue">Close</a></h6></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-account f-left mr-3"></div><h5 class="color-darkgray">Account</h5></v-flex>
                        <v-flex md3><h5>ab***@allblab.com</h5></v-flex>
                        <v-flex md4></v-flex>
                        <v-flex md1></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-uid f-left mr-3"></div><h5 class="color-darkgray">UID</h5></v-flex>
                        <v-flex md3><h5>45276327</h5></v-flex>
                        <v-flex md4></v-flex>
                        <v-flex md1></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-password f-left mr-3"></div><h5 class="color-darkgray">Password</h5></v-flex>
                        <v-flex md3><h5 class="color-darkgray">******</h5></v-flex>
                        <v-flex md4></v-flex>
                        <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-password f-left mr-3"></div><h5 class="color-darkgray">Trade Password</h5></v-flex>
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
                        <v-flex md4><div class="sprite-img ic-id f-left mr-3"></div><h5 class="color-darkgray">ID Verification</h5></v-flex>
                        <v-flex md3><h5 class="color-black">未绑定, 36**********51</h5></v-flex>
                        <v-flex md4></v-flex>
                        <v-flex md1><h6 class="color-darkgray">Verified</h6></v-flex>
                    </v-layout>
                    <v-divider class="mt-4 mb-4"></v-divider>

                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-advanced f-left mr-3"></div><h5 class="color-darkgray">Advanced Verification</h5></v-flex>
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
                        <v-flex md4><div class="sprite-img ic-alipay f-left mr-3"></div><h5 class="color-darkgray">Alipay</h5></v-flex>
                        <v-flex md6><h5 class="color-black">18529612778 未绑定 Alipay</h5></v-flex>
                        <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                        <v-flex md1><toggle></toggle></v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-wechatpay f-left mr-3"></div><h5 class="color-darkgray">Wechatpay</h5></v-flex>
                        <v-flex md6><h5 class="color-black">1852961277 未绑定 Wechatpay</h5></v-flex>
                        <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                        <v-flex md1><toggle></toggle></v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><div class="sprite-img ic-bank f-left mr-3"></div><h5 class="color-darkgray">Bank Account</h5></v-flex>
                        <v-flex md6><h5 class="color-black">6214856562128938 未绑定 未绑定未 绑定未绑定未绑定</h5></v-flex>
                        <v-flex md1><h6><a class="color-blue">Modify</a></h6></v-flex>
                        <v-flex md1><toggle></toggle></v-flex>
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
                        <v-flex md11 class="vertical-center"><avatar :name = user.email[0]
                                            :isLogin = user.isLogin
                                            :color = user.color class="mr-3 f-left"></avatar><h5 class="color-darkgray">John</h5></v-flex>
                        <v-flex md1><h6><a class="color-blue">Unblock</a></h6></v-flex>
                    </v-layout>



                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md11 class="vertical-center"><avatar :name = user.email[0]
                                                                     :isLogin = user.isLogin
                                                                     :color = user.color class="mr-3 f-left"></avatar><h5 class="color-darkgray">John</h5></v-flex>
                        <v-flex md1><h6><a class="color-blue">Unblock</a></h6></v-flex>
                    </v-layout>

                </div>







                <div class="mt-6 section-border ma-3 pa-4 mb-5">
                    <v-layout column>
                        <h4 class="bold">History</h4>
                        <v-layout class="vertical-center mb-5 mt-4">
                            <h4 class="color-darkgray medium mr-4a"><a class="color-darkgray">Login</a></h4>
                            <v-divider inset vertical></v-divider>
                            <h4 class="color-darkgray medium mr-4a ml-4"><a class="active-history">Security Settings</a></h4>
                        </v-layout>
                    </v-layout>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><h5 class="color-darkgray">Date</h5></v-flex>
                        <v-flex md6><h5 class="color-darkgray">Security Settings</h5></v-flex>
                        <v-flex md2><h5 class="color-darkgray">IP</h5></v-flex>
                    </v-layout>



                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                        <v-flex md6><h5 class="color-black">Turn off SMS authentication</h5></v-flex>
                        <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                        <v-flex md6><h5 class="color-black">Turn on email authentication</h5></v-flex>
                        <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                        <v-flex md6><h5 class="color-black">Turn off SMS authentication</h5></v-flex>
                        <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                        <v-flex md6><h5 class="color-black">Turn off SMS authentication</h5></v-flex>
                        <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
                    </v-layout>


                    <v-divider class="mt-4 mb-4"></v-divider>
                    <v-layout wrap row class="vertical-center">
                        <v-flex md4><h5 class="color-black">2018-07-23 10:05:32</h5></v-flex>
                        <v-flex md6><h5 class="color-black">Turn on email authentication</h5></v-flex>
                        <v-flex md2><h5 class="color-black">210.91.70.158</h5></v-flex>
                    </v-layout>

                    <v-divider class="mt-4 mb-4"></v-divider>

                    <Pagination class="text-md-center mt-5 mb-4"></Pagination>


                </div>










            </v-flex>


        </v-layout>


    </div>









































</div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";
    import BigAvatar from '@/components/BigAvatar.vue';
    import Avatar from '@/components/Avatar.vue';
    import Pagination from '@/components/Pagination.vue';
    import Toggle from '@/components/Toggle.vue';

    export default {
        name: "MyPage",
        components:{BigAvatar, Avatar, Pagination, Toggle},
        data: () => ({
        user : {
            email: 'Charles',
            volumeTotal: 119,
            limitMax: 66.0,
            price: 224,
            adType: 44.0,
            tradeRate: 99,
            memo : 'Payment to be made via FAST transfer to my DBS Singapore account. I strive to provide competitive rate and quick executition.\n' +
        '            If urgent, please message me on Telegram at +84963126446',
            isLogin : true,
            color : '#8869CA',
            rank : 1,
        },
        }),
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
        },


    }
</script>

<style scoped>


        .flex-pl-0 {
            padding-left: 0px;

        }
        .flex-pr-0 {
            padding-right: 0px;
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

    .active-history {
    color: #214ea1;
        text-decoration: underline;
    }



</style>