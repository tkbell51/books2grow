<template>
  <section class="section__auth-sidebar hidden md:block">
    <header class="">
      <nuxt-link to="/"><Logo class="login__logo" /></nuxt-link>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
        consequuntur obcaecati, beatae iste dolore quam nam explicabo ab
        suscipit. Possimus sunt quidem animi maxime fuga vero ab odio excepturi
        placeat!
      </p>
    </header>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss">
.section__auth-sidebar {
  background: linear-gradient(45deg, #ffa62e, #ea4d2c);
  header {
    width: 90%;
    margin: auto;
  }

  .login__logo {
    width: 8rem;
    margin: 0;
    margin-bottom: 2rem;
  }
}
</style>
