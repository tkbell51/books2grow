<template>
  <div>
    <section class="home-hero shadow-md">
      <div class="h-full">
        <VueSlickCarousel v-bind="settings" class="feature-book__carousel">
          <div class="base-bg">
            <h3 class="text-4xl text-white">%15 off purchases over $100!</h3>
            <nuxt-link to="/books" class="text-white">Show Now</nuxt-link>
          </div>

          <div class="base-bg">3</div>
          <BookSlide
            v-for="book in featureBooks"
            :key="book.slug"
            :product="book"
          />
        </VueSlickCarousel>
      </div>
    </section>
    <section class="section__categories">
      <div class="container">
        <h2 class="text-2xl font-bold">Categories</h2>

        <div class="categories-row flex">
          <Category
            v-for="category in nonEmptyCategories"
            :key="category.slug"
            :category="category"
            class="mb-2"
          />
        </div>
      </div>
    </section>
    <section>
      <div class="container flex justify-bewteen gap-8">
        <nuxt-link
          to="/store"
          class="bg-white py-4 px-6 rounded-md shadow-md hover:shadow-lg flex flex-col justify-between items-center w-1/3"
        >
          Shop Sale
        </nuxt-link>
        <nuxt-link
          to="/books"
          class="bg-white py-4 px-6 rounded-md shadow-md hover:shadow-lg flex flex-col justify-between items-center w-1/3"
        >
          Latest Products
        </nuxt-link>
        <nuxt-link
          to="/blog"
          class="bg-white py-4 px-6 rounded-md shadow-md hover:shadow-lg flex flex-col justify-between items-center w-1/3"
        >
          Read the Blog
        </nuxt-link>
      </div>
    </section>
    <section class="section__home-books">
      <div class="container">
        <Tabs class="relative">
          <Tab title="Featured">
            <VueSlickCarousel v-bind="bookSettings">
              <div v-for="book in featureBooks" :key="book.slug" class="px-2">
                <BookCard :product="book" />
              </div>
            </VueSlickCarousel>
          </Tab>
          <Tab title="New Products">
            <VueSlickCarousel v-bind="bookSettings">
              <div v-for="book in newProducts" :key="book.slug" class="px-2">
                <BookCard :product="book" />
              </div>
            </VueSlickCarousel>
          </Tab>
          <Tab title="Best Sellers">
            <VueSlickCarousel v-bind="bookSettings">
              <div v-for="book in books" :key="book.slug" class="px-2">
                <BookCard :product="book" />
              </div>
            </VueSlickCarousel>
          </Tab>
        </Tabs>
      </div>
    </section>

    <section class="section__feature">
      <div class="container">
        <FeatureBook
          v-for="book in featureBooks.slice(0, 1)"
          :key="book.slug"
          :product="book"
        />
      </div>
    </section>
    <section>
      <div class="container">
        <MoreBooksBanner />
      </div>
    </section>
    <HomeBlog />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel,
  },
  async asyncData({ $strapi }) {
    return {
      books: await $strapi.$products.find({ type: 'Book' }),
      categories: await $strapi.$categories.find(),
      featureBooks: await $strapi.$products.find({ feature: 'true' }),
    }
  },
  data() {
    return {
      settings: {
        arrows: true,
        dots: true,
        centerMode: true,
        centerPadding: '20%',
        autoplay: true,
        autoplaySpeed: 8000,
        infinite: true,
      },
      bookSettings: {
        arrows: true,
        infinite: true,
        slidesToShow: 5,
      },
    }
  },
  computed: {
    nonEmptyCategories() {
      return this.categories.filter((c) => c.products.length > 0)
    },
    newProducts() {
      return this.books.filter(
        (b) => new Date().getMonth() - new Date(b.createdAt).getMonth() < 3
      )
    },
  },
}
</script>

<style lang="scss">
.container {
  @apply mx-auto;
}
section {
  @apply py-8;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.home-hero {
  height: 30rem;
  width: 100%;
  padding: 0;
  .container {
    height: inherit;
  }
  .feature-book__carousel {
    height: inherit;
    .base-bg {
      width: 40rem;
      background: url('../assets/img/b2g-header.jpg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    .slick-next {
      right: 22%;
      top: 95%;
    }
    .slick-prev {
      left: 75%;
      top: 95%;
      z-index: 1;
    }
    .slick-dots {
      bottom: 3%;
      text-align: right;
      right: 26%;
      li button:before {
        color: $white;
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
.section__home-books {
  height: 30rem;
  .slick-next {
    right: 22%;
    top: 95%;
  }
  .slick-prev {
    left: 75%;
    top: 95%;
    z-index: 1;
  }
  .slick-dots {
    bottom: 3%;
    text-align: right;
    right: 26%;
    li button:before {
      color: $white;
    }
  }
}
</style>
