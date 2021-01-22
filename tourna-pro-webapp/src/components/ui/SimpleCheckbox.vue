<template>
  <div class="simple-checkbox">
    <input
      type="checkbox"
      :checked="value"
      :id="identifier"
      @input="updated"
      @blur="blur"
      @focus="focus"
    />
    <label :for="identifier">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script>
import eventHandlers from "@/utils/validator-events";
export default {
  props: {
    identifier: String,
    value: Boolean,
    label: String,
  },
  methods: {
    ...eventHandlers,
  },
};
</script>

<style lang="scss" scoped>
.simple-checkbox {
  text-align: left;

  label {
    margin-left: 5px;
    display: inline;
  }
}
</style>