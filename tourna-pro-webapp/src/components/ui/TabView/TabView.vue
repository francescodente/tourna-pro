<template>
  <div>
    <ul class="tabs-nav nav nav-pills nav-justified">
      <li
        v-for="tab in tabs"
        :class="{ 'is-active': tab.isActive}"
        class="nav-item"
        :style="
        (tab.isActive)?
          {color: tab.color } : {} "
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
    font-weight: bold;
    color:$color-not-focus-text;
  }
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.1);
}

.is-active{
  border-bottom: 3.5px solid;
}
</style>