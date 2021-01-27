<template>
  <div v-if="user" class="main">
    <div class="top-row">
      <avatar size="4em" :src="user.imageUrl" />
      <div class="user-name">
        <span class="name" size="10%">{{ user.firstName + " " + user.lastName }}</span>
        <span>@{{ user.username }}</span>
      </div>
      <span v-if="isUserProfile" class="logout" v-on:click="logoutUser">
        <i class="fas fa-sign-out-alt fa-lg"></i>
      </span>
      <router-link v-if="isUserProfile" :to="{ name: 'UserPassword', params: { id: pathUser } }">
        <span class="options"><i class="fas fa-lg fa-cog fa-lg"></i></span>
      </router-link>
    </div>
    <div v-if="isUserProfile" class="modify">
    <router-link  :to="{ name: 'UploadProfileImage', params: {id: pathUser} }">
      <text-icon
        class="edit-button"
        icon="fas fa-camera"
        text="Modifica immagine"
        :iconRight="true"
      />
    </router-link>
    <router-link v-if="isUserProfile" :to="{ name: 'UserModifyProfile', params: {id: pathUser} }">
      <text-icon
        class="edit-button"
        icon="fas fa-edit"
        text="Modifica informazioni"
        :iconRight="true"
      />
    </router-link>
    </div>
    <div v-else class="spacing">
      <section-header class="header" :color="style.colorPrimary">
        <span>Informazioni personali</span>
      </section-header>
    </div>

    <div class="info">
      <text-icon
        icon="fas fa-birthday-cake fa-fw"
        :text="user.birthDate | dateFormat"
        :iconColor="style.colorPrimary"
      />
      <text-icon
        icon="fas fa-phone-alt fa-fw"
        :text="user.telephone"
        :iconColor="style.colorPrimary"
      />
      <text-icon
        icon="fas fa-mars fa-fw"
        :text="user.gender"
        :iconColor="style.colorPrimary"
      />
    </div>
    <div class="interests">
      <section-header class="header" :color="style.colorPrimaryLightest">
        <span>Interessi</span>
        <router-link v-if="isUserProfile" tag="span" :to="{ name: 'UserInterest', params: { id: pathUser } }">
          <i class="fas fa-ellipsis-h"></i>
        </router-link>
      </section-header>
      <div v-if="interests.length > 0">
        <div v-for="i in interests" :key="i" class="badge badge-pill">
          #{{ i | activityFromId }}
        </div>
      </div>
      <div v-else>Non hai ancora selezionato i tuoi interessi!</div>
    </div>

    <div>
      <section-header class="header" :color="style.colorComplementaryLight">
          <span>Achievements</span>
        <!--
          <i class="fas fa-question-circle"></i> 
        -->
      </section-header>
      <div class="achievements" v-if="achievements.lengh > 0">
        <achievement v-for="a in achievements" :key="a.id" :achievement="a" />
      </div>
      <div class="achievements" v-else>
        Nessun achievement sbloccato
      </div>
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
import { mapGetters } from 'vuex';

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
      user: null,
      achievements: [],
      interests: [],
    };
  },
  methods: {
    async fetchUser() {
      this.user = await dataAccess.users.getUser(this.pathUser);
      this.achievements = await dataAccess.achievements.getByUser(this.pathUser);
      this.interests = await dataAccess.interests.getAll(this.pathUser);
    },
    async logoutUser() {
      await this.$store.dispatch('logout');
      this.$socket.emit('logout')
      router.push({ name: "Login" });
    },
  },
  computed: {
    ...mapGetters(['userId']),
    pathUser() {
      return this.$route.params.id;
    },
    isUserProfile(){
      return this.pathUser == this.userId
    }
  },
  async created() {
    await this.fetchUser();
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

  .logout {
    display: flex;
    padding: 10px;
    border-radius: 50%;
    background-color: $color-primary;
    color: white;
    margin-right: 0.5em;
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
.modify {
display: flex;
width:100%;
.edit-button {
  width:100%;
  flex-grow:1;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 5px;
  border: 2px solid $color-primary-lightest;
  font-weight: bold;
  border-radius: 5px;
  color: $color-primary;
}
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
  text-align: left;
}

.spacing{
  padding:10px 0px;
}
</style>