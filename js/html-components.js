
export class Components {
    static components = [1,2,3];

    static add(component){
        Components.components.push(component);
    }
    static remove(component){
        Components.components = Components.components.filter(c => c != component);
    }
}

export class Map_search_bar{
    constructor(){
        this.container = document.createElement("div");
        this.container.classList.add("container");
        this.state = {
            search_type: "stores"
        }
        this.container.innerHTML =`
        <style>
            .container{
                background-color:#e5e5e5;
                position: absolute;
                top:10px;
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
    }
}

export class Map{
    static storeMarkers = [];
    constructor() {
        this.map = L.map('map',{zoomControl:false}).setView([-34.92052462063165, -57.94446936030479], 13);
        // Add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addStoreMarker(store){
        const storeMarker = new ComercioMarker(store);
        this.storeMarkers.push(storeMarker);
        storeMarker.marker.addTo(this.map);
        return storeMarker;
    }

    removeStoreMarker(marker){
        this.map.removeLayer(marker);
        this.storeMarkers = this.storeMarkers.filter(m => m !== marker);
    }

    plotStoreMarkers(stores){
        for(let store of stores){
            const storeMarker = this.addStoreMarker(store);
            storeMarker.marker.on('click',() => armarVistaDeComercio(store))
        }
    }

    getStoreMarker(store){
        return this.storeMarkers.filter(cm => cm.store == store)[0];
    }
    
}

class ComercioMarker{
    constructor(store){
        this.marker = L.marker(store.latlng);        
        this.store = store;
    }
}
