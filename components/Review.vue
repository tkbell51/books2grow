<template>
  <div>
    <div v-if="product.product_reviews.length">
      <div class="grid grid-cols-2 gap-8">
        <div>
          <div class="rating__meta flex justify-center items-center mb-4">
            <p class="text-6xl mr-4">
              {{ $getRatingAvg(product.product_reviews) }}
            </p>
            <div>
              <span class="mb-0">
                {{ $ratingGraph(product).totalCount }} reviews
              </span>
              <StarsRatings
                v-if="product.product_reviews.length !== 0"
                :rating="$getRatingAvg(product.product_reviews)"
                :read-only="true"
                :show-rating="false"
                :star-size="20"
                :increment="0.1"
              ></StarsRatings>
            </div>
          </div>
          <div class="flex justify-center items-center">
            <button class="review-btn px-3 py-2 border rounded-lg">
              Write your review
            </button>
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
                      :style="`width:${$ratingGraph(product).fivePercent}%`"
                    >
                      <span class="ml-2">{{
                        $ratingGraph(product).fiveStar
                      }}</span>
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
                      :style="`width:${$ratingGraph(product).fourPercent}%`"
                    >
                      <span class="ml-2">{{
                        $ratingGraph(product).fourStar
                      }}</span>
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
                      :style="`width:${$ratingGraph(product).threePercent}%`"
                    >
                      <span class="ml-2">{{
                        $ratingGraph(product).threeStar
                      }}</span>
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
                      :style="`width:${$ratingGraph(product).twoPercent}%`"
                    >
                      <span class="ml-2">{{
                        $ratingGraph(product).twoStar
                      }}</span>
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
                      :style="`width:${$ratingGraph(product).onePercent}%`"
                    >
                      <span class="ml-2">{{
                        $ratingGraph(product).oneStar
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="flex flex-col col-span-3 divide-y divide-grey divide-solid">
          <div
            v-for="review in productReviews"
            :key="review.id"
            class="review-card mb-4 rounded-xl p-4 bg-white shadow"
          >
            <div class="flex items-center mb-3">
              <p v-if="review.user.name" class="font-bold mr-3 mt-2">
                {{ review.user.name }}
              </p>
              <p v-else class="font-bold mr-3 mt-2">
                {{ review.user.username }}
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
    </div>
    <div v-else>
      <p>There are no reviews for this product</p>
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
    productReviews: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
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
  .vue-star-rating-star {
    display: block;
  }
  &__bar {
    width: 100%;
    background-color: #dfdfdf;
    color: white;
    .bar-5,
    .bar-4,
    .bar-3,
    .bar-2,
    .bar-1 {
      background-color: $orange;
    }
  }
}
</style>
