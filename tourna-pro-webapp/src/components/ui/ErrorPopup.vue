<template>
  <b-modal ref="my-modal" id="modal-center" hide-footer centered title="C'è stato un errore!" @close="dismiss">
    <p class="my-4">{{error}}</p>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ErrorPopup",
  methods: {
    dismiss() {
      this.$store.dispatch("dismissError");
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
  computed: mapGetters(["error"]),
  watch: {
    error(newVal) {
      if (newVal) {
        this.showModal();
      } else {
        this.hideModal();
      }
    },
  },
};
</script>