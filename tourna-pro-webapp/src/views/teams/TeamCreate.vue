<template>
  <div>
    <h1>Nuova Squadra</h1>

    <team-editor
      :name.sync="name"
      :members="members"
      @member-added="addMember"
      @member-deleted="deleteMember"
      @submit="onSubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamEditor from '../../components/teams/TeamEditor.vue';
import TeamMemberList from '../../components/teams/TeamMemberList.vue';
import FloatingButton from '../../components/ui/FloatingButton.vue';
import style from "../../style/export.scss";

export default {
  components: {TeamMemberList, FloatingButton, TeamEditor},
  props: {
    icon: String,
  },
  data() {
    return {
      name: '',
      members: []
    }
  },
  methods: {
    addMember(member) {
      this.members = this.members.push(member)
    },
    deleteMember(id) {
      this.members = this.members.filter(x => x.id != id)
    },
    onSubmit() {

    }
  },
  async created() {
    await this.$store.dispatch('fetchUser', this.$store.getters.userId)
  }
};
</script>

<style lang="scss" scoped>

</style>