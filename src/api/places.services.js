
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
  const markers = [
    { id: 1, title: 'test1', position: { lat: 10, lng: 10 }, tags: ['tags'] },
    { id: 2, title: 'test2', position: { lat: 11, lng: 11 }, tags: ['tags'] },
  ];
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
    title: 'Untitled marker',
    position: { lat: lat, lng: lng },
    tags: ['tags']
  }
  markers.push(marker);
}

function changeMarkerPos(marker, lat, lng) {
  marker.position.lat = lat;
  marker.position.lng = lng;
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