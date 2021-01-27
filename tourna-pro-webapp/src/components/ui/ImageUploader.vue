<template>
  <div class="main">
    <h2>{{ title }}</h2>
    <div class="cropper-container">
      <vue-cropper class="cropper"
        ref="cropper"
        :guides="false"
        :view-mode="2"
        drag-mode="crop"
        min-container-height="100px"
        :auto-crop-area="1"
        :zoom-on-wheel="false"
        :background="true"
        :src="imgSrc"
        alt="Source Image"
        :aspect-ratio="squareRatio ? 1 : 0"
      />
    </div>
    <div class="control-panel">
      <label>
        <i class="fa fa-camera fa-lg"></i>
        <i class="fa fa-plus fa-xs"></i>
        <input
          type="file"
          name="image"
          accept="image/*"
          @change="setImage"
          hidden
        />
      </label>

      <label @click="rotateRight" v-if="imgSrc != ''">
        <i class="fa fa-redo fa-lg"></i>
      </label>
      <label @click="rotateLeft" v-if="imgSrc != ''">
        <i class="fa fa-undo fa-lg"></i>
      </label>
      <label @click="zoomIn" v-if="imgSrc != ''">
        <i class="fa fa-search-plus fa-lg"></i>
      </label>
      <label @click="zoomOut" v-if="imgSrc != ''">
        <i class="fa fa-search-minus fa-lg"></i>
      </label>
    </div>

    <button class="btn submit-button" @click="submitImage">
      Carica immagine
    </button>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import BlobUtils from "@/utils/url-to-blob";
import "cropperjs/dist/cropper.css";
import FloatingButton from "./FloatingButton.vue";
export default {
  components: {
    VueCropper,
    FloatingButton,
  },
  props: {
    title: String,
    img: String,
    squareRatio: { type: Boolean, default: false },
  },
  data() {
    return {
      imgSrc: this.img,
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
      let url = this.$refs.cropper.getCroppedCanvas().toDataURL("image/jpeg");
      let blob = BlobUtils.dataURItoBlob(url);
      this.$emit("submitImage", blob);
    },
    rotateLeft() {
      this.$refs.cropper.rotate(-90);
    },
    rotateRight() {
      this.$refs.cropper.rotate(90);
    },
    zoomIn() {
      this.$refs.cropper.relativeZoom(0.1);
    },
    zoomOut() {
      this.$refs.cropper.relativeZoom(-0.1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main{
  height: 100%;
}

.cropper {
  height: 300px;
}

.control-panel {
  display: flex;
  color: white;
  background-color: $color-primary-light;
  padding: 15px 0px;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  label {
    margin: 0px;
  }
}

.submit-button {
  color: white;
  font-weight: bold;
  background-color: $color-primary;
}
</style>
