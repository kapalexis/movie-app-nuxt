<template>
  <button
    class="absolute bg-red-600 hover:bg-red-700 text-white p-3 top-0 right-0 mt-3 mr-5 rounded"
  >
    {{ btnValue }}
  </button>
</template>

<script>
export default {
  props: {
    btnValue: {
      type: String,
      default: 'undefined',
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
