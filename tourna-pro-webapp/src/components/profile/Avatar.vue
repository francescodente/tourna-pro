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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

</style>