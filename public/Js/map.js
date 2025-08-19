
const map = new maplibregl.Map({
container: "map", // container id
style: 'https://demotiles.maplibre.org/style.json', // style URL
center: [77.1025, 28.7041], // starting position [longitude, latitude] in maplibre but generally real map coordinates its [latitude,longitude]
zoom: 9 // starting zoom
}); 
