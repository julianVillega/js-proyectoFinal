import { Price } from "../modelClases.js";

export class PriceHistory{
    static openHistories = [];
    constructor(product, store){
        this.product = product;
        this.store = store;
        this.prices = Price.findByStoreAndProduct(store, product);
        this.container = document.createElement('div');
        this.container.classList.add('price-history');
        this.container.innerHTML = `
            <div class="price-history_header">
                <h3>Prices for: ${this.product.name}</h3>
                <h3>At: ${this.store.name}</h3>
                <button id="btn-close">close</button>
            </div>
                <canvas id="price-chart"></canvas>
        `
        this.context = this.container.querySelector("#price-chart").getContext('2d');
        this.chart = new Chart(this.context, {
            type:'line',
            data:{
                labels:[...this.prices.map(price => price.date)],
                datasets:[{
                    label:'Price',
                    data:[...this.prices.map(price => price.price)],
                    fill:true,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension:0.1
                }]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:false
                    }
                }
            }
        })
        
        PriceHistory.openHistories.push(this);
        this.setUpBehaviour();
    }
    setUpBehaviour(){
        //close button
        this.container.querySelector("#btn-close").onclick = () => {
        this.close();
        };
    }

    close(){
        document.querySelector('body').removeChild(this.container);
        PriceHistory.openHistories = PriceHistory.openHistories.filter(priceHistory => priceHistory.product != this.product && priceHistory.store != this.store);
    }

    static closeAll(){
        PriceHistory.openHistories.forEach(p =>{
            p.close();
        })
    }
}