<template>
  <section>
    <div class="container">
      <h2 class="text-4xl font-bold">Blog</h2>

      <div class="grid grid-cols-3 gap-4">
        <ArticleCard
          v-for="article in topArticles.slice(0, 3)"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topArticles: [],
      error: null,
    }
  },
  async mounted() {
    try {
      this.topArticles = await this.$strapi.$articles.find({
        'tags.name': ['Feature'],
      })
    } catch (error) {
      this.error = error
    }
  },
}
</script>

<style lang="scss" scoped></style>
