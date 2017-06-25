<template>
  <div class="place-list">
    <section class="marked-places-list"> Marked Places:
      <li v-if="markers.length > 0" :key="idx" v-for="(marker, idx) in markers">
        <input type="text" v-model="marker.title" @keyup="changeTitle(marker.title)">
        <button @click="removeMarker(marker)"> Remove marker </button>
      </li>
    </section>
  </div>
</template>

<script>

export default {
  name: 'place-list',
  props: ['markers'],
  data() {
    return {
    }
  },
  methods: {
    removeMarker(marker) {
      this.$emit('removeMarker', marker);
    },
    changeTitle(newTitle) {

    }
  }
}

</script>

<style scoped>

</style>