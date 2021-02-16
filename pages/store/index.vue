<template>
  <div class="store-grid grid grid-cols-4 gap-8">
    <div
      v-for="product in products"
      :key="product.slug"
      class="store-grid__item"
    >
      <BookCard :product="product" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'store',
  async fetch() {
    this.products = await this.$strapi.$products.find()
  },

  data() {
    return {
      products: [],
    }
  },

  computed: {},
}
</script>

<style lang="scss">
.store-grid {
}
</style>
