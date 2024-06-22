import { Price, Product } from "../modelClases.js";

export class StoreComponent{
    static openStores = [];
    constructor(store){
        this.store = store;
        this.container = document.createElement('div');
        this.container.classList.add('store');
        this.container.innerHTML = `
            <div class="store_header">
                <h3>${this.store.name}</h3>
                <button id="btn-close">Close</button>
                <h3>${this.store.address}</h3>
            </div>
            <div class="store_products">
                <h3 class="store_products-title">Products</h3>
                <table class="store_products-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="store_table-body">
                    </tbody>
                </table>
            </div>
        `
        this.updatePricesTable(Price.latestPricesFromStore(this.store));
        StoreComponent.openStores.push(this);
        this.setUpBehaviour();
    }

    close(){
        document.querySelector('body').removeChild(this.container);
        StoreComponent.openStores = StoreComponent.openStores.filter(s => s.store.id !== this.store.id);        
    }

    updatePricesTable(prices){
        const tableBody = this.container.querySelector('.store_table-body');
        for(let price of prices){
            const tableRow = document.createElement('tr');
            
            const product = Product.findById(price.product);
            const html = `
                <td>${product.name}</td>            
                <td>${price.price}</td>        
                <td>${price.date}</td>            
            `
            tableRow.innerHTML = html;
            tableBody.appendChild(tableRow);
        }
    }

    setUpBehaviour(){
        //close the store
        this.container.querySelector("#btn-close").onclick = () => this.close();
    }

    static closeAll(){
        StoreComponent.openStores.forEach(s => s.close());
    }
}