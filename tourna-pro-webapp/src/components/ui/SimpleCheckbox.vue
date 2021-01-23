<template>
  <div class="simple-checkbox">
    <input
      type="checkbox"
      :checked="value"
      :id="identifier"
      @input="checkBoxUpdate"
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
    checkBoxUpdate(e) {
      this.$emit("input", e.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-checkbox {
  text-align: left;
  margin-top:15px;

  label {
    margin-left: 5px;
    display: inline;
  }
}
</style>