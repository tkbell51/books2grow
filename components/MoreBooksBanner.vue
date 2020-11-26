<template>
  <div
    class="more-books text-center rounded-lg shadow-lg flex flex-col justify-center items-center text-white"
  >
    <h2 class="text-6xl">More Books to Come Soon</h2>
    <button class="">
      <nuxt-link class="btn-transparent" to="/books">View our Books</nuxt-link>
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.more-books {
  height: 20rem;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('../assets/img/b2g-header.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
