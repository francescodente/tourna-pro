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
          @input="updated"
        />
        <label :for="op.value">{{ op.display }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: String,
    options: Array,
    label: String,
    inline: Boolean
  },
  methods: {
    updated(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-radio {
  text-align: left;
  margin-bottom: 15px;

  .title {
    font-weight: bold;
  }

  label {
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