<template>
  <div>
    <form method="post" @submit.prevent="reviewSubmit">
      <h3 class="font-bold text-3xl mb-4">Write a Review</h3>

      <div class="flex items-center mb-4">
        <p class="font-bold mr-4">Select a rating(required)</p>
        <StarsRatings v-model="rating" :star-size="20"></StarsRatings>
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
      <button type="submit" class="email-btn rounded-lg px-2 py-2">
        Submit
      </button>
    </form>
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
  data() {
    return {
      rating: 0,
    }
  },
  methods: {
    async reviewSubmit(e) {
      e.preventDefault()
      try {
        await this.$strapi.$reviews.create({
          review: this.comment,
          rating: this.rating,
          name: this.name,
          email: this.email,
          product: this.product,
        })
        location.reload()
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
