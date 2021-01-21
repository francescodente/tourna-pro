<template>
  <div class="navbar-container">
    <div class="button-container">
      <router-link class="navbar-button" :to="{ name: 'Teams' }">
        <i class="far fa-handshake"></i>
      </router-link>
    </div>

    <div class="button-container">
      <router-link class="navbar-button" :to="{ name: 'Explore' }">
        <i class="far fa-compass"></i>
      </router-link>
    </div>

    <div class="button-container">
      <router-link class="navbar-button navbar-button-main" :to="{ name: 'MyTournaments' }">
        <i class="fas fa-trophy"></i>
      </router-link>
    </div>

    <div class="button-container">
      <span v-if="unreadNotifications > 0" class="badge badge-pill badge-danger">{{ unreadNotifications }}</span>
      <router-link class="navbar-button" :to="{ name: 'Notifications' }">
        <i class="far fa-bell"></i>
      </router-link>
    </div>

    <div class="button-container">
      <router-link class="navbar-button" :to="{ name: 'UserProfile', params: { id: $store.getters.userId } }">
        <i class="far fa-user"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['unreadNotifications'])
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-container {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: $bottom-navbar-height;
  border-top: 1px solid $color-primary;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  background-color: white;

  .button-container {
    flex: 1;
    height: 100%;
    position: relative;

    .badge {
      position: absolute;
      right: 15%;
      top: 0px;
    }

    &:not(:first-child) {
      border-left: 1px solid $color-primary;
    }

    .navbar-button {
      color: #999;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      &.navbar-button-main {
        font-size: 2.2rem;
      }

      &.router-link-active {
        color: $color-primary;
      }
    }
  }
}
</style>