import { Map } from "./map.js";
import { StoreComponent } from "./store.js";
import { Favorites } from "../modelClases.js";

export class StoreSearchResult{
    constructor(store){
        this.store = store;
        this.container = document.createElement('div');
        this.container.classList.add('store-search-result');
        this.buttonFavorites = document.createElement('button');
        this.buttonFavorites.id = "btn-favorites";
        this.buttonFavorites.innerText = !Favorites.isStoreFavorite(this.store)? "Add To Favorites" : "Remove From Favorites";
        this.container.innerHTML = 
        `
        <h3>${store.name}<\h3>
        <h3>${store.address}<\h3>
        `
        this.container.appendChild(this.buttonFavorites);
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
        //open store view on click
        this.container.addEventListener('click', () =>{
            StoreComponent.closeAll();
            document.querySelector('body').appendChild(new StoreComponent(this.store).container);
        })
        //add/remove from favorites
        this.buttonFavorites.addEventListener('click', (event) => {
            event.stopPropagation();
            if(!Favorites.isStoreFavorite(this.store)){
                Favorites.addStore(this.store);
                this.buttonFavorites.innerText = "Remove From Favorites";
            }else{
                Favorites.removeStore(this.store);
                this.buttonFavorites.innerText = "Add To Favorites";
            }
        })
    }
}