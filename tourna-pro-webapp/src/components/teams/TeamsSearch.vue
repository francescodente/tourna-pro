<template>
  <div class="teams-search">
    <div v-if="allTeams && allTeams.length > 0">
      <div class="search-container">
        <span class="search-icon"><i class="fas fa-search"></i></span>
        <input type="search" placeholder="Filtra" v-model="searchText" />
      </div>
      <grid-container v-if="filteredTeams.length > 0">
        <div v-for="team in filteredTeams" :key="team.id">
          <slot :team="team"></slot>
        </div>
      </grid-container>
      <placeholder-text v-else text="Nessuna squadra corrisponde alla tua ricerca" />
    </div>
    <placeholder-text v-else-if="allTeams" text="Non fai ancora parte di una squadra" />
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import TeamLine from './TeamLine.vue'
import SimpleInput from '../ui/SimpleInput.vue'
import GridContainer from './GridContainer.vue'
import PlaceholderText from '../ui/PlaceholderText.vue'

export default {
  components: { TeamLine, SimpleInput, GridContainer, PlaceholderText },
  data() {
    return {
      searchText: '',
      allTeams: null
    }
  },
  computed: {
    filteredTeams() {
      return this.allTeams.filter(t => t.name.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  },
  async created() {
    this.allTeams = await dataAccess.teams.getAll({
      user: this.$store.getters.userId
    })
  }
}
</script>

<style lang="scss" socped>
.teams-search {
  height: 100%;
  .search-container {
    padding: 10px;

    .search-icon {
      color: gray;
    }

    @media screen and (min-width: 768px) {
      input {
        width: 50%;
      }
    }

    input {
      margin-left: 5px;
      width: 90%;
      font-size: 1.2rem;
      border: none;
      border-bottom: 1px solid black;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>