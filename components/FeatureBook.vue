<template>
  <div :key="product.slug" class="feature-product py-10">
    <div
      class="feature-product__bg-container shadow-md"
      :style="{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${src})`,
      }"
    >
      <div class="feature-product__bg"></div>
    </div>
    <div class="feature-product__content">
      <div class="flex justify-center items-center gap-4">
        <div class="feature-product__meta text-white text-right order-0">
          <p class="text-white font-bold text-2xl">Featured product</p>
          <nuxt-link
            class="text-5xl"
            :to="{
              name: 'product-slug',
              params: { slug: product.slug },
            }"
            >{{ product.title }}
          </nuxt-link>
          <StarsRatings
            v-if="product.product_reviews.length != 0"
            class="justify-end"
            :rating="$getRatingAvg(product.product_reviews)"
            :read-only="true"
            :star-size="20"
            :increment="0.5"
            :show-rating="false"
          ></StarsRatings>
          <h3 class="text-4xl text-white">${{ product.price }}</h3>
          <button
            class="snipcart-add-item btn-transparent text-white flex items-center ml-auto"
            :data-item-id="product.snipcart_guid"
            :data-item-price="product.price"
            :data-item-url="$route.fullPath"
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
        <div class="feature-product__img shadow-xl order-1">
          <img :src="src" :alt="`${product.title}`" />
        </div>
      </div>
    </div>
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
        width: '300',
        height: 200,
      })
    },
  },
}
</script>

<style lang="scss">
.feature-product {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: $transition;

  &__bg-container {
    position: absolute;
    height: 102%;
    width: 102%;
    height: 30rem;
    overflow: hidden;
    z-index: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(6px);
    transform: scale(1.5);
  }

  &__content {
    background: transparent;
    position: relative;
    width: 100%;
    z-index: 2;
  }

  &__img {
    width: 18rem;
  }
}
.btn-transparent:hover svg path {
  fill: $black !important;
}
</style>
