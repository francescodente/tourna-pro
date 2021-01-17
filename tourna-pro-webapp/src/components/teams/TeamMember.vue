<template>
  <div :class="classes" @click="onSelect">
    <avatar />
    <div class="member-username">
      {{ member.username }} <span class="real-name">({{ member.firstName }} {{ member.lastName }})</span>
    </div>
    <a v-if="canDelete && member.id != $store.getters.userId" @click="$emit('deleted', $event)" class="delete-button">
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
    canDelete: {
      type: Boolean,
      default: true
    },
    canSelect: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onSelect() {
      if (!this.canSelect) {
        return
      }
      this.$emit('selected', this.member)
    }
  },
  computed: {
    classes() {
      return {
        'team-member': true,
        'clickable': this.canSelect
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.team-member {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 18px;
  font-weight: bold;
  //border-bottom: 1px solid $color-not-focus-text;
  box-shadow: 0px 3px 7px -2px rgba(0,0,0,0.2);

  &.clickable:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }

  .member-username {
    flex: 1;
    text-align: left;
    margin-left: 10px;

    .real-name {
      color: gray;
    }
  }

  .delete-button {
    color: $color-secondary2;
    font-size: 1.3rem;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>