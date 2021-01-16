<template>
  <div class="team-member">
    <avatar />
    <div class="member-username">
      {{ member.username }} <span class="real-name">({{ member.firstName }} {{ member.lastName }})</span>
    </div>
    <a v-if="canDelete && member.id != $store.getters.userId" @click="$emit('deleted', $event)" class="red">
      <i class="fas fa-times"></i>
    </a>
  </div>
</template>

<script>
import Avatar from '../profile/Avatar.vue'
export default {
  components: { Avatar },
  props: {
    member: Object,
    canDelete: Boolean
  }
}
</script>

<style lang="scss" scoped>
.team-member {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 15px;
  font-weight: bold;
  //border-bottom: 1px solid $color-not-focus-text;
  box-shadow: 0px 3px 7px -2px rgba(0,0,0,0.2);

  .member-username {
    flex: 1;
    text-align: left;
    margin-left: 10px;

    .real-name {
      color: gray;
    }
  }

  .red{
    color: $color-secondary2;
  }
}
</style>