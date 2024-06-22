import {Store} from "../modelClases.js";
import {Map} from "./map.js";
// import { ResultContainer } from "./resultContainer.js";
import { Components } from "./components.js";
import { StoreSearchResult } from "./storeSearchResult.js";

export class Map_search_bar{
    constructor(id){
        this.id = id;
        this.container = document.createElement("div");
        this.container.classList.add("map-search-bar-container");
        this.state = {
            search_type: "stores"
        }
        this.container.innerHTML =`
        <style>
            .map-search-bar-container{
                background-color:#e5e5e5;
                position: absolute;
                top:70px;
                left:10px;
                z-index: 9999;
                padding: 0.5rem 1rem 0.5rem 1rem;
                border-radius: 1rem;
            }
            .map-search-bar{
                display:flex;
                gap:1rem;
            }
            .map-search-bar__form{
                display:flex;
                align-items:center;
                gap:1rem;
            }
            #map-search-text-input{
                background-color:transparent;
                border:none;
                outline:none;
                border-radius:1rem;
                padding:0.3rem;
            }
            button{
                padding:0.3rem;
                border-radius: 1rem;
                border:none;
            }
            .btn-selected{
                background-color:green;
            }
        </style>
        <div class="map-search-bar">
            <form class="map-search-bar__form" onsubmit="event.preventDefault();">
            <input type="text" id="map-search-text-input" placeholder="Search">
            <button class="btn-selected" id="btn-search-stores">Stores</button>
            <button id="btn-search-products">Products</button>
            </form>
            <button id="map-search-close-button">X</button>
        </div>`;
        this.setUpBehaviour();      
    }
    setUpBehaviour(){
        this.container.querySelector("#btn-search-stores").onclick = () => {
            this.state.search_type = "store";
            this.container.querySelector("#btn-search-stores").classList.add('btn-selected');
            this.container.querySelector("#btn-search-products").classList.remove('btn-selected');
        };

        this.container.querySelector("#btn-search-products").onclick = () => {
            this.state.search_type = "product";
            this.container.querySelector("#btn-search-products").classList.add('btn-selected');
            this.container.querySelector("#btn-search-stores").classList.remove('btn-selected');        
        };
        
        this.container.querySelector("#map-search-text-input").oninput = 
        (e) => {
            const searchResults = Store.findByName(e.target.value);
            const resultContainer = Components.get('mapResultContainer');
            Map.removeAllMarkrs();
            const mockresults = [];
            for(let result of searchResults){
                Map.addStoreMarker(result);
                mockresults.push(new StoreSearchResult(result).container);
                }
            resultContainer.removeAllElements();
            resultContainer.addElemnts(...mockresults);
        }
    }
}