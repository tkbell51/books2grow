<template>
  <div>
    <h3>My Account</h3>
    <nav class="account-nav">
      <ul class="account-nav__list">
        <li class="account-nav__item">
          <nuxt-link class="account-nav__link" to="/account">Account</nuxt-link>
        </li>
        <li class="account-nav__item">
          <nuxt-link class="account-nav__link" to="/account/wishlist"
            >Wishlist</nuxt-link
          >
        </li>
        <li class="account-nav__item">
          <nuxt-link class="account-nav__link" to="/account/orders"
            >Orders</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  color: $orange;
}
</style>
