<template>
  <div>
    <i v-if="left"
      :class="'icon ' + icon" 
      :style="{color: iconColor}"
    ></i>
    <span 
      class="text" 
      :style="{color: textColor}" 
    >{{text}}</span>
    <i v-if="right"
      :class="'icon ' + icon"  
      :style="{color: iconColor}"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'TextIcon',
  props: {
    iconLeft: Boolean,
    iconRight: Boolean,
    text: String,
    icon: String,
    iconColor: {default: "inherit"},
    textColor: {default: "inherit"}
  },
  computed:{
    left() {
      if(!this.iconLeft && !this.iconRight)
        return true;
      else 
        return this.iconLeft;
    
    },
    right() {
      return this.iconRight;
    }
  }
}
</script>

<style lang="scss" scoped>
.icon{
  margin: 0px 5px;
}

</style>