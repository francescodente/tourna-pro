<template>
	<simple-form @submit="$emit('submit')" :submitMessage="submitMessage">
    <div class="activity-item" v-for="activity in activities" :key="activity.id">
      <toggle-button
        v-model="activity.selected"
        color="#21eda5"
      />
    </div>
	</simple-form>
</template>

<script>
import SimpleForm from '../ui/SimpleForm.vue'
import { ToggleButton } from 'vue-js-toggle-button'
export default {
  components: { SimpleForm, ToggleButton },
  props: {
		value: Object,
		submitMessage: String
	},
	data() {
		return {
      currentValue: {...this.value},
      activities: [
        {
          id: 1,
          name: 'Pallavolo',
          selected: true
        },
        {
          id: 2,
          name: 'Basket',
          selected: true
        },
        {
          id: 3,
          name: 'Briscola',
          selected: false
        },
        {
          id: 4,
          name: 'Calcetto',
          selected: false
        },
      ]
		}
  }
}
</script>

<style>

</style>