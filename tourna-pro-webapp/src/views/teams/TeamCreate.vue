<template>
  <div>
    <h1>Nuova Squadra</h1>

    <team-editor
      v-if="user"
      initialName=""
      :initialMembers="[user]"
      @submit="onSubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamEditor from '../../components/teams/TeamEditor.vue';
import style from "../../style/export.scss";
import dataAccess from '../../data-access'

export default {
  components: {TeamEditor},
  props: {
    icon: String,
  },
  data() {
    return {
      user: null
    }
  },
  methods: {
    async onSubmit(name, members) {
      let team = await dataAccess.teams.create({ name })
      for (let m of members) {
        await dataAccess.teamMembers.addMember(team.id, {
          userId: m.id
        })
      }
      this.$router.push({ name: 'TeamDetails', params: { id: team.id }})
    }
  },
  async created() {
    this.user = await dataAccess.users.getUser(this.$store.getters.userId)
  }
};
</script>

<style lang="scss" scoped>

</style>