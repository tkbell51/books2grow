<template>
  <div class="body">
    <Header />
    <Nuxt class="content" />

    <!-- <Snipcart /> -->

    <Footer />
    <div
      id="snipcart"
      data-config-modal-style="side"
      data-api-key="MzdiNGJhODItYWI2NC00Mzg1LTg1Y2EtZTllNGNkMmM1MzZhNjM3MzUzMDA1Mzk0NDU5MDgz"
      hidden
    ></div>
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
body {
  background: $white;
}
html,
.body {
  height: 100vh;
}
.body {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1 0 auto;
  }
  .footer {
    flex-shrink: 0;
  }
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
a {
  transition: $transition;
  &:hover {
    color: $orange;
  }
}
.btn-transparent {
  transition: $transition;
  @apply bg-transparent font-semibold border border-white rounded-lg py-2 px-3 mt-3 shadow;

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

.grid-item {
  width: 14rem;
}
</style>
