<template>
  <div>
    <div class="teamname">
      <input type="text" name="name" id="name" />
      <div class="icon">
        <i class="fa fa-edit fa-lg"></i>
      </div>
    </div>
    <div class="add">
      <h2>Aggiungi membro</h2>
      <div class="adduser">
        <input type="text" name="user" id="user" />
        <button @click="$emit('click', $event)">
          <i class="fa fa-plus" />
        </button>
      </div>
    </div>

    <div class="members">
      <h2>Membri</h2>
      <team-member-list :members="members" :canDelete="true"/>
    </div>
  </div>
</template>

<script>
import TeamMemberList from '../../components/teams/TeamMemberList.vue';
import style from "../../style/export.scss";

export default {
  components: {TeamMemberList},
  props: {
    icon: String,
  },
  data() {
    return {
      style,
      team: {
        id: 1,
        name: "Inazuma Eleven",
        image:
          "https://cdn.myanimelist.net/s/common/uploaded_files/1442407024-2d1f72c28647fc4a278cdd6fd0b14eb1.jpeg",
        members: 11,
      },
      members: [
        {
          id: 1,
          firstName: "Luigi",
          lastName: "Verdi",
        },
        {
          id: 2,
          firstName: "Mario",
          lastName: "Rossi",
        },
      ],
    };
  },
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