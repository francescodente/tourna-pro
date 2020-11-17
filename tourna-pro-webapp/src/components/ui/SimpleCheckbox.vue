<template>
  <div class="simple-checkbox">
    <input type="checkbox" :checked="value" :id="identifier" @input="updated"/>
    <label :for="identifier">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    identifier: String,
    value: Boolean,
    label: String
  },
  methods: {
    updated(e) {
      this.$emit('input', e.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-checkbox {
  text-align: left;

  label {
    margin-left: 5px;
  }
}
</style>