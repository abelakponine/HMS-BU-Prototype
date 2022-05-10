var map;
var infowindow;
var service;

class MapMaker {

  constructor(mapElement, enableMarkers = true){
    this.enableMarkers = enableMarkers;
    return new Promise((res, rej)=>{
      try {
        navigator.geolocation.getCurrentPosition((success)=>{
            window.latlng = [success.coords.latitude, success.coords.longitude];
            res(window.onload = this.initMap(mapElement));
        }, console.error);
      }
      catch (err){
        console.log(err)
      }
    });
  }

  initMap(mapElement) {
    
      const myLocation = new google.maps.LatLng(window.latlng[0], window.latlng[1]);

      infowindow = new google.maps.InfoWindow();
      
      map = new google.maps.Map(mapElement, {
        center: myLocation,
        zoom: 10,
      });

      const request = {
        location: myLocation,
        // query: "Hospitals near me",
        // fields: ["name", "geometry"],
        radius: (10 * 1609.344), // 10 miles
        types: ['hospital', 'health', 'fire_station', 'police']
      };

      service = new google.maps.places.PlacesService(map);

      // my blue point
      (new google.maps.Marker({
          map,
          position: {lat:window.latlng[0], lng:window.latlng[1]},
          icon: {url:'/images/gif/blue-marker.png', scaledSize: new google.maps.Size(35,56)},
          title: 'My Location'
      })).addListener('click', ()=>{
          this.myData = {name:'My Location', geometry: {location:"(Blue Point on Map)"}}
          showDialog(this.myData);
      })

      service.nearbySearch(request, (results, status) => {
          
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          if (this.enableMarkers){
            for (let i = 0; i < results.length; i++) {
              this.createMarker(results[i]);
            }
          }
          map.setCenter(results[0].geometry.location);
          return true;
        }
      });
  }

  createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
    
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      label: {text:'H', color:'white', fontSize:'18px', fontWeight:'bold'}
    });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });

    marker.addListener("click", (e) => {
      // console.log(place, marker.getPosition().lat(), marker.getPosition().lng());
      showDialog(place);
      if ($('#find-nearest-hospitals').is(':visible')){
          $('#fnh-layer').fadeIn();
      }
    });
  }
}

(async ()=>{
  await new MapMaker(document.getElementById('map'));
  await new MapMaker(document.getElementById('map1'), false);
  await new MapMaker(document.getElementById('map2'));
})();