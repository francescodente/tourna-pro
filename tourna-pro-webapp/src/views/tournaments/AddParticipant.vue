<template>
  <div>
    <b-alert v-model="showAlert" variant="warning" dismissible fade>
      Il partecipante è stato aggiunto
    </b-alert>
    <div class="main">
      <simple-form
        submitMessage="Aggiungi partecipante"
        @submit="onSubmit"
        :canSubmit="formValid"
      >
        <simple-validator
          v-model="nameOk"
          errorText="Il nome non può essere vuoto"
          :validator="notEmpty"
          v-slot="scope"
        >
          <simple-input
            label="Nome"
            type="text"
            v-model="name"
            identifier="name"
            :scope="scope"
          />
        </simple-validator>

        <simple-validator
          v-model="telephoneOk"
          errorText="Bisogna inserire almeno un recapito telefonico"
          :validator="notEmpty"
          v-slot="scope"
        >
          <simple-input
            label="Recapito telefonico"
            type="text"
            v-model="telephone"
            identifier="telephone"
            :scope="scope"
          />
        </simple-validator>
      </simple-form>
    </div>
  </div>
</template>

<script>
import SimpleForm from "@/components/ui/SimpleForm.vue";
import SimpleInput from "@/components/ui/SimpleInput.vue";
import SimpleValidator from "@/components/ui/SimpleValidator.vue";
import dataAccess from "@/data-access";
export default {
  components: {
    SimpleForm,
    SimpleInput,
    SimpleValidator,
  },
  data() {
    return {
      name: "",
      telephone: "",
      telephoneOk: false,
      nameOk: false,
      showAlert: false
    };
  },
  methods: {
    notEmpty(x) {
      return x != "";
    },
    onSubmit: async function () {
      if (!this.formValid) {
        return;
      }
      let request = {
        type: "PARTICIPANT",
        participant: {
          name: this.name,
          telephone: this.telephone,
        },
      };
      let req = await dataAccess.participationRequests.add(
        this.$route.params.id,
        request
      );
      await dataAccess.participationRequests.updateStatus(
        this.$route.params.id,
        req.id,
        "APPROVED"
      );
      this.showAlert = true;
      this.telephone = ""
      this.name = ""
      this.telephoneOk = false
      this.nameOk = false
    },
  },
  computed: {
    formValid() {
      return this.nameOk && this.telephoneOk;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 30px;
}
</style>