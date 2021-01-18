<template>
	<div>
    <activity-toggle
      class="activity-item"
      v-for="activity in activities"
      :key="activity.id"
      :value="selectedActivities.includes(activity.id)"
      :name="activity.name"
      @input="activitySelectionChanged(activity.id, $event)"
    />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityToggle from './ActivityToggle.vue'
export default {
  components: { ActivityToggle },
  props: {
		value: Array
	},
	data() {
		return {
      selectedActivities: [...this.value],
		}
  },
  methods: {
    activitySelectionChanged(id, selected) {
      let a = this.selectedActivities
      if (selected) {
        if (!this.selectedActivities.includes(id)) {
          a = [...this.selectedActivities, id]
        }
      } else {
        a = this.selectedActivities.filter(x => x != id)
      }
      this.$emit('input', a)
    }
  },
  computed: {
    ...mapGetters(['activities'])
  }
}
</script>

<style lang="scss" scoped>
.activity-item {
  margin-bottom: 10px;
}
</style>