//https://leafletjs.com/examples/quick-start/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

(async function(){
    const myMap = L.map("map").setView([51.505,-0.09], 2)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);


//Source: https://medium.com/@courtneyjordan/designing-for-all-users-why-you-should-care-about-color-blindness-beabd61943eb
const getColor = mag => {
  if(mag === 4.5){
    return '#faf7cc';
  } else if(mag === 4.6){
    return '#fdcb99';  
  } else if(mag === 4.7){
    return '#f69669';  
  } else if(mag === 4.8){
    console.log("this is 4.8");
    return '#f0663c';  
  } else if(mag === 4.9){
    return '#d43138';  
  } else if(mag === 5.0){
    return '#962038';  
  } else if (mag > 5.0){
    return "#562046";
  }
  
  return 'grey';
}

// /https://leafletjs.com/reference.html#tooltip
const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson")
    const data = await response.json()
    data.features.forEach(function(feature){
    const mag = feature.properties.mag;
    const place = feature.properties.place;
    let tooltip = '<div';
    tooltip = `${tooltip}<div>mag: ${mag}</div>`;
    tooltip = `${tooltip}<div>place: ${place}</div></div>`;
    const circle = L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
    color: getColor(mag),
    radius: mag * 50000,
    weight: 1
    })
// .bindTooltip(tooltip, {
//   sticky: true
// })
circle.addEventListener('click', function(){
  circle.bindTooltip(tooltip, {
    sticky:true
  })
})
circle.addTo(myMap)
})

Source: https://leafletjs.com/examples/choropleth/
var legend = L.control({ position: 'bottomright'});

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create('div', 'legend')
    mags = [4.5,4.6,4.7,4.8,4.9,5.0,5.1];
    
  for(let i = 0; i < mags.length; i++){
      var detail = mags[i] > 5.0 ? "> 5.0" : mags[i];
      console.log('color: ', getColor(mags[i]));
         div.innerHTML +=
         '<i style="background:' + getColor(mags[i]) + '">'
         + detail + '</i><br>';
  }
  return div;
};
legend.addTo(myMap);

})()


