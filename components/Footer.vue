<template>
  <footer class="footer">
    <div class="container">
      <div
        class="footer__top grid grid-cols-1 md:grid-cols-4 gap-4 text-white py-8 px-6 md:px-0"
      >
        <div>
          <h4>Shop</h4>
          <ul>
            <li>
              <nuxt-link to="/store">Store</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/store/books">Ebooks</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/store/art">Wall Art</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Products</h4>
        </div>
        <div class="email-cta">
          <p class="email-cta__title mb-4">Sign up for our Newsletter</p>
          <form method="post" @submit.prevent="emailSubmit">
            <div class="email-input flex justify-between shadow">
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                class="w-full px-2 focus:outline-none rounded-tl-lg rounded-bl-lg bg-white text-black"
              />
              <button
                type="submit"
                class="email-btn text-white rounded-br-lg rounded-tr-lg px-2 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="footer__bottom text-white py-2">
      <div class="container">
        <div class="flex">
          <p>Copyright</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
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
.footer {
  background: $light-black;
  position: relative;
  &__top {
    h4 {
      @apply font-bold uppercase;
    }
    li {
      @apply my-2;
    }
    a,
    .snipcart-checkout {
      color: $footer-text;
      transition: $transition;
      &:hover {
        color: $orange;
      }
    }
  }
  &__logo {
    display: inline-block;
    width: 8rem;
  }
  .email-cta {
    &__title {
      color: $footer-text;
    }
  }
  .email-btn {
    background: $orange;
  }
  .email-input {
    margin: auto;
  }
  &__bottom {
    background: $black;
  }
}
</style>
