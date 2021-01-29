<template>
  <div class="simple-input">
    <label class="form-label" :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <input
      :id="identifier"
      type="number"
      @input="updated($event.target.value)"
      @blur="blur($event.target.value)"
      @focus="focus($event.target.value)"
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
    value: String,
    label: String,
    identifier: String,
    min: String,
    max: String,
    scope: Object,
  },
  methods: {
    ...eventHandlers
  },
  created() {
    this.updated(this.value)
  }
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