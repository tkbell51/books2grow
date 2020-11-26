<template>
  <div class="tab" :class="{ active: isActive }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  fetch() {
    this.isActive = false
  },
  data() {
    return {
      isActive: undefined,
    }
  },
}
</script>

<style lang="scss">
.tab {
  opacity: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;

  &.active {
    opacity: 1;
    z-index: 4;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
