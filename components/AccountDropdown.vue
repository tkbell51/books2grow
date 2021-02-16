<template>
  <div class="header__user mx-2">
    <div v-if="isAuthenticated" class="navbar-start relative">
      <button v-on-clickaway="away" class="block" @click="isOpen = !isOpen">
        <svg-icon class="header__user" name="black-user" />
      </button>

      <div
        v-if="isOpen"
        class="dropdown absolute right-0 bg-white rounded-lg py-2 shadow-xl mt-2"
      >
        <ul class="dropdown__list">
          <li class="border-b-2 border-gray-600">
            <p class="block px-4 py-2 text-gray-800">
              Hi,
              <strong v-if="loggedInUser.name">
                {{ loggedInUser.name }}
              </strong>
              <strong v-else>{{ loggedInUser.username }}</strong>
            </p>
          </li>
          <li class="dropdown__item">
            <nuxt-link
              class="dropdown__link block px-4 py-2 text-gray-800"
              to="/account"
              >My Account</nuxt-link
            >
          </li>
          <li class="dropdown__item">
            <nuxt-link
              class="dropdown__link block px-4 py-2 text-gray-800"
              to="/account/wishlist"
              >Wishlist</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              class="dropdown__link block px-4 py-2 text-gray-800"
              to="/account/orders"
              >My Orders</nuxt-link
            >
          </li>
          <li class="dropdown__item">
            <a
              class="dropdown__link block px-4 py-2 text-gray-800"
              @click="logout"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!isAuthenticated" class="relative">
      <button
        v-on-clickaway="away"
        class="navbar-link"
        @click="isOpen = !isOpen"
      >
        <svg-icon class="header__user" name="clear-user" />
      </button>
      <div
        v-if="isOpen"
        class="dropdown absolute right-0 bg-white rounded-lg py-2 shadow-xl mt-2"
      >
        <ul class="dropdown__list">
          <li class="dropdown__item">
            <nuxt-link
              class="dropdown__link block px-4 py-2 text-gray-800"
              to="/login"
            >
              Sign in / Create Account
            </nuxt-link>
          </li>
          <li class="dropdown__item">
            <nuxt-link
              class="dropdown__link block px-4 py-2 text-gray-800"
              to="/benefits"
            >
              Why Create and Account?
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters } from 'vuex'

export default {
  mixins: [clickaway],
  fetch() {
    this.isOpen = false
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    away() {
      this.isOpen = false
    },
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.header__user {
  fill: $black;
  height: 1.8rem;
  width: 1.8rem;

  .dropdown {
    width: 15rem;
    color: $black;
    z-index: 5;
    &__link {
      &:hover {
        background: $orange;
        color: $white;
      }
    }
  }
}
</style>
