<template>
  <div v-if="team" class="main">
    <yes-no-popup ref="modal" />
    <div class="team-image-container">
      <image-fit
        :src="team.imageUrl || require('@/assets/defaultTeamImage.png')"
        :alt="`${team.name}'s team image`"
      />
      <overlay-bar :title="team.name">
        <div>
          <router-link
            class="link"
            router-link
            tag="span"
            :to="{ name: 'UploadTeamImage' }"
          >
            <i class="fas fa-camera"></i>
          </router-link>
          <router-link
            class="link"
            router-link
            tag="span"
            :to="{ name: 'TeamEdit', params: { id: teamId } }"
          >
            <i class="fas fa-cog"></i>
          </router-link>
        </div>
      </overlay-bar>
    </div>

    <div class="tab-container">
      <tab-view>
        <tab title="Membri" :selected="true" :color="style.colorComplementary">
          <user-list
            :users="members"
            :owner="team.creatorId"
            :canDelete="false"
            :canSelect="true"
            @userSelected="onMemberSelected"
          />
        </tab>
        <tab title="Attività" :color="style.colorComplementary">
          <div v-for="log in logs" :key="log.id">
            <date-text
              class="activity"
              :date="log.date"
              :dateColor="style.colorComplementary"
            >
              {{ log | formatTeamLog }}
            </date-text>
          </div>
        </tab>
        <tab title="Azioni" :color="style.colorComplementary">
          <div class="actions-tab">
            <action-button
              icon="fas fa-times"
              actionName="Abbandona la squadra"
              :color="style.colorComplementary"
              @trigger="leaveTeam"
            />
          </div>
        </tab>
      </tab-view>
    </div>
  </div>
</template>

<script>
import dataAccess from "@/data-access";
import UserList from "../../components/users/UserList.vue";
import DateText from "../../components/ui/DateText.vue";
import ImageFit from "../../components/ui/ImageFit.vue";
import OverlayBar from "../../components/ui/OverlayBar.vue";
import Tab from "../../components/ui/TabView/Tab.vue";
import TabView from "../../components/ui/TabView/TabView.vue";

import style from "../../style/export.scss";
import ActionButton from "../../components/ui/ActionButton.vue";
import YesNoPopup from "../../components/ui/YesNoPopup.vue";

export default {
  components: {
    ImageFit,
    OverlayBar,
    TabView,
    Tab,
    UserList,
    DateText,
    ActionButton,
    YesNoPopup,
  },
  data() {
    return {
      style,
      team: null,
      members: [],
      logs: [],
    };
  },
  computed: {
    teamId() {
      return this.$route.params.id;
    },
  },
  methods: {
    onMemberSelected(member) {
      this.$router.push({ name: "UserProfile", params: { id: member.id } });
    },
    async leaveTeam() {
      let result = await this.$refs["modal"].show(
        "Abbandona squadra",
        `Sei sicuro di voler abbandonare la squadra ${this.team.name}?`
      );
      if (!result) {
        return;
      }
      await dataAccess.teamMembers.deleteMember(
        this.teamId,
        this.$store.getters.userId
      );
      this.$router.push({ name: "Teams" });
    },
  },
  async created() {
    this.team = await dataAccess.teams.get(this.teamId);
    this.members = await dataAccess.users.search({
      userIds: JSON.stringify(this.team.members),
    });
    this.logs = await dataAccess.logs.getTeamLogs(this.teamId);
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;

  .team-image-container {
    height: 25%;
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

  .tab-container {
    height: 75%;

    .actions-tab {
      padding-top: 10px;
    }
  }

  .link {
    margin-left: 15px;
    &:hover {
      cursor: pointer;
    }
  }

  .activity {
    padding: 10px;
    border-bottom: 1.5px solid $color-complementary;
    background-color: $color-complementary-background;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    .team-image-container {
      height: 30%;
    }

    .tab-container {
      height: 70%;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 992px) {
    .team-image-container {
      height: 35%;
    }
    .tab-container {
      height: 65%;
    }
  }
  @media screen and (min-width: 992px) {
    .team-image-container {
      height: 40%;
    }
    .tab-container {
      height: 60%;
    }
  }
}
</style>