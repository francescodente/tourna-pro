<template>
  <div>
    <h2>{{title}}</h2>
    <div class="cropper-container">
      <vue-cropper
      ref="cropper"
      :guides="true"
      :view-mode="2"
      drag-mode="crop"
      :auto-crop-area="0.5"
      :min-container-width="250"
      :min-container-height="180"
      :background="true"
      :rotatable="true"
      :src="imgSrc"
      alt="Source Image"
      :aspect-ratio="squareRatio ? 1 : 0"
    ></vue-cropper>
    </div>
    <div class="control-panel">
    <input
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    />
    <button @click="rotate" v-if="imgSrc != ''">Ruota</button>
    </div>
    
    <floating-button icon="fas fa-plus" @click="submitImage" />
  </div>
</template>

<script>

import VueCropper from "vue-cropperjs";
import BlobUtils from '@/utils/url-to-blob'
import "cropperjs/dist/cropper.css";
import FloatingButton from './FloatingButton.vue';
export default {
  components: {
    VueCropper,
    FloatingButton,
  },
  props: {
    title: String,
    img: String,
    squareRatio: {type: Boolean, default: false}
  },
  data() {
    return {
      imgSrc: this.img
    };
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    submitImage() {
      let url = this.$refs.cropper.getCroppedCanvas().toDataURL('image/jpeg')
      let blob = BlobUtils.dataURItoBlob(url)
      this.$emit('submitImage', blob)
    },
    rotate() {
      this.$refs.cropper.rotate(90);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
