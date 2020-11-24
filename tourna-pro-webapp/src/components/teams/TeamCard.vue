<template>
  <a @click="$emit('click', $event)">
    <div class="team-card">
      <div class="image-container">
        <img :src="team.image" :alt="`${team.name}'s team image`">
      </div>
      <div class="team-info">
        <div class="info-bar">
          <span class="team-name">{{ team.name }}</span>
          <text-icon icon="fas fa-user-friends" :text="String(team.members)" />
        </div>
      </div>
    </div>
  </a>
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

  .team-info {
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;

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
      padding: 15px 20px;
      font-size: 1.3rem;

      .team-name {
        font-weight: bold;
      }
    }
  }
}


</style>