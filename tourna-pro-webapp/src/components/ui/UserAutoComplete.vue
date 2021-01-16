<template>
  <div class="autocomplete">
    <input
      type="text"
      placeholder="Inizia a digitare un nome"
      autocomplete="off"
      v-model="query"
      @focus="setVisible()"
      @blur="setHidden"
      @input="updateResults()"
    />
    
    <div
      class="pop-over"
      v-show="hovering || visible && results.length > 0"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div v-for="result in results" :key="result.id">
        <team-member :canDelete="false" :canSelect="true" :member="result" @selected="onSelection(result)" />
      </div>
    </div>
  </div>
</template>

<script>
import dataAccess from '../../data-access'
import TeamMember from '../teams/TeamMember.vue'

export default {
  components: { TeamMember },
  data() {
    return {
      visible: false,
      hovering: false,
      query: '',
      results: []
    }
  },
  methods: {
    setVisible() {
      this.visible = true
    },
    setHidden() {
      this.visible = false
    },
    async updateResults() {
      if (this.query.length == 0) {
        this.results = []
        return
      }

      let escaped = this.query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

      this.results = await dataAccess.users.search({
        username: `^${escaped}`
      })
    },
    onSelection(result) {
      this.query = ''
      this.results = []
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
  border: 1px solid lightgray;
  z-index: 100;
}

input {
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  width: 100%;
}
</style>