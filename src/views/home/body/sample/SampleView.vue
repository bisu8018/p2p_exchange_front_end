<template>
    <div>
        <!-- 모바일 버전일 경우 레이아웃 -->
        <div v-if="isMobile">

        </div>
        <!-- 데탑용 -->
        <div v-else>
            {{ country }}
        </div>


    </div>
</template>

<script>
    import MainRepository from "../../../../vuex/MainRepository";

    export default {
        name: "sample-view",
        components: {},
        props: {

        },
        data() {
            return {
                isMobileMode: false,
            }
        },
        computed: {
            isMobile() {
                return MainRepository.State.isMobile();
            },
            userInfo() {
                return MainRepository.User.controller().getUser();
            },
            country() {
                return MainRepository.Country.get();
            }
        },
        created() {
            MainRepository.Service.Account().Account.login('hi', '1234',
                function (data, num) {

            })
        },
        mounted() {

            this.$nextTick(function() {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })

        },
        methods: {
            getWindowWidth() {
                // 모바일 버전으로 전환됨
                if (document.documentElement.clientWidth < 768) {
                    if (!this.isMobileMode) {
                        this.isMobileMode = true;
                        MainRepository.state().setIsMobile(true);
                    }
                } else {  // PC 버전으로 전환됨
                    if (this.isMobileMode) {
                        this.isMobileMode = false;
                        MainRepository.state().setIsMobile(false);

                    }
                }
            },
            setOk() {
                MainRepository.Sample.controller().setOk(true);
            }

        }
    }
</script>

<style scoped>

</style>