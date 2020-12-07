<template>
  <div class="main">
    <avatar size="3em" />
    <div class="name">{{ user.name }}</div>
    <div class="nikname">{{ user.nikname }}</div>

    <div class="setting">
      <i class="fas fa-cog"></i>
    </div>

    <b-button class="button" variant="outline-primary">
      Modifica Profilo
    </b-button>

    <user-profile-info :user="user" />

    <div class="bio">
      <h5>Su di me:</h5>
      <div>{{ user.bio }}</div>
    </div>

    <div class="interests">
      <divisore text="Interessi" />
      <i class="fas fa-ellipsis-h"></i>
    </div>

    <hashtag-element
      v-for="interest in user.interests"
      :key="interest"
      :element="interest"
    />

    <div class="achiev">
      <divisore text="Achievements" />
    </div>

    <achievement-element
      v-for="achievement in user.achievements"
      :key="achievement.id"
      :achievement="achievement"
    />
  </div>
</template>

<script>
import AchievementElement from "../../components/profile/AchievementElement.vue";
import Avatar from "../../components/profile/Avatar.vue";
import Divisore from "../../components/profile/Divisore.vue";
import HashtagElement from "../../components/profile/HashtagElement.vue";
import UserProfileInfo from "../../components/profile/UserProfileInfo.vue";
import TextIcon from "../../components/ui/TextIcon.vue";

export default {
  components: {
    Avatar,
    UserProfileInfo,
    TextIcon,
    Divisore,
    HashtagElement,
    AchievementElement,
  },
  data: function () {
    return {
      user: {
        name: "Mario Rossi",
        nikname: "@mario_rossi",
        birthdate: "16/10/1997",
        telephone: "348-3680498",
        sex: "M",
        bio: "Ciao, mi chiamo Mario e ho una passione per gli sport di squadra",
        interests: ["calcetto", "pallavolo", "basket"],
        achievements: [
          {
            id: 1,
            name: "Lupo Solitario",
            date: "21/03/2019",
            description: "Partecipa al tuo primo torneo come solista.",
          },
        ],
      },
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
  padding: 0.5% 1%;
  border-radius: 50%;
}
.interests {
  border-bottom-color: #ff6b24;
  color: #ff6b24;
}

.achiev {
  border-bottom-color: #21eda5;
  color: #21eda5;
}
</style>