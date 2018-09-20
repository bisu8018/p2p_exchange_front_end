<template>
  <v-dialog v-model="show">
    <div>
      <div class="modal-subject-wrapper mb-3">
        <div class="h3 text-xs-left color-black bold">
          {{$str("Export")}} {{$str("Data")}}
        </div>
        <v-spacer></v-spacer>
        <i class="material-icons color-black c-pointer" @click="onClose">close</i>
      </div>
      <div>
        <div class="color-darkgray mb-4 text-xs-left">
          {{$str("ExportDataExplain")}}
        </div>
      </div>
      <div class="text-xs-right mt-4">
        <v-spacer></v-spacer>
        <button @click="onClose" class="btn-rounded-white btn-blue-hover mr-3">
          {{$str("cancel")}}
        </button>
        <button @click="onConfirm" class="btn-rounded-blue common-btn-hover">
          {{$str("confirm")}}
        </button>
      </div>
    </div>
  </v-dialog>
  
</template>

<script>
    import MainRepository from "../../../../../../vuex/MainRepository"

    export default {
        name: "MyOrderDownloadDialog",
        data: () => ({
            show : false,
        }),
        components: {
        },
        created(){
            this.$eventBus.$on('showMyOrderDownloadDialog',()=>{
                this.show = true
            })
        },
        methods: {
            onConfirm: function () {
                MainRepository.MyOrder.getMyOrderDownload();
                this.onClose()
                this.$eventBus.$emit('showAlert', 2000);
            },
            onClose: function () {
                this.show = false;
            },
        },
    }
</script>

<style scoped>
  .modal-subject-wrapper {
    display: flex;
  }

</style>