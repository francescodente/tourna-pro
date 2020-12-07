<template>
  <div>
    <b-avatar class="avatar" :size="size"></b-avatar>
  </div>
</template>

<script>
export default {
  props: {
    size: String
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  color: #a66e0c;
  background-color: #ffc35a;
}

</style>