<template>
  <div>
    <b-avatar class="avatar" :size="size" :src="src" :text="text"></b-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    size: String,
    src: String,
    text: String,
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  color: #a66e0c;
  background-color: #ffc35a;
}

</style>