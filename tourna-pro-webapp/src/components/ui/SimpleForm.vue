<template>
  <form class="simple-form">
    <div>
      <slot></slot>
    </div>
    <input type="submit" :value="submitMessage" @click.prevent="$emit('submit')">
  </form>
</template>

<script>
export default {
  props: {
    submitMessage: String
  }
}
</script>

<style lang="scss" scoped>
.simple-form {
  margin: 20px;
  border-color: $color-primary-lightest;
  border-radius: 25px;
  padding: 25px;
  border-style: solid;
  border-width: 5px;

  input[type=submit] {
    color: $color-primary-text;
    background-color: $color-primary;
    border: none;
    width: 90%;
    padding: 6%;
    font-size: 1.3rem;
    border-radius: 100px;
    margin-top: 30px;

    &:focus {
      outline: none;
      
    }
  }
}
</style>