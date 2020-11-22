<template>
  <router-link tag="div" :to="`/tournaments/${tournament.id}`">
   <b-card text-variant="white" :class="`common ${status}`" >
    <div class="title">
      <h5>{{tournament.name}}</h5>
      <p>{{`${tournament.ageGroup}, ${tournament.gender}`}}</p>
    </div>
     <div class="row col">
       <text-icon 
        :text="tournament.place"
        icon="fas fa-map-marker-alt"
        />
     </div>
     <div class="row">
       <div class="col-6 day">
         <text-icon 
          :text="tournament.date"
          icon="far fa-calendar-alt"
          />
       </div>
       <div class="col-6 total">
         <text-icon 
          :text="`${tournament.partecipants}/${tournament.total} ${tournament.type == 'team' ? 'Squadre' : 'Partecipanti'}`"
          icon="fas fa-users"
          />
       </div>
     </div>
   </b-card>
  </router-link>
</template>

<script>
import TextIcon from './TextIcon.vue'
export default {
  components: { TextIcon },
  name: 'TournamentCard',
  props: {
    tournament: Object,
    status: String
  }
}
</script>

<style lang="scss" scoped>

.title{
  h5 {
    font-weight: bold;
    margin-bottom:0px;
  }

}

.common{
  text-align: center;
  width:90%;
  margin-left:5%;
  margin-bottom: 2%;
  border-radius:15px;
  border: 3px solid;
}

.day {
  text-align: left;
}
.total{
  text-align: right;
}
.active {
  background-color: $color-complementary;
  border-color: $color-complementary-lightest;
}
.future {
  background-color: $color-secondary1;
}
.exploring {
  background-color: $color-secondary2;
}
</style>