<template>
    <v-layout wrap align-center>
        <div class="p-relative selectbox-width" @click="onShow()">
            <div class="o-none comp-selectbox h6 vertical-center" :id="selectBoxType" :class="selectBoxType">
                {{ selectedValue }}
            </div>
            <div class="p-relative">
                <ul class="o-none select-option-list"  :class="{'scroll-out' : showOptions , 'scroll-up' : !showOptions && showOptions !== ''  && !showInit}">
                    <li class="select-option vertical-center" v-for="data in getList" @click="onSelect(data)"
                        :class="selected === (selectBoxType === 'customToken' || selectBoxType === 'generalToken' ? data.tokenNo : data.code) ? 'selected-option' : ''">
                        {{ selectBoxType === 'customToken' || selectBoxType === 'generalToken' ?
                        data.tokenName : (data.value ? data.value : data.code) }}
                    </li>
                </ul>
            </div>
            <i class="material-icons comp-selectbox-icon" :class="{'arrow-spin-left' : showOptions}">keyboard_arrow_down</i>
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
            selectedValue: "",
            showOptions: '',
            showInit: false,
            phones: SelectBox.phones(),
        }),
        computed: {
            getList() {
                return this.phones;
            },
        },
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
                    this.selected = this.getList[0].code;
                    this.selectedValue = this.getList[0].value;
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
                this.selectedValue = data.value;
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
                    this.showInit = false;
                }else{
                    this.showOptions = false;
                }
            }
        },
    }
</script>

<style> /*특정 뷰에서 셀렉박스 길이 설정 필요 시, selectbox-width 클래스 지정 후 사용*/</style>