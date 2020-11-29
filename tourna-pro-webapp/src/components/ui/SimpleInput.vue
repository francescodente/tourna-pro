<template>
  <div class="simple-input">
    <label class="form-label" :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <input :id="identifier" :type="type" @input="updated" :value="value" :placeholder="placeholder || label">
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
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
.simple-input {
  text-align: left;
  margin-bottom: 15px;

  label {
    font-weight: bold;
  }

  input {
    border: none;
    border-bottom: 1px solid black;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>