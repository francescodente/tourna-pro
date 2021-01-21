<template>
  <div>
    <div class="date" :style="{color: dateColor}">
      {{ date | dateFormat }}
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DateText',
  props: {
    dateColor: {default: "inherit", type:String},
    date: String
   
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