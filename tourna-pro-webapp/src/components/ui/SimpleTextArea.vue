<template>
  <div class="simple-area">
    <label class="form-label" :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <textarea
      :id="identifier"
      @input="updated($event.target.value)"
      @blur="blur($event.target.value)"
      @focus="focus($event.target.value)"
      :value="value"
      :placeholder="placeholder || label"
      :name="identifier"
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
.simple-area {
  text-align: left;
  margin-top: 15px;

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