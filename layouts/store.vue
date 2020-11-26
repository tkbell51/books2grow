<template>
  <div>
    <Header />
    <PageBanner />
    <div class="container">
      <div class="grid grid-cols-6">
        <StoreLinks class="col-span-1" />
        <Nuxt class="col-span-5" />
      </div>
    </div>
    <div
      id="snipcart"
      hidden
      :data-api-key="`${$config.snipcartPublicAPI}`"
    ></div>
    <EmailCall />
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
