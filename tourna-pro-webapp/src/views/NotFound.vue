<template>
  <div>
    <h1>
      404 - Pagina non trovata
    </h1>
    <p>La pagina che stai cercando di visualizzare non esiste o è stata rimossa</p>
    <p>
      <router-link :to="{ name: 'MyTournaments' }">Clicca qui per tornare alla home</router-link>
    </p>
  </div>
</template>

<script>
import PlaceholderText from '../components/ui/PlaceholderText.vue'
export default {
  components: { PlaceholderText },

}
</script>