<template>
    <v-layout wrap align-center>
        <div class="w-full" @click="onShow()">
            <div class="o-none comp-selectbox comp-selectbox-parted h6 vertical-center" :id="selectBoxType" :class="selectBoxType">
                {{ selected }}
            </div>

            <i class="material-icons comp-selectbox-icon comp-selectbox-icon-phone" :class="{'arrow-spin-left' : showOptions}">keyboard_arrow_down</i>

            <div class="">
                <ul class="o-none select-option-list"  :class="{'scroll-out' : showOptions , 'scroll-up' : !showOptions && showOptions !== ''&& !showInit}">
                    <li class="select-option vertical-center" v-for="data in phones" @click="onSelect(data)"
                        :class="selected === data.code ? 'selected-option' : ''">
                        {{ data.value }}
                        <span class="f-right">{{ data.code }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </v-layout>
</template>

<script>

    import SelectBox from "../../../../../vuex/model/SelectBox";

    export default {
        name: 'phone-select-box',
        props: {
            'selectBoxType': {type: String, default: 'country'},        //country, currency, payment, phone, customToken
            'editValue': ''    // 수정 모드, 데이터
        },
        data: () => ({
            selected: '',
            showOptions: '',
            phones: SelectBox.phones(),
            showInit: false,
        }),
        created() {
            this.$nextTick(() => {
                this.init();
            });
        },
        mounted() {
            this.$eventBus.$emit('clickEvent', (event) => {
                this.hideOnClickOutside(event);
            });
        },
        beforeDestroy() {
            this.selected = '';
            this.$eventBus.$off('clickEvent', (event) => {});
        },
        methods: {

            //  VUEX 초기화
            init() {
                if (this.editValue) {
                    this.selected = this.editValue;
                } else {
                    this.selected = this.phones[0].code;
                }
                this.setting();
            },

            //  값 설정
            setting() {
                this.$emit(this.selectBoxType, this.selected);
            },

            //선택 시
            onSelect(data) {
                this.selected = data.code;
                this.setting();
            },
            //영역 밖 클릭시 스크롤 업
            hideOnClickOutside(event) {
                if (!event.target.classList.contains(this.selectBoxType) ){
                    this.showInit = true;
                    this.showOptions = false;
                }
            },
            onShow() {
                if(this.showOptions === '' || !this.showOptions){
                    this.showOptions = true;
                }else{
                    this.showOptions = false;
                }
            }
        },
    }
</script>

<style>

</style>