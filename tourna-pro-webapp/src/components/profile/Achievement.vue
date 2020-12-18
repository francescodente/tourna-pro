<template>
  <div class="achievement">
    <avatar size="3em" :src="achievement.image" class="avatar" />
    <div class="text">
      <div>
        <span class="title">{{ achievement.name }}</span>
        <span class="date">{{ achievement.date }}</span>
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
  },
};
</script>

<style lang="scss" scoped>
.achievement {
  border: 2px solid $color-not-focus-text;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  align-items: center;

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