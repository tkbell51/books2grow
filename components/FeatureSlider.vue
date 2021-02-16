<template>
  <section class="section__feature">
    <VueSlickCarousel v-bind="featureSettings">
      <div v-for="book in featureBooks" :key="book.slug">
        <FeatureBook :product="book" />
      </div>
      <template #prevArrow="arrowOption">
        <svg-icon name="arrow-left" />
      </template>
      <template #nextArrow="arrowOption">
        <svg-icon name="arrow-right" />
      </template>
    </VueSlickCarousel>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
