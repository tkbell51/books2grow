<template>
  <div class="flex justify-center">
    <form
      v-if="onWishlist.length > 0"
      action="delete"
      @submit.prevent="removeFromWishlist"
    >
      <button type="submit" class="font-semibold flex gap-2 items-center">
        <svg-icon class="wishlist-icon" name="full-heart" />
        Remove from Wishlist
      </button>
    </form>
    <form v-else action="post" @submit.prevent="addToWishlist">
      <button type="submit" class="font-semibold flex gap-2 items-center">
        <svg-icon class="wishlist-icon" name="open-heart" />
        Add to Wishlist
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    if (this.loggedInUser) {
      this.onWishlist = await this.$strapi.$wishlists.find({
        user: this.loggedInUser.id,
        product: this.product.id,
      })
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped></style>
