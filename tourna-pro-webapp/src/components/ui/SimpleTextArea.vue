<template>
  <div class="simple-area">
    <label class="form-label" :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <textarea
      :id="identifier"
      @input="updated"
      :value="value"
      :placeholder="placeholder || label"
      :name="identifier"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: String,
    label: String,
    identifier: String
  },
  methods: {
    updated(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-area {
  text-align: left;
  margin-bottom: 15px;

  label {
    font-weight: bold;
  }

  textarea {
    border: 1px solid black;
    border-radius: 5px;
    padding:5px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>