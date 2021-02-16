<template>
  <div>
    <div class="container">
      <div>
        <h3 class="text-3xl">Wishlist ({{ wishlist.length }})</h3>
        <div class="grid grid-cols-5 gap-8">
          <div v-for="b in wishlist" :key="b.slug" :product="b">
            <BookCard :product="b.product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',
  async fetch() {
    this.wishlist = await this.$strapi.$wishlists.find({
      user: this.loggedInUser.id,
    })
    console.log(this.$route.hash)
  },
  data() {
    return {
      wishlist: [],
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped></style>
