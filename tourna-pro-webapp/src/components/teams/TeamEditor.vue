<template>
  <div>
    <div class="input-container">
      <input
        type="text"
        placeholder="Nome della squadra"
        autocomplete="off"
        :value="currentName"
        @input="$emit('update:name', currentName)"/>
    </div>

    <h2>Aggiungi membri</h2>
    <div class="add-members input-container">
      <user-auto-complete @selected="addMember"/>
    </div>

    <div class="members">
      <h2>Membri</h2>
      <team-member-list :members="members" :canDelete="true" :canSelect="false" @member-deleted="deleteMember"/>
    </div>

    <floating-button v-if="disabled == false" icon="fas fa-check" @click="$emit('submit')" />
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
    name: String,
    members: Array,
    disabled: Boolean
  },
  data() {
    return {
      currentName: this.name,
      memberToAdd: ''
    }
  },
  methods: {
    addMember(member) {
      if (this.members.map(x => x.id).includes(member.id)) {
        return
      }
      this.$emit('member-added', member)
    },
    deleteMember(id) {
      this.$emit('member-deleted', id)
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