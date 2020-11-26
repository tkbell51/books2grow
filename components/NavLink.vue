<template>
  <div
    id="menu"
    class="header__menu hidden lg:flex lg:items-center lg:w-auto w-full"
  >
    <div class="container">
      <nav class="relative flex justify-center py-2 uppercase">
        <nuxt-link
          class="header__link block border-b-2 border-transparent mx-5"
          to="/"
          ><span>Home</span></nuxt-link
        >
        <nuxt-link
          class="header__link block border-b-2 border-transparent mx-5"
          to="/store"
          ><span>Store</span></nuxt-link
        >
        <nuxt-link
          class="header__link block border-b-2 border-transparent mx-5"
          to="/store/books"
          ><span>eBooks</span>
        </nuxt-link>
        <nuxt-link
          class="header__link block border-b-2 border-transparent mx-5"
          to="/art"
          ><span>Wall Art</span></nuxt-link
        >
        <nuxt-link
          class="header__link block border-b-2 border-transparent mx-5"
          to="/blog"
          ><span>Blog</span>
        </nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header {
  &__menu {
    background: $orange;
  }

  &__link {
    transition: $transition;
    color: $white;
    &:hover {
      border-bottom: 3px solid $orange;
    }
  }
}
</style>
