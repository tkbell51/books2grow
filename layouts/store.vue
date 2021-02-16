<template>
  <div class="body">
    <Header />
    <div class="content store-content">
      <StoreHeader />
      <div class="container">
        <div class="flex gap-8">
          <StoreLinks class="w-1/5" />
          <Nuxt class="w-4/5" />
        </div>
      </div>
      <!-- <Snipcart /> -->
    </div>

    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.store-content {
  margin-bottom: 3rem;
}
</style>
