<template>
  <div>
    <div class="input-container">
      <input
        type="text"
        placeholder="Nome della squadra"
        autocomplete="off"
        v-model="currentName"/>
    </div>

    <h2>Aggiungi membri</h2>
    <div class="add-members input-container">
      <user-auto-complete @selected="addMember"/>
    </div>

    <div class="members">
      <h2>Membri</h2>
      <team-member-list :members="currentMembers" :canDelete="true" :canSelect="false" @member-deleted="deleteMember"/>
    </div>

    <floating-button v-if="disabled == false" icon="fas fa-check" @click="onSubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamMemberList from '../../components/teams/TeamMemberList.vue';
import FloatingButton from '../../components/ui/FloatingButton.vue';
import style from "../../style/export.scss";
import UserAutoComplete from '../ui/UserAutoComplete.vue';

export default {
  components: {TeamMemberList, FloatingButton, UserAutoComplete},
  props: {
    initialName: String,
    initialMembers: Array,
    disabled: Boolean
  },
  data() {
    return {
      currentName: this.initialName,
      currentMembers: [...this.initialMembers]
    }
  },
  methods: {
    addMember(member) {
      if (this.currentMembers.map(x => x.id).includes(member.id)) {
        return
      }
      this.currentMembers.push(member)
    },
    deleteMember(id) {
      this.currentMembers = this.currentMembers.filter(x => x.id != id)
    },
    onSubmit() {
      this.$emit('submit', this.currentName, this.currentMembers)
    }
  }
};
</script>

<style lang="scss" scoped>

.input-container {
  width: 100%;
  padding: 10px;
}

h2 {
  margin: 0px;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: $color-complementary;
}

input {
  border: none;
  width: 100%;
  border-bottom: 1px solid black;
  background-color: transparent;
}

.add-members {
  background-color: $color-complementary-background;
}

</style>