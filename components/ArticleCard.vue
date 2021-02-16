<template>
  <div class="article-card mb-4 mx-4 md:mx-auto md:mb-auto">
    <nuxt-link
      :key="article.id"
      :to="{ name: 'blog-slug', params: { slug: article.slug } }"
      class="flex flex-row md:flex-col"
    >
      <div
        v-if="this.article.image != null"
        class="article-card__img hidden md:block"
      >
        <img :src="src" :alt="article.title" />
      </div>
      <div class="article-card__text py-3 text-left">
        <div v-for="tag in article.tags" :key="tag.id">
          <span v-if="tag.name != 'Feature'" class="article-card__tag">{{
            tag.name
          }}</span>
        </div>
        <h3 class="font-bold text-lg my-3 article-card__title">
          {{ article.title }}
        </h3>
        <p class="article-card__date">{{ $formatDate(article.createdAt) }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    src() {
      return this.$cloudinary.image.url(this.article.image, {
        gravity: 'auto:subject',
        width: '300',
        height: 200,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.article-card {
  transition: $transition;
  &__img {
    img {
    }
  }
  &__tag,
  &__date {
    color: $dark-grey-blue;
  }
  h3 {
    transition: $transition;
  }
  .bg-white {
    transition: $transition;
  }

  &:hover {
    .bg-white {
      @apply shadow-lg;
    }
    h3 {
      color: $orange;
    }
  }
}
</style>
