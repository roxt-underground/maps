const L = require('leaflet/src/Leaflet');
import {get_as_object} from "../utils/requests";


export async function layer_from_path(path) {
    const geometry = await get_as_object(path)
    return L.geoJSON(geometry, {
        style: (feature) => {
            return {color: feature.properties ? feature.properties.color : null}
        }
    })
}

global.layer_from_path = layer_from_path
global.get_as_object = get_as_object
