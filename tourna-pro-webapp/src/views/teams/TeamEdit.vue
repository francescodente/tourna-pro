<template>
  <div>
    <h1>Modifica Squadra</h1>
    <team-editor v-if="loaded" :initialMembers="initialMembers" :initialName="team.name" :owner="team.creatorId" @submit="updateTeam" />
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import TeamEditor from '../../components/teams/TeamEditor.vue';
import style from "../../style/export.scss";

export default {
  components: {TeamEditor},
  props: {
    icon: String,
  },
  data() {
    return {
      loaded: false,
      team: null,
      initialMembers: []
    }
  },
  methods: {
    async updateTeam(newName, newMembers) {
      let team = await dataAccess.teams.update(this.teamId, {
        name: newName
      })
      for (let member of newMembers) {
        if (!this.initialMembers.find(x => x.id == member.id)) {
          await dataAccess.teamMembers.addMember(this.teamId, {
            userId: member.id
          })
        }
      }
      for (let member of this.initialMembers) {
        if (!newMembers.find(x => x.id == member.id)) {
          await dataAccess.teamMembers.deleteMember(this.teamId, member.id)
        }
      }
      this.$router.push({ name: 'TeamDetails', params: { id: this.teamId }})
    }
  },
  computed: {
    teamId() {
      return this.$route.params.id
    },
    currentUserId() {
      return this.$store.getters.userId
    }
  },
  async created() {
    this.team = await dataAccess.teams.get(this.teamId)
    this.initialMembers = await dataAccess.users.search({
      userIds: JSON.stringify(this.team.members)
    })
    this.loaded = true
  }
};
</script>

<style lang="scss" scoped>

</style>