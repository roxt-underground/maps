const L = require('leaflet/src/Leaflet');
global.L = L;

let map;
let route;


global.init = () => {
    map = L.map('map').setView([55.565946, 37.500887], 13);
    route = L.polyline([], {color: 'red'})
    init_layers(map);
    route.addTo(map);
    // hide_copyrights();
    add_popup_on_click(map);
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
        addButton.tagName = 'button'
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


function post_message(text, klass='') {
    let messagebox = document.getElementById('messages')
    messagebox.textContent = text;
    messagebox.className = klass;
}


function do_post(path, _obj) {
     (async () => {
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(_obj),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }).catch((error) => {
            post_message(JSON.stringify(error), 'error')
        })
        if (response) {
            if (response.status > 299) {
                post_message(JSON.stringify(await response.json()), 'error')
            }
            else {
                post_message('ok', 'ok')
            }
        }
    })();
}

global.init =  init;
global.map = map;
global.route = route;
