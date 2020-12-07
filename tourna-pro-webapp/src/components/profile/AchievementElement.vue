<template>
  <div class="main">
    <h4>{{achievement.name}}</h4>
    <div class="date">{{ achievement.date }}</div>
    <div class="descprition">{{ achievement.description }}</div>
    <div class="image"><b-img v-bind="mainProps" rounded="circle"></b-img></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainProps: {
        blank: true,
        blankColor: "#777",
        width: 35,
        height: 35,
        class: "m1",
      },
    };
  },
  props: {
    achievement: Object
  },
};
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 20%;
}
.date {
  color: $color-complementary;
}
.description {
  color: grey;
}
</style>