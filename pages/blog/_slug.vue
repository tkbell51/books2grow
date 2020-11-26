<template>
  <article>
    <div class="container">
      <h1 class="text-4xl font-bold mb-5">
        {{ article.title }}
      </h1>
      <img :src="src" alt="article.image.alt" class="mb-8" />
      <div
        class="mb-5 article__content"
        v-html="$md.render(article.content)"
      ></div>
      <span
        v-for="tag in article.tags"
        :key="tag.id"
        class="rounded-xl bg-gray-400 mx-2 py-1 px-2"
      >
        {{ tag.name }}
      </span>
    </div>
  </article>
</template>

<script>
export default {
  async asyncData({ $strapi, params }) {
    return {
      article: await $strapi.$articles.findOne(params.slug),
    }
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

<style lang="scss">
.article {
  &__header {
    width: 100vw;
    height: 40rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &--title {
      height: 100%;
    }
  }
  &__content {
    & > p {
      margin-bottom: 1rem;
    }
  }
}
</style>
