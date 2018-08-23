<template>
    <div class="history-security-detail">
        <div>
            <span class="label-mobile-history">{{ $str('date') }}:</span>
            {{ toTimeFormat(data.registerDatetime) }}
        </div>
        <div>
            <span class="label-mobile-history">{{ $str('securitySettings') }}:</span>
            {{ txt }}
        </div>
        <div>
            <span class="label-mobile-history">IP:</span>
            {{ data.ip }}
        </div>
    </div>
</template>

<script>
    import {abUtils} from "../../../../../common/utils";

    export default {
        name: "history-security-settings-item",
        props: {
            data: {}
        },
        data() {
            return {
                txt: '',
            }
        },
        created() {
            // data type에 따라 텍스트 바꿔주기
            if (this.data.type === 'turn_on_email') {
                this.txt = this.$str('Turn on email authentication');
            } else if (this.data.type === 'add_id') {
                this.txt = this.$str('Add Id verification');
            } else if (this.data.type === 'add_passport') {
                this.txt = this.$str('Add Advanced verification');
            } else if (this.data.type === 'update_id') {
                this.txt = this.$str('Update Id');
            } else if (this.data.type === 'add_phone') {
                this.txt = this.$str('Add phone');
            }
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
    .history-security-detail{
        display: flex;
        color: #353535;
        padding: 26px 0;
        border-bottom: 1px solid #d1d1d1;
    }

    .history-security-detail > div:nth-of-type(1) {
        width: 30%;
    }

    .history-security-detail > div:nth-of-type(2) {
        width: 50%;
    }

    .history-security-detail > div:nth-of-type(3) {
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

        .history-security-detail {
            display: block;
        }

        .history-security-detail > div:nth-of-type(1),
        .history-security-detail > div:nth-of-type(2),
        .history-security-detail > div:nth-of-type(3) {
            width: 100%;
            text-align: left;
            padding: 8px 0;
        }
    }
</style>