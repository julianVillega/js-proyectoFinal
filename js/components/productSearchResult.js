import { Favorites } from "../modelClases.js";

export class ProductSearchResult{

    constructor(product){
        this.product = product;
        this.container = document.createElement('div');
        this.container.classList.add('product-search-result');
        this.buttonFavorites = document.createElement('button');
        this.buttonFavorites.id = "btn-favorites";
        this.buttonFavorites.innerText = !Favorites.isProductFavorite(this.product)? "Add To Favorites" : "Remove From Favorites";
        this.container.innerHTML = `
            <h3>${this.product.name}</h3>
        `
        this.container.appendChild(this.buttonFavorites);
        this.setUpBehaviour();
    }
    
    setUpBehaviour(){
        const buttonFavorites = this.container.querySelector('#btn-favorites');
        buttonFavorites.addEventListener('click', () => {
            if(!Favorites.isProductFavorite(this.product)){
                Favorites.addProduct(this.product);
                buttonFavorites.innerText = "Remove From Favorites";
            }else{
                Favorites.removeProduct(this.product);
                buttonFavorites.innerText = "Add To Favorites";
            }
        })
    };
}