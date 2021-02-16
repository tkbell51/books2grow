<template>
  <div class="container">
    <section class="home-hero">
      <!-- <div class="container"> -->
      <VueSlickCarousel v-bind="settings" class="hero__carousel">
        <HeroSlide title="Family" image="family" />
        <HeroSlide title="Relationships" align="start" image="relationship" />
        <HeroSlide title="Healthy Habits" image="healthy" />
        <HeroSlide title="Financially" align="start" image="finance" />
        <HeroSlide title="Spiritually" image="spiritual" />
        <HeroSlide title="Mentally" align="start" image="mental" />
      </VueSlickCarousel>
      <!-- </div> -->
    </section>
    <section class="section__product-types">
      <div class="product-type__grid grid grid-cols-2 gap-8">
        <nuxt-link
          class="rounded-xl shadow hover:shadow-lg bg-white h-20 flex justify-center items-center"
          to="/store/books"
          >Ebooks</nuxt-link
        >
        <nuxt-link
          class="rounded-xl shadow hover:shadow-lg bg-white h-20 flex justify-center items-center"
          to="/store/art"
          >Wall Art</nuxt-link
        >
      </div>
    </section>

    <Sales />

    <section class="section__book-tabs">
      <div class="book-tabs flex flex-wrap gap-2 justify-center mb-4">
        <button
          :class="{ selected: selectedCategory === 'All Books' }"
          class="book-tabs__btn"
          @click="categoryFilter('')"
        >
          All
        </button>
        <button
          v-for="category in nonEmptyCategories"
          :key="category.slug"
          :class="{ selected: selectedCategory === category.name }"
          class="book-tabs__btn"
          @click="categoryFilter(category.name)"
        >
          {{ category.name }}
        </button>
      </div>
      <transition-group
        name="company"
        tag="ul"
        class="col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mx-4 md:mx-auto"
      >
        <li
          v-for="book in filteredBooks.slice(0, 10)"
          :key="book.slug"
          class="grid-item m-auto"
        >
          <BookCard :product="book" />
        </li>
      </transition-group>
    </section>
    <section class="section__categories">
      <h2 class="text-4xl font-bold text-center mb-4">Shop By Categories</h2>

      <div class="categories-row flex flex-wrap justify-center gap-8">
        <div
          v-for="category in nonEmptyCategories"
          :key="category.slug"
          class="category-row__item"
        >
          <Category :category="category" />
        </div>
      </div>
    </section>

    <HomeBlog />
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      categories: [],
      filteredBooks: [],
      selectedCategory: '',
      settings: {
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
        infinite: true,
        fade: true,
      },
      bookSettings: {
        arrows: true,
        infinite: true,
        slidesToShow: 5,
      },
      featureSettings: {
        arrows: true,
        autoplay: true,
        autoplaySpeed: 8000,
        infinite: true,
        fade: true,
        slidesToShow: 1,
      },
    }
  },
  computed: {
    nonEmptyCategories() {
      return this.categories.filter(
        (d) =>
          d.products.length > 0 && d.products.some((f) => f.type === 'Book')
      )
    },
    featureBooks() {
      return this.books.filter((b) => b.feature === true)
    },
  },
  async mounted() {
    this.books = await this.$strapi.$products.find({ type: 'Book' })
    this.categories = await this.$strapi.$categories.find()
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
  },
}
</script>

<style lang="scss">
.container {
  @apply mx-auto;
}
section {
  margin-top: 2rem;
  margin-bottom: 2rem;

  padding-top: 2rem;
  padding-bottom: 2rem;
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
  width: 100%;
  margin-top: 0;
  padding-top: 0;
  .container {
    height: inherit;
  }
  .hero__carousel {
    height: 50vh;
    .hero-btn {
      background: $orange;
      @apply py-2 px-4 rounded-xl font-bold;
    }
    .slick__svg::before {
      fill: $white !important;
    }

    .slick-next {
      right: 1%;
    }
    .slick-prev {
      left: 1%;
      z-index: 1;
    }
    .slick-dots {
      bottom: 3%;
      text-align: center;
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
.section {
  &__categories {
    h2 {
      color: $orange;
    }
    .categories-row {
    }
  }
  &__home-books {
    height: 30rem;
    .slick-next,
    .slick-prev {
      &::before {
        font-family: '';
      }
    }
    .slick-next {
      right: 22%;
      top: 95%;
      &::before {
        content: '';
        background-image: url('../assets/sprite/svg/arrow-right.svg');
      }
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
  &__book-tabs {
    .book-tabs {
      &__btn {
        @apply px-4 py-1 relative text-lg;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: $orange;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 0.3s ease-in-out 0s;
        }
        &:hover {
          &::before {
            visibility: visible;
            transform: scaleX(1);
          }
        }
        &.selected {
          @apply font-semibold rounded;
          background: $orange;
          color: $white;
        }
      }
    }
  }
  .company {
    &-move {
      transition: all 600ms ease-in-out 50ms;
    }
    &-enter-active {
      transition: all 300ms ease-out;
    }

    &-leave-active {
      transition: all 200ms ease-in;
      position: absolute;
      z-index: 0;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
    &-enter {
      transform: scale(0.9);
    }
  }
}
</style>
