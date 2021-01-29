<template>
  <div class="simple-dropdown">
    <label :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <select
      :id="identifier"
      @input="updated($event.target.value)"
      @blur="blur($event.target.value)"
      @focus="focus($event.target.value)"
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