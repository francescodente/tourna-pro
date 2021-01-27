<template>
  <div>
    <div class=text>
      <span class="title">
        {{ title + ":" }}
      </span>
      <span class="value">
        {{ value }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRow",
  props: {
    title: { required: true, type: String },
    value: { required: true, type: String },
  },
};
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  display:flex;
  justify-content: space-between;
  border-bottom: 1px solid $color-secondary2;
  margin-bottom: 20px;
}

.title {
  font-weight: bold;
}
.value {
  text-align: right;
  color: black;
}

hr {
  margin-top: -3px;
  margin-bottom: 12px;
  height: 2px;
  border: none;
  background: $color-secondary2-lightest;
}
</style>