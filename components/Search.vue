<template>
  <div class="search-bar">
    <search-focus @keyup="focusSearch" />
    <div class="relative w-80 flex justify-center items-center mt-4">
      <VueFuse
        ref="search"
        :list="products"
        :fuse-opts="options"
        :search="search"
        :map-results="false"
        :default-all="false"
        placeholder="Search by title, description, or category"
        class="bg-background-form border border-gray-500 rounded-full px-2 py-2 outline-none focus:border-blue-500 w-full mr-2"
        @fuse-results="handleResults"
      />
      <button @click="$emit('close-search-drawer')">
        <svg-icon class="header__search" name="close" />
      </button>
      <!-- 
      <button class="absolute top-0 ml-3" style="top: 10px">
        <svg-icon class="h-5 w-5" name="search" />
      </button> -->
      <div
        v-if="search.length > 0"
        class="absolute top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800"
        style="top: 2px"
        @click="reset"
      >
        &times;
      </div>
    </div>
    <transition name="fade">
      <div v-if="results.length > 0" class="results__container px-4">
        <div ref="results" class="results__wrapper">
          <div v-if="bookResults.length > 0">
            <p>Book</p>
            <ul class="results__books">
              <li
                v-for="product in bookResults"
                :key="product.slug"
                @click="
                  $emit('close')
                  reset()
                "
              >
                <nuxt-link
                  :to="{
                    name: 'product-slug',
                    params: { slug: product.item.slug },
                  }"
                  class="block flex cursor-pointer py-4 gap-4"
                >
                  <cld-image
                    :public-id="product.item.image"
                    height="100"
                    crop="fill"
                    gravity="auto:subject"
                    fetch-format="auto"
                    quality="auto"
                    :alt="product.item.title"
                  />
                  <!-- <img :src="product.item.src" :alt="product.item.title" /> -->
                  <div>
                    <p class="font-semibold text-xl">
                      {{ product.item.title }}
                    </p>

                    <p>${{ product.item.price }}</p>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div v-if="artResults.length > 0">
            <p>Art</p>
            <ul class="results__art">
              <li
                v-for="product in artResults"
                :key="product.slug"
                @click="$emit('close')"
              >
                <nuxt-link
                  :to="{
                    name: 'product-slug',
                    params: { slug: product.item.slug },
                  }"
                  class="block flex gap-4 cursor-pointer p-4 hover:bg-blue-100"
                >
                  <cld-image
                    :public-id="product.item.image"
                    height="100"
                    crop="fill"
                    gravity="auto:subject"
                    fetch-format="auto"
                    quality="auto"
                    :alt="product.item.title"
                  />
                  <div>
                    <p class="font-semibold text-xl">
                      {{ product.item.title }}
                    </p>
                    <p>${{ product.item.price }}</p>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-if="results.length === 0"
            class="font-normal w-full border-b cursor-pointer p-4"
          >
            <p class="my-0">
              No results for '
              <strong> {{ search }} </strong>'
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [clickaway],
  async fetch() {
    this.products = await this.$strapi.$products.find()
    this.categories = await this.$strapi.$categories.find()
  },
  data() {
    return {
      search: '',
      searchResultsVisible: false,
      results: [],
      products: [],
    }
  },
  computed: {
    options() {
      return {
        keys: ['title', 'description', 'category.name', 'tag.name'],
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 32,
        minMatchCharLength: 1,
      }
    },
    src() {
      return this.$cloudinary.image.url(this.product.image, {
        gravity: 'auto:subject',
        width: '986',
        height: 200,
      })
    },
    bookResults() {
      return this.results.filter((p) => p.item.type === 'Book')
    },
    artResults() {
      return this.results.filter((p) => p.item.type === 'Art')
    },
  },

  methods: {
    closeSearchDrawer() {
      this.$parent.$emit('searchDrawer')
    },
    handleResults(r) {
      this.results = r
    },

    reset() {
      this.search = ''
      this.highlightedIndex = 0
    },
    softReset() {
      this.searchResultsVisible = true
      this.highlightedIndex = 0
    },
    focusSearch(e) {
      if (e.key === '/') {
        this.$refs.search.focus()
      }
    },
    performSearch() {
      this.$search(this.query, this.posts, this.options).then((results) => {
        this.searchResults = results
      })
    },
    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1
        this.scrollIntoView()
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.searchResults.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1
        this.scrollIntoView()
      }
    },
    scrollIntoView() {
      this.$refs.results.children[this.highlightedIndex].scrollIntoView({
        block: 'nearest',
      })
    },
    gotoLink() {
      if (this.searchResults[this.highlightedIndex]) {
        window.location = this.searchResults[this.highlightedIndex].item.path
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.search {
  &__container {
    background: rgba($dark-grey-blue, 0.9);
    color: $white;
  }
  &__close {
    width: 1.8rem;
    height: 1.8rem;
  }
  &__btn {
    background: $orange;
    svg {
      fill: $white;
      width: 3rem;
      height: 3rem;
    }
  }
}
</style>
