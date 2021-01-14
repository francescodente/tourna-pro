<template>
  <div class="main">

    <avatar size="5em" />
    <div class="nickname">{{ user.username }}</div>

    <div class="inputs">
      <user-info :value="user"/>
      <simple-input
        label="Bio"
        type="text"
        v-model="user.bio"
        identifier="bio"
        @input="$emit('input', currentValue)"
      />
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Avatar from "../../components/profile/Avatar.vue";
import UserInfo from "../../components/registration/UserInfo.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";

export default {
  components: { Avatar, UserInfo, SimpleInput },
  data: function () {
    return {
    };
  },
  methods: {
    ...mapActions([
      "updateUser"
    ]),
  },
  computed: {
    ...mapGetters([
      "user",
      "userInterests",
      "userAchievements",
      "userId"
    ]),
  },
  async created() {
    await this.updateUser(this.userId,this.userInterests)
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