<template>
  <nuxt-link
    :key="category.slug"
    class="category__link mx-2 py-6 px-6 rounded-md shadow-sm hover:shadow-md"
    :to="{ name: 'store-books-categories-slug', params: { slug: category.slug } }"
  >
    <svg-icon class="m-auto mb-2" :name="category.slug" />

    <span class="category__text">{{ category.name }}</span>
    <!--<img :src="`${$config.strapiBaseUri}${icon}`" :alt="`${name}`" />-->
  </nuxt-link>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss">
.category__link {
  transition: $transition;
  box-shadow: 0 5px 10px rgba(189, 207, 226, 0.8);
  &:hover {
    background: $orange;
    .sprite-icons {
      fill: $white;
    }
    .category__text {
      color: $white;
    }
  }
  .icon {
    height: 2rem;
    width: 2rem;
  }
}
</style>
