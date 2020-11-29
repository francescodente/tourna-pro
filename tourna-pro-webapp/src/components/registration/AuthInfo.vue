<template>
	<div>
    <simple-input
      label="Email"
      type="email"
      v-model="currentValue.email"
      identifier="email"
			@input="$emit('input', currentValue)"
    />

		<simple-input
      label="Username"
      type="text"
      v-model="currentValue.username"
      identifier="username"
			@input="$emit('input', currentValue)"
    />

		<simple-input
      label="Password"
      type="password"
      v-model="currentValue.password"
      identifier="password"
			@input="$emit('input', currentValue)"
    />

		<simple-input
      label="Conferma password"
      type="password"
      v-model="currentValue.confirmPassword"
      identifier="confirmpassword"
			@input="$emit('input', currentValue)"
    />

		<simple-checkbox
			label="Dichiaro di accettare i Termini e le condizioni del servizio"
			identifier="acceptsConditions"
			v-model="currentValue.acceptsConditions"
			@input="$emit('input', currentValue)"
		/>
	</div>
</template>

<script>
import SimpleCheckbox from '../ui/SimpleCheckbox.vue'
import SimpleInput from '../ui/SimpleInput.vue'
export default {
  components: { SimpleInput, SimpleCheckbox },
  props: {
		value: Object
	},
	data() {
		return {
			currentValue: {...this.value}
		}
	}
}
</script>

<style>

</style>