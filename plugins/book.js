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

Vue.prototype.$percentage = (partial, total) => {
  return (100 * partial) / total
}
