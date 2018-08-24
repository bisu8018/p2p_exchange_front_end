<template>
    <!-- 좌측 내 정보 -->
    <div class="my-info-wrapper">

        <!-- 닉네임, 아바타 -->
        <div class="pt-0">
            <avatar big me />
            <div class="ml-3">
                <p class="color-blue mb-1">{{ myInfo.nickname }}</p>
                <p class="color-darkgray">UID: {{ myInfo.memberNo }}</p>
            </div>
        </div>

        <!-- 트레이드 횟수, 평균 시간 -->
        <div class="d-block">
            <p class="mb-1">
                <span class="color-darkgray mr-2">{{ $str('trades') }}:</span>
                <span class="color-black"> {{ myOrderStat.tradeTimes }} {{ $str('times') }}</span>
            </p>
            <p>
                <span class="color-darkgray mr-2">{{$str('avgRelease')}}:</span>
                <span class="color-black"> {{ myOrderStat.avgRelease }} {{ $str('minuteText' )}}</span>
            </p>
        </div>

        <!-- Create Account Time -->
        <div class="color-darkgray d-block">
            <p class="d-block">{{ $str('accountCreatedTime') }} {{ toTimeFormat(myInfo.createDatetime) }}, </p>
            <p>{{ getTimes }}</p>
        </div>
    </div>
</template>

<script>
    import {abUtils} from "../../../../../common/utils";
    import Avatar from "../../../../../components/Avatar";

    export default {
        components: {
            Avatar,
            },
        name: "my-info",
        props: {
            myInfo: {},
            myOrderStat: {},
        },
        data() {
            return {
                monthTradeTxt: '',
            }
        },
        computed: {
            getTimes () {
                if (this.myOrderStat.tradeMonthTimes > 0) {
                    return this.$str('Trades') + ' : ' + this.myOrderStat.tradeMonthTimes;
                } else {
                    return this.$str('No Trade Records');
                }
            }
        },
        created() {
        },
        methods: {
            // 시간 포멧으로 바꿔줌
            toTimeFormat(time) {
                return abUtils.toTimeFormat(time);
            },
        }
    }
</script>

<style scoped>

    .my-info-wrapper > div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: solid 1px #d1d1d1;
        padding: 24px 0;
    }

    .my-info-wrapper > div:last-child {
        border-bottom: none;
    }

    @media (max-width: 940px) {
        .my-info-wrapper > div {
            display: block;
        }

        .my-info-wrapper > div:first-child {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        }
    }

</style>