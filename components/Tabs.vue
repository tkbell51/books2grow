<template>
  <div>
    <ul class="tabs__header gap-8">
      <li
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{ tab__selected: index == selectedIndex }"
        class="text-3xl"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [], // all of the tabs
    }
  },
  mounted() {
    // console.log('here I am')
    this.selectTab(0)
  },
  created() {
    this.tabs = this.$children
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs__header {
  display: flex;
  li {
    cursor: pointer;
    color: #cacaca;
    &:hover {
      color: $black;
    }
  }
}
.tab__selected {
  color: $black !important;
}
</style>
