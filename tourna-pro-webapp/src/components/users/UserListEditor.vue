<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="add-users">
      <user-auto-complete @selected="addUser"/>
    </div>

    <h2>{{ subTitle }}</h2>
    <div class="users-list">
      <team-member-list :members="currentUsers" :canDelete="true" :canSelect="false" @memberDeleted="deleteUser" />
    </div>
  </div>
</template>

<script>
import TeamMemberList from '../teams/TeamMemberList.vue'
import UserAutoComplete from '../ui/UserAutoComplete.vue'
export default {
  components: { UserAutoComplete, TeamMemberList },
  props: {
    value: Array,
    title: String,
    subTitle: String
  },
  data() {
    return {
      currentUsers: [...this.value]
    }
  },
  methods: {
    addUser(user) {
      if (this.currentUsers.map(x => x.id).includes(user.id)) {
        return
      }
      this.currentUsers.push(user)
      this.$emit('input', this.currentUsers)
      this.$emit('userAdded', user)
    },
    deleteUser(user) {
      this.currentUsers = this.currentUsers.filter(x => x.id != user.id)
      this.$emit('input', this.currentUsers)
      this.$emit('userDeleted', user)
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0px;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: $color-complementary;
}

.add-users {
  width: 100%;
  padding: 10px;
  background-color: $color-complementary-background;
}
</style>