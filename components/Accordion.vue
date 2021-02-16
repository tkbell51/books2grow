<template>
  <div class="wrapper my-4">
    <div class="accordion px-4" @click="toggle">
      <p class="accordion__title text-white">
        <slot name="title"></slot>
      </p>
      <svg-icon
        :class="{ rotate: show }"
        class="accordion__icon fill-current text-white"
        name="arrow"
      />
    </div>
    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="show" class="accordion__content mt-4">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
    beforeEnter(el) {
      el.style.height = '0'
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave(el) {
      el.style.height = '0'
    },
  },
}
</script>

<style lang="scss" scoped>
.accordion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $dark-grey-blue;
  &__icon {
    transform: rotate(0deg);
    height: 15px;
    width: 15px;
    transition: $transition;
    &.rotate {
      transform: rotate(180deg);
      transition-duration: 0.3s;
    }
  }
  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
  }

  &__content {
    overflow: hidden;
    transition: $transition;
  }
}
</style>
