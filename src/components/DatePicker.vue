<!--사용법-->
<!--<date-picker v-on:date="onDate" v-on:switch="clear = 'on'" :clear="clear" ></date-picker>-->
<!--data: () => ({-->
    <!--clear: 'on',-->
    <!--date: "",-->
<!--}),-->


<template>
    <div>
        <div class="p-relative ">
            <input type="text" class="input c-pointer" v-bind:value="dateControl"  :placeholder="$str('datePickerPlaceholder')"
                   @click="onDate"  readonly/>
            <i class="material-icons color-darkgray h1 p-absolute date-picker-icon-style ">calendar_today</i>
        </div>
        <div :class="classname" class=" mt-2 d-none p-absolute date-picker-wrapper c-pointer">
            <v-date-picker width="254" v-model="date" @input="onPickDate(date)"></v-date-picker>
        </div>
        <div class="screen-modal-wrapper" @click="onClose()" v-if="this.status"></div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'datePicker',
        props: {
            propsDate: {
                type: String,
                default: ''
            },
            clear: {
                type: String,
                default: ''
            },
            classname: {
                type: String,
                default : 'PickerClass',
            }
        },
        data: () => ({
            date: null,
            status: false,
        }),
        computed: {
          dateControl () {
              if(this.clear == null){
                  return null;
              }else{
                  return this.propsDate !== '' && this.date === null ? this.propsDate : this.date;
              }
          }
        },
        methods: {
            onDate() {
                document.getElementsByClassName(this.classname)[0].style.display = "block";
                this.status = true;
            },
            onPickDate(date) {
                this.onClose();
                this.date = date;
                this.$emit('date', date);
                this.$emit('switch');
            },
            onClose() {
                document.getElementsByClassName(this.classname)[0].style.display = "none";
                this.status = false;
            }
        }
    })

</script>

<style scoped>
</style>