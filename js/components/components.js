export class Components {
    static components = [];

    static add(id,component){
        Components.components[id]=component;
    }
    static remove(id){
        delete Components.components[id];
    }
    static get(id){
        return Components.components[id];
    }
}