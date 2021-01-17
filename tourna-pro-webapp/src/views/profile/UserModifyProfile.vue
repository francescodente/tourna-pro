<template>
  <div class="main">

    <div v-if="user">
      <avatar size="5em" :src="user.imageUrl" />
      <div class="nickname">{{ user.username }}</div>

      <div class="inputs">
        <user-info :value="user"/>
      </div>
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import Avatar from "../../components/profile/Avatar.vue";
import UserInfo from "../../components/registration/UserInfo.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";

export default {
  components: { Avatar, UserInfo, SimpleInput },
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
.main {
  margin-top:10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.nickname{
  font-size: 10pt;
  text-align: center;
}

.inputs{
  margin-top: 15px;
}

</style>