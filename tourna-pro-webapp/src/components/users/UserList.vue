<template>
  <div class="user-list">
    <user-line
      v-for="user in usersWithLoggedInUserFirst"
      :key="user.id"
      :user="user"
      :canDelete="canDelete"
      :canSelect="canSelect"
      :isOwner="user.id == owner"
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
    owner: String,
    canDelete: {
      type: Boolean,
      default: true,
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    usersWithLoggedInUserFirst() {
      let userId = this.$store.getters.userId
      let loggedInUser = this.users.find(x => x.id == userId)
      if (loggedInUser) {
        return [loggedInUser, ...this.users.filter(x => x.id != userId)]
      } else {
        return this.users
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>