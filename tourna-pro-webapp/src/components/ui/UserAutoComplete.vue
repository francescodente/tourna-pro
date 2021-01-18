<template>
  <div class="autocomplete">
    <input
      type="text"
      placeholder="Inizia a digitare un nome"
      autocomplete="off"
      v-model="query"
      @focus="setVisible()"
      @blur="setHidden()"
      @input="updateResults()"
    />
    
    <div
      class="pop-over"
      v-if="hovering || (visible && results)"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div v-if="results && results.length > 0" class="results">
        <user-list :canDelete="false" :canSelect="true" :users="results" @userSelected="onSelection" />
      </div>
      <div v-else class="results empty">
        Nessun utente corrisponde alla tua ricerca
      </div>
    </div>
  </div>
</template>

<script>
import dataAccess from '../../data-access'
import UserList from '../users/UserList.vue'

export default {
  components: { UserList },
  props: {
    exclude: Array
  },
  data() {
    return {
      visible: false,
      hovering: false,
      query: '',
      results: null
    }
  },
  methods: {
    setVisible() {
      this.visible = true
      this.updateResults()
    },
    setHidden() {
      this.visible = false
    },
    async updateResults() {
      if (this.query.length == 0) {
        this.results = null
        return
      }

      let escaped = this.query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

      this.results = await dataAccess.users.search({
        username: `^${escaped}`,
        exclude: JSON.stringify(this.exclude.map(x => x.id))
      })
    },
    onSelection(result) {
      this.query = ''
      this.results = null
      this.hovering = false
      this.$emit('selected', result)
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  width: 100%;
}

.pop-over {
  position: absolute;
  top: 35px;
  width: 100%;
  max-height: 40vh;
  background-color: white;
  border: 1px solid gray;
  z-index: 100;
  overflow-y: scroll;
}

.empty {
  color: gray;
  padding: 10px;
}

input {
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  width: 100%;
}
</style>