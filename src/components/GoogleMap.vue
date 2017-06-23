<template>
  <div class="map-container">
     <gmap-map
        :center="center"
        :zoom="7"
        style="width: 500px; height: 300px"
     >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
      @dragend="getMarkerPosition($event.latLng)"
    ></gmap-marker>
  </gmap-map>
  <input type="text" v-model="this.markers[0].position.lat">
  first: {{markers[0].position}}
  second: {{markers[1].position}}
  </div>
</template>


    
<script>

export default {
  name: 'google-map',
  data () {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    },
    methods: {
        getMarkerPosition(ans) {
          console.log(ans);
          this.position = ans;
        }
    }
}



</script>

<style scoped>
.map-container {
    width: 500px;
    height: 300px;
  }

  .map {
    height:100%;
    width:100%;
  }


</style>
