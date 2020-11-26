<template>
  <div>
    <PageBanner />
    <section>
      <div class="container">
        <div
          class="relative mb-3 pr-8 inline-block rounded shadow py-4 px-3 border border-gray-400"
        >
          <p
            v-on-clickaway="away"
            class="text-gray-700 cursor-pointer flex items-center"
            @click="orderOpen = !orderOpen"
          >
            <span class="mr-1">Category</span>
            <span class="font-semibold">
              {{ selectedCategory }}
            </span>
          </p>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
          <ul
            v-show="orderOpen"
            class="bg-white absolute z-20 px-3 py-2 mt-1 rounded shadow-lg text-gray-700 min-w-full"
          >
            <li
              class="cursor-pointer pb-1 hover:text-indigo-600 text-indigo-600 font-semibold"
              @click="categoryFilter('')"
            >
              All Books
            </li>
            <li
              v-for="category in nonEmptyCategories"
              :key="category.slug"
              class="cursor-pointer pb-1 hover:text-indigo-600 text-indigo-600 font-semibold whitespace-no-wrap"
              @click="categoryFilter(category.name)"
            >
              {{ category.name }}
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-5">
          <!--<div class="flex flex-col col-span-1">
            <button @click="categoryFilter('')">All Books</button>

            <button
              v-for="category in nonEmptyCategories"
              :key="category.slug"
              class="category__link"
              @click="categoryFilter(category.name)"
            >
              {{ category.name }}
            </button>
          </div>-->
          <div
            class="col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            <BookCard
              v-for="book in filteredBooks"
              :key="book.slug"
              :product="book"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [clickaway],
  async asyncData({ $strapi }) {
    return {
      books: await $strapi.$products.find(),
      categories: await $strapi.$categories.find(),
    }
  },
  data() {
    return {
      filteredBooks: [],
      orderOpen: false,
      selectedCategory: '',
    }
  },
  computed: {
    nonEmptyCategories() {
      return this.categories.filter((c) => c.products.length > 0)
    },
  },
  mounted() {
    this.filteredBooks = this.books
    this.selectedCategory = 'All Books'
  },
  methods: {
    categoryFilter(categoryName) {
      if (categoryName === '') {
        this.selectedCategory = 'All Books'
        this.filteredBooks = this.books
      } else {
        this.selectedCategory = categoryName

        this.filteredBooks = this.books.filter((e) => {
          return e.category.name === categoryName
        })
      }
    },
    away(e) {
      this.orderOpen = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
