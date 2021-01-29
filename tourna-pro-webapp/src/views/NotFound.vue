<template>
  <div>
    <h1>
      404 - Pagina non trovata
    </h1>
    <p>La pagina che stai cercando di visualizzare non esiste o è stata rimossa</p>
    <p>
      Torna alla <router-link :to="{ name: 'MyTournaments' }">home</router-link> per partecipare a nuovi tornei
    </p>
    <p>
      <img :src="require('@/assets/bench404.png')" alt="Bench">
    </p>
  </div>
</template>

<script>
import PlaceholderText from '../components/ui/PlaceholderText.vue'
export default {
  components: { PlaceholderText },

}
</script>

<style lang="scss" scoped>
img {
  width: 80%;
  opacity: 50%;
}
</style>