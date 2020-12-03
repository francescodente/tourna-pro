<template>
  <div class="main">
    <avatar />
    <div class="name">{{ name }}</div>
    <div class="nikname">{{ nikname }}</div>

    <div class="setting">
      <i class="fas fa-cog"></i>
    </div>

    <b-button class="button" variant="outline-primary">
      Modifica Profilo
    </b-button>

    <user-profile-info :user="user" />

    <bio />

    <div class="interessi">
      <divisore :text="text" />
    </div>
    <hashtag-element :element='element'/>

    <div class="achievements">
      <divisore :text="text2" />
    </div>

  </div>
</template>

<script>
import Avatar from "../../components/profile/Avatar.vue";
import Bio from "../../components/profile/Bio.vue";
import Divisore from "../../components/profile/Divisore.vue";
import HashtagElement from '../../components/profile/HashtagElement.vue';
import UserProfileInfo from "../../components/profile/UserProfileInfo.vue";
import TextIcon from "../../components/ui/TextIcon.vue";

export default {
  components: { Avatar, UserProfileInfo, Bio, TextIcon, Divisore, HashtagElement },
  data: function () {
    return {
      name: "Mario Rossi",
      nikname: "@mario_rossi",
      user: {
        birthdate: "16/10/1997",
        telephone: "348-3680498",
        sex: "M",
      },
      text: "Interessi",
      element : "Pallavolo",
      text2: "Achievements",
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
.name {
  font-weight: bold;
  color: black;
}
.button {
  width: 16em;
  color: #ff6b24;
  border-color: #ff6b24;
  font-weight: bold;
}
.setting {
  background-color: #ff6b24;
  color: white;
}
.interessi {
  border-bottom-color: #ff6b24;
  color: #ff6b24;
}

.achievements {
  border-bottom-color: #21eda5;
  color: #21eda5;
}
</style>