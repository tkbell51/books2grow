<template>
  <div class="md:grid grid-cols-2 gap-6">
    <div
      v-for="article in tag.articles"
      :key="article.slug"
      class="article-grid-item"
    >
      <ArticleCard :article="article" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blogPage',
  async fetch() {
    this.tag = await this.$strapi.$tags.findOne(this.$route.params.slug)
  },
  data() {
    return {
      tag: {},
    }
  },
}
</script>

<style lang="scss" scoped></style>
