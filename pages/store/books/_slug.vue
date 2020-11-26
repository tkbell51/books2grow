<template>
  <div class="relative">
    <section class="product__header absolute">
      <div
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.9) 90% ), url(${image})`,
        }"
      ></div>
    </section>

    <section class="section__product-contents mt-16">
      <div class="container">
        <div class="product__content grid grid-cols-3">
          <div class="product__image col-span-1">
            <img
              :src="image"
              :alt="`${product.title}`"
              class="shadow-lg mb-4"
            />
          </div>
          <div class="product__meta col-span-2">
            <p
              class="inline-block text-white bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-full"
            >
              {{ product.category.name }}
            </p>
            <h1 class="text-6xl text-white italic">{{ product.title }}</h1>
            <StarsRatings
              v-if="product.product_reviews.length !== 0"
              :rating="$getRatingAvg(product.product_reviews)"
              :read-only="true"
              :star-size="20"
              :increment="0.1"
            ></StarsRatings>
            <div class="product__short w-3/4 mb-4">
              <p class="mt-4">{{ product.short }}</p>
            </div>
            <div class="flex">
              <div class="product__price text-4xl mr-4">
                ${{ product.price }}
              </div>

              <button
                class="snipcart-add-item inline-block mb-4 bg-white border font-semibold py-2 px-4 rounded-full shadow flex items-center justify-center"
                :data-item-id="product.snipcart_guid"
                :data-item-price="product.price"
                :data-item-url="`${$config.strapiBaseUri}products${product.slug}`"
                :data-item-description="product.short"
                :data-item-image="image"
                :data-item-name="product.title"
              >
                <Cart class="mr-2" color="black" />

                Add to cart
              </button>

              <button
                v-if="onWishlist"
                class="bg-white border inline-block font-semibold py-2 px-4 rounded-full shadow flex items-center justify-center"
              >
                <svg-icon class="mr-2 wishlist-icon" name="full-heart" />
                Remove from wishlist
              </button>
              <button
                v-else
                class="bg-white border inline-block font-semibold py-2 px-4 rounded-full shadow flex items-center justify-center"
                @click="addToWishlist"
              >
                <svg-icon class="mr-2 wishlist-icon" name="open-heart" />
                Add to wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section_description">
      <div class="container">
        <div class="product_description-container">
          <h3>Description</h3>
          <div
            v-if="!readMore[product.id]"
            class="product__description"
            :inner-html.prop="$md.render(product.description) | truncate(300)"
          ></div>
          <div
            v-if="readMore[product.id]"
            class="product__description"
            :inner-html.prop="$md.render(product.description)"
          ></div>
          <button
            v-if="!readMore[product.id]"
            class="btn btn-primary"
            @click="showMore(product.id)"
          >
            Show more
          </button>
          <button
            v-if="readMore[product.id]"
            class="btn btn-primary"
            @click="showLess(product.id)"
          >
            Show less
          </button>
        </div>
      </div>
    </section>

    <section class="section__related-products">
      <div class="container">
        <h2 class="text-3xl font-semibold">Related products</h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20"
        >
          <BookCard v-for="b in relatedproducts" :key="b.slug" :product="b" />
        </div>
      </div>
    </section>
    <div class="section section__reviews">
      <div class="container">
        <h3 class="text-4xl font-semibold mb-4">Customer Reviews</h3>
        <div
          v-if="product.product_reviews.length"
          class="grid grid-cols-4 gap-4"
        >
          <div class="col-span-1">
            <div>
              <div class="flex flex-col justify-center items-center mb-4">
                <p class="text-5xl">
                  {{ $getRatingAvg(product.product_reviews) }}
                </p>
                <StarsRatings
                  v-if="product.product_reviews.length !== 0"
                  :rating="$getRatingAvg(product.product_reviews)"
                  :read-only="true"
                  :show-rating="false"
                  :star-size="20"
                  :increment="0.1"
                  class="mb-2"
                ></StarsRatings>
                <p>based on {{ ratingGraph.totalCount }} reviews</p>
              </div>
            </div>
            <div>
              <ul class="rating-table">
                <li>
                  <div class="rating-table__row gap-4">
                    <div class="rating-table__number">5 star</div>
                    <div class="bar-container">
                      <div class="rating-table__bar">
                        <div
                          class="bar-5"
                          :style="`width:${ratingGraph.fivePercent}%`"
                        >
                          <span class="ml-2">{{ ratingGraph.fiveStar }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="rating-table__row gap-4">
                    <div class="rating-table__number">4 star</div>
                    <div class="bar-container">
                      <div class="rating-table__bar">
                        <div
                          class="bar-4"
                          :style="`width:${ratingGraph.fourPercent}%`"
                        >
                          <span class="ml-2">{{ ratingGraph.fourStar }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="rating-table__row gap-4">
                    <div class="rating-table__number">3 star</div>
                    <div class="bar-container">
                      <div class="rating-table__bar">
                        <div
                          class="bar-3"
                          :style="`width:${ratingGraph.threePercent}%`"
                        >
                          <span class="ml-2">{{ ratingGraph.threeStar }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="rating-table__row gap-4">
                    <div class="rating-table__number">2 star</div>
                    <div class="bar-container">
                      <div class="rating-table__bar">
                        <div
                          class="bar-2"
                          :style="`width:${ratingGraph.twoPercent}%`"
                        >
                          <span class="ml-2">{{ ratingGraph.twoStar }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="rating-table__row gap-4">
                    <div class="rating-table__number">1 star</div>
                    <div class="bar-container">
                      <div class="rating-table__bar">
                        <div
                          class="bar-1"
                          :style="`width:${ratingGraph.onePercent}%`"
                        >
                          <span class="ml-2">{{ ratingGraph.oneStar }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="flex justify-center items-center">
              <button class="review-btn px-3 py-2 border rounded-lg">
                Write your review
              </button>
            </div>
            <form method="post" class="w-1/2" @submit.prevent="reviewSubmit">
              <StarsRatings v-model="rating" :star-size="20"></StarsRatings>
              <textarea
                v-model="comment"
                type="textarea"
                placeholder="Review"
              ></textarea>
              <button type="submit" class="email-btn rounded-lg px-2 py-2">
                Submit
              </button>
            </form>
          </div>
          <div class="flex flex-col col-span-3">
            <div
              v-for="review in productReviews"
              :key="review.id"
              class="review-card bg-white border py-2 px-4 rounded-lg shadow ml-4 mb-4"
            >
              <div class="flex items-center mb-3">
                <p class="font-bold mr-3 mt-2">
                  {{ review.user.name }}
                </p>

                <StarsRatings
                  :rating="review.rating"
                  :read-only="true"
                  :show-rating="false"
                  :star-size="20"
                ></StarsRatings>
              </div>
              <p>{{ review.review }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>There are no reviews for this product</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MyComponent',
  filters: {
    truncate(string, value) {
      return string.substring(0, value) + '...'
    },
  },
  async asyncData({ $strapi, params }) {
    const product = await $strapi.$products.findOne(params.slug)
    const category = await $strapi.$categories.findOne(product.category.slug)
    const productReviews = await $strapi.$reviews.find({
      'product.id': product.id,
    })
    return {
      product,
      category,
      productReviews,
    }
  },
  data() {
    return {
      onWishlist: false,
      comment: '',
      rating: 0,
      reviewSettings: {
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
      },
      image: '',
      readMore: {},
      monthPublished: '',
    }
  },

  computed: {
    ...mapGetters(['loggedInUser']),
    relatedproducts() {
      return this.category.products.filter(
        (product) => product.title !== this.product.title
      )
    },

    ratingGraph() {
      const five = this.product.product_reviews.filter((r) => r.rating === 5)
      const four = this.product.product_reviews.filter((r) => r.rating === 4)
      const three = this.product.product_reviews.filter((r) => r.rating === 3)
      const two = this.product.product_reviews.filter((r) => r.rating === 2)
      const one = this.product.product_reviews.filter((r) => r.rating === 1)

      return {
        totalCount: this.product.product_reviews.length,
        fiveStar: five.length,
        fourStar: four.length,
        threeStar: three.length,
        twoStar: two.length,
        oneStar: one.length,
        fivePercent: this.$percentage(
          five.length,
          this.product.product_reviews.length
        ),
        fourPercent: this.$percentage(
          four.length,
          this.product.product_reviews.length
        ),
        threePercent: this.$percentage(
          three.length,
          this.product.product_reviews.length
        ),
        twoPercent: this.$percentage(
          two.length,
          this.product.product_reviews.length
        ),
        onePercent: this.$percentage(
          one.length,
          this.product.product_reviews.length
        ),
      }
    },
  },
  async mounted() {
    if (this.loggedInUser) {
      this.onWishlist = await this.loggedInUser.product_wishlist.includes(
        this.product.id
      )
      if (this.onWishlist) {
        console.log('product is on wishlist')
      } else {
        console.log('product is NOT on wishlist')
      }
    }
    this.image = this.$cloudinary.image.url(this.product.image, {
      gravity: 'auto:subject',
      width: '300',
      height: 200,
    })
  },
  methods: {
    async reviewSubmit(e) {
      e.preventDefault()
      try {
        await this.$strapi.$reviews.create({
          review: this.comment,
          rating: this.rating,
          user: this.loggedInUser,
          product: this.product,
        })
      } catch (error) {
        this.error = error
      }
    },
    showMore(id) {
      this.$set(this.readMore, id, true)
    },
    showLess(id) {
      this.$set(this.readMore, id, false)
    },
    addToWishlist() {
      if (this.loggedInUser && !this.onWishlist) {
        this.loggedInUser.product_wishlist.push(this.product)
      }
    },
  },
}
</script>

<style lang="scss">
.product {
  &__header {
    height: 40rem;
    width: 100%;
    padding: 0;

    div {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: blur(15px);
      height: 102%;
      width: 102%;
      transform: scale(1.1);
    }
  }
  &__image {
    margin-right: 3rem;
  }
  &__meta {
    margin-top: 1rem;
  }
  &__description {
    & p {
      margin-bottom: 1rem;
    }
  }
  &__related {
    width: 18rem;
  }
  &__price {
    color: $orange;
  }
}
.wishlist-icon {
  height: 1.8rem;
  width: 1.8rem;
}
.section {
  &__product-contents {
    // margin-top: -30rem;
    position: relative;
    z-index: 4;
    .container {
      text-align: left;
    }
  }
  &__reviews {
    // height: 30rem;
    & > .container > div {
      position: relative;
    }
  }
}

.rating-table {
  li {
    margin-bottom: 5px;
  }
  &__row {
    display: grid;
    grid-template-columns: 45px 1fr;
    .bar-container {
      grid-column: 2/3;
    }
  }
  &__number {
    grid-column: 1/2;
  }

  &__bar {
    width: 100%;
    background-color: #dfdfdf;
    color: white;
    .bar-5 {
      background-color: $orange;
    }
    .bar-4 {
      background-color: $orange;
    }
    .bar-3 {
      background-color: $orange;
    }
    .bar-2 {
      background-color: $orange;
    }
    .bar-1 {
      background-color: $orange;
    }
  }
}
</style>
