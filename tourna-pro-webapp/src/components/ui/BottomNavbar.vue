<template>
  <div class="navbar-container">
    <div class="button-container" v-for="(button, index) in buttons" :key="button.linkTo">
      <router-link :class="{'navbar-button': true, 'navbar-button-main': index == Math.floor(buttons.length / 2) }" :to="button.linkTo">
        <i :class="button.icon"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        {
          icon: 'far fa-handshake',
          linkTo: '/teams'
        },
        {
          icon: 'far fa-compass',
          linkTo: '/explore'
        },
        {
          icon: 'fas fa-trophy',
          linkTo: '/tournaments'
        },
        {
          icon: 'far fa-bell',
          linkTo: '/notifications'
        },
        {
          icon: 'far fa-user',
          linkTo: '/user'
        }
      ]
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
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