<template>
  <router-link class="team-card" tag="div" :to="`/teams/${team.id}`">
    <div class="image-container">
      <img :src="team.image" :alt="`${team.name}'s team image`">
    </div>
    <div class="team-overlay">
      <div class="info-bar">
        <span class="team-name">{{ team.name }}</span>
        <text-icon icon="fas fa-user-friends" :text="String(team.members)" />
      </div>
    </div>
  </router-link>
</template>

<script>
import TextIcon from '../ui/TextIcon.vue'
export default {
  components: { TextIcon },
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

  .image-container {
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .team-overlay {
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: auto;
    position: absolute;
    height: 100%;

    &:hover {
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }

    .info-bar {
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 10px 15px;
      font-size: 1.3rem;
      background: rgba(0, 0, 0, 0.5);

      .team-name {
        font-weight: bold;
      }
    }
  }
}


</style>