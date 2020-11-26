<template>
  <section>
    <div
      class="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <BookCard v-for="book in books" :key="book.slug" :product="book" />
    </div>
  </section>
</template>

<script>
export default {
  layout: 'store',
  async asyncData({ $strapi }) {
    return {
      books: await $strapi.$products.find({ type: 'Book' }),
    }
  },
}
</script>

<style lang="scss" scoped></style>
