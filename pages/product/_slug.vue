<template>
  <div class="relative">
    <section class="product__header absolute">
      <div
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(242,243,245, 1) 98%), url(${prodImage})`,
        }"
      ></div>
    </section>
    <section class="section__product-contents mt-16">
      <div class="container">
        <div
          class="product__content grid sm:grid-cols-1 md:grid-cols-2 md:gap-8 m-auto items-start"
        >
          <div class="product__image col-span-1 mb-4 w-5/6 mx-auto shadow-lg">
            <cld-image
              :public-id="product.image"
              crop="fill"
              gravity="auto:subject"
              fetch-format="auto"
              quality="auto"
              :alt="product.title"
            />
          </div>
          <div class="product__meta col-span-1 px-4">
            <h1 class="italic">{{ product.title }}</h1>
            <div class="flex items-center gap-4">
              <StarsRatings
                v-if="product.product_reviews.length !== 0"
                class="md:text-white"
                :rating="$getRatingAvg(product.product_reviews)"
                :read-only="true"
                :star-size="20"
                :increment="0.1"
              ></StarsRatings>

              <span class="mt-1">
                {{ $ratingGraph(product).totalCount }} reviews
              </span>
            </div>
            <div class="product__short">
              <p class="mt-4 italic text-lg">
                {{ product.short }}
              </p>
            </div>
            <div class="flex my-8">
              <p class="product__price text-4xl mr-4 font-semibold">
                ${{ product.price }}
              </p>

              <button
                class="snipcart-add-item inline-block bg-white border font-semibold px-4 rounded-xl shadow w-full"
                :data-item-id="product.snipcart_guid"
                :data-item-price="product.price"
                :data-item-url="$route.fullPath"
                :data-item-description="product.short"
                :data-item-image="prodImage"
                :data-item-name="product.title"
                :data-item-categories="product.category.name"
                :daya-item-metadata="{ type: product.type }"
              >
                <!-- <Cart class="mr-2" color="black" /> -->

                Add to cart
              </button>
            </div>
            <Accordion>
              <template v-slot:title>Description</template>
              <template v-slot:content
                ><div
                  class="product__description"
                  :inner-html.prop="$md.render(product.description)"
                ></div
              ></template>
            </Accordion>
            <Accordion>
              <template v-slot:title>Reviews</template>
              <template v-slot:content>
                <Review
                  :product="product"
                  :product-reviews="product.product_reviews"
                />
                <div>
                  <form method="post" @submit.prevent="reviewSubmit">
                    <h3 class="font-bold text-3xl mb-4">Write a Review</h3>
                    <div class="flex items-center mb-4">
                      <p class="font-bold mr-4">Select a rating(required)</p>
                      <StarsRatings
                        v-model="rating"
                        :star-size="20"
                      ></StarsRatings>
                    </div>
                    <div>
                      <p for="descriptionTextarea" class="font-bold mr-4">
                        Details please! Your review helps other shoppers.
                      </p>
                      <textarea
                        id="descriptionTextarea"
                        v-model="comment"
                        rows="7"
                        class="border p-4 w-full mt-2"
                        placeholder="What did you like or dislike? What should other shoppers know before buying?"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      class="email-btn rounded-lg px-2 py-2"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </template>
            </Accordion>
            <!-- <section class="section__description">
              <Tabs>
                <Tab title="Description">
                  <div
                    class="product__description"
                    :inner-html.prop="$md.render(product.description)"
                  ></div>
                </Tab>
                <Tab title="Reviews">
                  <Review
                    :product="product"
                    :product-reviews="productReviews"
                  />
                  <div>
                    <form method="post" @submit.prevent="reviewSubmit">
                      <h3 class="font-bold text-3xl mb-4">Write a Review</h3>
                      <div class="flex items-center mb-4">
                        <p class="font-bold mr-4">Select a rating(required)</p>
                        <StarsRatings
                          v-model="rating"
                          :star-size="20"
                        ></StarsRatings>
                      </div>
                      <div>
                        <p for="descriptionTextarea" class="font-bold mr-4">
                          Details please! Your review helps other shoppers.
                        </p>
                        <textarea
                          id="descriptionTextarea"
                          v-model="comment"
                          rows="7"
                          class="border p-4 w-full mt-2"
                          placeholder="What did you like or dislike? What should other shoppers know before buying?"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="email-btn rounded-lg px-2 py-2"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </Tab>
              </Tabs>
            </section> -->
          </div>
        </div>
      </div>
    </section>

    <section class="section__related-products">
      <div class="container">
        <h2 class="text-3xl font-semibold">Related products</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-20"
        >
          <BookCard
            v-for="b in relatedProducts.filter((p) => p.title != product.title)"
            :key="b.slug"
            :product="b"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',

  async asyncData({ $strapi, params }) {
    const product = await $strapi.$products.findOne(params.slug)

    return {
      product,
      relatedProducts: await $strapi.$products.find({
        'category.name': product.category.name,
      }),
    }
  },
  data() {
    return {
      onWishlist: {},
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
      error: null,
      storeUrl: process.env.storeUrl,
    }
  },
  computed: {
    prodImage() {
      return this.$cloudinary.image.url(this.product.image, {
        gravity: 'auto:subject',
        width: '986',
        height: 200,
      })
    },
  },

  methods: {
    showMore(id) {
      this.$set(this.readMore, id, true)
    },
    showLess(id) {
      this.$set(this.readMore, id, false)
    },
    async addToWishlist(e) {
      e.preventDefault()
      try {
        await this.$strapi.$wishlists.create({
          user: this.loggedInUser,
          product: this.product,
        })
        this.$nuxt.refresh()
      } catch (error) {
        this.error = error
      }
    },
    removeFromWishlist(e) {
      console.log('Remove from wishlist')
      e.preventDefault()

      try {
        this.onWishlist.filter(async (w) => {
          await this.$strapi.$wishlists.delete(w.id)
          this.$nuxt.refresh()
        })
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>

<style lang="scss" scope>
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
      transform: scale(1.5);
    }
  }
  &__image {
    // margin-right: 3rem;
  }
  &__meta {
    margin-top: 1rem;
    .vue-star-rating-rating-text {
      padding-top: 6px;
    }
    h1 {
      font-size: calc(40px + (40 - 24) * (100vw - 400px) / (1200 - 400));
    }
  }
  &__description {
    & p {
      margin-bottom: 1rem;
    }
    & ul {
      @apply list-inside list-disc;
    }
  }

  &__price {
    // color: $white;
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
  &__description {
    .tab {
      @apply w-full;
    }
  }
}
</style>
