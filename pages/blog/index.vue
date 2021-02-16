<template>
  <div class="md:grid grid-cols-2 gap-6">
    <div
      v-for="article in articles"
      :key="article.id"
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
    this.articles = await this.$strapi.$articles.find()
  },

  data() {
    return {
      articles: [],
    }
  },
}
</script>

<style lang="scss" scoped>
.section {
  &__blog-tabs {
    .blog-tabs {
      &__btn {
        @apply px-4 py-1 relative text-lg;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: $orange;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 0.3s ease-in-out 0s;
        }
        &:hover {
          &::before {
            visibility: visible;
            transform: scaleX(1);
          }
        }
        &.selected {
          @apply font-semibold rounded;
          background: $orange;
          color: $white;
        }
      }
    }
  }
}
</style>
