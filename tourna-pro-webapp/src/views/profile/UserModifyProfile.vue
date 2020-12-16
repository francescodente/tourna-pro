<template>
  <div class="main">

    <avatar size="5em" />
    <div class="nickname">{{ user.userName }}</div>

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
import Avatar from "../../components/profile/Avatar.vue";
import UserInfo from "../../components/registration/UserInfo.vue";
import SimpleInput from "../../components/ui/SimpleInput.vue";

export default {
  components: { Avatar, UserInfo, SimpleInput },
  data: function () {
    return {
      user: {
        firstName: "Mario",
        lastName: "Rossi",
        userName: "@mario_rossi123",
        birthDay: "16/10/1997",
        telephoneNumber: "3483680498",
        city: "Roma",
        gender: "M",
        bio: "Ciao, mi chiamo Mario e ho una passione per gli sport di squadra",
        interests: ["calcetto", "pallavolo", "basket"],
        achievements: [
          {
            id: 1,
            name: "Lupo Solitario",
            date: "21/03/2019",
            description: "Partecipa al tuo primo torneo come solista.",
            image: "",
          },
        ],
      },
    };
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