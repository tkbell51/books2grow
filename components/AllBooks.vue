<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
  >
    <BookCard
      v-for="b in books"
      :key="b.slug"
      :title="b.title"
      :slug="b.slug"
      :image="b.image"
      :price="b.price"
      :snipcart="b.snipcart_guid"
      :description="b.description"
      :category="b.category.slug"
      :data-item-categories="b.category.name"
    />
  </div>
</template>

<script>
import allBooksQuery from '~/apollo/queries/book/books.gql'
export default {
  fetch() {
    this.books = []
  },
  data() {
    return {
      books: [],
    }
  },
  apollo: {
    books: {
      prefetch: true,
      query: allBooksQuery,
    },
  },
}
</script>

<style lang="scss" scoped></style>
