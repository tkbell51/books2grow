<template>
  <div>
    <PageBanner />
    <div class="container">
      <h2 class="text-6xl">My Orders</h2>
      <div v-for="book in loggedInUser.orders" :key="book.slug"></div>
      {{ loggedInUser.orders.title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped></style>
