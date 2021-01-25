<template>
  <list-item class="user-line" :canSelect="canSelect" @selected="$emit('selected', user)">
    <avatar :src="user.imageUrl"/>
    <div class="user-username">
      {{ user.username }}
      <span class="real-name">({{ user.firstName }} {{ user.lastName }})</span>
      <i v-if="isOwner" class="fas fa-crown owner"></i>
    </div>
    <a v-if="canDelete && user.id != $store.getters.userId" @click="$emit('deleted', $event)" class="delete-button">
      <i class="fas fa-times"></i>
    </a>
  </list-item>
</template>

<script>
import Avatar from '../profile/Avatar.vue'
import ListItem from '../ui/ListItem.vue'
export default {
  components: { Avatar, ListItem },
  props: {
    user: Object,
    isOwner: Boolean,
    canDelete: {
      type: Boolean,
      default: true
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-line {
  font-weight: bold;
  color:black;

  .user-username {
    flex: 1;
    text-align: left;
    margin-left: 10px;

    .real-name {
      color: gray;
    }

    .owner {
      color: $color-secondary1;
      margin-left: 15px;
    }
  }

  .delete-button {
    color: $color-secondary2;
    font-size: 1.3rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>