<template>
  <div :class="['achievement', unlocked ? '' : 'locked']">
    <avatar size="3em" :src="unlocked ? achievement.image : require('@/assets/lockedAchievement.png')" class="avatar" />
    <div class="text">
      <div>
        <span class="title">{{ achievement.name }}</span>
      </div>
      <div class="description">{{ achievement.description }}</div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
  components: { Avatar },
  name: "Achievement",
  props: {
    achievement: Object,
    unlocked: Boolean
  },
};
</script>

<style lang="scss" scoped>
.achievement {
  border: 2px solid $color-default-text-light;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  &.locked {
    opacity: 40%;
    background-color: lightgray;
  }

  .avatar {
    border: 2px solid $color-complementary;
    border-radius: 50%;
  }
}

.text {
  text-align: left;
  margin-left: 15px;
  .title {
    font-weight: bold;
    font-style: italic;
  }
  .date {
    margin-left: 5px;
    color: $color-complementary;
  }
  .description {
    font-size: 9pt;
    font-style: italic;
    color: grey;
  }
}
</style>