<template>
  <div v-if="user">
    <avatar size="5em" :src="user.imageUrl" />
    <div class="nickname">{{ user.username }}</div>

    <div class="inputs">
      <simple-form submitMessage="Salva Modifiche">
        <user-info :value="user"/>
      </simple-form>
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import Avatar from "../../components/profile/Avatar.vue";
import UserInfo from "../../components/registration/UserInfo.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";
import SimpleForm from '../../components/ui/SimpleForm.vue';

export default {
  components: { Avatar, UserInfo, SimpleInput, SimpleForm },
  data: function () {
    return {
      user: null
    };
  },
  methods: {
    async fetchUser() {
      this.user = await dataAccess.users.getUser(this.userId)
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  async created() {
    await this.fetchUser()
  },
};
</script>

<style lang="scss" scoped>

.nickname{
  font-size: 10pt;
  text-align: center;
}

.inputs{
  margin-top: 5%;
  height: 100%;
  width: 90%;
  margin-left: 5%;
}

</style>