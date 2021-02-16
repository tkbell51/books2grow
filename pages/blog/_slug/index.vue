<template>
  <div>
    <article>
      <div
        v-if="article.image != null"
        class="article__img"
        :style="{ backgroundImage: `url(${src})` }"
      ></div>
      <div class="container md:-mt-40">
        <div
          class="bg-white md:rounded-xl article__content w-full md:w-5/6 px-8 md:px-16 lg:px-32 py-24"
        >
          <p class="article__date">{{ $formatDate(article.createdAt) }}</p>
          <h1 class="text-5xl font-bold mb-5">
            {{ article.title }}
          </h1>
          <div class="mb-5" v-html="$md.render(article.content)"></div>
          <span
            v-for="tag in article.tags"
            :key="tag.id"
            class="rounded-xl bg-gray-400 mx-2 py-1 px-2"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </article>
    <section>
      <div class="container">
        <h2 class="text-4xl font-bold">Blog</h2>

        <div class="grid grid-cols-3 gap-4">
          <ArticleCard
            v-for="article in relatedArticles.slice(0, 3)"
            :key="article.id"
            :article="article"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $strapi, params }) {
    const article = await $strapi.$articles.findOne(params.slug)
    return {
      article,
      relatedArticles: await $strapi.$articles.find({
        'tags.name': article.tags.name,
      }),
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
  &__img {
    width: 100vw;
    height: 40rem;
    background-size: cover;
    background-position: center;
  }
  &__date {
    color: $dark-grey-blue;
  }
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
    // padding: 84px 100px 80px 100px;
    margin: auto;
    & p {
      margin-bottom: 1rem;
    }

    h3 {
      @apply text-2xl font-bold mb-1;
    }
  }
}
</style>
