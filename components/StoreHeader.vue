<template>
  <section class="store-hero">
    <p v-if="$fetchState.pending">Fetching Featured Books...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <VueSlickCarousel v-else v-bind="settings" class="feature-book__carousel">
      <BookSlide
        v-for="book in featureBooks"
        :key="book.slug"
        :product="book"
      />
    </VueSlickCarousel>
  </section>
</template>

<script>
export default {
  async fetch() {
    try {
      this.featureBooks = await this.$strapi.$products.find({ feature: 'true' })
    } catch (error) {
      this.error = error
    }
  },
  data() {
    return {
      featureBooks: [],
      settings: {
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
        infinite: true,
        centerMode: true,
        centerPadding: '300px',
      },
      error: null,
    }
  },
}
</script>

<style lang="scss">
.store-hero {
  height: 30rem;
  width: 100%;
  margin-bottom: 4rem;
  margin-top: 0;
  padding-top: 0;
  .container {
    height: inherit;
  }
  .feature-book__carousel {
    height: inherit;
    .hero-btn {
      background: $orange;
      @apply py-2 px-4 rounded-xl font-bold;
    }

    .slick-next {
      // right: 17%;
    }
    .slick-prev {
      // left: 17%;
      z-index: 1;
    }
    .slick-dots {
      bottom: 3%;
      // text-align: right;
      // right: 26%;
      li button:before {
        color: $white;
        font-size: 20px;
      }
    }
    .slick-list {
      height: inherit;
      .slick-track {
        height: inherit;
        .slick-slide {
          height: inherit;
          div {
            height: inherit;
          }
        }
      }
    }
  }
}
</style>
