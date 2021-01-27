<template>
  <div class="main" v-if="user">
    <image-uploader
      title="Aggiorna la tua immagine del profilo"
      :img="user.imageUrl"
      :squareRatio="true"
      @submitImage="submitImage"
    />
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import ImageUploader from "../../components/ui/ImageUploader.vue";
export default {
  components: { ImageUploader },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    submitImage: async function (image) {
      await dataAccess.users.updateImage(this.$route.params.id, image);
      this.$router.push({name:"UserProfile"})
    },
  },
  async created() {
    this.user = await dataAccess.users.getUser(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
}
</style>