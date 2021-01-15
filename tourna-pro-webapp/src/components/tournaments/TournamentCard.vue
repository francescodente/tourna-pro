<template>
  <router-link tag="div" :to="`/tournaments/${tournament.id}`">
    <b-card :class="'common ' + cssStyle(tournament.status)">
      <div class="headline">
        <h5 class="title">{{ tournament.name }}</h5>
        <p>{{ `Età: ${tournament.minAge} - ${tournament.maxAge}, Genere: ${tournament.gender}` }}</p>
      </div>
      <div class="row col">
        <text-icon
          :text="tournament.location"
          icon="fas fa-map-marker-alt"
          :iconColor="iconColor(tournament.status)"
        />
      </div>
      <div class="my-row">
        <div class="day">
          <text-icon
            :text="tournament.date | dateFormat"
            icon="far fa-calendar-alt"
            :iconColor="iconColor(tournament.status)"
          />
        </div>
        <div class="total">
          <text-icon
            :text="`${tournament.currentParticipants}/${tournament.maxParticipants} ${
              tournament.mode == 'TEAM' ? 'Squadre' : 'Partecipanti'
            }`"
            icon="fas fa-users"
            :iconColor="iconColor(tournament.status)"
          />
        </div>
      </div>
      <div class="badge badge-pill">{{ "#" + tournament.activityId }}</div>
    </b-card>
  </router-link>
</template>

<script>
import TextIcon from "../ui/TextIcon.vue";
import style from "../../style/export.scss";
export default {
  components: { TextIcon },
  name: "TournamentCard",
  data: function () {
    return style;
  },
  props: {
    tournament: Object,
    status: String,
  },
  methods: {
    cssStyle: function (status) {
      if (status == "PENDING") return "FUTURE";
      else if (status == "ACTIVE") return "ACTIVE";
      else return "";
    },
    iconColor: function (status) {
      if (status == "PENDING") return style.colorSecondary1;
      else if (status == "ACTIVE") return style.colorComplementary;
      else return style.colorSecondary1;
    },
  },
};
</script>

<style lang="scss" scoped>
.headline {
  h5 {
    font-weight: bold;
    margin-bottom: 0px;
  }
}

.common {
  text-align: center;
  width: 100%;
  color: black;
  border-radius: 15px;
  border: 3px solid;
}

.my-row {
  display: flex;
  justify-content: space-between;
}
.day {
  margin: 0px;
  text-align: left;
}
.total {
  margin: 0px;
  text-align: right;
}

.badge {
  background-color: white;
  border: 2px solid;
  position: absolute;
  top: -13px;
  right: 20px;
  font-size: 10pt;
}
.ACTIVE {
  .title {
    color: $color-complementary;
  }
  //background-color: $color-complementary;
  border-color: $color-complementary-lightest;
  .badge {
    color: $color-complementary;
    border-color: $color-complementary-lightest;
  }
}
.FUTURE {
  .title {
    color: $color-secondary1;
  }
  //background-color: $color-secondary1;
  border-color: $color-secondary1-lightest;
  .badge {
    color: $color-secondary1;
    border-color: $color-secondary1-lightest;
  }
}
.exploring {
  background-color: $color-secondary2;
  border-color: $color-secondary2-lightest;
  .badge {
    color: $color-secondary2;
  }
}
</style>