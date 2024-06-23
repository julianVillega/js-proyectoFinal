export class ProductSearchResult{

    constructor(product){
        this.product = product;
        this.container = document.createElement('div');
        this.container.classList.add('product-search-result');
        this.container.innerHTML = `
            <h3>${this.product.name}</h3>
            <button id="btn-favorites">Add To Favorites</button>
        `
        this.setUpBehaviour();
    }
    
    setUpBehaviour(){
        this.container.querySelector('#btn-favorites').addEventListener('click', ()=> console.log('add product to favorites'))
    };
}