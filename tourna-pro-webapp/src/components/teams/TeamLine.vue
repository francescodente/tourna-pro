<template>
  <participant-line
    :name="team.name"
    :imageUrl="team.imageUrl"
    :canDelete="false"
    :canSelect="canSelect"
    @selected="$emit('selected', team)"
    @deleted="$emit('deleted')"
  />
</template>

<script>
import Avatar from '../profile/Avatar.vue'
import ListItem from '../ui/ListItem.vue'
import ParticipantLine from '../ui/ParticipantLine.vue'
export default {
  components: { Avatar, ListItem, ParticipantLine },
  props: {
    team: Object,
    canSelect: {
      type: Boolean,
      default: true
    }
  }
}
</script>