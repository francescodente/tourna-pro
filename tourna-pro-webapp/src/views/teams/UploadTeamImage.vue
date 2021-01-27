<template>
  <div class="main" v-if="team">
    <image-uploader
      title="Aggiorna l'immagine della tua squadra"
      :img="team.imageUrl"
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
      team: null,
    };
  },
  methods: {
    submitImage: async function (image) {
      await dataAccess.teams.updateImage(this.$route.params.id, image);
      this.$router.push({ name: "TeamDetails" });
    },
  },
  async created() {
    this.team = await dataAccess.teams.get(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
}
</style>