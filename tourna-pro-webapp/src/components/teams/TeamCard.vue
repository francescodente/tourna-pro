<template>
  <router-link class="team-card" tag="div" :to="`/teams/${team.id}`">
    <image-fit v-if="team.imageUrl" :src="team.imageUrl" :alt="`${team.name}'s team image`" />
    <image-fit v-else :src="require('@/assets/defaultTeamImage.png')" alt="This team has no image" />
    <div class="hover-background"></div>
    <overlay-bar class="team-overlay" :title="team.name" :hoverable="true">
      <text-icon icon="fas fa-user-friends" :text="String(team.members.length)" />
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
  height: 20vh;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);

  .hover-background {
    position: absolute;
    width: 100%;
    height: 100%;

    &:hover {
      background-color: rgba(0,0,0,0.2);
    }
  }

  .team-overlay:hover {
    cursor: pointer;
  }
}

</style>