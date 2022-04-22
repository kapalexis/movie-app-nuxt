<template>
  <div
    class="w-screen h-screen z-50 top-0 left-0
  fixed flex justify-center items-center"
    @click="$emit('close-modal')"
  >
    <div
      class="relative flex flex-col justify-center items-center rounded-lg
    "
      @click.stop
    >
      <youtube

        :video-id="$props.videoId"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    movie: Object,
    videoId: String,
  },
  data() {
    return {
    };
  },
  methods: {
    async waitVideoId() {
      await this.$props.videoId;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
