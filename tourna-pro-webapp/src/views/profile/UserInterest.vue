<template>
  <div class="main">
    <h2 class="headline">Modifica i tuoi interessi</h2>
    <activity-info v-model="selectedActivities" />

    <floating-button icon="fas fa-check" @click="updateUser" />
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import ActivityInfo from "../../components/registration/ActivityInfo.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";
import FloatingButton from "../../components/ui/FloatingButton.vue";

export default {
  components: { ActivityInfo, Headline, FloatingButton },
  data() {
    return {
      selectedActivities: [],
    };
  },
  methods: {
    async updateUser() {
      await dataAccess.interests.update(this.userId, this.selectedActivities);
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    }
  },
  async created() {
    this.selectedActivities = await dataAccess.interests.getAll(this.userId);
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 90%;
  margin-left: 5%;
  .headline {
    margin: 10px 0px;
    color: $color-primary-lightest;
  }
}
</style>