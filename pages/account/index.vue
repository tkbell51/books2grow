<template>
  <div>
    <div class="container">
      <div>
        <p>
          <strong>Username: </strong>
          {{ loggedInUser.username }}
        </p>
        <p>
          <strong>Email: </strong>
          {{ loggedInUser.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'user',
  middleware: 'auth',

  data() {
    return {
      purchases: [],
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

<style lang="scss" scoped></style>
