<template>
  <div>
    <i 
      :class="icon" 
      :style="{color: iconColor}"
    ></i>
    <span 
      class="text" 
      :style="{color: textColor}" 
    >{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'TextIcon',
  props: {
    text: String,
    icon: String,
    iconColor: {default: "inherit"},
    textColor: {default: "inherit"}
  }
}
</script>

<style lang="scss" scoped>
.text{
  margin-left: 5px;
}

</style>