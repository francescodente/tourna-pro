<template>
  <div>
    <b-avatar class="avatar" :size="size" :src="src || require('@/assets/defaultUserImage.png')"></b-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    size: String,
    src: String,
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  background-color: transparent;
}

</style>