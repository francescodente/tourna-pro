<template>
  <div class="simple-checkbox">
    <input
      type="checkbox"
      :checked="value"
      :id="identifier"
      @input="updated($event.target.checked)"
      @blur="blur($event.target.checked)"
      @focus="focus($event.target.checked)"
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
    scope: Object,
  },
  methods: {
    ...eventHandlers,
  },
   created() {
    this.updated(this.value)
  }
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