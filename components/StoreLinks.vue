<template>
  <aside>
    <Accordion class="store__accordion bg-white">
      <template v-slot:title>Ebooks</template>
      <template v-slot:content>
        <ul class="store__list store__accordion-content flex flex-col mb-3">
          <li class="store__item my-1">
            <nuxt-link class="store__link pl-3" to="/store/books"
              >All Books</nuxt-link
            >
          </li>
          <li
            v-for="category in nonEmptyBookCategories"
            :key="category.slug"
            class="store__item my-1"
          >
            <nuxt-link
              class="store__link pl-3"
              :to="{
                name: 'store-categories-slug',
                params: { slug: category.slug },
              }"
              >{{ category.name }}</nuxt-link
            >
          </li>
        </ul>
      </template>
    </Accordion>
    <Accordion class="store__accordion bg-white">
      <template v-slot:title>Wall Art</template>
      <template v-slot:content>
        <ul class="store__list store__accordion-content flex flex-col mb-3">
          <li class="store__item my-1">
            <nuxt-link class="store__link pl-3" to="/store/art"
              >All Art</nuxt-link
            >
          </li>
          <li
            v-for="category in nonEmptyArtCategories"
            :key="category.slug"
            class="store__item my-1"
          >
            <nuxt-link
              class="store__link pl-3"
              :to="{
                name: 'store-categories-slug',
                params: { slug: category.slug },
              }"
              >{{ category.name }}</nuxt-link
            >
          </li>
        </ul>
      </template>
    </Accordion>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      isOpen: true,
    }
  },
  computed: {
    nonEmptyBookCategories() {
      return this.categories.filter(
        (d) =>
          d.products.length > 0 && d.products.some((f) => f.type === 'Book')
      )
    },
    nonEmptyArtCategories() {
      return this.categories.filter(
        (d) => d.products.length > 0 && d.products.some((f) => f.type === 'Art')
      )
    },
    accordionClasses() {
      return {
        'is-closed': !this.isOpen,
        'is-primary': this.isOpen,
        'is-dark': !this.isOpen,
      }
    },
  },
  async mounted() {
    try {
      this.categories = await this.$strapi.$categories.find()
    } catch (error) {
      this.error = null
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  @apply font-bold;
}
.store {
  &__accordion {
    @apply px-2 shadow;
    margin-bottom: 1rem;
    &-header {
      cursor: pointer;
    }
    &-body {
      padding: 0;
      max-height: 10em;
      overflow: hidden;
      transition: 0.3s ease all;
    }
  }
}
.is-closed .store__accordion-body {
  max-height: 0;
}
</style>
