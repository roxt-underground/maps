const L = require('leaflet/src/Leaflet');
import {get_as_object} from "../utils/requests";



export async function layer_from_path(path) {
    const geometry = await get_as_object(path)
    const defaultColor = (geometry.properties && geometry.properties.color)? geometry.properties.color : "#3333FF";
    return L.geoJSON(geometry, {
        style: (feature) => {
            return {color: (feature.properties && feature.properties.color)? feature.properties.color : defaultColor}
        },
        description: (feature) => {
            return geometry.properties ? geometry.properties.description : path
        }
    })
}

global.layer_from_path = layer_from_path
global.get_as_object = get_as_object
