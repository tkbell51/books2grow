<template>
  <nuxt-link
    :key="category.slug"
    class="category__link p-2 h-40 w-40 shadow hover:shadow-lg flex flex-col text-center items-center justify-center rounded-full shadow-sm hover:shadow-md"
    :to="{
      name: 'store-categories-slug',
      params: { slug: category.slug },
    }"
  >
    <div>
      <svg-icon class="m-auto mb-2" :name="category.slug" />

      <span class="category__text">{{ category.name }}</span>
    </div>
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
  background: $white;
  transition: $transition;
  &:hover {
    background: $orange;
    transform: scale(1.1);
    margin: 0 1rem;
    .sprite-icons {
      fill: $white;
    }
    .category__text {
      color: $white;
      @apply font-semibold;
    }
  }
  .icon {
    height: 2rem;
    width: 2rem;
  }
}
</style>
