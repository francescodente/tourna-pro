<template>
  <div v-if="team">
    <div class="image-container">
      <image-fit :src="team.imageUrl || require('@/assets/defaultTeamImage.png')" :alt="`${team.name}'s team image`" />
      <overlay-bar :title="team.name">
        <router-link
          class="link"
          router-link
          tag="span"
          :to="{ name: 'TeamEdit', params: { id: teamId }}"
        >
          <i class="fas fa-cog"></i>
        </router-link>
      </overlay-bar>
    </div>

    <tab-view>
      <tab title="Membri" :selected="true" :color="style.colorComplementary">
        <user-list :users="members" :canDelete="false" :canSelect="true" @userSelected="onMemberSelected" />
      </tab>
      <tab title="Attività" :color="style.colorComplementary">
        <div v-for="log in logs" :key="log.id">
          <date-text class="activity" :date="log.date" :dateColor="style.colorComplementary">
            {{ log.text }}
          </date-text>
        </div>
      </tab>
    </tab-view>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import UserList from "../../components/users/UserList.vue";
import DateText from "../../components/ui/DateText.vue";
import ImageFit from "../../components/ui/ImageFit.vue";
import OverlayBar from "../../components/ui/OverlayBar.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";

import style from "../../style/export.scss";

export default {
  components: { ImageFit, OverlayBar, TabView, Tab, UserList, DateText },
  data() {
    return {
      style,
      team: null,
      members: [],
      logs: []
    }
  },
  computed: {
    teamId() {
      return this.$route.params.id
    }
  },
  methods: {
    onMemberSelected(member) {
      this.$router.push({ name: 'UserProfile', params: { id: member.id }})
    }
  },
  async created() {
    this.team = await dataAccess.teams.get(this.teamId)
    this.members = await dataAccess.users.search({
      userIds: JSON.stringify(this.team.members)
    })
  }
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