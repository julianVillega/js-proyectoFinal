// import {Components} from "./html-components.js";
import {Map} from "./components/map.js";
import {Map_search_bar} from "./components/mapSearchBar.js";
import {ResultContainer} from "./components/resultContainer.js";


const body = document.getElementsByTagName("body")[0];

export function build_base_html (){
    //building the header.
    build_header();
    build_map_div();
}

function build_header(){
    //building the header.    
    const header = document.createElement("header");
    header.classList.add("header");
    body.appendChild(header);

    const header__title = document.createElement("h1");
    header__title.innerText = "PubliPrecios"
    header__title.classList.add("header__title");
    header.appendChild(header__title);
}

function build_map_div(){
    const map = document.createElement("div");
    map.classList.add("map");
    map.id = 'map';
    map.zinde=0;
    map.appendChild(new Map_search_bar('mapSearchBar').container);
    map.appendChild(new ResultContainer('mapResultContainer').container);
    body.appendChild(map);
    new Map();
}

