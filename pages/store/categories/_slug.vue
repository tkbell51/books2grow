<template>
  <div
    class="col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center items-start"
  >
    <div
      v-for="product in category.products"
      :key="product.slug"
      class="grid-item"
    >
      <BookCard :product="product" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'store',
  async asyncData({ $strapi, params }) {
    return {
      category: await $strapi.$categories.findOne(params.slug),
    }
  },
}
</script>

<style lang="scss" scoped></style>
