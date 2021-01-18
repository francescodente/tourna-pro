<template>
  <form @submit.prevent="$emit('submit')">
    <div class="input-container">
      <slot/>
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
form {
  width: 100%;

  .input-container {
    margin-bottom: 20px;
  }

  .form-submit {
    width: 100%;
    height: 60px;
    margin-top: 3em;
  }

  input[type=submit] {
    color: $color-primary-text;
    background-color: $color-primary;
    border: none;
    font-size: 1.3rem;
    border-radius: 9999px;
    width: 100%;
    height: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>