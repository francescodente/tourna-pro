<template>
  <div class="user-list">
    <user-line
      v-for="user in users"
      :key="user.id"
      :user="user"
      :canDelete="canDelete"
      :canSelect="canSelect"
      @selected="$emit('userSelected', user)"
      @deleted="$emit('userDeleted', user)"
    />
  </div>
</template>

<script>
import UserLine from './UserLine.vue'
export default {
  components: { UserLine },
  props: {
    users: Array,
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