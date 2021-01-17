<template>
  <div>
    <h1>Nuova Squadra</h1>

    <team-editor
      initialName=""
      :initialMembers="[]"
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
  }
};
</script>

<style lang="scss" scoped>

</style>