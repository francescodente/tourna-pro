<template>
  <div class="user-profile-info">
    <text-icon icon="fas fa-birthday-cake" :text="String(user.birthdate)" />
    <text-icon icon="fas fa-phone-alt" :text="String(user.telephone)" />
    <text-icon icon="fas fa-mars" :text="String(user.sex)" />
  </div>
</template>

<script>
import TextIcon from '../ui/TextIcon.vue';
export default {
  components: { TextIcon },
  props: {
    user: Object,
  },
};
</script>

<style lang="scss" scoped>

</style>