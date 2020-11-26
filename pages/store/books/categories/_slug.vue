<template>
  <section>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 col-span-3"
    >
      <BookCard
        v-for="book in category.products"
        :key="book.slug"
        :product="book"
      />
    </div>
  </section>
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
