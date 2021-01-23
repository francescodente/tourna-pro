<template>
  <div class="simple-dropdown">
    <label :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <select
      :id="identifier"
      @input="updated"
      @blur="blur"
      @focus="focus"
      :value="value"
    >
      <option :value="op.value" v-for="op in options" :key="op.value">
        {{ op.display }}
      </option>
    </select>
  </div>
</template>

<script>
import eventHandlers from "@/utils/validator-events";
export default {
  props: {
    options: Array,
    value: String,
    label: String,
    identifier: String,
  },
  methods: {
    ...eventHandlers
  },
};
</script>

<style lang="scss" scoped>
.simple-dropdown {
  text-align: left;
  margin-top: 15px;

  label {
    font-weight: bold;
    display: block;
  }

  select {
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    appearance: none;
    background-image: url("~@/assets/angle-down-solid.svg");
    background-repeat: no-repeat;
    background-position: right;
    background-position-x: 100%;
    &:focus {
      outline: none;
    }
  }
}
</style>