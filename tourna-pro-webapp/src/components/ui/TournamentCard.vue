<template>
<a :href="`??????/tournament/${tournament.id}`">
   <b-card :class="`common, ${status}`" :title="tournament.name" :sub-title="`${tournament.ageGroup}, ${tournament.gender}`">
     <div>
       <text-icon 
        :text="tournament.place"
        />
     </div>
     <div>
       <div>
         <text-icon 
          :text="tournament.date"
          />
       </div>
       <div>
         <text-icon 
          :text="`${tournament.partecipants}/${tournament.total} ${tournament.type == 'team' ? 'Squadre' : 'Partecipanti'}`"
          />
       </div>
     </div>
   </b-card>
  </a>
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
.common{
  color:white;
  text-align: center;
}
.active {
  background-color: $color-complementary;
}
.future {
  background-color: $color-secondary1;
}
.exploring {
  background-color: $color-secondary2;
}
</style>