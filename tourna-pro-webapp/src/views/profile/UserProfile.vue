<template>
  <div v-if="activeUser" class="main">
    <div class="top-row">
      <avatar size="4em" />
      <div class="user-name">
        <span class="name">{{
          activeUser.firstName + " " + activeUser.lastName
        }}</span>
        <span>{{ activeUser.userName }}</span>
      </div>
      <router-link :to="this.$route.path + '/password'">
        <span class="options"><i class="fas fa-lg fa-cog"></i></span>
      </router-link>
    </div>

    <router-link :to="this.$route.path + '/edit'">
      <text-icon
        class="edit-button"
        icon="fas fa-edit"
        text="Modifica profilo"
        :iconRight="true"
      />
    </router-link>

    <div class="info">
      <text-icon
        icon="fas fa-birthday-cake"
        :text="activeUser.birthDate | dateFormat"
        :iconColor="style.colorPrimary"
      />
      <text-icon
        icon="fas fa-phone-alt"
        :text="activeUser.telephone"
        :iconColor="style.colorPrimary"
      />
      <text-icon
        icon="fas fa-mars"
        :text="activeUser.gender"
        :iconColor="style.colorPrimary"
      />
    </div>
    <!-- Comment 
    <div class="bio">
      <div class="about-me">Su di me:</div>
      <div>{{ user.bio }}</div>
    </div>
    -->
    <div class="interests">
      <section-header class="header" :color="style.colorPrimaryLightest">
        <span>Interessi</span>
        <router-link tag="span" :to="this.$route.path + '/interests'">
          <i class="fas fa-ellipsis-h"></i>
        </router-link>
      </section-header>
      <div v-for="i in user.interests" :key="i" class="badge badge-pill">
        {{ "#" + i }}
      </div>
    </div>

    <div>
      <section-header class="header" :color="style.colorComplementaryLight">
        <span>Achievements</span>
        <i class="fas fa-question-circle"></i>
      </section-header>
      <div class="achievements">
        <achievement
          v-for="a in user.achievements"
          :key="a.id"
          :achievement="a"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Achievement from "../../components/profile/Achievement.vue";
import Avatar from "../../components/profile/Avatar.vue";
import SectionHeader from "../../components/profile/SectionHeader.vue";
import TextIcon from "../../components/ui/TextIcon.vue";
import style from "../../style/export.scss";

export default {
  components: {
    Avatar,
    TextIcon,
    SectionHeader,
    Achievement,
  },
  data: function () {
    return {
      style,
    };
  },
  methods: {
    ...mapActions(["fetchUser"]),
  },
  computed: {
    userId: function(){
      return this.$route.params.id
    },
    ...mapGetters([
      "user", 
      "userInterests", 
      "userAchievements"
    ]),
    activeUser: function () {
      return this.user(this.userId);
    },
  },
  async created() {
    await this.fetchUser(this.userId);
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 90%;
  margin-left: 5%;
}
.top-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .user-name {
    flex-grow: 1;
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .name {
    font-weight: bold;
    color: black;
  }

  .options {
    text-align: center;
    display: flex;
    padding: 10px;
    border-radius: 50%;
    background-color: $color-primary;
    color: white;
    align-self: flex-start;
    text-align: right;
  }
}

.edit-button {
  margin: 20px 0px 10px 0px;
  padding: 5px;
  width: 100%;
  border: 2px solid $color-primary-lightest;
  font-weight: bold;
  border-radius: 5px;
  color: $color-primary;
}

.info {
  width: 100%;
  text-align: left;
}

.bio {
  text-align: left;
  .about-me {
    font-weight: bold;
  }
}

.header {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.interests {
  margin-top: 15px;
  text-align: left;
  .badge {
    background-color: $color-not-focus-text;
    color: white;
    margin: 8px 5px 10px 0px;
  }
}

.achievements {
  margin-top: 10px;
}
</style>