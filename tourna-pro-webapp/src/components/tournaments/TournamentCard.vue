<template>
  <router-link tag="div" :to="`/tournaments/${tournament.id}`">
    <b-card :class="`common ${status}`">
      <div class="headline">
        <h5 class="title">{{ tournament.name }}</h5>
        <p>{{ `${tournament.ageGroup}, ${tournament.gender}` }}</p>
      </div>
      <div class="row col">
        <text-icon :text="tournament.place" icon="fas fa-map-marker-alt" :iconColor="iconColor" />
      </div>
      <div class="my-row">
        <div class="day">
          <text-icon :text="tournament.date" icon="far fa-calendar-alt" :iconColor="iconColor" />
        </div>
        <div class="total">
          <text-icon
            :text="`${tournament.partecipants}/${tournament.total} ${
              tournament.type == 'team' ? 'Squadre' : 'Partecipanti'
            }`"
            icon="fas fa-users"
            :iconColor="iconColor"
          />
        </div>
      </div>
      <div class="badge badge-pill">{{ "#" + tournament.activity }}</div>
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
  computed: {
    iconColor: function () {
      switch (this.status) {
        case 'ACTIVE':
          return style.colorComplementary
          break;
        case 'FUTURE':
          return style.colorSecondary1
          break;
        default:
          return 'inherit'
      }
    }
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
  margin-bottom: 7%;
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
  top: -10px;
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
    color: $color-complementary-lightest;
  }
}
.FUTURE {
  .title {
    color: $color-secondary1;
  }
  //background-color: $color-secondary1;
  border-color: $color-secondary1-lightest;
  .badge {
    color: $color-secondary1-lightest;
  }
}
.exploring {
  background-color: $color-secondary2;
  border-color: $color-secondary2-lightest;
  .badge {
    color: $color-secondary2-lightest;
  }
}
</style>