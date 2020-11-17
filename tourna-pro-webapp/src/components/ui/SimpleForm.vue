<template>
  <form class="simple-form" @submit.prevent="$emit('submit')">
    <div class="form-container">
      <slot></slot>
    </div>
    <div class="form-submit">
      <input type="submit" :value="submitMessage" />
    </div>
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
  height: 70vh;

  .form-container {
    overflow-y: auto;
    height: 80%;
  }

  .form-submit {
    width: 100%;
    margin-top: 30px;
    height: 20%;
  }

  input[type=submit] {
    color: $color-primary-text;
    background-color: $color-primary;
    border: none;
    padding: 6%;
    font-size: 1.3rem;
    border-radius: 100px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>