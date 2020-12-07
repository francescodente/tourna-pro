<template>
  <router-link class="team-card" tag="div" :to="`/teams/${team.id}`">
    <image-fit :src="team.image" :alt="`${team.name}'s team image`" />
    <overlay-bar class="team-overlay" :title="team.name">
      <text-icon icon="fas fa-user-friends" :text="String(team.members)" />
    </overlay-bar>
  </router-link>
</template>

<script>
import ImageFit from '../ui/ImageFit.vue'
import OverlayBar from '../ui/OverlayBar.vue'
import TextIcon from '../ui/TextIcon.vue'
export default {
  components: { TextIcon, ImageFit, OverlayBar },
  props: {
    team: Object
  }
}
</script>

<style lang="scss" scoped>
.team-card {
  width: 100%;
  margin-bottom: 20px;
  height: 20vh;
  position: relative;

  .team-overlay:hover {
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
}


</style>