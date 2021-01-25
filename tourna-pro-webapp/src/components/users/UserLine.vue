<template>
  <participant-line
    :name="user.username"
    :secondaryName="`${user.firstName} ${user.lastName}`"
    :imageUrl="user.imageUrl"
    :canDelete="canDelete && user.id != $store.getters.userId"
    :canSelect="canSelect"
    :isOwner="isOwner"
    @selected="$emit('selected', user)"
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
    user: Object,
    isOwner: Boolean,
    canDelete: {
      type: Boolean,
      default: true
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  }
}
</script>