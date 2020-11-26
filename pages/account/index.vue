<template>
  <div>
    <PageBanner />
    <div class="container">
      <h2 class="text-6xl">My Account</h2>
      <div>
        <p>
          <strong>Username: </strong>
          {{ loggedInUser.username }}
        </p>
        <p>
          <strong>Email: </strong>
          {{ loggedInUser.email }}
        </p>
      </div>
      <div>
        <h3 class="text-3xl">Wishlist</h3>
        <div class="grid grid-cols-4">
          <BookCard v-for="b in wishlist" :key="b.slug" :product="b" />
        </div>
      </div>
      <div>
        <h3 class="text-3xl">Orders</h3>
        <div class="grid grid-cols-4">
          <BookCard v-for="b in purchases" :key="b.slug" :product="b" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  async fetch() {
    this.wishlist = await this.$strapi.$products.find({
      id: [this.loggedInUser.product_wishlist],
    })
    this.purchases = await this.$strapi.$products.find({
      id: [this.loggedInUser.purchases],
    })
  },

  data() {
    return {
      wishlist: [],
      purchases: [],
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped></style>
