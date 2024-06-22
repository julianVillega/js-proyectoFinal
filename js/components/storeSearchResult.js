import { Map } from "./map.js";

export class StoreSearchResult{
    constructor(store){
        this.store = store;
        this.container = document.createElement('div');
        this.container.classList.add('store-search-result');
        this.container.innerHTML = 
        `
        <h3>${store.name}<\h3>
        <h3>${store.address}<\h3>
        <button class="btn-add-favorite">Add To Favorites</button>
        `
        this.setUpBehaviour();
    }
    setUpBehaviour(){
        //higlight store marker on hover.
        this.container.addEventListener('mouseover',() => {
            Map.getStoreMarker(this.store).higlight();
        });
        this.container.addEventListener('mouseleave',() => {
            Map.getStoreMarker(this.store).removeHiglight();
        });
    }
}