<template>
  <div class="map-container">
     <gmap-map
        :center="center"
        :zoom="7"
        style="width: 1000px; height: 400px"
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
  first: {{markers[0].position}}
  second: {{markers[1].position}}
  <map-list></map-list>
  </div>
</template>


    
<script>
import MapList from '@/components/MapList'
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDttjEj13b4EcZYvLZZpoX0RZ-nqSzFTg4',
    libraries: 'places'
  }
});

export default {
  name: 'google-map',
  components: {
    MapList
  },
  data () {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {
            lat: 10.0, 
            lng: 10.0
          },
          infoText: 'marker 1'
         }, {
          position: {
            lat: 11.0, 
            lng: 11.0
          },
          infoText: 'marker 2'
        }]
      }
    },
    methods: {
        addMarker() {
          console.log('adding marker');
        },
        getMarkerPosition(ans) {
          console.log(ans.lat());
          console.log(ans.lng());
          this.markers[0].position.lat = ans.lat();
          this.markers[0].position.lng = ans.lng();
        }
    }
}



</script>

<style scoped>
.map-container {
    /*width: 500px;*/
    /*height: 300px;*/
  }

  .map {
    height:100%;
    width:100%;
  }


</style>
