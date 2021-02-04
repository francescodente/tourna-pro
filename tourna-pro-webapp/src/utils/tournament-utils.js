export default {
  goToTab(tab, ctx) {
    if (ctx.$route.query.selectedTab == tab) {
      ctx.$router.go(0)
    } else {
      ctx.$router.push({ name: 'TournamentDetails', params: { id: ctx.$route.params.id }, query: { selectedTab: tab } })
    }
  }
}