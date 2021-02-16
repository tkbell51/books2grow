import Vue from 'vue'

Vue.prototype.$getRatingAvg = (reviews) => {
  const ratings = reviews.map((r) => r.rating)
  let total = 0
  for (let i = 0; i < ratings.length; i++) {
    total += ratings[i]
  }
  const avg = total / ratings.length
  const rounded = Math.round(avg * 10) / 10
  return rounded
}

Vue.prototype.$ratingGraph = (product) => {
  const five = product.product_reviews.filter((r) => r.rating === 5)
  const four = product.product_reviews.filter((r) => r.rating === 4)
  const three = product.product_reviews.filter((r) => r.rating === 3)
  const two = product.product_reviews.filter((r) => r.rating === 2)
  const one = product.product_reviews.filter((r) => r.rating === 1)

  return {
    totalCount: product.product_reviews.length,
    fiveStar: five.length,
    fourStar: four.length,
    threeStar: three.length,
    twoStar: two.length,
    oneStar: one.length,
    fivePercent: (100 * five.length) / product.product_reviews.length,
    fourPercent: (100 * four.length) / product.product_reviews.length,
    threePercent: (100 * three.length) / product.product_reviews.length,
    twoPercent: (100 * two.length) / product.product_reviews.length,
    onePercent: (100 * one.length) / product.product_reviews.length,
  }
}
