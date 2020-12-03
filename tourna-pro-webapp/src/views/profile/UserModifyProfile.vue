<template>
  <div class="main">

    <avatar />
    <div class="nikname">{{ nikname }}</div>

    <div class="bio">
      <user-info />
      <simple-input
        label="Bio"
        type="text"
        v-model="currentValue"
        identifier="bio"
        @input="$emit('input', currentValue)"
      />
    </div>

  </div>
</template>

<script>
import Avatar from "../../components/profile/Avatar.vue";
import UserInfo from "../../components/registration/UserInfo.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";

export default {
  components: { Avatar, UserInfo, SimpleInput },
  data: function () {
    return {
      nikname: "@mario_rossi",
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.nikname {
  color: black;
  font-weight: bold;
}

</style>