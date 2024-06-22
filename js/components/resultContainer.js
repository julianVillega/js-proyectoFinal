import { Components } from "./components.js";
import { Store } from "../modelClases.js";
import { Map } from "./map.js";
import { StoreSearchResult } from "./storeSearchResult.js";

export class ResultContainer{
    constructor(id){
        this.children = [];
        this.id = id;
        this.container = document.createElement("div");
        this.container.classList.add("result-container");
        Components.add(this.id, this);
    }

    addElemnts(...elements){
        elements.forEach(element => {
            this.container.appendChild(element);
            this.children.push(element);
        });
    }
    removeElements(...elements){
        elements.forEach(element => {
            this.container.removeChild(element);
            this.children.filter(e => e != element);
        });
    }

    removeAllElements(){
        this.container.innerHTML='';
    }

    static addAllStores(){
        const resultContainer = Components.get('mapResultContainer');
        const searchResultComponents = [];

        for(let result of Store.stores){
            Map.addStoreMarker(result);
            searchResultComponents.push(new StoreSearchResult(result).container);
        }
        resultContainer.removeAllElements();
        resultContainer.addElemnts(...searchResultComponents);
    }

}