<template>
  <v-dialog v-model="show">
    <div class="cs-flex mb-3">
      <!--header-->
      <div class=" h4 bold text-xs-left">
        {{$str("Description")}}
      </div>
      <v-spacer></v-spacer>
      <i class="material-icons color-black c-pointer" @click="onClose">close</i>
    </div>
  </v-dialog>
</template>

<script>
    export default {
        name: "CustomTokenDescription",
        data: () => ({
            show: false,
        }),
        created(){
            this.$eventBus.$on('showTransferDialog', () => {
                this.show = true;
          })
        },
        methods:{
            onClose: function () {
                this.show = false;
            },
        }
    }
</script>

<style scoped>

</style>