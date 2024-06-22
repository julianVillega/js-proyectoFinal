async function fechJsonData(url){
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export class Store{
    static stores;    
    static async initialize(){
        Store.stores = await fechJsonData('./js/json/stores.json');
    }
    constructor(id, name, address, latlng){
        this.id = id;        
        this.name = name;        
        this.address = address;        
        this.latlng = latlng;
        stores.push(this);            
    }
    static findById = id => this.stores.filter(store => store.id === id);
    static findByName = name => this.stores.filter(store => store.name.toLowerCase().includes(name));
    static findByAddress = address => this.stores.filter(store => store.address.toLowerCase().includes(address));
    static findBylatLng = latlng => this.stores.filter(store => store.latlng === latlng);
}

export class Price{
    static prices = [];
    constructor(product, price, store, date){
        this.product = product;            
        this.price = price;                
        this.store = store;            
        this.date = date;
        prices.push(this);                
    }
    
    static findByProduct = product => this.prices.filter(p => p.product === product);
    static findByStore = store => this.prices.filter(p => p.store === store);
    
    static findByStoreAndProduct (store, product){
        return this.prices.filter(price => price.store === store && price.product === product);
    }
}

export class Product {
    static products = [];
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static findById = id => this.products.filter(p => p.id === id);
    static findByName = name => this.products.filter(p => p.name === name);
}