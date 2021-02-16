<template>
  <section class="section__home-blogs bg-white">
    <div class="text-center">
      <h2 class="text-4xl font-bold mb-8">Blog</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="article in topArticles.slice(0, 3)"
          :key="article.id"
          class="home-blog-article-grid-item"
        >
          <ArticleCard :article="article" />
        </div>
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

<style lang="scss" scoped>
.section__home-blogs {
  // background: $tan;
  margin-bottom: 0;
  h2 {
    color: $orange;
  }
  .home-blog-article-grid-item {
  }
}
</style>
