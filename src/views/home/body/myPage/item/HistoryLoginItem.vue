<template>
    <div class="history-login-detail">
        <div>
            <span class="label-mobile-history">{{ $str('date') }}:</span>
            {{ toTimeFormat(data.registerDatetime) }}
        </div>
        <div>
            <span class="label-mobile-history">{{ $str('Type') }}:</span>
            {{ $str(data.type) }}
        </div>
        <div>
            <span class="label-mobile-history">IP:</span>
            {{ data.ip }}
        </div>
        <div>
            <span class="label-mobile-history">{{ $str('status') }}:</span>
            {{ data.status === 'success' ? $str('successful') : $str('failed') }}
        </div>
    </div>
</template>

<script>
    import {abUtils} from "../../../../../common/utils";

    export default {
        name: "history-login-item",
        props: {
            data: {}
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
    .history-login-detail{
        display: flex;
        color: #353535;
        padding: 26px 0;
        border-bottom: 1px solid #d1d1d1;
    }

    .history-login-detail > div:nth-of-type(1) {
        width: 30%;
    }

    .history-login-detail > div:nth-of-type(2) {
        width: 25%;
    }

    .history-login-detail > div:nth-of-type(3) {
        width: 25%;
    }

    .history-login-detail > div:nth-of-type(4) {
        width: 20%;
        text-align: right;
    }

    .label-mobile-history {
        display: none;
    }

    @media (max-width: 768px) {
        .label-mobile-history {
            color: #9294a6;
            display: inline-block;
            min-width: 80px;
        }

        .history-login-detail{
            display: block;
        }

        .history-login-detail > div:nth-of-type(1),
        .history-login-detail > div:nth-of-type(2),
        .history-login-detail > div:nth-of-type(3),
        .history-login-detail > div:nth-of-type(4) {
            width: 100%;
            text-align: left;
            padding: 8px 0;
        }
    }

</style>