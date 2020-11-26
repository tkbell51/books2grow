<template>
  <div class="body">
    <Header />
    <Nuxt class="content" />

    <div
      id="snipcart"
      hidden
      :data-api-key="`${$config.snipcartPublicAPI}`"
    ></div>
    <EmailCall />

    <Footer />
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
html,
.body {
  height: 100%;
}
.body {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.btn-transparent {
  @apply bg-transparent font-semibold border border-white rounded-lg py-2 px-3 mt-3 shadow;
  transition: $transition;

  :hover {
    background: $white;
    color: $black;
  }
}

::selection {
  color: $white;
  background: $orange;
}

h2 {
  @apply mb-3;
}
</style>
