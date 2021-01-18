<template>
  <div>
    <h2 :style="'background-color: '+mainColor">{{ title }}</h2>
    <div class="add-users" :style="'background-color: '+backgroundColor">
      <user-auto-complete @selected="addUser" :exclude="value"/>
    </div>

    <h2 :style="'background-color: '+mainColor">{{ subTitle }}</h2>
    <div class="users-list">
      <user-list :users="value" :canDelete="true" :canSelect="false" @userDeleted="deleteUser" />
    </div>
  </div>
</template>

<script>
import UserList from '../users/UserList.vue'
import UserAutoComplete from '../ui/UserAutoComplete.vue'
export default {
  components: { UserAutoComplete, UserList },
  props: {
    value: Array,
    title: String,
    subTitle: String,
    mainColor: {type: String, default: 'inherit'},
    backgroundColor: {type: String, default: 'inherit'}
  },
  methods: {
    addUser(user) {
      if (this.value.map(x => x.id).includes(user.id)) {
        return
      }
      this.$emit('input', [...this.value, user])
      this.$emit('userAdded', user)
    },
    deleteUser(user) {
      this.$emit('input', this.value.filter(x => x.id != user.id))
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
  color: inherit;
}

.add-users {
  width: 100%;
  padding: 10px;
}
</style>