<template>
  <img src="../assets/img/b2g-logo.png" alt="" class="py-2" />
</template>

<style>
.logo {
  animation: 1s appear;
  margin: auto;
  height: 100%;
  width: 100%;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
<script>
export default {
  props: {
    color: { type: String, default: 'white' },
  },
}
</script>
