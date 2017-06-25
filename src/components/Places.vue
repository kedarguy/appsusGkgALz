<template>
  <div class="map-container">
    <div class="search-bar">
      <gmap-autocomplete placeholder="Address Search" :value="description" @place_changed="setPlace"></gmap-autocomplete>
    </div>
    <gmap-map @rightclick="addMarker($event.latLng)" :center="center" :zoom="7" style="width: 100%; height: 400px">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>
      <gmap-marker v-if="markers.length > 0" :key="idx" v-for="(marker, idx) in markers" :position="marker.position" :clickable="true" :draggable="true" @click="toggleInfoWindow(marker,idx)" @dragend="changeMarkerPosition($event.latLng,marker,idx)"></gmap-marker>
    </gmap-map>
    <place-list :markers="markers" @removeMarker="removeMarker"></place-list>
  </div>
</template>


    
<script>
import PlaceList from '@/components/placeList'

import * as VueGoogleMaps from 'vue2-google-maps';
import PlacesServices from '../api/places.services';
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
    PlaceList
  },
  created() {
    PlacesServices.getMarkers().then(markers => this.markers = markers)
    console.log(this.markers);
  },
  data() {
    return {
      center: { lat: 10.0, lng: 10.0 },
      markers: [],
      description: '',
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWinOpen: false,
    }
  },
  methods: {
    addMarker(latLng) {
      let currLat = latLng.lat();
      let currLng = latLng.lng();
      PlacesServices.saveMarker(currLat, currLng);
    },
    // newTitle () {
    //   this.infoWinOpen = false; 
    // },
    changeMarkerPosition(latLng, marker, idx) {
      let currLat = latLng.lat();
      let currLng = latLng.lng();
      PlacesServices.changeMarkerPos(marker, currLat, currLng);
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.title;
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    removeMarker(marker) {
      PlacesServices.removeMarker(marker);
    },
    setPlace(place) {
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.description = null;
      PlacesServices.saveMarker(this.center.lat, this.center.lng)
    }
  }
}



</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  /*height: 300px;*/
}

.search-bar {
  padding: 40px 40px;
  text-align: center;
  input {
    width: 40vw;

  }
}
</style>
