<template>
  <list-item class="participant-line" :canSelect="canSelect" @selected="$emit('selected')">
    <avatar v-if="!hideImage" :src="imageUrl"/>
    <div class="participant-name">
      {{ name }}
      <span v-if="secondaryName" class="real-name">({{ secondaryName }})</span>
      <i v-if="isOwner" class="fas fa-crown owner"></i>
    </div>
    <a v-if="canDelete" @click="$emit('deleted')" class="delete-button">
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
    name: String,
    secondaryName: String,
    hideImage: Boolean, 
    imageUrl: String,
    isOwner: {
      type: Boolean,
      default: false
    },
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
.participant-line {
  font-weight: bold;
  color:black;

  .participant-name {
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