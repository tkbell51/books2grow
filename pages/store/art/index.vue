<template>
  <div>
    <div
      class="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center items-start"
    >
      <BookCard v-for="art in wallArt" :key="art.slug" :product="art" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'store',
  async asyncData({ $strapi }) {
    return {
      wallArt: await $strapi.$products.find({ type: 'Art' }),
    }
  },
}
</script>

<style lang="scss" scoped></style>
