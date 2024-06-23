import {Store, Product, Price, Favorites} from "../modelClases.js";
import {Map} from "./map.js";
// import { ResultContainer } from "./resultContainer.js";
import { Components } from "./components.js";
import { StoreSearchResult } from "./storeSearchResult.js";
import { StoreComponent } from "./store.js";
import { ProductSearchResult } from "./productSearchResult.js";

export class Map_search_bar{
    constructor(id){
        this.id = id;
        this.container = document.createElement("div");
        this.container.classList.add("map-search-bar-container");
        this.state = {
            search_type: "store",
            displayFavorites: false
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
            <button id="map-search-favorites">Favorites</button>
        </div>`;
        this.setUpBehaviour();      
    }
    setUpBehaviour(){
        //set search type to stores
        this.container.querySelector("#btn-search-stores").onclick = () => {
            this.state.search_type = "store";
            this.container.querySelector("#btn-search-stores").classList.add('btn-selected');
            this.container.querySelector("#btn-search-products").classList.remove('btn-selected');
            //if favorites is enabled, display the favorites, else search
            if(this.state.displayFavorites){ 
                this.displayFavorites();
            }else{
                this.search(document.querySelector('#map-search-text-input').value);
            }
        };

        //set serach type to products
        this.container.querySelector("#btn-search-products").onclick = () => {
            this.state.search_type = "product";
            this.container.querySelector("#btn-search-products").classList.add('btn-selected');
            this.container.querySelector("#btn-search-stores").classList.remove('btn-selected');
            
            if(this.state.displayFavorites){    
                this.displayFavorites();
            }else{
                this.search(document.querySelector('#map-search-text-input').value);
            }
            
        };
        
        // setting up search
        this.container.querySelector("#map-search-text-input").oninput = 
        (e) => {
            this.search(e.target.value);
        }

        //button favorites
        const buttonFavorites = this.container.querySelector("#map-search-favorites");
        buttonFavorites.onclick = () => {
            const textInput = this.container.querySelector("#map-search-text-input");
            buttonFavorites.classList.toggle('background-higlight');

            //if the favorite stores/products were not beeing displayed, display them
            if(!this.state.displayFavorites){
                this.state.displayFavorites = ! this.state.displayFavorites;
                textInput.hidden = true;
                this.displayFavorites();
            }
            //if the favorites were beeing displayed, redo the previous serach
            else{
                this.state.displayFavorites = ! this.state.displayFavorites;
                textInput.hidden = false;
                this.search(textInput.value);
            }
        }
    }

    displayFavorites(){
        this.clearSearchResultsAndMarkers();

        const resultComponents = [];
        //display the favorite stores if the store filter is set
        if(this.state.search_type === 'store'){
            Favorites.stores.forEach(store => resultComponents.push(new StoreSearchResult(store).container));
            Map.plotStoreMarkers(Favorites.stores);
        }
        //display the favorite products if the product filter is set
        if(this.state.search_type === 'product'){
            Favorites.products.forEach(product => resultComponents.push(new ProductSearchResult(product).container));
            for(let product of Favorites.products){
                const stores = Price.latestPricesFromProduct(product).map(price => Store.findById(price.store));
                Map.plotStoreMarkers(stores);
            }
        }
        const resultContainer = Components.get('mapResultContainer');
        resultContainer.addElemnts(...resultComponents);  
    }

    search(searchString){
        //clear the result container and map markers
        this.clearSearchResultsAndMarkers();
        //perform the search for stores/products
        this.state.search_type === 'store'? this.searchStores(searchString): this.searchProducts(searchString);
    }

    searchProducts(searchString){
        const products = Product.findByName(searchString);
        const searchResultComponents = [];
        for(let product of products){
            //find the stores that sell the product                    
            const stores = Price.latestPricesFromProduct(product).map(price => Store.findById(price.store));
            Map.plotStoreMarkers(stores);
            searchResultComponents.push(new ProductSearchResult(product).container);
        }
        const resultContainer = Components.get('mapResultContainer');
        resultContainer.addElemnts(...searchResultComponents);        
    }

    searchStores(searchString){
        const searchResultComponents = [];
        const stores = Store.findByName(searchString);
        for(let store of stores){
            Map.addStoreMarker(store);
            searchResultComponents.push(new StoreSearchResult(store).container);
        }
        const resultContainer = Components.get('mapResultContainer');
        resultContainer.addElemnts(...searchResultComponents);
    }

    clearSearchResultsAndMarkers(){
        //remove all search results from result container
        const resultContainer = Components.get('mapResultContainer');
        resultContainer.removeAllElements();
        
        //remove markers and close store/product that were opened.
        StoreComponent.closeAll();
        Map.removeAllMarkrs();
    }

}