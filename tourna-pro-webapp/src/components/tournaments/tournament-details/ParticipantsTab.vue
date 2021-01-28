<template>
  <div class="participants-tab">
    <div v-if="participants.requests.length > 0">
      <team-line
        v-for="team in participants.teams"
        :key="team.id"
        :team="team"
        :canSelect="true"
        @selected="$router.push({ name: 'TeamDetails', params: { id: team.id } })"
      />
      
      <user-line
        v-for="user in participants.users"
        :key="user.id"
        :user="user"
        :canSelect="true"
        :canDelete="false"
        :isOwner="false"
        @selected="$router.push({ name: 'UserProfile', params: { id: user.id } })"
      />

      <participant-line
        v-for="request in anonymousRequests"
        :key="request.id"
        :canDelete="false"
        :name="request.participant.name"
        :canSelect="true"
      />
    </div>
    <placeholder-text v-else text="Ancora nessun partecipante accettato" />
  </div>
</template>

<script>
import TeamLine from '../../teams/TeamLine.vue'
import ParticipantLine from '../../ui/ParticipantLine.vue'
import PlaceholderText from '../../ui/PlaceholderText.vue'
import UserLine from '../../users/UserLine.vue'
export default {
  components: { TeamLine, UserLine, ParticipantLine, PlaceholderText },
  props: {
    participants: Object
  },
  computed: {
    anonymousRequests() {
      return this.participants.requests
        .filter(r => !r.userId && !r.teamId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>