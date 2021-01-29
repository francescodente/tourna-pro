<template>
  <div class="simple-input">
    <label class="form-label" :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <input
      :id="identifier"
      type="number"
      @input="updated"
      @blur="blur"
      @focus="focus"
      :value="value"
      :placeholder="placeholder || label"
      :min="min"
      :max="max"
    />
  </div>
</template>

<script>
import eventHandlers from "@/utils/validator-events";
export default {
  props: {
    placeholder: String,
    value: Number,
    label: String,
    identifier: String,
    min: String,
    max: String,
    scope: Object,
  },
  methods: {
    ...eventHandlers
  },
};
</script>

<style lang="scss" scoped>
.simple-input {
  text-align: left;
  margin-top: 15px;

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