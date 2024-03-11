import {layer_from_path} from "../geojson/main";

const L = require('leaflet/src/Leaflet');
import {randId} from "./misc";


declare interface ChangeCallback {
    (event: Event): void
}

declare interface CheckBoxEvent extends Event{
    target: HTMLInputElement,
}

function prepareRow(
    container: HTMLDivElement,
    label: string,
    active: boolean = false,
    onChange: ChangeCallback | null = null,
    prefix: string = 'chRow'
): HTMLElement {
    let checkbox = document.createElement('input')
    checkbox.id = prefix + randId();
    checkbox.type = 'checkbox';
    checkbox.checked = active;

    if (onChange) {
        checkbox.onchange = onChange;
    }

    container.append(checkbox);

    let labelElm = document.createElement('label');
    labelElm.innerText = label;
    labelElm.htmlFor = checkbox.id;
    container.append(labelElm);

    return container;
}

export  function generateChecklist(addresses: string[], container: HTMLElement, map: any, active: boolean = false): void {
    addresses.forEach((value: string)=> {
       let rowDiv = document.createElement('div');
        (async (value, rowDiv,active) => {
            let layer = await layer_from_path(value);
            let description = layer.options.description()
            prepareRow(rowDiv, description, active, (event: CheckBoxEvent) => {
                if (event.target.checked) {
                    layer.addTo(map);
                } else {
                    layer.remove(map)
                }
            })
            if (active) {
                layer.addTo(map);
            }
        })(value,rowDiv, active);
        container.append(rowDiv)
    })
}
