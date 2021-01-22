<template>
  <div>
    <b-alert v-model="showAlert" variant="warning" dismissible fade>
      Le tue informazioni sono state aggiornate
    </b-alert>
    <div v-if="user" class="main">
      <avatar size="5em" :src="user.imageUrl" />
      <div class="nickname">@{{ user.username }}</div>

      <div class="inputs">
        <simple-form submitMessage="Salva Modifiche" @submit="updateUser">
          <user-info v-model="user" />
        </simple-form>
      </div>
    </div>
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import Avatar from "../../components/profile/Avatar.vue";
import UserInfo from "../../components/registration/UserInfo.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";
import SimpleForm from "../../components/ui/SimpleForm.vue";

export default {
  components: { Avatar, UserInfo, SimpleInput, SimpleForm },
  data: function () {
    return {
      user: null,
      showAlert: false,
    };
  },
  methods: {
    async fetchUser() {
      this.user = await dataAccess.users.getUser(this.userId);
      this.user.birthDate = this.user.birthDate.split("T")[0];
    },
    async updateUser() {
      this.user = await dataAccess.users.updateUser(this.userId, this.user);
      this.showAlert = true;
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  async created() {
    await this.fetchUser();
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 20px 30px;
}
.nickname {
  font-size: 10pt;
  text-align: center;
}

.inputs {
  margin-top: 5%;
  height: 100%;
  width: 90%;
  margin-left: 5%;
}
</style>