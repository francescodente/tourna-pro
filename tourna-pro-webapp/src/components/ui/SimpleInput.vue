<template>
  <div>
    <label :for="identifier">{{ label }}</label>
    <input :id="identifier" :type="type" @input="updated" :value="value">
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    identifier: String,
    type: String
  },
  methods: {
    updated(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
  width: 90%;

  &:focus {
    outline: none;
  }
}
</style>