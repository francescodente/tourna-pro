<template>
  <div class="teams-search">
    <div v-if="allTeams && allTeams.length > 0">
      <div class="search-container">
        <input type="search" placeholder="Filtra" v-model="searchText" />
      </div>
      <div v-if="filteredTeams.length > 0" class="teams-container">
        <div v-for="team in filteredTeams" :key="team.id">
          <slot :team="team"></slot>
        </div>
      </div>
      <div v-else>
        Nessuna squadra corrisponde alla tua ricerca.
      </div>
    </div>
    <div v-else-if="allTeams">
      Non fai ancora parte di una squadra.
    </div>
  </div>
</template>

<script>
import dataAccess from '@/data-access'
import TeamLine from './TeamLine.vue'
import SimpleInput from '../ui/SimpleInput.vue'

export default {
  components: { TeamLine, SimpleInput },
  data() {
    return {
      searchText: '',
      allTeams: null
    }
  },
  computed: {
    filteredTeams() {
      return this.allTeams.filter(t => t.name.includes(this.searchText))
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
  .search-container {
    padding: 10px;

    input {
      width: 50%;
      font-size: 1.2rem;
      border: none;
      border-bottom: 2px solid black;

      &:focus {
      outline: none;
    }
    }
  }

  .teams-container {
    display: flex;
    flex-wrap: wrap;
  }
  .teams-container > * {
    flex: 1 1 280px;
    margin: 1px;
  }
}
</style>