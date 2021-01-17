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
    <hr />
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
}

.title {
  font-weight: bold;
}
.value {
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