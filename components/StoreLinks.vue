<template>
  <aside>
    <h3>Categories</h3>
    <ul class="category__list flex flex-col">
      <li class="category__item">
        <nuxt-link class="category__link" to="/books">All Books</nuxt-link>
      </li>
      <li
        v-for="category in nonEmptyCategories"
        :key="category.slug"
        class="category__item"
      >
        <nuxt-link
          class="category__link"
          :to="{
            name: 'store-books-categories-slug',
            params: { slug: category.slug },
          }"
          >{{ category.name }}</nuxt-link
        >
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    }
  },
  computed: {
    nonEmptyCategories() {
      return this.categories.filter((c) => c.products.length > 0)
    },
  },
  async mounted() {
    try {
      this.categories = await this.$strapi.$categories.find()
    } catch (error) {
      this.error = null
    }
  },
}
</script>

<style lang="scss" scoped></style>
