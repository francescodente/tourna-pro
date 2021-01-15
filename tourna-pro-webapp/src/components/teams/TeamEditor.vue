<template>
  <div>
    <div class="teamname">
      <input type="text" name="name" id="name" :value="currentName" @input="$emit('update:name', currentName)"/>
      <div class="icon">
        <i class="fa fa-edit fa-lg"></i>
      </div>
    </div>
    <div class="add">
      <h2>Aggiungi membro</h2>
      <div class="adduser">
        <input type="text" name="user" id="user" v-model="memberToAdd"/>
        <button @click="addMember">
          <i class="fa fa-plus" />
        </button>
      </div>
    </div>

    <div class="members">
      <h2>Membri</h2>
      <team-member-list :members="members" :canDelete="true" @member-deleted="deleteMember"/>
    </div>

    <floating-button icon="fas fa-check" @click="$emit('submit')" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TeamMemberList from '../../components/teams/TeamMemberList.vue';
import FloatingButton from '../../components/ui/FloatingButton.vue';
import style from "../../style/export.scss";

export default {
  components: {TeamMemberList, FloatingButton},
  props: {
    name: String,
    members: Array
  },
  data() {
    return {
      currentName: this.name,
      memberToAdd: ''
    }
  },
  methods: {
    async addMember() {
      this.$emit('added-member')
    },
    deleteMember(id) {
      this.$emit('removed-member', id)
    }
  }
};
</script>

<style lang="scss" scoped>

h2 {
  margin: 0px;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: $color-complementary;
}

input {
  border: none;
  flex-grow: 1;
  border-bottom: 1px solid black;
  margin-left: 5%;
  margin-right: 5%;
  background-color: transparent;
}

.teamname {
  width: 100%;
  margin-top: 10px;
  color: $color-complementary;
  display: flex;
  align-content: left;
  margin-bottom:10px;
  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    padding-left: 3px;
  }
}

.adduser {
  display: flex;
  padding: 10px 0px;
  background-color: $color-complementary-background;
  button {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: $color-complementary;
    color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border: 4px solid $color-complementary-light;
  }
}

</style>