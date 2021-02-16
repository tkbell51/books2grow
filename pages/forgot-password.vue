<template>
  <div class="auth-content grid grid-cols-3">
    <AuthSidebar class="col-span-1" />
    <section
      class="section__forgot-password col-span-3 md:col-span-2 flex justify-center items-center relative"
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
        <Notification v-if="success" type="success" :message="success" />
        <Notification v-if="error" type="danger" :message="error" />
        <div v-if="!success" class="px-8 pt-6 pb-8 mb-4">
          <h1 class="text-4xl font-bold mb-2">Forgot Password?</h1>
          <p class="mb-4">
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
          <form method="post" @submit.prevent="forgotPassword">
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

            <div class="flex items-center justify-between">
              <button
                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Email me a reset link
              </button>
            </div>
          </form>
        </div>
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
      success: null,
      error: null,
    }
  },
  methods: {
    async forgotPassword() {
      try {
        await this.$axios.post('auth/forgot-password', {
          email: this.email,
        })
        this.error = null
        this.success = `A reset password link has been sent to your email account. \
 Please click on the link to complete the password reset.`
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
