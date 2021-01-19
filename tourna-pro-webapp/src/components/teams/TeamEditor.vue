<template>
  <div>
    <div class="input-container">
      <input
        type="text"
        placeholder="Nome della squadra"
        autocomplete="off"
        v-model="currentName"
      />
    </div>

    <user-list-editor
      title="Aggiungi Membri"
      subTitle="Membri"
      v-model="currentMembers"
      :mainColor="style.colorComplementary"
      :backgroundColor="style.colorComplementaryBackground"
      :owner="owner"
      class="list-editor"
    />

    <floating-button
      v-if="disabled == false"
      icon="fas fa-check"
      @click="onSubmit"
    />
  </div>
</template>

<script>
import FloatingButton from "../../components/ui/FloatingButton.vue";
import style from "../../style/export.scss";
import UserAutoComplete from "../ui/UserAutoComplete.vue";
import UserListEditor from "../users/UserListEditor.vue";

export default {
  components: { FloatingButton, UserAutoComplete, UserListEditor },
  props: {
    initialName: String,
    initialMembers: Array,
    owner: String,
    disabled: Boolean
  },
  data() {
    return {
      style,
      currentName: this.initialName,
      currentMembers: [...this.initialMembers],
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", this.currentName, this.currentMembers);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  padding: 10px;
}

.list-editor{
  color: white;
}

input {
  border: none;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: transparent;
}
</style>