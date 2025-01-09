const L = require('leaflet/src/Leaflet');
global.L = L;
import {do_post} from "./utils/requests";
import "./utils/checklist"
import {generateChecklist} from "./utils/checklist";

let map;
let route;


global.init = () => {
    global.map = map = L.map('map').setView([55.565946, 37.500887], 13);
    route = L.polyline([], {color: 'red'})
    init_layers(map);
    route.addTo(map);
    // hide_copyrights();
    add_popup_on_click(map);
    prepare();
}


function init_layers(_map) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(_map)
}


function add_popup_on_click(_map) {
    function onMapClick(e) {
        let popup = L.popup();
        let addButton = document.createElement('button');
        addButton.textContent = 'add';
        addButton.onclick = function () {
            route.addLatLng(e.latlng);
        }
        popup.setLatLng(e.latlng)
            .setContent(addButton)
            .openOn(_map);
    }

    _map.on('click', onMapClick);
}

global.save_route = (event) => {
    let rout_body = route.toGeoJSON();
    do_post('/api/polyline', rout_body);
}

global.prepare = async function () {
    let layersListContainer = document.getElementById('layers')
    generateChecklist([
        "/geojson/polyline.170924527156.json",
        "/geojson/polyline.170929245206.json",
        "/geojson/polyline.170931940893.json",
        "/geojson/polyline.171007873424.json",
        '/geojson/polyline.171007938270.json',
        '/geojson/polyline.171008068129.json',
        '/geojson/polyline.171010660268.json',
        '/geojson/polyline.171010833151.json',
        '/geojson/polyline.172563491991.json',
    ], layersListContainer, map, true);
}

global.init = init;
global.route = route;
