<template>
    <transition name="alertItem">
        <div class="notification callout animated" v-if="isClosed"
             :class="{'bd-orange' : isWarning, 'bd-red' : isError, 'bd-green' : isSuccess}">

            <div class="subj-css vertical-center">

                <!--아이콘-->
                <div class="icon-css">
                    <i v-if="notification.type =='Error'" class="h3 material-icons color-red">warning</i>
                    <i v-else-if="notification.type =='Warning'" class="h3 material-icons color-orange">error</i>
                    <i v-else-if="notification.type =='Success'" class="h2 material-icons color-green">check_circle</i>
                </div>

                <!--제목-->
                <h5 class="bold"
                    v-bind:class="{'color-red' : isError, 'color-orange' : isWarning, 'color-green' : isSuccess}">
                    {{$str(notification.title)}}</h5>

                <!--닫기 버튼-->
                <button @click="triggerClose(notification)" aria-label="Close alert">
                    <span aria-hidden="true" class="close-css">&times;</span>
                </button>
            </div>


            <!--내용-->
            <div class="content-css">
                <h6 class="color-darkgray">{{notification.text}}</h6>
            </div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue';

    export default {
        name: 'Alert_test',
        props: ['notification'],
        data: function () {
            return {
                timer: null,
                isClosed: true,
                isError: false,
                isWarning: false,
                isSuccess: false,
            }
        },

        mounted() {
            // type 선별
            switch (this.notification.type) {
                case 'Error':
                    this.isError = true;
                    break;

                case 'Warning':
                    this.isWarning = true;
                    break;

                case 'Success':
                    this.isSuccess = true;
                    break;
            }
            //시간할당
            let timeout = this.notification.hasOwnProperty('timeout') ? this.notification.timeout : true
            if (timeout) {
                let delay = this.notification.delay || 3000;
                this.timer = setTimeout(function () {
                    this.triggerClose(this.notification)
                }.bind(this), delay)
            }

        },
        methods: {
            //닫게 될때
            triggerClose: function (notification) {
                clearTimeout(this.timer);
                this.isClosed = false;
                this.$emit('close-notification', notification.index)
            }
        }
    }
</script>
<style scoped>

</style>