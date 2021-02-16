<template>
  <section class="page__banner flex justify-center items-center">
    <slot></slot>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.page__banner {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('../assets/img/b2g-header.jpg') no-repeat center;
  background-size: cover;

  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
