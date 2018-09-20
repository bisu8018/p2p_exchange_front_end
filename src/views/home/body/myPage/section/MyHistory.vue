<template>
    <div class="myPage-box pb-4">

        <!-- Header -->
        <div class="otherInfo-header history-header">
            <h4>{{ $str('history') }}</h4>

            <!-- 텝 -->
            <div class="history-tab">
                <div v-for="(item, index) in tabs">
                    <p class="history-tab-item"
                       :class="{ 'selected-tab' : selectedTab === index }"
                       @click="selectTab(index)">
                        {{ item }}
                    </p>
                </div>
            </div>
        </div>

        <!-- 로그인 텝 선택 시 -->
        <div v-if="selectedTab === 0">

            <!-- 로그인 히스토리가 없을 때 : Empty State -->
            <div v-if="loginHistory.totalCount === 0">
                <h5>{{ $str('noMoreRecords') }}</h5>
            </div>


            <!-- 로그인 히스토리가 있을 때 -->
            <div v-else-if="loginHistory.totalCount !== 0">

                <!-- 표 헤더 : PC에서만 보인다 -->
                <div class="history-login mobile-hide">
                    <div>{{ $str('date') }}</div>
                    <div>{{ $str('Type') }}</div>
                    <div>IP</div>
                    <div>{{ $str('status') }}</div>
                </div>

                <!-- 로그인 히스토리 리스트 -->
                <div v-for="data in loginHistory.loginHistoryList">
                    <history-login-item
                        :data="data"
                    />
                </div>
            </div>

            <!-- Pagination -->
            <div class="pagination-wrapper">
                <v-pagination
                        v-model="loginPage"
                        @input="onLoginPage(loginPage)"
                        :color="'TextBlue'"
                        :length="pageLength('login')"
                />
            </div>
        </div>

        <!-- 보안 설정 텝 선택 시 -->
        <div v-else-if="selectedTab === 1">

            <!-- 보안 설정 히스토리가 없을 때 : Empty State -->
            <div v-if="securitySettings.totalCount === 0">
                <h5>{{ $str('noMoreRecords') }}</h5>
            </div>

            <!-- 보안 설정 히스토리가 있을 때 -->
            <div v-else-if="securitySettings.totalCount !== 0">

                <!-- 표 헤더 : PC에서만 보인다 -->
                <div class="history-security mobile-hide">
                    <div>{{ $str('date') }}</div>
                    <div>{{ $str('securitySettings') }}</div>
                    <div>IP</div>
                </div>

                <!-- 보안 설정 히스토리 리스트 -->
                <div v-for="data in securitySettings.securitySettingHistoryList">
                    <history-security-settings-item
                            :data="data"
                    />
                </div>
            </div>

            <!-- Pagination -->
            <div class="pagination-wrapper">
                <v-pagination
                        v-if="securitySettings.totalCount !== 0"
                        v-model="historyPage"
                        @input="onHistoryPage(historyPage)"
                        :color="'TextBlue'"
                        :length="pageLength('security')"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import HistoryLoginItem from "../item/HistoryLoginItem";
    import HistorySecuritySettingsItem from "../item/HistorySecuritySettingsItem";

    export default {
        components: {
            HistorySecuritySettingsItem,
            HistoryLoginItem
        },
        name: "my-history",
        props: {
            loginHistory: {},
            securitySettings: {},
        },
        data() {
            return {
                tabs: [
                   this.$str('loginText'), this.$str('securitySettings')
                ],
                selectedTab: 0,
                loginPage: 1,
                historyPage: 1,
            }
        },
        computed: {

        },
        methods: {
            selectTab(num) {
                this.selectedTab = num;
            },
            onLoginPage(num) {
                this.$emit('onLoginPage', num);
            },
            onHistoryPage(num) {
                this.$emit('onHistoryPage', num);
            },
            pageLength(type) {
                let a = 0;

                if (type === 'login') {
                    a = this.loginHistory.totalCount;
                } else if (type === 'security') {
                    a = this.securitySettings.totalCount;
                }
                let result = 1;

                // 나머지가 없을 때
                if (a % 10 === 0 && a > 9) {
                    result = a / 10;
                } else if (a % 10 !== 0 && a > 9) {
                    result = (parseInt(a / 10)) + 1;
                }
                return result;
            },
        }
    }
</script>

<style scoped>

    .history-header {
        border-bottom: none;
    }

    /* 텝 */
    .history-tab {
        font-size: 14px;
        font-weight: 500;
        padding-top: 18px;
        color: #9294a6;
    }

    .history-tab > div {
        display: inline-block;
    }

    .history-tab-item {
        display: inline-block;
        padding: 4px 0;
        cursor: pointer;
        margin-right: 18px;
    }

    .selected-tab {
        font-weight: bold;
        color: #214ea1;
        border-bottom: 2px solid #214ea1;
    }

    .history-login,
    .history-security {
        display: flex;
        color: #9294a6;
        border-bottom: 1px solid #d1d1d1;
        padding-bottom: 8px;
    }

    .history-login > div:nth-of-type(1) {
        width: 30%;
    }

    .history-login > div:nth-of-type(2) {
        width: 25%;
    }

    .history-login > div:nth-of-type(3) {
        width: 25%;
    }

    .history-login > div:nth-of-type(4) {
        width: 20%;
        text-align: right;
    }

    .history-security > div:nth-of-type(1) {
        width: 30%;
    }

    .history-security > div:nth-of-type(2) {
        width: 50%;
    }

    .history-security > div:nth-of-type(3) {
        width: 20%;
        text-align: right;
    }

    @media (max-width: 959px) {
        .mobile-hide {
            overflow: hidden;
            display: block;
            height: 1px;
            background-color: #d1d1d1;
            padding: 0;
        }

        .history-login > div:nth-of-type(1),
        .history-login > div:nth-of-type(2),
        .history-login > div:nth-of-type(3),
        .history-login > div:nth-of-type(4),
        .history-security > div:nth-of-type(1),
        .history-security > div:nth-of-type(2),
        .history-security > div:nth-of-type(3) {
            width: 100%;
            text-align: left;
            padding: 8px 0;
        }
    }

    .pagination-wrapper {
        max-width: 360px;
        margin: 48px auto 24px;
        text-align: center;
    }
</style>