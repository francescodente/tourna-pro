<template>
  <div class="simple-radio">
    <div class="title">{{ label }}</div>
    <div :class="inline ? 'flex-group' : ''">
      <div v-for="op in options" :key="op.value">
        <input
          type="radio"
          :name="group"
          :id="op.value"
          :value="op.value"
          :checked="value == op.value"
          @input="updated"
          @blur="blur"
          @focus="focus"
        />
        <label :for="op.value">{{ op.display }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import eventHandlers from "@/utils/validator-events";
export default {
  props: {
    value: String,
    group: String,
    options: Array,
    label: String,
    inline: Boolean,
  },
  methods: {
    ...eventHandlers
  },
};
</script>

<style lang="scss" scoped>
.simple-radio {
  text-align: left;
  margin-top: 15px;

  .title {
    font-weight: bold;
  }

  label {
    color: black;
    margin-left: 5px;
    margin-right: 20px;
  }

  input {
    display: inline-block;
    color: $color-primary;
  }

  .flex-group {
    display: flex;
  }
}
</style>