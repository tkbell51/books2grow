<template>
  <div :key="product.slug" class="product hover:shadow-lg p-1">
    <div class="product__top relative">
      <nuxt-link
        v-if="product.type === 'Book'"
        :to="{
          name: 'product-slug',
          params: { slug: product.slug },
        }"
        class="product__img-link shadowrelative flex justify-center items-center"
      >
        <img class="product__img" :src="src" :alt="product.title" />
        <svg-icon class="product__search absolute rounded-full" name="search" />
      </nuxt-link>
      <nuxt-link
        v-else-if="product.type === 'Art'"
        :to="{
          name: 'product-slug',
          params: { slug: product.slug },
        }"
        class="product__img-link relative flex justify-center items-center"
      >
        <img class="product__img shadow-xl" :src="src" :alt="product.title" />
        <svg-icon class="product__search absolute rounded-full" name="search" />
      </nuxt-link>

      <button
        class="snipcart-add-item product__hover snipcart-add-item text-center font-semibold py-2 px-4 flex justify-center"
        :data-item-id="product.snipcart_guid"
        :data-item-price="product.price"
        :data-item-url="`http://localhost:3000`"
        :data-item-description="product.short"
        :data-item-image="src"
        :data-item-name="product.title"
        :data-item-categories="product.category.name"
        :daya-item-metadata="{ type: product.type }"
      >
        <Cart class="mr-2" />
        Add to cart
      </button>
    </div>

    <nuxt-link
      v-if="product.type === 'Book'"
      :to="{
        name: 'product-slug',
        params: { slug: product.slug },
      }"
      class="product__title text-lg font-bold"
      >{{ product.title }}</nuxt-link
    >
    <nuxt-link
      v-else-if="product.type === 'Art'"
      :to="{
        name: 'product-slug',
        params: { slug: product.slug },
      }"
      class="product__title text-lg font-bold"
      >{{ product.title }}</nuxt-link
    >
    <p class="product__price text-md">${{ product.price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    src() {
      return this.$cloudinary.image.url(this.product.image, {
        gravity: 'auto:subject',
        width: '986',
        height: 200,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.product {
  transition: $transition;
  &:hover .product__hover {
    bottom: 0;
  }

  &__top {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;

    &:hover .product__search {
      opacity: 1;
    }
  }
  &__search {
    fill: $white;
    background: $orange;
    width: 60px;
    height: 60px;
    padding: 10px 15px;
    transition: $transition;
    opacity: 0;
  }
  &__hover {
    backface-visibility: hidden;

    position: absolute;
    bottom: -70px;
    left: 0;
    background: $orange;
    color: $white;
    width: 100%;

    transition: $transition;
    &:hover {
      background: $green;
    }
  }
  &__title {
    transition: $transition;
    &:hover,
    &:focus {
      color: $orange;
    }
  }
  &__price {
    color: $orange;
    font-size: 1.5rem;
  }
  &__img {
    // width: 12rem;
    // height: 20rem;
  }
  &__category {
    background: $dark-grey-blue;
  }
  &:hover {
    background: $white;
  }
}
</style>
