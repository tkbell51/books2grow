<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-4">
        <BookCard v-for="b in purchases" :key="b.slug" :product="b" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'user',

  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped></style>
