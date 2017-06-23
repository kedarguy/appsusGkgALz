<template>
  <div class="places">
    <section class="menu-cont">menu</section>
    <section class="map-cont">
    <google-map> </google-map>

    </section>
  </div>
</template>

<script>

import GoogleMap from '@/components/GoogleMap'

export default {
  name: 'places-map',
  components: {
    GoogleMap
  }
}


</script>

<style scoped>

.places {
  display: flex;
  flex-direction: row;
}

.menu-cont {
  width: 35%;
  min-height: 500px;
  background-color: lightgrey;
}
.map-cont {
  width: 65%;
  min-height: 500px;
  background-color: lightblue;
}
</style>
