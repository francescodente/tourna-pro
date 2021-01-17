<template>
  <div>
    <team-editor :name.sync="name" :members="members"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamEditor from '../../components/teams/TeamEditor.vue';
import style from "../../style/export.scss";

export default {
  components: {TeamEditor},
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