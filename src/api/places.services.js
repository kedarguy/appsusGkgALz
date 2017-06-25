
const urlPlaces = 'http://localhost:3003/places';

import axios from 'axios'

let markers = [];
let nextId = 3;


function getMarkers() {
  return new Promise(resolve => {
    // simple caching mechanism
    if (markers.length) {
      resolve(markers);
    }
    else {
      setTimeout(() => {
        markers = generateTestMarkers();
        resolve(markers);
      }, 500);
    }
  });
}

// local markers for tests
function generateTestMarkers() {
  const markers = [ ];
  return markers;
}

function getMarkerById(markerId) {
  return getMarkers().then(markers => {
    const marker = markers.find(marker => markerId === marker.id);
    return marker;
  });
}

function deleteMarker(marker) {
  console.log('Deleting the marker', marker)
  var idx = markers.indexOf(marker)
  markers.splice(idx, 1);
}

function saveMarker(lat, lng) {
 
  const marker = {
    id: nextId++,
    title: "",
    position: { lat: lat, lng: lng },
    tags: ['tags', 'places'],
    name: 'New Location'
  }
  findTitle(marker.position,marker); 
  markers.push(marker);
}

function findTitle(latlng,marker) {
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  geocoder.geocode({ 'location': latlng }, function (results, status) {
    if (status === 'OK') {
      if (results[1]) {
        marker.title = (results[1].formatted_address);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function changeMarkerPos(marker, lat, lng) {
  marker.position.lat = lat;
  marker.position.lng = lng;
  findTitle(marker.position,marker);   
}


// function getMarkerById(markerId) {
//   return markers.find(marker => markerId === marker.id);
// }

function removeMarker(markerInput) {
  const idxToDelete = markers.indexOf(markerInput);
  markers.splice(idxToDelete, 1);
}

function changeTitle(newTitle) {
  console.log(markers);
}

export default {
  getMarkers,
  saveMarker,
  generateTestMarkers,
  changeMarkerPos,
  removeMarker,
  changeTitle
}