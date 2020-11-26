<template>
  <header class="header shadow-lg">
    <div class="container">
      <div class="flex items-center justify-between flex-wrap p-2">
        <div class="flex items-center">
          <nuxt-link class="header__logo" to="/">
            <Logo color="black" />
          </nuxt-link>
        </div>
        <div class="flex">
          <label for="menu-toggle" class="cursor-pointer lg:hidden block">
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </label>
          <input type="checkbox" class="hidden" ide="menu-toggle" />
          <div class="flex items-center">
            <nuxt-link class="mx-2" to="/search">
              <svg-icon class="header__search" name="search" />
            </nuxt-link>
            <button class="snipcart-checkout flex items-center buy-btn mx-2">
              <Cart color="black" />
              <span
                class="snipcart-items-count font-semibold text-sm text-white rounded-full h-6 w-6 flex items-center justify-center"
              ></span>
            </button>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
    <NavLink />
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header {
  background: $white;
  width: 100%;
  z-index: 5;

  &__search {
    fill: $black;
    height: 1.8rem;
    width: 1.8rem;
  }
  #menu-toggle:checked + #menu {
    display: block;
  }
  &__logo {
    display: inline-block;
    width: 8rem;
  }
  // .buy-btn {
  //   margin-left: auto;
  // }
  .snipcart-items-count {
    background-color: $dark-grey-blue;
  }
  .cart {
    position: relative;
    .snipcart-items-count {
      position: absolute;
      right: 0;
    }
  }
}
</style>
