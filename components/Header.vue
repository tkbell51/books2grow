<template>
  <header class="header relative mb-2">
    <nav class="mx-8">
      <div class="flex items-center justify-between flex-wrap p-2">
        <label for="menu-toggle" class="cursor-pointer lg:hidden block">
          <svg-icon name="menu" class="mobile-menu" />
        </label>
        <input type="checkbox" class="hidden" ide="menu-toggle" />
        <div class="flex items-center">
          <nuxt-link class="header__logo" to="/">
            <Logo color="black" />
          </nuxt-link>
          <NavLink />
        </div>

        <div class="flex items-center">
          <button @click="searchDrawer">
            <svg-icon class="header__search" name="search" />
          </button>
          <!-- <AccountDropdown /> -->
          <button class="snipcart-checkout flex items-center buy-btn mx-2">
            <Cart color="black" />
            <div>
              <span class="snipcart-items-count mr-1"></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
        @keydown.esc="isOpen = false"
      >
        <div
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
          @click="isOpen = false"
        ></div>
      </div>
    </transition>
    <Search
      class="transform top-0 right-0 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 p-2"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      style="width: 24rem"
      @close-search-drawer="isOpen = false"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty('overflow', 'hidden')
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false
    })
  },
  methods: {
    searchDrawer() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss">
.header {
  width: 100%;
  z-index: 5;
  &__search,
  .mobile-menu {
    width: 1.8rem;
    height: 1.8rem;
  }
  #menu-toggle:checked + #menu {
    display: block;
  }
  &__logo {
    display: inline-block;
    width: 6rem;
  }
  // .buy-btn {
  //   margin-left: auto;
  // }

  .cart {
    position: relative;
  }
  .nuxt-link-exact-active {
    color: $black;
  }
}
.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>
