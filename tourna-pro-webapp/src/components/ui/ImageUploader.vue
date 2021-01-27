<template>
  <div class="main">
    <div class="cropper-container">
      <vue-cropper
        class="cropper"
        ref="cropper"
        :guides="false"
        :view-mode="2"
        drag-mode="crop"
        :auto-crop-area="0.5"
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

      <label @click="rotateRight" v-if="imgSrc">
        <i class="fa fa-redo fa-lg"></i>
      </label>
      <label @click="rotateLeft" v-if="imgSrc">
        <i class="fa fa-undo fa-lg"></i>
      </label>
      <label
        @click="dragToMove"
        v-if="imgSrc"
      >
        <span  v-show="dragModeCrop"><i class="fa fa-crop-alt fa-lg"></i></span>
        <span  v-show="!dragModeCrop"><i  class="fa fa-arrows-alt fa-lg"></i></span>
      </label>
      <label @click="zoomIn" v-if="imgSrc">
        <i class="fa fa-search-plus fa-lg"></i>
      </label>
      <label @click="zoomOut" v-if="imgSrc">
        <i class="fa fa-search-minus fa-lg"></i>
      </label>
      <label @click="submitImage" v-if="imgSrc">
        <i class="fa fa-check fa-lg"></i>
      </label>
    </div>
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
      dragModeCrop: true,
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
    dragToMove() {
      this.$refs.cropper.setDragMode(this.dragModeCrop ? "move" : "crop");
      this.dragModeCrop = !this.dragModeCrop;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cropper-container {
  flex-grow: 1;
}

.cropper {
  height: 100%;
}

.control-panel {
  display: flex;
  color: white;
  background-color: $color-primary-light;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;

  label {
    flex-grow: 1;
    margin: 0px;
    padding: 15px 15px;
    &:hover {
      cursor: pointer;
      background-color: $color-primary;
    }
  }
}

.selected {
  background-color: $color-primary;
}

.submit-button {
  color: white;
  font-weight: bold;
  background-color: $color-primary;
}
</style>
