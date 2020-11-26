<template>
  <section class="section__email-cta">
    <div class="container">
      <div
        class="email-cta flex jusitify-between items-center px-8 py-3 rounded-lg"
      >
        <div class="w-1/2 pr-20">
          <h3 class="text-4xl email-cta__title font-bold">
            Sign up for Newsletter
          </h3>
          <p class="my-2">
            Subscribe to our newsletter to stay up to date on the latest news,
            special offers and other stuff.
          </p>
        </div>
        <form method="post" class="w-1/2" @submit.prevent="emailSubmit">
          <div
            class="email-input px-2 py-2 rounded-lg bg-white flex justify-between shadow"
          >
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              placeholder="Email"
              class="w-full px-2 focus:outline-none"
            />
            <button
              type="submit"
              class="email-btn text-white rounded-lg px-2 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      error: null,
    }
  },
  methods: {
    async emailSubmit(e) {
      e.preventDefault()
      try {
        await this.$strapi.$emails.create({ name: this.email })
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section__email-cta {
  background: $tan;
}
.email-cta {
  &__title {
    color: $orange;
  }
}
.email-btn {
  background: $orange;
}
.email-input {
  margin: auto;
}
</style>
