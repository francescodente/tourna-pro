<template>
  <div class="main">
    <user-list-editor
      title="Aggiungi Amministratori"
      subTitle="Amministratori"
      v-model="currentOwners"
      @userAdded="addUser"
      @userDeleted="removeUser"
    />
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import UserListEditor from "../../components/users/UserListEditor.vue";
import style from '../../style/export.scss'
export default {
  components: { UserListEditor },
  name: "NameAdmin",
  data: function () {
    return {
      style,
      currentOwners: [],
    };
  },
  methods: {
    async initialOwners() {
      let ids = await dataAccess.tournamentOwners.getAll(this.tournamentId)
      this.currentOwners = await dataAccess.users.search({userIds: JSON.stringify(ids)})
    },
    async addUser(user){
      await dataAccess.tournamentOwners.add(this.tournamentId, user.id)
    },
    async removeUser(user){
      await dataAccess.tournamentOwners.remove(this.tournamentId, user.id)
    }
  },
  computed:{
    tournamentId() {return this.$route.params.id}
  },
  async created() {
    await this.initialOwners()
  }
};
</script>


<style lang="scss" scoped>
.main {
  height: 100%;
  color: $color-secondary2;
}
</style>