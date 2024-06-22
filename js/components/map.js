export class Map{
    static storeMarkers = [];
    static map;
    constructor() {
        Map.map = L.map('map',{zoomControl:false}).setView([-34.92052462063165, -57.94446936030479], 13);
        // Add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(Map.map);
    }

    static addStoreMarker(store){
        const storeMarker = new ComercioMarker(store);
        this.storeMarkers.push(storeMarker);
        storeMarker.marker.addTo(Map.map);
        return storeMarker;
    }

    static removeStoreMarker(marker){
        Map.map.removeLayer(marker);
        this.storeMarkers = [];
    }

    static removeAllMarkrs(){
        this.storeMarkers.forEach(comercioMarker=>this.removeStoreMarker(comercioMarker.marker));
    }

    static plotStoreMarkers(stores){
        for(let store of stores){
            const storeMarker = this.addStoreMarker(store);
            storeMarker.marker.on('click',() => armarVistaDeComercio(store))
        }
    }

    static getStoreMarker(store){
        return this.storeMarkers.filter(cm => cm.store == store)[0];
    }
    
}

class ComercioMarker{
    constructor(store){
        this.marker = L.marker(store.latlng);        
        this.store = store;
    }

    higlight(){
        this.marker.getElement().classList.add("marker--highlight");
    }

    removeHiglight(){
        this.marker.getElement().classList.remove("marker--highlight");
    }
}