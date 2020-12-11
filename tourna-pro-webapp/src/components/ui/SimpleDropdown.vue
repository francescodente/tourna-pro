<template>
  <div class="simple-dropdown">
    <label :for="identifier">
      <slot>{{ label }}</slot>
    </label>
    <select :id="identifier" @input="updated" :value="value">
      <option :value="op.value" v-for="op in options" :key="op.value">
        {{ op.display }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String,
    label: String,
    identifier: String
  },
  methods: {
    updated(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-dropdown {
  text-align: left;
  margin-bottom: 15px;

  label {
    font-weight: bold;
    display: block;
  }

  select {
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    appearance: none;
    background-image: url('~@/assets/angle-down-solid.svg');
    background-repeat: no-repeat;
    background-position:right;
    background-position-x: 95%;
    &:focus {
      outline: none;
    }
  }

}
</style>