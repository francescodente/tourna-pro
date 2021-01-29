<template>
  <div>
    <div class="date-time" :style="{color: dateColor}">
      <div class="date">
        {{ date | dateFormat }}
      </div>
      <div>
        {{ date | timeFormat }}
      </div>
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
.date-time {
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.text{
  text-align:left;
}

</style>