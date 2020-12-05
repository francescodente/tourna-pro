<template>
  <div>
    <div class="date" :style="{color: color}">
      {{date}}
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DateText',
  prop: {
    date: String,
    color: {default: "inherit", type:String}
  }
}
</script>

<style lang="scss" scoped>
.date{
  font-weight: bold;
  text-align: left;
}
.text{
  text-align:left;
}

</style>