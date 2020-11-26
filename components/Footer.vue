<template>
  <footer class="footer py-5 px-4">
    <div class="container">
      <div class="footer__top flex">
        <nuxt-link class="footer__logo" to="/">
          <Logo class="footer__logo" />
        </nuxt-link>
        <div>
          <h4>Shop Books2Grow</h4>
          <ul>
            <li>
              <nuxt-link to="">New Releases</nuxt-link>
            </li>
            <li>
              <nuxt-link to="">Shop All</nuxt-link>
            </li>
            <li>
              <nuxt-link to="">Best Sellers</nuxt-link>
            </li>
            <li>
              <nuxt-link to=""></nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Products</h4>
        </div>
      </div>
      <div class="footer__bottom text-white">
        <div class="flex">
          <p>Copyright</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  background: $black;
  position: relative;
  &__logo {
    display: inline-block;
    height: 100px;
  }
}
</style>
