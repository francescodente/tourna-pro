<template>
  <div>
    <table>
      <tr>
        <th class>#</th>
        <th>Nome</th>
        <th v-for="stat in ranking.stats" :key="stat.key">{{ stat.name }}</th>
      </tr>
      <tr v-for="(participant, rank) in ranking.ranking" :key="participant.id">
        <td class="rank">
          {{ rank + 1 }}
        </td>
        <td>
          {{ participant.id }}
        </td>
        <td v-for="stat in participant.stats" :key="stat.key">
          {{ stat.value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    ranking: Object,
    participantNames: Object
  }
}
</script>

<style lang="scss" scoped>

table {
  width: 100%;
  padding: 0px 10px;
  font-size: 1.1rem;
}

td, th {
  padding: 10px;

  &.rank {
    font-weight: bold;
  }
}

tr:nth-child(odd) {
  background-color: #eeeeee;
}

$border: 2px solid #666666;
th {
  background-color: #dddddd;
  color: black;
  border-bottom: $border;
  border-top: $border;
}

td {
  color: #333333;
}
</style>