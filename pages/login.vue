<template>
  <div class="auth-content grid grid-cols-3">
    <AuthSidebar class="col-span-1" />
    <section
      class="section__login col-span-3 md:col-span-2 flex justify-center items-center relative"
    >
      <div class="auth-sign-log absolute">
        <span>Not a Member?</span>
        <nuxt-link class="inline-block my-2" to="/register"
          >Sign up Now</nuxt-link
        >
      </div>
      <div class="auth-form">
        <nuxt-link class="md:hidden" to="/"
          ><Logo class="login__logo" color="black"
        /></nuxt-link>
        <Notification v-if="error" type="danger" :message="error" />
        <form method="post" @submit.prevent="login">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              id="email"
              v-model="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              id="password"
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="w-full md:w-64 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <nuxt-link
          class="block my-2 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="/forgot-password"
        >
          Forgot Password?
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  layout: 'login',
  middleware: 'guest',
  components: {
    Notification,
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
<style lang="scss">
.auth-content {
  height: 100vh;
}
.auth-form {
  width: 50%;
  margin: auto;
}
.auth-sign-log {
  top: 1%;
  right: 5%;
}
</style>
