<template>
  <div class="body">
    <Header />
    <div class="content">
      <PageBanner class="mb-4">
        <h1 class="text-white text-4xl font-semibold">Blog</h1>
      </PageBanner>
      <div class="container">
        <div class="grid grid-cols-5 gap-8">
          <aside class="col-span-5 md:col-span-2 px-6">
            <!-- <div>
              <input
                :value="search"
                type="search"
                placeholder="Search Articles"
                aria-label="Search Articles"
                class="w-full px-2 focus:outline-none rounded-xl shadow bg-white text-black px-4 py-3"
              />
            </div> -->
            <div class="my-4 bg-white py-4 px-4 shadow top-articles">
              <h3 class="text-2xl font-semibold">Top Articles</h3>
              <ul class="top-articles__list">
                <li
                  v-for="article in topArticles"
                  :key="article.id"
                  class="top-articles__item my-4"
                >
                  <nuxt-link
                    class="top-articles__link"
                    :to="{ name: 'blog-slug', params: { slug: article.slug } }"
                  >
                    <p class="text-lg font-semibold">{{ article.title }}</p>
                    <p class="text-sm text-gray-600">
                      {{ $formatDate(article.createdAt) }}
                    </p>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="py-4">
              <h3 class="text-2xl font-semibold mb-4">Tags</h3>

              <ul class="flex flex-wrap gap-4 tag__list">
                <li class="tag__item">
                  <nuxt-link class="tag__link rounded-xl py-2 px-5" to="/blog"
                    >All</nuxt-link
                  >
                </li>
                <li
                  v-for="tag in nonEmptyTags"
                  :key="tag.slug"
                  class="tag__item"
                >
                  <nuxt-link
                    class="tag__link rounded-xl py-2 px-5"
                    :to="{
                      name: 'blog-tags-slug',
                      params: { slug: tag.slug },
                    }"
                    >{{ tag.name }}</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </aside>
          <section class="col-span-5 md:col-span-3 px-2">
            <Nuxt />
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  async fetch() {
    this.articles = await this.$strapi.$articles.find()
    this.topArticles = this.articles.filter((a) =>
      a.tags.some((t) => t.name === 'Feature')
    )
    this.tags = await this.$strapi.$tags.find()
  },

  data() {
    return {
      filteredArticles: [],
      selectedTag: '',
      articles: [],
      topArticles: [],
      tags: [],
      search: '',
    }
  },
  computed: {
    nonEmptyTags() {
      return this.tags.filter((t) => t.articles.length > 0)
    },
  },
}
</script>

<style lang="scss" scoped>
aside {
  padding-top: 2rem;
}
.tag {
  &__link {
    @apply shadow;
    color: $white;
    background: $dark-grey-blue;
    &.nuxt-link-exact-active {
      background: $orange;
    }
    &:hover {
      @apply shadow-lg;
      background: $orange;
    }
  }
}
</style>
