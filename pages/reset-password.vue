<template>
  <section class="section__reset-password">
    <div class="container">
      <div class="flex justify-center flex-col items-center">
        <Notification v-if="success" type="success" :message="success" />
        <Notification v-if="error" type="danger" :message="error" />
        <div
          v-if="!success"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <form method="post" @submit.prevent="resetPassword">
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                New Password
              </label>
              <input
                id="password"
                v-model="password1"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="******************"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Confirm New Password
              </label>
              <input
                id="password"
                v-model="password2"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="******************"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </form>
        </div>
        <div v-if="success">
          <button>
            <nuxt-link to="/login">Go to login</nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  layout: 'login',
  middleware: 'guest',
  components: {
    Notification,
  },
  asyncData(context) {
    if (!context.route.query.code) context.redirect('/forgot-password')
    else
      return {
        code: context.route.query.code,
      }
  },
  data() {
    return {
      password1: '',
      password2: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async resetPassword() {
      this.error = null
      if (this.password1 !== this.password2) {
        this.error = 'Passwords do not match.'
        return
      }
      try {
        await this.$axios.post('auth/reset-password', {
          code: this.code,
          password: this.password1,
          passwordConfirmation: this.password2,
        })
        this.success =
          'Password updated successfully. You can now use it to log in to your account.'
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
