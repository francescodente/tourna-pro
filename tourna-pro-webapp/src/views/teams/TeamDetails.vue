<template>
  <div>
    <div class="image-container">
      <image-fit :src="team.image" :alt="`${team.name} image`" />
      <overlay-bar :title="team.name">
        <router-link
          class="link"
          router-link
          tag="span"
          :to="this.$route.path + '/edit'"
        >
          <i class="fas fa-cog"></i>
        </router-link>
      </overlay-bar>
    </div>

    <tab-view>
      <tab title="Membri" :selected="true" :color="style.colorComplementary">
        <team-member-list :members="members" />
      </tab>
      <tab title="Attività" :color="style.colorComplementary">
        <div v-for="a in activities" :key="a.id">
          <date-text class="activity" :date="a.date" :dateColor="style.colorComplementary">
            {{ a.text }}
          </date-text>
        </div>
      </tab>
    </tab-view>
  </div>
</template>

<script>
import TeamMemberList from "../../components/teams/TeamMemberList.vue";
import DateText from "../../components/ui/DateText.vue";
import ImageFit from "../../components/ui/ImageFit.vue";
import OverlayBar from "../../components/ui/OverlayBar.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";

import style from "../../style/export.scss";

export default {
  components: { ImageFit, OverlayBar, TabView, Tab, TeamMemberList, DateText },
  data() {
    return {
      style,
      team: {
        id: 1,
        name: "Inazuma Eleven",
        image:
          "https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg",
        members: 11,
      },
      members: [
        {
          id: 1,
          firstName: "Luigi",
          lastName: "Verdi",
        },
        {
          id: 2,
          firstName: "Mario",
          lastName: "Rossi",
        },
      ],
      activities: [
        {
          id: 1,
          date: "20/01/2020",
          text: "La squadra ha vinto il torneo"
        },
        {
          id: 2,
          date: "18/01/2020",
          text: "La squadra si è iscritta al torneo"
        }
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  height: 25vh;
  position: relative;

  .description-container {
    position: absolute;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    color: white;
    display: flex;
  }
}

.link:hover {
  cursor: pointer;
}


.activity{
  padding: 10px;
  border-bottom: 1.5px solid $color-complementary;
  background-color: $color-complementary-background;
}
</style>