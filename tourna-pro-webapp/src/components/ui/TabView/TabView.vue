<template>
  <div class="tabView">
    <ul>
      <li
        v-for="tab in tabs"
        :class="{ 'is-active': tab.isActive }"
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
.tab-header-nav{
  display:flex;
}
</style>