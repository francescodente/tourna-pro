<template>
  <div class="list-container">
    <div class="header"  @click="toggleVisibility">
      <div class="status-name">
        {{ statusName }}
      </div>
      <div class="line"></div>
      <span class="toggler">
        <span v-show="visible"><i class="fa fa-angle-up fa-lg"></i></span>
        <span v-show="!visible"><i class="fa fa-angle-down fa-lg"></i></span>
      </span>
    </div>
    <b-collapse v-model="visible">
      <div class="tournaments" v-if="tournaments.length > 0">
        <tournament-list :tournaments="tournaments" />
      </div>
      <placeholder-text v-else text="Ancora nessun torneo" />
    </b-collapse>
  </div>
</template>

<script>
import PlaceholderText from "../ui/PlaceholderText.vue";
import TournamentList from "./TournamentList.vue";
export default {
  components: { TournamentList, PlaceholderText },
  data() {
    return {
      visible: false,
    };
  },
  props: {
    tournaments: Array,
    statusName: String,
    value: Boolean,
  },
  methods: {
    toggleVisibility() {
      this.visible = !this.visible;
      this.$emit("input", this.visible);
    },
  },
  created() {
    this.visible = this.value;
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  color: $color-default-text;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    &:hover {
      cursor: pointer;
    }

    .line {
      flex-grow: 1;
      border-bottom: 1px solid $color-default-text-light;
      height: 0px;
    }

    .toggler {
      color: $color-default-text-light;
      padding-left: 10px;
    }

    .status-name {
      padding-right: 10px;
      margin-bottom: 10px;
      font-size: 1.2rem;
    }
  }
}
</style>