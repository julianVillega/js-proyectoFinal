import { Components } from "./components.js";

export class ResultContainer{
    constructor(id){
        this.children = [];
        this.id = id;
        this.container = document.createElement("div");
        this.container.classList.add("result-container");
        Components.add(this.id, this);
    }

    addElemnts(...elements){
        elements.forEach(element => {
            this.container.appendChild(element);
            this.children.push(element);
        });
    }
    removeElements(...elements){
        elements.forEach(element => {
            this.container.removeChild(element);
            this.children.filter(e => e != element);
        });
    }

    removeAllElements(){
        this.container.innerHTML='';
    }
}