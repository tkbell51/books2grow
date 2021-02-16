<template>
  <div class="auth-content grid grid-cols-3">
    <AuthSidebar class="col-span-1" />
    <section
      class="section__register col-span-3 md:col-span-2 flex justify-center items-center relative"
    >
      <div class="auth-sign-log absolute">
        <span>Already a Member?</span>
        <nuxt-link class="inline-block my-2" to="/login">Sign in</nuxt-link>
      </div>
      <div class="auth-form">
        <nuxt-link class="md:hidden" to="/"
          ><Logo class="login__logo" color="black"
        /></nuxt-link>
        <Notification v-if="success" type="success" :message="success" />
        <Notification v-if="error" type="danger" :message="error" />
        <div v-if="!success" class="px-8 pt-6 pb-8 mb-4">
          <h1 class="text-4xl font-bold mb-2">Sign up to Books2Grow</h1>
          <form method="post" @submit.prevent="register">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Username</label
              >
              <input
                v-model="username"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full md:w-64 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'login',
  middleware: 'guest',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async register() {
      this.error = null
      try {
        this.$axios.setToken(false)
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.success = `A confirmation link has been sent to your email account. \
 Please click on the link to complete the registration process.`
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
<style lang="scss"></style>
