<template>
  <div class="member-list">
    <team-member
      v-for="member in members"
      :key="member.id"
      :member="member"
      :canDelete="canDelete"
      :canSelect="canSelect"
      @deleted="$emit('member-deleted', member.id)"
    />
  </div>
</template>

<script>
import TeamMember from './TeamMember.vue'
export default {
  components: { TeamMember },
  props: {
    members: Array,
    canDelete: {
      type: Boolean,
      default: true,
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>