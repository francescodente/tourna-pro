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
import ActivityToggle from './ActivityToggle.vue'
export default {
  components: { ActivityToggle },
  props: {
		value: Array
	},
	data() {
		return {
      selectedActivities: [...this.value],
      activities: [
        {
          id: 1,
          name: 'Pallavolo'
        },
        {
          id: 2,
          name: 'Basket'
        },
        {
          id: 3,
          name: 'Briscola'
        },
        {
          id: 4,
          name: 'Calcetto'
        },
      ]
		}
  },
  methods: {
    activitySelectionChanged(id, selected) {
      if (selected) {
        if (!this.selectedActivities.includes(id)) {
          this.selectedActivities.push(id)
        }
      } else {
        this.selectedActivities = this.selectedActivities.filter(x => x != id)
      }
      this.$emit('input', this.selectedActivities)
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-item {
  margin-bottom: 10px;
}
</style>