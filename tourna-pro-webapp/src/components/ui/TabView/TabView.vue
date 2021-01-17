<template>
  <div class="all">
    <ul class="tabs-nav no-scrollbar">
      <li
        v-for="tab in tabs"
        :class="{ 'is-active': tab.isActive, 'is-not-active': !tab.isActive}"
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

.all {
  height: 100%;
  max-width:100%;
  display: flex;
  flex-direction: column;
}



.tabs-nav{
  width:100%;
  overflow-x:scroll;
  padding:0px;
  margin:0px;
  flex-shrink: 0;
  display:flex;
  flex-direction: row;
  li{
    min-width:30%;
    list-style: none;
    font-weight: bold;
    flex: 1 1 0;
    color:$color-not-focus-text;
    a {
      padding:12px;
      display:block;
    }
  }
  box-shadow: 0px 0px 10px -5px rgba(0,0,0,0.75);
}

.tabs-body{
  flex-grow: 1;
  overflow-y: scroll;
}

.is-active{
  border-bottom: 3.5px solid;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
}

.is-not-active{
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.1);
}
</style>