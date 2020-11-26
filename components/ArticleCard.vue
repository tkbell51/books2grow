<template>
  <nuxt-link
    :key="article.id"
    :to="{ name: 'blog-slug', params: { slug: article.slug } }"
    class="bg-white py-4 px-6 rounded-md shadow-md hover:shadow-lg article-card text-white flex flex-col justify-between"
    :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5) ), url(${src})`,
    }"
  >
    <div v-for="tag in article.tags" :key="tag.id">
      <span v-if="tag.name != 'Feature'">{{ tag.name }}</span>
    </div>
    <h3 class="font-bold text-xl">{{ article.title }}</h3>
  </nuxt-link>
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
  height: 15rem;
  transition: $transition;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
