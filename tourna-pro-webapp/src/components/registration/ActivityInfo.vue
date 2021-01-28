<template>
  <div>
    <activity-toggle
      class="activity-item"
      v-for="activity in activities"
      :key="activity.id"
      :value="value.includes(activity.id)"
      :name="activity.name"
      @input="activitySelectionChanged(activity.id, $event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ActivityToggle from "./ActivityToggle.vue";

export default {
  components: { ActivityToggle },
  props: {
    value: Array,
  },
  methods: {
    activitySelectionChanged(id, selected) {
      let a = this.value;
      if (selected) {
        if (!this.value.includes(id)) {
          a = [...this.value, id];
        }
      } else {
        a = this.value.filter((x) => x != id);
      }
      this.$emit("input", a);
    },
  },
  computed: {
    ...mapGetters(["activities"]),
  },
};
</script>

<style lang="scss" scoped>
.activity-item {
  margin-bottom: 10px;
}
</style>