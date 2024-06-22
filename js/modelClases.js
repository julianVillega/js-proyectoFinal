import {DateFromDayMonthYearString} from "./utils.js"
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

    static async initialize(){
        Price.prices = await fechJsonData('./js/json/prices.json');
    }

    constructor(product, price, store, date){
        this.product = product;            
        this.price = price;                
        this.store = store;            
        this.date = date;
        prices.push(this);                
    }
    
    //returns all prices for one product across all stores.
    static findByProduct = product => this.prices.filter(p => p.product === product.id);
    
    //returns all prices from one store
    static findByStore = store => this.prices.filter(p => p.store === store.id);
    
    //returns the prices for a product from one store.
    static findByStoreAndProduct (store, product){
        return this.prices.filter(price => price.store === store.id && price.product === product.id);
    }

    //returns the latest prices of all products from a store
    static latestPricesFromStore(store){
        const pricesFromStore = Price.findByStore(store);
        // dictionary for storing the latest price of each product.
        const latestPrices = {};
        pricesFromStore.forEach(priceInfo => {
            const product = priceInfo.product;
            const currentDate = DateFromDayMonthYearString(priceInfo.date);

            if(!latestPrices[product] || DateFromDayMonthYearString(latestPrices[product].date) < currentDate){
                latestPrices[product] = priceInfo;
            }

            });
        return Object.values(latestPrices);
    }
}

export class Product {
    static products = [];

    static async initialize(){
        Product.products = await fechJsonData('./js/json/products.json');
    }

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static findById = id => this.products.filter(p => p.id === id)[0];
    static findByName = name => this.products.filter(p => p.name === name);
}