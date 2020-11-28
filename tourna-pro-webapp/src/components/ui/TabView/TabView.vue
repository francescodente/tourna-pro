<template>
  <div>
    <ul class="tabs-nav nav nav-pills nav-justified">
      <li
        v-for="tab in tabs"
        :class="{ 'is-active': tab.isActive}"
        class="nav-item"
        :key="tab.title"
      >
        <a @click="selectTab(tab)">{{ tab.title }}</a>
      </li>
    </ul>
    <div class="tabs-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabView",
  data() {
    return { tabs: [] };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.title == selectedTab.title;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-nav{
  li{
    list-style: none;
    padding: 12px;
  }
  margin-bottom: 10px;
}

.is-active{
  border-bottom: 2px solid black;
}
</style>