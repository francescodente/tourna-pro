<template>
  <div class="main">
    <h2 class="headline">Modifica i tuoi interessi</h2>
    <activity-info v-model="selectedActivities" :value="selectedActivities" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ActivityInfo from "../../components/registration/ActivityInfo.vue";
import Headline from "../../components/tournaments/tournament-details/Headline.vue";

export default {
  components: { ActivityInfo, Headline },
  data() {
    return {
      selectedActivities: this.userInterests,
    };
  },
  methods: {
    ...mapActions([
      "updateUser"
    ]),
  },
  computed: {
    ...mapGetters([
      "user",
      "userInterests",
      "userAchievements",
      "userId"
    ]),
  },
  async created() {
    await this.updateUser(this.userId,this.userInterests);
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