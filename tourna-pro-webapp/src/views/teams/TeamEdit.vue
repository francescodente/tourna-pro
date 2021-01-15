<template>
  <div>
    <team-editor :name.sync="name" :members="members"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamEditor from '../../components/teams/TeamEditor.vue';
import TeamMemberList from '../../components/teams/TeamMemberList.vue';
import FloatingButton from '../../components/ui/FloatingButton.vue';
import style from "../../style/export.scss";

export default {
  components: {TeamMemberList, FloatingButton, TeamEditor},
  props: {
    icon: String,
  },
  data() {
    return {
      name: '',
      members: []
    }
  }
};
</script>

<style lang="scss" scoped>

</style>