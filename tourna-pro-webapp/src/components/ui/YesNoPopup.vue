<template>
  <b-modal ref="my-modal" id="modal-center" hide-header-close centered :title="title" @hide="checkHidden">
    <p class="my-4">{{text}}</p>
  </b-modal>
</template>

<script>
export default {
  name: 'YesNoPopup',
  data() {
    return {
      resolve: null,
      title: '',
      text: ''
    }
  },
  methods: {
    show(title, text){
      this.title = title;
      this.text = text;
      this.$refs["my-modal"].show();
      return new Promise((resolve) => this.resolve = resolve)
    },
    checkHidden(event){
      if(event.trigger == 'ok'){
        this.resolve(true)
      } else {
        this.resolve(false)
      }
    }

  }
  
}
</script>