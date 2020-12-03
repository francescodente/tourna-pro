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
     <div class="badge badge-pill">{{'#'+tournament.activity}}</div>
   </b-card>

  </router-link>
</template>

<script>
import TextIcon from '../ui/TextIcon.vue'
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
  margin-bottom: 4%;
  border-radius:15px;
  border: 3px solid;
}

.day {
  text-align: left;
}
.total{
  text-align: right;
}

.badge{
    background-color:white;
    border: 2px solid;
    position:absolute;
    top:-10px;
    right:20px;
    font-size:10pt;
  }
.active {
  background-color: $color-complementary;
  border-color: $color-complementary-lightest;
  .badge{
    color:$color-complementary-lightest;
  }
}
.future {
  background-color: $color-secondary1;
  border-color: $color-secondary1-lightest;
  .badge{
    color:$color-secondary1-lightest;
  }
}
.exploring {
  background-color: $color-secondary2;
  border-color: $color-secondary2-lightest;
  .badge{
    color:$color-secondary2-lightest;
  }
}
</style>