<template>
  <div :key="article.slug">
    <h1>{{ article.title }}</h1>

    <p>{{ article.tag.name }}</p>
    <p>{{ article.content }}</p>
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
}
</script>

<style lang="scss" scoped></style>
