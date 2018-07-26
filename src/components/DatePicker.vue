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
            <i class="material-icons color-darkgray h1 p-absolute icon-style ">calendar_today</i>
        </div>
        <div id="datePickerWrapper" class="mt-2 d-none p-absolute date-picker-wrapper c-pointer">
            <v-date-picker width="254" v-model="date" @input="onPickDate(date)"></v-date-picker>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'datePicker',
        props: ['clear'],
        data: () => ({
            date: null,
        }),
        computed: {
          dateControl () {
              if(this.clear == null){
                  return null;
              }else{
                  return this.date;
              }
          }
        },
        methods: {
            onDate() {
                document.getElementById("datePickerWrapper").style.display = "block";
            },
            onPickDate(date) {
                document.getElementById("datePickerWrapper").style.display = "none";
                this.date = date;
                this.$emit('date', date);
                this.$emit('switch');
            }
        }
    })

</script>

<style scoped>
    .icon-style {
        right: 6px;
        top: 2px;
        pointer-events: none;
    }

    .date-picker-wrapper {
        z-index: 1;
    }
</style>