<template>
  <div :key="product.slug" class="feature-product py-10">
    <div class="feature-product__bg-container shadow-xl rounded-xl">
      <div
        class="feature-product__bg"
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${src})`,
        }"
      ></div>
    </div>
    <div class="feature-product__content">
      <div class="flex justify-center items-center gap-4">
        <div class="feature-product__meta text-white text-right">
          <span class="text-white font-bold">Featured product</span>

          <h2 class="text-4xl">{{ product.title }}</h2>
          <StarsRatings
            v-if="product.product_reviews.length != 0"
            :rating="$getRatingAvg(product.product_reviews)"
            :read-only="true"
            :star-size="20"
            :increment="0.5"
            :show-rating="false"
          ></StarsRatings>
          <h3 class="text-4xl text-white">${{ product.price }}</h3>

          <nuxt-link
            :to="{
              name: 'store-books-slug',
              params: { slug: product.slug },
            }"
            >Go to product
          </nuxt-link>
        </div>
        <div class="feature-product__img shadow-xl">
          <img :src="src" :alt="`${product.title}`" />
        </div>
        <div class="w-1/4">
          <p class="text-white inline-block">{{ product.short }}</p>
          <button
            class="snipcart-add-item btn-transparent text-white flex items-center justify-center"
            :data-item-id="product.snipcart_guid"
            :data-item-price="product.price"
            :data-item-url="`${$config.strapiBaseUri}products${product.slug}`"
            :data-item-description="product.short"
            :data-item-image="src"
            :data-item-name="product.title"
          >
            <Cart class="mr-2" />

            Add to cart
          </button>
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
  &__bg-container {
    position: absolute;
    width: 100%;
    height: 23rem;
    overflow: hidden;
    z-index: 0;
  }
  &__bg {
    position: absolute;
    height: 102%;
    width: 102%;
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
