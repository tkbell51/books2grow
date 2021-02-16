<template>
  <div class="relative hero-slide">
    <div
      class="rounded-xl"
      :style="{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundURL})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }"
    >
      <span
        :class="`hero-slide__text p-4 flex flex-col justify-center items-center md:items-${align} h-full w-3/4 m-auto`"
      >
        <em class="text-lg font-bold text-center text-white -mb-4"
          >Find books to help grow</em
        >
        <span class="text-white hero-slide__title">{{ title }}</span>
        <nuxt-link to="/store" class="hero-btn text-white z-10 hover:text-white"
          >Show Now</nuxt-link
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    backgroundURL() {
      return require(`~/assets/img/hero-${this.image}.jpg`)
    },
  },
}
</script>

<style lang="scss" scoped>
.hero-slide {
  width: 40rem;

  .bg-white {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__title {
    white-space: nowrap;
    font-size: calc(60px + (100 - 50) * (100vw - 400px) / (1200 - 400));
  }
}
</style>
