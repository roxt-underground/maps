const L = require("../../../Leaflet/src/Leaflet");
import {get_as_object} from "../utils/requests";


export async function layer_from_path(path) {
    const geometry = await get_as_object(path)
    return L.geoJSON(geometry, {
        style: (feature) => {
            if (geometry.properties) {
                return {color: geometry.properties.color ? geometry.properties.color : feature.properties.color}
            } else return {color: feature.properties.color}
        }
    })
}
