<template>
  <div v-if="user" class="user-profile-container">
    <b-modal
      ref="achievementsInfo"
      centered
      scrollable
      hide-footer
      title="Achievements"
    >
      <div class="achievements-description">
        <h5>Che cosa sono gli achievements?</h5>
        <p>
          Gli achievement sono premi virtuali che vengono sbloccati partecipando
          ai tornei organizzati con TournaPro. Prova a sbloccarli tutti e sfida
          i tuoi compagni di squadra!
        </p>
      </div>
      <div class="achievements">
        <achievement
          v-for="a in $store.getters.achievements"
          :key="a.id"
          :achievement="a"
          :unlocked="achievements.includes(a.id)"
        />
      </div>
    </b-modal>

    <div class="top-row">
      <router-link
        class="avatar"
        tag="div"
        :to="{ name: 'UploadProfileImage', params: { id: pathUser } }"
      >
        <div class="camera"><i class="fa fa-camera fa-2x"></i></div>
        <avatar class="avatar-picture" size="8em" :src="user.imageUrl" />
      </router-link>
      <div class="user-name-area">
        <div class="name">{{ user.firstName }} {{ user.lastName }}</div>
        <div class="username">({{ user.username }})</div>
        <div class="actions" v-if="isUserProfile">
          <div class="options" @click="logoutUser">
            <text-icon
              id="logout"
              icon="fas fa-sign-out-alt fa-lg"
              text="Logout"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isUserProfile" class="modify">
      <router-link
        :to="{ name: 'UserModifyProfile', params: { id: pathUser } }"
        tag="div"
      >
        <text-icon
          class="edit-button"
          icon="fas fa-edit"
          text="Modifica profilo"
        />
      </router-link>
      <router-link
        :to="{ name: 'UserPassword', params: { id: pathUser } }"
        tag="div"
      >
        <text-icon
          class="edit-button"
          icon="fas fa-cog"
          text="Modifica password"
        />
      </router-link>
    </div>

    <div class="spacing">
      <section-header class="header" :color="style.colorPrimary">
        <span>Informazioni personali</span>
      </section-header>
    </div>

    <div class="info">
      <text-icon
        class="personal-info"
        icon="fas fa-birthday-cake fa-lg fa-fw"
        :text="user.birthDate | dateFormat"
        :iconColor="style.colorPrimary"
      />
      <text-icon
        class="personal-info"
        icon="fas fa-phone-alt fa-lg fa-fw"
        :text="user.telephone"
        :iconColor="style.colorPrimary"
      />
      <text-icon
        class="personal-info"
        :icon="genderIcon(user.gender)"
        :text="user.gender | profileGender"
        :iconColor="style.colorPrimary"
      />
    </div>
    <div class="interests">
      <section-header class="header" :color="style.colorPrimaryLightest">
        <span>Interessi</span>
        <router-link
          v-if="isUserProfile"
          tag="span"
          :to="{ name: 'UserInterest', params: { id: pathUser } }"
        >
          <i class="fas fa-ellipsis-h" id="ellipsis"></i>
        </router-link>
      </section-header>
      <div v-if="interests.length > 0" class="interests-list">
        <div
          v-for="i in interests"
          :key="i"
          class="user-interest badge badge-pill"
        >
          #{{ i | activityFromId }}
        </div>
      </div>
      <placeholder-text
        class="interests-empty"
        v-else
        text="Nessun interesse selezionato!"
      />
    </div>

    <div>
      <section-header class="header" :color="style.colorComplementary">
        <span>Achievements</span>
        <span class="open-achievements" @click="openAchievements"
          ><i class="fas fa-question-circle" id="question-mark"></i
        ></span>
      </section-header>
      <div v-if="achievements.length > 0" class="achievements">
        <achievement
          v-for="a in achievements"
          :key="a"
          :achievement="$store.getters.achievement(a)"
          :unlocked="true"
        />
      </div>
      <placeholder-text
        class="interests-empty"
        v-else
        text="Non hai ancora sbloccato nessun achievement!"
      />
    </div>
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import Achievement from "../../components/profile/Achievement.vue";
import Avatar from "../../components/profile/Avatar.vue";
import SectionHeader from "../../components/profile/SectionHeader.vue";
import TextIcon from "../../components/ui/TextIcon.vue";
import style from "../../style/export.scss";
import router from "../../router";
import { mapGetters } from "vuex";
import PlaceholderText from "../../components/ui/PlaceholderText.vue";

export default {
  components: {
    Avatar,
    TextIcon,
    SectionHeader,
    Achievement,
    PlaceholderText,
  },
  data: function () {
    return {
      style,
      user: null,
      achievements: [],
      interests: [],
    };
  },
  methods: {
    openAchievements() {
      this.$refs.achievementsInfo.show();
    },
    async fetchUser() {
      this.user = await dataAccess.users.getUser(this.pathUser);
      this.achievements = await dataAccess.achievements.getByUser(
        this.pathUser
      );
      this.interests = await dataAccess.interests.getAll(this.pathUser);
    },
    async logoutUser() {
      await this.$store.dispatch("logout");
      this.$socket.emit("logout");
      router.push({ name: "Login" });
    },
    genderIcon(gender) {
      switch (gender) {
        case "M":
          return "fas fa-mars fa-lg fa-fw";
        case "F":
          return "fas fa-venus fa-lg fa-fw";
        case "NONE":
          return "fas fa-venus-mars fa-lg fa-fw";
      }
    },
  },
  computed: {
    ...mapGetters(["userId"]),
    pathUser() {
      return this.$route.params.id;
    },
    isUserProfile() {
      return this.pathUser == this.userId;
    },
  },
  async created() {
    await this.fetchUser();
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  position:relative;
  .avatar-picture{
  border-radius: 50%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  &:hover {
    filter: brightness(75%);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 1);
  }
  }
  .camera {
    z-index: 0;
    position: absolute;
    color:white;
    top:39%;
    left: 39%;
  }

  &:hover .camera {
    z-index: 99;
  }

  
}

.user-profile-container {
  padding: 20px;
}
.top-row {
  display: flex;
  flex-direction: row;
  align-items: initial;
  margin-bottom: 20px;

  .user-name-area {
    flex-grow: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    text-align: left;
    .name {
      font-size: 1.5rem;
      font-weight: bold;
      color: $color-default-text;
    }
    .username {
      font-size: 1.2rem;
      color: gray;
    }

    @media screen and (min-width: 576px) {
      .name {
        font-size: 1.8rem;
      }
      .username {
        font-size: 1.6rem;
      }
    }

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 10px;
      .options {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
        text-align: center;
        padding: 10px;
        border-radius: 5px;
        background-color: $color-primary-light;
        color: white;
        display: inline-block;
        &:hover {
          cursor: pointer;
          background-color: $color-primary;
        }
      }
    }
  }
}
.modify {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;

  & > * {
    flex-basis: 100%;
    margin-bottom: 10px;
  }
  .edit-button {
    padding: 5px;
    border: 2px solid $color-primary-lightest;
    font-weight: bold;
    border-radius: 5px;
    color: $color-primary;
    height: 100%;

    &:hover {
      background-color: $color-primary-background;
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 576px) {
  .modify > * {
    flex-basis: 49%;
  }
}

.info {
  width: 100%;
  text-align: left;
  font-size: 1rem;
  .personal-info {
    margin-bottom: 10px;
  }
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
  .interests-empty {
    text-align: center;
  }
  .badge {
    background-color: #cccccc;
    color: white;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .interests-list {
    padding: 15px 0px;
    .user-interest {
      font-size: 1.1rem;
    }
  }
}

#ellipsis {
  &:hover {
    cursor: pointer;
    color: $color-primary-darker;
  }
  .open-achievements:hover {
    cursor: pointer;
  }
}

#question-mark {
  &:hover {
    cursor: pointer;
    color: $color-complementary-darker;
  }
  .open-achievements:hover {
    cursor: pointer;
  }
}

.achievements {
  margin-top: 10px;
  text-align: left;
}

.spacing {
  padding: 10px 0px;
}
</style>